import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../redux/actions/index";
import { Field, reduxForm, getFormValues } from "redux-form";
import LOADING from "../../../redux/actions/loading_key";
import {
  renderColField,
  renderColTextareaField,
} from "../../../components/FormHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { mapAddressApiToForm } from "../../../utils/AddressUtils";

const validate = (values) => {
  const errors = {};
  if (!values.placeName) {
    errors.placeName = "กรุณาใส่ข้อมูล";
  }
  if (!values.address) {
    errors.address = "กรุณาใส่ข้อมูล";
  }
  if (!values.phone) {
    errors.phone = "กรุณาใส่ข้อมูล";
  }
  if (!values.fax) {
    errors.fax = "กรุณาใส่ข้อมูล";
  }
  if (!values.email) {
    errors.email = "กรุณาใส่ข้อมูล";
  }
  if (!values.googleMapURL) {
    errors.googleMapURL = "กรุณาใส่ข้อมูล";
  }
  if (!values.facebookURL) {
    errors.facebookURL = "กรุณาใส่ข้อมูล";
  }
  return errors;
};

const Address = ({
  handleSubmit,
  loading,
  editAddress,
  getAddress,
  refreshPage,
}) => {
  useEffect(() => {
    loading(LOADING.getAddress);
    getAddress();
  }, []);

  useEffect(() => {
    loading(LOADING.getAddress);
    getAddress();
  }, [refreshPage]);

  const submitEditBanner = (values) => {
    loading(LOADING.editAddress);
    editAddress({
      placeName: values.placeName,
      address: values.address,
      phone: values.phone,
      fax: values.fax,
      email: values.email,
      googleMapURL: values.googleMap,
      facebookURL: values.facebook,
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={8}>
          <div className="box">
            <Row>
              <Col xs={8}>
                <h3>{"ตั้งค่า-ที่อยู่"}</h3>
              </Col>
            </Row>
            <Form onSubmit={handleSubmit((values) => submitEditBanner(values))}>
              <Field
                controlId="placeName"
                name="placeName"
                component={renderColField}
                label="ชื่อสถานที่:"
                placeholder={"ชื่อสถานที่"}
                isRequire={true}
                leftCol={4}
                rightCol={8}
              />
              <Field
                controlId="address"
                name="address"
                component={renderColTextareaField}
                label="ที่อยู่:"
                leftCol={4}
                rightCol={8}
                isRequire={true}
              />
              <Field
                controlId="phone"
                name="phone"
                component={renderColField}
                label="เบอร์โทรศัทพ์:"
                placeholder={"เบอร์โทรศัทพ์"}
                isRequire={true}
                leftCol={4}
                rightCol={8}
              />
              <Field
                controlId="fax"
                name="fax"
                component={renderColField}
                label="แฟกซ์:"
                placeholder={"แฟกซ์"}
                isRequire={true}
                leftCol={4}
                rightCol={8}
              />
              <Field
                controlId="email"
                name="email"
                component={renderColField}
                label="อีเมล:"
                placeholder={"อีเมล"}
                isRequire={true}
                leftCol={4}
                rightCol={8}
              />
              <Field
                controlId="googleMap"
                name="googleMap"
                component={renderColField}
                label="Google Maps URL:"
                placeholder={"Google Maps URL"}
                isRequire={true}
                leftCol={4}
                rightCol={8}
              />
              <Field
                controlId="facebook"
                name="facebook"
                component={renderColField}
                label="Facebook URL:"
                placeholder={"Facebook URL"}
                isRequire={true}
                leftCol={4}
                rightCol={8}
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

function mapStateToProps(state) {
  return {
    refreshPage: state.address.refreshPage,
    address: state.address.address,
    initialValues: mapAddressApiToForm(state.address.address),
    enableReinitialize: true,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "Address",
    validate,
  })(Address),
);
