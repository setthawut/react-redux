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
import { Field, reduxForm, autofill, getFormValues } from "redux-form";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { mapCreateNotifyFormToApiRequest } from "../../utils/NotifyUtils";
import LOADING from "../../redux/actions/loading_key";
import { validateDatePicker } from "../../utils/DateUtils";
import moment from "moment";

const validate = (values) => {
  const errors = {};
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
  } else if (
    (values.dateMeeting &&
      !validateDatePicker(moment(values.dateMeeting).format("DD/MM/YYYY"))) ||
    isNaN(Number(values.dateMeeting))
  ) {
    errors.dateMeeting = "กรุณากดเลือกจากปฎิทิน";
    values.dateMeeting = "";
  }

  if (
    (values.governmentDate &&
      !validateDatePicker(
        moment(values.governmentDate).format("DD/MM/YYYY"),
      )) ||
    isNaN(Number(values.governmentDate))
  ) {
    errors.governmentDate = "กรุณากดเลือกจากปฎิทิน";
    values.governmentDate = "";
  }

  if (!values.meetingType) {
    errors.meetingType = "กรุณาใส่ข้อมูล";
  }
  if (!values.subject) {
    errors.subject = "กรุณาใส่ข้อมูล";
  }
  if (!values.title) {
    errors.title = "กรุณาใส่ข้อมูล";
  }

  if (!values.notify) {
    errors.notify = "กรุณาใส่ข้อมูล";
  }
  if (!values.fileNotify) {
    errors.fileNotify = "กรุณาใส่ข้อมูล";
  }
  return errors;
};
const CreateNotifyModal = ({
  loading,
  createNotify,
  hide_modal,
  formStates,
  handleSubmit,
  dispatch,
  selectNotifyType,
  selectDocRef,
  getNotifyDocumentReferences,
}) => {
  useEffect(() => {
    dispatch(autofill("CreateNotifyModal", "publish", false));

    getNotifyDocumentReferences(!!formStates && formStates.notifyType);
  }, [!!formStates && formStates.notifyType]);

  const dateNow = moment();
  const submitCreateNotify = async (values) => {
    let arrFile = [];
    let arrNonPublish = [];
    let file = values.fileNotify;
    let fileNonPublish = values.fileNotifyNonPublish;

    arrFile.push(file);
    arrNonPublish.push(fileNonPublish);

    let data = {
      ...values,
      documentFiles: arrFile,
      documentFilesNonPublish: arrNonPublish,
      publishDate: values.publish ? dateNow : values.publishDate,
    };
    loading(LOADING.createNotify);
    createNotify(await mapCreateNotifyFormToApiRequest(data));
  };

  const onHide = () => {
    hide_modal();
  };

  const renderDateNotify = () => {
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
  const renderFileField = () => {
    return (
      <>
        <Field
          controlId="fileNotify"
          name="fileNotify"
          component={renderColUploadFile}
          label="ไฟล์:"
          placeholder={"ไฟล์"}
          leftCol={4}
          rightCol={8}
          isRequire={true}
        />
        <Field
          controlId="fileNotifyNonPublish"
          name="fileNotifyNonPublish"
          component={renderColUploadFile}
          label="ไฟล์ (ไม่เผยแพร่):"
          placeholder={"ไฟล์ (ไม่เผยแพร่)"}
          leftCol={4}
          rightCol={8}
          // isRequire={true}
        />
      </>
    );
  };

  const renderOrderCountAndYear = () => {
    if (!!formStates && formStates.notifyType === "KhamsangKoKoWoLo") {
      return (
        <>
          <Field
            controlId="numberOfMeeting"
            name="numberOfMeeting"
            component={renderColField}
            label="เลขที่คำสั่ง:"
            placeholder={"เลขที่คำสั่ง"}
            leftCol={4}
            rightCol={8}
            isRequire={true}
          />
          <Field
            controlId="year"
            name="year"
            component={renderColField}
            label="ปี:"
            placeholder={"ปี"}
            leftCol={4}
            rightCol={8}
            isRequire={true}
          />
        </>
      );
    } else "";
  };

  const mapselectDocRef = selectDocRef.map((item) => ({
    value: item._id,
    label: item.header,
  }));
  let mapSelectNotifyType = selectNotifyType
    .filter((item) => item.key === "PrakatKhamsang")
    .map((item) =>
      item.detail.map((element) => ({
        value: element.key,
        label: element.value,
      })),
    );

  return (
    <Modal show={true} onHide={() => onHide()} size="lg">
      <Form onSubmit={handleSubmit((values) => submitCreateNotify(values))}>
        <Modal.Header>
          <h3>ประกาศ / คำสั่ง</h3>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={10}>
                <Container>
                  <Field
                    controlId="notifyType"
                    name="notifyType"
                    label="ประเภท:"
                    leftCol={4}
                    rightCol={8}
                    component={renderColSelect}
                    placeholder={"กรุณาเลือกประเภท"}
                    list={mapSelectNotifyType[0]}
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
                  {renderDateNotify()}

                  <Field
                    controlId="dateMeeting"
                    name="dateMeeting"
                    component={renderDatePicker}
                    label={
                      !!formStates
                        ? formStates.notifyType !== "KhamsangKoKoWoLo"
                          ? "วันที่ลงนาม"
                          : "วันที่ประกาศ"
                        : ""
                    }
                    leftCol={4}
                    rightCol={8}
                    isRequire={true}
                  />

                  <Field
                    controlId="governmentDate"
                    name="governmentDate"
                    component={renderDatePicker}
                    label={"วันที่ลงราชกิจจานุเบกษา"}
                    leftCol={4}
                    rightCol={8}
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

                  {renderOrderCountAndYear()}

                  {renderFileField()}
                  <Field
                    controlId="documentReferences"
                    name="documentReferences"
                    component={renderColSelectMulti}
                    label="เอกสารอ้างอิง:"
                    placeholder={"เอกสารอ้างอิง"}
                    leftCol={4}
                    rightCol={8}
                    list={mapselectDocRef}
                  />
                </Container>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onHide()}>
            <FontAwesomeIcon icon={faTimes} style={{ marginRight: 10 }} /> ปิด
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
    selectDocRef: state.notify.notifyDocumentReferences,
    selectNotifyType: state.notify.notifyType,
    formStates: getFormValues("CreateNotifyModal")(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "CreateNotifyModal",
    validate,
  })(CreateNotifyModal),
);
