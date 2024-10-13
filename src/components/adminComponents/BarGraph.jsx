import React from 'react';
import Chart from "react-apexcharts";
import { CardTitle } from '../ui/card';

const BarGraph = ({values}) => {
    const state = {
        options: {
          chart: {
            type: "bar",
            toolbar: {
              show: false,
            },
          },
          tooltip: {
            theme: "auto",
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              borderRadiusApplication: 'end',
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: ['Products', 'Orders', 'Customers', 'Sellers'],
            title: {
                text: "Count",
                style: {
                  color: "#da4444"
                },
              },
              labels: {
                style: {
                  colors: "#da3333"
                }
              },
              min: 0,
          },
          yaxis: {
            title: {
              text: "Categories",
              style: {
                color: "#da4444"
              },
            },
            labels: {
              style: {
                colors: "#da3333"
              }
            },
            min: 0,
          },
        },
        series: [{ name: "Count", data: values }],
      }
  return (
    <div className='w-full h-full'>
        <CardTitle>Overview</CardTitle>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default BarGraph
