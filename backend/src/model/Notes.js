import mongoose  from "mongoose";

// 1st step - creating a schema
// 1nd step - creating a model based on the schema
const noteSchema =  new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,

        },
        content: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);

const Note = mongoose.model("Note", noteSchema);

export default Note