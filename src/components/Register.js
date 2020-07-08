import React from 'react';
import Axios from 'axios'
import UserContext from '../context/UserContext'
import {useHistory} from 'react-router-dom';



export default (props) => {
    const [username, setUsername] = React.useState()
    const [password, setPassword] = React.useState()

    const {setUserData} = React.useContext(UserContext)
    const history = useHistory();

    const [errorStatus, setErrorStatus] = React.useState(false)

    const submit = async (event) => {
        event.preventDefault()
        try {
            const newUser = {username, password}
            await Axios.post('http://backend-scribe.herokuapp.com/users/register', newUser)
            const loginResponse = await Axios.post('http://backend-scribe.herokuapp.com/users/login', {username, password})
            await setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            })
            await localStorage.setItem("auth-token", JSON.stringify(loginResponse.data.token))
             history.push('/dashboard');
        }
        catch(error) {
            setErrorStatus(true)
        }
    }

    const updateErrorStatus = async (variable) => {
        await setErrorStatus(variable);
    }

    return (
        <div className="App">
            <form className="login-div" onSubmit={submit}>
                <fieldset>
                    <legend>Register:</legend>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" onChange={(event) => setUsername(event.target.value)}/><br/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" onChange={(event) => setPassword(event.target.value)}/><br/>
                    <input type="submit" value= 'Register'/>
                 </fieldset>
                
            </form>

            {errorStatus ? 
                <div className="error-modal">
                    <div className="error-modal-textbox">
                        
                        <h2>Oops! Something went wrong! </h2>
                        <h4>Seems like someone may already have that username/password.</h4>
                        <div id="modal-footer">
                            <button className="modal-buttons" onClick={() => {
                                updateErrorStatus(false)
                            }}>
                            Close
                            </button>
                        </div>
                    </div>
                </div> 
                : ""}
        </div>
    );
};
