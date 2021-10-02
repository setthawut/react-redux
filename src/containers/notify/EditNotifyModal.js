import React, { useEffect } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import {
  renderColField,
  renderColSelect,
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
  mapNotifyApiToEditForm,
  mapEditNotifyFormToApiRequest,
} from "../../utils/NotifyUtils";
import { validateDatePicker } from "../../utils/DateUtils";
import moment from "moment";

const renderFileNotifyNonPublishForm = ({ fields }) => (
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

const renderFileNotifyForm = ({ fields }) => (
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

  if (!values.notifyType) {
    errors.notifyType = "กรุณาใส่ข้อมูล";
  }

  if (!values.subject) {
    errors.subject = "กรุณาใส่ข้อมูล";
  }
  if (!values.title) {
    errors.title = "กรุณาใส่ข้อมูล";
  }
  if (!values.year) {
    errors.year = "กรุณาใส่ข้อมูล";
  }
  if (!values.notify) {
    errors.notify = "กรุณาใส่ข้อมูล";
  }
  if (!values.fileNotify) {
    errors.fileNotify = "กรุณาใส่ข้อมูล";
  }
  return errors;
};

const EditNotifyModal = ({
  selectNotifyType,
  loading,
  editNotify,
  hide_modal,
  handleSubmit,
  editNotifyData,
  formStates,
  selectDocRef,
  getNotifyDocumentReferences,
}) => {
  useEffect(() => {
    getNotifyDocumentReferences(!!formStates && formStates.notifyType);
  }, [!!formStates && formStates.notifyType]);

  const submitEditNotify = async (values) => {
    let arrFile = [];
    let arrNonPublish = [];
    let oldFile = values.fileNotify; //ไฟล์เดียว
    let oldFileNonPublish = values.fileNotifyNonPublish; //ไฟล์เดียว

    if (!!values.uploadFileNotify) {
      arrFile.push(values.uploadFileNotify);
    }
    if (!!values.fileNotifyNonPublish) {
      arrNonPublish.push(values.uploadFileNotifyNonPublish);
    }

    let data = {
      ...values,
      documentFiles: arrFile,
      documentFilesNonPublish: arrNonPublish,
      oldFile: oldFile,
      oldFileNonPublish: oldFileNonPublish,
    };

    loading(LOADING.editNotify);

    editNotify(await mapEditNotifyFormToApiRequest(editNotifyData._id, data));
  };

  const onHide = () => {
    hide_modal();
  };
  const renderFileField = () => {
    if (!!formStates) {
      let datafile = formStates.fileNotify;
      let dataFileNon = formStates.fileNotifyNonPublish;
      return (
        <>
          {datafile.length === 0 ? (
            <Field
              controlId="uploadFileNotify"
              name="uploadFileNotify"
              component={renderColUploadFile}
              label="ไฟล์"
              placeholder={"ไฟล์"}
              leftCol={4}
              rightCol={8}
              // isRequire={true}
            />
          ) : (
            <>
              {<label>ไฟล์ :</label>}
              <ul>
                <FieldArray
                  name="fileNotify"
                  component={renderFileNotifyForm}
                />
              </ul>
            </>
          )}
          {dataFileNon.length === 0 ? (
            <Field
              controlId="uploadFileFileNotifyNonPublish"
              name="uploadFileNotifyNonPublish"
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
                  name="fileNotifyNonPublish"
                  component={renderFileNotifyNonPublishForm}
                />
              </ul>
            </>
          )}
        </>
      );
    }
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
  let mapselectDocRef = selectDocRef.map((item) => ({
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
      <Form onSubmit={handleSubmit((value) => submitEditNotify(value))}>
        <Modal.Header>
          <h3>ประกาศ/คำสั่ง</h3>
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
    formStates: getFormValues("EditNotifyModal")(state),
    editNotifyData: state.notify.editNotify,
    selectNotifyType: state.notify.notifyType,
    initialValues: mapNotifyApiToEditForm(state.notify.editNotify),
    enableReinitialize: true,
    selectDocRef: state.notify.notifyDocumentReferences,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "EditNotifyModal",
    validate,
  })(EditNotifyModal),
);
