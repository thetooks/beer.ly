import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './City.css';
import axios from 'axios';
import BreweryList from '../BreweryList/BreweryList';
import BreweryMap from '../BreweryMap/BreweryMap.jsx';


class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: this.props.params.city,
      tileView: true,
      breweries: []
    };
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    this.fetchBreweries();
  }

  fetchBreweries() {
    if (this.state.city === '') {
      this.setState({ breweries: [] });
      return;
    }

    const context = this;
    axios.get('/api/breweries/' + this.state.city)
      .then((response) => {
        const newBreweries = this.handleSuccess(response);
        context.setState({ breweries: newBreweries });
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  handleSuccess(response) {
    return response.data.map((brewery) => brewery);
  }

  handleError(error) {
    console.log(error); //eslint-disable-line
  }

  changeView() {
    this.setState({ tileView: !this.state.tileView });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.heading}>
        <RaisedButton className={styles.view} onClick={this.changeView} label={this.state.tileView ? 'Map View' : 'Tile View'} />
          <h1>Breweries in {this.state.city}</h1>
          <p className={styles.details}>About {this.state.breweries.length} results ({(1 / this.state.breweries.length).toFixed(3)} seconds) </p>
        </div>
        {this.state.tileView && <BreweryList breweries={this.state.breweries} city={this.state.city} />}
        {!this.state.tileView && <BreweryMap breweries={this.state.breweries} />}
      </div>
    );
  }
}

City.propTypes = {
  params: PropTypes.object
};

export default City;
