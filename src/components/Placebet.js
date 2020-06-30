// import React from 'react';
// import PlayerCard from './PlayerCard';
// import BankerCard from './BankerCard';
import { Magic } from "magic-sdk";
import { IconExtension } from "@magic-ext/icon";
import IconService from "icon-sdk-js";
import React, { useState, useEffect } from "react";
import Login from './Login';
const { IconBuilder, IconAmount, IconConverter } = IconService;

const magic = new Magic("pk_test_BAD78299B2E4EA9D", {
  extensions: {
    icon: new IconExtension({
      rpcUrl: "https://bicon.net.solidwallet.io/api/v3"
    })
  }
});
// import { createTransaction, askForLogin } from '../api';

class Placebet extends React.Component{
    constructor(props) {

        super(props);
        this.state = {val:'',
            showModal: false ,
            tx:'',
            enteredName:''
        };
    
        // I've just put these binding in the constructor 
        // so as not to clock up the render method and they only
        // get called once during the lifetime of the component
        // this.handleActionClick = this.handleActionClick.bind(this);
        this.handlerSendTransaction=this.handlerSendTransaction.bind(this)
      }
      
    
    handlerSendTransaction = async () => {
        

        const metadata = await magic.user.getMetadata();
    
        const txObj = new IconBuilder.CallTransactionBuilder()
          .from(metadata.publicAddress)
          .to('cxccce3d3c2f999536499753535eba96a6a6b8344a')
          .value(IconAmount.of(2, IconAmount.Unit.ICX).toLoop())
          .stepLimit(IconConverter.toBigNumber(1000000))
          .nid(IconConverter.toBigNumber(3))
          .nonce(IconConverter.toBigNumber(1))
          .version(IconConverter.toBigNumber(3))
          .timestamp(new Date().getTime() * 1000)
          .method('take_action')
          .params({
            "action": "place_bet"
          })
          .build();
          console.log("called")
        const txhash = await magic.icon.sendTransaction(txObj);
    
        // setTxHash(txhash);
        this.setState({tx:txhash,
            showModal: !this.state.showModal,
            val:'',
        })
        
    
        console.log("transaction result", txhash);
    };
    
    onInputChange=(event)=>{
        this.setState({val:event.target.value});
        this.setState({showModal:false})
        this.setState({tx:''})
    };
    
    
    // handleActionClick=(event) =>{ 
        
    //     console.log("clicked") // switch the value of the showModal state
    //     this.setState({
    //       showModal: !this.state.showModal,
    //       val:'',
    //       tx:''
    //     });
        
    //   }
    // getComponent=() =>{
    //     console.log("card")
    //     if (this.state.showModal) {  // show the modal if state showModal is true
    //     return (
    //         <div className="cards">
    //             <PlayerCard card={this.Rand()} num={this.cardnum}/>
                
    //             <BankerCard card={this.Rand()} num={this.cardnum}/>
    //         </div>
    //     );
    //     } else {
    //     return null;
    //     }
    // }
    // // handleActionClick=(event)=>{
    // //     console.log("clicked")
    // //     this.setState({val:''})
    // // }
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

      
    
    render(){
        return (
            <div className="bet-field">
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
                    <div className={`deal-btn ${(!this.state.val & !this.isLoggedIn)? 'inactive' : ''}`}
                        onClick={this.handlerSendTransaction} 
                        > 
                                        
                        Deal
                    </div>
                    
                
                
                <div>
                <a
                    href={`https://bicon.tracker.solidwallet.io/transaction/${this.state.tx}`}
                    target="_blank"
                  >
                    {this.state.tx}
                </a>
                </div>


                {/* {this.getComponent()} */}

                {/* <div className="cards">
                    <PlayerCard card={this.Rand()} num={this.cardnum}/>
                    
                    <BankerCard card={this.Rand()} num={this.cardnum}/>
                </div> */}




            </div>
        );
    }
}
export default Placebet;