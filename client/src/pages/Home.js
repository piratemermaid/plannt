import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
    const { plans } = props;

    return (
        <div>
            <h2>Your Plant Plans</h2>
            {plans.length < 1 ? (
                <p>You have no plant plans</p>
            ) : (
                <ul>
                    {plans.map(({ plant }) => {
                        const { name } = plant;
                        return (
                            <li>
                                <Link to={`/plan/${name}`}>{name}</Link>
                            </li>
                        );
                    })}
                </ul>
            )}
            <Link to="/add_plant">Add Plant Plan</Link>
        </div>
    );
};

export default Home;
