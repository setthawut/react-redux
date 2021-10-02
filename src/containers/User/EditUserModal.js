import React from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { mapDispatchToProps } from "../../redux/actions/index";
import { Field, reduxForm } from "redux-form";
import { renderColField, renderColSelect } from "../../components/FormHelper";
import { connect } from "react-redux";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LOADING from "../../redux/actions/loading_key";
import {
  mapEditUserApiToEditForm,
  mapEditUserFormToApiRequest,
} from "../../utils/UserUtils";
import { userPositions } from "../../constants/typeSelect";

const EditUserModal = ({
  handleSubmit,
  hide_modal,
  loading,
  editUserData,
  editUser,
  user,
}) => {
  const submitEditUser = async (values) => {
    loading(LOADING.editUser);
    await editUser(mapEditUserFormToApiRequest(editUserData._id, values));
  };
  const onHide = () => {
    hide_modal();
  };
  return (
    <Modal show={true} onHide={() => onHide()} size="lg">
      <Form onSubmit={handleSubmit((value) => submitEditUser(value))}>
        <Modal.Header>
          <h3>แก้ไขข้อมูล</h3>
        </Modal.Header>
        <Modal.Body>
          <Container>
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
                />

                <Field
                  controlId="name"
                  name="name"
                  component={renderColField}
                  label="ชื่อ-นามสกุล:"
                  placeholder={"ชื่อ-นามสกุล"}
                  leftCol={4}
                  rightCol={8}
                />
                <Field
                  controlId="position"
                  name="position"
                  component={renderColField}
                  label="ตำแหน่ง:"
                  placeholder={"ตำแหน่ง"}
                  leftCol={4}
                  rightCol={8}
                />
                <Field
                  controlId="institution"
                  name="institution"
                  component={renderColField}
                  label="หน่วยงาน:"
                  placeholder={"หน่วยงาน"}
                  leftCol={4}
                  rightCol={8}
                />
                <Field
                  controlId="phone"
                  name="phone"
                  component={renderColField}
                  label="เบอร์โทรศัพท์:"
                  placeholder={"เบอร์โทรศัพท์"}
                  leftCol={4}
                  rightCol={8}
                 
                />
                <Field
                  controlId="email"
                  name="email"
                  component={renderColField}
                  label="อีเมล:"
                  placeholder={"อีเมล"}
                  leftCol={4}
                  rightCol={8}
                />
                {!!user ? (
                  user.roles === "user" ? (
                    <Field
                      controlId="role"
                      name="role"
                      component={renderColField}
                      label="การกำหนดสิทธิ์:"
                      placeholder={"เจ้าหน้าที่ ทส"}
                      leftCol={4}
                      rightCol={8}
                      disabled={true}
                    />
                  ) : (
                    <Field
                      controlId="role"
                      name="role"
                      component={renderColSelect}
                      label="การกำหนดสิทธิ์:"
                      placeholder={"กรุณาเลือกสิทธิ์"}
                      leftCol={4}
                      rightCol={8}
                      list={userPositions}
                    />
                  )
                ) : null}
              </Container>
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
            แก้ไขข้อมูล
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    editUserData: state.user.editUser,
    initialValues: mapEditUserApiToEditForm(state.modal.modalProps),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "EditUserModal",
  })(EditUserModal),
);
