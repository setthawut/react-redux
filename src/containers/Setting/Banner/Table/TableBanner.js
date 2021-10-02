import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../../redux/actions/index";
import { reduxForm } from "redux-form";
import { Container, Row, Col, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faSearch,
  faCheck,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import LOADING from "../../../../redux/actions/loading_key";

function BannerTableAdmin({
  dataSource,
  loading,
  deleteBanner,
  changeStatusBanner,
  showBannerDetail,
  showEditBanner,
}) {
  const handleOnDeleteBanner = (banner) => {
    vex.dialog.confirm({
      message: `ยืนยันการลบ ${banner.name} ?`,
      callback: function (value) {
        if (value) {
          loading(LOADING.deleteBanner);
          deleteBanner(banner["_id"]);
        }
      }.bind(this),
    });
  };
  const handleonShowDetail = (value) => {
    showBannerDetail(value);
  };
  const handleOnEditBanner = (value) => {
    showEditBanner(value);
  };

  const handleChangeStatus = (banner) => {
    vex.dialog.confirm({
      message: `ยืนยันการเปลี่ยนสถานะ ${banner.name} ?`,
      callback: (value) => {
        if (value) {
          const formData = new FormData();
          formData.append("id", banner["_id"]);
          formData.append("isActive", "1");

          loading(LOADING.changeStatusBanner);
          changeStatusBanner(formData);
        }
      },
    });
  };

  const renderTableRow = (value) => {
    return (
      <tr
        key={value.Id}
        style={value.isActive === "1" ? { background: "#B2E0D4" } : {}}
      >
        <td>{value.name}</td>
        <td>{value.isActive === "1" ? "ใช้งาน" : "ร่าง"}</td>
        <td style={{ textAlign: "center" }}>
          <Row>
            <Col sm={3}>
              {value.isActive !== "1" ? (
                <FontAwesomeIcon
                  onClick={() => handleChangeStatus(value)}
                  icon={faCheck}
                  style={{ fontSize: 26 }}
                />
              ) : null}
            </Col>

            <Col sm={3}>
              <FontAwesomeIcon
                onClick={() => handleonShowDetail(value)}
                icon={faSearch}
                style={{ fontSize: 26 }}
              />
            </Col>
            <Col sm={3}>
              <FontAwesomeIcon
                onClick={() => handleOnEditBanner(value)}
                icon={faEdit}
                style={{ fontSize: 26 }}
              />
            </Col>
            <Col sm={3}>
              <FontAwesomeIcon
                onClick={() => handleOnDeleteBanner(value)}
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
      <Container fluid>
        <Table responsive striped>
          <thead>
            <tr>
              <th>ชื่อกลุ่มแบนเนออร์</th>
              <th style={{ width: 120 }}>สถานะ</th>
              <th style={{ width: 240, textAlign: "center" }}>
                เปลี่ยนสถานะ / ดู / แก้ไข / ลบ
              </th>
            </tr>
          </thead>
          <tbody>
            {typeof dataSource.map === "function" &&
              dataSource.map((item) => {
                return renderTableRow(item);
              })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default reduxForm({
  form: "BannerTableAdmin",
})(connect(null, mapDispatchToProps)(BannerTableAdmin));
