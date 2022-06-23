import { DELETE, UPDATE, FETCH_ALL, CREATE } from "../constants/actionTypes";

const userReducer = (state= {posts: [], users: []}, action) => {
    switch (action.type){
        case DELETE:
            return {...state, user: state.users.filter((user) => user._id !== action.payload)};
        case UPDATE:
            return {...state, user: state.users.map((user) =>user._id ===action.payload ? action.payload : user )};
        case FETCH_ALL:
            return {...state, user: action.payload};
        case CREATE:
            return {...state, user: [ ...state.users, action.payload]};
        default:
            return state;
    }
}

export default userReducer;