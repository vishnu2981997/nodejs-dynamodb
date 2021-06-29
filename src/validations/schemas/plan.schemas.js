const createPlan = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        }
    },
    "additionalProperties": false,
    "required": [
        "name"
    ]
};

const updatePlan = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        }
    },
    "additionalProperties": false,
    "anyOf": [
        {"required": ["name"]}
    ],
};

module.exports = {
    createPlan,
    updatePlan,
}