import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectWeather,
  fetchWeatherIfNeeded,
  invalidateWeather,
} from './actions';

// Components
import Picker from './components/Picker';
import Weather from './components/Weather';
class App extends Component {
  static propTypes = {
    selectedWeather: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedWeather } = this.props;

    dispatch(fetchWeatherIfNeeded(selectedWeather))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedWeather !== this.props.selectedWeather) {
      const { dispatch, selectedWeather } = this.props
      dispatch(fetchWeatherIfNeeded(selectedWeather))
    }
  }

  handleChange = nextWeather => {
    this.props.dispatch(selectWeather(nextWeather))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedWeather } = this.props
    dispatch(invalidateWeather(selectedWeather))
    dispatch(fetchWeatherIfNeeded(selectedWeather))
  }

  render() {
    const { selectedWeather, posts, isFetching, lastUpdated } = this.props;

    const isEmpty = posts.length === 0;

    return (
      <div>
        <Picker value={selectedWeather}
                onChange={this.handleChange}
                options={[ 'Austin', 'Centennial', 'Chicago', 'London', 'Los Angeles' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p>
        {/* {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Weather posts={posts} />
            </div>
        } */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedWeather, postsByWeather } = state;

  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByWeather[selectedWeather] || {
    isFetching: true,
    items: []
  }

  return {
    selectedWeather,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App);
