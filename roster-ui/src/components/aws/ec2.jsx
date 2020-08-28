import React, { useContext, useState } from "react";
import { Ec2Context } from "../../context/context.js";
import _ from "lodash";
import { Searching } from "../shared/search.js";
import { InstanceStatus } from "../shared/instancestatus.js";
import { NoObject } from "../shared/noobjects";
import { Loader } from "../shared/loader";
//import { Sorting } from "../shared/sort.js";
import Modals from "../shared/modals";
import { Icon } from "rsuite";

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

function Ec2() {
  const { data, loading } = useContext(Ec2Context);
  const [ec2] = data;

  const [Loading] = loading;

  const [filtered, setFilter] = useState("");
  // Sort function
  const [direction, setDirection] = useState("desc");
  const sort = (col) => {
    let sorted;
    if (direction === "desc") {
      sorted = _.orderBy(ec2Items, [(x) => x[col].toLowerCase()], "asc");
      setDirection("asc");
    }
    if (direction === "asc") {
      sorted = _.orderBy(ec2Items, [(x) => x[col].toLowerCase()], "desc");
      setDirection("desc");
    }
    setFilter(sorted);
  };

  const ec2Items = filtered ? filtered : ec2;
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
                  placeholder="Search by InstanceName, InstanceId or PrivateIP"
                  type="text"
                  onChange={(e) =>
                    setFilter(Searching(e.target.value, ec2, "ec2"))
                  }
                  //
                />
              </FormGroup>
            </Col>

            <InstanceStatus
              total={ec2.length}
              running={ec2.filter((run) => run.State === "running").length}
              stopped={ec2.filter((stop) => stop.State === "stopped").length}
            ></InstanceStatus>
          </Row>

          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Elastic Compute Instances (EC2)</h3>
                </CardHeader>
                {ec2Items.length ? (
                  <Table className="align-items-center" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Instance ID</th>
                        <th scope="col">
                          Instance Name
                          <button
                            onClick={() => sort("Name")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">
                          Status
                          <button
                            onClick={() => sort("State")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">
                          Environment
                          <button
                            onClick={() => sort("Env")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">
                          Instance Type
                          <button
                            onClick={() => sort("InstanceType")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">Private IP</th>
                        <th scope="col">Public IP</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {ec2Items.map((instance) => (
                        <tr key={instance.InstanceId}>
                          <th scope="row">{instance.InstanceId}</th>
                          <td>{instance.Name}</td>
                          {instance.State === "running" ? (
                            <td className="text-success">{instance.State}</td>
                          ) : (
                            <td className="text-danger">{instance.State}</td>
                          )}
                          <td>{instance.Env}</td>
                          <td>{instance.InstanceType}</td>
                          <td>{instance.PrivateIpAddress}</td>
                          <td>{instance.PublicIpAddress}</td>
                          <td>
                            <Modals
                              title={"EC2 Details"}
                              buttonText={"More Info"}
                              ec2={instance.SubnetId + " - " + instance.VpcId}
                              dns={instance.PublicDnsName}
                            ></Modals>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <NoObject service="EC2"></NoObject>
                )}
              </Card>
            </div>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Ec2;

// sort logic revisit
//const [column, setColumn] = useState("");
// setColumn(col);
// console.log(column);
// setDirection(column === col ? invertDirection[direction] : "asc");
// sorted = _.orderBy(ec2Items, [(x) => x[col].toLowerCase()], direction);
// console.log(direction);
// const invertDirection = {
//   asc: "desc",
//   desc: "asc",
// };
// const state = {
//   columnToSort: "",
//   sortDirection: "desc",
// };
