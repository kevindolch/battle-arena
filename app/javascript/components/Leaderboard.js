import React from "react";

const Leaderboard = (props) => {
  const rows = props.records.map(r => <LeaderboardRow {...r} key={r.id} />)
  return <table className="table">
    <tbody>
      <tr>
        <th>Character</th>
        <th>Wins</th>
        <th>Losses</th>
        <th>Ties</th>
      </tr>
      {rows}
    </tbody>
  </table>
}

const LeaderboardRow = props => (
  <tr>
    <td>{props.name}</td>
    <td>{props.wins}</td>
    <td>{props.losses}</td>
    <td>{props.ties}</td>
  </tr>
)

export default Leaderboard;
