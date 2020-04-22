import {SET_CURRENT_USER, GET_ERRORS} from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

//register user action
export const registerUser = (userData, history) => 
  dispatch => {
    axios
      .post('/api/users/register', userData)
      .then(res => history.push('/'))
      .catch(err => 
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
        
        )
 }
//login user action
export const loginUser = (userData) =>
dispatch => {
  axios
      .post('/api/users/login', userData)
      .then(res =>{
        const token = res.data.token
        //save token to local storage
        localStorage.setItem('jwtToken', token)
        //set token to axios auth header
        setAuthToken(token)
        //decode the token
        const decoded = jwt_decode(token)
        //dispatch SET_CURRENT_USER
        dispatch({
          type: SET_CURRENT_USER,
          payload: decoded
        })
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }) )

}
//logout user action
export const logoutUser = () => 
dispatch => {
  //remove from local storage
  localStorage.removeItem('jwtToken')
  //delete from auth header
  setAuthToken(false)
  //clean from redux store
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  })

}