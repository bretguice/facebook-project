import { DELETE, UPDATE, FETCH_ALL, CREATE } from "../constants/actionTypes";

const postReducer = (state= {posts: [{message:'test'}], users: []}, action) => {
    switch (action.type){
        case DELETE:
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};
        case UPDATE:
            return {...state, posts: state.posts.map((post) =>post._id ===action.payload ? action.payload : post )};
        case FETCH_ALL:
            return {...state, posts: action.payload.data};
        case CREATE:
            return {...state, posts: [ ...state.posts, action.payload]};
        default:
            return state;
    }
}

export default postReducer;