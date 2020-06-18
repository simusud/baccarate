import React from 'react';
import { Card, CardStyles } from 'react-casino';


  const PlayerCard = (props) => {
    console.log(props.card)
    return (
      <div className="player-container">
        <div id="leftdiv" className="player-card-header">
          <h1>Player</h1>
        </div>
        <div id="leftdiv" className="player-card">
          
          <CardStyles />
          <Card suit={props.card[0]} face={props.card[1]} />
          <Card suit={props.card[2]} face={props.card[3]} />
          <Card suit={props.card[4]} face={props.card[5]} />
          
        </div>
      </div>
    );
}

export default  PlayerCard;