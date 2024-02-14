const dbService = require('./DbService.js');
const express = require('express');
const app = express();
const axios = require('axios');
const cloudinary = require('cloudinary').v2;
const dUri = require('datauri/parser.js');
const parser = new dUri();
const path = require('node:path'); 
var image_url = '';

app.use(express.json());

// cloudinary configuration
cloudinary.config({
  cloud_name: "dk1dn6wvk",
  api_key: "589641138448865",
  api_secret: "4xd-7D22yW2Z9jcIAtr_3lrF0v8"
});

exports.getAllSales = (req, res) => {
    dbService.select('sid', 'title', 'price', 'size', 'address', 'description', 'image')
    .from('sale').then(sales => {
        res.json(sales);
    });
}

exports.getSaleById = (req, res) => {
    dbService.where({
        sid: `${parseInt(req.params.id)}`
    }).select('sid','title', 'price', 'size', 'address', 'description', 'latitude', 'longitude', 'image')
    .from('sale').then(sales => {
        res.json(sales);
    });
}

exports.getSalesByLocation = (req, res) => {
    dbService.where({
        address: `${req.params.adr}`
    }).select('sid','title', 'price', 'size', 'address', 'description', 'image')
    .from('sale').then(sales => {
        res.json(sales);
    });
}

exports.addSale = async (req, res) => {
    if(!req.body.title){
        res.status(400).send('Title is required'); 
        return;
    }
    if(!req.body.address){
        res.status(400).send('Address is required'); 
        return;
    }
    if(!req.body.price){
        res.status(400).send('Price is required'); 
        return;
    }
    if(!req.body.size){
        res.status(400).send('Size is required'); 
        return;
    }
    if(!req.body.description){
        res.status(400).send('Description is required'); 
        return;
    }

    dbService.insert({
        title: req.body.title,
        address: req.body.address,
        price: req.body.price,
        size: req.body.size,
        description: req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        image: req.body.image
    }).into('sale').then( sid => {
        axios.post('http://localhost:5000/api/posts', {
            uid: req.user.user.uid,
            sid: sid
        }).then(res => {
            console.log(`statusCode add sale: ${res.status}`);
        }).catch(error => {
            res.json({ success: false, message: "error.message" });
        });
        res.json({ success: true, message: 'ok', sid: sid }); 
    }).catch( error => {
        res.json({ success: false, message: error.message });
    })
};

exports.addImagesToSale = async (req, res) => {
    let nr_files = 0;
    image_url = '';
    
    let files_length = req.files.length;

    req.files.map((file) => {
        const dataUri = req => parser.format(path.extname(file.originalname).toString(), file.buffer);
        if(file) {
            console.log("file",  file);
            const file_r = dataUri(req).content;
            return cloudinary.uploader.upload(file_r, {
                folder: 'test_land_project',
                context: `uid=${req.body.uid}|sid=${req.body.sid}`,
                width: 1000, 
                height: 500, 
                crop: "limit" 
            }).then((result) => {
                nr_files++;
                if(nr_files==1) {
                    image_url = result.url;
                } else {
                    image_url = image_url + ' ' + result.url;
                    console.log("2. image_url ", image_url);
                    console.log("image_url final", JSON.parse(JSON.stringify(image_url)));
                }
                if (nr_files === files_length)
                {
                    return res.status(200).json({
                        message: 'Your image has been uploded successfully to cloudinary',
                        image_url: JSON.parse(JSON.stringify(image_url))
                    })
                }
            }).catch((err) => res.status(400).json({
                messge: 'someting went wrong while processing your request',
                data: {err}
            }))
        }
    })
    
  };

exports.deleteSaleById = (req, res) => {
    sale_id = parseInt(req.params.id);
    
        dbService('sale').where({
            sid: `${sale_id}`
        }).del().then( () => {
            res.json({ success: true, message: 'Sale deleted' }); 
        }).catch( error => {
            res.json({ success: false, message: error.message });
        })

};

exports.editSaleById = (req, res) => {
    if(!req.body.landname){
        res.status(400).send('Landname is required'); 
        return;
    }
    if(!req.body.size){
        res.status(400).send('Size is required'); 
        return;
    }
    if(!req.body.location){
        res.status(400).send('Location is required'); 
        return;
    }

    axios.post('http://localhost:5000/api/posts/user', {
        sid: parseInt(req.params.id)
    }).then(post_res => {
        console.log(`statusCode: ${post_res.status}`);
        console.log(post_res);
        if(post_res.data.uid == req.user.user.uid){
            dbService('sale').where({
                sid: `${parseInt(req.params.id)}`
            }).update({
                landname: req.body.landname,
                size: req.body.size,
                location: req.body.location
            }).then( () => {
                res.json({ success: true, message: 'ok' }); 
            }).catch( error => {
                    res.json({ success: false, message: 'Error! Sale not updated' });
            })
        }
        else{
            res.json({ success: false, message: 'Not allowed' });
        }
    }).catch(error => {
        res.json({ success: false, message: error.message });
    });
};
