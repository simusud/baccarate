// import React from 'react';
// import PlayerCard from './PlayerCard';
// import BankerCard from './BankerCard';
import { Magic } from "magic-sdk";
import { IconExtension } from "@magic-ext/icon";
import IconService from "icon-sdk-js";
import React, { useState, useEffect } from "react";
import Login from './Login';
import PlayerCard from './PlayerCard';
import BankerCard from './BankerCard';
const { IconBuilder, IconAmount, IconConverter,HttpProvider } = IconService;
const httpProvider = new HttpProvider('https://bicon.net.solidwallet.io/api/v3');
const iconService = new IconService(httpProvider);

const timeout = (instance) => {
    const seconds = instance === 1 ? 2000 : 1000;
    return new Promise((resolve) => setTimeout(resolve, seconds));
  };

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
            cards: ['', '', ''],
            playerInput:false,
            bankerInput:false,
            type:'',
        };
    
        // I've just put these binding in the constructor 
        // so as not to clock up the render method and they only
        // get called once during the lifetime of the component
        // this.handleActionClick = this.handleActionClick.bind(this);
        this.handlerSendTransaction=this.handlerSendTransaction.bind(this)
      }
      
     getResult = async (txHash, instance) => {
        try {
            await timeout(instance);
            const transactionResult = await iconService.getTransactionResult(txHash).execute();
            if (!transactionResult.status) {
                throw new Error(transactionResult.failure.message);
            }
            const eventLogs = transactionResult.eventLogs;
            const result = eventLogs.find((event) => event.indexed[0] === 'PlayerBankerCards(str,str)')
            .indexed;
            console.log(eventLogs)
            // const result=(transactionResult.eventLogs[0]['indexed']);
            // return result;
            let a = this.state.cards.slice(); //creates the clone of the state
            a[0] = result[0];
            a[1]=result[1];
            a[2]=result[2];
            this.setState({cards: a});    
            this.setState({cards:result})
            
            console.log(this.state.cards)
            console.log(this.state.cards[1])
            console.log(this.state.cards[2])
        } 
        
        catch (err) {
            if (instance === 100) 
            {
                console.log(err);
                return false;
            }
            instance = instance + 1;
            console.log(`Retrying...., Atempt ${instance - 1}`);
            this.getResult(txHash, instance);
        }
    };

    handlerSendTransaction = async (key,val) => {
        console.log(key)
        const metadata = await magic.user.getMetadata();
    
        const txObj = new IconBuilder.CallTransactionBuilder()
          .from(metadata.publicAddress)
          .to('cx07013769faf39669fbdedcaddc988638fdd0a750')
          .value(IconAmount.of(val, IconAmount.Unit.ICX).toLoop())
          .stepLimit(IconConverter.toBigNumber(1000000))
          .nid(IconConverter.toBigNumber(3))
          .nonce(IconConverter.toBigNumber(1))
          .version(IconConverter.toBigNumber(3))
          .timestamp(new Date().getTime() * 1000)
          .method('place_bet')
          .params({
              "_bet_type":key
             
                       
          })
          .build();
          console.log("called")
        const txhash = await magic.icon.sendTransaction(txObj);
    
        // setTxHash(txhash);
        this.setState({tx:txhash,
            showModal: !this.state.showModal,
            val:'',
            
        })

        this.getResult(txhash,1)

        this.setState({bankerInput:false,playerInput:false})
    
        console.log("transaction result", txhash);
        
        
        // const transactionResult = await iconService.getTransactionResult('0x9f98e93e776ed87b4c187983731758808322c8d672245c7feafd230946517f81').execute();
        // const result=(transactionResul.eventLogs[0]['indexed']);
    
        // let a = this.state.cards.slice(); //creates the clone of the state
        // a[0] = result[0];
        // a[1]=result[1];
        // a[2]=result[2];
        // this.setState({cards: a});    
        // this.setState({cards:result})
        
        // console.log(this.state.cards)

        // const bankercard=(result[2]);
        // console.log(this.state.cards[1])
        // console.log(this.state.cards[2])
        // console.log("transaction status(1:success, 0:failure): "+transactionResult.eventLogs.indexed);
    };
    
    onPlayerInputChange=(event)=>{
        this.setState({val:event.target.value});
        this.setState({showModal:false})
        this.setState({tx:''})
        this.setState({playerInput:!(this.state.playerInput)})
        this.setState({type:"Player"})
        this.setState({cards: ['', '', '']})
    };
    onBankerInputChange=(event)=>{
        this.setState({val:event.target.value});
        this.setState({showModal:false})
        this.setState({tx:''})
        this.setState({bankerInput:!(this.state.bankerInput)})
        this.setState({type:"Banker"})
        this.setState({cards: ['', '', '']})
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
        let playervalue=''
        let bankervalue=''
        if (this.state.playerInput) {
            playervalue=this.state.val
        }
        if (this.state.bankerInput) {
            bankervalue=this.state.val
        }
        
        return (
            <div className="bet-field">
                {/* <div className="search-bar ui segment"> */}
                    <form  className="ui form">
                        <div className="field">
                            <label>Bet On Player</label>
                            
                            <input
                                id="player" 
                                type="text"
                                value={playervalue}
                                onChange={this.onPlayerInputChange} 
                                disabled={this.state.bankerInput}                       
                            />
                        </div>
                          
                    </form>

                    <form  className="ui form ">
                        <div className="field">
                            <label>Bet On Banker</label>
                            
                            <input 
                                id="banker"
                                type="text"
                                disabled={this.state.playerInput}
                                value={bankervalue}
                                onChange={this.onBankerInputChange} 
                                                       
                            />
                        </div>
                    </form>
                {/* </div> */}
                    <div className={`deal-btn ${(!this.state.val)? 'inactive' : ''}`}
                            onClick={()=>this.handlerSendTransaction(this.state.type,this.state.val)} 
                        > 
                                        
                        Deal
                    </div>
                    
                
                
                <div>
                    {this.state.tx ? (
                    <div>
                        <div>Send transaction success</div>
                        <div className="info">
                        <a
                            href={`https://bicon.tracker.solidwallet.io/transaction/${this.state.tx}`}
                            rel="noopener noreferrer" target="_blank"
                        >
                            {this.state.tx}
                        </a>
                        </div>
                    </div>
                    ) : (
                    <div />
                    )}
                
                </div>


                {/* {this.getComponent()} */}

                <div className="cards">
                    <PlayerCard card= {this.state.cards[1]} />
                    {/* {console.log(this.state.cards[1])}; */}
                    
                    
                    <BankerCard card= {this.state.cards[2]}/>
                </div>




            </div>
        );
    }
}
export default Placebet;