export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const SELECT_WEATHER = 'SELECT_WEATHER'
export const INVALIDATE_WEATHER = 'INVALIDATE_WEATHER'
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER'

export const selectWeather = weather => ({
  type: SELECT_WEATHER,
  weather
})

export const invalidateWeather = weather => ({
  type: INVALIDATE_WEATHER,
  weather
})

export const requestWeather = weather => ({
  type: REQUEST_WEATHER,
  weather
})

export const receiveWeather = (weather, json) => ({
  type: RECEIVE_WEATHER,
  weather,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

const fetchWeather = (city) => dispatch => {
  // fetch("https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lat=39.5791600&lon=-104.8769200", {
  const weatherURL = 'https://weatherbit-v1-mashape.p.rapidapi.com/';

  let latitude = '';
  let longitude = '';

  switch (city) {
    case 'Austin':
      latitude = '30.2671500';
      longitude = '-97.7430600';
      break;
    case 'Centennial':
      latitude = '39.5791600';
      longitude = '-104.8769200';
      break;
    case 'Chicago':
      latitude = '41.8500300';
      longitude = '-87.6500500';
      break;
    case 'London':
      latitude = '51.5085300';
      longitude = '-0.1257400';
      break;
    default:
      // Los Angeles
      latitude = '34.0522300';
      longitude = '-118.2436800';
  }

  fetch(`${weatherURL}forecast/daily?lat=${latitude}&lon=${longitude}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "3a2e0d5435msha0a1d55657eb16fp11f105jsna359e56a9568",
      "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com"
    }
  })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });
}

const shouldFetchWeather = (state, weather) => {
  const posts = state.postsByWeather[weather]
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate
}

export const fetchWeatherIfNeeded = weather => (dispatch, getState) => {
  if (shouldFetchWeather(getState(), weather)) {
    return dispatch(fetchWeather(weather))
  }
}
