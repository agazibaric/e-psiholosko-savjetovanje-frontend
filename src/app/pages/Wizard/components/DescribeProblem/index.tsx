import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Question } from 'types';
import QAForm from './QAForm';

const allQuestions: Array<Question> = [
  {
    id: 1,
    isMultiSelect: false,
    content:
      'Ukoliko želite, možete nam ukratko opisati problem zbog kojeg se javljate:',
    isMandatory: true,
  },
  {
    id: 2,
    isMultiSelect: false,
    content:
      'Pod kojim uvjetima i u kojim situacijama su vaši psihološki problemi najviše izraženi?',
    isMandatory: false,
  },
  {
    id: 3,
    isMultiSelect: false,
    content: 'Pod kojim uvjetima osjećate poboljšanje?',
    isMandatory: false,
  },
  {
    id: 4,
    isMultiSelect: false,
    content:
      'Jeste li ste prethodno tražili pomoć za svoje psihološke probleme (npr. kod psihologa ili psihijatra)? Ako jeste, molimo Vas da ukratko opišete vrstu i trajanje tretmana. Ako ste prethodno uzimali lijekove za smirenje, opišite ukratko vrstu, dozu i učestalost uzimanja lijeka.',
    isMandatory: false,
  },
  {
    id: 5,
    isMultiSelect: true,
    content: 'Kako ste čuli za Centar Sirius?',
    answers: {
      options: [
        'Preko interneta',
        'Preporuka prijatelja',
        'Preporuka stručnjaka',
      ],
      hasOther: true,
    },
    isMandatory: true,
  },
];

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  element: {},

  inFocus: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    maxWidth: '50rem',

    //left: "50%",

    background: 'white',
  },

  second: {
    position: 'absolute',
    zIndex: 1,
    top: '1rem',
    width: '90%',
    maxWidth: '50rem',
    minWidth: '50rem',
    //left: "50%",
    opacity: '60%',
    background: '#DCDCDC',
  },
  third: {
    position: 'absolute',
    zIndex: 0,
    top: '4rem',
    width: '80%',
    maxWidth: '50rem',
    minWidth: '50rem',
    //left: "50%",
    opacity: '30%',
    background: '#A9A9A9',
  },
  notVisible: {
    display: 'none',
  },
});

export interface DescribeProblemProps {
  handleAnswersSubmit: (answers: Array<any>) => void;
}

const DescribeProblem: React.FC<DescribeProblemProps> = ({
  handleAnswersSubmit,
}) => {
  const classes = useStyles();
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Array<any>>([]);

  useEffect(() => {
    // TODO: call api for questions
    setQuestions(allQuestions);
  }, []);

  const questionAnswered = (answer: string) => {
    const concatAnswers = [
      ...answers,
      { content: answer, questionId: questions[questionIndex].id },
    ];
    if (questionIndex === questions.length - 1) {
      handleAnswersSubmit(concatAnswers);
    } else {
      setAnswers(concatAnswers);
      setQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const getQAForms = () => {
    return questions.map((quest: Question, index: number) => {
      let classNameQA = classes.notVisible;
      if (index === questionIndex) {
        classNameQA = classes.inFocus;
      } else if (index === questionIndex + 1) {
        // classNameQA = classes.second;
      } else if (index === questionIndex + 2) {
        // classNameQA = classes.third;
      }
      return (
        <Grid item className={classNameQA} key={quest.content}>
          <QAForm question={quest} questionAnswered={questionAnswered} />
        </Grid>
      );
    });
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      className={classes.root}
    >
      {getQAForms()}
    </Grid>
  );
};

export { DescribeProblem };
