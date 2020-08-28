import React, { useContext, useState } from "react";
import { SubnetsContext } from "../../context/context.js";
import _ from "lodash";
import { Searching } from "../shared/search.js";
import { NoObject } from "../shared/noobjects";
import { InstanceStatus } from "../shared/instancestatus.js";
//import { Sorting } from "../shared/sort.js";
import Modals from "../shared/modals";
import { Loader } from "../shared/loader";
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

function Subnets() {
  const { data, loading } = useContext(SubnetsContext);
  const [Subnets] = data;
  const [Loading] = loading;

  const [filtered, setFilter] = useState("");

  // Sort function
  const [direction, setDirection] = useState("desc");
  const sort = (col) => {
    let sorted;
    if (direction === "desc") {
      sorted = _.orderBy(subnetItems, [(x) => x[col].toLowerCase()], "asc");
      setDirection("asc");
    }
    if (direction === "asc") {
      sorted = _.orderBy(subnetItems, [(x) => x[col].toLowerCase()], "desc");
      setDirection("desc");
    }
    setFilter(sorted);
  };

  const subnetItems = filtered ? filtered : Subnets;
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
                  placeholder="Search by SubnetID"
                  type="text"
                  onChange={(e) =>
                    setFilter(Searching(e.target.value, Subnets, "subnets"))
                  }
                  //
                />
              </FormGroup>
            </Col>
            <InstanceStatus
              service="subnets"
              total={Subnets.length}
              running={
                Subnets.filter((run) => run.State === "available").length
              }
              stopped={
                Subnets.filter((stop) => stop.State === "pending").length
              }
            ></InstanceStatus>
          </Row>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Subnets</h3>
                </CardHeader>
                {subnetItems.length ? (
                  <Table className="align-items-center" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">
                          Subnet ID
                          <button
                            onClick={() => sort("SubnetId")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">
                          Name
                          <button
                            onClick={() => sort("Name")}
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
                          Availability Zone
                          <button
                            onClick={() => sort("AvailabilityZone")}
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
                          Vpc Id
                          <button
                            onClick={() => sort("VpcId")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">
                          CIDR Block
                          <button
                            onClick={() => sort("CidrBlock")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">
                          Available IP's
                          <button
                            onClick={() => sort("AvailableIpAddressCount")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {subnetItems.map((subnet) => (
                        <tr key={subnet.SubnetId}>
                          <th scope="row">{subnet.SubnetId}</th>
                          <td>{subnet.Name}</td>
                          <td>{subnet.Env}</td>
                          <td>{subnet.AvailabilityZone}</td>
                          {subnet.State === "available" ? (
                            <td className="text-success">{subnet.State}</td>
                          ) : (
                            <td className="text-danger">{subnet.State}</td>
                          )}

                          <td>{subnet.VpcId}</td>
                          <td>{subnet.CidrBlock}</td>
                          <td>{subnet.AvailableIpAddressCount}</td>

                          <td>
                            <Modals
                              title={"Subnets"}
                              buttonText={"More Info"}
                              subnets={subnet.SubnetArn}
                            ></Modals>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <NoObject service="Subnets"></NoObject>
                )}
              </Card>
            </div>
          </Row>
        </Container>
      )}
    </div>
  );
}
export default Subnets;
