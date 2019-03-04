import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../routes/AuthProvider";
import { Dropdown, Menu } from "semantic-ui-react";
import './Navbar.css';


class Navbar extends Component {

  MenuExampleAttached = (isLogged) => {
    if (isLogged) {
      return (
        <div>
          <Dropdown.Item>
            <Link to="/profile">Profile</Link>
          </Dropdown.Item>
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
        </div>
      );
    }
  };

  render() {
    const { isLogged } = this.props;

    return (
      <Dropdown icon="bars" medium id='burger-menu'>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to="/">Home</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/book">Book tour</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            {isLogged && <Link to="/profile">Profile</Link>}
            {!isLogged && <Link to="/auth">Log In</Link>}
          </Dropdown.Item>
          {isLogged && <Dropdown.Divider />}
          {isLogged &&
            <Dropdown.Item>
              <button onClick={this.props.logout}>Log Out</button>
            </Dropdown.Item>
          }
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default withAuth(Navbar);
