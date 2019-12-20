import {USER_FETCH,USER_LOGIN,USER_SIGNUP,USER_LOGIN_ERROR,USER_SIGNUP_ERROR} from './types';
import axios from 'axios';
const URL = `https://karuapi.herokuapp.com/api/`;

const load_user = (data) => {
     return {
         type:USER_FETCH,
         payload:data
     }
};
const login_error = data => { //showing the error
     return {
         type:USER_LOGIN_ERROR,
         payload:data
     }
}
const login = (data) => { //we are returning the token only
     return {
         type:USER_LOGIN,
         payload:data
     }
};
const signup_error = data => { //the signup error
      return {
          type:USER_SIGNUP_ERROR,
          payload:data
      }
};
const signup = data => { 
      return {
          type:USER_SIGNUP,
          payload:data
      }
};
    
//decode the token

export const fetchUser = () => {
    return dispatch => {
        let token = localStorage.getItem('user');
        //if there is no token
        if(!token) return dispatch(load_user(null));
        //or else if the token is not valid
        axios.post(`${URL}/users/verifyToken`,null,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }).then(result => {
            if(!result.data.success) return dispatch(load_user(null));
            axios.post(`${URL}/users/decodeToken`,null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(result => {
                return dispatch(load_user(result.data.message))
            })
        })        
        .catch(console.log);
    }
};

//login user

export const user_login = (data) => {
    return dispatch => {
        axios.post(`${URL}/users/login`,data,{
            headers:{'Content-Type':'application/json'}
        }).then(result => {
            if(!result.data.success){
                return dispatch(login_error(result.data.message))
            };
            return dispatch(login(result.data.message))
        })
    }
};

//signup user

export const user_signup = (data) => {
    return dispatch => {
        axios.post(`${URL}/users/signup`, data, {
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            if (!result.data.success) {
                return dispatch(signup_error(result.data.message))
            };
            //this is the token 
            return dispatch(signup(result.data.message));
        })
    }
};