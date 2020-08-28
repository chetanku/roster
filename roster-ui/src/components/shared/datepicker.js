import React from "react";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";

// reactstrap components
import {
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

class Datepicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <FormGroup>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-calendar-grid-58" />
              </InputGroupText>{" "}
            </InputGroupAddon>{" "}
            <ReactDatetime
              inputProps={{
                placeholder: "Pick Month",
              }}
              dateFormat="YYYY-MM"
              timeFormat={false}
              onChange={(e) => (
                console.log(this.props.data),
                this.props.data({
                  Month: e._d.getMonth(),
                  Year: e._d.getFullYear(),
                })
              )}
            />{" "}
          </InputGroup>{" "}
        </FormGroup>{" "}
      </>
    );
  }
}

export default Datepicker;
