import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

const parkedCarSchema = new Schema(
  {
    carPlateLetters: String,
    carPlateNumbers: String,
    carModel: String,
    ownerPhone: String,
  },
  {
    timestamps: true,
  }
);

const ParkedCar =
  mongoose.models.ParkedCar || mongoose.model("ParkedCar", parkedCarSchema);

export default ParkedCar;
