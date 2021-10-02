import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { mapDispatchToProps } from "../../../redux/actions/index";
import { Field, reduxForm, getFormValues } from "redux-form";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import LOADING from "../../../redux/actions/loading_key";
import { connect } from "react-redux";
import { renderColField } from "../../../components/FormHelper";
import { renderDatePicker } from "../../../components/DateTimeFormHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { validateDatePicker } from "../../../utils/DateUtils";
const validate = (values) => {
  const errors = {};

  if (values.numberofmeeting && isNaN(Number(values.numberofmeeting))) {
    errors.numberofmeeting = "ตัวเลขเท่านั้น";
  }
  if (values.year && isNaN(Number(values.year))) {
    errors.year = "ตัวเลขเท่านั้น";
  }
  if (
    // isNaN(Number(values.meetingdate)) ||
    (values.meetingdate &&
      !validateDatePicker(moment(values.meetingdate).format("DD/MM/YYYY")))
  ) {
    errors.meetingdate = "กรุณากดเลือกจากปฎิทิน";
  }

  // if (
  //  (values.publishstartdate &&
  //     !validateDatePicker(
  //       moment(values.publishstartdate).format("DD/MM/YYYY"),
  //     )) 
  
  // ) {
  //   errors.publishstartdate = "กรุณากดเลือกจากปฎิทิน";
  // }
  // if (
  //   isNaN(Number(values.publishenddate))  ||    values.publishenddate &&
  //   !validateDatePicker(moment(values.publishenddate).format("DD/MM/YYYY"))
  // ) {
  //   errors.publishenddate = "กรุณากดเลือกจากปฎิทิน";
  // }
  return errors;
};
const MeetingFilterUser = ({
  handleSubmit,
  loading,
  getMeeting,
  reset,
  dataMeeting,
  keyType,
}) => {
  const [stateType, setStateType] = useState("");

  const mapFilterMeetingUserToRequest = (values) => {
    let findType = dataMeeting.find((item) => item.type);
    if (!!findType) {
      setStateType(findType.type);
    }

    let data = {
      search: values.search ? values.search : "",
      numberofmeeting: values.numberofmeeting ? values.numberofmeeting : "",
      year: values.year ? values.year : "",
      meetingdate: values.meetingdate
        ? moment(values.meetingdate).format("YYYY-MM-DDTHH:mm:ss")
        : "",
    };

    return {
      filter: data,
      filterType: !!stateType
        ? stateType
        : !!findType
        ? findType.type
        : keyType,
    };
  };
  const submitRenderFilter = async (values) => {
    window.scrollTo(0, 0);
    loading(LOADING.getMeeting);
    await getMeeting(mapFilterMeetingUserToRequest(values));
  };
  return (
    <Form onSubmit={handleSubmit((values) => submitRenderFilter(values))}>
      <Row>
        <Col xs={6}>
          <Field
            controlId="search"
            name="search"
            component={renderColField}
            label="ค้นหา:"
            placeholder=""
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Field
            controlId="numberofmeeting"
            name="numberofmeeting"
            component={renderColField}
            label="ครั้งที่:"
            placeholder=""
          />
        </Col>
        <Col xs={6}>
          <Field
            controlId="year"
            name="year"
            component={renderColField}
            label="ปี:"
            placeholder=""
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Field
            label="วันที่ประชุม:"
            controlId="meetingdate"
            name="meetingdate"
            component={renderDatePicker}
            placeholder="Please Select Start Date Time"
          />
        </Col>
      </Row>
      <Row></Row>

      <Row>
        <Col sm={12} style={{ textAlign: "center" }}>
          <Button variant="primary" type="submit">
            <FontAwesomeIcon icon={faSearch} style={{ marginRight: 10 }} />
            ค้นหา
          </Button>
          <Button
            variant="primary"
            onClick={reset}
            type="submit"
            style={{
              marginLeft: 10,
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
    dataMeeting: state.meeting.meeting,
    formStates: getFormValues("MeetingFilterUser")(state),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "MeetingFilterUser",
    validate,
  })(MeetingFilterUser),
);
