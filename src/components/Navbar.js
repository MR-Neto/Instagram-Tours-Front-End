import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import { Dropdown, Icon, Menu } from 'semantic-ui-react'


class Navbar extends Component {

  MenuExampleAttached = () => (
    <div>
      <Menu attached='top'>
        <Dropdown item icon='bars' simple>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Icon name='dropdown' />
              <span className='text'>New</span>

              <Dropdown.Menu>
                <Dropdown.Item>Document</Dropdown.Item>
                <Dropdown.Item>Image</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/">Home</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/book">Book tour</Link>
            </Dropdown.Item>
            <Dropdown.Item>Save...</Dropdown.Item>
            <Dropdown.Item>Edit Permissions</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Export</Dropdown.Header>
            <Dropdown.Item>Share</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </Menu>
    </div>
  )

  render() {
    const { isLogged, logout } = this.props;

    if (isLogged) {
      return (
        <nav>
          <button>Back</button>
          <h1>Tours</h1>
          <a href="#" onClick={logout}>Menu</a>
          <Link to="/">Home</Link>
          <Link to="/book">Book tour</Link>
          <a href="#" onClick={logout}>Logout</a>
        </nav>
      );
    } else {
      return (
        <nav>
          <button>Back</button>

          <Menu attached='top'>
            <Dropdown item icon='bars' simple>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Icon name='dropdown' />
                  <span className='text'>New</span>

                  <Dropdown.Menu>
                    <Dropdown.Item>Document</Dropdown.Item>
                    <Dropdown.Item>Image</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/">Home</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/book">Book tour</Link>
                </Dropdown.Item>
                <Dropdown.Item>Save...</Dropdown.Item>
                <Dropdown.Item>Edit Permissions</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Export</Dropdown.Header>
                <Dropdown.Item>Share</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu>
          <h1>Tours</h1>
          <a href="#" onClick={logout}>Menu</a>

          <Link to="/auth/login">Log In</Link>
          <Link to="/auth/signup">Sign Up</Link>
        </nav>
      );
    }
  }
}

export default withAuth(Navbar);
