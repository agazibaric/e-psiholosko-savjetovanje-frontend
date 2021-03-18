import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';

const allQuestions = [
  {
    id: 1,
    isMultiSelect: false,
    content:
      'Ukoliko želite, možete nam ukratko opisati problem zbog kojeg se javljate:',
    answers: [],
    isMandatory: true,
  },
  {
    id: 2,
    isMultiSelect: false,
    content:
      'Pod kojim uvjetima i u kojim situacijama su vaši psihološki problemi najviše izraženi?',
    answers: [],
    isMandatory: true,
  },
  {
    id: 3,
    isMultiSelect: false,
    content: 'Pod kojim uvjetima osjećate poboljšanje?',
    answers: [],
    isMandatory: true,
  },
  {
    id: 4,
    isMultiSelect: false,
    content:
      'Jeste li ste prethodno tražili pomoć za svoje psihološke probleme (npr. kod psihologa ili psihijatra)? Ako jeste, molimo Vas da ukratko opišete vrstu i trajanje tretmana. Ako ste prethodno uzimali lijekove za smirenje, opišite ukratko vrstu, dozu i učestalost uzimanja lijeka.',
    answers: [],
    isMandatory: true,
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
    isMandatory: false,
  },
];

export interface DescribeProblemProps {
  handleAnswersSubmit: (answers: Array<any>) => void;
}

const DescribeProblem: React.FC<DescribeProblemProps> = ({
  handleAnswersSubmit,
}) => {
  const [questions, setQuestions] = useState(allQuestions);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Array<any>>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const questionAnswered = () => {
    const concatAnswers = [
      ...answers,
      { content: currentAnswer, questionId: questions[questionIndex].id },
    ];
    if (questionIndex === questions.length - 1) {
      handleAnswersSubmit(concatAnswers);
    } else {
      setAnswers(concatAnswers);
      setQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const getCurrentQuestion = () => {
    return questions[questionIndex].content;
  };

  return (
    <div>
      <div>{getCurrentQuestion()}</div>
      <TextField
        variant="outlined"
        fullWidth
        id="answer"
        label="Answer"
        autoFocus
        value={currentAnswer}
        onChange={e => setCurrentAnswer(e.target.value)}
      />
      <Button onClick={questionAnswered}>Answer</Button>
    </div>
  );
};

export { DescribeProblem };
