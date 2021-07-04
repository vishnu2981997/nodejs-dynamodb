const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema(
    {
        id: {
            type: String,
            hashKey: true,
            required: true,
        },
        serviceName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        tokens: {
            type: Object,
            required: true,
            schema: {
                accessToken: {
                    type: String,
                    required: true,
                }
            }
        },
        createdBy: {
            type: String,
            required: true,
        },
        updatedBy: {
            type: String,
            required: true,
        },
        createdFrom: {
            type: String,
            required: true,
        },
        updatedFrom: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
// encryption: {
//     type: Object,
//         required: true,
//         schema: {
//         enable: {
//             type: Boolean,
//         default: false,
//         },
//         algorithm: {
//             type: String,
//                 required: true,
//         },
//         keys: {
//             type: Array,
//                 schema: [Object]
//         }
//     }
// },
// apiAccess: {
//     type: Object,
// },
// apiEncryption: {
//     type: Object,
// }

const IntegrationTokenModel = dynamoose.model("IntegrationTokens", schema, {
    create: true,
    // throughput: {
    //   read: 5,
    //   write: 5,
    // },
    throughput: "ON_DEMAND",
});

module.exports = IntegrationTokenModel;