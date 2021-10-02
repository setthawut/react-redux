import React from "react";
import { connect } from "react-redux";
import { Row, Col, Table } from "react-bootstrap";
import { mapDispatchToProps } from "../../../redux/actions/index";

import { reduxForm, getFormValues } from "redux-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import RenderDownloadFile from "../../../components/RenderDownloadFile";
import PaginationBasic from "../../../components/PaginationBasic";
import { getDateFromStringDate } from "../../../utils/DateUtils";
import { numberWithCommas } from "../../../utils/NumberUtils";
import DataEmpty from "../../../components/DataEmpty";

const NotifyTableUser = ({
  dataSource,
  showNotifyDetail,
  isYear,
  isRound,
  pagecount,
  activePage,
  dataNotify,
  formStates,
}) => {
  const handleonShowDetail = (value) => {
    showNotifyDetail(value);
  };

  const renderTableRow = (value) => {
    return (
      <tr key={value._id}>
        <td>{getDateFromStringDate(value.meetingDate)}</td>
        <td>{value.header}</td>
        {isRound ? (
          <td>
            {!!value.numberOfMeeting
              ? numberWithCommas(value.numberOfMeeting)
              : "0"}
          </td>
        ) : (
          ""
        )}
        {isYear ? <td>{value.year}</td> : ""}
        <td style={{ textAlign: "left" }}>
          {!!value.documentFiles
            ? value.documentFiles.map((item, i) => {
                return <RenderDownloadFile file={item} keys={i} />;
              })
            : "ไม่พบไฟล์"}
        </td>

        <td style={{ textAlign: "left" }}>
          <Row>
            <Col sm={2}>
              <FontAwesomeIcon
                onClick={() => handleonShowDetail(value)}
                icon={faSearch}
                style={{ fontSize: 26 }}
              />
            </Col>
          </Row>
        </td>
      </tr>
    );
  };

  const handleSelectPage = (pageKey) => {
    let findType = dataNotify.find((item) => item.type);

    if (!!formStates) {
      let valueFilter = {
        search: formStates.search,
        numberofmeeting: formStates.numberofmeeting,
        year: formStates.year,
        meetingdate: !!formStates.meetingdate
          ? formStates.meetingdate.format("YYYY-MM-DDTHH:mm:ss")
          : "",
      };

      window.scrollTo(0, 0);
      loading(LOADING.getNotify);
      getNotify({
        ...valueFilter,
        pageKey,
        selectPageType: findType.type,
      });
    } else {
      window.scrollTo(0, 0);
      loading(LOADING.getNotify);
      getNotify({ pageKey, selectPageType: findType.type });
    }
  };

  return (
    <div>
      <Row style={{ marginBottom: "15px" }}></Row>
      <Table responsive striped>
        <thead>
          <tr>
            <th width={150}>{isRound ? "วันที่ประกาศ" : "วันที่ลงนาม"}</th>
            <th width={500}>หัวเรื่อง</th>

            {isRound ? <th width={80}>เลขที่คำสั่ง</th> : ""}
            {isYear ? <th width={80}>ปี</th> : ""}
            <th width={100}>ไฟล์</th>

            <th style={{ width: 100 }}>ฉบับเก่า</th>
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
};

function mapStateToProps(state) {
  return {
    formStates: getFormValues("NotifyFilterUser")(state),
    pagecount: state.notify.pagecount,
    activePage: state.notify.activePage,
    dataNotify: state.notify.notify,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "NotifyTableUser",
  })(NotifyTableUser),
);
