import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { registerValidation } from './validations/auth.js'
import { validationResult } from 'express-validator';

import UserModel from './models/User.js';

mongoose
    .connect('mongodb+srv://jobanikolaev:Batyrevo1@myblog.j9ox3.mongodb.net/blog?retryWrites=true&w=majority&appName=MyBlog')
    .then(() => console.log('DB ok'))
    .catch(() => console.log('DB Error', err));




const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/auth/register', registerValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    const password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash,
    });

    const user = await doc.save();

    res.json({

    });

});


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);

    }
    console.log('Server OK');
});