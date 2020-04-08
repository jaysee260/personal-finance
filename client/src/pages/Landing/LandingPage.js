import React from "react";
import "./landing.css";

import {
    Header,
    Navbar,
    Body,
    Footer
} from "./components"

function LandingPage() {
    return ( 
        <div id="landing-page">
            <Header />
            <Navbar />
            <Body>

                <p className="welcome">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat consequatur, delectus ipsam repellendus laudantium iste numquam, quis blanditiis eum voluptatibus nam nisi iusto natus minus corrupti. Deserunt quas tempore ullam quibusdam eos
                    ipsum error consectetur, quis fugiat unde eaque minus quasi odit corporis aliquid reprehenderit illo voluptatibus perferendis neque molestias?
                    <br /><br /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat consequatur, delectus ipsam repellendus laudantium iste numquam, quis blanditiis eum voluptatibus nam nisi iusto natus minus corrupti. Deserunt quas tempore ullam quibusdam
                    eos ipsum error consectetur, quis fugiat unde eaque minus quasi odit corporis aliquid reprehenderit illo voluptatibus perferendis neque molestias?
                </p>



                <form className="login-form" action="">
                    <div className="form-header">
                        <h3>Expense Tracker</h3>
                        <p>Login</p>
                    </div>
                    
                    <div className="form-group">
                        <input type="text" className="form-input" placeholder="email@example.com" />
                    </div>
                    
                    <div className="form-group">
                        <input type="password" className="form-input" placeholder="password" />
                    </div>
                    
                    <div className="form-group">
                        <button className="form-button" type="submit">Login</button>
                    </div>
                    <br />
                    <div className="form-footer">
                        Don't have an account? <a href="#">Sign Up</a>
                    </div>
                </form>

            </Body>
    
            <Footer />
        </div>
    )
}

export default LandingPage;