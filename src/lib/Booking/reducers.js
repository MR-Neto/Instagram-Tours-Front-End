import types from './types'

const initialStore = {
  date: '',
  placesPicked: [],
  numberOfTickets: 1,
  stage: 0,
}

export default function reducer(state = initialStore, action) {
  switch (action.type) {
    case types.INCREMENT_STAGE:
      return {
        ...state,
        stage: 1,
      };
    case types.DECREMENT_STAGE:
      return {
        ...state,
        stage: 0,
      };
    case types.SET_TOUR_BOOKING:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };

    case types.SET_TICKETS:
      return action.payload;

    case types.TOGGLE_PLACE:
      return togglePlacesPicked(action.payload, state);

    case types.CLEAR:
      return initialStore

    default:
      return state;
  }
}

const togglePlacesPicked = (placeId, state) => {
  return {
    ...state,
    placesPicked:
      state.placesPicked.includes(placeId) ?
        state.placesPicked.filter((place) => place !== placeId)
        :
        state.placesPicked.concat(placeId),
  }
}


