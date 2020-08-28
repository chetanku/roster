import React, { Component } from "react";
import { RegionsProvider, AccountProvider } from "../context/context.js";
import Awsregions from "./shared/regions";
import Account from "./shared/account";
import { Navbar, NavItem, Nav, Row } from "reactstrap";
class Navbars extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar
          className="navbar-horizontal navbar-dark bg-secondary"
          expand="sm"
        >
          <Nav className="ml-auto">
            <Row>
              <NavItem>
                <AccountProvider>
                  <Account></Account>
                </AccountProvider>
              </NavItem>
              <NavItem>
                <RegionsProvider>
                  <Awsregions> </Awsregions>{" "}
                </RegionsProvider>{" "}
              </NavItem>
            </Row>
          </Nav>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default Navbars;
