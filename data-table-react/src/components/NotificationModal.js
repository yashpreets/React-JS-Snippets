import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

 class NotificationModal extends Component {

  constructor(props){
    super(props);
     this.state = {
       message:this.props.message,
       title:"Error",
       open: this.props.open
     }
     this.actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];
  }
  componentWillReceiveProps(newProps){
      this.setState({message:newProps.message,open:newProps.open});
  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Dialog
             contentStyle={customContentStyle}
              title={this.state.title}
              actions={this.actions}
              modal={true}
              open={this.state.open}
            >
              {this.state.message}
            </Dialog>
          </div>
        </MuiThemeProvider>
      </div>
    );

  }
}
const customContentStyle  = {width:'50%'}

export default NotificationModal;