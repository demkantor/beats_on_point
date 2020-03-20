//store user photo
const photoReducer = (state = [], action) => {
    switch (action.type) {
        case 'GOT_YOUR_PICTURE':
            return state = action.payload;
        default:
            return state;
    }
}



export default photoReducer;