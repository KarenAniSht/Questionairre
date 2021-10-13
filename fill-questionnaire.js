import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const FillQuestionnaire = () => {
    const getQuestionsFromLocalStorage = () => {
        let questions = localStorage.getItem('questions');
        return (questions !== null) ? JSON.parse(localStorage.getItem('questions')) : []        
    }

    const [questions] = React.useState(getQuestionsFromLocalStorage());

    return(
        <div style={{ width: 250, textAlign: 'left', margin: '0 auto' }}>

            {questions?.map((q, i) => {                            
                return  <QuestionRadioButtonGroup key={q.id} {...q} />
            })}
            
        </div>
    );

}

const RadioButtonOption = ({id, option}) => {
    return  <div style={ (option !== '') ? {display: "inline-block"} : {display: "none"} }>
                <FormControlLabel
                    value={option} 
                    control={<Radio />}
                    label={option}
                />
            </div>
}

const QuestionRadioButtonGroup = ({id, question, options}) => {
    return  <div style={{marginBottom: 30}}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">{question}</FormLabel>         
                    <RadioGroup aria-label="options"
                        name="options_group">

                        {options?.map((o) => {
                            return <RadioButtonOption key={o.id} {...o} />
                        })}

                    </RadioGroup>
                </FormControl>
            </div>         
}