//Importing necessary libraries
import React from 'react';
import axios from 'axios';
import '../App.css';
import { Todos } from './Todos';

class TodoList extends React.Component {

    constructor() {
        super();

        //Setting reload function
        this.ReloadData = this.ReloadData.bind(this);
    }

    //DB array that stores data for todos
    state = {
        todos: []
    };

    //Setting up function that checks for the unique id
    componentDidMount() {
        axios.get('http://localhost:4000/api/todos')
            .then((response) => {
                this.setState({ todos: response.data })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    //Setting up the reload function
    ReloadData() {
        axios.get('http://localhost:4000/api/todos')
            .then((response) => {
                this.setState({ todos: response.data })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
        return (
            <div className="App">

                <h1>Todo List</h1>

                {/* Calling the reload function */}
                <Todos todo={this.state.todos} ReloadData={this.ReloadData}></Todos>

            </div>
        );
    }
}

export default TodoList;