import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import {
  renderColField,
  renderColSelect,
  renderColCheckbox,
  renderColSwitch,
  renderColTextareaField,
  renderColUploadFile,
} from "../../components/FormHelper";
import {
  renderDatePicker,
  renderDateTimePicker,
} from "../../components/DateTimeFormHelper.js";
import {
  faTrash,
  faPlus,
  faEdit,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, reduxForm, getFormValues, FieldArray } from "redux-form";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import LOADING from "../../redux/actions/loading_key";
import {
  mapLawApiToEditForm,
  mapEditLawFormToApiRequest,
} from "../../utils/LawUtils";

import { validateDatePicker } from "../../utils/DateUtils";
import moment from "moment";

const renderFileLawNonPublishForm = ({ fields }) => (
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

const renderFileLawForm = ({ fields }) => (
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

  if (!values.lawType) {
    errors.lawType = "กรุณาใส่ข้อมูล";
  }
  if (!values.dateMeeting) {
    errors.dateMeeting = "กรุณาใส่ข้อมูล";
  } else if (isNaN(Number(values.dateMeeting))) {
    errors.dateMeeting = "กรุณากรอกตัวเลข";
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

  if (!values.title) {
    errors.title = "กรุณาใส่ข้อมูล";
  }

  if (!values.fileMeeting) {
    errors.fileMeeting = "กรุณาใส่ข้อมูล";
  }
  return errors;
};

function EditLawModal({
  loading,
  editLaw,
  hide_modal,
  handleSubmit,
  editLawData,
  formStates,
  selectLawType,
}) {
  const submitEditLaw = async (values) => {
    let arrFile = [];
    let arrNonPublish = [];
    let oldFile = values.fileLaw;
    let oldFileNonPublish = values.fileLawNonPublish;

    if (!!values.uploadFileLaw) {
      arrFile.push(values.uploadFileLaw);
    }
    if (!!values.fileLawNonPublish) {
      arrNonPublish.push(values.uploadFileLawNonPublish);
    }

    let data = {
      ...values,
      documentFiles: arrFile,
      documentFilesNonPublish: arrNonPublish,
      oldFile: oldFile,
      oldFileNonPublish: oldFileNonPublish,
    };

    loading(LOADING.editLaw);
    editLaw(await mapEditLawFormToApiRequest(editLawData._id, data));
  };

  const onHide = () => {
    hide_modal();
  };

  const renderFileField = () => {
    if (!!formStates) {
      let datafile = formStates.fileLaw;
      let dataFileNon = formStates.fileLawNonPublish;
      return (
        <>
          {datafile.length === 0 ? (
            <Field
              controlId="uploadFileLaw"
              name="uploadFileLaw"
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
                <FieldArray name="fileLaw" component={renderFileLawForm} />
              </ul>
            </>
          )}
          {dataFileNon.length === 0 ? (
            <Field
              controlId="uploadFileFileLawNonPublish"
              name="uploadFileLawNonPublish"
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
                  name="fileLawNonPublish"
                  component={renderFileLawNonPublishForm}
                />
              </ul>
            </>
          )}
        </>
      );
    }
  };

  let mapSelectLawType = selectLawType
    .filter((item) => item.key === "KotmaiThiKiaokhong")
    .map((item) =>
      item.detail.map((element) => ({
        value: element.key,
        label: element.value,
      })),
    );

  return (
    <Modal show={true} onHide={() => onHide()} size="lg">
      <Form onSubmit={handleSubmit((value) => submitEditLaw(value))}>
        <Modal.Header>
          <h3>กฎหมายที่เกี่ยวข้อง</h3>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={10}>
                <Container>
                  <Field
                    controlId="lawType"
                    name="lawType"
                    label="ประเภท:"
                    leftCol={4}
                    rightCol={8}
                    component={renderColSelect}
                    placeholder={"กรุณาเลือกประเภท"}
                    list={mapSelectLawType[0]}
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
                    isRequire={true}
                    rightCol={8}
                  />

                  {renderFileField()}
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
    formStates: getFormValues("EditLawModal")(state),
    editLawData: state.law.editLaw,
    initialValues: mapLawApiToEditForm(state.law.editLaw),
    selectLawType: state.law.lawType,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "EditLawModal",
    validate,
  })(EditLawModal),
);
