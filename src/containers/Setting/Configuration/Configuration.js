import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../redux/actions/index";
import { Field, reduxForm, getFormValues } from "redux-form";
import LOADING from "../../../redux/actions/loading_key";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import {
  mapConfigurationApiToForm,
  mapConfigurationFormToApiRequest,
} from "../../../utils/ConfigurationUtils";
import {
  renderColUploadFileAntd,
  renderImgAntd,
} from "../../../components/FormHelper";
import { API_URL } from "../../../constants/index";

const Configuration = ({
  handleSubmit,
  loading,
  getConfiguration,
  editConfiguration,
  formStates,
  refreshPage,
}) => {
  useEffect(() => {
    loading(LOADING.getConfiguration);
    console.log(!!formStates && formStates);
    getConfiguration();
  }, []);

  useEffect(() => {
    if (refreshPage) {
      loading(LOADING.getConfiguration);
      window.location.reload(false);
      getConfiguration();
    }
  }, [refreshPage]);

  const submitEditConfiguration = async (values) => {
    loading(LOADING.editConfiguration);
    editConfiguration(await mapConfigurationFormToApiRequest(values));
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={8}>
          <div className="box">
            <Row>
              <Col xs={8}>
                <h3>{"ตั้งค่า-องค์ประกอบ/อำนาจหน้าที่ "}</h3>
              </Col>
            </Row>
            <Form
              onSubmit={handleSubmit((values) =>
                submitEditConfiguration(values),
              )}
            >
              <Field
                controlId={`img1`}
                name={`img1`}
                component={renderColUploadFileAntd}
                label={`รูป (องค์ประกอบ):`}
                leftCol={3}
                rightCol={9}
              />
              <Field
                controlId={`documentFiles1`}
                name={`documentFiles1`}
                component={renderImgAntd}
                leftCol={3}
                rightCol={9}
                isBase64={true}
              />
              <Row>
                <Col
                  style={{
                    borderBottom: "1px solid #dddddd",
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                ></Col>
              </Row>
              <Field
                controlId={`img2`}
                name={`img2`}
                component={renderColUploadFileAntd}
                label={`รูป (อำนาจหน้าที่):`}
                leftCol={3}
                rightCol={9}
              />
              <Field
                controlId={`documentFiles2`}
                name={`documentFiles2`}
                component={renderImgAntd}
                leftCol={3}
                rightCol={9}
                isBase64={true}
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
    refreshPage: state.configuration.refreshPage,
    formStates: getFormValues("Configuration")(state),
    configuration: state.configuration.configuration,
    initialValues: mapConfigurationApiToForm(state.configuration.configuration),
    enableReinitialize: true,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "Configuration",
  })(Configuration),
);
