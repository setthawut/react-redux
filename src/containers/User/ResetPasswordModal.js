import React from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { mapDispatchToProps } from "../../redux/actions/index";
import { Field, reduxForm } from "redux-form";
import { renderColField } from "../../components/FormHelper";
import { connect } from "react-redux";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LOADING from "../../redux/actions/loading_key";
import {
  mapResetPasswordUserApiToEditForm,
  mapResetPasswordUserFormToApiRequest,
} from "../../utils/UserUtils";

const validate = (values) => {
  const errors = {};
  if (!values.confirmPassword) {
    errors.confirmPassword = "กรุณาใส่ข้อมูล";
  }

  if (values.password && values.confirmPassword) {
    if (values.password != values.confirmPassword) {
      errors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
    }
  }
  if (values.confirmPassword && values.confirmPassword.length < 8) {
    errors.confirmPassword = "รหัสผ่าน อย่างน้อย 8 หลัก";
  }
  if (values.password && values.password.length < 8) {
    errors.password = "รหัสผ่าน อย่างน้อย 8 หลัก";
  }
  return errors;
};

const ResetPasswordModal = ({
  handleSubmit,
  hide_modal,
  loading,
  dataDetail,
  resetPasswordUser,
}) => {
  const ResetPassword = async (values) => {
    loading(LOADING.resetPasswordUser);
    await resetPasswordUser(
      mapResetPasswordUserFormToApiRequest(dataDetail._id, values),
    );
  };
  const onHide = () => {
    hide_modal();
  };
  return (
    <Modal show={true} onHide={() => onHide()} size="lg">
      <Form onSubmit={handleSubmit((value) => ResetPassword(value))}>
        <Modal.Header>
          <h3>แก้ไขรหัสผ่าน</h3>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Col xs={10}>
              <Field
                controlId="username"
                name="username"
                label="ชื่อผู้ใช้งาน:"
                leftCol={4}
                rightCol={8}
                component={renderColField}
                disabled={true}
              />
              <Field
                controlId="password"
                name="password"
                label="รหัสผ่าน:"
                leftCol={4}
                rightCol={8}
                component={renderColField}
              />
              <Field
                controlId="confirmPassword"
                name="confirmPassword"
                label="ยืนยันรหัสผ่าน:"
                leftCol={4}
                rightCol={8}
                component={renderColField}
              />
            </Col>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onHide()}>
            <FontAwesomeIcon icon={faTimes} style={{ marginRight: 10 }} />{" "}
            ยกเลิก
          </Button>
          <Button variant="primary" type="submit">
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: 10 }} />{" "}
            แก้ไขรหัสผ่าน
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    dataDetail: state.modal.modalProps,
    initialValues: mapResetPasswordUserApiToEditForm(state.modal.modalProps),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "ResetPasswordModal",
    validate,
  })(ResetPasswordModal),
);
