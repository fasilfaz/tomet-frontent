import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Chart from "react-apexcharts";
import { getTotalSalesByDateForSeller } from "@/redux/features/orders/orderSlice";
import { CardTitle } from "../ui/card";

const AreaGraph = () => {
  const [sales, setSales] = useState([]);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    options: {
      chart: {
        type: "area",
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        theme: "auto",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
          style: {
            color: "#da4444"
          }
        },
        labels: {
          style: {
            colors: "#da3333"
          }
        },
        style: {
          color: "#666"
        }
      },
      yaxis: {
        title: {
          text: "Sales",
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
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    dispatch(getTotalSalesByDateForSeller())
      .unwrap()
      .then((res) => {
        setSales(res.data);
      })
      .catch((err) => console.log(err));

  }, [dispatch]);

  useEffect(() => {
    if (sales.length > 0) {
      const formattedSalesData = sales.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesData.map((item) => item.x),
          },
        },
        series: [
          { name: "Sales", data: formattedSalesData.map((item) => item.y) },
        ],
      }));
    }
  }, [sales]);

  return (
    <div className="h-full w-full">
      <CardTitle>Sales Trend</CardTitle>
      <Chart
        options={state.options}
        series={state.series}
        type="area"
        width="100%"
      />
    </div>
  );
};

export default AreaGraph;
