import {USER_FETCH,USER_LOGIN,USER_SIGNUP,USER_LOGIN_ERROR,USER_SIGNUP_ERROR,USER_LOADING} from './types';
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
const loading  = async () => {
      return {
          type:USER_LOADING
      }
}
    
//decode the token

export const fetchUser = () => {
    return async dispatch => {
        let token = localStorage.getItem('user');
        //if there is no token
        if(!token) return dispatch(load_user(null));
        //or else if the token is not valid
        await axios.post(`${URL}/users/verifyToken`,null,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }).then(async result => {
            if(!result.data.success) return dispatch(load_user(null));
            await axios.post(`${URL}/users/decodeToken`,null, {
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
    return async  dispatch => {
        dispatch(await loading());
        await axios.post(`${URL}/users/login`,data,{
            headers:{'Content-Type':'application/json'}
        }).then(result => {
            if(!result.data.success){
                return dispatch(login_error(result.data.message))
            };
            return dispatch(login(result.data.message))
        }).catch(console.log)
    }
};

//signup user

export const user_signup = (data) => {
    return async dispatch => {
        
        dispatch(await loading());
        await axios.post(`${URL}/users/signup`, data, {
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            if (!result.data.success) {
                return dispatch(signup_error(result.data.message))
            };
            //this is the token 
            return dispatch(signup(result.data.message));
        }).catch(console.log);
    }
};

//updating the user
export const update_user_details = (data,_id) => {
    return async dispatch => {
        dispatch(await loading());
        console.log(`we are updating the details`);
        await axios.put(`${URL}/users/updateDetails/${_id}`,data).then(result => {
            console.log(`the result `,result)
            return dispatch(load_user(result.data.message))
        }).catch(console.log);
    }
};

//updating a profile pic
export const update_profile = (data,_id) => {
    return async dispatch => {
        dispatch(await loading());
        await axios.put(`${URL}/users/updateProfile/${_id}`,data,{
           headers:{'Content-Type':'multipart/form-data'}
        }).then(result => {
           return dispatch(load_user(result.data.message))
        }).catch(console.log);
    }
}