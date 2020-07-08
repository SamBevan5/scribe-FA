import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import UserContext from '../context/UserContext';

export default (props) => {

    const {userData, setUserData} = useContext(UserContext)
    const history = useHistory();

    const logout = () => {
        setUserData ({
            token: undefined,
            user: undefined
        })
        localStorage.removeItem("auth-token")
        history.push('/')
    }


    return (
        <div className= "nav">
            <div className="nav__img">
                <a href="/"><img src="scribe-main-logo.png" alt="scribe-logo"></img></a>
            </div>
            <div className="nav__links">
                {userData.token ? 
                (<><Link to="" style={{ textDecoration: 'none' }}><span onClick={logout}>Logout</span></Link></>) : 
                (<>
                <Link to="/login" style={{ textDecoration: 'none' }}><span id="login-text">Log In</span></Link></>)}
                <Link to="/register" style={{ textDecoration: 'none' }}><span id="signup-text">Sign Up</span></Link>
            </div>
        </div>
    );
};