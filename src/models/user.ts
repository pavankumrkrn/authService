import mongoose, { Schema } from "mongoose"
import { User } from "../interfaces/interface";

const exampleAppDb = mongoose.connection.useDb('ExampleApp');

const userSchema = new mongoose.Schema({
    password: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

userSchema.index({
    email: 1
}, {
    unique: true
})


const UserModel = exampleAppDb.model<User>('User', userSchema);

UserModel.createIndexes()
  .then(() => {
    console.log('Indexes created successfully');
  })
  .catch((error) => {
    console.error('Error creating indexes:', error);
  });

export default UserModel;

