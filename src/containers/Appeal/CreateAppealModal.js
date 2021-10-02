import React, { useEffect } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import {
  renderColField,
  renderColSelect,
  renderColTextareaField,
  renderColSwitch,
  renderColSelectMulti,
  renderColUploadFile,
} from "../../components/FormHelper";
import {
  renderDatePicker,
  renderDateTimePicker,
} from "../../components/DateTimeFormHelper.js";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Field,
  reduxForm,
  autofill,
  getFormValues,
  FieldArray,
} from "redux-form";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { mapCreateAppealFormToApiRequest } from "../../utils/AppealUtils";
import LOADING from "../../redux/actions/loading_key";
import { validateDatePicker } from "../../utils/DateUtils";
import moment from "moment";

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
  if (!values.numberOfMeeting) {
    errors.numberOfMeeting = "กรุณาใส่ข้อมูล";
  }
  if (!values.year) {
    errors.year = "กรุณาใส่ข้อมูล";
  }
  if (!values.fileAppeal) {
    errors.fileAppeal = "กรุณาใส่ข้อมูล";
  }

  return errors;
};
const CreateAppealModal = ({
  loading,
  createAppeal,
  hide_modal,
  formStates,
  handleSubmit,
  dispatch,
  selectAppealType,
}) => {
  useEffect(() => {
    dispatch(autofill("CreateAppealModal", "publish", false));
  }, []);
  const dateNow = moment();
  const submitCreateAppeal = async (values) => {
    let arrFile = [];
    let arrNonPublish = [];
    let file = values.fileAppeal; //ไฟล์เดียว
    let fileNonPublish = values.fileAppealNonPublish; //ไฟล์เดียว

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
    arrFile.push(file); //ไฟล์เดียว
    arrNonPublish.push(fileNonPublish); //ไฟล์เดียว

    let data = {
      ...values,
      documentFiles: arrFile,
      documentFilesNonPublish: arrNonPublish,
      publishDate: values.publish ? dateNow : values.publishDate,
    };

    loading(LOADING.createAppeal);
    createAppeal(await mapCreateAppealFormToApiRequest(data));
  };

  const onHide = () => {
    hide_modal();
  };

  const publishDate = () => {
    if (!!formStates && !formStates.publish) {
      return (
        <Field
          controlId="publishDate"
          name="publishDate"
          component={renderDateTimePicker}
          label="วันเวลาที่เผยแพร่:"
          leftCol={4}
          rightCol={8}
          isRequire={true}
        />
      );
    } else {
      return "";
    }
  };

  const FieldArraysForm = () => {
    return (
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
    );
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
              // label={`ไฟล์:${index + 1}`}
              placeholder={"ไฟล์"}
              leftCol={4}
              rightCol={8}
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
              // label={`ไฟล์:${index + 1}`}
              placeholder={"ไฟล์ (ไม่เผยแพร่)"}
              leftCol={4}
              rightCol={8}
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
      <Form onSubmit={handleSubmit((values) => submitCreateAppeal(values))}>
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
                  />
                  <Field
                    controlId="publish"
                    name="publish"
                    label="เผยแพร่ทันที:"
                    leftCol={4}
                    rightCol={8}
                    component={renderColSwitch}
                    list={[{ label: "" }]}
                  />
                  {publishDate()}
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
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: 10 }} /> สร้าง
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    selectAppealType: state.appeal.appealType,
    formStates: getFormValues("CreateAppealModal")(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "CreateAppealModal",
    validate,
  })(CreateAppealModal),
);
