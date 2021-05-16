import React, { Component } from 'react';
import './ShowDetails.css'
import { fetchSingleMovie } from '../utils/APICalls'

class ShowDetails extends Component {
  constructor({ movie }, props) {
    super(props);
      this.state = {
        movieID: movie.id,
        specificMovie: {},
        movieSelected: movie.id || false,
        error: ''
      }
  }
  render() {
    const { handleClick } = this.props;
    const taintedRating = '⭐️';
    return (
      <div className='details-card'>
      <button className='home-button' onClick={() => handleClick(false)}>Home Page</button>
        <img className='details-image' src={this.state.specificMovie.poster_path}/>
        <h2 className='details-title'>{this.state.specificMovie.title}</h2>
        <h4 className='movie-release'>{this.state.specificMovie.release_date}</h4>
        <h4 className='movie-rating'>{taintedRating.repeat(Math.floor(this.state.specificMovie.average_rating))}</h4>
        <h4 className='overview'>{this.state.specificMovie.overview}</h4>
        <h4 className='genre'>{this.state.specificMovie.genres}</h4>
        <h4 className='budget'>{this.state.specificMovie.budget}</h4>
        <h4 className='revenue'>{this.state.specificMovie.revenue}</h4>
        <h4 className='runtime'>{this.state.specificMovie.runtime}</h4>
        <h4 className='tagline'>{this.state.specificMovie.tagline}</h4>
      </div>
    )
  }

  componentDidMount() {
    fetchSingleMovie(this.state.movieID)
      .then(singleMovieData => this.setState({ specificMovie: singleMovieData.movie }))
      .catch(error => this.setState({ error: this.handleSpecificErr(error.message) }))
  }

}

export default ShowDetails;
