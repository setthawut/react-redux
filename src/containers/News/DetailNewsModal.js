import React from "react";
import { mapDispatchToProps } from "../../redux/actions/index";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../constants";
import {
  getDateTimeFromStringDate,
  getDateFromStringDate,
} from "../../utils/DateUtils";
import moment from "moment";
import { numberWithCommas } from "../../utils/NumberUtils";

const DetailNewsModal = ({ hide_modal, dataDetail }) => {
  const onHide = () => {
    hide_modal();
  };
  
  return (
    <Modal show={true} onHide={() => onHide()} size="lg">
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={12} style={{ borderBottom: "3px solid #dddddd" }}>
              <h3>ข่าวประชาสัมพันธ์</h3>
            </Col>
          </Row>

          <Row style={{ marginTop: "15px" }}>
            <Col xs={12}>
              <Row>
                <Col xs={3}>
                  <strong>หัวเรื่อง : </strong>
                </Col>
                <Col xs={9}>{dataDetail.header}</Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>คำอธิบาย : </strong>
                </Col>
                <Col xs={9}>{dataDetail.description}</Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>รูปภาพ : </strong>
                </Col>
                <Col xs={9}>
                  {dataDetail.documentFiles.length >= 1
                    ? dataDetail.documentFiles.map((item, i) => {
                        return (
                          <img
                            src={`${API_URL}/documentfile/${item._id}`}
                            alt={item.filename}
                            style={{
                              width: 180,
                              paddingRight: "10px",
                            }}
                          ></img>
                        );
                      })
                    : "ไม่พบไฟล์"}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row
            xs={12}
            style={{ borderBottom: "1px solid #dddddd", marginTop: "15px" }}
          ></Row>
          <Row style={{ marginTop: "15px" }}>
            <Col xs={12}>
              <Row>
                <Col xs={3}>
                  <strong>วันที่เวลาเผยแพร่ : </strong>
                </Col>
                <Col xs={9}>
                  {getDateTimeFromStringDate(dataDetail.publishDate)}
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>สถานะ : </strong>
                </Col>
                <Col xs={9}>
                  {moment().isAfter(moment(dataDetail.publishDate))
                    ? "เผยแพร่"
                    : moment().isBefore(moment(dataDetail.publishDate))
                    ? "ร่าง"
                    : dataDetail.isActive === "0"
                    ? "นำออก"
                    : ""}
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong> จำนวนการเข้าชม : </strong>
                </Col>
                <Col xs={9}>{numberWithCommas(dataDetail.numberOfView)}</Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>วันที่แก้ไขล่าสุด : </strong>
                </Col>
                <Col xs={9}>
                  {getDateTimeFromStringDate(dataDetail.updateDate)}
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>ผู้ที่แก้ไขล่าสุด : </strong>
                </Col>

                <Col xs={9}>
                  {!!dataDetail.updateBy ? dataDetail.updateBy.name : ""}
                </Col>
              </Row>
            </Col>
          </Row>
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
};

const mapStateToProps = (state) => {
  return {
    dataDetail: state.modal.modalProps,
  };
};
export default reduxForm({
  form: "DetailNewsModal",
})(connect(mapStateToProps, mapDispatchToProps)(DetailNewsModal));
