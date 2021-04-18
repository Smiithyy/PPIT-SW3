//Importing necessary libraries
import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    render() {
        return (
            <div>
                {/* User Welcome Message */}
                <center>
                    <h1>Welcome to 'Student Helper'</h1>
                    <p>This app has been designed to keep you ontop of your Exams and Assignments</p>
                    <p>To get started click the button below</p>
                    {/* Getting started link bringing the user to the create todo page */}
                    <Link to={"/create"} className="btn btn-dark">Get Started</Link>
                </center>
            </div>
        );
    }
}

export default Home;