// import libraries //
const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const config = require('config')

// call express app and set it to use in the app//
const app = express();
app.use(express.json());

// set up server file to serve static content //
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}
// connect to MongoDB run server on 4000 //
const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

  