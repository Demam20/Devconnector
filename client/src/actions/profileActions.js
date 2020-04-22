import axios from 'axios';
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from './types';

//profile loading
export const setProfileLoading=()=>{
  return{
    type:PROFILE_LOADING
  };
};
//creat profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile',profileData)
    .then(res => history.push('/dashboard'))
    .catch(err=>
      dispatch({
        type:GET_ERRORS,
        payload:err.response.data
      })
      );
    };
//get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile') 
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload:res.data
      })
      )
    .catch(err =>
      dispatch({
        type:GET_ERRORS,
        payload:{}
      })
      );  
};
// Get profile by Username
export const getProfileByUsername = Username => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/username/${Username}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

    

//get all profiles
export const getProfiles =()=> dispatch=>{
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type:GET_PROFILES,
        payload:res.data
      })
      )

    .catch(err =>
      dispatch({
        type:GET_PROFILES,
        payload: null
      })
      );  
};
//delete account & profile
export const deleteAccount =()=> dispatch=>{
  if(window.confirm('Are you sure? This can NOT be undone!')){
    axios
      .delete('/api/profile')
      .then(res=>
        dispatch({
          type:SET_CURRENT_USER,
          payload:{}
        })
        )
      .catch(err=>
        dispatch({
          type:GET_ERRORS,
          payload:err.response.data
        })
        );  
  }
};

//clear profile
export const clearCurrentProfile=()=>{
  return{
    type:CLEAR_CURRENT_PROFILE
  };
};