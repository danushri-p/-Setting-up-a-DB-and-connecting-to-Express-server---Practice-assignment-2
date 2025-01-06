const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./schema.js');

dotenv.config();


const app = express();
const port = 3010;

app.use(express.json())

app.use(express.static('static'));

mongoose
  .connect(process.env.DB_URL)
  .then(()=> console.log('connected to database'))
  .catch((err)=> console.error('Error connecting to database',err));

app.post('/api/users',async(req,res)=>{
  try {
    const usersDetails = req.body;
    const newUser = new User (usersDetails);
    await newUser.save();
    res.status(201).json({ message: 'created successfully' });


  }catch(err){
    if (err.name === 'ValidationError'){
      res.status(400).json({message: "Validation Error",Explanation: err.message});
    
    }else{
      res.status(500).json({message:"Server Error", Explanation: err.message});
    }
  }
});


app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
