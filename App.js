import React from 'react';
import './App.css';
import { CreateQuestionnaire } from './create-questionnaire';
import { FillQuestionnaire } from './fill-questionnaire';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";

import { Route, BrowserRouter } from 'react-router-dom';

function LinkTab(props) {
  return  (
            <Tab
              component="a"
              onClick={event => {
                event.preventDefault();
              }}
              {...props}
            />
          );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return  (
            <div {...other}>
                {value === index && <Box p={3}>{children}</Box>}
            </div>
          );
}

const App = () => {
  const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };  

    return (
    <div>
      <AppBar position="static" style={{ background: '#dddddd' }}>
        <Tabs value={value} onChange={handleChange}>
          <LinkTab label="Create Questionnaire" href="/create" />
          <LinkTab label="Fill Questionnaire" href="/fill" />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <CreateQuestionnaire />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FillQuestionnaire />
      </TabPanel>

      <BrowserRouter>
        <Route path="/create">
          <CreateQuestionnaire />
        </Route>
        <Route path="/fill">
          <FillQuestionnaire />
        </Route>
      </BrowserRouter>
      </div>
    );
  
}

export default App;