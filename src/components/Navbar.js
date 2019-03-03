import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../routes/AuthProvider";
import { Dropdown, Icon, Menu } from "semantic-ui-react";

class Navbar extends Component {
  MenuExampleAttached = (isLogged) => {
    if(isLogged) {
      return (
        <div>
          <Dropdown.Divider />
          <Dropdown.Item>
            <button onClick={this.props.logout}>Log Out</button>
          </Dropdown.Item>
        </div>
      );
    } else {
      return (
        <div>
          <Dropdown.Item>
            <Link to="/auth">Log In</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/auth">Sign Up</Link>
          </Dropdown.Item>
        </div> 
      );
    }
  };

  render() {
    const { isLogged, logout } = this.props;

    return (
      <nav>
        <button>Back</button>
        <h1>Tours</h1>
        <Menu attached="top">
          <Dropdown item icon="bars" simple>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="/">Home</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/book">Book tour</Link>
              </Dropdown.Item>
              {this.MenuExampleAttached(isLogged)}  
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      </nav>
    );
  }
}

export default withAuth(Navbar);
