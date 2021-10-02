import React from "react";
import { Row, Col } from "react-bootstrap";
const DataEmpty = (props) => {
  return (
    <tr>
      <td colSpan={props.colSpan}>
        <Row>
          <Col md={12} className="data-empty">
            <img src={`/imgs/data/empty2.svg`} className="data-empty-img" />
            <span>ไม่มีข้อมูล</span>
          </Col>
        </Row>
      </td>
    </tr>
  );
};

export default DataEmpty;
