const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema(
    {
        id: {
            type: String,
            hashKey: true,
            required: true,
        },
        name: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);


const PlanModel = dynamoose.model("Plans", schema, {
    create: true,
    // throughput: {
    //   read: 5,
    //   write: 5,
    // },
    throughput: "ON_DEMAND",
});

module.exports = PlanModel;