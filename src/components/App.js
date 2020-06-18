import React from 'react';
import Placebet from './Placebet';
import PlayerCard from './PlayerCard';
import BankerCard from './BankerCard';
import '../App.css'


class App extends React.Component{

    // cardnum=3;
    

    //  Rand=(cardnum)=> {
    //     let cardlist=[]
    //     const suitlist=['S','D','H','C'];
    //     const facelist=['A','2','3','4','5','6','7','8','9','T','J','Q','K'];
    //     let i = suitlist.length - 1;
    //     let k= facelist.length-1;
    //     for(var n = 0; n<this.cardnum ;n++){
    //         const j = Math.floor(Math.random() * i);
    //         const l=Math.floor(Math.random() * k);
    //         cardlist+=(suitlist[j]+facelist[l]);

    //     }
    //     return cardlist;
    //   };
    //   handleActionClick=(event)=>{
    //     console.log("clicked")
    //     this.setState({val:''})
        
    // }


    render(){
        return(
            <div className="ui container" >
                <Placebet/>
                               
                    {/* <div className="cards">
                        <PlayerCard card={this.Rand()} num={this.cardnum}/>
                        
                        <BankerCard card={this.Rand()} num={this.cardnum}/>
                    </div> */}

                    {/* <div className={`deal-btn ${!this.props.val? 'inactive' : ''}`}
                        onClick={this.handleActionClick}
                        >                    
                        Deal
                    </div> */}
               
            </div>

        );
    }
}
export default App;