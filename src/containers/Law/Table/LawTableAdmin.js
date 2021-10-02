import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../redux/actions/index";
import { reduxForm } from "redux-form";
import RenderDownloadFile from "../../../components/RenderDownloadFile";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import LOADING from "../../../redux/actions/loading_key";
import PaginationBasic from "../../../components/PaginationBasic";
import {
  getDateTimeFromStringDate,
  getDateFromStringDate,
} from "../../../utils/DateUtils";
import moment from "moment";
import { numberWithCommas } from "../../../utils/NumberUtils";
import DataEmpty from "../../../components/DataEmpty";

function LawTableAdmin({
  dataSource,
  loading,
  deleteLaw,
  showEditLaw,
  showLawDetail,
  pagecount,
  activePage,
  getLaw,
  editLaw,
}) {
  const dateNow = moment();

  const handleOnSwitchLaw = (value, e) => {
    const formData = new FormData();
    formData.append("id", value._id);
    formData.append("isActive", value.isActive === "0" ? "1" : "0");

    vex.dialog.confirm({
      message: `ยืนยันการเปลี่ยนสถานะ ${value.header} ?`,
      callback: (val) => {
        if (val) {
          loading(LOADING.editLaw);
          editLaw(formData);
        } else {
          e.target.checked = value.isActive === "0" ? false : true;
        }
      },
    });
  };
  const handleOnEditLaw = (value) => {
    showEditLaw(value);
  };

  const handleOnDeleteLaw = (law) => {
    vex.dialog.confirm({
      message: `ยืนยันการลบ ${law.header} ?`,
      callback: function (value) {
        if (value) {
          loading(LOADING.deleteLaw);
          deleteLaw(law._id);
        }
      }.bind(this),
    });
  };
  const handleonShowDetail = (value) => {
    showLawDetail(value);
  };

  const renderTableRow = (value) => {
    return (
      <tr key={value._id}>
        <td>{getDateTimeFromStringDate(value.publishDate)}</td>
        <td>{moment(value.meetingDate).format("yyyy")}</td>
        <td>
          {value.type === "Phraratchabanyat"
            ? "พระราชบัญญัติ"
            : value.type === "MatiKhanaratthamontri"
            ? "มติคณะรัฐมนตรี"
            : value.type === "KotmaiUenThiKiaokhong"
            ? "กฎหมายอื่นที่เกี่ยวข้อง"
            : ""}
        </td>
        <td>{value.header}</td>
        <td>
          {value.isActive === "1" && moment().isAfter(moment(value.publishDate))
            ? "เผยแพร่"
            : value.isActive === "1" &&
              moment().isBefore(moment(value.publishDate))
            ? "ร่าง"
            : value.isActive === "0"
            ? "นำออก"
            : ""}
        </td>

        <td style={{ textAlign: "left" }}>
          {!!value.documentFiles
            ? value.documentFiles.map((item, i) => {
                return <RenderDownloadFile file={item} keys={i} />;
              })
            : "ไม่พบไฟล์ "}
        </td>

        <td style={{ textAlign: "right" }}>
          {numberWithCommas(value.numberOfDownload)}
        </td>
        <td style={{ textAlign: "center" }}>
          <Row style={{ paddingLeft: "55px" }}>
            <Col sm={2}>
              <FontAwesomeIcon
                onClick={() => handleonShowDetail(value)}
                icon={faSearch}
                style={{ fontSize: 26 }}
              />
            </Col>
            <Col sm={2}>
              <FontAwesomeIcon
                onClick={() => handleOnEditLaw(value)}
                icon={faEdit}
                style={{ fontSize: 26 }}
              />
            </Col>
            <Col sm={2}>
              <Form>
                <Form.Check
                  type="switch"
                  id={value._id}
                  label=""
                  defaultChecked={
                    value.isActive === "1" && value.isDelete === "0"
                      ? true
                      : false
                  }
                  onClick={(e) => handleOnSwitchLaw(value, e)}
                />
              </Form>
            </Col>
            <Col sm={2}>
              <FontAwesomeIcon
                onClick={() => handleOnDeleteLaw(value)}
                icon={faTrash}
                style={{ fontSize: 26 }}
              />
            </Col>
          </Row>
        </td>
      </tr>
    );
  };

  const handleSelectPage = (pageKey) => {
    window.scrollTo(0, 0);
    loading(LOADING.getLaw);
    getLaw({ pageKey, selectPageType: "KotmaiThiKiaokhong" });
  };

  return (
    <div>
      <Row style={{ marginBottom: "15px" }}></Row>
      <Table responsive striped>
        <thead>
          <tr>
            <th width={180}>วันที่เวลาเผยแพร่</th>
            <th width={120}>ปี พ.ศ. </th>
            <th width={200}>ประเภท</th>
            <th width={380}>หัวเรื่อง</th>
            <th width={100}>สถานะ</th>
            <th>ไฟล์</th>
            <th width={140}>จำนวนดาวน์โหลด</th>
            <th style={{ width: 300, textAlign: "center" }}>
              ดู / แก้ไข / เปลี่ยนสถานะ / ลบ
            </th>
          </tr>
        </thead>
        <tbody>
          {typeof dataSource.map === "function" && dataSource.length > 0 ? (
            dataSource.map((item) => {
              return renderTableRow(item);
            })
          ) : (
            <DataEmpty colSpan={8} />
          )}
        </tbody>
      </Table>
      <Col xs={12} style={{ paddingTop: "10px" }}>
        <PaginationBasic
          numberOfPage={pagecount}
          activePage={activePage}
          onSelect={(eventKey) => handleSelectPage(eventKey)}
        />
      </Col>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    pagecount: state.law.pagecount,
    activePage: state.law.activePage,
    dataLaw: state.law.law,
  };
}

export default reduxForm({
  form: "LawTableAdmin",
})(connect(mapStateToProps, mapDispatchToProps)(LawTableAdmin));
