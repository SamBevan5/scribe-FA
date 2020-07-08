import React, { useState } from 'react';
import { createBrowserHistory } from 'history';
import Login from './components/Login.js';
import Register from './components/Register'
import Home from './components/Home.js';
import Dashboard from './components/Dashboard'
import UserContext from './context/UserContext'
import {BrowserRouter, Route, Switch} from 'react-router-dom';



    
export default(props) => {
    
    let hist = createBrowserHistory()

    //STATE FOR STORING OUR JWT
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    })


    return (
        <>
            <BrowserRouter history={hist}>
                <UserContext.Provider value={{userData, setUserData}}>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/dashboard" component={Dashboard}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/login" component={Login}/>
                    </Switch>
                </UserContext.Provider>
            </BrowserRouter>
            
        </>
    )

}
