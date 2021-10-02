import React from "react";
import { connect } from "react-redux";
import { Row, Col, Table } from "react-bootstrap";
import { mapDispatchToProps } from "../../../redux/actions/index";
import LOADING from "../../../redux/actions/loading_key";
import { reduxForm, getFormValues } from "redux-form";
import { getDateTimeFromStringDate } from "../../../utils/DateUtils";
import PaginationBasic from "../../../components/PaginationBasic";
import DataEmpty from "../../../components/DataEmpty";

const UserTableUser = ({
  dataSource,
  loading,
  pagecount,
  activePage,
  getUsers,
  formStates,
}) => {
  const renderTableRow = (value) => {
    return (
      <tr key={value._id}>
        <td>{value.username}</td>
        <td>{value.name}</td>
        <td>{value.position}</td>
        <td>{value.institution}</td>
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
      </tr>
    );
  };

  const handleSelectPage = (pageKey) => {
    // dataFilterr จาก การกด Pagination
    if (!!formStates) {
      let valueFilter = {
        username: formStates.username,
        name: formStates.name,
        isBlank: !!formStates.username || !!formStates.name ? false : true,
      };
      window.scrollTo(0, 0);
      loading(LOADING.getUsers);
      getUsers({ ...valueFilter, pageKey });
    } else {
      window.scrollTo(0, 0);
      loading(LOADING.getUsers);
      getUsers({ pageKey, isBlank: true });
    }
  };

  return (
    <div>
      <Row style={{ marginBottom: "15px" }}></Row>
      <Table responsive striped>
        <thead>
          <tr>
            <th width={150}>ชื่อผู้ใช้งาน</th>
            <th width={150}>ชื่อ-นามสกุล</th>
            <th width={150}>ตำแหน่ง</th>
            <th width={200}>หน่วยงาน</th>
            <th width={150}>การกำหนดสิทธิ์</th>
            <th width={150}>วันที่เข้าใช้งานล่าสุด</th>
            <th width={150}>สถานะ</th>
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
    formStates: getFormValues("UserFilterUser")(state),
    pagecount: state.user.pagecount,
    activePage: state.user.activePage,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "UserTableUser",
  })(UserTableUser),
);
