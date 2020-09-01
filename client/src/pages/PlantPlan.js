import _ from "lodash";
import React from "react";
import { withRouter } from "react-router";
import PlanRow from "../components/PlanRow";

const PlantPlan = (props) => {
    const { plans } = props;
    const { name } = props.match.params;

    if (props.plans.length < 1) {
        return "loading...";
    }

    const plan = _.find(plans, { name });

    const {
        watering_instructions,
        watering_days,
        mist_days,
        sunlight_level,
        indoor,
        outdoor,
        temperature,
        humidity,
        lifespan,
        notes
    } = plan;

    let indoorOutdoorStr = "Indoor/outdoor: ";
    if (indoor && outdoor) {
        indoorOutdoorStr += " both";
    } else if (indoor) {
        indoorOutdoorStr += " indoor";
    } else if (outdoor) {
        indoorOutdoorStr += " outdoor";
    }

    return (
        <div>
            <h2>Plant Plan</h2>
            <h3>{name}</h3>
            <h4>Watering</h4>
            <ul>
                {watering_days ? (
                    <PlanRow
                        string={`Water every ${watering_days} days`}
                        icon="water"
                    />
                ) : null}
                {watering_instructions ? (
                    <PlanRow string={watering_instructions} icon="water" />
                ) : null}
                {mist_days ? (
                    <PlanRow
                        string={`Mist every ${mist_days} ${
                            mist_days > 1 ? "days" : "day"
                        }`}
                        icon="water"
                    />
                ) : null}
            </ul>
            <h4>Environment</h4>
            <ul>
                {sunlight_level ? (
                    <PlanRow string={`Sunlight level: ${sunlight_level}`} />
                ) : null}
                {indoorOutdoorStr ? (
                    <PlanRow string={indoorOutdoorStr} />
                ) : null}
                {temperature ? (
                    <PlanRow string={`Temperature: ${temperature}`} />
                ) : null}
                {humidity ? <PlanRow string={`Humidity: ${humidity}`} /> : null}
            </ul>
            {lifespan ? <h4>Lifespan</h4> : null}
            {lifespan ? (
                <ul>
                    <PlanRow
                        string={`Lifespan: ${lifespan.amt} ${lifespan.type}`}
                    />
                </ul>
            ) : null}
            <h4>Notes</h4>
            {notes ? (
                <ul>
                    <PlanRow string={`Notes: ${notes}`} />
                </ul>
            ) : null}
        </div>
    );
};

export default withRouter(PlantPlan);
