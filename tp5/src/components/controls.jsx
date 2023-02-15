import React from 'react';

import Chrono from './chrono.jsx'

import '../assets/style/controls.css'

export default class Controls extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.props.submit;
        this.state = {nb : this.props.pairs_in_game}
        this.onChange = this.onChange.bind(this);
        this.input = React.createRef();
    }

    // le nombre est entré dans l'input est stocké dans l'état du composant Controls. Une fois validé par le bouton, il est envoyé dans le state du memory.
    onChange(event){
        this.setState({nb : Math.min(this.props.pairs_nb, event.target.value)})
    }

    ComponentDidUpdate(previousProps){
        if (previousProps.hasBegun != this.props.hasBegun){} //attend que le statut de commencement soit bien mis à jour, permet d'afficher correctement le boutton
    }

    render(){ 
        return(
            <div className = "controls">
                <div>
                    <input className="pairs" type="number" disabled={this.props.hasBegun} value = {this.state.nb.toString()} step="1" min={Math.min(1, this.props.pairs_nb).toString()} max={(this.props.pairs_nb).toString()} onChange = {this.onChange} ref={this.input}  />
                </div>
                <div>
                    <button onClick={this.handleSubmit.bind(this, this.state.nb)}>{this.props.hasBegun ? "Stop" : "Jouer"}</button>
                </div>
                <div>
                    <Chrono hasBegun = {this.props.hasBegun} hasWon = {this.props.hasWon}/>
                </div>
            </div>
        )
    }
}