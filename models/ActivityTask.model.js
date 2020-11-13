const {Schema, model} = require("mongoose");

const ActivityTaskSchema = new Schema(
    {
        title: {type: String},
        description: {required: true, type: String},
        initialDate: {required: true, type: String},
        endDate: {required: true, type: String},
        year: {required: true, type: Number},
        month: {required: true, type: Number} ,
        day: {required: true, type: String},
        userId: { type: String}
    }
)

module.exports = model("ActivityTask", ActivityTaskSchema);

