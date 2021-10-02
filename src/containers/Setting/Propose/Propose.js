import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../redux/actions/index";
import { Field, reduxForm, getFormValues } from "redux-form";
import LOADING from "../../../redux/actions/loading_key";
import { renderColField } from "../../../components/FormHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import {
  mapProposeApiToForm,
  mapEditProposeFormToApiRequest,
} from "../../../utils/ProposeUtils";
import { Upload } from "../../../../antd/lib/index";
import { PlusOutlined } from "@ant-design/icons";
import ShowImgWrapper from "../../../components/ShowImg_Wraper";

const Propose = ({
  handleSubmit,
  loading,
  getPropose,
  editPropose,
  formStates,
  refreshPage,
}) => {
  const [newImgList1, setNewImgList1] = useState([]);
  const [newImgList2, setNewImgList2] = useState([]);
  const [oldImgList1, setOldImgList1] = useState([]);
  const [oldImgList2, setOldImgList2] = useState([]);

  useEffect(() => {
    loading(LOADING.getPropose);
    !!formStates && setOldImgList1(formStates.currentImg1);
    !!formStates && setOldImgList2(formStates.currentImg2);

    getPropose();
  }, [
    (!!formStates && formStates.currentImg1) ||
      (!!formStates && formStates.currentImg2),
  ]);

  useEffect(() => {
    if (refreshPage) {
      loading(LOADING.getPropose);
      // !!formStates && setOldImgList1(formStates.currentImg1);
      // !!formStates && setOldImgList2(formStates.currentImg2);
      window.location.reload(false);
      getPropose();
    }
  }, [refreshPage]);

  const submitEditPropose = async (values) => {
    // loading(LOADING.editPropose);
    let data = {
      ...values,
      imgNew1: newImgList1,
      imgNew2: newImgList2,
      oldImg1: oldImgList1,
      oldImg2: oldImgList2,
    };

    editPropose(await mapEditProposeFormToApiRequest(data));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const onDelete1 = (index) => {
    let newTodos = [...oldImgList1];
    newTodos.splice(index, 1);
    setOldImgList1(newTodos);
  };
  const onDelete2 = (index) => {
    let newTodos = [...oldImgList2];
    newTodos.splice(index, 1);
    setOldImgList2(newTodos);
  };
  const handleChange1 = ({ fileList }) => {
    let arr = [];
    fileList.map((item) => {
      arr.push(item.originFileObj);
      setNewImgList1(arr);
    });
  };

  const handleChange2 = ({ fileList }) => {
    let arr = [];
    fileList.map((item) => {
      arr.push(item.originFileObj);
      setNewImgList2(arr);
    });
  };

  const renderImg1 = () => {
    if (!!oldImgList1) {
      return (
        <>
          <ShowImgWrapper del={onDelete1}>
            {oldImgList1.map((item) => item)}
          </ShowImgWrapper>
        </>
      );
    } else return null;
  };
  const renderImg2 = () => {
    if (!!oldImgList2) {
      return (
        <>
          <ShowImgWrapper del={onDelete2}>
            {oldImgList2.map((item) => item)}
          </ShowImgWrapper>
        </>
      );
    } else return null;
  };
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={8}>
          <div className="box">
            <Row>
              <Col xs={8}>
                <h3>{"ตั้งค่า-ขั้นตอน/เรื่อง ที่ต้องเสนอ กก.วล."}</h3>
              </Col>
            </Row>
            <Form
              onSubmit={handleSubmit((values) => submitEditPropose(values))}
            >
              <Field
                controlId="header1"
                name="header1"
                component={renderColField}
                label="หัวเรื่อง:"
                placeholder={"หัวเรื่อง"}
                isRequire={true}
                leftCol={3}
                rightCol={9}
              />

              <Row>
                <Col xs={3}>รูปภาพ: </Col>
                <Col xs={7}>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    multiple={true}
                    onChange={handleChange1}
                    customRequest={dummyRequest}
                    accept={"image/png, image/jpeg,image/jpg"}
                  >
                    {uploadButton}
                  </Upload>
                  {renderImg1()}
                  {/* <ShowImgWrapper del={onDelete}>
                    {!!formStates && formStates.currentImg1.map((item) => item)}
                  </ShowImgWrapper> */}
                </Col>
              </Row>
              <Field
                controlId="header2"
                name="header2"
                component={renderColField}
                label="หัวเรื่อง:"
                placeholder={"หัวเรื่อง"}
                isRequire={true}
                leftCol={3}
                rightCol={9}
              />

              <Row>
                <Col xs={3}>รูปภาพ: </Col>
                <Col xs={7}>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    multiple={true}
                    onChange={handleChange2}
                    customRequest={dummyRequest}
                    accept={"image/png, image/jpeg,image/jpg"}
                  >
                    {uploadButton}
                  </Upload>
                  {renderImg2()}
                  {/* <ShowImgWrapper del={onDelete1}>
                    {!!formStates && formStates.currentImg2.map((item) => item)}
                  </ShowImgWrapper> */}
                </Col>
              </Row>

              <Row>
                <Col xs={12} style={{ textAlign: "center" }}>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginTop: "10px" }}
                  >
                    <FontAwesomeIcon
                      icon={faSave}
                      style={{ marginRight: 10 }}
                    />
                    บันทึก
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    refreshPage: state.propose.refreshPage,
    formStates: getFormValues("Propose")(state),
    propose: state.propose.propose,

    initialValues: mapProposeApiToForm(state.propose.propose),
    enableReinitialize: true,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "Propose",
  })(Propose),
);
