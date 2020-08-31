import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import RequireAuth from "./components/RequireAuth";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import Page from "./pages/Page";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { authenticated: false, playthrough: null };

        this.authenticateUser = this.authenticateUser.bind(this);
    }

    authenticateUser(bool) {
        this.setState({ authenticated: bool });
    }

    logOut = () => {
        axios({
            method: "get",
            url: "/api/account/logout"
        })
            .then((res) => {
                if (res.data.logout === "success") {
                    this.authenticateUser(false);
                    this.props.history.push("/");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    async componentDidMount() {
        await axios({
            method: "get",
            url: "/api/account/authenticated"
        })
            .then((res) => {
                this.setState({ authenticated: res.data.authenticated });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const { authenticated, playthrough } = this.state;

        const AuthHome = RequireAuth(Home);
        const AuthPage = RequireAuth(Page);

        return (
            <div className="App">
                <BrowserRouter>
                    <header>
                        {authenticated ? (
                            <nav>
                                <Link to="/login" onClick={this.logOut}>
                                    Log Out
                                </Link>
                            </nav>
                        ) : null}
                    </header>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <AuthHome
                                    authenticated={authenticated}
                                    authenticateUser={this.authenticateUser}
                                />
                            )}
                        />
                        <Route
                            path="/login"
                            render={() => (
                                <Login
                                    playthrough={playthrough}
                                    authenticateUser={this.authenticateUser}
                                />
                            )}
                        />
                        <Route
                            path="/signup"
                            render={() => (
                                <Signup
                                    authenticateUser={this.authenticateUser}
                                />
                            )}
                        />
                        <Route
                            path="/page"
                            render={() => (
                                <AuthPage authenticated={authenticated} />
                            )}
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
