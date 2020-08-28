import React, { useContext } from "react";
import { AccountContext } from "../../context/context.js";
import { Container, Row, Col } from "reactstrap";
function Account() {
  const { data } = useContext(AccountContext);
  const [Account] = data;
  console.log(Account);
  return (
    <div className="account-dropdown">
      <Container>
        <Row>
          <Col
            sm={{
              size: "auto",
            }}
          >
            {Account.map((a) => (
              <h4>
                AWS Account:{" "}
                <span style={{ color: "#5e72e4" }}>{a.account}</span>
              </h4>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Account;
