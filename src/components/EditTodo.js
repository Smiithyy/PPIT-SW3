//Importing necessary libraries
import { Component } from 'react';
import React from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor() {
        super();

        //Setting the info to be stored in the correct variables
        this.onChangeTodoType = this.onChangeTodoType.bind(this);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoDueDate = this.onChangeTodoDueDate.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //Variables used to store the created data
        this.state = {
            todo_type: '',
            todo_description: '',
            todo_due_date: '',
            todo_priority: '',
        }
    }

    //This function is used if a specific piece of data is used. In this case the unique id
    componentDidMount() {
        //Confirming the correct id is pulled (debugging)
        console.log("ID: " + this.props.match.params.id);

        //Pulling specific data from DB based off of the unique id
        axios.get('http://localhost:4000/api/todos/' + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    _id: response.data.id,
                    type: response.data.type,
                    description: response.data.description,
                    date: response.data.due_date,
                    priority: response.data.priority
                })
            })

            .catch((error) => {
                console.log(error);
            })
    }

    //Setting the correct data to be stored in the 'type' variable
    onChangeTodoType(e) {
        this.setState({
            todo_type: e.target.value
        });
    }

    //Setting the correct data to be stored in the 'description' variable
    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    //Setting the correct data to be stored in the 'date' variable
    onChangeTodoDueDate(e) {
        this.setState({
            todo_due_date: e.target.value
        });
    }

    //Setting the correct data to be stored in the 'priority' variable
    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    //Telling the Form to store the data when the button is clicked
    onSubmit(e) {
        //Preventing this function from being called when i dont want it to 
        e.preventDefault();

        //Alert to let user know their request has been processes
        alert("**TODO UPDATED**");

        //Storing the information in the correct variables based off unique id
        const newTodo = {
            _id: this.state._id,
            type: this.state.todo_type,
            description: this.state.todo_description,
            due_date: this.state.todo_due_date,
            priority: this.state.todo_priority
        }

        //Posting the data to the server
        axios.put('http://localhost:4000/api/todos/' + this.state.id, newTodo)
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Create New Todo</h3>

                {/* Form for user to input data */}
                <form onSubmit={this.onSubmit}>

                    {/* Div for the Todo Type using the 'Select' feature */}
                    <div className="form-group">
                        <label for="type">Todo Type</label>
                        <select class="form-control"
                            id="type"
                            value={this.state.todo_type}
                            onChange={this.onChangeTodoType}>
                            <option>Select Option</option>
                            <option>Exam</option>
                            <option>Assignment</option>
                        </select>
                    </div>

                    {/* Div for the Todo Description using the input type 'text' feature */}
                    <div className="form-group">
                        <label for="description">Todo Description</label>
                        <input type="text"
                            className="form-control"
                            id="description"
                            value={this.state.todo_description}
                            onChange={this.onChangeTodoDescription}
                        />
                    </div>

                    {/* Div for the Todo Due Date using the input type 'date' feature */}
                    <div className="form-group">
                        <label for="dueDate">Due Date</label>
                        <input type="date"
                            className="form-control"
                            id="dueDate"
                            value={this.state.todo_due_date}
                            onChange={this.onChangeTodoDueDate}
                        />
                    </div>

                    {/* Div for the Todo Priority using the input type 'radio' feature */}
                    {/* Low Priority */}
                    <div className="form-group">
                        <label for="priority">Priority</label><br />
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityLow"
                                value="Low"
                                checked={this.state.todo_priority === 'Low'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Low</label>
                        </div>

                        {/* Medium Priority */}
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityMedium"
                                value="Medium"
                                checked={this.state.todo_priority === 'Medium'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>

                        {/* High Priority */}
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityHigh"
                                value="High"
                                checked={this.state.todo_priority === 'High'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">High</label>
                        </div>

                    </div>
                    <div className="form-group">
                        {/* Button to submit data */}
                        <input type="submit" value="Update Todo" className="btn btn-dark" />
                    </div>
                </form>
            </div>
        );
    }
} 