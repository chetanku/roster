import React from "react";
import { Modal, ButtonToolbar, Button } from "rsuite";
class Modals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({
      show: false,
    });
  }
  open() {
    this.setState({
      show: true,
    });
  }
  render() {
    return (
      <div className="modal-container">
        <ButtonToolbar>
          <Button
            style={{
              color: "#5e72e4",
            }}
            onClick={this.open}
          >
            {" "}
            {this.props.buttonText}{" "}
          </Button>{" "}
        </ButtonToolbar>{" "}
        <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header>
            <Modal.Title> {this.props.title} </Modal.Title>{" "}
          </Modal.Header>{" "}
          <Modal.Body>
            {" "}
            {this.props.cluster ? (
              <span> {this.props.cluster} </span>
            ) : (
              " "
            )}{" "}
            {this.props.lb ? (
              <span>
                {" "}
                <b> Subnet / ZoneName: </b> {this.props.lb}{" "}
              </span>
            ) : (
              " "
            )}{" "}
            {this.props.ec2 ? (
              <span>
                {" "}
                <b> SubnetId - VpcId: </b> {this.props.ec2} <br></br>
                <b> Public DNS Name: </b> {this.props.dns}{" "}
              </span>
            ) : (
              " "
            )}{" "}
            {this.props.subnets ? (
              <span>
                <b> ARN: </b> {this.props.subnets}{" "}
              </span>
            ) : (
              " "
            )}{" "}
            {this.props.alarms ? (
              <span>
                <b> State Reason: </b> {this.props.alarms}{" "}
              </span>
            ) : (
              " "
            )}{" "}
          </Modal.Body>{" "}
          <Modal.Footer>
            <Button
              onClick={this.close}
              appearance="primary"
              style={{
                backgroundColor: "#5e72e4",
              }}
            >
              OK{" "}
            </Button>{" "}
            <Button
              onClick={this.close}
              appearance="subtle"
              style={{
                color: "#5e72e4",
              }}
            >
              Cancel{" "}
            </Button>{" "}
          </Modal.Footer>{" "}
        </Modal>{" "}
      </div>
    );
  }
}

export default Modals;
