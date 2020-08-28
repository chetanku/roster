import React from "react";

import { Col, FormGroup } from "reactstrap";
export const InstanceStatus = (props) => {
  return (
    <Col md="4">
      <FormGroup>
        <div className="alert alert-secondary" role="alert">
          <strong>
            <span className="text-primary mr-2">
              <i className="fa fa-arrow-up" /> Total: {props.total}{" "}
            </span>{" "}
          </strong>{" "}
          <strong>
            <span className="text-success mr-2">
              <i className="fa fa-arrow-up" /> Running: {props.running}{" "}
            </span>{" "}
          </strong>{" "}
          <strong>
            {" "}
            {props.service === "subnets" ? (
              <span className="text-danger mr-2">
                <i className="fa fa-arrow-down" /> Pending: {props.stopped}{" "}
              </span>
            ) : (
              <span className="text-danger mr-2">
                <i className="fa fa-arrow-down" /> Stopped: {props.stopped}{" "}
              </span>
            )}{" "}
          </strong>{" "}
        </div>{" "}
      </FormGroup>{" "}
    </Col>
  );
};
