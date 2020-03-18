//store your quotes
const lebowskiReducer = (state = [], action) => {
    switch (action.type) {
        case 'I_AM_THE_WALRUS':
            return state = action.payload;
        default:
            return state;
    }
}



export default lebowskiReducer;