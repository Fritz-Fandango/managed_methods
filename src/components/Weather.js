import React from 'react';
import PropTypes from 'prop-types';

const Weather = ({weather}) => (
  <ul>
    {weather.map((post, i) =>
      <li key={i}>{post.title}</li>
    )}
  </ul>
);

Weather.propTypes = {
  weather: PropTypes.array.isRequired,
}

export default Weather;
