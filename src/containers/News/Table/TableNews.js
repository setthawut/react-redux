import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import { mapDispatchToProps } from "../../../redux/actions/index";
import LOADING from "../../../redux/actions/loading_key";
import { reduxForm, getFormValues } from "redux-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import RenderDownloadFile from "../../../components/RenderDownloadFile";
import moment from "moment";
import PaginationBasic from "../../../components/PaginationBasic";
import { numberWithCommas } from "../../../utils/NumberUtils";
import { getDateTimeFromStringDate } from "../../../utils/DateUtils";
import DataEmpty from "../../../components/DataEmpty";

const NewsTableAdmin = ({
  dataSource,
  loading,
  deleteNews,
  showEditNews,
  showNewsDetail,
  pagecount,
  editNews,
  activePage,
  getNews,
  formStates,
}) => {
  const handleOnSwitchNews = (value, e) => {
    const formData = new FormData();
    formData.append("id", value._id);
    formData.append("isActive", value.isActive === "0" ? "1" : "0");

    vex.dialog.confirm({
      message: `ยืนยันการเปลี่ยนสถานะ ${value.header} ?`,
      callback: (val) => {
        if (val) {
          loading(LOADING.editNews);
          editNews(formData);
        } else {
          e.target.checked = value.isActive === "0" ? false : true;
        }
      },
    });
  };
  const handleOnEditNews = (value) => {
    showEditNews(value);
  };

  const handleOnDeleteNews = (news) => {
    vex.dialog.confirm({
      message: `ยืนยันการลบ ${news.header} ?`,
      callback: function (value) {
        if (value) {
          loading(LOADING.deleteNews);
          deleteNews(news._id);
        }
      }.bind(this),
    });
  };
  const handleonShowDetail = (value) => {
    showNewsDetail(value);
  };

  const handleSelectPage = (pageKey) => {
    if (!!formStates) {
      // dataFilterr จาก การกด Pagination
      let valueFilter = {
        search: formStates.search,
        publishstartdate: !!formStates.publishstartdate
          ? formStates.publishstartdate.format("YYYY-MM-DDTHH:mm:ss")
          : "",
        publishenddate: !!formStates.publishenddate
          ? formStates.publishenddate.format("YYYY-MM-DDTHH:mm:ss")
          : "",
      };
      window.scrollTo(0, 0);
      loading(LOADING.getNews);
      getNews({ ...valueFilter, pageKey });
    } else {
      window.scrollTo(0, 0);
      loading(LOADING.getNews);
      getNews({ pageKey });
    }
  };

  const renderTableRow = (value) => {
    return (
      <tr key={value._id}>
        <td>{getDateTimeFromStringDate(value.publishDate)}</td>
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

        <td style={{ textAlign: "right" }}>
          {numberWithCommas(value.numberOfView)}
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
                onClick={() => handleOnEditNews(value)}
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
                  onClick={(e) => handleOnSwitchNews(value, e)}
                />
              </Form>
            </Col>
            <Col sm={2}>
              <FontAwesomeIcon
                onClick={() => handleOnDeleteNews(value)}
                icon={faTrash}
                style={{ fontSize: 26 }}
              />
            </Col>
          </Row>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <Row style={{ marginBottom: "15px" }}></Row>
      <Table responsive striped>
        <thead>
          <tr>
            <th width={200}>วันเวลาที่เผยแพร่</th>
            <th width={500}>หัวเรื่อง</th>
            <th width={130}>สถานะ</th>
            <th width={120}>จำนวนการเข้าชม</th>
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
};
function mapStateToProps(state) {
  return {
    formStates: getFormValues("NewsFilterAdmin")(state),
    pagecount: state.news.pagecount,
    activePage: state.news.activePage,
    dataNews: state.news.news,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "NewsTableAdmin",
  })(NewsTableAdmin),
);
