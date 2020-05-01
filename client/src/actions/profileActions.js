import axios from 'axios'
import { GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER } from './types'
  import { logoutUser } from './authactions'
  import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

  export const createProfile = (profileData, history) => dispatch => {
    axios
      .post('/api/profile', profileData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  //change password action
  export const changePassword = (passwordData) => dispatch => {
    axios
      .post('/api/profile/changepassword', passwordData)
      .then(res => {
        
        localStorage.removeItem('jwtToken')
        //delete from auth header
        setAuthToken(false)
        //clean from redux store
        dispatch({
            type: SET_CURRENT_USER,
            payload: {}
        })  
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  //change subscription data action
  export const updateSubscription = (subscriptionData, history) => dispatch => {
    axios
      .post('/api/profile/subscription', subscriptionData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  // Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};
// Get profile by ID
export const getProfileByUser_id = user_id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/:user_id/${user_id}`)
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

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
