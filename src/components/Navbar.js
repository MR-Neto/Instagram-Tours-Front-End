import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../routes/AuthProvider";
import { Dropdown, Menu } from "semantic-ui-react";

class Navbar extends Component {

  state = {
    visible: false,
  }

  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })

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
      <nav>
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
