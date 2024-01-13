
import React, { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


function LoginForm({ setIsLogin }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    // try {
    //   const response = await axios.post('http://localhost:5000/users/login', {
    //     username,
    //     password,
    //   });
    
    
    //   const token = response.data.token;
    //   localStorage.setItem('token', token);
    //   setIsLogin(true);

     

  


    // } catch (error:any) {
    //   console.error('Login failed:', error.response.data.message);
      
    //   // SHow a toast message for error
    //   toast.error('Login failed: User not found', {
    //     position: toast.POSITION.TOP_CENTER,
    //     autoClose: 3000, 
    //   });
    // }


// Inside the try block of handleLogin function
try {
  const response = await axios.post('http://localhost:5000/users/login', {
          username,
                  password,
                      });
      

          // if(!username ){
          //   toast.error('no username'); 
          //   setIsLogin(false)
          // }
                  
  // const token = response.data.token;
  //     localStorage.setItem('token', token);
  //         setIsLogin(true);
  //             toast.success('Login successful'); 



          if(!username ){
            toast.error('This field is required and cannot be empty” '); 
            setIsLogin(false)
          }else{
            const token = response.data.token;
      localStorage.setItem('token', token);
          setIsLogin(true);
              toast.success('Login successful'); 

          }
          //
                  


} catch (error:any) {
  console.error('Login failed:', error.response.data.message);
      toast.error('Username or password is incorrect'); 
      }
  };


  return (
    <div className='container d-block align-items-center justify-content-center col-md-3 mt-5 '>
    <h2 className='text-center  mb-3 text-success'>Login to your account</h2>
    <div>
      <label className='form-label'>Username:</label>
      <input className='form-control'
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
    <div>
      <label className='form-label'>Password:</label>
      <input className='form-control'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
   
    <button type="submit" onClick={handleLogin} className="btn btn-primary btn-lg mt-3">Sign in</button>
  </div>
  );
}

export default LoginForm;



