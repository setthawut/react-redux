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

function LawTableUser({
  dataSource,
  loading,

  pagecount,
  activePage,
  getLaw,
}) {
  const renderTableRow = (value) => {
    return (
      <tr key={value._id}>
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
            <th width={200}>ประเภท</th>
            <th width={900}>หัวเรื่อง</th>
            <th>สถานะ</th>
            <th>ไฟล์</th>
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
  form: "LawTableUser",
})(connect(mapStateToProps, mapDispatchToProps)(LawTableUser));
