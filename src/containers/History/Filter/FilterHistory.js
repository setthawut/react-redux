import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { mapDispatchToProps } from "../../../redux/actions/index";
import { Field, reduxForm, autofill, getFormValues } from "redux-form";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import LOADING from "../../../redux/actions/loading_key";
import { connect } from "react-redux";
import { renderColField } from "../../../components/FormHelper";
import { renderDateTimePickerWithoutLabel } from "../../../components/DateTimeFormHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import moment from "moment";

const validate = (values) => {
  const errors = {};
  if (values.startdate && isNaN(Number(values.startdate))) {
    errors.startdate = "ตัวเลขเท่านั้น";
  }
  if (values.enddate && isNaN(Number(values.enddate))) {
    errors.enddate = "ตัวเลขเท่านั้น";
  }
  return errors;
};

const defaultStartTime = moment().hour(0).minute(0).second(0);

const defaultEndTime = moment();

const FilterHistory = ({
  handleSubmit,
  getHistory,
  loading,
  dispatch,
  formStates,
}) => {
  const [resetTime, setResetTime] = useState(false);
  useEffect(() => {
    dispatch(autofill("FilterHistory", "startdate", defaultStartTime));
    dispatch(autofill("FilterHistory", "enddate", defaultEndTime));
  }, [resetTime]);
  const mapFilterHistoryToRequest = (values) => {
    let data = {
      username: values.username ? values.username : "",
      startdate: values.startdate
        ? moment(values.startdate).format("YYYY-MM-DDTHH:mm:ss")
        : "",
      enddate: values.enddate
        ? moment(values.enddate).format("YYYY-MM-DDTHH:mm:ss")
        : "",
    };

    return data;
  };

  const submitRenderFilter = async (value) => {
    window.scrollTo(0, 0);

    loading(LOADING.getHistory);
    await getHistory(mapFilterHistoryToRequest(value));
  };

  return (
    <Form onSubmit={handleSubmit((values) => submitRenderFilter(values))}>
      <Row>
        <Col xs={6}>
          <Form.Group controlId={"datetime"} as={Row}>
            <Form.Label column xs={3}>
              วันที่เวลา:
            </Form.Label>

            <Col xs={8}>
              <Row>
                <Field
                  col={5}
                  controlId="startdate"
                  name="startdate"
                  component={renderDateTimePickerWithoutLabel}
                  placeholder="วันที่เริ่มต้น"
                />
                <Col sm={1} style={{ textAlign: "center", marginTop: 10 }}>
                  -
                </Col>
                <Field
                  col={5}
                  controlId="enddate"
                  name="enddate"
                  component={renderDateTimePickerWithoutLabel}
                  placeholder="วันที่สิ้นสุด"
                />
              </Row>
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Field
            controlId="username"
            name="username"
            component={renderColField}
            label="ชื่อผู้ใช้งาน:"
            placeholder=""
          />
        </Col>
      </Row>

      <Row>
        <Col sm={12} style={{ textAlign: "center" }}>
          <Button variant="primary" type="submit">
            <FontAwesomeIcon icon={faSearch} style={{ marginRight: 10 }} />
            ค้นหา
          </Button>
          <Button
            variant="primary"
            style={{ marginLeft: 10 }}
            onClick={() => {
              setResetTime(!resetTime), (formStates.username = "");
              loading(LOADING.getHistory);
              getHistory({
                startdate: defaultStartTime.format("YYYY-MM-DDTHH:mm:ss"),
                enddate: defaultEndTime.format("YYYY-MM-DDTHH:mm:ss"),
                pageKey: 1,
              });
            }}
          >
            <FontAwesomeIcon icon={faTrash} style={{ marginRight: 10 }} />
            ล้าง
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
function mapStateToProps(state) {
  return {
    formStates: getFormValues("FilterHistory")(state),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "FilterHistory",
    validate,
  })(FilterHistory),
);
