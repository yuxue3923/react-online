import { combineReducers } from "redux";
function  reducer_login(state = {},action) {
    switch (action.type) {
        case 'LoginSuccess':
            return { login_info: action.payload};          
        default:
            return state;
    }
}
function  reducer_createcourse(state = {},action) {
    switch (action.type) {
        case 'createcourseSuccess':
            return { createCourse_info: action.payload};  
        default:
            return state;
           
    }  
}      
function  reducer_userupdatecourseid(state = {},action) {
    switch (action.type) {
        case 'GetuserupdatecourseidSuccess':
            return { updatecourseid: action.payload};          
        default:
            return state;
    }
}
function  reducer_previewcourseid(state = {},action) {
    switch (action.type) {
        case 'GetpreviewcourseidSuccess':
            return { previewcourseid: action.payload};          
        default:
            return state;
    }
}
export default combineReducers({
    reducer_login,
    reducer_createcourse,
    reducer_userupdatecourseid,
    reducer_previewcourseid,
})