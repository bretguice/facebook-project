import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        history('/');

    } catch (err) {
        console.log(err);
    }

}

export const signup = (formData, history) => async (dispatch)=> {
    try {
        console.log('try await api formData')
        const { data } = await api.signUp(formData);
        console.log(data);
        dispatch({ type: AUTH, data });
        history('/');

    } catch (err) {
        console.log(err);
    }
}