import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../components/AuthProvider";
import { Dropdown } from "semantic-ui-react";
import './Navbar.css';


class Navbar extends Component {

  render() {
    const { isLogged } = this.props;

    return (
      <Fragment>
        <Dropdown icon="bars" id='burger-menu'>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/">Home</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/book">Book tour</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              {isLogged ? <Link to="/profile">Profile</Link> : <Link to="/auth">Log In</Link>}
            </Dropdown.Item>
            {isLogged && <Fragment>
              <Dropdown.Divider />
              <Dropdown.Item>
                <button onClick={this.props.logout}>Log Out</button>
              </Dropdown.Item>
            </Fragment>
            }
          </Dropdown.Menu>
        </Dropdown>
        <Link to="/">
          <img src="./camera.png" alt="icon" className="image-icon" />
        </Link>

      </Fragment>
    );
  }
}

export default withAuth(Navbar);
