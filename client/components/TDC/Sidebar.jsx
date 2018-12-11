import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "../AppBar"

import { HashRouter as Router, Route, Link } from 'react-router-dom'



import SimpleExpansionPanel from "./SimpleExpansionPanel";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

class Sidebar extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false
  };

  toggleDrawer = (side, open) => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <SimpleExpansionPanel />
        <Divider />
        <List>
          {/* {["Log in", "Register"].map((text, index) => ( */}
            <ListItem button component={Link} to="/login/">
              <ListItemText primary="Log in" />
            </ListItem>


            <ListItem button component={Link} to="/register/">
            {/* <Link to='/register'>stuff</Link> */}
            
              <ListItemText primary="Register" />
       
       
            {/* <ListItem button key={text}> */}
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              {/* <ListItemText primary={text} /> */}
           
            </ListItem>
           
          {/* ))} */}
        </List>
      </div>
    );

    return (
      <div>
    
        <AppBar toggleDrawer={() => {this.toggleDrawer("left", true)}}/>
        {/* Open Left</AppBar> */}
        {/* <AppBar/> */}
        <SwipeableDrawer
          open={this.state.left}
          onClose={() => this.toggleDrawer("left", false)}
          onOpen={() => this.toggleDrawer("left", true)}
        >
          <div
            tabIndex={0}
            role="button"
            // onClick={() => this.toggleDrawer('left', false)}
            onKeyDown={() => this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

SwipeableDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
