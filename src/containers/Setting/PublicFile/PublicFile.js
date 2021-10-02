import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../redux/actions/index";
import { Field, reduxForm, getFormValues, FieldArray } from "redux-form";
import LOADING from "../../../redux/actions/loading_key";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { mapPublicFileApiToForm } from "../../../utils/PublicFileUtils";
import {
  renderColUploadImg,
  renderColUploadFilePDFonly,
  renderColField,
} from "../../../components/FormHelper";
import { API_URL } from "../../../constants/index";
import { object } from "prop-types";
const validate = (values) => {
  const errors = {};

  return errors;
};
const showFile = (value) => {
  if (!!value) {
    if (
      !!value.documentFiles &&
      value.documentFiles != "" &&
      !value.uploadFile
    ) {
      return (
        <Row style={{ marginBottom: 15 }}>
          <Col xs={3}></Col>
          <Col xs={6}>
            <li xs={12} style={{ marginTop: "18px" }}>
              <span> {value.documentName}</span>
            </li>
          </Col>
        </Row>
      );
    } else if (!!value.uploadFile) {
      return (
        <Row style={{ marginBottom: 15 }}>
          <Col xs={3}></Col>
          <Col xs={6}>
            <li xs={12} style={{ marginTop: "18px" }}>
              <span>{value.uploadFile.name}</span>
            </li>
          </Col>
        </Row>
      );
    } else {
      return null;
    }
  }
};
const renderImage = (value) => {
  if (!!value) {
    if (!!value.image && value.image != "" && !value.imgCurrent) {
      return (
        <Row style={{ marginBottom: 15 }}>
          <Col xs={3}></Col>
          <Col xs={6}>
            <Image
              style={{ height: 200 }}
              src={API_URL + "/documentfile/" + value.image}
            />
          </Col>
        </Row>
      );
    } else if (!!value.imgCurrent) {
      return (
        <Row style={{ marginBottom: 15 }}>
          <Col xs={3}></Col>
          <Col xs={6}>
            <Image
              style={{ height: 200 }}
              src={URL.createObjectURL(value.imgCurrent)}
            />
          </Col>
        </Row>
      );
    } else {
      return null;
    }
  }
};
const renderFileForm = ({ fields }) => (
  <>
    <Row>
      <Col xs={{ span: 8, offset: 6 }} style={{ marginLeft: "297px" }}>
        {fields.map((value, i) => (
          <>
            <li xs={12} style={{ marginTop: "18px" }}>
              <Button
                variant="danger"
                onClick={() => fields.remove(i)}
                style={{ float: "right" }}
              >
                ลบ
              </Button>

              <span style={{ fontSize: "16px" }}>{fields.get(i).filename}</span>
            </li>
          </>
        ))}
      </Col>
    </Row>
  </>
);
const renderMembers = ({ fields, formStates, meta: { touched, error } }) => (
  <Row>
    <Col xs={12}>
      {!!formStates &&
        fields.map((member, index) => {
          return (
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
              <h4>ลำดับที่{index + 1}</h4>

              <Field
                controlId={`${member}.header`}
                name={`${member}.header`}
                component={renderColField}
                label="ชื่อ:"
                placeholder={"ชื่อ"}
                leftCol={3}
                rightCol={9}
                isRequire={true}
              />
              <Field
                controlId={`${member}.uploadFile`}
                name={`${member}.uploadFile`}
                component={renderColUploadFilePDFonly}
                label="ไฟล์"
                placeholder={"กรุณาเลือกไฟล์ หากต้องการเปลี่ยนไฟล์"}
                isRequire={true}
              />

              {showFile(!!formStates.members && formStates.members[index])}
              <Field
                controlId={`${member}.imgCurrent`}
                name={`${member}.imgCurrent`}
                component={renderColUploadImg}
                label="รูปภาพ:"
                placeholder={"กรุณาเลือกรูปภาพ หากต้องการเปลี่ยนรูป"}
                leftCol={3}
                rightCol={9}
                isRequire={true}
              />

              {renderImage(!!formStates.members && formStates.members[index])}
            </Container>
          );
        })}

      <Row>
        <Col xs={12} style={{ textAlign: "center" }}>
          <Button
            type="button"
            onClick={() => fields.push({})}
            style={{ textAlign: "center" }}
          >
            <FontAwesomeIcon
              icon={faPlus}
              style={{ fontSize: 18, marginRight: 15 }}
            />
            เพิ่มรายละเอียด
          </Button>
        </Col>
      </Row>
    </Col>
  </Row>
);

const PublicFile = ({
  handleSubmit,
  loading,
  getPublicFile,
  editPublicFile,
  formStates,
  refreshPage,
}) => {
  useEffect(() => {
    loading(LOADING.getPublicFile);
    getPublicFile();
  }, []);

  useEffect(() => {
    if (refreshPage) {
      loading(LOADING.getPublicFile);
      getPublicFile();
    }
  }, [refreshPage]);

  const submitEditPublicFile = async (values) => {
    const formData = new FormData();

    values.members.map((item) => {
      formData.append("header", item.header);

      formData.append("image", !!item.imgCurrent ? item.imgCurrent : "");

      formData.append(
        "imageIds",
        !!item.imgCurrent ? "" : !!item.image ? item.image : "",
      );

      formData.append(
        "documentFiles",
        !!item.uploadFile ? item.uploadFile : "",
      );
      formData.append(
        "documentName",
        !!item.uploadFile ? item.uploadFile.name : item.documentName,
      );
      formData.append(
        "documentIds",
        !!item.uploadFile ? "" : !!item.documentFiles ? item.documentFiles : "",
      );
    });

    loading(LOADING.editPublicFile);
    editPublicFile(formData);
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={8}>
          <div className="box">
            <Row>
              <Col xs={8}>
                <h3>{"ตั้งค่า-เอกสารเผยแพร่ "}</h3>
              </Col>
            </Row>
            <Form
              onSubmit={handleSubmit((values) => submitEditPublicFile(values))}
            >
              <FieldArray
                name="members"
                component={renderMembers}
                formStates={formStates}
              />
              <Row>
                <Col xs={12} style={{ textAlign: "center" }}>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginTop: "10px" }}
                  >
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

function mapStateToProps(state) {
  return {
    refreshPage: state.publicFile.refreshPage,
    formStates: getFormValues("PublicFile")(state),
    publicFile: state.publicFile.publicFile,
    initialValues: mapPublicFileApiToForm(state.publicFile.publicFile),
    enableReinitialize: true,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    validate,
    form: "PublicFile",
  })(PublicFile),
);
