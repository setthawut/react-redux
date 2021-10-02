import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import {
  renderColField,
  renderColSwitch,
  renderColTextareaField,
} from "../../components/FormHelper";
import { renderDateTimePicker } from "../../components/DateTimeFormHelper.js";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, reduxForm, autofill, getFormValues } from "redux-form";
import LOADING from "../../redux/actions/loading_key";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { mapCreateNewsFormToApiRequest } from "../../utils/NewsUtils";
import { Upload } from "../../../antd/lib/index";
import { PlusOutlined } from "@ant-design/icons";
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
  if (!values.description) {
    errors.description = "กรุณาใส่ข้อมูล";
  }
  if (!values.dateNotify) {
    errors.dateNotify = "กรุณาใส่ข้อมูล";
  }

  return errors;
};
const CreateNewsModal = ({
  loading,
  createNews,
  hide_modal,
  formStates,
  handleSubmit,
  dispatch,
}) => {
  useEffect(() => {
    dispatch(autofill("CreateNewsModal", "publish", false));
  }, []);
  const [fileList, setFileList] = useState([]);
  const [pathBase64, setPathBase64] = useState([]);

  const dateNow = moment();

  const submitCreateNews = async (values) => {
    let data = {
      ...values,
      img: pathBase64,
      publishDate: values.publish ? dateNow : values.publishDate,
    };

    loading(LOADING.createNews);
    createNews(await mapCreateNewsFormToApiRequest(data));
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

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    let arr = [];
    fileList.map((item) => {
      arr.push(item.originFileObj);
      setPathBase64(arr);
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Modal show={true} onHide={() => onHide()} size="lg">
      <Form onSubmit={handleSubmit((values) => submitCreateNews(values))}>
        <Modal.Header>
          <h3>ข่าวประชาสัมพันธ์</h3>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={10}>
                <Container>
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
                    label="คำอธิบาย:"
                    placeholder={"คำอธิบาย"}
                    leftCol={4}
                    rightCol={8}
                    isRequire={true}
                  />
                  <Row>
                    <Col xs={4}>รูปภาพ :</Col>
                    <Col xs={7}>
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        multiple={true}
                        onChange={handleChange}
                        customRequest={dummyRequest}
                        accept={"image/png, image/jpeg,image/jpg"}
                      >
                        {fileList.length >= 8 ? null : uploadButton}
                      </Upload>
                    </Col>
                  </Row>
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
    formStates: getFormValues("CreateNewsModal")(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "CreateNewsModal",
    validate,
  })(CreateNewsModal),
);
