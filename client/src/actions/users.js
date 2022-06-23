import { FETCH_ALL, UPDATE } from '../constants/actionTypes';
import * as api from '../api';

export const getUser = (id) => async (dispatch) => {
    console.log('fetch users')
    try {
        const { data } = await api.fetchUser(id);
        dispatch({ type: FETCH_ALL, payload: data });
        console.log('getting users')
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = (id, user) => async (dispatch) =>{
    try {
        const { data } = await api.updateUser(id, user);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}