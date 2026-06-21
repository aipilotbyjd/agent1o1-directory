import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    provider: { type: String, required: true },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
