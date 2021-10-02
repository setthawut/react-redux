import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import { mapDispatchToProps } from "../../../redux/actions/index";
import LOADING from "../../../redux/actions/loading_key";
import { reduxForm, getFormValues } from "redux-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import RenderDownloadFile from "../../../components/RenderDownloadFile";
import PaginationBasic from "../../../components/PaginationBasic";
import {
  getDateTimeFromStringDate,
  getDateFromStringDate,
} from "../../../utils/DateUtils";
import moment from "moment";
import { numberWithCommas } from "../../../utils/NumberUtils";
import DataEmpty from "../../../components/DataEmpty";

const NotifyTableAdmin = ({
  dataSource,
  loading,
  deleteNotify,
  showEditNotify,
  showNotifyDetail,
  isYear,
  isRound,
  pagecount,
  activePage,
  dataNotify,
  formStates,
  editNotify,
  getNotify,
}) => {
  const handleOnSwitchNotify = (value, e) => {
    const formData = new FormData();
    formData.append("id", value._id);
    formData.append("isActive", value.isActive === "0" ? "1" : "0");

    vex.dialog.confirm({
      message: `ยืนยันการเปลี่ยนสถานะ ${value.header} ?`,
      callback: (val) => {
        if (val) {
          loading(LOADING.editNotify);
          editNotify(formData);
        } else {
          e.target.checked = value.isActive === "0" ? false : true;
        }
      },
    });
  };
  const handleOnEditNotify = (value) => {
    showEditNotify(value);
  };

  const handleOnDeleteNotify = (notify, e) => {
    vex.dialog.confirm({
      message: `ยืนยันการลบ ${notify.header} ?`,
      callback: function (value) {
        if (value) {
          loading(LOADING.deleteNotify);
          deleteNotify(notify._id);
        }
      }.bind(this),
    });
  };
  const handleonShowDetail = (value) => {
    showNotifyDetail(value);
  };

  const renderTableRow = (value) => {
    return (
      <tr key={value._id}>
        <td>{getDateTimeFromStringDate(value.publishDate)}</td>
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
            : "ไม่พบไฟล์"}
        </td>

        <td style={{ textAlign: "right" }}>
          {!!value.numberOfDownload
            ? numberWithCommas(value.numberOfDownload)
            : "0"}
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
                onClick={() => handleOnEditNotify(value)}
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
                  onClick={(e) => handleOnSwitchNotify(value, e)}
                />
              </Form>
            </Col>
            <Col sm={2}>
              <FontAwesomeIcon
                onClick={() => handleOnDeleteNotify(value)}
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
    let findType = dataNotify.find((item) => item.type);

    if (!!formStates) {
      let valueFilter = {
        search: formStates.search,
        numberofmeeting: formStates.numberofmeeting,
        year: formStates.year,
        meetingdate: !!formStates.meetingdate
          ? formStates.meetingdate.format("YYYY-MM-DDTHH:mm:ss")
          : "",
        publishstartdate: !!formStates.publishstartdate
          ? formStates.publishstartdate.format("YYYY-MM-DDTHH:mm:ss")
          : "",
        publishenddate: !!formStates.publishenddate
          ? formStates.publishenddate.format("YYYY-MM-DDTHH:mm:ss")
          : "",
        status: formStates.status,
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
            <th width={170}>วันเวลาที่เผยแพร่</th>
            <th width={130}>{isRound ? "วันที่ประกาศ" : "วันที่ลงนาม"}</th>
            <th width={320}>หัวเรื่อง</th>

            {isRound ? <th width={100}>เลขที่คำสั่ง</th> : ""}
            {isYear ? <th width={80}>ปี</th> : ""}
            <th width={120}>สถานะ</th>
            <th width={100}>ไฟล์</th>
            <th width={150} style={{ textAlign: "right" }}>
              จำนวนดาวน์โหลด
            </th>
            <th style={{ width: 300, textAlign: "center" }}>
              ฉบับเก่า / แก้ไข / เปลี่ยนสถานะ / ลบ
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
};

function mapStateToProps(state) {
  return {
    formStates: getFormValues("MeetingFilterAdmin")(state),
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
    form: "NotifyFilterAdmin",
  })(NotifyTableAdmin),
);
