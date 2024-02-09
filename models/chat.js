import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      to: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
      from: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
      type: {
        type: String,
        enum: ["text", "image", "video"],
      },
      created_at: {
        type: String,
      },
      text: {
        type: String,
      },
      file: {
        type: String,
      },
    },
  ],
});

const chat = new mongoose.model("chat", chatSchema);
export default chat;
