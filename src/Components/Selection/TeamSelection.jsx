import React, { useContext, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { TeamBadge } from "../Team/TeamBadge";

export const REQUIREMENTS = {
  goalkeepers: 2,
  defenders: 5,
  midfielders: 5,
  forwards: 3,
};

export const TeamSelection = () => {
  const { players, positions, playersPicked, onPlayerRemoved } = useContext(DataContext);

  const [goalkeepers, setGoalkeepers] = useState([]);
  const [defenders, setDefenders] = useState([]);
  const [midfielders, setMidfielders] = useState([]);
  const [forwards, setForwards] = useState([]);

  /**
   * Determine whether we should show a link to select a new player.
   * This is true if the team is not full.
   */
  const showAddPlayerLink = () => {
    return (
      goalkeepers.length < REQUIREMENTS.goalkeepers ||
      defenders.length < REQUIREMENTS.defenders ||
      midfielders.length < REQUIREMENTS.midfielders ||
      forwards.length < REQUIREMENTS.forwards
    );
  }

  /**
   * Iterate the provided players and return a row in the table for each.
   * 
   * @param {array} players 
   */
  const mapPlayersInPosition = (players) => {
    return players.map(g => (
      <tr key={g.id}>
        <td>
          <TeamBadge teamID={g.team.id} />
        </td>
        <td>{g.name}</td>
        <td>{g.position.singular_name}</td>
        <td><Button variant="outline-danger" size="sm" onClick={(e) => onPlayerRemoved(g.id)}>x</Button></td>
      </tr>
    ))
  }

  return (
    <>
      <h2>Choose Team</h2>
      <Table size="sm" hover striped>
        <thead>
          <tr>
            <th>Team</th>
            <th>Player</th>
            <th>Position</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {mapPlayersInPosition(playersPicked)}
        </tbody>
      </Table>
      {showAddPlayerLink() && <Link className="btn btn-primary" to="/players">Select Players</Link>}
    </>
  )
};
