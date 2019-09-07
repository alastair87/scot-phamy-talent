import React, { Component } from "react";
import { Menu, Icon, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import SideBarMenu from "./SideBar";
class NavBar extends Component {
  state = {
    visible: false,
    activeItem:
      window.location.pathname === "/"
        ? "home"
        : window.location.pathname.substr(1)
  };
  // handlers
  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, visible: false });

  handleShowClick = () =>
    this.setState(prevState => {
      const visibleState = prevState.visible;
      return {
        visible: !visibleState
      };
    });

  //logOut function
  logout = event => {
    event.preventDefault();
    localStorage.removeItem("token");
    document.location.reload();
  };

  render() {
    const { visible, activeItem } = this.state;
    const { handleItemClick, logout } = this;
    return (
      <React.Fragment>
        <Menu size="mini" flued inverted>
          <Menu.Item onClick={this.handleShowClick}>
            <Icon size="large" name="list layout"></Icon>
          </Menu.Item>
          <Menu.Item position="left">
            <Menu.Header as="h4" textAlign="center">
              {activeItem}
            </Menu.Header>
          </Menu.Item>
          {localStorage.getItem("token") ? (
            <Menu.Item
              name="Logout"
              active={activeItem === "Logout"}
              onClick={event => {
                logout(event);
                handleItemClick(event);
              }}
              as={Link}
              position="right"
              to="/logout"
            >
              <Icon name="log out"></Icon>
              Logout
            </Menu.Item>
          ) : (
            <Dropdown item size="large" icon="user">
              <Dropdown.Menu direction="left">
                <Dropdown.Item
                  name="Sign In"
                  active={activeItem === "Sign In"}
                  onClick={handleItemClick}
                  as={Link}
                  to="/login"
                >
                  <Icon size-="large" name="sign-in"></Icon>
                  Sign In
                </Dropdown.Item>
                <Dropdown.Item
                  name="Main register"
                  active={activeItem === "Main register"}
                  onClick={handleItemClick}
                  as={Link}
                  to="/main-register"
                >
                  <Icon size-="large" name="signup"></Icon>
                  Sign up
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          <SideBarMenu
            visible={visible}
            activeItem={activeItem}
            handleItemClick={handleItemClick}
            logout={logout}
          />
        </Menu>
      </React.Fragment>
    );
  }
}

export default NavBar;
