import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GameweekList } from './Components/GameweekList';
import { Home } from './Components/Home';
import { Team } from './Components/Team';
import { MyNav } from './Components/MyNav';
import { BonusPoints } from './Components/BonusPoints';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Router>
        <MyNav />
        <Switch>
          <Container className="bg-white p-3">
            <Route path="/" exact component={Home} />
            <Route path="/bonus/:gameweekID" component={BonusPoints} />
            <Route path="/team/:teamID" component={Team} />
            <Route path="/gameweeks" component={GameweekList} />
          </Container>
        </Switch>
      </Router>
    </DataProvider>
  );
}

export default App;
