//Importing required libraries
import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class TodoItem extends React.Component {

    constructor() {
        super();

        //Setting delete function
        this.DeleteTodo = this.DeleteTodo.bind(this);
    }

    //Delete Function that deletes based off unique id
    DeleteTodo(e) {
        //Preventing this function from being called when i dont want it to 
        e.preventDefault();

        //Confirming the correct id is pulled (debugging)
        console.log("Delete: " + this.props.todo._id);

        //Deleting the specific data from the DB based off of the unique id
        axios.delete("http://localhost:4000/api/todos/" + this.props.todo._id)
            .then(() => {
                //Realoading the page after data has been deleted
                this.props.ReloadData();
            })
            .catch();
    }

    render() {
        return (
            <div>
                {/* Table to display server data */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {/* Table Headers */}
                            <th width="100">Type</th>
                            <th width="400">Description</th>
                            <th width="80">Due Date</th>
                            <th width="80">Priority</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* Passing the DB data into the table as table data */}
                            <td>{this.props.todo.type}</td>
                            <td>{this.props.todo.description}</td>
                            <td>{this.props.todo.date}</td>
                            <td>{this.props.todo.priority}</td>
                            {/* Using a link button to bring the user to the edit page of a specific todo based off of its unique id */}
                            <td width="95"><Link to={"/Edit/" + this.props.todo._id} className="btn btn-dark">Edit</Link></td>
                            {/* Button to call the delete function and deleted the data based off of it unique id */}
                            <td width="95"><Button variant="danger" onClick={this.DeleteTodo}>Delete</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}