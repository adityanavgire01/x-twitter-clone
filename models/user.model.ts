import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    coverPhoto: { type: String },
    profilePhoto: { type: String },
    bio: { type: String },
    location: { type: String },
    hasNewNotifications: { type: Boolean, default: false },
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    notification: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
