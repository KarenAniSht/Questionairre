import React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const QuestionItem = ({question, index, setQuestionState, removeQuestion, addOption}) => {
    return (
        <div style={{marginBottom: 35}}>
            <DeleteIconButton style={{position: 'absolute'}}
                        id={question.id}
                        index={index}
                        removeQuestion={removeQuestion}/>
            
            <TextField  style={{marginBottom: 20}}
                        required
                        variant="standard"
                        label="Question"    
                        name="question"
                        value={question.question}
                        onChange={e => setQuestionState(e, index) }/>

            {
                question.options.map((option, optionIndex, options) => 
                    <OptionItem key={optionIndex}
                        options={options}
                        optionIndex={optionIndex}
                        label={"Option " + (optionIndex+1)}
                        questionIndex={index}
                        setQuestionState={setQuestionState}
                        addOption={addOption}/>)
            }
        </div>
    );
}

const OptionItem = ({optionIndex, label, questionIndex, setQuestionState, options, addOption}) => {
    return (
        <div>
            {(options.length -1 === optionIndex) ? (
                                <AddOptionItemIconButton addOption={addOption} questionIndex={questionIndex}/>
                                ) : null}
            
            <FormControlLabel
                style={{ marginTop: 9, marginRight: 0 }}
                value="disabled"
                disabled
                control={<Radio />}
                label=""
            />

            <TextField  variant="standard"
                        key={optionIndex}
                        label={label}
                        name="option"
                        onChange={e => setQuestionState(e, questionIndex, optionIndex) }
            />
        </div>
    );
}

const AddOptionItemIconButton = ({addOption, questionIndex}) => {
    return <IconButton color="primary"
                aria-label="add option"
                style={{marginTop: 10, paddingLeft: 0, marginLeft: -33}}
                onClick={e => addOption(questionIndex)}>
                <AddCircleIcon fontSize="medium" />
            </IconButton>
}

const DeleteIconButton = ({id, index, removeQuestion}) => {
    return (
        <IconButton style={ (index > 0) ? {display: "inline-block"} : {display: "none"} }
                    color="error"
                    aria-label="add question"
                    onClick={e => removeQuestion(e, id)}>
            <RemoveCircleIcon fontSize="medium" />
        </IconButton>
    )
}