import React, { useContext, useState } from "react";
import { MskContext } from "../../context/context.js";
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
import _ from "lodash";
import { Loader } from "../shared/loader";
import { InstanceStatus } from "../shared/instancestatus.js";
import { NoObject } from "../shared/noobjects";
import { Searching } from "../shared/search.js";
import { Icon } from "rsuite";

function Msk() {
  const { data, loading } = useContext(MskContext);
  const [Msk] = data;
  const [Loading] = loading;
  const [filtered, setFilter] = useState("");
  const [direction, setDirection] = useState("desc");
  const sort = (col) => {
    let sorted;
    if (direction === "desc") {
      sorted = _.orderBy(mskItems, [(x) => x[col].toLowerCase()], "asc");
      setDirection("asc");
    }
    if (direction === "asc") {
      sorted = _.orderBy(mskItems, [(x) => x[col].toLowerCase()], "desc");
      setDirection("desc");
    }
    setFilter(sorted);
  };
  const mskItems = filtered ? filtered : Msk;

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
                  placeholder="Search by Cluster Name"
                  type="text"
                  onChange={(e) =>
                    setFilter(Searching(e.target.value, Msk, "msk"))
                  }
                  //
                />
              </FormGroup>
            </Col>
            <InstanceStatus
              total={Msk.length}
              running={Msk.filter((run) => run.State === "ACTIVE").length}
              stopped={Msk.filter((stop) => stop.State === "FAILED").length}
            ></InstanceStatus>
          </Row>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">
                    Managed Streaming for Apache Kafka (MSK)
                  </h3>
                </CardHeader>
                {mskItems.length ? (
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">
                          Cluster Name
                          <button
                            onClick={() => sort("ClusterName")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">
                          Cluster Version
                          <button
                            onClick={() => sort("CurrentVersion")}
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
                            onClick={() => sort("env")}
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
                        <th scope="col">
                          Broker Nodes
                          <button
                            onClick={() => sort("NumberOfBrokerNodes")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                        <th scope="col">
                          Kafka Version
                          <button
                            onClick={() => sort("KafkaVersion")}
                            className="sort-button"
                          >
                            <Icon icon="sort" />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Msk.map((cluster) => (
                        <tr key={cluster.ClusterName}>
                          <td>{cluster.ClusterName}</td>
                          <td>{cluster.CurrentVersion}</td>
                          {cluster.State ===
                          ("ACTIVE" || "CREATING" || "UPDATING") ? (
                            <td className="text-success text-wrap">
                              {cluster.State}
                            </td>
                          ) : (
                            <td className="text-danger text-wrap">
                              {cluster.State}
                            </td>
                          )}

                          <td>
                            {cluster.Tags.env}
                            {/* {cluster.Tags.filter((env) => env.Key === "env")
                          .map((e) => e.Value)
                          .join(" ")} */}
                          </td>

                          <td>{cluster.InstanceType}</td>
                          <td>{cluster.NumberOfBrokerNodes}</td>
                          <td>{cluster.KafkaVersion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <NoObject service="Kafka"></NoObject>
                )}
              </Card>
            </div>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Msk;
