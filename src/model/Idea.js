import mongoose from "mongoose";

const idea = new mongoose.Schema({
  author:{
    type:String
  },
  profilePhoto:{
    type:String
  },
  authorEmail:{
    type:String
  },
  
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    enum: ['html', 'markdown'],
    default: 'html'
  },
  imageUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Idea = mongoose.models.Idea || mongoose.model("Idea", idea);

export default Idea;