import { Schema, model, models } from "mongoose";

interface UserIn {
    email: string;
    username: string;
    image?: string;
}
const UserSchema = new Schema<UserIn>({ 
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }

});

const User = models.User || model<UserIn>("User", UserSchema)

export default User;