import React from 'react';
import '../scss/styles.scss'
import Nav from './Nav'


export default (props) => {

    return (
        <>
            <Nav/>
            <div className="App">
                <div className="App__header">
                    <div className="App__header__text">
                        <h1>
                            Notetaking.<br/>
                            Easier than<br/> Ever.
                        </h1>
                        <h4>
                            Take notes anywhere, anytime. Never forget a thing again. Have all your thoughts easily accesible in one place.
                        </h4>
                        <a href="/register">
                            SIGN UP FOR FREE
                        </a>
                    </div>
                    <div className="App__header__image">
                        <img src="/scribe-banner-img.png" alt="banner"></img>
                    </div>
                </div>
                <div className="App__main-content">
                    <div className="App__main-content__infographics">
                        <div className="App__main-content__infographics__icon">
                            <img src="/legend-home.png" alt="quill-book"></img>
                            <h1>Stay Organized. Become Efficient</h1>
                        </div>
                        <div className="App__main-content__infographics__1">
                            <div className="App__main-content__infographics__1__text">
                                <h1>Keep track of thoughts. Set Goals. Be more productive.</h1>
                                <h4>Scribe helps you through the whole process from idea to action.</h4>
                                <a href="/register">TRY IT OUT ></a>
                            </div>
                            <div className="App__main-content__infographics__1__image">
                                <img src="/homepagediagram.png" alt="diagram-homepage"></img>
                            </div>
                        </div>
                        <div className="App__main-content__infographics__2">
                            <div className="App__main-content__infographics__2__image">
                                <img src="/anywherehomepage.png" alt="map-homepage"></img>
                            </div>
                            <div className="App__main-content__infographics__2__text">
                                <h1>Create a note anywhere, anytime</h1>
                                <h4>With cross-platform access scribe let's you stay organized at home or on the go.</h4>
                                <a href="/register">TRY IT OUT ></a>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div className="App__top-footer">
                    <h1>
                        Sign up for Scribe Today.
                    </h1>
                    <h4>
                        Capture ideas and store them in a place that you won't forget. Set goals and track progress towards reaching them. Become more efficient and better yourself.
                    </h4>
                    
                    <a href="/register" >SIGN UP FOR FREE</a>
                
                </div>

            </div>
        </>
    )


}