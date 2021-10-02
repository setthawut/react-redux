import React, { useEffect } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions";
import { reduxForm, Field, autofill, getFormValues } from "redux-form";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ChartViewDashbord from "../../components/ChartViewDashbord";
import ChartDownloadDashbord from "../../components/ChartDownloadDashbord";
import LOADING from "../../redux/actions/loading_key";
import { numberWithCommas } from "../../utils/NumberUtils";
import moment from "moment";
import { renderDatePickerWithoutLabel } from "../../components/DateTimeFormHelper";
import { faSearch, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validateDatePicker } from "../../utils/DateUtils";
import { Link, useHistory } from "react-router-dom";

const validate = (values) => {
  const errors = {};

  if (
    values.startDateTime &&
    !validateDatePicker(moment(values.startDateTime).format("DD/MM/YYYY"))
  ) {
    errors.startDateTime = "กรุณากดเลือกจากปฎิทิน";
  }
  if (
    values.endDateTime &&
    !validateDatePicker(moment(values.endDateTime).format("DD/MM/YYYY"))
  ) {
    errors.endDateTime = "กรุณากดเลือกจากปฎิทิน";
  }
  return errors;
};

const Dashboard = ({
  dashboards,
  getDashboard,
  loading,
  handleSubmit,
  dispatch,
}) => {
  const defaultStartTime = moment().add(-30, "d");

  const defaultEndTime = moment();
  useEffect(() => {
    loading(LOADING.getDashboard);
    getDashboard({
      startdate: moment().add(-30, "d").format("YYYY-MM-DDTHH:mm:ss"),
      enddate: moment().format("YYYY-MM-DDTHH:mm:ss"),
    });
    dispatch(autofill("Dashboard", "startDateTime", defaultStartTime));
    dispatch(autofill("Dashboard", "endDateTime", defaultEndTime));
  }, []);

  const renderDashbord = () => {
    var itemDownload = {};
    var itemView = {};
    typeof dashboards.map === "function" &&
      dashboards.map((item, i) => {
        if (item.type === "download") {
          itemDownload = item;
        } else if (item.type === "view") {
          itemView = item;
        }
      });

    return (
      <Row>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12} style={{ height: 500 }}>
              <div
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  fontSize: "25px",
                }}
              >
                <Col xs={12}>
                  <b style={{ borderBottom: "5px solid #FFD700" }}>
                    จำนวนผู้เข้าชม (ครั้ง)
                  </b>
                  <br />
                  <div style={{ marginTop: "20px" }}>
                    <b style={{ fontSize: 30 }}>
                      {numberWithCommas(itemView.detail.numberOfView.totalView)}
                    </b>
                  </div>
                </Col>
                <Row>
                  <Col xs={12} style={{ marginLeft: "40px" }}>
                    <ChartViewDashbord
                      id="chartViewDashbord"
                      chartData={{
                        label: itemView.detail.numberOfView.dateView.date,
                        value: itemView.detail.numberOfView.dateView.view,
                      }}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={6} style={{ borderLeft: "1px solid #DDD" }}>
          <Row>
            <Col xs={12} style={{ height: 500 }}>
              <div
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  fontSize: "25px",
                }}
              >
                <Col xs={12}>
                  <b style={{ borderBottom: "5px solid #FFD700" }}>
                    จำนวนดาวน์โหลด (ครั้ง)
                  </b>
                  <br />
                  <div style={{ marginTop: "20px" }}>
                    <b style={{ fontSize: 30 }}>
                      {numberWithCommas(
                        itemDownload.detail.numberOfDownload.totalDownload,
                      )}
                    </b>
                  </div>
                </Col>
                <Row>
                  <Col xs={12} style={{ marginLeft: "40px" }}>
                    <ChartDownloadDashbord
                      id="chartDownloadDashbord"
                      chartData={{
                        label:
                          itemDownload.detail.numberOfDownload.dateDownload
                            .date,
                        value:
                          itemDownload.detail.numberOfDownload.dateDownload
                            .download,
                      }}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  const HeaderFilter = () => {
    const mapFilterDashbordToRequest = (values) => {
      let data = {
        startdate: values.startDateTime
          ? moment(values.startDateTime).format("YYYY-MM-DDTHH:mm:ss")
          : moment().add(-30, "d").format("YYYY-MM-DDTHH:mm:ss"),
        enddate: values.endDateTime
          ? moment(values.endDateTime).format("YYYY-MM-DDTHH:mm:ss")
          : moment().format("YYYY-MM-DDTHH:mm:ss"),
        status: values.status,
      };

      return data;
    };
    const submitRenderFilter = async (values) => {
      window.scrollTo(0, 0);
      loading(LOADING.getDashboard);
      await getDashboard(mapFilterDashbordToRequest(values));
    };
    // const handlePdf = () => {
    //   // <Link target="_blank" to={`${API_URL}/documentfile/610e4d8f979e005493eac582`}>
    //   window.open(`${API_URL}/documentfile/610e4d8f979e005493eac582`, "_blank");
    //   // </Link>
    // };
    return (
      <Form onSubmit={handleSubmit((values) => submitRenderFilter(values))}>
        <Row>
          <Col xs={7} style={{ left: "310px" }}>
            <Form.Group controlId={"datetime"} as={Row}>
              <Col xs={4} style={{ textAlign: "right", marginTop: 10 }}>
                ช่วงวันที่:
              </Col>
              <Col xs={8}>
                <Row>
                  <Field
                    col={5}
                    controlId="startDateTime"
                    name="startDateTime"
                    component={renderDatePickerWithoutLabel}
                    placeholder="วันที่เริ่มต้น"
                  />
                  <Col sm={1} style={{ textAlign: "center", marginTop: 10 }}>
                    -
                  </Col>
                  <Field
                    col={5}
                    controlId="endDateTime"
                    name="endDateTime"
                    component={renderDatePickerWithoutLabel}
                    placeholder="วันที่สิ้นสุด"
                  />
                </Row>
              </Col>
            </Form.Group>
          </Col>
          <Col xs={4} style={{ left: "320px" }}>
            <Col xs={4}>
              <Button variant="primary" type="submit">
                <FontAwesomeIcon icon={faSearch} />
                ค้นหา
              </Button>
            </Col>
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <>
      <Container fluid className="box">
        <Row>
          <Col xs={3}>
            <h3>{"Dashboard"}</h3>
          </Col>
          <Col xs={9}> {HeaderFilter()}</Col>
        </Row>
        <Row
          xs={12}
          style={{
            borderBottom: "1px solid #dddddd",
            marginTop: "15px",
          }}
        ></Row>
        <Row style={{ marginBottom: "15px" }}></Row>
        <Row>
          <Col xs={12}>
            <div className="box">
              <Container fluid>{renderDashbord()}</Container>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  return {
    dashboards: state.dashboard.dashboard,
    refreshPage: state.dashboard.refreshPage,
    formStates: getFormValues("Dashboard")(state),
  };
}

export default reduxForm({
  form: "Dashboard",
  validate,
})(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
