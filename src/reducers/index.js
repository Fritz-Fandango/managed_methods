import { combineReducers } from 'redux';
import {
  SELECT_WEATHER,
  INVALIDATE_WEATHER,
  REQUEST_WEATHER,
  RECEIVE_WEATHER
} from '../actions';

const selectedWeather = (state = 'Centennial', action) => {
  switch (action.type) {
    case SELECT_WEATHER:
      return action.weather;
    default:
      return state;
  }
}

const weather = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_WEATHER:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_WEATHER:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_WEATHER:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.weather,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const weatherByWeather = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_WEATHER:
    case RECEIVE_WEATHER:
    case REQUEST_WEATHER:
      return {
        ...state,
        [action.weather]: weather(state[action.weather], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  weatherByWeather,
  selectedWeather
})

export default rootReducer;
