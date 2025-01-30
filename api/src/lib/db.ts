import mongoose from "mongoose";
import env from "../../env";

const connectToDatabase = async (): Promise<void> => {
    try {
      await mongoose.connect(env.DATABASE_URL);
      console.log("Connected to Database");
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };

export default connectToDatabase;