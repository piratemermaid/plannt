import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
    const { plants } = props;

    return (
        <div>
            <h2>Your Plants</h2>
            {plants.length < 1 ? (
                <p>You have no plants</p>
            ) : (
                <ul>
                    {plants.map(({ name }) => {
                        return <li>{name}</li>;
                    })}
                </ul>
            )}
            <Link to="/add_plant">Add Plant</Link>
        </div>
    );
};

export default Home;
