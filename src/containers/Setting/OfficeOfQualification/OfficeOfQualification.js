import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  renderColField,
  renderColUploadImg,
} from "../../../components/FormHelper";
import { Field, reduxForm, getFormValues, FieldArray } from "redux-form";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../redux/actions/index";
import {
  mapOfficeOfQualificationApiToEditForm,
  mapEditOfficeOfQualificationFormToApiRequest,
} from "../../../utils/OfficeOfQualificationUtils";
import LOADING from "../../../redux/actions/loading_key";

import { toBase64 } from "../../../utils/FileUtils";

const renderMembers = ({ fields, formStates, meta: { touched, error } }) => (
  <Row>
    <Col xs={12}>
      {!!formStates &&
        fields.map((persons, index) => (
          <Container
            key={index}
            //   style={{
            //     borderBottom: "1px solid #dddddd",
            //     marginTop: "15px",
            //     marginBottom: "15px",
            //   }}
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
              controlId={`${persons}.fileImg`}
              name={`${persons}.fileImg`}
              component={renderColUploadImg}
              label="รูปภาพ:"
              placeholder={"กรุณาเลือกรูปภาพ หากต้องการเปลี่ยนรูป"}
              leftCol={3}
              rightCol={9}
              // isRequire={true}
            />

            {renderImg(!!formStates.members && formStates.members[index])}
          </Container>
        ))}
      <Row>
        <Col
          xs={12}
          style={{
            textAlign: "center",
            marginBottom: "15px",
            marginTop: "15px",
          }}
        >
          <Button
            type="button"
            onClick={() => fields.push({})}
            style={{ textAlign: "center" }}
          >
            <FontAwesomeIcon
              icon={faPlus}
              style={{ fontSize: 18, marginRight: 15 }}
            />
            เพิ่มทำเนียบผู้ทรงคุณวุฒิ
          </Button>
        </Col>
      </Row>
    </Col>
  </Row>
);

const renderImg = (value) => {
  if (!!value) {
    if (!!value.documentFiles && value.documentFiles != "" && !value.fileImg) {
      return (
        <Row style={{ marginBottom: 15 }}>
          <Col xs={3}></Col>
          <Col xs={6}>
            <Image style={{ height: 200 }} src={value.documentFiles} />
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

const OfficeOfQualification = ({
  handleSubmit,
  formStates,
  refreshPage,
  getOfficeOfQualification,
  loading,
  editOfficeOfQualification,
}) => {
  useEffect(() => {
    loading(LOADING.getOfficeOfQualification);
    getOfficeOfQualification();
  }, []);

  useEffect(() => {
    if (refreshPage) {
      loading(LOADING.getOfficeOfQualification);
      getOfficeOfQualification();
    }
  }, [refreshPage]);

  const submitOfficeOfQualification = async (values) => {
    loading(LOADING.editOfficeOfQualification);
    let arr = [];
    let len = values.members.length;

    for (let i = 0; i < len; i++) {
      let ojb = {
        // year: values.members[i].year,
        // announcement: values.members[i].announcement,
        // persons: [],
        documentFiles: !!values.members[i].fileImg
          ? await toBase64(values.members[i].fileImg)
          : values.members[i].documentFiles,
      };

      // let len2 = values.members[i].persons.length;

      // for (let index = 0; index < len2; index++) {
      //   let ojb2 = {
      //     name: values.members[i].persons[index].name,
      //     position: values.members[i].persons[index].position,
      //     documentFiles: !!values.members[i].persons[index].fileImg
      //       ? await toBase64(values.members[i].persons[index].fileImg)
      //       : values.members[i].persons[index].documentFiles,
      //   };
      //   ojb.persons.push(ojb2);
      // }
      arr.push(ojb);
    }

    let mapDataToRequest = { qualified: arr };

    editOfficeOfQualification(mapDataToRequest);
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={8}>
          <div className="box">
            <Row>
              <Col xs={8}>
                <h3>{"ตั้งค่า-เกี่ยวกับเรา - ทำเนียบผู้ทรงคุณวุฒิ"}</h3>
              </Col>
            </Row>
            <Form
              onSubmit={handleSubmit((values) =>
                submitOfficeOfQualification(values),
              )}
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
    refreshPage: state.officeOfQualification.refreshPage,
    formStates: getFormValues("OfficeOfQualification")(state),
    officeOfQualification: state.officeOfQualification.officeOfQualification,
    initialValues: mapOfficeOfQualificationApiToEditForm(
      state.officeOfQualification.officeOfQualification,
    ),
    enableReinitialize: true,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "OfficeOfQualification",
  })(OfficeOfQualification),
);
