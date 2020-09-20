import React from 'react';
import { Container } from 'react-bootstrap';
import './styles/main.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GameweekList } from './Components/Gameweek/GameweekList';
import { Home } from './Components/Home';
import { Team } from './Components/Team/Team';
import { Navigation } from './Components/Layout/Navigation';
import { BonusPoints } from './Components/BonusPoints';
import { DataProvider } from './context/DataContext';
import { PlayerList } from './Components/Players/PlayerList';
import { TeamSelection } from './Components/Selection/TeamSelection';
import { FlashMessages } from './Components/Layout/FlashMessages';
import { SelectionProvider } from './context/SelectionContext';

function App() {
  return (
    <DataProvider>
      <SelectionProvider>
        <Router>
          <Container>
            <Navigation />

            <FlashMessages />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/bonus/:gameweekID" component={BonusPoints} />
              <Route path="/team/:teamID" component={Team} />
              <Route path="/gameweeks" component={GameweekList} />
              <Route path="/players" component={PlayerList} />
              <Route path="/choose-team" component={TeamSelection} />
            </Switch>
          </Container>
        </Router>
      </SelectionProvider>
    </DataProvider>
  );
}

export default App;
