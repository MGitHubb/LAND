const express = require('express');
const app = express();
app.use(express.json());
const PostService = require("../Services/PostService");
const router = express.Router();
const middleware = require("./Middleware");

router.get('/sids/:id', PostService.getSalesByUid);
router.post('/', PostService.addPost);
router.delete('/:id', middleware.verifyToken, PostService.deletePostBySid);
router.delete('/user/:id', middleware.verifyToken, PostService.deletePosts);
router.post('/user', PostService.getUserBySid);

module.exports = router;
