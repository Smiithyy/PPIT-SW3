//Library Imports
import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

//Component Imports
import Home from "./components/Home"
import TodoList from "./components/TodoList";
import EditTodo from "./components/EditTodo";
import CreateTodo from "./components/CreateTodo";

//Import Images
import logo from "./gmit.png";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">

          {/* Navbar for top of all pages */}
          <Navbar bg="dark" variant="dark">
            {/* Using the GMIT logo image as a link to the GMIT website */}
            <a class="navbar-brand" href="https://www.gmit.ie/" target="_blank">
              <img src={logo} width="100" height="100" alt="GMIT" />
            </a>
            {/* Setting navbar options and their corosponding links to other pages */}
            <Navbar.Brand href="/">Student Helper</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/todo">Todo List</Nav.Link>
              <Nav.Link href="/create">Create Todo</Nav.Link>
            </Nav>
          </Navbar>
          <br />

          {/* Routing Components */}
          <Route path="/" exact component={Home} />
          <Route path="/todo" component={TodoList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </div>

      </Router>
    );
  }
}

export default App;
