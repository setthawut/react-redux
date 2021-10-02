import React, { useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { mapDispatchToProps } from "../../redux/actions/index";
import { Field, reduxForm, reset } from "redux-form";
import { renderColField } from "../../components/FormHelper";
import { connect } from "react-redux";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LOADING from "../../redux/actions/loading_key";

const validate = (values) => {
  const errors = {};
  if (!values.oldPassword) {
    errors.oldPassword = "กรุณาใส่ข้อมูล";
  }
  if (!values.password) {
    errors.password = "กรุณาใส่ข้อมูล";
  } else if (values.password && values.confirmPassword) {
    if (values.password != values.confirmPassword) {
      errors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
    }
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "กรุณาใส่ข้อมูล";
  }

  if (values.confirmPassword && values.confirmPassword.length < 8) {
    errors.confirmPassword = "รหัสผ่าน อย่างน้อย 8 หลัก";
  }
  if (values.password && values.password.length < 8) {
    errors.password = "รหัสผ่าน อย่างน้อย 8 หลัก";
  }
  return errors;
};
const mapResetPasswordMeFormToApiRequest = (id, values) => {
  return {
    id: id,
    password: values.oldPassword,
    newpassword: values.password,
  };
};
const ResetPasswordMe = (props) => {
  const { handleSubmit, loading, changePasswordMe, user, dispatch } = props;

  const submitResetPasswordMe = async (values) => {
    if (!!user) {
      loading(LOADING.resetPasswordMe);

      await changePasswordMe(
        mapResetPasswordMeFormToApiRequest(user.userId, values),
      );
      dispatch(reset("ResetPasswordMe"));
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={6}>
          <div className="box">
            <Row>
              <Col xs={8}>
                <h3>{"เปลี่ยนรหัสผ่าน"}</h3>
              </Col>
            </Row>
            <Form
              onSubmit={handleSubmit((values) => submitResetPasswordMe(values))}
            >
              <Field
                controlId="oldPassword"
                name="oldPassword"
                label="รหัสผ่านปัจุบัน:"
                leftCol={4}
                rightCol={8}
                component={renderColField}
                isRequire={true}
              />
              <Field
                controlId="password"
                name="password"
                label="รหัสผ่าน:"
                leftCol={4}
                rightCol={8}
                component={renderColField}
                isRequire={true}
              />
              <Field
                controlId="confirmPassword"
                name="confirmPassword"
                label="ยืนยันรหัสผ่าน:"
                leftCol={4}
                rightCol={8}
                component={renderColField}
                isRequire={true}
              />

              <Row>
                <Col xs={12} style={{ textAlign: "center" }}>
                  <Button variant="primary" type="submit">
                    <FontAwesomeIcon
                      icon={faSave}
                      style={{ marginRight: 10 }}
                    />
                    บันทึก
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    refreshPage: state.changePasswordMe.refreshPage,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "ResetPasswordMe",
    validate,
  })(ResetPasswordMe),
);
