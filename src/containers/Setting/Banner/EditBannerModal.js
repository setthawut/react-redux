import React, { useEffect } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../redux/actions/index";
import {
  Field,
  FieldArray,
  reduxForm,
  autofill,
  getFormValues,
} from "redux-form";
import LOADING from "../../../redux/actions/loading_key";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Image,
} from "react-bootstrap";
import {
  renderColField,
  renderColUploadImg,
} from "../../../components/FormHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  mapMeetingApiToEditForm,
  mapEditMeetingFormToApiRequest,
} from "../../../utils/BannerUtils";
import { API_URL } from "../../../constants";

const renderImage = (value) => {
  if (!!value) {
    if (!!value.documentFiles && value.documentFiles != "" && !value.fileImg) {
      return (
        <Row style={{ marginBottom: 15 }}>
          <Col xs={3}></Col>
          <Col xs={6}>
            <Image
              style={{ height: 200 }}
              src={API_URL + "/documentfile/" + value.documentFiles}
            />
          </Col>
        </Row>
      );
    } else if (!!value.fileImg) {
      return (
        <Row style={{ marginBottom: 15 }}>
          <Col xs={3}></Col>
          <Col xs={6}>
            <Image
              style={{ height: 200 }}
              src={URL.createObjectURL(value.fileImg)}
            />
          </Col>
        </Row>
      );
    } else {
      return null;
    }
  }
};

const renderMembers = ({ fields, formStates, meta: { touched, error } }) => (
  <Row>
    <Col xs={12}>
      <Row>
        <Col xs={12} style={{ textAlign: "center", marginTop: 20 }}>
          <h4>รูปภาพ Banner</h4>
        </Col>
      </Row>
      {!!formStates &&
        fields.map((member, index) => (
          <Container
            key={index}
            style={{
              borderBottom: "1px solid #dddddd",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <Row>
              <Col xs={12}>
                <Button
                  variant="danger"
                  onClick={() => fields.remove(index)}
                  style={{ float: "right", marginBottom: "5px" }}
                >
                  <FontAwesomeIcon icon={faTrash} size={"lg"} />
                </Button>
              </Col>
            </Row>
            <Field
              controlId={`${member}.description`}
              name={`${member}.description`}
              component={renderColField}
              label="คำอธิบาย:"
              placeholder={"คำอธิบาย"}
              leftCol={3}
              rightCol={9}
              isRequire={true}
            />

            <Field
              controlId={`${member}.fileImg`}
              name={`${member}.fileImg`}
              component={renderColUploadImg}
              label="รูปภาพ:"
              placeholder={"กรุณาเลือกรูปภาพ หากต้องการเปลี่ยนรูป"}
              leftCol={3}
              rightCol={9}
            />

            {renderImage(formStates.members[index])}

            <Field
              controlId={`${member}.url`}
              name={`${member}.url`}
              component={renderColField}
              label="ลิงค์ไปยัง (URL):"
              placeholder={"ลิงค์ไปยัง (URL)"}
              leftCol={3}
              rightCol={9}
            />
          </Container>
        ))}
      <Button
        type="button"
        onClick={() => fields.push({})}
        style={{ marginLeft: "550px" }}
      >
        <FontAwesomeIcon
          icon={faPlus}
          style={{ fontSize: 18, marginRight: 15 }}
        />
        เพิ่มรายละเอียด
      </Button>
    </Col>
  </Row>
);

const validate = (values) => {
  const errors = {};
  if (!values.groupName) {
    errors.groupName = "กรุณาใส่ข้อมูล";
  }
  if (!!values.members) {
    var membersArrayErrors = [];

    values.members.map((item, memberIndex) => {
      var memberErrors = {};
      if (!item.description) {
        memberErrors.description = "กรุณาใส่ข้อมูล";
        membersArrayErrors[memberIndex] = memberErrors;
      }
    });

    if (membersArrayErrors.length) {
      errors.members = membersArrayErrors;
    }
  }
  return errors;
};

const EditBannerModal = ({
  handleSubmit,
  hide_modal,
  loading,
  editBannerData,
  editBanner,
  formStates,
}) => {
  const submitEditeBanner = (values) => {
    loading(LOADING.editBanner);
    editBanner(mapEditMeetingFormToApiRequest(editBannerData["_id"], values));
  };

  const onHide = () => {
    hide_modal();
  };

  return (
    <Modal show={true} onHide={() => onHide()} size="lg">
      <Form onSubmit={handleSubmit((values) => submitEditeBanner(values))}>
        <Modal.Header>
          <h3>กลุ่มแบนเนอร์</h3>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Field
              controlId="groupName"
              name="groupName"
              component={renderColField}
              label="ชื่อกลุ่มแบนเนอร์:"
              placeholder={"ชื่อกลุ่มแบนเนอร์"}
              isRequire={true}
              leftCol={3}
              rightCol={9}
            />
            <FieldArray
              name="members"
              component={renderMembers}
              formStates={formStates}
            />
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

function mapStateToProps(state) {
  return {
    formStates: getFormValues("EditBannerModal")(state),
    editBannerData: state.banner.editBanner,
    initialValues: mapMeetingApiToEditForm(state.banner.editBanner),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "EditBannerModal",
    validate,
  })(EditBannerModal),
);
