import { Grid } from '@material-ui/core';
import {
  ChatController,
  Message as ChatMessage,
  MessageContent,
  MuiChat,
} from 'chat-ui-react';
import React, { useEffect, useState } from 'react';
import { api, LocalStorage } from 'services';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Meeting, Message } from 'types/Meeting';

let stompClient;

const Chat: React.FC = () => {
  const [chatCtl] = useState(new ChatController());
  const [meetings, setMeetings] = useState<Array<Meeting>>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting>();
  const [isPatient, setIsPatient] = useState<Boolean>(true);

  const handleResponse = response => {
    if (!selectedMeeting) return;

    stompClient.send(
      '/chat/message',
      {},
      JSON.stringify({
        to: isPatient
          ? selectedMeeting.doctor.user.username
          : selectedMeeting.patient.user.username,
        content: response.value,
        meetingId: `${selectedMeeting.id}`,
      }),
    );
    //chatCtl.addMessage({ type: 'text', self: true, content: response.value });
  };

  const listenForMessages = async () => {
    await chatCtl.setActionRequest(
      { type: 'text', always: true },
      handleResponse,
    );
  };

  const fetchAllMeetings = () => {
    const isDoctor = LocalStorage.getUser()?.authorities.find(
      a => a.name === 'ROLE_DOCTOR',
    );
    console.log('IS DOCTORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
    console.log(isDoctor);
    console.log(LocalStorage.getUser());
    const endpoint = isDoctor ? '/doctor/meetings' : '/patient/meetings';
    api
      .get(endpoint)
      .then(res => {
        if (res && res.data && res.data.length > 0) {
          setMeetings(res.data as Array<Meeting>);
          setSelectedMeeting(res.data[0] as Meeting);
        }
      })
      .catch(err => console.log(err));
  };

  const connectToWebSocket = () => {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect(
      { 'X-Authorization': 'Bearer ' + LocalStorage.getUserToken() },
      function (frame) {
        console.log('Connected: ' + frame);

        stompClient.subscribe('/user/queue/chat', (msg: Message) => {
          console.log('Received message');
          console.log(msg);
          chatCtl.addMessage({
            type: msg.type,
            content: msg.content,
            self: false,
          });
        });
      },
    );
  };

  const getMeetingMessages = () => {
    if (!selectedMeeting) return;
    const { id } = selectedMeeting;
    api
      .get(`meeting/${id}/messages`)
      .then(res => {
        chatCtl.setMessages(res.data as Array<ChatMessage<MessageContent>>);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllMeetings();
    connectToWebSocket();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMeetingMessages();
    setIsPatient(
      !!LocalStorage.getUser()?.authorities.find(a => a.name === 'ROLE_USER'),
    );
    listenForMessages();
    // eslint-disable-next-line
  }, [selectedMeeting]);

  const handleMeetingOnClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
  };

  const renderMeetings = () => {
    return meetings.map(meeting => {
      return (
        <Grid
          xs={12}
          item
          onClick={() => handleMeetingOnClick(meeting)}
          key={meeting.id}
          spacing={5}
        >
          {meeting.doctor.user.firstname}
        </Grid>
      );
    });
  };

  return (
    <>
      {selectedMeeting && (
        <Grid container>
          <Grid item xs={3}>
            <Grid container direction="column">
              {renderMeetings()}
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <Grid container direction="column">
              <div style={{ height: '100vh', margin: 0, padding: 0 }}>
                <MuiChat chatController={chatCtl} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      )}
      {!selectedMeeting && <div>Loading</div>}
    </>
  );
};

export default Chat;
