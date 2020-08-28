import React, { useContext, useState } from "react";
import { EmrContext } from "../../context/context.js";
//import { SortButton } from "../shared/sortbutton.js";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
} from "reactstrap";
import { InstanceStatus } from "../shared/instancestatus.js";
import Modals from "../shared/modals";
import _ from "lodash";
import { Loader } from "../shared/loader";
import { Searching } from "../shared/search.js";
import { NoObject } from "../shared/noobjects";
import { Icon } from "rsuite";

function Emr() {
  const { data, loading } = useContext(EmrContext);
  const [Emr] = data;
  const [Loading] = loading;
  const [filtered, setFilter] = useState("");
  const [direction, setDirection] = useState("asc");

  const sort = (col) => {
    let sorted;
    if (direction === "desc") {
      sorted = _.orderBy(emrItems, [(x) => x[col].toLowerCase()], "asc");
      setDirection("asc");
    }
    if (direction === "asc") {
      sorted = _.orderBy(emrItems, [(x) => x[col].toLowerCase()], "desc");
      setDirection("desc");
    }
    setFilter(sorted);
  };
  const emrItems = filtered ? filtered : Emr;
  return (
    <div className="main-content">
      {Loading === true ? (
        <div className="loader">
          <Loader></Loader>
        </div>
      ) : (
        <Container fluid className="table-element">
          <Row>
            <Col md="4">
              <FormGroup>
                <Input
                  name="search"
                  className="is-valid"
                  placeholder="Search by Cluster ID or Cluster Name"
                  type="text"
                  onChange={(e) =>
                    setFilter(Searching(e.target.value, Emr, "emr"))
                  }
                />
              </FormGroup>
            </Col>
            <InstanceStatus
              total={Emr.length}
              running={Emr.filter((run) => run.State === "Running").length}
              stopped={Emr.filter((stop) => stop.State === "TERMINATED").length}
            ></InstanceStatus>
          </Row>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Elastic Map Reduce (EMR)</h3>
                </CardHeader>
                {emrItems.length ? (
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">
                          Cluster Name
                          <button
                            onClick={() => sort("Name")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">Cluster ID</th>
                        <th scope="col">
                          Status
                          <button
                            onClick={() => sort("State")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">Applications</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {emrItems.map((cluster) => (
                        <tr key={cluster.Name}>
                          <td>{cluster.Name}</td>
                          <td>{cluster.ClusterId}</td>
                          {cluster.State ===
                          ("STARTING" ||
                            "BOOTSTRAPPING" ||
                            "RUNNING" ||
                            "WAITING") ? (
                            <td className="text-success text-wrap">
                              {cluster.State} - {cluster.StatusMessage}
                            </td>
                          ) : (
                            <td className="text-danger text-wrap">
                              {cluster.State} - {cluster.StatusMessage}
                            </td>
                          )}
                          {/* {lb.AvailabilityZones.map(data => (
                      <td scope="row">
                        {data.SubnetId}, {data.ZoneName}
                      </td> */}
                          <td>
                            {cluster.Applications.map((data) => {
                              let Applications = data.Name + " ";
                              return Applications;
                            })}
                          </td>
                          <td>
                            <Modals
                              title={"EMR Status Message"}
                              cluster={
                                cluster.ClusterId + ":" + cluster.StatusMessage
                              }
                              buttonText={"Logs"}
                            ></Modals>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <NoObject service="EMR"></NoObject>
                )}
              </Card>
            </div>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Emr;
