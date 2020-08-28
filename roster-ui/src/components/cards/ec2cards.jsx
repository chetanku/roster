import React, { Component, useContext } from "react";
import { Container, Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import {
  Ec2Context,
  RdsContext,
  EmrContext,
  ElbContext,
  MskContext,
  DashboardContext,
} from "../../context/context.js";
import { ReactComponent as EC2logo } from "../../icons/aws-ec2.svg";
import { ReactComponent as Elb } from "../../icons/elb.svg";
import { ReactComponent as Logo } from "../../icons/to-do.svg";
import { ReactComponent as Rds } from "../../icons/rds.svg";
import { ReactComponent as Emr } from "../../icons/emr.svg";
import { ReactComponent as Msk } from "../../icons/msk.svg";

export function Ec2Cloud(props) {
  const { ec2status, loading } = useContext(DashboardContext);
  const [Ec2Status, setEc2Status] = ec2status;
  console.log(Ec2Status);

  return (
    <Container fluid className="cardscloud">
      <Row>
        <Card className="card-stats mb-4 mb-xl-0">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                  EC2 Instances
                </CardTitle>
                <p></p>
                <span className="h2 font-weight-bold  mb-0">
                  Total : {Ec2Status.length}
                </span>
              </div>
              <Col className="col-auto">
                <div className="icon shadow">
                  <EC2logo className="dashboard-aws-logo" />
                </div>
              </Col>
            </Row>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-success mr-2">
                <i className="fa fa-arrow-up" /> Running :{" "}
                {
                  Ec2Status.filter(
                    (run) => run.InstanceState.Name === "running"
                  ).length
                }
              </span>
              <span className="text-danger mr-2">
                <i className="fa fa-arrow-down" /> Stopped :
                {
                  Ec2Status.filter(
                    (run) => run.InstanceState.Name === "stopped"
                  ).length
                }
              </span>

              <span className="text-nowrap"></span>
            </p>
          </CardBody>
        </Card>
      </Row>
    </Container>
  );
}

export function RdsCloud(props) {
  const [rds, setRds] = useContext(RdsContext);
  return (
    <Container fluid className="cardscloud">
      <Row>
        <Card className="card-stats mb-4 mb-xl-0">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                  RDS Instances
                </CardTitle>
                <p></p>
                <span className="h2 font-weight-bold  mb-0">
                  Total : {rds.length}
                </span>
              </div>
              <Col className="col-auto">
                <div className="icon">
                  <Rds className="dashboard-aws-logo" />
                </div>
              </Col>
            </Row>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-success mr-2">
                <i className="fa fa-arrow-up" /> Running :{" "}
                {
                  rds.filter((run) => run.DBInstanceStatus === "available")
                    .length
                }
              </span>
              <span className="text-danger mr-2">
                <i className="fa fa-arrow-down" /> Stopped :
                {
                  rds.filter((stop) => stop.DBInstanceStatus === "stopped")
                    .length
                }
              </span>

              <span className="text-nowrap"></span>
            </p>
          </CardBody>
        </Card>
      </Row>
    </Container>
  );
}

export function EmrCloud(props) {
  const [emr, setEmr] = useContext(EmrContext);
  return (
    <Container fluid className="cardscloud">
      <Row>
        <Card className="card-stats mb-4 mb-xl-0">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                  EMR Instances
                </CardTitle>
                <p></p>
                <span className="h2 font-weight-bold  mb-0">
                  Running : {emr.length}
                </span>
              </div>
              <Col className="col-auto">
                <div className="icon">
                  <Emr className="dashboard-aws-logo" />
                </div>
              </Col>
            </Row>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-success mr-2">
                <i className="fa fa-arrow-up" /> Running :{" "}
                {emr.filter((run) => run.State === "Running").length}
              </span>
              <span className="text-danger mr-2">
                <i className="fa fa-arrow-down" /> Terminated :
                {emr.filter((stop) => stop.State === "TERMINATED").length}
              </span>

              <span className="text-nowrap"></span>
            </p>
          </CardBody>
        </Card>
      </Row>
    </Container>
  );
}

export function ElbCloud(props) {
  const [elb, setElb] = useContext(ElbContext);
  return (
    <Container fluid className="cardscloud">
      <Row>
        <Card className="card-stats mb-4 mb-xl-0">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                  ELB Instances
                </CardTitle>
                <p></p>
                <span className="h2 font-weight-bold  mb-0">
                  Active : {elb.length}
                </span>
              </div>
              <Col className="col-auto">
                <div className="icon">
                  <Elb className="dashboard-aws-logo" />
                </div>
              </Col>
            </Row>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-success mr-2">
                <i className="fa fa-arrow-up" /> Running :{" "}
                {elb.filter((run) => run.State === "active").length}
              </span>
              <span className="text-danger mr-2">
                <i className="fa fa-arrow-down" /> Stopped :
                {elb.filter((stop) => stop.State === "active_impaired").length}
              </span>

              <span className="text-nowrap"></span>
            </p>
          </CardBody>
        </Card>
      </Row>
    </Container>
  );
}

export function MskCloud(props) {
  const [msk, setMsk] = useContext(MskContext);
  return (
    <Container fluid className="cardscloud">
      <Row>
        <Card className="card-stats mb-4 mb-xl-0">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                  MSK Instances
                </CardTitle>
                <p></p>
                <span className="h2 font-weight-bold  mb-0">
                  Total : {msk.length}
                </span>
              </div>
              <Col className="col-auto">
                <div className="icon">
                  <Msk className="dashboard-aws-logo" />
                </div>
              </Col>
            </Row>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-success mr-2">
                <i className="fa fa-arrow-up" /> Running :{" "}
                {msk.filter((run) => run.State === "ACTIVE").length}
              </span>
              <span className="text-danger mr-2">
                <i className="fa fa-arrow-down" /> Failed:
                {msk.filter((stop) => stop.State === "FAILED").length}
              </span>

              <span className="text-nowrap"></span>
            </p>
          </CardBody>
        </Card>
      </Row>
    </Container>
  );
}
