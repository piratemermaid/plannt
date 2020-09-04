import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import RequireAuth from "./components/RequireAuth";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import SearchPlant from "./pages/SearchPlant";
import AddPlant from "./pages/AddPlant";
import PlantPlan from "./pages/PlantPlan";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { authenticated: false, plans: [] };

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

        const userData = await axios({
            method: "get",
            url: "/api/user"
        });
        const { plans } = userData.data;
        this.setState({ plans });
    }

    render() {
        const { authenticated, plans } = this.state;

        const AuthHome = RequireAuth(Home);
        const AuthSearchPlant = RequireAuth(SearchPlant);
        const AuthAddPlant = RequireAuth(AddPlant);
        const AuthPlantPlan = RequireAuth(PlantPlan);

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
                                    plans={plans}
                                />
                            )}
                        />
                        <Route
                            path="/login"
                            render={() => (
                                <Login
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
                            path="/search_plant"
                            render={() => (
                                <AuthSearchPlant
                                    authenticated={authenticated}
                                />
                            )}
                        />
                        <Route
                            path="/add_plant"
                            render={() => (
                                <AuthAddPlant authenticated={authenticated} />
                            )}
                        />
                        <Route
                            path="/plan/:name"
                            render={() => (
                                <AuthPlantPlan
                                    authenticated={authenticated}
                                    plans={plans}
                                />
                            )}
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
