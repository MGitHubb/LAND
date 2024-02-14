const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const favicon = require('serve-favicon');
const path = require('path');

app.use(cors({
    origin: 'http://localhost:3000'
  }));

app.use(express.json());

const usersRouter = require("./App/Controllers/UserController");
app.use('/api/users', usersRouter);
const salesRouter = require("./App/Controllers/SaleController");
app.use('/api/sales', salesRouter);
const postsRouter = require("./App/Controllers/PostController");
app.use('/api/posts', postsRouter);



app.listen(port, function () {
  console.log(`Server started on port ${port}...`);
});

try {
  app.use(favicon(path.join(__dirname, "www/build", "favicon.ico")));
  app.use(express.static(path.join(__dirname, 'www/build')));

  app.get('/*', (req, res, next) => {
      if (req.path.includes('/api')) {
          next();
      }
      res.sendFile(path.join(__dirname, 'www/build', 'index.html'));
  });
}
catch (err) {
  console.log(err)
  console.log("Something went wrong with the frontend build!")
}