import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import { mapDispatchToProps } from "../../../redux/actions/index";
import LOADING from "../../../redux/actions/loading_key";
import { reduxForm, getFormValues } from "redux-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faSearch,
  faCheck,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { getDateTimeFromStringDate } from "../../../utils/DateUtils";
import PaginationBasic from "../../../components/PaginationBasic";
import DataEmpty from "../../../components/DataEmpty";

const UserTableAdmin = ({
  dataSource,
  loading,
  deleteUser,
  showEditUser,
  showUserDetail,
  showResetPassword,
  changeStatus,
  editUser,
  pagecount,
  formStates,
  activePage,
  getUsers,
}) => {
  const handleOnSwitchUser = (value, e) => {
    let data = {
      id: value._id,
      isActive: value.isActive === "0" ? "1" : "0",
    };
    vex.dialog.confirm({
      message: `ยืนยันการเปลี่ยนสถานะ ${value.name} ?`,
      callback: (val) => {
        if (val) {
          loading(LOADING.editUser);
          editUser(data);
        } else {
          e.target.checked = value.isActive === "0" ? false : true;
        }
      },
    });
  };
  const handleOnEditUser = (value) => {
    showEditUser(value);
  };

  const handleOnDeleteUser = (user) => {
    vex.dialog.confirm({
      message: `ยืนยันการลบ ${user.name} ?`,
      callback: function (value) {
        if (value) {
          loading(LOADING.deleteUser);
          deleteUser(user._id);
        }
      }.bind(this),
    });
  };
  const handleonShowDetail = (value) => {
    showUserDetail(value);
  };

  const handleChangeRole = (user) => {
    let data = {
      id: user._id,
    };
    if (user.isApprove === "0") {
      vex.dialog.confirm({
        message: `ยืนยันการอนุมัติผู้ใช้งาน ${user.username} ?`,
        callback: (value) => {
          if (value) {
            loading(LOADING.changeStatus);
            changeStatus(data);
          }
        },
      });
    } else {
      showResetPassword(user);
    }
  };

  const renderTableRow = (value) => {
    return (
      <tr key={value._id}>
        <td>{value.username}</td>
        <td>{value.name}</td>
        <td>
          {value.role === "adminThoSo"
            ? "เจ้าหน้าที่ ทส."
            : value.role === "adminKoWoLo"
            ? "เจ้าหน้าที่ กวล."
            : ""}
        </td>
        <td>
          {!!value.lastLogin
            ? getDateTimeFromStringDate(value.lastLogin)
            : value.lastLogin}
        </td>

        <td>
          {value.isApprove === "1" && value.isActive === "1"
            ? "ใช้งาน"
            : value.isApprove === "0" && value.isActive === "1"
            ? "รออนุมัติ"
            : value.isActive === "0"
            ? "ปิด"
            : ""}
        </td>

        <td style={{ textAlign: "center" }}>
          <Row style={{ paddingLeft: "55px" }}>
            <Col sm={2}>
              <FontAwesomeIcon
                onClick={() => handleChangeRole(value)}
                icon={
                  value.isApprove === "0" && value.isActive === "1"
                    ? faCheck
                    : value.isApprove === "1" && value.isActive === "1"
                    ? faLock
                    : ""
                }
                style={{ fontSize: 26 }}
              />
            </Col>
            <Col sm={2}>
              <FontAwesomeIcon
                onClick={() => handleonShowDetail(value)}
                icon={faSearch}
                style={{ fontSize: 26 }}
              />
            </Col>
            <Col sm={2}>
              <FontAwesomeIcon
                onClick={() => handleOnEditUser(value)}
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
                  onClick={(e) => handleOnSwitchUser(value, e)}
                />
              </Form>
            </Col>
            <Col sm={2}>
              <FontAwesomeIcon
                onClick={() => handleOnDeleteUser(value)}
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
    // dataFilterr จาก การกด Pagination
    if (!!formStates) {
      let valueFilter = {
        username: formStates.username,
        name: formStates.name,
        role: formStates.year,
        status: formStates.status,
      };
      window.scrollTo(0, 0);
      loading(LOADING.getUsers);
      getUsers({ filter: valueFilter, pageKey });
    } else {
      window.scrollTo(0, 0);
      loading(LOADING.getUsers);
      getUsers({ pageKey });
    }
  };

  return (
    <div>
      <Row style={{ marginBottom: "15px" }}></Row>
      <Table responsive striped>
        <thead>
          <tr>
            <th width={150}>ชื่อผู้ใช้งาน</th>
            <th width={230}>ชื่อ-นามสกุล</th>
            <th width={180}>การกำหนดสิทธิ์</th>
            <th width={200}>วันที่เข้าใช้งานล่าสุด</th>
            <th width={10}>สถานะ</th>
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
    formStates: getFormValues("UserFilterAdmin")(state),
    pagecount: state.user.pagecount,
    activePage: state.user.activePage,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "UserTableAdmin",
  })(UserTableAdmin),
);
