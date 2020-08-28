import React, { Component } from "react";
//import { ReactDOM, render } from "react-dom";
import { Link } from "react-router-dom";

import { Sidenav, Dropdown, Nav, Icon } from "rsuite";
import { ReactComponent as EC2logo } from "../icons/aws-ec2.svg";
import { ReactComponent as Elb } from "../icons/elb.svg";
import { ReactComponent as Logo } from "../icons/to-do.svg";
import { ReactComponent as Rds } from "../icons/rds.svg";
import { ReactComponent as Emr } from "../icons/emr.svg";
import { ReactComponent as Msk } from "../icons/msk.svg";
import { ReactComponent as Subnets } from "../icons/subnet.svg";
import { ReactComponent as CostExplorer } from "../icons/costexplorer.svg";
import Footers from "./footer";

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1",
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleToggle() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey,
    });
  }
  render() {
    const { expanded } = this.state;

    return (
      <div
        className="fixed-left sidenav"
        // style={{ width: "15%", height: "100%", position: "absolute" }}
      >
        <Sidenav
          expanded={expanded}
          defaultOpenKeys={["3", "4"]}
          activeKey={this.state.activeKey}
          onSelect={this.handleSelect}
          appearance="subtle"
          style={{ height: "100%" }}
        >
          <Sidenav.Body>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
              <a className="navbar-brand" href="/">
                <Logo className="roster-logo" />

                <span className="roster-text"> roster</span>
              </a>
            </nav>
            <Nav>
              <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />}>
                <Link to="/">Dashboard</Link>
              </Nav.Item>
              {/* <Nav.Item eventKey="2" icon={<Icon icon="group" />}>
                User Group
              </Nav.Item> */}
              <Dropdown
                placement="rightStart"
                eventKey="3"
                title="AWS"
                icon={<Icon icon="amazon" />}
              >
                <Dropdown.Item eventKey="3-1">
                  <Link to="/ec2">
                    {" "}
                    <EC2logo className="aws-logo" /> EC2
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item eventKey="3-2">
                  <Link to="/elb">
                    <Elb className="aws-logo" />
                    ELB
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item eventKey="3-3">
                  <Link to="/rds">
                    <Rds className="aws-logo" />
                    RDS
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item eventKey="3-4">
                  <Link to="/emr">
                    <Emr className="aws-logo" />
                    EMR
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item eventKey="3-5">
                  <Link to="/msk">
                    <Msk className="aws-logo" />
                    MSK (Kafka)
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item eventKey="3-6">
                  <Link to="/subnets">
                    <Subnets className="aws-logo" />
                    Subnets
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item eventKey="3-7">
                  <Link to="/ce">
                    <CostExplorer className="aws-logo" />
                    Cost Summary
                  </Link>
                </Dropdown.Item>
                {/* <Dropdown.Item eventKey="3-3">EMR</Dropdown.Item>
                <Dropdown.Item eventKey="3-4">S3</Dropdown.Item>
                <Dropdown.Item eventKey="3-5">RDS</Dropdown.Item> */}
              </Dropdown>
              <Dropdown
                placement="rightStart"
                eventKey="4"
                title="Azure"
                icon={<Icon icon="windows" />}
              >
                <Dropdown.Item>Coming soon</Dropdown.Item>
              </Dropdown>

              {/* <Dropdown
                placement="rightStart"
                eventKey="4"
                title="Settings"
                icon={<Icon icon="gear-circle" />}
              >
                <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
                <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
                <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
                <Dropdown.Menu eventKey="4-5" title="Custom Action">
                  <Dropdown.Item eventKey="4-5-1">Action Name</Dropdown.Item>
                  <Dropdown.Item eventKey="4-5-2">Action Params</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
            </Nav>
          </Sidenav.Body>
          {/* <Toggle onChange={this.handleToggle} checked={expanded}></Toggle> */}
        </Sidenav>
        <Footers></Footers>
      </div>
    );
  }
}
//ReactDOM.render(<Sidebar />);
export default Sidebar;
