const createIntegrationToken = {
    "type": "object",
    "properties": {
        "serviceName": {
            "type": "string"
        },
        "username": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        // "encryption": {
        //     "type": "object",
        //     "properties": {
        //         "enable": {
        //             "type": "boolean"
        //         },
        //         "algorithm": {
        //             "type": "string"
        //         },
        //     },
        //     "required": [
        //         "enable",
        //         "algorithm"
        //     ]
        // },
        // "apiAccess": {
        //     "type": "object"
        // },
        // "apiEncryption": {
        //     "type": "object"
        // }
    },
    "required": [
        "serviceName",
        "username",
        "email",
        // "encryption",
        // "apiAccess",
        // "apiEncryption"
    ]
};

const updateIntegrationToken = {
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
    createIntegrationToken,
    updateIntegrationToken,
}