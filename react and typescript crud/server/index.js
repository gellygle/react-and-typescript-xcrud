


const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const UserModel = require('./models/User');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://angelbelangel:angel@cluster0.zdy2k51.mongodb.net/angeldb");

const secretKey = 'mySecretKey';

// Registration endpoint
app.post('/users/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // If the username is unique, proceed with registration
    const newUser = await UserModel.create({ username, password: await bcrypt.hash(password, 10) });
    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//login endpoints

app.post('/users/login',async(req,res)=>{
    const {username,password}=req.body;
     // GOAL
       /*I CHECK IF USERNAME AND PASSWORD MATCH 
       MATCH? LOGIN 
       NOT?NOT LOGIN 
       */
    try{
     const validUser=await UserModel.findOne({username:username && password})
     if(!validUser){
      return res.status(404).json({ message: 'User not found' });
      
     }
    //  console.log(validUser)
     console.log(!validUser)
     const token = jwt.sign({ username }, secretKey, { expiresIn: '1d' });
     res.json({ token });
    

    }catch(error){
      console.error('LOgin Failed ',error);
      res.status(500).json ({message:'Internal server error'});





      // toast.error('Login failed: User not found', {
      //   position: toast.POSITION.TOP_CENTER,
      //   autoClose: 3000, 
      // });





    }



})




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


