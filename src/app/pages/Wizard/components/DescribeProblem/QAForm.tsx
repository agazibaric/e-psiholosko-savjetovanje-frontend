import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { componentConstants } from 'constants/component.constants';
import React, { useState } from 'react';
import { AnswerOptions, Question } from 'types';

const OTHER_LABEL = 'OTHER';

export interface QAFormProps {
  question: Question;
  questionAnswered: (answer: string) => void;
}

const QAForm: React.FC<QAFormProps> = ({ question, questionAnswered }) => {
  const [answer, setAnswer] = useState<string>(
    question.isMultiSelect
      ? (question.answers as AnswerOptions).options[0]
      : '',
  );
  const [otherAnswer, setOtherAnswer] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const resetAnswers = () => {
    setAnswer('');
    setOtherAnswer('');
    setIsError(false);
  };

  const handleQuestionAnswered = e => {
    e.preventDefault();
    let userInput = answer;
    // Check if it's "other" answer
    if (question.isMultiSelect && answer === OTHER_LABEL) {
      userInput = otherAnswer;
    }

    if (!userInput && question.isMandatory) {
      setIsError(true);
      return;
    }

    resetAnswers();
    questionAnswered(userInput);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer((event.target as HTMLInputElement).value);
    setIsError(false);
  };

  const handleOnChangeInput = e => {
    const newValue = e.target.value;
    setAnswer(newValue);
    setIsError(!newValue && question.isMandatory);
  };

  const getHelperText = () => {
    if (isError) return 'Answer is required';

    const answerInfo = question.isMultiSelect ? otherAnswer : answer;
    return `${answerInfo.length}/${componentConstants.CHARACTER_LIMIT}`;
  };

  const getMultiSelectContent = () => {
    const ans = question.answers as AnswerOptions;
    return (
      <>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="Multi select"
            name="multiSelect"
            value={answer}
            onChange={handleChange}
          >
            {ans.options?.map((answer: string) => (
              <FormControlLabel
                key={answer}
                value={answer}
                control={<Radio />}
                label={answer}
              />
            ))}
            {ans.hasOther && (
              <>
                <FormControlLabel
                  key="other"
                  value={OTHER_LABEL}
                  control={<Radio />}
                  label="Other"
                />
                <TextField
                  placeholder="Other answer"
                  multiline
                  rowsMax={5}
                  inputProps={{
                    maxLength: componentConstants.CHARACTER_LIMIT,
                  }}
                  value={otherAnswer}
                  onChange={e => setOtherAnswer(e.target.value)}
                  fullWidth={true}
                  disabled={answer !== OTHER_LABEL}
                />
              </>
            )}
          </RadioGroup>
          {isError && (
            <Typography variant="subtitle2" gutterBottom color="error">
              Answer is required
            </Typography>
          )}
        </FormControl>
      </>
    );
  };
  return (
    <>
      <Grid container justify="center" alignItems="center" direction="column">
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {`${question.content}${question.isMandatory ? ' *' : ''}`}
            </Typography>
            {!question.isMultiSelect && (
              <TextField
                placeholder="Your answer"
                multiline
                rowsMax={5}
                helperText={getHelperText()}
                inputProps={{
                  maxLength: componentConstants.CHARACTER_LIMIT,
                }}
                value={answer}
                onChange={handleOnChangeInput}
                fullWidth={true}
                autoFocus
                error={isError}
              />
            )}

            {question.isMultiSelect && getMultiSelectContent()}
          </CardContent>
          <CardActions>
            <Button
              onClick={handleQuestionAnswered}
              disabled={isError}
              type="submit"
            >
              Answer
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default QAForm;
