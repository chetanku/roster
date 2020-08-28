import React, { useContext, useState } from "react";
import { CeContext } from "../../context/context.js";
import _ from "lodash";
import { NoObject } from "../shared/noobjects";
import moment from "moment";
import ReactDatetime from "react-datetime";
import { Loader } from "../shared/loader";
import Currency from "react-currency-formatter";
import { Icon } from "rsuite";

import {
  Card,
  CardBody,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Badge,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Alert,
} from "reactstrap";
import { Modal, Button } from "rsuite";

import * as crypto from "crypto-js";

function CostSummary() {
  const { data, data_forecast, loading } = useContext(CeContext);
  const [Ce] = data;
  const [CeForecast] = data_forecast;
  const [Loading] = loading;
  const [ModalState, setModalState] = useState(true);
  const [Password, setPassword] = useState();
  localStorage.getItem("firstDay") ||
    localStorage.setItem(
      "firstDay",
      moment.utc().startOf("month").format("YYYY-MM-DD")
    );
  localStorage.getItem("lastDay") ||
    localStorage.setItem(
      "lastDay",
      moment.utc().endOf("month").format("YYYY-MM-DD")
    );
  var valid = function (current) {
    return current.isBefore(moment().endOf("month"));
  };
  const [filtered, setFilter] = useState("");
  // Sort function
  const [direction, setDirection] = useState("desc");
  const sort = (col) => {
    console.log(col);
    let sorted;
    if (direction === "desc") {
      sorted = _.orderBy(ceItems, [(x) => x[col]], "asc");
      setDirection("asc");
    }
    if (direction === "asc") {
      sorted = _.orderBy(ceItems, [(x) => x[col]], "desc");
      setDirection("desc");
    }
    setFilter(sorted);
  };

  const ceItems = filtered ? filtered : Ce;
  let unitType = [];

  if (!ceItems.Error) {
    ceItems
      .filter((unit) => unit.Unit && unit.Cost)
      .map((value) => (unitType.push(value.Unit), unitType.push(value.Cost)));
  }

  const monthlist = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="main-content">
      {!sessionStorage.getItem("creds") ||
      sessionStorage.getItem("creds") == null ? (
        <Modal show={ModalState} onHide={() => setModalState(false)}>
          <Modal.Header>
            <Modal.Title>You need admin access to view this page</Modal.Title>{" "}
          </Modal.Header>
          <Modal.Body>
            <div class="form-group">
              <label for="example-password-input" class="form-control-label">
                Password
              </label>
              <Input
                class="form-control"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {Password ? (
              <Button
                onClick={() => (
                  setModalState(false),
                  sessionStorage.setItem(
                    "creds",
                    crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(Password))
                  ),
                  window.location.reload(false)
                )}
                appearance="primary"
                style={{
                  backgroundColor: "#5e72e4",
                }}
              >
                Submit
              </Button>
            ) : (
              <Button appearance="primary" disabled>
                {" "}
                Submit{" "}
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      ) : (
        " "
      )}
      {Loading === false && !("Error" in ceItems) ? (
        <Container fluid className="table-element">
          <Row>
            <Col md="4">
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    inputProps={{
                      placeholder:
                        monthlist[
                          moment(localStorage.getItem("firstDay")).month()
                        ] +
                          " " +
                          moment(localStorage.getItem("firstDay")).year() ||
                        "Pick Month",
                    }}
                    dateFormat="YYYY-MM"
                    timeFormat={false}
                    isValidDate={valid}
                    onChange={(e) => {
                      let firstDay = moment(
                        new Date(e._d.getFullYear(), e._d.getMonth(), 1)
                      ).format("YYYY-MM-DD");
                      let lastDay = moment(
                        new Date(e._d.getFullYear(), e._d.getMonth() + 1, 0)
                      ).format("YYYY-MM-DD");
                      localStorage.setItem("firstDay", firstDay);
                      localStorage.setItem("lastDay", lastDay);
                      window.location.reload(false);
                    }}
                  />
                </InputGroup>
              </FormGroup>
            </Col>

            <Col md="4">
              <FormGroup>
                <div
                  className="alert alert-secondary"
                  role="alert"
                  style={{ width: "40rem" }}
                >
                  <strong>
                    <span className="text-primary text-uppercase mr-2">
                      <i className="fa" />
                      Total Cost:{" "}
                      <span className="text-danger">
                        {" "}
                        {unitType.length ? (
                          <Currency
                            quantity={unitType[1]}
                            currency={unitType[0]}
                          />
                        ) : (
                          <span className="text-muted">Unavailable</span>
                        )}
                      </span>
                    </span>{" "}
                  </strong>{" "}
                  <strong>
                    <span className="text-primary text-uppercase mr-2">
                      <i className="fa" /> Forecasts:{" "}
                      {CeForecast.length ? (
                        CeForecast.map((forecast) => (
                          <span>
                            <span className="text-default">
                              {" "}
                              {monthlist[moment(forecast.Start).month()]}
                            </span>
                            {"     "}

                            <span className="text-danger">
                              <Currency
                                quantity={forecast.Cost}
                                currency={forecast.Unit}
                              />
                              {/* {forecast.Unit + " " + forecast.Cost} */}
                            </span>
                          </span>
                        ))
                      ) : (
                        <> </>
                      )}
                    </span>
                  </strong>{" "}
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">
                    AWS Cost Summary{" "}
                    <span style={{ color: "#44d03f" }}>
                      {monthlist[
                        moment(localStorage.getItem("firstDay")).month()
                      ] +
                        " " +
                        moment(localStorage.getItem("firstDay")).year()}
                    </span>
                  </h3>
                </CardHeader>
                {ceItems.length ? (
                  <div>
                    <Table className="align-items-center" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">AWS Service Name</th>
                          <th scope="col">
                            Price{" "}
                            <Badge className="badge-lg" color="primary" pill>
                              ({unitType[0]})
                            </Badge>
                            <button
                              onClick={() => sort("Cost")}
                              className="sort-button"
                            >
                              <Icon icon="sort" />
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ceItems.map((service) =>
                          service.Service !== "Total Cost" ? (
                            <tr key={service.Service}>
                              <th scope="row">{service.Service}</th>
                              <td>{service.Cost}</td>
                            </tr>
                          ) : (
                            <></>
                          )
                        )}
                      </tbody>
                    </Table>
                    <span>
                      <CardBody>
                        <Row className="align-items-center">
                          <div className="col">
                            <h4>Total Cost </h4>
                          </div>
                          <Col className="col" style={{ "margin-left": "32%" }}>
                            <strong className="h4" style={{ color: "#f5365c" }}>
                              <Currency
                                quantity={unitType[1]}
                                currency={unitType[0]}
                              />
                            </strong>
                          </Col>
                        </Row>
                      </CardBody>
                    </span>
                  </div>
                ) : (
                  <NoObject service="Cost Summary"></NoObject>
                )}
              </Card>
            </div>
          </Row>
        </Container>
      ) : "Error" in ceItems ? (
        <Container>
          {" "}
          <Row>
            <Col md="4">
              <div className="loader">
                <Alert className="danger" style={{ opacity: 100 }}>
                  <strong>{ceItems.Error}</strong>
                </Alert>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <div className="loader">
          <Loader></Loader>
        </div>
      )}
    </div>
  );
}
export default CostSummary;
