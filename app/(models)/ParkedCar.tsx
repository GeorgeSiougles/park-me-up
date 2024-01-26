import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

const parkedCarSchema = new Schema({
  carPlates: String,
  carModel: String,
  ownerPhone: String,
});

const ParkedCar =
  mongoose.models.ParkedCar || mongoose.model("ParkedCar", parkedCarSchema);

export default ParkedCar;
