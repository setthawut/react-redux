import React from "react";
import { mapDispatchToProps } from "../../redux/actions/index";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import {
  getDateTimeFromStringDate,
  getDateFromStringDate,
} from "../../utils/DateUtils";

const DetailUserModal = ({ hide_modal, dataDetail }) => {
  const onHide = () => {
    hide_modal();
  };

  return (
    <Modal show={true} onHide={() => onHide()} size="lg">
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={12} style={{ borderBottom: "3px solid #dddddd" }}>
              <h3>ผู้ใช้งาน</h3>
            </Col>
          </Row>

          <Row style={{ marginTop: "15px" }}>
            <Col xs={12}>
              <Row>
                <Col xs={3}>
                  <strong>ผู้ใช้งาน : </strong>
                </Col>
                <Col xs={9}>{dataDetail.username}</Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>ชื่อ - นามสกุล : </strong>
                </Col>
                <Col xs={9}>{dataDetail.name}</Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>ตำแหน่ง : </strong>
                </Col>
                <Col xs={9}>{dataDetail.position}</Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>หน่วยงาน : </strong>
                </Col>
                <Col xs={9}>{dataDetail.institution}</Col>
              </Row>

              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>เบอร์โทร : </strong>
                </Col>
                <Col xs={9}>{dataDetail.phone}</Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>E-mail : </strong>
                </Col>
                <Col xs={9}>{dataDetail.email}</Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>การกำหนดสิทธิ์ : </strong>
                </Col>
                <Col xs={9}>
                  {dataDetail.role === "adminKoWoLo"
                    ? "เจ้าหน้าที่ กลว"
                    : dataDetail.role === "adminThoSo"
                    ? "เจ้าหน้าที่ ทส"
                    : dataDetail.role === "user"
                    ? "ผู้ใช้งานทั่วไป"
                    : ""}
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
                  <strong>วันที่สร้าง : </strong>
                </Col>
                <Col xs={9}>
                  {getDateTimeFromStringDate(dataDetail.createDate)}
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>ผู้สร้าง : </strong>
                </Col>

                <Col xs={9}>{!!dataDetail.createBy && dataDetail.createBy.name}</Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>ผู้อนุมัติ : </strong>
                </Col>
                <Col xs={9}>
                  {!!dataDetail.approveBy && dataDetail.approveBy.name}
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>สถานะ : </strong>
                </Col>
                <Col xs={9}>
                  {dataDetail.isApprove === "1" && dataDetail.isActive === "1"
                    ? "ใช้งาน"
                    : dataDetail.isApprove === "0" &&
                      dataDetail.isActive === "1"
                    ? "รออนุมัติ"
                    : dataDetail.isActive === "0"
                    ? "ปิด"
                    : ""}
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>วันที่เข้าใช้งานล่าสุด : </strong>
                </Col>
                <Col xs={9}>
                  {!!dataDetail.lastLogin &&
                    getDateTimeFromStringDate(dataDetail.lastLogin)}
                </Col>
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
                  {" "}
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
  form: "DetailUserModal",
})(connect(mapStateToProps, mapDispatchToProps)(DetailUserModal));
