const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error_handler');
const http = require('http');

const boardRoutes = require('./routes/board');
const columnRoutes = require('./routes/column');
const itemRoutes = require('./routes/item');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(jwt());
app.use(cors());
// global error handler
app.use(errorHandler);

app.use('/api/board', boardRoutes);
app.use('/api/column', columnRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/user', userRoutes);
mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb+srv://legendary313:lightsaber313@cluster0.lwyoq.mongodb.net/dagk_webnc?retryWrites=true&w=majority',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false,
        useCreateIndex:true
    }
).then(()=> {

}).catch((err) => {
    console.log(err);
});

app.listen(3000, ()=>{console.log('localhost:4000');});

//database: mongodb+srv://legendary313:<lightsaber313>@cluster0.lwyoq.mongodb.net/<dagk_webnc>?retryWrites=true&w=majority