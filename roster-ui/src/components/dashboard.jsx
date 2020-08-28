import React, { useContext } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import Modals from "./shared/modals";
import { Loader } from "./shared/loader";
import { DashboardContext } from "../context/context.js";

function Dashboard() {
  const { data, metricsData, rdsMetricsData, loading } = useContext(
    DashboardContext
  );
  const [Alarms] = data;
  const [Metrics] = metricsData;
  const [rdsMetrics] = rdsMetricsData;
  const [Loading] = loading;
  // console.log(rdsMetrics);
  return (
    <div>
      {Loading === true ? (
        <div className="loader">
          <Loader></Loader>
        </div>
      ) : (
        <div className="main-content">
          <h1 style={{ paddingLeft: "3%" }} className="h2">
            Dashboard
          </h1>

          <Row style={{ paddingTop: "10px" }}>
            <Col sm="6" style={{ paddingLeft: "4%" }}>
              {Metrics.length ? (
                Metrics.map((widget) => (
                  <span>
                    <img
                      alt=""
                      src={`data:image/png;base64,${widget.cpuutilization}`}
                    ></img>
                    <img
                      alt=""
                      src={`data:image/png;base64,${widget.instance_status}`}
                    ></img>
                  </span>
                ))
              ) : (
                <strong>EC2 Metrics Unavailable,</strong>
              )}

              {Metrics.length ? (
                rdsMetrics.map((widget) => (
                  <span>
                    <img
                      alt=""
                      src={`data:image/png;base64,${widget.DbConnections}`}
                    ></img>
                    <img
                      alt=""
                      src={`data:image/png;base64,${widget.CPUUtilization}`}
                    ></img>
                  </span>
                ))
              ) : (
                <strong> RDS Metrics Unavailable</strong>
              )}
            </Col>

            <Col sm="5">
              <strong style={{ color: "#f5365c" }}>
                {" "}
                Alarms Count: {Alarms.length}
              </strong>
              {Alarms.length ? (
                Alarms.map((alarm) => (
                  <Card style={{ marginBottom: "10px" }}>
                    <CardBody>
                      <Row className="align-items-right">
                        <div className="col ml--2">
                          <h4 className="mb-0">
                            <strong className="text-primary">
                              {alarm.AlarmName}
                            </strong>
                          </h4>
                          <p className="text-sm text-default mb-0">
                            Metric Name: {alarm.MetricName}
                          </p>
                        </div>
                        <Col className="col-auto text-danger">
                          <i
                            class="fa fa-exclamation-circle"
                            aria-hidden="true"
                          ></i>
                          {" " + "IN" + " " + alarm.StateValue}
                        </Col>

                        <Modals
                          title={"Alarm Details"}
                          buttonText={"More Info"}
                          alarms={alarm.StateReason}
                        ></Modals>
                      </Row>
                    </CardBody>
                  </Card>
                ))
              ) : (
                <strong> No Alarms</strong>
              )}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
