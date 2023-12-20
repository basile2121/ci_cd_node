import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface IUser {
    _id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    birthday: Date,
    isAdmin: Boolean,
}

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    birthday: {
        type: Date,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true,
});
UserSchema.pre('save', async function(next: any) {
    if(this.password){
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();

});
export const User = mongoose.model('user', UserSchema);