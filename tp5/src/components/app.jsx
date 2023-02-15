import React from 'react';

import Memory from './memory.jsx'

export default class App extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <div>
            <Memory/>
        </div>
        )
    }
}