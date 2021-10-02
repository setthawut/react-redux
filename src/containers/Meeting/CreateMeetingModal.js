import React, { useEffect } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import {
  renderColField,
  renderColSelect,
  renderColSwitch,
  renderColTextareaField,
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
  FieldArray,
  reduxForm,
  autofill,
  getFormValues,
} from "redux-form";
import LOADING from "../../redux/actions/loading_key";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { validateDatePicker } from "../../utils/DateUtils";
import { mapCreateMeetingFormToApiRequest } from "../../utils/MeetingUtils";
import moment from "moment";

const validate = (values) => {
  const errors = {};
  if (!values.meetingType) {
    errors.meetingType = "กรุณาใส่ข้อมูล";
  }

  if (!values.dateMeeting) {
    errors.dateMeeting = "กรุณาใส่ข้อมูล";
  } else if (
    (values.dateMeeting &&
      !validateDatePicker(moment(values.dateMeeting).format("DD/MM/YYYY"))) ||
    isNaN(Number(values.dateMeeting))
  ) {
    // errors.dateMeeting = vex.dialog.alert("กรุณากดเลือกจากปฎิทิน");
    errors.dateMeeting = "กรุณากดเลือกจากปฎิทิน";
    values.dateMeeting = "";
  }
  if (!values.publishDate) {
    errors.publishDate = "กรุณาใส่ข้อมูล";
  } else if (
    (values.publishDate &&
      !validateDatePicker(moment(values.publishDate).format("DD/MM/YYYY"))) ||
    isNaN(Number(values.publishDate))
  ) {
    // errors.publishDate = vex.dialog.alert("กรุณากดเลือกจากปฎิทิน");
    errors.publishDate = "กรุณากดเลือกจากปฎิทิน";
    values.publishDate = "";
  }

  if (!values.title) {
    errors.title = "กรุณาใส่ข้อมูล";
  }
  if (!values.numberOfMeeting) {
    errors.numberOfMeeting = "กรุณาใส่ข้อมูล";
  } else if (isNaN(Number(values.numberOfMeeting))) {
    errors.numberOfMeeting = "กรุณากรอกตัวเลข";
  }

  if (!values.year) {
    errors.year = "กรุณาใส่ข้อมูล";
  } else if (isNaN(Number(values.year))) {
    errors.year = "กรุณากรอกตัวเลข";
  }

  if (!values.notify) {
    errors.notify = "กรุณาใส่ข้อมูล";
  }
  if (!values.fileMeeting) {
    errors.fileMeeting = "กรุณาใส่ข้อมูล";
  }
  return errors;
};
const CreateMeetingModal = ({
  loading,
  createMeeting,
  hide_modal,
  formStates,
  handleSubmit,
  dispatch,
  selectMeetingType,
}) => {
  useEffect(() => {
    dispatch(autofill("CreateMeetingModal", "publish", false));
  }, []);

  const dateNow = moment();

  const submitCreateMeeting = async (values) => {
    let arrFile = [];
    let arrNonPublish = [];
    let file = values.fileMeeting;
    let fileNonPublish = values.fileMeetingNonPublish;

    if (!!values.subFile) {
      values.subFile.map((item) => {
        arrFile.push(item.fileMeeting);
      });
    }
    if (!!values.subFileNonPublish) {
      values.subFileNonPublish.map((item) => {
        arrNonPublish.push(item.fileMeetingNonPublish);
      });
    }

    arrFile.push(file);
    arrNonPublish.push(fileNonPublish);

    let data = {
      ...values,
      documentFiles: arrFile,
      documentFilesNonPublish: arrNonPublish,
      publishDate: values.publish ? dateNow : values.publishDate,
    };

    loading(LOADING.createMeeting);
    createMeeting(await mapCreateMeetingFormToApiRequest(data));
  };

  const onHide = () => {
    hide_modal();
  };

  const renderPublishDate = () => {
    if (!!formStates && !formStates.publish) {
      return (
        <Field
          controlId="publishDate"
          name="publishDate"
          component={renderDateTimePicker}
          label="วันเวลาที่เผยแพร่:"
          leftCol={4}
          rightCol={8}
          isRequire={checkIsRequire()}
        />
      );
    } else {
      return "";
    }
  };

  const FieldArraysForm = () => {
    if (!!formStates) {
      if (
        formStates.meetingType === "WaraKanPrachum" ||
        formStates.meetingType === "NangsueChaengMati"
      ) {
        return (
          <>
            <Field
              controlId="fileMeeting"
              name="fileMeeting"
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
              component={renderfileMeetings}
            />
            <Field
              controlId="fileMeetingNonPublish"
              name="fileMeetingNonPublish"
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
              component={renderfileMeetingsNonPublish}
            />
          </>
        );
      } else {
        return (
          <>
            <Field
              controlId="fileMeeting"
              name="fileMeeting"
              component={renderColUploadFile}
              label="ไฟล์:"
              placeholder={"ไฟล์"}
              leftCol={4}
              rightCol={8}
              isRequire={true}
            />
            <Field
              controlId="fileMeetingNonPublish"
              name="fileMeetingNonPublish"
              component={renderColUploadFile}
              label="ไฟล์ (ไม่เผยแพร่):"
              placeholder={"ไฟล์ (ไม่เผยแพร่)"}
              leftCol={4}
              rightCol={8}
            />
          </>
        );
      }
    }
  };
  const renderfileMeetings = ({ fields }) => (
    <Row>
      <Col xs={12} style={{ marginBottom: "10px" }}>
        {fields.map((fileMeeting, index) => (
          <>
            <Button
              variant="danger"
              onClick={() => fields.remove(index)}
              style={{ float: "right" }}
            >
              ลบ
            </Button>

            <Field
              controlId={`${fileMeeting}fileMeeting`}
              name={`${fileMeeting}fileMeeting`}
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

  const renderfileMeetingsNonPublish = ({ fields }) => (
    <Row>
      <Col xs={12} style={{ marginBottom: "10px" }}>
        {fields.map((fileMeeting, index) => (
          <>
            <Button
              variant="danger"
              onClick={() => fields.remove(index)}
              style={{ float: "right" }}
            >
              ลบ
            </Button>

            <Field
              controlId={`${fileMeeting}fileMeetingNonPublish`}
              name={`${fileMeeting}fileMeetingNonPublish`}
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

  let mapselectMeetingType = selectMeetingType
    .filter((item) => item.key === "PrachumKoKoWoLo")
    .map((item) =>
      item.detail.map((element) => ({
        value: element.key,
        label: element.value,
      })),
    );

  const checkIsRequire = () => {
    if (!!formStates) {
      if (
        formStates.meetingType === "KaekhaiLaeRaprongRaingan" ||
        formStates.meetingType === "KhomunChaphokit" ||
        formStates.meetingType === "PrachumKoKoWoLoUenUen"
      ) {
        return false;
      } else return true;
    } else null;
  };

  return (
    <Modal show={true} onHide={() => onHide()} size="lg">
      <Form onSubmit={handleSubmit((values) => submitCreateMeeting(values))}>
        <Modal.Header>
          <h3>ประชุม กก.วล.</h3>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={10}>
                <Container>
                  <Field
                    controlId="meetingType"
                    name="meetingType"
                    label="ประเภท:"
                    leftCol={4}
                    rightCol={8}
                    component={renderColSelect}
                    placeholder={"กรุณาเลือกประเภท"}
                    list={mapselectMeetingType[0]}
                    isRequire={true}
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
                  {renderPublishDate()}

                  <Field
                    controlId="dateMeeting"
                    name="dateMeeting"
                    component={renderDatePicker}
                    label={
                      !!formStates
                        ? formStates.meetingType ===
                            "MatiKoKoWoLoSanoeKhoRoMo" ||
                          formStates.meetingType === "NangsueKhoRoMo"
                          ? "วันที่ประชุม ครม."
                          : "วันที่ประชุม"
                        : ""
                    }
                    leftCol={4}
                    rightCol={8}
                    isRequire={checkIsRequire()}
                  />

                  <Field
                    controlId="title"
                    name="title"
                    component={renderColField}
                    label="หัวเรื่อง:"
                    placeholder={"หัวเรื่อง"}
                    leftCol={4}
                    rightCol={8}
                    isRequire={true}
                  />

                  <Field
                    controlId="description"
                    name="description"
                    component={renderColTextareaField}
                    label="คำสำคัญ:"
                    placeholder={"คำสำคัญ"}
                    leftCol={4}
                    rightCol={8}
                    isRequire={checkIsRequire()}
                  />
                  <Field
                    controlId="numberOfMeeting"
                    name="numberOfMeeting"
                    component={renderColField}
                    label={
                      !!formStates
                        ? formStates.meetingType ===
                            "MatiKoKoWoLoSanoeKhoRoMo" ||
                          formStates.meetingType === "NangsueKhoRoMo"
                          ? "กก.วล. ครั้งที่"
                          : "ครั้งที่"
                        : ""
                    }
                    placeholder={
                      !!formStates
                        ? formStates.meetingType ===
                            "MatiKoKoWoLoSanoeKhoRoMo" ||
                          formStates.meetingType === "NangsueKhoRoMo"
                          ? "กก.วล. ครั้งที่"
                          : "ครั้งที่"
                        : ""
                    }
                    leftCol={4}
                    rightCol={8}
                    isRequire={checkIsRequire()}
                  />
                  <Field
                    controlId="year"
                    name="year"
                    component={renderColField}
                    label="ปี:"
                    placeholder={"ปี"}
                    leftCol={4}
                    rightCol={8}
                    isRequire={checkIsRequire()}
                  />
                  {FieldArraysForm()}
                </Container>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onHide()}>
            <FontAwesomeIcon icon={faTimes} style={{ marginRight: 10 }} />
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
    selectMeetingType: state.meeting.meetingType,
    formStates: getFormValues("CreateMeetingModal")(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "CreateMeetingModal",
    validate,
  })(CreateMeetingModal),
);
