import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";

class SearchPlant extends Component {
    constructor() {
        super();

        this.state = {
            selectedPlant: {},
            selectOptions: []
        };
    }

    handleChange = (e) => {
        this.setState({ selectedPlant: e.value });
    };

    async getPlants() {
        const { data } = await axios({ method: "get", url: "/api/app/plants" });
        this.setState({
            selectOptions: data.map(({ name, nickname, type }) => {
                let label = `${name} (${type || "unknown type"})`;
                if (nickname) {
                    label += ` - ${nickname}`;
                }
                return {
                    value: { name, nickname, type },
                    label
                };
            })
        });
    }

    async componentDidMount() {
        this.getPlants();
    }

    render() {
        const { selectedPlant, selectOptions } = this.state;

        return (
            <div>
                <h2>Search for a Plant</h2>
                <div>
                    <Select
                        className="plant-select"
                        options={selectOptions}
                        onChange={this.handleChange.bind(this)}
                        styles={customStyles}
                    />
                </div>
                <div>
                    <p>
                        Don't see your plant?{" "}
                        <Link to="/add_plant">Add It</Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default SearchPlant;

const customStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { isFocused }) => {
        return {
            ...styles,
            backgroundColor: isFocused ? "#46b164" : "white",
            color: isFocused ? "white" : "rgb(50,50,50)"
        };
    }
};
