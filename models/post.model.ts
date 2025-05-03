import { model, models, Schema } from "mongoose";

const PostSchema = new Schema(
  {
    text: { type: String, required: true },
    image: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
