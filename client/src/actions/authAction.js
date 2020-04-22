import {SET_CURRENT_USER,GET_ERRORS} from './types';
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// register user action 
export const registerUser =(userData,history)=> dispatch =>{
  axios
        .post('/api/users/register', userData)
        //the reson for ('/') is becoz in app.js we have mentioned the path like that
        .then(res => history.push('/') )
        .catch(err =>
             dispatch({
               type: GET_ERRORS,
               payload: err.response.data
              })
              ); 
  
};
//login- get user token action
export const loginUser = userData => dispatch => {
  axios
  .post('/api/users/login', userData)
  .then(res => {
    const {token} =res.data;
    //save token to local storage
    localStorage.setItem('jwtToken',token);
    //set token to axios auth-header
    setAuthToken(token);
    //decode the token to get the user data
    const decoded = jwt_decode(token);

    //dispatch call to set-current-user
    dispatch({
      type:SET_CURRENT_USER,
      payload:decoded
    })

  }  )
  .catch(err =>
       dispatch({
         type: GET_ERRORS,
         payload: err.response.data
        })
  )
};
//logout user action
export const logoutUser = () => dispatch => {
   //Remove localstorage
   localStorage.removeItem('jwtToken');

   //Remove from auth header
   setAuthToken(false);

   dispatch ({
     type:SET_CURRENT_USER,
     payload:{}
   })
 };


