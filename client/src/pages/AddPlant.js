import React, { Component } from "react";
import axios from "axios";

class AddPlant extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            nickname: "",
            type: "",
            startedAdding: false,
            finishedAdding: false,
            addError: ""
        };
    }

    onInputChange = (e, inputName) => {
        this.setState({ [inputName]: e.target.value, addError: "" });
    };

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({ startedAdding: true });

        const { name, nickname, type } = this.state;

        const { data } = await axios({
            method: "post",
            url: "/api/app/add_plant",
            params: { name, nickname, type }
        });

        if (data.error) {
            this.setState({
                addError: data.error,
                startedAdding: false,
                finishedAdding: false
            });
        } else if (data.success) {
            this.setState({ finishedAdding: true });
        }
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

    componentDidUpdate() {
        const { name, startedAdding, finishedAdding } = this.state;
        if (startedAdding && finishedAdding) {
            this.props.history.push(`/plan/${name}`);
        }
    }

    render() {
        const { startedAdding, addError } = this.state;

        return (
            <div>
                <h2>Add Plant</h2>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    {this.renderInput("name")}
                    {this.renderInput("nickname")}
                    {this.renderInput("type")}
                    <button onClick={(e) => this.onSubmit(e)}>Add</button>
                    {startedAdding ? <p className="italic">Adding...</p> : null}
                    {addError ? <p className="error">{addError}</p> : null}
                </form>
            </div>
        );
    }
}

export default AddPlant;
