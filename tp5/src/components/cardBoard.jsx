import React from 'react';

import '../assets/style/cardBoard.css'

import Card from './card.jsx'


export default class CardBoard extends React.Component{
    constructor(props){
        super(props);
        this.paires = 4;
        this.CardOnClick = this.props.CardOnClick.bind(this);
    }

    render(){
        const tab = this.props.cards.map(card => <Card {...card} key={this.props.cards.indexOf(card)} onClick={this.CardOnClick}/>)
        return(
            <div className="cardBoard"> 
            {tab}
            </div>
        )
    }
}