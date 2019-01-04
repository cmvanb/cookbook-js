import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Recipe extends Component {
    constructor() {
        super();

        this.state = {
            title: 'no recipe selected',
        };
    }

    render() {
        return (
            <h1>{this.state.title}</h1>
        );
    }
}

export default Recipe;

