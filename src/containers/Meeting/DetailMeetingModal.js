import React from "react";
import { mapDispatchToProps } from "../../redux/actions/index";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import RenderDownloadFile from "../../components/RenderDownloadFile";
import {
  getDateTimeFromStringDate,
  getDateFromStringDate,
} from "../../utils/DateUtils";
import moment from "moment";
import { numberWithCommas } from "../../utils/NumberUtils";

const DetailMeetingModal = ({ hide_modal, dataDetail }) => {
  const onHide = () => {
    hide_modal();
  };

  return (
    <Modal show={true} onHide={() => onHide()} size="lg">
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={12} style={{ borderBottom: "3px solid #dddddd" }}>
              <h3>ประชุม กก.วล.</h3>
            </Col>
          </Row>

          <Row style={{ marginTop: "15px" }}>
            <Col xs={12}>
              <Row>
                <Col xs={3}>
                  <strong>ประเภท : </strong>
                </Col>

                <Col xs={9}>
                  {dataDetail.type === "RabiapwaraKanPrachum"
                    ? "ระเบียบวาระการประชุม"
                    : dataDetail.type === "Mati"
                    ? "มติ"
                    : dataDetail.type === "RainganYo"
                    ? "รายงาน (ย่อ)"
                    : dataDetail.type === "RainganTem"
                    ? "รายงาน (เต็ม)"
                    : dataDetail.type === "MatiKoKoWoLoSanoeKhoRoMo"
                    ? "มติ กก.วล. เสนอ ครม."
                    : dataDetail.type === "WaraKanPrachum"
                    ? "วาระการประชุม"
                    : dataDetail.type === "NangsueChaengMati"
                    ? "หนังสือแจ้งมติ"
                    : dataDetail.type === "RainganNayok"
                    ? "รายงานนายก"
                    : dataDetail.type === "NangsueKhoRoMo"
                    ? "หนังสือครม."
                    : dataDetail.type === "KaekhaiLaeRaprongRaingan"
                    ? "แก้ไขและรับรองรายงาน"
                    : dataDetail.type === "KhomunChaphokit"
                    ? "ข้อมูลเฉพาะกิจ"
                    : dataDetail.type === "PrachumKoKoWoLoUenUen"
                    ? "อื่นๆ"
                    : ""}
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>
                    {dataDetail.type === "MatiKoKoWoLoSanoeKhoRoMo" ||
                    dataDetail.type === "NangsueKhoRoMo"
                      ? "วันที่ประชุม ครม. : "
                      : "วันที่ประชุม : "}
                  </strong>
                </Col>
                <Col xs={9}>
                  {getDateFromStringDate(dataDetail.meetingDate)}
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>หัวเรื่อง : </strong>
                </Col>
                <Col xs={9}>{dataDetail.header}</Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>คำสำคัญ : </strong>
                </Col>
                <Col xs={9}>{dataDetail.description}</Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>ครั้งที่ : </strong>
                </Col>
                <Col xs={9}>{dataDetail.numberOfMeeting}</Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>ปี : </strong>
                </Col>
                <Col xs={9}>{dataDetail.year}</Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>ไฟล์ : </strong>
                </Col>
                <Col xs={9}>
                  {dataDetail.documentFiles.length >= 1
                    ? dataDetail.documentFiles.map((item, i) => {
                        return (
                          <RenderDownloadFile
                            file={item}
                            keys={i}
                            isDetail={true}
                          />
                        );
                      })
                    : "ไม่พบไฟล์ "}
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col xs={3}>
                  <strong>ไฟล์ (ไม่เผยแพร่): </strong>
                </Col>
                <Col xs={9}>
                  {dataDetail.documentFilesNonPublish.length >= 1
                    ? dataDetail.documentFilesNonPublish.map((item, i) => {
                        return (
                          <>
                            <RenderDownloadFile
                              file={item}
                              keys={i}
                              isDetail={true}
                            />
                          </>
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
                  <strong>วันเวลาที่เผยแพร่ : </strong>
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
                  <strong>จำนวนดาวน์โหลด : </strong>
                </Col>
                <Col xs={9}>
                  {numberWithCommas(dataDetail.numberOfDownload)}
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
  form: "DetailMeetingModal",
})(connect(mapStateToProps, mapDispatchToProps)(DetailMeetingModal));
