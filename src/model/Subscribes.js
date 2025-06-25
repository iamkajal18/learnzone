import mongoose from "mongoose";

const schema = new mongoose.Schema({


    email: {

        type: String,

        required: true,

    },
    


});

const Subscriber = mongoose.models.Subscriber || mongoose.model("Subscriber", schema);

export default Subscriber; 