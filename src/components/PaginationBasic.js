import React from "react";

import { connect } from "react-redux";

import { Pagination } from "react-bootstrap";

class PaginationBasic extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  renderPage(num) {
    const { activePage } = this.props;
    const currentPage = parseInt(activePage);

    return (
      <Pagination.Item
        key={num}
        active={num == currentPage}
        onClick={(eventKey) => {
          if (!!eventKey.target.text) {
            this.props.onSelect(eventKey.target.text);
          }
        }}
      >
        {num}
      </Pagination.Item>
    );
  }

  render() {
    const { numberOfPage, activePage, handleSubmit } = this.props;
    let items = [];
    const currentPage = parseInt(activePage);

    if (numberOfPage > 10) {
      items.push(this.renderPage(1));

      if (currentPage > 7) {
        items.push(<Pagination.Ellipsis key={"ellipsis_start"} />);
      }
    }

    for (let number = 1; number <= numberOfPage; number++) {
      if (numberOfPage > 10) {
        if (
          currentPage + 5 >= number &&
          currentPage - 5 <= number &&
          number != 1 &&
          number != numberOfPage
        ) {
          items.push(this.renderPage(number));
        }
      } else {
        items.push(this.renderPage(number));
      }
    }

    if (numberOfPage > 10) {
      if (currentPage < numberOfPage - 6) {
        items.push(<Pagination.Ellipsis key={"ellipsis_last"} />);
      }
      items.push(this.renderPage(numberOfPage));
    }

    return (
      <Pagination>
        <Pagination.First
          onClick={() => {
            this.props.onSelect("1");
          }}
        />
        {items}
        <Pagination.Last
          onClick={() => {
            this.props.onSelect(numberOfPage + "");
          }}
        />
      </Pagination>
    );
  }
}

PaginationBasic.propTypes = {};

function mapStateToProps(state) {
  return {};
}

export default connect(null, null)(PaginationBasic);
