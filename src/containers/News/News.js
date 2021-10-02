import React from "react";

import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/actions/index";
import { reduxForm } from "redux-form";

import { Container, Row, Col, Button } from "react-bootstrap";
import TableNews from "./Table/TableNews";
import FilterNews from "./Filter/NewsFilterAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import LOADING from "../../redux/actions/loading_key";

class News extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: "",
      columnSort: "",
      sortType: "",
    };
  }

  componentDidMount() {
    this.props.loading(LOADING.getNews);
    this.props.getNews({ pageKey: 1 });
  }

  onCreateNews() {
    this.props.showCreateNews();
  }

  refreshPage() {
    this.props.loading(LOADING.getNews);
    this.props.getNews({ pageKey: 1 });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.refreshPage !== this.props.refreshPage) {
      if (this.props.refreshPage) {
        this.refreshPage();
      }
    }
  }

  render() {
    const { news } = this.props;
    return (
      <Container fluid className="box">
        <Row>
          <Col xs={6}>
            <h3>{"ข่าวประชาสัมพันธ์"}</h3>
          </Col>

          <Col xs={6} style={{ textAlign: "right" }}>
            <Button onClick={() => this.onCreateNews()}>
              <FontAwesomeIcon
                icon={faPlus}
                style={{ fontSize: 18, marginRight: 15 }}
              />
              สร้าง
            </Button>
          </Col>
        </Row>
        <Col xs={12}>
          <FilterNews />
        </Col>
        <Row
          xs={12}
          style={{
            borderBottom: "1px solid #dddddd",
            marginTop: "15px",
          }}
        ></Row>
        <TableNews dataSource={news} />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    location: state.router.location,
    news: state.news.news,
    refreshPage: state.news.refreshPage,
  };
}

export default reduxForm({
  form: "News",
})(connect(mapStateToProps, mapDispatchToProps)(News));
