import {IUser, User} from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const findOne = async(data: IUser) => {
    const user = await User.findOne(data);
    if (!user) {
        throw Error('User not found');
    }
    return user;
};

export const register = async(data: IUser) => {
    try {
        const user: IUser | null = await User.findOne({email: data.email});
        if (user) {
            return new Error('Email already exists');
        }
        const newUser = new User(data);
        return newUser.save();
    } catch (e) {
        return e;
    }
};
export const login = async(email: string, password: string) => {
    try {
        const user = await loginCompare(email, password);
        if (!user) {
            return new Error('Incorrect credentials');
        }
        return user as Partial<IUser>;
    } catch (e) {
        return e;
    }
};


export const createToken = (id: string) => {
    const secret = process.env.TOKEN_SECRET;
    const maxAge = 3 * 24 * 60 * 60 * 1000;
    if (secret) {
        return jwt.sign({id}, secret, {
            expiresIn: maxAge
        });
    }
};

const loginCompare = async function(email: string, password: string) {
    const user = await User.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password as string);
        if (auth) {
            user.password = undefined;
            return user;
        }
        return new Error('incorrect password');
    }
    return new Error('incorrect email');
};