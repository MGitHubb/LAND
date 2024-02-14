var express = require('express')
var app = express()

const cloudinary = require("cloudinary").v2;
const bodyParser = require('body-parser');
const fs = require('fs')
          
// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cloudinary configuration
cloudinary.config({
  cloud_name: "dk1dn6wvk",
  api_key: "589641138448865",
  api_secret: "4xd-7D22yW2Z9jcIAtr_3lrF0v8"
});

exports.uploadToCloudinary = async (locaFilePath) => {
    // locaFilePath :
    // path of image which was just uploaded to "uploads" folder
    var mainFolderName = "main"
    var filePathOnCloudinary = mainFolderName + "/" + locaFilePath
    // filePathOnCloudinary :
    // path of image we want when it is uploded to cloudinary
    console.log(locaFilePath);
    return cloudinary.uploader.upload(locaFilePath,{"public_id":filePathOnCloudinary})
    .then((result) => {
      // Image has been successfully uploaded on cloudinary
      // So we dont need local image file anymore
      // Remove file from local uploads folder 
      fs.unlinkSync(locaFilePath)
      
      return {
        message: "Success",
        url:result.url
      };
    }).catch((error) => {
      // Remove file from local uploads folder 
      fs.unlinkSync(locaFilePath)
      return {message: "Fail",};
    });
  }

exports.buildSuccessMsg = (urlList) => {
    // Building success msg
    var response = '<h1><a href="/">Click to go to Home page</a><br></h1><hr>'
    
    for(var i=0;i<urlList.length;i++){
      response += "File uploaded successfully.<br><br>"
      response += `FILE URL: <a href="${urlList[i]}">${urlList[i]}</a>.<br><br>`
      response += `<img src="${urlList[i]}" /><br><hr>`
    }
    response += `<br><p>Now you can store this url in database or do anything with it  based on use case.</p>`
    return response  
}