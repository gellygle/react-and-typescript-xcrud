
import React, { useState } from "react";
import axios from "axios";
import { hash } from 'bcryptjs';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {

    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        {
          username,
           password: await hash(password, 10),
        }
      );

      console.log(response.data.message);
      
      toast.success('User registered successfully',{
        position:toast.POSITION.TOP_CENTER,
        autoClose:3000
      })

//


 
      // Handle successful registration,
    } catch (error:any) {
      console.error("Registration failed:Cannot be empty ",);    //error.response.data.message
      

        toast.error('This field is required and cannot be empty',{
         position:toast.POSITION.TOP_CENTER,
         autoClose:3000,
        });
       


    }
  };

  return (
    <div className="container align-items-center justify-content-center col-md-3 ">
      <h4 className="text-center mb-3">Register a new account</h4>
      <div>
        <label className="form-label">Username:</label>
        <input
          className="form-control"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="form-label">Password:</label>
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        onClick={handleRegistration}
        className="btn btn-primary btn-lg mt-3"
      >
        Register
      </button>
    </div>
  );
}

export default RegistrationForm;

