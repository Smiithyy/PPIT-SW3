//Importing necessary libraries
import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    render(){
        return(
            <div>
                {/* User Welcome Message*/}

                <center>
                    <h1>Welcome to 'Student Helper'</h1>
                    <p>This App has been designed to help keep you onto of your exams and assignments</p>
                    <p>To get started click the button below</p>

                    {/* CLicking the butoon below brings the user to the 'Create Todo' page*/}

                    <Link to={"/create"} className="btn btn-dark">Get Started</Link>

                </center>
            </div>
        );
    }
}

export default Home;