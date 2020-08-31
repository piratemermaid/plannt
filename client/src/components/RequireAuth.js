import React, { PropTypes } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

export default function (ComposedComponent) {
    class RequireAuth extends React.Component {
        componentDidMount() {
            this.checkAndRedirect();
        }

        componentDidUpdate() {
            this.checkAndRedirect();
        }

        async checkAndRedirect() {
            await axios({
                method: "get",
                url: "/api/account/authenticated"
            })
                .then((res) => {
                    if (!res.data.authenticated) {
                        this.props.history.push("/login");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        render() {
            return (
                <div>
                    {this.props.authenticated ? (
                        <ComposedComponent {...this.props} />
                    ) : null}
                </div>
            );
        }
    }

    return withRouter(RequireAuth);
}
