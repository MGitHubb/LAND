const dbService = require('./DbService.js');
const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');
const UserService = require('./UserService')

exports.addPost =(req, res) => {
    if(!req.body.uid){
        res.status(400).send('User id is required'); 
        return;
    }
    if(!req.body.sid){
        res.status(400).send('Sale id is required'); 
        return;
    }
    dbService.insert({
        uid: req.body.uid,
        sid: req.body.sid,
    }).into('post').then( () => {
        res.json({ success: true, message: 'ok' }); 
    }).catch( error => {
        res.json({ success: false, message: error.message });
    })
}

exports.getUserBySid = (req, res) => {
    if(!req.body.sid){
        res.status(400).send('Sale id is required'); 
        return;
    }
    
    dbService.where({
        sid: req.body.sid
    }).select('uid')
    .from('post').then(users => {
        res.json(users[0].uid);
    }).catch( error => {
        res.json({ success: false, message: error.message });
    });
}

exports.getSalesByUid = async (req, res) => {

    dbService.where({
        uid: `${parseInt(req.params.id)}`
    }).select('sid')
    .from('post').then(sales => {
        res.send(sales);
    }).catch( error => {
        res.json({ success: false, message: error.message });
    });
}

exports.deletePostBySid = (req, res) => {
    sale_id = parseInt(req.params.id);
        
    axios.post('http://localhost:5000/api/posts/user', {
            sid: req.params.id
        }).then(post_res => {
            if(!post_res.data.uid){
                res.send('Post nonexistent'); 
                return;
            }
            console.log(`statusCode: ${post_res.status}`);
            console.log(post_res);
            if(post_res.data.uid == req.user.user.uid){
                dbService('post').where({
                    sid: `${parseInt(req.params.id)}`
                }).del().then( () => {
                    axios.delete(`http://localhost:5000/api/sales/${sale_id}`)
                    .then(del_res => {
                            console.log(`statusCode: ${del_res.status}`);
                            console.log(del_res);
                        }).catch(error => {
                            console.error(error);
                        });
                    res.json({ success: true, message: 'ok' }); 
                
                }).catch( error => {
                        res.json({ success: false, message: 'Error! Post not deleted' });
                })
            }
            else{
                res.json({ success: false, message: 'Not allowed' });
            }
        }).catch(error => {
            console.error(error);
            res.json({ success: false, message: 'Error! Sale not deleted' });
        });
};

exports.deletePosts = (req, res) => {
    
}
