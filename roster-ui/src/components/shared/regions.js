import React, { useContext } from "react";
import { RegionsContext } from "../../context/context.js";
import { Container, Row, Col } from "reactstrap";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

function Awsregions() {
  const [Regions] = useContext(RegionsContext);
  console.log(Regions);
  return (
    <div className="region-dropdown">
      <Container>
        <Row>
          <Col
            sm={{
              size: "auto",
              offset: 1,
            }}
          >
            <UncontrolledDropdown group>
              <DropdownToggle
                caret
                color="secondary"
                className="region-btn-secondary"
              >
                {localStorage.getItem("region")}{" "}
              </DropdownToggle>{" "}
              <DropdownMenu className="region-dropdown-menu">
                {" "}
                {Regions.map((region) => (
                  <DropdownItem
                    key={region.Endpoint}
                    onClick={(e) => {
                      // setRegion(e.target.innerText);
                      localStorage.setItem("region", e.target.innerText);
                      window.location.reload(false);
                    }}
                  >
                    {region.RegionName}{" "}
                  </DropdownItem>
                ))}{" "}
              </DropdownMenu>{" "}
            </UncontrolledDropdown>{" "}
          </Col>{" "}
        </Row>{" "}
      </Container>{" "}
    </div>
  );
}

export default Awsregions;
