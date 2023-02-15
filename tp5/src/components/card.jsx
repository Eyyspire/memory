import React from 'react';

import '../assets/style/card.css'
import {UNKNOWN_SRC} from '../data/cardData.js';


export default class Card extends React.Component{
    constructor(props){
        super(props);
        this.onClick = this.props.onClick.bind(this, this.props.id);
    }

    render(){
        const src = this.props.hidden ? UNKNOWN_SRC : this.props.src;

        return(
            <div className = "card">
            <img src={src} alt={this.props.alt} onClick = {this.onClick}/>
            </div>
        )
    }
}