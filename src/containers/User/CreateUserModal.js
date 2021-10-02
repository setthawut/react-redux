import React from "react";

import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import { renderColField, renderColSelect } from "../../components/FormHelper";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, reduxForm, getFormValues } from "redux-form";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import LOADING from "../../redux/actions/loading_key";
import { mapCreateUserFormToApiRequest } from "../../utils/UserUtils";
import { validateEmail } from "../../utils/EmailUtils";
const validate = (values) => {
  const errors = {};

  if (!values.userName) {
    errors.userName = "กรุณาใส่ข้อมูล";
  }

  if (!values.password) {
    errors.password = "กรุณาใส่ข้อมูล";
  }
  if (values.password && values.password.length < 8) {
    errors.password = "รหัสผ่าน อย่างน้อย 8 หลัก";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "กรุณาใส่ข้อมูล";
  }
  if (values.confirmPassword && values.confirmPassword.length < 8) {
    errors.confirmPassword = "รหัสผ่าน อย่างน้อย 8 หลัก";
  }
  if (values.password && values.confirmPassword) {
    if (values.password != values.confirmPassword) {
      errors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
    }
  }

  if (validateEmail(values.email)) {
    errors.email = "ไม่ตรงรูปแบบ";
    if (!values.email) {
      errors.email = "กรุณาใส่ข้อมูล";
    }
  }
  if (!values.name) {
    errors.name = "กรุณาใส่ข้อมูล";
  }
  if (!values.position) {
    errors.position = "กรุณาใส่ข้อมูล";
  }

  return errors;
};

class CreateUserModal extends React.Component {
  async submitCreateUser(values) {
    const { user } = this.props;

    if (!!user) {
      if (user.roles === "user") {
        values.role = "adminThoSo"; //เพิ่ม ojb role ใน values

        this.props.loading(LOADING.createUser);
        this.props.createUser(await mapCreateUserFormToApiRequest(values));
      } else {
        this.props.loading(LOADING.createUser);
        this.props.createUser(await mapCreateUserFormToApiRequest(values));
      }
    }
  }

  onHide() {
    this.props.hide_modal();
  }

  render() {
    const { handleSubmit, user, userRoles } = this.props;
    const mapUserRoles = userRoles.map((item) => ({
      value: item.key,
      label: item.value,
    }));

    return (
      <Modal show={true} onHide={this.onHide.bind(this)} size="lg">
        <Form onSubmit={handleSubmit(this.submitCreateUser.bind(this))}>
          <Modal.Header>
            <h3>ผู้ใช้งาน</h3>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col xs={10}>
                  <Container>
                    <Field
                      controlId="username"
                      name="username"
                      component={renderColField}
                      label="ชื่อผู้ใช้งาน:"
                      placeholder={"ชื่อผู้ใช้งาน"}
                      leftCol={4}
                      rightCol={8}
                      isRequire={true}
                    />

                    <Field
                      controlId="password"
                      name="password"
                      component={renderColField}
                      label="รหัสผ่าน:"
                      placeholder={"รหัสผ่าน"}
                      leftCol={4}
                      rightCol={8}
                      isRequire={true}
                    />
                    <Field
                      controlId="confirmPassword"
                      name="confirmPassword"
                      component={renderColField}
                      label="ยืนยันรหัสผ่าน:"
                      placeholder={"ยืนยันรหัสผ่าน"}
                      leftCol={4}
                      rightCol={8}
                      isRequire={true}
                    />
                    <Field
                      controlId="name"
                      name="name"
                      component={renderColField}
                      label="ชื่อ-นามสกุล:"
                      placeholder={"ชื่อ-นามสกุล"}
                      leftCol={4}
                      rightCol={8}
                      isRequire={true}
                    />
                    <Field
                      controlId="position"
                      name="position"
                      component={renderColField}
                      label="ตำแหน่ง:"
                      placeholder={"ตำแหน่ง"}
                      leftCol={4}
                      rightCol={8}
                      isRequire={true}
                    />
                    <Field
                      controlId="institution"
                      name="institution"
                      component={renderColField}
                      label="หน่วยงาน:"
                      placeholder={"หน่วยงาน"}
                      leftCol={4}
                      rightCol={8}
                      isRequire={true}
                    />
                    <Field
                      controlId="phone"
                      name="phone"
                      component={renderColField}
                      label="เบอร์โทรศัพท์:"
                      placeholder={"เบอร์โทรศัพท์"}
                      leftCol={4}
                      rightCol={8}
                      isRequire={true}
                    />
                    <Field
                      controlId="email"
                      name="email"
                      component={renderColField}
                      label="อีเมล:"
                      placeholder={"อีเมล"}
                      leftCol={4}
                      rightCol={8}
                      isRequire={true}
                    />

                    {!!user
                      ? user.roles === "admin" && (
                          <Field
                            controlId="role"
                            name="role"
                            component={renderColSelect}
                            label="การกำหนดสิทธิ์:"
                            placeholder={"กรุณาเลือกสิทธิ์"}
                            leftCol={4}
                            rightCol={8}
                            list={mapUserRoles}
                            isRequire={true}
                          />
                        )
                      : null}
                  </Container>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.onHide.bind(this)}>
              <FontAwesomeIcon icon={faTimes} style={{ marginRight: 10 }} />
              ยกเลิก
            </Button>
            <Button variant="primary" type="submit">
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: 10 }} />
              สร้าง
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    formStates: getFormValues("CreateUserModal")(state),
    user: state.login.user,
    userRoles: state.user.userRoles,
  };
}

export default reduxForm({
  form: "CreateUserModal",

  validate,
})(connect(mapStateToProps, mapDispatchToProps)(CreateUserModal));
