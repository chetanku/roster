import React, { useContext, useState } from "react";
import { RdsContext } from "../../context/context.js";
import { Icon } from "rsuite";
import _ from "lodash";
import { Loader } from "../shared/loader";
import { InstanceStatus } from "../shared/instancestatus.js";
import { Searching } from "../shared/search.js";
import { NoObject } from "../shared/noobjects";
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

function Rds() {
  const { data, loading } = useContext(RdsContext);
  const [Rds] = data;
  const [Loading] = loading;
  const [filtered, setFilter] = useState("");

  // Sort function
  const [direction, setDirection] = useState("desc");
  const sort = (col) => {
    let sorted;
    if (direction === "desc") {
      sorted = _.orderBy(rdsItems, [(x) => x[col].toLowerCase()], "asc");
      setDirection("asc");
    }
    if (direction === "asc") {
      sorted = _.orderBy(rdsItems, [(x) => x[col].toLowerCase()], "desc");
      setDirection("desc");
    }
    setFilter(sorted);
  };
  const rdsItems = filtered ? filtered : Rds;

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
                  placeholder="Search by Database Name or Database Type"
                  type="text"
                  onChange={(e) =>
                    setFilter(Searching(e.target.value, Rds, "rds"))
                  }
                  //
                />
              </FormGroup>
            </Col>
            <InstanceStatus
              total={Rds.length}
              running={
                Rds.filter((run) => run.DBInstanceStatus === "available").length
              }
              stopped={
                Rds.filter((stop) => stop.DBInstanceStatus === "stopped").length
              }
            ></InstanceStatus>
          </Row>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Relational Database Service (RDS)</h3>
                </CardHeader>
                {rdsItems.length ? (
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">
                          Database Name
                          <button
                            onClick={() => sort("DBInstanceIdentifier")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">
                          Endpoint
                          <button
                            onClick={() => sort("Endpoint")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">
                          Engine
                          <button
                            onClick={() => sort("Engine")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">
                          Status
                          <button
                            onClick={() => sort("DBInstanceStatus")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">
                          Type
                          <button
                            onClick={() => sort("DBInstanceClass")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">
                          Storage
                          <button
                            onClick={() => sort("AllocatedStorage")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">
                          Availability Zone
                          <button
                            onClick={() => sort("AvailabilityZone")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rdsItems.map((instance) => (
                        <tr key={instance.DBInstanceIdentifier}>
                          <th scope="row">{instance.DBInstanceIdentifier}</th>
                          <td>{instance.Endpoint}</td>
                          <td>{instance.Engine}</td>
                          {instance.DBInstanceStatus === "available" ? (
                            <td className="text-success">
                              {instance.DBInstanceStatus}
                            </td>
                          ) : (
                            <td className="text-danger">
                              {instance.DBInstanceStatus}
                            </td>
                          )}
                          <td>{instance.DBInstanceClass}</td>
                          <td>{instance.AllocatedStorage} GiB</td>
                          <td>{instance.AvailabilityZone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <NoObject service="RDS"></NoObject>
                )}
              </Card>
            </div>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Rds;
