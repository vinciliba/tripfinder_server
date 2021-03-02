const express = require('express');
import {readdirSync} from 'fs';
require('dotenv').config();
const morgan =  require('morgan');
import cors from 'cors';
import mongoose from 'mongoose'


const app = express()
const port = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI

process.traceDeprecation = true;

//middlewares
app.use(cors());
app.use(morgan('dev'));

// router applied as middleware
readdirSync('./routes').map((r) => app.use('/api',require(`./routes/${r}`)) );


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



// database connection
try{
mongoose
    .connect(process.env.MONGO_URI, {
       useNewUrlParser: true, 
       useUnifiedTopology: true,
       useFindAndModify:true,
       useCreateIndex:true
      })
    .then(() => console.log("DB Connected"));
} catch(error) {console.log(`DB connection error: ${error.message}`)};

// mongoose.connection.on("error", err => {
//     console.log(`DB connection error: ${err.message}`);
// });