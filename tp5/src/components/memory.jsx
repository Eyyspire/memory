import React from 'react';

import {cardData, UNKNOWN_SRC} from '../data/cardData.js';
import {shuffle} from '../scripts/utils.js';

import '../assets/style/memory.css';

import CardBoard from './cardBoard.jsx';
import InfoZone from './infoZone.jsx';
import Controls from './controls.jsx';


export default class Memory extends React.Component{
    constructor(props){
        super(props);
        this.state = {cards : [], lastCard : null, pairs : 0, tries : 0, pairs_number : 4, hasBegun : false, blockClick : false, hasWon : false}
        this.handleFlip = this.handleFlip.bind(this);
        this.flipTimer = this.flipTimer.bind(this);
        this.blockClickTimer = this.blockClickTimer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.fetchData();
    }

    // permet d'appeler à nouveau l'algorithme lorsque on modifiera le nombre de paires
    fetchData(){
        /* shuffle ici permet de récupérer des images aléatoires si le nombre de pairs demandé
        est inférieur au nombre total de pairs dont on dispose */
        let cards = shuffle(cardData).slice(0, this.state.pairs_number); 
        cards.forEach(card => {
            card.hidden = true;
            cards.push({src : card.src, description : card.description, hidden : true})
        })
        /* shuffle ici pour obtenir un jeu rangé aléatoirement */
        cards = shuffle(cards);
        cards.forEach(card => card.id = cards.indexOf(card));
        this.setState({cards : cards, lastCard : null, pairs: 0, tries: 0, hasWon : false});
    }

    // gère le retournement des cartes
    handleFlip(id){
    if(this.state.hasBegun && !this.state.blockClick){
            const cards = this.state.cards;
            const card = cards[id];
            if(card.hidden){
                card.hidden = !card.hidden;
                if(!(this.state.lastCard)){
                    this.setState({lastCard : card});
                }
                else if (this.state.lastCard && card.description != this.state.lastCard.description){
                    const flipBack = window.setTimeout(this.flipTimer, 1000, this.state.lastCard.id, flipBack);
                    this.setState({lastCard : card, tries : this.state.tries + 1, blockClick : true});
                    const blockClick = window.setTimeout(this.blockClickTimer, 1000, blockClick);
                }
                else{
                    this.setState({lastCard : null, tries : this.state.tries + 1, pairs : this.state.pairs +1});
                    this.hasWon();
                }
            }
            this.setState({cards : cards});
        }
    }

    // permet de retourner à nouveau la carte au bout de quelques secondes
    flipTimer(id, flipBack){
        this.state.cards[this.state.lastCard.id].hidden = true;
        this.state.cards[id].hidden = true;
        this.setState({lastCard : null, cards : this.state.cards});
        window.clearTimeout(flipBack);
    }

    blockClickTimer(blockClick){
        this.setState({blockClick : false});
        window.clearTimeout(blockClick);
    }

    // est appelé pour permettre de modifier le nombre de paires, seulement après que le nombre de pairs ait été actualisé
    componentDidUpdate(pP, prevState){
        if(this.state.pairs_number !== prevState.pairs_number && this.state.hasBegun){ //pairs_number a changé et la partie a commencé ?
            this.fetchData();
        }
        if(this.state.pairs !== prevState.pairs){ // le joueur a découvert une nouvelle carte ?
            this.hasWon();
        }
    }

    // permet de contrôler le nombre de paires
    handleSubmit(nb){
        this.setState({pairs_number : nb, hasBegun: !this.state.hasBegun});
        if (!this.state.hasBegun)
        this.fetchData();
      }

    hasWon(){
        if(this.state.cards.length/2 - this.state.pairs == 0){
            this.setState({hasWon : !this.state.hasWon, hasBegun : !this.state.hasBegun})
            window.alert("Félicitations, vous avez gagné !");
        }
    }

    render(){
        return( 
        <div className="memory">
            <Controls hasBegun = {this.state.hasBegun} pairs_nb = {cardData.length} pairs_in_game = {this.state.pairs_number} submit = {this.handleSubmit} hasWon = {this.state.cards.length/2 - this.state.pairs == 0}/>
            <CardBoard cards={this.state.cards} CardOnClick = {this.handleFlip} />
            <InfoZone remaining = {this.state.cards.length/2 - this.state.pairs} last={this.state.lastCard ? this.state.lastCard.description : "?"} flips={this.state.tries} />
        </div>
        )
    }
}