import editBandReducer from '../reducers/profileEditReducer'

test('add a band to state', () => {
    const action = {type: 'SET_THIS_BAND', payload: {band: 'info'}};
    const returnedState = editBandReducer(undefined, action);
    expect(returnedState).toStrictEqual({band: 'info'});
  });