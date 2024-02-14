const express = require('express');
const app = express();
app.use(express.json());
const UserService = require("../Services/UserService");
const router = express.Router()
const middleware = require("./Middleware")

router.get('/', UserService.getAllUsers);
router.get('/:id', UserService.getUserById);
router.post('/', UserService.registerUser);
router.post('/login', UserService.loginUser);
router.delete('/:id', middleware.verifyToken, UserService.deleteUserById);
router.put('/:id', middleware.verifyToken, UserService.editUserById);
  
module.exports = router;

