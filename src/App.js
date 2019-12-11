import React from 'react'
import Customerlist from './components/Customerlist'
import Trainingslist from './components/Trainingslist'
import './App.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function App() {

  return (
    <div className="App"> 
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Personaltrainer -App
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
            <Button variant="outlined"><Link to={'/customers'}> Customers </Link></Button>
            <Button variant="outlined"><Link to={'/trainings'}> Trainings </Link></Button>
          <Switch>
            <Route path="/customers" component={Customerlist} />
            <Route path='/trainings' component={Trainingslist} />
          </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
