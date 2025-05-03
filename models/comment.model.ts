import { model, models, Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
