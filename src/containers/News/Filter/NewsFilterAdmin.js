import React from "react";
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
import { renderDateTimePickerWithoutLabel } from "../../../components/DateTimeFormHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validateDatePicker } from "../../../utils/DateUtils";
import moment from "moment";

const validate = (values) => {
  const errors = {};

  if (values.round && isNaN(Number(values.round))) {
    errors.round = "ตัวเลขเท่านั้น";
  }
  if (values.year && isNaN(Number(values.year))) {
    errors.year = "ตัวเลขเท่านั้น";
  }
  if (
    // isNaN(Number(values.publishstartdate)) ||
    (values.publishstartdate &&
      !validateDatePicker(moment(values.publishstartdate).format("DD/MM/YYYY")))
  ) {
    errors.publishstartdate = "กรุณากดเลือกจากปฎิทิน";
    values.publishstartdate = "";
  }
  if (
    // isNaN(Number(values.publishenddate)) ||
    (values.publishenddate &&
      !validateDatePicker(moment(values.publishenddate).format("DD/MM/YYYY")))
  ) {
    errors.publishenddate = "กรุณากดเลือกจากปฎิทิน";
    values.publishenddate = "";
  }
  return errors;
};
const NewsFilterAdmin = (props) => {
  const { handleSubmit, loading, getNews, reset, formStates } = props;

  const mapFilterNewsAdminToRequest = (values) => {
    let data = {
      search: values.search ? values.search : "",
      publishstartdate: values.publishstartdate
        ? moment(values.publishstartdate).format("YYYY-MM-DDTHH:mm:ss")
        : "",
      publishenddate: values.publishenddate
        ? moment(values.publishenddate).format("YYYY-MM-DDTHH:mm:ss")
        : "",
      status: values.status ? values.status : "",
    };

    return data;
  };
  const submitRenderFilter = async (values) => {
    window.scrollTo(0, 0);
    loading(LOADING.getNews);
    await getNews(mapFilterNewsAdminToRequest(values));
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
            placeholder="สถานะทั้งหมด"
            list={[
              { value: "publish", label: "เผยแพร่" },
              { value: "draft", label: "ร่าง" },
              { value: "remove", label: "นำออก" },
            ]}
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
    formStates: getFormValues("NewsFilterAdmin")(state),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "NewsFilterAdmin",
    validate,
  })(NewsFilterAdmin),
);
