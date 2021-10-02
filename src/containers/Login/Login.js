import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions";
import { Field, FieldArray, reduxForm } from "redux-form";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { renderFieldWithTopLabel } from "../../components/FormHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import LOADING from "../../redux/actions/loading_key";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "กรุณากรอกชื่อผู้ใช้งาน";
  }
  if (!values.password) {
    errors.password = "กรุณากรอกรหัสผ่าน";
  }

  return errors;
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.logoutUser();
  }

  handleFormSubmit(value) {
    this.props.loading(LOADING.login);
    this.props.loginUser(value.username, value.password);
    this.props.getDashboard();
  }

  render() {
    const { errorLogin, handleSubmit } = this.props;

    return (
      <div id="auth-container" className="login">
        <div id="auth-row">
          <div id="auth-cell">
            <Container fluid style={{ height: "100%" }}>
              <Row style={{ height: "100%" }}>
                <Col xs={12} md={6}>
                  <Row className="login-header">
                    <Col xs={12}>
                      <img
                        src={"/imgs/logo.png"}
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                          width: "50%",
                          marginTop: "220px",
                        }}
                      />
                      <Row>
                        <Col
                          xs={12}
                          style={{
                            textAlign: "center",
                            marginTop: 80,
                            fontSize: "25px",
                          }}
                        >
                          <b>ระบบฐานข้อมูล</b>
                          <div style={{ marginTop: "20px" }}>
                            <b>คณะกรรมการสิ่งแวดล้อมแห่งชาติ</b>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col xs={12} md={6} className="login">
                  <Row className="login-body">
                    <Col xs={12}>
                      <Row>
                        <Col
                          xs={12}
                          style={{
                            textAlign: "center",
                            marginTop: 100,
                            fontSize: "25px",
                          }}
                        >
                          <b style={{ borderBottom: "5px solid #FFD700" }}>
                            ลงชื่อเข้าสู่ระบบสำหรับเจ้าหน้าที่
                          </b>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          xs={8}
                          style={{
                            marginLeft: "120px",
                            marginTop: "50px",
                          }}
                        >
                          <Form
                            onSubmit={handleSubmit(
                              this.handleFormSubmit.bind(this),
                            )}
                          >
                            <Field
                              controlId="username"
                              name="username"
                              component={renderFieldWithTopLabel}
                              label="ชื่อผู้ใช้งาน"
                              isRequire={true}
                            />

                            <Field
                              controlId="password"
                              name="password"
                              component={renderFieldWithTopLabel}
                              type="password"
                              label="รหัสผ่าน"
                              isRequire={true}
                            />
                            <Row>
                              <Col style={{ textAlign: "center" }}>
                                <Button
                                  variant="primary"
                                  type="submit"
                                  style={{
                                    width: "30%",
                                    marginTop: 20,
                                    // marginLeft: "170px",
                                  }}
                                >
                                  <FontAwesomeIcon
                                    style={{ marginRight: 10 }}
                                  />
                                  ลงชื่อเข้าใช้
                                </Button>
                              </Col>
                            </Row>
                          </Form>
                          <Row>
                            <Col
                              xs={{ span: 8, offset: 2 }}
                              style={{ marginTop: 13, textAlign: "center" }}
                            >
                              <span>
                                หากไม่สามารถเข้าสู่ระบบได้หรือต้องการลงทะเบียน
                                โปรดติดต่อฝ่ายเลขานุการ กก.วล. โทร 0 2265 6610
                              </span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    errorLogin: state.login.error,
  };
}

export default reduxForm({
  form: "Login",
  validate,
})(connect(mapStateToProps, mapDispatchToProps)(Login));
