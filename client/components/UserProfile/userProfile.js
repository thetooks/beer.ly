import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import {brown100, blue500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    
  }


  render() {
    const styles = {
      appBar: {
        backgroundColor: brown100,
      },
      buttonStyle: {
        backgroundColor: brown100,
        
      },
      style: {
        marginLeft: 20,
        
      }
    };
    return (
      <div>
        
        <Drawer width={300} openSecondary={true} open={this.props.open} >
          <AppBar title="User Profile" style={styles.appBar }/>
             <div>
              <Avatar 
                src={this.props.profile.picture} 
              />
              <Paper zDepth={2}>
                <TextField hintText={this.props.profile.name} style={styles.style} underlineShow={false} />
                <Divider />
                <TextField hintText="Address" style={styles.style} underlineShow={false} />
                <Divider />
                <TextField hintText="City" style={styles.style} underlineShow={false} />
                <Divider />
                <TextField hintText="State" style={styles.style} underlineShow={false} />
                <Divider />
                <TextField hintText={this.props.profile.email} style={styles.style} underlineShow={false} />
                <Divider />
                <TextField hintText="Phone" style={styles.style} underlineShow={false} />
                <Divider />

              </Paper>
                <br />
                <RaisedButton label="Save"  buttonStyle={styles.buttonStyle} />
            </div>
            
        </Drawer>
      </div>
    );
  }
}