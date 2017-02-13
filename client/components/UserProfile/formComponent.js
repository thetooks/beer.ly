import React from 'react';
import styles from './UserProfile.css';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete } from 'formsy-material-ui';

const UsrProfile = React.createClass({

  /**
   * As an alternative to `MuiThemeProvider` you can add a theme directly into context.
   * See the [Material-UI themes](http://www.material-ui.com/#/customization/themes) docs for details.
   *
   * childContextTypes: {
   *   muiTheme: React.PropTypes.object,
   * },
   * getChildContext(){
   *   return {
   *     muiTheme: getMuiTheme(),
   *   }
   * },
   */

  getInitialState() {
    return {
      canSubmit: false,
    };
  },

  errorMessages: {
    wordsError: "Please only use letters",
    numericError: "Please provide a number",
    urlError: "Please provide a valid URL",
  },

  styles: {
    pictureStyle: {
      width: 200,
      height: 200
    },
    paperStyle: {
      width: 600,
      margin: 'auto',
      padding: 10,
    },
    switchStyle: {
      marginBottom: 16,
    },
    submitStyle: {
      marginTop: 32,
    },
    logoStyle: {
      width: 50,
      height: 50,
      marginLeft: -70,
    },
  },

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  },

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  },

  submitForm(data) {
    this.props.showProfile();
    // alert(JSON.stringify(data, null, 4));
  },

  notifyFormError(data) {
    console.error('Form error:', data);
  },

  render() {
    let {paperStyle, switchStyle, submitStyle, pictureStyle, logoStyle } = this.styles;
    let { wordsError, numericError, urlError } = this.errorMessages;
    console.log(this.props);
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
           <img  style={logoStyle} src='https://s3-us-west-1.amazonaws.com/beerlysquarelogo/beerlySquarelogo.gif' />
           <GridTile
            style={pictureStyle}
            title={this.props.profile.name}
            subtitle={<span><b>{this.props.profile.email}</b></span>}
            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          >
          <img  src={this.props.profile.picture} />
          </GridTile>
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}
          >
            <FormsyDate
              name="date"
              required
              floatingLabelText="Date Of Birth"
            />
            
            
            <FormsyAutoComplete
              name="frequency-auto-complete"
              required
              floatingLabelText="How often do you drink beer?"
              dataSource={[
                'once a week',
                'Every Night',
                'Weeknights'
              ]}
            />
            <FormsyToggle
              name="toggle"
              label="Please add me to your mailing list"
              style={switchStyle}
            />
            
            <FormsyText
              name="address"
              hintText="Street Address?"
              floatingLabelText="Address"
            />
            <br />
            <FormsyText
              name="city"
              validations="isWords"
              validationError={wordsError}
              required
              hintText="City"
              floatingLabelText="City"
            />
            <br />
            <FormsyText
              name="state"
              validations="isWords"
              validationError={wordsError}
              required
              hintText="State"
              floatingLabelText="State"
            />
            <FormsyText
              name="zip"
              validations="isNumeric"
              validationError={numericError}
              hintText="ZIP CODE"
              floatingLabelText="Zip"
            />
            <RaisedButton
              style={submitStyle}
              type="submit"
              label="Save Your Profile"
              disabled={!this.state.canSubmit}
            />
          </Formsy.Form>
        </Paper>
      </MuiThemeProvider>
    );
  },
});

export default UsrProfile;