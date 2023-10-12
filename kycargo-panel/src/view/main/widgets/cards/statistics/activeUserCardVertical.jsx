import React, { useEffect, useState } from "react";

import { Row, Col } from "antd";
import { ExportSquare } from "iconsax-react";
import Chart from "react-apexcharts";

export default function ActiveUserCardVertical() {
  const [chartWidth, setChartWidth] = useState("50%")

  useEffect(() => {
    const timer = setTimeout(() => {
      setChartWidth("100%")
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  const [data] = useState({
    series: [40],
    options: {
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: false,
        padding: {
          left: -24,
          right: -24,
          top: -12,
          bottom: -16,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            size: '45%',
          },
          track: {
            show: true,
            background: "#ffffff",
            strokeWidth: '100%',
            opacity: 1,
            margin: 0,
          },
          dataLabels: {
            show: true,
            value: {
              fontSize: "12px",
              color: "#FFC700",
              fontWeight: 500,
              offsetY: -11,
            },
            total: {
              show: true,
              fontSize: "12px",
              label: "",
              formatter: function (w) {
                return "%" + 40;
              },
            },
          },
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#FFD252"],
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        max: 100,
      },
      tooltip: {
        x: {
          show: false,
        },
      },
    },
  });

  return (
    <div className="hp-border-1 hp-overflow-hidden hp-border-color-black-40 hp-border-color-dark-80 hp-border-radius-xxl hp-bg-color-black-0 hp-bg-color-dark-100 hp-p-16 hp-card-2">
      <Row gutter={16} align="middle">
        <Col span={24} className="hp-text-center">
          <div
            id="chart"
            className="hp-bg-color-warning-4 hp-bg-color-dark-90 hp-border-radius-xl hp-d-flex-center-full hp-mb-18"
          >
            <Chart
              options={data.options}
              series={data.series}
              type="radialBar"
              width={chartWidth}
              height={92}
              legend="legend"
            />
          </div>

          <h3 className="hp-mb-0 hp-font-weight-600 hp-d-flex-full-center">
            <span>43,046</span>
            <ExportSquare
              size="20"
              variant="Bold"
              className="hp-ml-4"
            />
          </h3>

          <p className="hp-p1-body hp-mb-0 hp-text-color-black-80 hp-text-color-dark-50">
            Active Users
          </p>
        </Col>
      </Row>
    </div>
  );
}
