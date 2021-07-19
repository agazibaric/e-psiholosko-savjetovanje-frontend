import { Grid } from '@material-ui/core';
import { NightsStayTwoTone } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { api, LocalStorage } from 'services';
import { Meeting, Message } from 'types/Meeting';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient;

const Meetings = () => {
  const [meetings, setMeetings] = useState<Array<Meeting>>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting>();

  const handleMessageReceived = (message: Message) => {
    console.log('WS:Received message');
    console.log(message);
  };

  const connectToWebScoket = () => {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect(
      { 'X-Authorization': 'Bearer ' + LocalStorage.getUserToken() },
      function (frame) {
        console.log('Connected: ' + frame);

        stompClient.subscribe('/user/queue/chat', (msg: Message) => {
          handleMessageReceived(msg);
        });
      },
    );
  };

  useEffect(() => {
    api
      .get('/patient/meetings')
      .then(res => {
        if (res && res.data && res.data.length > 0) {
          setMeetings(res.data as Array<Meeting>);
          setSelectedMeeting(res.data[0] as Meeting);
        }
      })
      .catch(err => console.log(err));

    connectToWebScoket();
  }, []);

  const handleMeetingOnClick = (meeting: Meeting) => {};

  const renderMeetings = () => {
    return meetings.map(meeting => {
      return (
        <Grid xs={12} item onClick={() => handleMeetingOnClick(meeting)}></Grid>
      );
    });
  };

  return (
    <>
      {selectedMeeting && (
        <Grid container>
          <Grid item xs={3}>
            <Grid container>{renderMeetings()}</Grid>
          </Grid>
          <Grid item xs={9}>
            <Grid container></Grid>
          </Grid>
        </Grid>
      )}
      {!selectedMeeting && <div>Loading</div>}
    </>
  );
};

export default Meetings;
