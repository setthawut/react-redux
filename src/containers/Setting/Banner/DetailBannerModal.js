import React from "react";
import { mapDispatchToProps } from "../../../redux/actions/index";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../../constants";

function DetailBannerModal({ hide_modal, dataDetail }) {
  const onHide = () => {
    hide_modal();
  };

  return (
    <Modal show={true} onHide={() => onHide()} size="lg">
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={12} style={{ borderBottom: "3px solid #dddddd" }}>
              <h3>แบนเนอร์</h3>
            </Col>
          </Row>

          <Row style={{ marginTop: "15px" }}>
            <Col xs={12}>
              <Row>
                <Col xs={3}>
                  <strong>ชื่อกลุ่มแบนเนอร์ : </strong>
                </Col>
                <Col xs={9}>{dataDetail.name}</Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <strong>สถานะ : </strong>
                </Col>
                <Col xs={9}>{dataDetail.isActive === "1" ? "ใช้งาน" : "ร่าง"}</Col>
              </Row>
            </Col>
          </Row>
          {dataDetail.detail.map((item, index) => (
            <>
              <Row
                xs={12}
                style={{ borderBottom: "1px solid #dddddd", marginTop: "15px" }}
              ></Row>

              <Row style={{ marginTop: "15px" }}>
                <Col xs={12}>
                  <Row>
                    <Col xs={3}>
                      <strong>คำอธิบาย : </strong>
                    </Col>
                    <Col xs={9}>{item.description}</Col>
                  </Row>
                  <Row>
                    <Col xs={3}>
                      <strong>รูปภาพ : </strong>
                    </Col>
                    <Col xs={9}>
                      <img
                        src={API_URL+"/documentfile/"+item.documentFiles}
                        style={{
                          height: 200,
                          paddingRight: "10px",
                        }}
                      ></img>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={3}>
                      <strong>ลิงค์ไปยัง (URL) : </strong>
                    </Col>
                    <Col xs={9}>{ !!item.url ? <a href={item.url && item.url.slice(0, 4) == "http" ? item.url : "http://"+item.url} target="_blank">{item.url}</a> : null }</Col>
                  </Row>
                </Col>
              </Row>
            </>
          ))}

          <Row
            xs={12}
            style={{ borderBottom: "3px solid #dddddd", marginTop: "15px" }}
          ></Row>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => onHide()}>
              <FontAwesomeIcon icon={faTimes} style={{ marginRight: 10 }} />{" "}
              ยกเลิก
            </Button>
          </Modal.Footer>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    dataDetail: state.modal.modalProps,
  };
};

export default reduxForm({
  form: "DetailBannerModal",
})(connect(mapStateToProps, mapDispatchToProps)(DetailBannerModal));
