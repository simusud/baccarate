import React from 'react';
import { Card, CardStyles } from 'react-casino';
 

  const BankerCard = (props) => {
    console.log(props.card)
    return (
        <div className="banker-container">
            <div id="rightdiv" className="banker-card-header">
               <h1>Banker</h1> 
            </div>
            <div id="rightdiv" className="banker-card">
                <CardStyles />
                <Card suit={props.card[0]} face={props.card[1]} />
                <Card suit={props.card[2]} face={props.card[3]} />
                <Card suit={props.card[4]} face={props.card[5]} />
            </div>
      </div>
    );
}

export default BankerCard;