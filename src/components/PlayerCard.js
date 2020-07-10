import React from 'react';
import { Card, CardStyles } from 'react-casino';


  const PlayerCard = (props) => {
    
    const item=[]
    for (let index = 0; index < props.card.length; index+=2){

      item.push(<Card suit={props.card[index]} face={props.card[index+1]} />)
      
    }
    // console.log(item)
    return (
      <div className="player-container">
        <div id="leftdiv" className="player-card-header">
          <h1>Player</h1>
        </div>
        <div id="leftdiv" className="player-card">
          
        <CardStyles />
          
          {item}
            
          
        
          {/* <Card suit={props.card} face={props.card} />
          {/* <Card suit={props.card[2]} face={props.card[3]} /> */}
          {/* <Card suit={props.card[4]} face={props.card[5]} /> */}
        
        </div>
      </div>
    );
}

export default  PlayerCard;