
import mongoose from "mongoose";

const user = new mongoose.Schema({

    username: {

        type: String,

    },

    email: {

        type: String,

        required: true,

    },
    password: {

        type: String,

        

    },

    

});

const User = mongoose.models.User || mongoose.model("User", user);

export default User; 