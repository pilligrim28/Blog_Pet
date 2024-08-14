import mongoose from "mongoose";
const UserScheme = new mangoose.Scheme({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,

    },
    avatarUrl: String,
},
{
timestamps: true,
},

);
export default mongoose.model('User', UserScheme);