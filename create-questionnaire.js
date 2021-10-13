import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { QuestionItem } from './question-item';

export const CreateQuestionnaire = () => {
    const getEmptyQuestionItem = (reset) => {
        return  [{
                     id: ((reset) ? 0 : questions[questions.length - 1].id+1),
                     question: '',
                     options: [
                         {
                             id: 0,
                             option: ''
                         },
                         {
                             id: 1,
                             option: ''
                         }
                     ]
                 }]
    }
    const [questions, setQuestions] = React.useState(getEmptyQuestionItem(true));

    const setQuestionState = (e, questionIndex, optionIndex) => {
        let questionsCopy = Object.assign([], questions);
        if (optionIndex === undefined) {
            questionsCopy[questionIndex][e.target.name] = e.target.value;
        }
        else {
            questionsCopy[questionIndex].options[optionIndex][e.target.name] = e.target.value;
        }
        setQuestions(questionsCopy);
    }

    const isEmptyField = () => {
        return questions.filter(question => {
            return question.question === ''
        }).length > 0;
    }

    const removeQuestion = (e, id) => {
        setQuestions(questions.filter((q) => q.id !== id));
    }   

    const addQuestion = () => {
        if (isEmptyField())
            return;

        setQuestions(questions.concat(getEmptyQuestionItem()));
    }

    const removeEmptyQuestions = () => {
        setQuestions(
            questions.filter((q) => 
                                q.question !== ''
                                &&
                                q.options.filter(o => o.options !== '').length >= 2
                            ));
    }

    const submit = () => {
        removeEmptyQuestions();
        localStorage.setItem('questions', JSON.stringify(questions));

        setTimeout(() => {
            setQuestions(getEmptyQuestionItem(true));  
        }, 100);
         
    }

    const addOption = (questionIndex) => {
        let questionsCopy = Object.assign([], questions);
        questionsCopy[questionIndex].options = questionsCopy[questionIndex].options.concat({
            id: questions[questionIndex].options.length,
            option: ''
        })
        setQuestions(questionsCopy);
    }

    return (
        <form style={{textAlign: 'center'}}>
            {
                questions.map((question, index) => {
                    return (
                            <QuestionItem key={question.id}
                                question={question} 
                                index={index}
                                setQuestionState={setQuestionState}
                                removeQuestion={removeQuestion}
                                addOption={addOption}
                            />
                    );
                })
            }

            <AddQuestionItemIconButton addQuestion={addQuestion} />

            <SubmitButton submit={submit}/>
        </form>
    );
}

const AddQuestionItemIconButton = ({addQuestion}) => {
    return <IconButton color="primary"
                aria-label="add question"
                onClick={addQuestion}>
            <AddCircleIcon fontSize="large" />
            </IconButton>
}

const SubmitButton = ({submit}) => {
    return <div style={{ marginTop: 30 }}>
                <Button type="submit" 
                    variant="outlined"
                    onClick={submit}>Submit</Button>
            </div>
}