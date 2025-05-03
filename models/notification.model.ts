import { model, models, Schema } from "mongoose";

const NotificationSchema = new Schema(
  {
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Notification =
  models.Notification || model("Notification", NotificationSchema);

export default Notification;
