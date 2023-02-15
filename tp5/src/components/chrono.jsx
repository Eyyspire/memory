import React from 'react';

export default class Chrono extends React.Component{

    constructor(props){
        super(props);
        this.state = {time : 0}
        this.interval;
    }

    componentDidMount(){
        this.interval = setInterval(this.updateTime.bind(this), 1000);

    }

    componentDidUpdate(previousProps){
        if((previousProps.hasBegun != this.props.hasBegun && this.props.hasBegun)){
            this.setState({time : 0})
            this.interval = setInterval(this.updateTime.bind(this), 1000);
        }
    }


    updateTime(){
        if(this.props.hasBegun && !this.props.hasWon){
            this.setState({time : this.state.time + 1})
        }
        else{
            clearInterval(this.interval);
        }
    }

    render(){
        return(
            <div>
                {this.state.time}
            </div>
        )
    }

}