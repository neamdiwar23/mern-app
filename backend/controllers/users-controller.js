
const { validationResult } = require('express-validator')
const HttpError = require('../models/http-error');
const User = require('../models/user');

const DUMMY_USERS = [
    {
        id: "u1",
        name:"Nishita Patil",
        email: "test@test.com",
        password:"test1"
    }
];

const getUsers = async (req, res, next) => {
    let users;
    try{
         users = await User.find({}, '-password');
    }catch(err){
        const error = new HttpError('Fetching users failed, please try again later.', 500);
        return next(error);
    }
    
    res.json({users: (await users).map(user => user.toObject({getters: true}))});
}

const signup = async (req, res, next) => {
        
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        console.log(errors);
        const error = new HttpError('Invalid inputs passed, please check your data.', 422);
        return next(error);
    }

    const { name, email, password } = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email: email});        
    }catch(err){
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

    if (existingUser){
        const error = new HttpError(
            'User exists already, please login instead.',
            422
        );
        return next(error);        
    }

    const createdUser = new User({
        name,
        email,
        image: 'https://images.pexels.com/photos/920382/pexels-photo-920382.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        password,
        places: []
    });

    try{
        await createdUser.save();
    }catch(err){
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);     
    }

    res.status(201).json({user: createdUser.toObject({getters: true})});
    
}

const login = async (req, res, next) => {    

    const { email, password } = req.body;

    let identifiedUser;
    try{
        identifiedUser = await User.findOne({email: email});        
    }catch(err){
        const error = new HttpError(
            'Login failed, please try again.',
            500
        );
        return next(error);
    }

    if (!identifiedUser || identifiedUser.password !== password){
        const error = new HttpError('Invalid credentials, could not log you in.', 401);
        return next(error);
    }

    res.json({message:'Logged in!', user: identifiedUser.toObject({getters: true}) })
    
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;