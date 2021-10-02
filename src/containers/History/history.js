import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import { reduxForm, getFormValues, autofill } from "redux-form";
import { Container, Row, Col, Table } from "react-bootstrap";
import LOADING from "../../redux/actions/loading_key";
import FilterHistory from "./Filter/FilterHistory";
import { getDateTimeFromStringDate } from "../../utils/DateUtils";
import PaginationBasic from "../../components/PaginationBasic";
import DataEmpty from "../../components/DataEmpty";
import moment from "moment";
const defaultStartTime = moment()
  .hour(0)
  .minute(0)
  .second(0)
  .format("YYYY-MM-DDTHH:mm:ss");

const defaultEndTime = moment().format("YYYY-MM-DDTHH:mm:ss");
class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: "",
      columnSort: "",
      sortType: "",
      stateFilter: "",
    };
  }

  componentDidMount() {
    this.props.loading(LOADING.getHistory);
    this.props.getHistory({
      startdate: defaultStartTime,
      enddate: defaultEndTime,
      pageKey: 1,
    });
  }

  renderTableRow(history) {
    return (
      <tr key={history._id}>
        <td>{getDateTimeFromStringDate(history.datetime)}</td>
        <td>{history.username}</td>
        <td>{history.clientIP}</td>
        <td>{history.activity}</td>
        <td>{history.status === "success" ? "สำเร็จ" : "ผิดปกติ"}</td>
      </tr>
    );
  }

  refreshPage(pageKey) {
    this.props.loading(LOADING.getHistory);
    this.props.getHistory({ pageKey });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.refreshPage !== this.props.refreshPage) {
      if (this.props.refreshPage) {
        this.refreshPage();
      }
    }
  }
  handleSelectPage(pageKey) {
    const { formStates } = this.props;

    let valueFilter = {
      username: formStates.username,
      startdate: formStates.startdate.format("YYYY-MM-DDTHH:mm:ss"),
      enddate: formStates.enddate.format("YYYY-MM-DDTHH:mm:ss"),
    };
    window.scrollTo(0, 0);

    this.props.loading(LOADING.getHistory);
    this.props.getHistory({ ...valueFilter, pageKey });
  }
  renderData() {
    const { history, pagecount, activePage } = this.props;
    return (
      <div>
        <Row style={{ marginBottom: "15px" }}></Row>
        <Table responsive striped>
          <thead>
            <tr>
              <th width={150}>วันที่เวลา</th>
              <th width={200}>ชื่อผู้ใช้งาน</th>
              <th>Client IP</th>
              <th>กิจกรรม</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {typeof history.map === "function" && history.length > 0 ? (
              history.map((item) => {
                return this.renderTableRow(item);
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
            onSelect={(eventKey) => this.handleSelectPage(eventKey)}
          />
        </Col>
      </div>
    );
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Container fluid className="box">
              <Row>
                <Col xs={6}>
                  <h3>ประวัติการเข้าใช้งาน</h3>
                </Col>
              </Row>

              <Col xs={12}>
                <FilterHistory />
              </Col>
              <Row
                xs={12}
                style={{
                  borderBottom: "1px solid #dddddd",
                  marginTop: "15px",
                }}
              ></Row>
              {this.renderData()}
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    formStates: getFormValues("FilterHistory")(state),
    history: state.history.history,
    refreshPage: state.history.refreshPage,
    pagecount: state.history.pagecount,
    activePage: state.history.activePage,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: "History",
  })(History),
);
