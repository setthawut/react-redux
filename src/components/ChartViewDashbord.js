import React from "react";
import moment from "moment";

class ChartViewDashbord extends React.Component {
  constructor(props) {
    super(props);

    this.chart;

    this.state = {};
  }

  componentDidMount() {
    const { period } = this.props;

    var chart = c3.generate({
      bindto: `#${this.props.id}`,
      data: {
        x: "x",
        xFormat: "%Y-%m-%d",
        columns: [["x"], ["จำนวนผู้เข้าชม"]],
        types: {
          Total: "line",
          จำนวนผู้เข้าชม: "line",
        },
        colors: {
          Total: "#2E59A3",
          จำนวนผู้เข้าชม: "#2E59A3",
        },
        borderWidth: 2,
      },
      axis: {
        x: {
          type: "timeseries",
          localtime: false,
          tick: {
            format: function (x) {
              return moment(x).add(7, "hours").format("DD/MM/YYYY");
            }.bind(this),
          },
        },
        y: {
          label: {
            text: "ครั้ง",
            position: 'outer-middle',
          },
          min: 0,
          padding: { top: 20, bottom: 0 },
        },
      },
      point: {
        r: 2,
        focus: {
          expand: {
            r: 3,
          },
        },
      },

      grid: {
        y: {
          show: false,
        },
      },
    });
    this.chart = chart;
  }

  updateValue() {
    if (!!this.chart) {
      const { chartData } = this.props;

      this.chart.load({
        columns: [
          ["x", ...(!!chartData.label ? chartData.label : [])],
          ["จำนวนผู้เข้าชม", ...(!!chartData.value ? chartData.value : [])],
        ],
      });
    }
  }

  render() {
    const { id } = this.props;

    this.updateValue();

    return <div id={id} style={{ width: "80%", height: "100%" }}></div>;
  }
}

export default ChartViewDashbord;
