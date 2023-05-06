// eslint-disable-next-line import/newline-after-import
const express = require('express');
const app = express();
// eslint-disable-next-line import/no-extraneous-dependencies
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./router/userRouter');
const mongoConnect = require('./features/mongoConnect');
const errorHandeler = require('./middeware/errorHandeler');
const notFoundMiddleware = require('./middeware/notFoundMiddleware');
const postRouter = require('./router/postRouter');

// call all middleware
dotEnv.config();
app.use(bodyParser.json());
app.use(cors());
app.use('/image', express.static('upload/images/'));

// call functionality
mongoConnect();

// declare all variable
const PORT = process.env.PORT || 8100;

// Route declare
app.get('/', (req, res) => {
  res.send('Api running...');
});
app.use('/api/user/', userRouter);
app.use('/api/post/', postRouter);
// not found url
// eslint-disable-next-line no-unused-vars
app.use(notFoundMiddleware);
// error handaler
// eslint-disable-next-line no-unused-vars
app.use(errorHandeler);

app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
});
