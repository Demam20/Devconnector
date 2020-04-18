//write token here
import axios from 'axios';

const setAuthToken = token => {
  if (token){
    //apply token to every req
    axios.defaults.headers.common['Authorization']=token;
  }
  else{
    //delete token from auth-header
    delete axios.defaults.headers.common['Authorization'];
  }

};

export default setAuthToken;