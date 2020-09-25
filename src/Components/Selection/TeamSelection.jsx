import React, { useContext, useEffect, useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { SelectionContext } from "../../context/SelectionContext";
import { TeamBadge } from "../Team/TeamBadge";

export const REQUIREMENTS = {
  GKP: 2,
  DEF: 5,
  MID: 5,
  FWD: 3,
};

export const TeamSelection = () => {
  const { players, positions } = useContext(DataContext);
  const { playersPicked, onPlayerRemoved } = useContext(SelectionContext);
  const [selectedPositions, setSelectedPositions] = useState({});

  /**
   * Determine the counts of the various playing positions in the team.
   */
  useEffect(() => {
    if (!playersPicked || !positions) {
      return;
    }
    const selected = {
      GKP: 0,
      DEF: 0,
      MID: 0,
      FWD: 0
    };

    playersPicked.map(p => {
      selected[p.position.singular_name_short] += 1;
    });

    setSelectedPositions(selected);
  }, [playersPicked, positions]);

  /**
   * Determine whether we should show a link to select a new player.
   * This is true if the team is not full.
   */
  const showAddPlayerLink = () => {
    return (
      selectedPositions.GKP < REQUIREMENTS.GKP ||
      selectedPositions.DEF < REQUIREMENTS.DEF ||
      selectedPositions.MID < REQUIREMENTS.MID ||
      selectedPositions.FWD < REQUIREMENTS.FWD
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

  const getVariantName = (position) => {
    if (selectedPositions[position] < REQUIREMENTS[position]) {
      return "secondary";
    }
    if (selectedPositions[position] > REQUIREMENTS[position]) {
      return "danger";
    }
    if (selectedPositions[position] === REQUIREMENTS[position]) {
      return "success";
    }
  }

  const showPlayers = (position) => {
    console.log(`Going to show you: ${position}`);
  }

  return (
    <>
      <h2>Choose Team</h2>

      <div className="mb-2">
        {positions.map(p => (
          <Badge onClick={e => showPlayers(p.singular_name_short)} key={p.singular_name_short} variant={getVariantName(p.singular_name_short)} className="p-2 mr-2">
            {`${p.plural_name} (${selectedPositions[p.singular_name_short]} of ${REQUIREMENTS[p.singular_name_short]})`}
          </Badge>
        ))}
      </div>

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
