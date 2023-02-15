import React from 'react';

import '../assets/style/infoZone.css'

export default class InfoZone extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const paires = this.props.remaining > 1 ? "paires" : "paire";
        const essais = this.props.flips > 1 ? "essais" : "essai";

        return(
            <div className = "infoZone">
                <div className = "remaining"> {`encore ${this.props.remaining} ${paires}`}</div>
                <div className = "last">{this.props.last}</div>
                <div className = "flips">{`${this.props.flips} ${essais}`}</div>
            </div>
        )
    }
}