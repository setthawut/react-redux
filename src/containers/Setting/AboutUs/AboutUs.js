import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  renderColHTMLEditor,
  renderColField,
  renderColUploadFileAntd,
  renderImgAntd,
} from "../../../components/FormHelper";
import { Field, reduxForm, getFormValues, FieldArray } from "redux-form";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../redux/actions/index";
import {
  mapAboutUsApiToEditForm,
  mapEditAboutUsFormToApiRequest,
} from "../../../utils/AboutUsUtils";
import LOADING from "../../../redux/actions/loading_key";

const renderMembers = ({ fields, formStates, meta: { touched, error } }) => (
  <Row>
    <Col xs={12}>
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
              controlId={`${member}.header`}
              name={`${member}.header`}
              component={renderColField}
              label="หัวเรื่อง:"
              placeholder={"หัวเรื่อง"}
              leftCol={3}
              rightCol={9}
              // isRequire={true}
            />

            <Field
              controlId={`${member}.description`}
              name={`${member}.description`}
              component={renderColHTMLEditor}
              label={`รายละเอียด`}
              leftCol={3}
              rightCol={9}
            />
            <Field
              controlId={`${member}.img`}
              name={`${member}.img`}
              component={renderColUploadFileAntd}
              label={`รูป:`}
              leftCol={3}
              rightCol={9}
            />
            <Field
              controlId={`${member}.documentFiles`}
              name={`${member}.documentFiles`}
              component={renderImgAntd}
              leftCol={3}
              isBase64={true}
              rightCol={9}
            />
          </Container>
        ))}
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

const AboutUs = ({
  handleSubmit,
  formStates,
  refreshPage,
  getAboutUs,
  loading,
  editAboutUs,
  aboutUs,
}) => {
  useEffect(() => {
    loading(LOADING.getAboutUs);

    getAboutUs();
  }, []);

  useEffect(() => {
    if (refreshPage) {
      loading(LOADING.getAboutUs);
      window.location.reload(false);
      getAboutUs();
    }
  }, [refreshPage]);

  const submitAboutUs = async (values) => {
    loading(LOADING.editAboutUs);

    editAboutUs(await mapEditAboutUsFormToApiRequest(values));
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={8}>
          <div className="box">
            <Row>
              <Col xs={8}>
                <h3>{"ตั้งค่า-เกี่ยวกับเรา - ประวัติความเป็นมา"}</h3>
              </Col>
            </Row>
            <Form onSubmit={handleSubmit((values) => submitAboutUs(values))}>
              <FieldArray
                name="members"
                component={renderMembers}
                formStates={formStates}
                // aboutUs={aboutUs}
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
    refreshPage: state.aboutUs.refreshPage,
    formStates: getFormValues("AboutUs")(state),
    aboutUs: state.aboutUs.aboutUs,
    initialValues: mapAboutUsApiToEditForm(state.aboutUs.aboutUs),
    enableReinitialize: true,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "AboutUs",
  })(AboutUs),
);
