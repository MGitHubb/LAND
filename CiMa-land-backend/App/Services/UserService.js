const dbService = require('./DbService.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.getAllUsers = (req, res) => {
    dbService.select('username', 'email')
    .from('user').then(users => {
        res.json(users);
    });
}

exports.getUserById = (req, res) => {
    dbService.where({
        uid: `${parseInt(req.params.id)}`
    }).select('username', 'email')
    .from('user').then(users => {
        res.json(users[0]);
    });
}

exports.registerUser = (req, res) => {
    if(!req.body.username){
        res.status(400).send('Name is required'); 
        return;
    }
    if(!req.body.email){
        res.status(400).send('Email is required'); 
        return;
    }
    if(!req.body.pass){
        res.status(400).send('Password is required'); 
        return;
    }

    const saltRounds = 10;
    const plaintextPassword = req.body.pass;
    try {
        bcrypt.hash(plaintextPassword, saltRounds, function(err, hash){
            dbService.insert({
                username: req.body.username,
                email: req.body.email,
                pass: hash
            }).into('user').then( () => {
                res.json({ success: true, message: 'ok' }); 
            }).catch( error => {
                res.json({ success: false, message: error.message });
            })
        })
    }
    catch(err) {
        res.status(500).send('Hashing error!');
    }
};

exports.loginUser = (req, res) => {
    if(!req.body.username){
        res.status(400).send('Name is required'); 
        return;
    }
    if(!req.body.pass){
        res.status(400).send('Password is required'); 
        return;
    }


    dbService.where({
        username: req.body.username
    }).select('uid','username','email','pass')
    .from('user').then(users => {
        if(users[0]){
            bcrypt.compare(req.body.pass, users[0].pass, function(err, result) {
                if(result==true){
                    jwt.sign({ user: users[0] }, "secretkey", (err, token) => {
                        res.json({token});
                    });
                }
                else{
                    res.json({ success: false, message: 'Wrong password!' });
                }
            })
        }
        else{
            res.json({ success: false, message: 'User not found!' });
        }
    })
};

exports.deleteUserById = (req, res) => {
    if(req.user.user.uid == req.params.id){
        dbService('user').where({
            uid: `${parseInt(req.params.id)}`
        }).del().then( () => {
            res.json({ success: true, message: 'ok' }); 
        }).catch( error => {
                res.json({ success: false, message: 'Error! User not deleted' });
        })
    }
    else{
        res.json({ success: true, message: 'You can only delete your user' });
    }
};

exports.editUserById = (req, res) => {
    if(!req.body.username){
        res.status(400).send('Userame is required'); 
        return;
    }
    if(!req.body.email){
        res.status(400).send('Email is required'); 
        return;
    }
    if(!req.body.pass){
        res.status(400).send('Password is required'); 
        return;
    }

    const saltRounds = 10;
    const plaintextPassword = req.body.pass;
    if(req.user.user.uid == req.params.id){
        try {
            bcrypt.hash(plaintextPassword, saltRounds, function(err, hash){
                dbService('user').where({
                    uid: `${parseInt(req.params.id)}`
                }).update({
                    username: req.body.username,
                    email: req.body.email,
                    pass: hash
                }).then( () => {
                    res.json({ success: true, message: 'ok' }); 
                }).catch( error => {
                        res.json({ success: false, message: 'Error! User not updated' });
                })
            })
        }
        catch(err) {
            res.status(500).send('Hashing error!');
        }
    }
    else{
        res.json({ success: false, message: 'You can only edit your user' });
    }
};