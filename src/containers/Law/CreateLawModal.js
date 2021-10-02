import React, { useEffect } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import {
  renderColField,
  renderColSelect,
  renderColTextareaField,
  renderColUploadFile,
  renderColSwitch,
} from "../../components/FormHelper";
import {
  renderDatePicker,
  renderDateTimePicker,
} from "../../components/DateTimeFormHelper.js";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import LOADING from "../../redux/actions/loading_key";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, reduxForm, autofill, getFormValues } from "redux-form";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { mapCreateLawFormToApiRequest } from "../../utils/LawUtils";
import moment from "moment";
import { validateDatePicker } from "../../utils/DateUtils";

const validate = (values) => {
  const errors = {};

  if (!values.meetingType) {
    errors.meetingType = "กรุณาใส่ข้อมูล";
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
  if (!values.description) {
    errors.description = "กรุณาใส่ข้อมูล";
  }

  if (!values.fileLaw) {
    errors.fileLaw = "กรุณาใส่ข้อมูล";
  }
  return errors;
};

const CreateLawModal = ({
  hide_modal,
  formStates,
  handleSubmit,
  dispatch,
  loading,
  createLaw,
  selectLawType,
}) => {
  useEffect(() => {
    dispatch(autofill("CreateLawModal", "publish", false));
    dispatch(autofill("CreateLawModal", "meetingType", false));
  }, []);
  const dateNow = moment();

  const submitCreateLaw = async (values) => {
    let arrFile = [];
    let arrNonPublish = [];
    let file = values.fileLaw;
    let fileNonPublish = values.fileLawNonPublish;

    arrFile.push(file);
    arrNonPublish.push(fileNonPublish);

    let data = {
      ...values,
      documentFiles: arrFile,
      documentFilesNonPublish: arrNonPublish,
      publishDate: values.publish ? dateNow : values.publishDate,
    };
    loading(LOADING.createLaw);
    createLaw(await mapCreateLawFormToApiRequest(data));
  };

  const renderDateNotify = () => {
    if (!!formStates && !formStates.publish) {
      return (
        <Field
          controlId="publishDate"
          name="publishDate"
          component={renderDateTimePicker}
          label="วันที่เวลาเผยแพร่:"
          leftCol={4}
          rightCol={8}
          isRequire={true}
        />
      );
    } else {
      return "";
    }
  };

  const onHide = () => {
    hide_modal();
  };

  const renderFileField = () => {
    return (
      <>
        <Field
          controlId="fileLaw"
          name="fileLaw"
          component={renderColUploadFile}
          label="ไฟล์:"
          placeholder={"ไฟล์"}
          leftCol={4}
          rightCol={8}
          isRequire={true}
        />
        <Field
          controlId="fileLawNonPublish"
          name="fileLawNonPublish"
          component={renderColUploadFile}
          label="ไฟล์ (ไม่เผยแพร่):"
          placeholder={"ไฟล์ (ไม่เผยแพร่)"}
          leftCol={4}
          rightCol={8}
        />
      </>
    );
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
      <Form onSubmit={handleSubmit((values) => submitCreateLaw(values))}>
        <Modal.Header>
          <h3>กฎหมายที่เกี่ยวข้อง</h3>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Field
              controlId="meetingType"
              name="meetingType"
              label="ประเภท:"
              leftCol={4}
              rightCol={8}
              component={renderColSelect}
              placeholder={"กรุณาเลือกประเภท"}
              list={mapSelectLawType[0]}
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

            {renderFileField()}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(values) => onHide(values)}>
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
    selectLawType: state.law.lawType,
    formStates: getFormValues("CreateLawModal")(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "CreateLawModal",
    validate,
  })(CreateLawModal),
);
