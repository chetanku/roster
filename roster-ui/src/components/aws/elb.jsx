import React, { useContext, useState } from "react";
import { ElbContext } from "../../context/context.js";
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
import { Loader } from "../shared/loader";
import { Searching } from "../shared/search.js";
import { InstanceStatus } from "../shared/instancestatus.js";
import _ from "lodash";
import Modals from "../shared/modals";
import { NoObject } from "../shared/noobjects";
import { Icon } from "rsuite";

function Elb() {
  const { data, loading } = useContext(ElbContext);
  const [Elb] = data;
  const [Loading] = loading;
  const [filtered, setFilter] = useState("");
  const [direction, setDirection] = useState("asc");

  const sort = (col) => {
    let sorted;
    if (direction === "desc") {
      sorted = _.orderBy(elbItems, [(x) => x[col].toLowerCase()], "asc");
      setDirection("asc");
    }
    if (direction === "asc") {
      sorted = _.orderBy(elbItems, [(x) => x[col].toLowerCase()], "desc");
      setDirection("desc");
    }
    setFilter(sorted);
  };
  const elbItems = filtered ? filtered : Elb;
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
                  placeholder="Search by LB Name or DNS Name"
                  type="text"
                  onChange={(e) =>
                    setFilter(Searching(e.target.value, Elb, "elb"))
                  }
                />
              </FormGroup>
            </Col>
            <InstanceStatus
              total={Elb.length}
              running={Elb.filter((run) => run.State === "active").length}
              stopped={
                Elb.filter((stop) => stop.State === "active_impaired").length
              }
            ></InstanceStatus>
          </Row>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Elastic Load Balancers (ELB)</h3>
                </CardHeader>
                {elbItems.length ? (
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">
                          Name
                          <button
                            onClick={() => sort("LoadBalancerName")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">
                          DNS Name
                          <button
                            onClick={() => sort("DNSName")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">Type</th>
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
                          Scheme
                          <button
                            onClick={() => sort("Scheme")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {elbItems.map((lb) => (
                        <tr key={lb.LoadBalancerName}>
                          <td>{lb.LoadBalancerName}</td>
                          <td className="text-wrap">{lb.DNSName}</td>
                          <td>{lb.Type}</td>
                          {lb.State === ("active" || "provisioning") ? (
                            <td className="text-success">{lb.State}</td>
                          ) : (
                            <td className="text-danger">{lb.State}</td>
                          )}
                          <td>{lb.Scheme}</td>
                          {/* {lb.AvailabilityZones.map(data => (
                      <td scope="row">
                        {data.SubnetId}, {data.ZoneName}
                      </td> */}
                          <td>
                            <Modals
                              title={"ELB Details"}
                              buttonText={"More Info"}
                              lb={lb.AvailabilityZones.map((data) => {
                                let items =
                                  data.SubnetId + " - " + data.ZoneName + ", ";
                                return items;
                              })}
                            ></Modals>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <NoObject service="ELB"></NoObject>
                )}
              </Card>
            </div>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Elb;
