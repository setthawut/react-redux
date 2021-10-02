import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import { mapDispatchToProps } from "../../../redux/actions/index";
import LOADING from "../../../redux/actions/loading_key";
import { reduxForm, getFormValues } from "redux-form";

import RenderDownloadFile from "../../../components/RenderDownloadFile";
import PaginationBasic from "../../../components/PaginationBasic";
import { getDateFromStringDate } from "../../../utils/DateUtils";

import DataEmpty from "../../../components/DataEmpty";

const MeetingTableUser = ({
  dataSource,
  loading,
  formStates,
  pagecount,
  activePage,
  getMeeting,
  dataMeeting,
  isKhoRoMo,
}) => {
  const renderTableRow = (value) => {
    return (
      <tr key={value._id}>
        <td>{getDateFromStringDate(value.meetingDate)}</td>
        <td>{value.header}</td>
        <td>{value.numberOfMeeting}</td>
        <td>{value.year}</td>
        <td>
          {!!value.documentFiles
            ? value.documentFiles.map((item, i) => {
                return <RenderDownloadFile file={item} keys={i} />;
              })
            : "ไม่พบไฟล์"}
        </td>
      </tr>
    );
  };
  const handleSelectPage = (pageKey) => {
    let findType = dataMeeting.find((item) => item.type);
    if (!!formStates) {
      // dataFilterr จาก การกด Pagination
      let valueFilter = {
        search: formStates.search,
        numberofmeeting: formStates.numberofmeeting,
        year: formStates.year,
        meetingdate: !!formStates.meetingdate
          ? formStates.meetingdate.format("YYYY-MM-DDTHH:mm:ss")
          : "",
      };

      window.scrollTo(0, 0);
      loading(LOADING.getMeeting);
      getMeeting({
        ...valueFilter,
        pageKey,
        selectPageType: findType.type,
      });
    } else {
      window.scrollTo(0, 0);
      loading(LOADING.getMeeting);
      getMeeting({ pageKey, selectPageType: findType.type });
    }
  };
  return (
    <div>
      <Row style={{ marginBottom: "15px" }}></Row>
      <Table responsive striped>
        <thead>
          <tr>
            <th width={220}>
              {isKhoRoMo ? "วันที่ประชุม ครม." : "วันที่ประชุม"}
            </th>
            <th width={630}>หัวเรื่อง</th>
            <th width={170}>{isKhoRoMo ? "กก.วล. ครั้งที่" : "ครั้งที่"}</th>
            <th width={170}>ปี</th>

            <th>ไฟล์</th>
          </tr>
        </thead>
        <tbody>
          {typeof dataSource.map === "function" && dataSource.length > 0 ? (
            dataSource.map((item) => {
              return renderTableRow(item);
            })
          ) : (
            <DataEmpty colSpan={10} />
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
};
function mapStateToProps(state) {
  return {
    formStates: getFormValues("MeetingFilterAdmin")(state),
    pagecount: state.meeting.pagecount,
    activePage: state.meeting.activePage,
    dataMeeting: state.meeting.meeting,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "MeetingTableUser",
  })(MeetingTableUser),
);
