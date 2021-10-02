import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Table } from "react-bootstrap";
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

const MeetingTableAdmin = ({
  dataSource,
  loading,
  deleteMeeting,
  showEditMeeting,
  showMeetingDetail,
  pagecount,
  activePage,
  getMeeting,
  dataMeeting,
  editMeeting,
  formStates,
  isKhoRoMo,
}) => {
  const handleOnSwitchMeeting = (value, e) => {
    const formData = new FormData();
    formData.append("id", value._id);
    formData.append("isActive", value.isActive === "0" ? "1" : "0");

    vex.dialog.confirm({
      message: `ยืนยันการเปลี่ยนสถานะ ${value.header} ?`,
      callback: (val) => {
        if (val) {
          loading(LOADING.editMeeting);
          editMeeting(formData);
        } else {
          e.target.checked = value.isActive === "0" ? false : true;
        }
      },
    });
  };
  const handleOnEditMeeting = (value) => {
    showEditMeeting(value);
  };

  const handleOnDeleteMeeting = (meeting) => {
    vex.dialog.confirm({
      message: `ยืนยันการลบ ${meeting.header} ?`,
      callback: function (value) {
        if (value) {
          loading(LOADING.deleteMeeting);
          deleteMeeting(meeting._id);
        }
      }.bind(this),
    });
  };
  const handleonShowDetail = (value) => {
    showMeetingDetail(value);
  };

  const renderTableRow = (value) => {
    return (
      <tr key={value._id}>
        <td width={200}>{getDateTimeFromStringDate(value.publishDate)}</td>
        <td>{getDateFromStringDate(value.meetingDate)}</td>
        <td>{value.header}</td>
        <td>{value.numberOfMeeting}</td>
        <td>{value.year}</td>
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
        <td>
          {!!value.documentFiles
            ? value.documentFiles.map((item, i) => {
                return <RenderDownloadFile file={item} keys={i} />;
              })
            : "ไม่พบไฟล์"}
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
                onClick={() => handleOnEditMeeting(value)}
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
                  onClick={(e) => handleOnSwitchMeeting(value, e)}
                />
              </Form>
            </Col>
            <Col sm={2}>
              <FontAwesomeIcon
                onClick={() => handleOnDeleteMeeting(value)}
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
    let findType = dataMeeting.find((item) => item.type); //typeที่มาจากการกด tab

    if (!!formStates) {
      // dataFilterr จาก การกด Pagination
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
            <th width={150}>วันเวลาที่เผยแพร่</th>
            <th width={150}>
              {isKhoRoMo ? "วันที่ประชุม ครม." : "วันที่ประชุม"}
            </th>
            <th width={350}>หัวเรื่อง</th>
            <th width={150}> {isKhoRoMo ? "กก.วล. ครั้งที่" : "ครั้งที่"}</th>
            <th width={80}>ปี</th>
            <th width={100}>สถานะ</th>
            <th width={120}>ไฟล์</th>
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
    form: "MeetingTableAdmin",
  })(MeetingTableAdmin),
);
