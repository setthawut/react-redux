import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import {
  renderColField,
  renderColTextareaField,
} from "../../components/FormHelper";
import { renderDateTimePicker } from "../../components/DateTimeFormHelper.js";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, reduxForm, getFormValues } from "redux-form";
import LOADING from "../../redux/actions/loading_key";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Image,
} from "react-bootstrap";
import { mapEditNewsFormToApiRequest } from "../../utils/NewsUtils";
import { Upload } from "../../../antd/lib/index";
import { PlusOutlined } from "@ant-design/icons";
import { mapNewsApiToEditForm } from "../../utils/NewsUtils";
import ShowImgWrapper from "../../components/ShowImg_Wraper";
import { validateDatePicker } from "../../utils/DateUtils";
import moment from "moment";
import { API_URL } from "../../constants";
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

const EditNewsModal = ({
  loading,
  editNews,
  hide_modal,
  formStates,
  handleSubmit,
  editNewsData,
}) => {
  const [newFileList, setNewFileList] = useState([]);
  const [oldFileList, setOldFileList] = useState([]);

  useEffect(() => {
    !!editNewsData ? setOldFileList(editNewsData.documentFiles) : "";
  }, [editNewsData]);

  const submitEditNews = async (values) => {
    let data = {
      ...values,
      img: [...newFileList],
      oldImg: oldFileList,
    };

    loading(LOADING.editNews);
    editNews(await mapEditNewsFormToApiRequest(editNewsData._id, data));
  };

  const onHide = () => {
    hide_modal();
  };
  const onDelete = (index) => {
    let newTodos = [...oldFileList];
    console.log(newTodos);
    newTodos.splice(index, 1);
    setOldFileList(newTodos);
  };
  const handleChange = async ({ fileList }) => {
    let arr = [];
    fileList.map(async (item) => {
      arr.push(item.originFileObj);
      setNewFileList(arr);
    });
  };

  const renderImg = () => {
    if (!!formStates && formStates.img) {
      return (
        <>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            multiple={true}
            onChange={handleChange}
            customRequest={dummyRequest}
            accept={"image/png, image/jpeg,image/jpg"}
          >
            {oldFileList.length >= 8 ? null : uploadButton}
          </Upload>

          <ShowImgWrapper del={onDelete}>
            {oldFileList.map((item) => item)}
          </ShowImgWrapper>
        </>
      );
    } else {
      return null;
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Modal show={true} onHide={() => onHide()} size="lg">
      <Form onSubmit={handleSubmit((values) => submitEditNews(values))}>
        <Modal.Header>
          <h3>ข่าวประชาสัมพันธ์</h3>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={10}>
                <Container>
                  <Field
                    controlId="publishDate"
                    name="publishDate"
                    component={renderDateTimePicker}
                    label="วันที่เวลาเผยแพร่:"
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
                    label="คำอธิบาย:"
                    placeholder={"คำอธิบาย"}
                    leftCol={4}
                    rightCol={8}
                    isRequire={true}
                  />
                  <Row>
                    <Col xs={4}>รูปภาพ :</Col>
                    <Col xs={7}>{renderImg()}</Col>
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
    formStates: getFormValues("EditNewsModal")(state),
    editNewsData: state.news.editNews,
    initialValues: mapNewsApiToEditForm(state.news.editNews),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "EditNewsModal",
    validate,
  })(EditNewsModal),
);
