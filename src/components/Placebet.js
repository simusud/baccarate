import React from 'react';
import PlayerCard from './PlayerCard';
import BankerCard from './BankerCard';

class Placebet extends React.Component{
    constructor(props) {
        super(props);
        this.state = {val:'',
            showModal: false  
        };
    
        // I've just put these binding in the constructor 
        // so as not to clock up the render method and they only
        // get called once during the lifetime of the component
        this.handleActionClick = this.handleActionClick.bind(this);
      }
    
    onInputChange=(event)=>{
        this.setState({val:event.target.value});
        this.setState({showModal:false})
    };
    handleActionClick=(event) =>{ 
        console.log("clicked") // switch the value of the showModal state
        this.setState({
          showModal: !this.state.showModal,
          val:''
        });
        
      }
    getComponent=() =>{
        console.log("card")
        if (this.state.showModal) {  // show the modal if state showModal is true
        return (
            <div className="cards">
                <PlayerCard card={this.Rand()} num={this.cardnum}/>
                
                <BankerCard card={this.Rand()} num={this.cardnum}/>
            </div>
        );
        } else {
        return null;
        }
    }
    // handleActionClick=(event)=>{
    //     console.log("clicked")
    //     this.setState({val:''})
    // }
    cardnum=3;
     Rand=(cardnum)=> {
        let cardlist=[]
        const suitlist=['S','D','H','C'];
        const facelist=['A','2','3','4','5','6','7','8','9','T','J','Q','K'];
        let i = suitlist.length - 1;
        let k= facelist.length-1;
        for(var n = 0; n<this.cardnum ;n++){
            const j = Math.floor(Math.random() * i);
            const l=Math.floor(Math.random() * k);
            cardlist+=(suitlist[j]+facelist[l]);

        }
        return cardlist;
      };
      
    render(){
        return (
            <div>
                <div className="search-bar ui segment">
                    <form  className="ui form">
                        <div className="field">
                            <label>Place Bet</label>
                            <input 
                                type="text"
                                value={this.state.val}
                                onChange={this.onInputChange}                        
                            />
                        </div>
                    </form>

                </div>
                <div className={`deal-btn ${!this.state.val? 'inactive' : ''}`}
                    onClick={this.handleActionClick} 
                    > 
                                       
                    Deal
                </div>
                {this.getComponent()}

                {/* <div className="cards">
                    <PlayerCard card={this.Rand()} num={this.cardnum}/>
                    
                    <BankerCard card={this.Rand()} num={this.cardnum}/>
                </div> */}




            </div>
        );
    }
}
export default Placebet;