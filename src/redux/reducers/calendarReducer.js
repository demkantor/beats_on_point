//store user photo
const calendarReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENT_LIST':
            return state = action.payload;
        default:
            return state;
    }
}



export default calendarReducer;