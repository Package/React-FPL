import React from 'react';
import { Container } from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GameweekList } from './Components/GameweekList';
import { Home } from './Components/Home';
import { Team } from './Components/Team';
import { MyNav } from './Components/MyNav';

function App() {

  return (
    <div className="App">
      <Container>
        <Router>
          <MyNav />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/team/:teamID" component={Team} />
            <Route path="/gameweeks" component={GameweekList} />
          </Switch>
        </Router>

      </Container>
    </div>
  );
}

export default App;
