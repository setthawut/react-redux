import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import {
  renderColField,
  renderColSelect,
  renderColSwitch,
  renderColTextareaField,
  renderColSelectMulti,
  renderColUploadFile,
} from "../../components/FormHelper";
import {
  renderDatePicker,
  renderDateTimePicker,
} from "../../components/DateTimeFormHelper.js";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, reduxForm, getFormValues, FieldArray } from "redux-form";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import LOADING from "../../redux/actions/loading_key";
import {
  mapAppealApiToEditForm,
  mapEditAppealFormToApiRequest,
} from "../../utils/AppealUtils";
import { validateDatePicker } from "../../utils/DateUtils";
import moment from "moment";

const renderFileAppealsNonPublishForm = ({ fields }) => (
  <>
    <Row>
      <Col xs={{ span: 8, offset: 4 }}>
        {fields.map((value, i) => (
          <>
            <li xs={12} key={i} style={{ marginTop: "18px" }}>
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

const renderFileAppealsForm = ({ fields }) => (
  <>
    <Row>
      <Col xs={{ span: 8, offset: 4 }} style={{ marginLeft: "297px" }}>
        {fields.map((value, i) => (
          <>
            <li xs={12} key={i} style={{ marginTop: "18px" }}>
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
const validate = (values) => {
  const errors = {};
  if (!values.appealType) {
    errors.appealType = "กรุณาใส่ข้อมูล";
  }
  if (!values.publishDate) {
    errors.publishDate = "กรุณาใส่ข้อมูล";
  } else if (
    (values.publishDate &&
      !validateDatePicker(moment(values.publishDate).format("DD/MM/YYYY"))) ||
    isNaN(Number(values.publishDate))
  ) {
    errors.publishDate = "กรุณากดเลือกจากปฎิทิน";
    values.publishDate = "";
  }
  if (!values.dateMeeting) {
    errors.dateMeeting = "กรุณาใส่ข้อมูล";
  } else if (isNaN(Number(values.dateMeeting))) {
    errors.dateMeeting = "กรุณากรอกตัวเลข";
  }

  if (!values.title) {
    errors.title = "กรุณาใส่ข้อมูล";
  }
  if (!values.description) {
    errors.description = "กรุณาใส่ข้อมูล";
  }

  if (!values.fileAppeal) {
    errors.fileAppeal = "กรุณาใส่ข้อมูล";
  }
  return errors;
};

const EditAppealModal = ({
  selectAppealType,
  loading,
  editAppeal,
  hide_modal,
  handleSubmit,
  editAppealData,
  formStates,
}) => {
  const submitEditAppeal = async (values) => {
    let arrFile = [];
    let arrNonPublish = [];
    let oldFile = values.fileAppeal; //ไฟล์เดียว
    let oldFileNonPublish = values.fileAppealNonPublish; //ไฟล์เดียว

    if (!!values.subFile) {
      values.subFile.map((item) => {
        arrFile.push(item.fileAppeal);
      });
    }
    if (!!values.subFileNonPublish) {
      values.subFileNonPublish.map((item) => {
        arrNonPublish.push(item.fileAppealNonPublish);
      });
    }
    let data = {
      ...values,
      documentFiles: arrFile,
      documentFilesNonPublish: arrNonPublish,
      oldFile: oldFile,
      oldFileNonPublish: oldFileNonPublish,
    };
    loading(LOADING.editAppeal);

    editAppeal(await mapEditAppealFormToApiRequest(editAppealData._id, data));
  };

  const onHide = () => {
    hide_modal();
  };

  const FieldArraysForm = () => {
    if (!!formStates) {
      let datafile = formStates.fileAppeal;
      let dataFileNon = formStates.fileAppealNonPublish;

      return (
        <>
          {datafile.length === 0 ? "" : <label>ไฟล์:</label>}
          {datafile.length > 0 ? (
            <>
              <ul>
                <FieldArray
                  name="fileAppeal"
                  controlId="fileAppeal"
                  component={renderFileAppealsForm}
                  label="ไฟล์:"
                />
              </ul>
              <FieldArray
                controlId="subFile"
                name="subFile"
                component={renderFileAppeals}
                label="ไฟล์:"
              />
            </>
          ) : (
            <>
              <Field
                controlId="fileAppeal"
                name="fileAppeal"
                component={renderColUploadFile}
                label="ไฟล์:"
                placeholder={"ไฟล์"}
                leftCol={4}
                rightCol={8}
                isRequire={true}
              />
              <FieldArray
                controlId="subFile"
                name="subFile"
                component={renderFileAppeals}
              />
            </>
          )}

          {dataFileNon.length === 0 ? "" : <label>ไฟล์ (ไม่เผยแพร่):</label>}
          {dataFileNon.length > 0 ? (
            <>
              <ul>
                <FieldArray
                  name="fileAppealNonPublish"
                  component={renderFileAppealsNonPublishForm}
                  label="ไฟล์:"
                />
              </ul>
              <FieldArray
                controlId="subFileNonPublish"
                name="subFileNonPublish"
                component={renderFileAppealsNonPublish}
                label="ไฟล์:"
              />
            </>
          ) : (
            <>
              <Field
                controlId="fileAppealNonPublish"
                name="fileAppealNonPublish"
                component={renderColUploadFile}
                label="ไฟล์ (ไม่เผยแพร่):"
                placeholder={"ไฟล์ (ไม่เผยแพร่)"}
                leftCol={4}
                rightCol={8}
                // isRequire={true}
              />
              <FieldArray
                controlId="subFileNonPublish"
                name="subFileNonPublish"
                component={renderFileAppealsNonPublish}
              />
            </>
          )}
        </>
      );
    }
  };

  const renderFileAppeals = ({ fields }) => (
    <Row>
      <Col xs={12} style={{ marginBottom: "10px" }}>
        {fields.map((fileAppeal, index) => (
          <>
            <Button
              variant="danger"
              onClick={() => fields.remove(index)}
              style={{ float: "right" }}
            >
              ลบ
            </Button>

            <Field
              controlId={`${fileAppeal}fileAppeal`}
              name={`${fileAppeal}fileAppeal`}
              component={renderColUploadFile}
              label={``}
              placeholder={"ไฟล์"}
              leftCol={4}
              rightCol={8}
              // isRequire={true}
            />
          </>
        ))}
        <Button
          type="button"
          onClick={() => fields.push({})}
          style={{ marginLeft: "550px" }}
        >
          เพิ่มไฟล์
        </Button>
      </Col>
    </Row>
  );

  const renderFileAppealsNonPublish = ({ fields }) => (
    <Row>
      <Col xs={12} style={{ marginBottom: "10px" }}>
        {fields.map((fileAppeal, index) => (
          <>
            <Button
              variant="danger"
              onClick={() => fields.remove(index)}
              style={{ float: "right" }}
            >
              ลบ
            </Button>

            <Field
              controlId={`${fileAppeal}fileAppealNonPublish`}
              name={`${fileAppeal}fileAppealNonPublish`}
              component={renderColUploadFile}
              label={``}
              placeholder={"ไฟล์ (ไม่เผยแพร่)"}
              leftCol={4}
              rightCol={8}
              // isRequire={true}
            />
          </>
        ))}
        <Button
          type="button"
          onClick={() => fields.push({})}
          style={{ marginLeft: "550px" }}
        >
          เพิ่มไฟล์
        </Button>
      </Col>
    </Row>
  );

  let mapSelectAppealType = selectAppealType
    .filter((item) => item.key === "RueangRongrianKoKoWoLo")
    .map((item) =>
      item.detail.map((element) => ({
        value: element.key,
        label: element.value,
      })),
    );
  return (
    <Modal show={true} onHide={() => onHide()} size="lg">
      <Form onSubmit={handleSubmit((value) => submitEditAppeal(value))}>
        <Modal.Header>
          <h3>เรื่องร้องเรียน กก.วล.</h3>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={10}>
                <Container>
                  <Field
                    controlId="appealType"
                    name="appealType"
                    label="ประเภท:"
                    leftCol={4}
                    rightCol={8}
                    component={renderColSelect}
                    placeholder={"กรุณาเลือกประเภท"}
                    list={mapSelectAppealType[0]}
                    isRequire={true}
                  />
                  <Field
                    controlId="publishDate"
                    name="publishDate"
                    component={renderDateTimePicker}
                    label="วันเวลาที่เผยแพร่:"
                    leftCol={4}
                    rightCol={8}
                    isRequire={true}
                  />

                  <Field
                    controlId="dateMeeting"
                    name="dateMeeting"
                    component={renderColField}
                    label="ปี พ.ศ. :"
                    leftCol={4}
                    rightCol={8}
                    isRequire={true}
                  />
                  <Field
                    controlId="title"
                    name="title"
                    component={renderColField}
                    label="หัวเรื่อง:"
                    placeholder={"หัวเรื่อง"}
                    isRequire={true}
                    leftCol={4}
                    rightCol={8}
                  />
                  <Field
                    controlId="description"
                    name="description"
                    component={renderColTextareaField}
                    label="คำสำคัญ:"
                    placeholder={"คำสำคัญ"}
                    leftCol={4}
                    rightCol={8}
                    isRequire={true}
                  />

                  {FieldArraysForm()}
                </Container>
              </Col>
            </Row>
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
    formStates: getFormValues("EditAppealModal")(state),
    editAppealData: state.appeal.editAppeal,
    selectAppealType: state.appeal.appealType,
    initialValues: mapAppealApiToEditForm(state.appeal.editAppeal),
    enableReinitialize: true,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "EditAppealModal",
    validate,
  })(EditAppealModal),
);
