// ab hum banayenge ek model 
//  matlb database 
// database banane me meri madad karega mongoose 
// schema means - dhacha 
import mongoose from "mongoose";

const feedback = new mongoose.Schema({

    name: {

        type: String,

        required: true,

    },

    email: {

        type: String,

        required: true,

    },
    testimonial: {

        type: String,

        required: true,

    },

    

});

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedback);

export default Feedback; 