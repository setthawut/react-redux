import React from "react";
import PropTypes from "prop-types";
import i18n from "../i18n";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../redux/actions";
import { Nav, Navbar, NavDropdown, Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { API_URL } from "../constants";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "dashboard",
    };
  }

  componentDidMount() {
    const { location } = this.props;
    this.setState({ page: location.pathname });
  }

  // isRenderMenu(menuNames) {
  //   const { user } = this.props;

  //   if (user.user.Username == "root") return true;

  //   var isRender = false;
  //   menuNames.forEach((menuName) => {
  //     if (user.views.indexOf(menuName) > -1) {
  //       isRender = true;
  //     }
  //   });
  //   return isRender;
  // }

  render() {
    const { user } = this.props;

    const views = [
      {
        name: "Dashboard",
        eventKey: "dashboard",
        to: "/dashboard",
        role: ["admin", "user"],
      },
      {
        name: "ข่าวประชาสัมพันธ์",
        eventKey: "news",
        to: "/news",
        role: ["admin"],
      },
      {
        name: "ประชุม กก.วล.",
        eventKey: "meeting",
        to: "/meeting",
        role: ["admin", "user"],
      },
      {
        name: "ประกาศ / คำสั่ง",
        eventKey: "notify",
        to: "/notify",
        role: ["admin", "user"],
      },
      {
        name: "กฎหมายที่เกี่ยวข้อง",
        eventKey: "law",
        to: "/law",
        role: ["admin", "user"],
      },
      {
        name: "เรื่องร้องเรียน กก.วล.",
        eventKey: "appeal",
        to: "/appeal",
        role: ["admin"],
      },
      {
        name: "ผู้ทรงคุณวุฒิ",
        eventKey: "qualifiedperson",
        to: "/qualifiedperson",
        role: ["admin"],
      },

      {
        name: "คดีที่ กก.วล. เป็นผู้ถูกฟ้อง",
        eventKey: "defendant",
        to: "/defendant",
        role: ["admin"],
      },

      {
        name: "ผู้ใช้งาน",
        eventKey: "/setting/users",
        to: "/setting/users",
        role: ["user"],
      },

      {
        name: "เปลี่ยนรหัสผ่าน",
        eventKey: "/setting/resetpasswordme",
        to: "/setting/resetpasswordme",
        role: ["user"],
      },
    ];

    if (!!user) {
      const { page } = this.state;

      return (
        <div id="header">
          <Navbar>
            <Navbar.Collapse>
              <Nav
                className="mr-auto"
                activeKey={page}
                onSelect={(eventKey) =>
                  this.setState({
                    page: eventKey,
                  })
                }
              >
                {views.map((item) =>
                  item.role.includes(user.roles) ? (
                    <>
                      <Nav.Item>
                        <Nav.Link
                          as={Link}
                          to={item.to}
                          eventKey={item.eventKey}
                        >
                          {item.name}
                        </Nav.Link>
                      </Nav.Item>
                    </>
                  ) : (
                    ""
                  ),
                )}
                <Nav.Link
                  onClick={() =>
                    window.open(`/imgs/manual.pdf`, "_blank")
                  }
                >
                  คู่มือการใช้งาน
                </Nav.Link>
                {user.roles === "admin" ? (
                  <NavDropdown
                    title="ตั้งค่า"
                    id="basic-nav-dropdown"
                    className={
                      this.state.page.indexOf("/setting") == 0 ? "active" : ""
                    }
                  >
                    <NavDropdown.Item
                      as={Link}
                      to="/setting/history"
                      eventKey="/setting/history"
                    >
                      ประวัติการใช้งาน
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/setting/users"
                      eventKey="/setting/users"
                    >
                      ผู้ใช้งาน
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/setting/resetpasswordme"
                      eventKey="/setting/resetpasswordme"
                    >
                      เปลี่ยนรหัสผ่าน
                    </NavDropdown.Item>
                    <Dropdown.Divider />
                    <NavDropdown.Item
                      as={Link}
                      to="/setting/banner"
                      eventKey="/setting/banner"
                    >
                      ตั้งค่า- แบนเนอร์
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/setting/address"
                      eventKey="/setting/address"
                    >
                      ตั้งค่า- ที่อยู่
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      as={Link}
                      to="/setting/propose"
                      eventKey="/setting/propose"
                    >
                      ตั้งค่า- ขั้นตอน/เรื่อง ที่ต้องเสนอ กก.วล.
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/setting/publicFile"
                      eventKey="/setting/publicFile"
                    >
                      ตั้งค่า- เอกสารเผยแพร่
                    </NavDropdown.Item>
                    <Dropdown.Divider />
                    <NavDropdown.Item
                      as={Link}
                      to="/setting/aboutus"
                      eventKey="/setting/aboutus"
                    >
                      เกี่ยวกับเรา - ประวัติความเป็นมา
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/setting/configuration"
                      eventKey="/setting/configuration"
                    >
                      เกี่ยวกับเรา - องค์ประกอบ/อำนาจหน้าที่
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/setting/officeOfQualification"
                      eventKey="/setting/officeOfQualification"
                    >
                      เกี่ยวกับเรา - ทำเนียบผู้ทรงคุณวุฒิ
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : null}

                <Nav.Link
                  to="/login"
                  onClick={() => {
                    this.props.logoutUser(),
                      this.setState({ page: "dashboard" });
                  }}
                  className="justify-content-end"
                >
                  ลงชื่อออก
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      );
    } else {
      return null;
    }
  }
}

Header.propTypes = {};

function mapStateToProps(state) {
  return {
    location: state.router.location,
    user: state.login.user,
  };
}

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(Header),
);
