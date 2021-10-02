import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import Datetime from "../../react-datetime";
import moment from "moment";
import "moment/locale/th";

export const renderDatePicker = ({
  input,
  controlId,
  label,
  disabled,
  initValue = moment(),
  validDate = false,
  isRequire = false,
  isInitial = false,
  leftCol = 3,
  rightCol = 9,
  meta: { touched, error },
}) => {
  var date = new Date(Date.parse(input.value));
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear() + 543;

  return (
    <>
      <Form.Group controlId={controlId} as={Row}>
        <Form.Label column sm={leftCol}>
          {label}
          <span style={{ color: "red" }} hidden={!isRequire}>
            *
          </span>
        </Form.Label>
        <Col sm={rightCol}>
          <Datetime
            {...input}
            dateFormat={day + "/" + month + "/" + year}
            timeFormat=""
            value={input.value ? input.value : isInitial ? initValue : ""}
            input={true}
            validDate={validDate}
            style={{ color: "#444444" }}
            inputProps={{ disabled: disabled }}
            closeOnSelect={true}
          />

          {touched && !!error && (
            <div className="invalid-feedback" style={{ display: "block" }}>
              {error}
            </div>
          )}
        </Col>
      </Form.Group>
    </>
  );
};

export const renderDatePickerWithoutLabel = ({
  input,
  controlId,
  disabled,
  initValue = moment(),
  validDate = false,
  col = 3,
  meta: { touched, error },
}) => {
  var date = new Date(Date.parse(input.value));
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear() + 543;
  return (
    <>
      <Col sm={col}>
        <Datetime
          //  closeOnSelect={true}
          {...input}
          dateFormat={day + "/" + month + "/" + year}
          timeFormat=""
          value={input.value ? input.value : initValue}
          input={true}
          validDate={validDate}
          style={{ color: "#444444" }}
          inputProps={{ disabled: disabled }}
        />
        {touched && !!error && (
          <div className="invalid-feedback" style={{ display: "block" }}>
            {error}
          </div>
        )}
      </Col>
    </>
  );
};

export const renderDateTimePicker = ({
  input,
  controlId,
  label,
  disabled,
  initValue = moment(),
  validDate = false,
  isRequire = false,
  isInitial = false,
  leftCol = 1,
  rightCol = 11,
  meta: { touched, error },
}) => {
  var date = new Date(Date.parse(input.value));
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear() + 543;
  return (
    <Form.Group controlId={controlId} as={Row}>
      <Form.Label column sm={leftCol}>
        {label}
        <span style={{ color: "red" }} hidden={!isRequire}>
          *
        </span>
      </Form.Label>
      <Col sm={rightCol}>
        <Datetime
          {...input}
          closeOnSelect={true}
          dateFormat={day + "/" + month + "/" + year}
          timeFormat="HH:mm"
          value={input.value ? input.value : isInitial ? initValue : ""}
          input={true}
          validDate={validDate}
          style={{ color: "#444444" }}
          inputProps={{ disabled: disabled }}
        />
        {touched && !!error && (
          <div className="invalid-feedback" style={{ display: "block" }}>
            {error}
          </div>
        )}
      </Col>
    </Form.Group>
  );
};

export const renderDateTimePickerWithoutLabel = ({
  input,
  controlId,
  disabled,
  isInitial = false,
  initValue = moment(),
  validDate = false,
  col = 3,
  meta: { touched, error },
}) => {
  var date = new Date(Date.parse(input.value));
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear() + 543;
  return (
    <Col sm={col}>
      <Datetime
        {...input}
        closeOnSelect={true}
        dateFormat={day + "/" + month + "/" + year}
        timeFormat="HH:mm"
        value={input.value ? input.value : isInitial ? initValue : ""}
        input={true}
        validDate={validDate}
        style={{ color: "#444444" }}
        inputProps={{ disabled: disabled }}
      />
      {touched && !!error && (
        <div className="invalid-feedback" style={{ display: "block" }}>
          {error}
        </div>
      )}
    </Col>
  );
};
