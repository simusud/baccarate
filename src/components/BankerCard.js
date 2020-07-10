import React from 'react';
import { Card, CardStyles } from 'react-casino';
 

  const BankerCard = (props) => {
    
    const item=[]
    for (let index = 0; index < props.card.length; index+=2){

      item.push(<Card suit={props.card[index]} face={props.card[index+1]} />)
      
    }

    return (
        <div className="banker-container">
            <div id="rightdiv" className="banker-card-header">
               <h1>Banker</h1> 
            </div>
            <div id="rightdiv" className="banker-card">
                <CardStyles />
                {item}
                
                {/* <Card suit={props.card[0]} face={props.card[1]} />
                <Card suit={props.card[2]} face={props.card[3]} />
                <Card suit={props.card[4]} face={props.card[5]} /> */}
            </div>
      </div>
    );
}

export default BankerCard;