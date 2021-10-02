import React from "react";
import { Row, Col, Form, Table, Button } from "react-bootstrap";
import { mapDispatchToProps } from "../../../redux/actions/index";
import { Field, reduxForm } from "redux-form";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import LOADING from "../../../redux/actions/loading_key";
import { connect } from "react-redux";
import { renderColField } from "../../../components/FormHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserFilterUser = ({ handleSubmit, loading, getUsers, reset, user }) => {
  const mapUserFilterUserToRequest = (values) => {
    return {
      username: values.username ? values.username : "",
      name: values.name ? values.name : "",
      institution: user.institution,
      isBlank: !!values.username || !!values.name ? false : true,
    };
  };

  const submitRenderFilter = async (values) => {
    window.scrollTo(0, 0);
    loading(LOADING.getUsers);
    await getUsers(mapUserFilterUserToRequest(values));
  };
  return (
    <Form onSubmit={handleSubmit((values) => submitRenderFilter(values))}>
      <Row>
        <Col xs={6}>
          <Field
            controlId="username"
            name="username"
            component={renderColField}
            label="ชื่อผู้ใช้งาน:"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Field
            controlId="name"
            name="name"
            component={renderColField}
            label="ชื่อ-นามสกุล:"
          />
        </Col>
      </Row>
      {/* <Row>
        <Col xs={6}>
          <Field
            label="สถานะ:"
            controlId="status"
            name="status"
            placeholder={"สถานะทั้งหมด"}
            component={renderColSelect}
            list={[
              { value: "active", label: "ใช้งาน" },
              { value: "inactive", label: "ปิด" },
              { value: "wait", label: "รออนุมัติ" },
            ]}
          />
        </Col>
      </Row> */}
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
    user: state.login.user,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "UserFilterUser",
  })(UserFilterUser),
);
