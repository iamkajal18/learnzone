import mongoose from "mongoose";

const isSubscribedSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "Guest",
  },
  email: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const IsSubscribed = mongoose.models.IsSubscribed || mongoose.model("IsSubscribed", isSubscribedSchema);

export default IsSubscribed;
