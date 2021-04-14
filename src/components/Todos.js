//Importing necessary libraries
import React from 'react';
import { TodoItem } from './TodoItem';

export class Todos extends React.Component {

    render() {
        //Returning the data from the database
        return this.props.todo.map((todo) => {

            //Calling the Reload function
            return <TodoItem todo={todo} ReloadData={this.props.ReloadData}></TodoItem>
        })
    }
}