import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import {
  renderColField,
  renderColSelect,
  renderColTextareaField,
  renderColUploadFile,
} from "../../components/FormHelper";
import {
  renderDatePicker,
  renderDateTimePicker,
} from "../../components/DateTimeFormHelper.js";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, FieldArray, reduxForm, getFormValues } from "redux-form";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import LOADING from "../../redux/actions/loading_key";
import {
  mapMeetingApiToEditForm,
  mapEditMeetingFormToApiRequest,
} from "../../utils/MeetingUtils";
import { validateDatePicker } from "../../utils/DateUtils";
import moment from "moment";

const renderFileMeetingsNonPublishForm = ({ fields }) => (
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

const renderFileMeetingsForm = ({ fields }) => (
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
  if (!values.description) {
    errors.description = "กรุณาใส่ข้อมูล";
  }
  if (!values.notify) {
    errors.notify = "กรุณาใส่ข้อมูล";
  }
  if (!values.numberOfMeeting) {
    errors.numberOfMeeting = "กรุณาใส่ข้อมูล";
  } else if (isNaN(Number(values.numberOfMeeting))) {
    errors.numberOfMeeting = "กรุณากรอกตัวเลข";
  }
  if (!values.year) {
    errors.year = "กรุณาใส่ข้อมูล";
  }
  return errors;
};

function EditMeetingModal({
  loading,
  editMeeting,
  hide_modal,
  handleSubmit,
  editMeetingData,
  formStates,
  selectMeetingType,
}) {
  const submitEditMeeting = async (values) => {
    let arrFile = [];
    let arrNonPublish = [];
    let oldFile = values.fileMeeting;
    let oldFileNonPublish = values.fileMeetingNonPublish;

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
    if (!!values.uploadFileMeeting) {
      arrFile.push(values.uploadFileMeeting); // ไฟล์เดียวที่ไม่ใช่ type วาระการประชุม
    }
    if (!!values.uploadFileMeetingNonPublish) {
      arrNonPublish.push(values.uploadFileMeetingNonPublish); // ไฟล์เดียวที่ไม่ใช่ type วาระการประชุม
    }

    let data = {
      ...values,
      documentFiles: arrFile,
      documentFilesNonPublish: arrNonPublish,
      oldFile: oldFile,
      oldFileNonPublish: oldFileNonPublish,
    };

    loading(LOADING.editMeeting);
    editMeeting(
      await mapEditMeetingFormToApiRequest(editMeetingData._id, data),
    );
  };

  const FieldArraysForm = () => {
    if (
      !!formStates &&
      formStates.meetingType !== "WaraKanPrachum" &&
      formStates.meetingType !== "NangsueChaengMati"
    ) {
      let datafile = formStates.fileMeeting;
      let dataFileNon = formStates.fileMeetingNonPublish;

      return (
        <>
          {datafile.length === 0 ? (
            <Field
              controlId="uploadFileMeeting"
              name="uploadFileMeeting"
              component={renderColUploadFile}
              label="ไฟล์"
              placeholder={"ไฟล์"}
              leftCol={4}
              rightCol={8}
              isRequire={true}
            />
          ) : (
            <>
              {<label>ไฟล์ :</label>}
              <ul>
                <FieldArray
                  name="fileMeeting"
                  component={renderFileMeetingsForm}
                />
              </ul>
            </>
          )}
          {dataFileNon.length === 0 ? (
            <Field
              controlId="uploadFileMeetingNonPublish"
              name="uploadFileMeetingNonPublish"
              component={renderColUploadFile}
              label="ไฟล์ (ไม่เผยแพร่) :"
              placeholder={"ไฟล์ (ไม่เผยแพร่)"}
              leftCol={4}
              rightCol={8}
              // isRequire={true}
            />
          ) : (
            <>
              {<label>ไฟล์ (ไม่เผยแพร่):</label>}
              <ul>
                <FieldArray
                  name="fileMeetingNonPublish"
                  component={renderFileMeetingsNonPublishForm}
                />
              </ul>
            </>
          )}
        </>
      );
    } else if (!!formStates) {
      if (
        formStates.meetingType === "WaraKanPrachum" ||
        formStates.meetingType === "NangsueChaengMati"
      ) {
        let datafile = formStates.fileMeeting;
        let dataFileNon = formStates.fileMeetingNonPublish;

        return (
          <>
            {datafile.length === 0 ? "" : <label>ไฟล์:</label>}
            {datafile.length > 0 ? (
              <>
                <ul>
                  <FieldArray
                    name="fileMeeting"
                    controlId="fileMeeting"
                    component={renderFileMeetingsForm}
                    label="ไฟล์:"
                  />
                </ul>
                <FieldArray
                  controlId="subFile"
                  name="subFile"
                  component={renderfileMeetings}
                  label="ไฟล์:"
                />
              </>
            ) : (
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
              </>
            )}

            {dataFileNon.length === 0 ? "" : <label>ไฟล์ (ไม่เผยแพร่):</label>}

            {dataFileNon.length > 0 ? (
              <>
                <ul>
                  <FieldArray
                    name="fileMeetingNonPublish"
                    component={renderFileMeetingsNonPublishForm}
                    label="ไฟล์:"
                  />
                </ul>
                <FieldArray
                  controlId="subFileNonPublish"
                  name="subFileNonPublish"
                  component={renderfileMeetingsNonPublish}
                  label="ไฟล์:"
                />
              </>
            ) : (
              <>
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
            )}
            {/* <ul>
              <FieldArray
                name="fileMeetingNonPublish"
                component={renderFileMeetingsNonPublishForm}
                label="ไฟล์:"
              />
            </ul>
            <FieldArray
              controlId="subFileNonPublish"
              name="subFileNonPublish"
              component={renderfileMeetingsNonPublish}
              label="ไฟล์:"
            /> */}
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

  const onHide = () => {
    hide_modal();
  };
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
      <Form onSubmit={handleSubmit((value) => submitEditMeeting(value))}>
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
                    controlId="publishDate"
                    name="publishDate"
                    component={renderDateTimePicker}
                    label="วันที่เวลาเผยแพร่:"
                    leftCol={4}
                    rightCol={8}
                  />
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
                    isRequire={true}
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
                    isRequire={checkIsRequire()}
                  />
                  <Field
                    controlId="numberOfMeeting"
                    name="numberOfMeeting"
                    component={renderColField}
                    label="ครั้งที่:"
                    placeholder={"ครั้งที่"}
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
}

function mapStateToProps(state) {
  return {
    selectMeetingType: state.meeting.meetingType,
    formStates: getFormValues("EditMeetingModal")(state),
    editMeetingData: state.meeting.editMeeting,
    initialValues: mapMeetingApiToEditForm(state.meeting.editMeeting),
    enableReinitialize: true,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "EditMeetingModal",
    validate,
  })(EditMeetingModal),
);
