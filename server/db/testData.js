const testUser = {
    email: "a@a.com",
    username: "testuser",
    password: "userpass"
};

const plants = [
    { name: "Jade", nickname: null, type: "succulent" },
    {
        name: "Tradescantia Nanouk",
        nickname: "Pink Wandering Jew",
        type: "succulent"
    }
];

const plans = [
    {
        plantName: "Tradescantia Nanouk",
        username: "testuser",
        instructions: {
            watering_instructions: "Water when soil is mostly dry",
            watering_days: 7,
            mist_days: 1,
            sunlight_level: "Bright indirect",
            repot: "",
            indoor: true,
            outdoor: false,
            temperature: null,
            humidity: null,
            lifespan: { type: "years", amt: 3 },
            notes: "This plant is so beautiful"
        }
    },
    {
        plantName: "Jade",
        username: "testuser",
        instructions: {
            watering_instructions: "Water when top 2 inches of soil are dry",
            watering_days: 7,
            mist_days: null,
            sunlight_level: "Bright direct",
            repot: "",
            indoor: true,
            outdoor: true,
            temperature: null,
            humidity: null,
            lifespan: { type: "years", amt: 10 },
            notes: "Trim to keep from falling over on itself as it grows"
        }
    }
];

const plantCare = [
    {
        plantName: "Tradescantia Nanouk",
        username: "testuser",
        care: {
            watered: "2020-08-29",
            misted: "2020-08-31",
            dusted: null,
            repotted: null
        }
    },
    {
        plantName: "Jade",
        username: "testuser",
        care: {
            watered: "2020-08-26",
            misted: null,
            dusted: null,
            repotted: null
        }
    }
];

module.exports = { testUser, plants, plans, plantCare };
