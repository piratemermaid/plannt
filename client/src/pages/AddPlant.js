import React, { Component } from "react";

class AddPlant extends Component {
    constructor() {
        super();

        this.state = { name: "", nickname: "", type: "" };
    }

    onInputChange = (e, inputName) => {
        this.setState({ [inputName]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    };

    renderInput = (inputName) => {
        return (
            <input
                type="text"
                placeholder={inputName}
                value={this.state[inputName]}
                onChange={(e) => this.onInputChange(e, inputName)}
            />
        );
    };

    render() {
        return (
            <div>
                <h2>Add Plant</h2>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    {this.renderInput("name")}
                    {this.renderInput("nickname")}
                    {this.renderInput("type")}
                    <button onClick={(e) => this.onSubmit(e)}>Add</button>
                </form>
            </div>
        );
    }
}

export default AddPlant;
