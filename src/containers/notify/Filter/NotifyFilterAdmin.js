import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { mapDispatchToProps } from "../../../redux/actions/index";
import { Field, reduxForm, getFormValues } from "redux-form";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import LOADING from "../../../redux/actions/loading_key";
import { connect } from "react-redux";
import {
  renderColField,
  renderColSelect,
} from "../../../components/FormHelper";
import {
  renderDatePicker,
  renderDateTimePickerWithoutLabel,
} from "../../../components/DateTimeFormHelper";
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
    (values.meetingdate &&
      !validateDatePicker(moment(values.meetingdate).format("DD/MM/YYYY"))) ||
    isNaN(Number(values.meetingdate))
  ) {
    errors.meetingdate = "กรุณากดเลือกจากปฎิทิน";
    values.meetingdate = "";
  }

  if (
    (values.publishstartdate &&
      !validateDatePicker(
        moment(values.publishstartdate).format("DD/MM/YYYY"),
      )) ||
    isNaN(Number(values.publishstartdate))
  ) {
    errors.publishstartdate = "กรุณากดเลือกจากปฎิทิน";
    values.publishstartdate = "";
  }
  if (
    (values.publishenddate &&
      !validateDatePicker(
        moment(values.publishenddate).format("DD/MM/YYYY"),
      )) ||
    isNaN(Number(values.publishenddate))
  ) {
    errors.publishenddate = "กรุณากดเลือกจากปฎิทิน";
    values.publishenddate = "";
  }
  return errors;
};

const NotifyFilterAdmin = ({
  handleSubmit,
  loading,
  getNotify,
  reset,
  isYear,
  isRound,
  dataNotify,
  keyType,
}) => {
  const [stateType, setStateType] = useState("");
  const mapFilterNotifyAdminToRequest = (values) => {
    let findType = dataNotify.find((item) => item.type);
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
      publishstartdate: values.publishstartdate
        ? moment(values.publishstartdate).format("YYYY-MM-DDTHH:mm:ss")
        : "",
      publishenddate: values.publishenddate
        ? moment(values.publishenddate).format("YYYY-MM-DDTHH:mm:ss")
        : "",
      status: values.status ? values.status : "",
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
    loading(LOADING.getNotify);
    await getNotify(mapFilterNotifyAdminToRequest(values));
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
        {isRound ? (
          <Col xs={6}>
            <Field
              controlId="numberofmeeting"
              name="numberofmeeting"
              component={renderColField}
              label="เลขที่คำสั่ง:"
              placeholder=""
            />
          </Col>
        ) : (
          ""
        )}
        {isYear ? (
          <Col xs={6}>
            <Field
              controlId="year"
              name="year"
              component={renderColField}
              label="ปี:"
              placeholder=""
            />
          </Col>
        ) : (
          ""
        )}
      </Row>
      <Row>
        <Col xs={6}>
          <Field
            label={isRound ? "วันที่ประกาศ" : "วันที่ลงนาม"}
            controlId="meetingdate"
            name="meetingdate"
            component={renderDatePicker}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group controlId={"datetime"} as={Row}>
            <Form.Label column xs={3}>
              วันเวลาที่เผยแพร่:
            </Form.Label>

            <Col xs={8}>
              <Row>
                <Field
                  col={5}
                  controlId="publishstartdate"
                  name="publishstartdate"
                  component={renderDateTimePickerWithoutLabel}
                  placeholder="วันที่เริ่มต้น"
                />
                <Col sm={1} style={{ textAlign: "center", marginTop: 10 }}>
                  -
                </Col>
                <Field
                  col={5}
                  controlId="publishenddate"
                  name="publishenddate"
                  component={renderDateTimePickerWithoutLabel}
                  placeholder="วันที่สิ้นสุด"
                />
              </Row>
            </Col>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Field
            controlId="status"
            name="status"
            component={renderColSelect}
            label="สถานะ:"
            placeholder={"สถานะทั้งหมด"}
            list={[
              { value: "publish", label: "เผยแพร่" },
              { value: "draft", label: "ร่าง" },
              { value: "remove", label: "นำออก" },
            ]}
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
            onClick={reset}
            type="submit"
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
    dataNotify: state.notify.notify,
    formStates: getFormValues("NotifyFilterAdmin")(state),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "NotifyFilterAdmin",
    validate,
  })(NotifyFilterAdmin),
);
