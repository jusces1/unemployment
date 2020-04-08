const Highcharts = require("highcharts/highstock");
const colors = [
  "#66E1D3",
  "#CFCDAC",
  "#D0AC94",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933"
];

export function convertData(response, start, columns, yAxis) {
  const data = response.getDataTable().eg;
  const headers = response.getDataTable().Ff;
  const chartData = [];
  data.forEach(arr => {
    let counter = 0;
    for (let i = start; i < headers.length; i++) {
      if (headers[i].label) {
        if (columns && columns.length)
          if (!columns.includes(headers[i].label)) continue;

        if (!chartData[counter]) {
          chartData[counter] = {
            name: headers[i].label,
            id: ``,
            yAxis: yAxis ? (counter ? 0 : 1) : 0,
            data: [],
            color: yAxis
              ? yAxis[counter].labels
                ? yAxis[counter].labels.style.color
                : "#000000"
              : undefined,
            tooltip: {
              valueDecimals: 2
            }
          };
        }
        if (arr.c[0]) {
          chartData[counter].data.push([
            arr.c[0] ? new Date(arr.c[0].v).getTime() : 0,
            arr.c[i] ? parseFloat(arr.c[i].v) : 0
          ]);
        }

        counter++;
      }
    }
  });

  const newChartData = chartData.flatMap((rec, index) => [
    { ...rec, id: `id-${index}` },
    {
      name: `Linear regression for ${rec.name}`,
      color: colors[index],
      yAxis: rec.yAxis,
      id: "testas" + index,
      visible: false,
      data: getLinearRegression(
        rec.data.map(rec => rec[0]),
        rec.data.map(rec => rec[1])
      ).values,
      events: {
        show: function() {
          const chart = Highcharts.charts.find(Boolean);
          chart.redraw();
        }
      }
    }
  ]);
  console.log({ data, chartData: newChartData });
  return { data, chartData: newChartData };
}

export function creatGreyArray(
  data,
  geryArreasArray,
  headers,
  recession,
  color
) {
  let found = false;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].c.length; j++) {
      if (headers[j].label === recession && data[i].c[j] && !found) {
        found = true;
        geryArreasArray.push({
          from: new Date(data[i].c[0].v).getTime(),
          to: null,
          color: color, // Color value,
          id: recession
        });
      } else if (headers[j].label === recession && !data[i].c[j] && found) {
        found = false;
        geryArreasArray[geryArreasArray.length - 1].to = new Date(
          data[i - 1].c[0].v
        ).getTime();
      }
    }
  }
  return geryArreasArray;
}

function getLinearRegression(xData, yData) {
  var sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumX2 = 0,
    linearData = [],
    linearXData = [],
    linearYData = [],
    n = xData.length,
    axisIsOrdinal = false,
    alpha,
    beta,
    i,
    x,
    y;

  // Get sums:
  for (i = 0; i < n; i++) {
    x = xData[i];
    y = yData[i] ? yData[i] : 0;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
  }

  // Get slope and offset:
  alpha = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  if (isNaN(alpha)) {
    alpha = 0;
  }
  beta = (sumY - alpha * sumX) / n;

  // Calculate linear regression:
  for (i = 0; i < n; i++) {
    x = xData[i];
    y = alpha * x + beta;

    // Prepare arrays required for getValues() method
    linearData[i] = [x, y];
    linearXData[i] = x;
    linearYData[i] = y;
  }

  // If xAxis is ordinal return only first and last data value to avoid kinking the line when some values are null's.
  return axisIsOrdinal
    ? {
        xData: [linearXData[0], linearXData[linearXData.length - 1]],
        yData: [linearYData[0], linearYData[linearYData.length - 1]],
        values: [linearData[0], linearData[linearData.length - 1]]
      }
    : {
        xData: linearXData,
        yData: linearYData,
        values: linearData
      };
}

export function afterSetExtremes(event, thisChart) {
  const chart = Highcharts.charts.find(Boolean);
  for (let i = 0; i < thisChart.userOptions.series.length; i++) {
    if (!thisChart.userOptions.series[i].id.includes("testas")) {
      const data = thisChart.userOptions.series[i].data.filter(
        item => item[0] <= event.userMax && item[0] > event.userMin
      );
      for (let j = 0; j < thisChart.userOptions.series.length; j++) {
        if (
          thisChart.userOptions.series[j].id.includes("testas") &&
          thisChart.userOptions.series[j].name.includes(
            thisChart.userOptions.series[i].name
          )
        ) {
          if (data.length) {
            chart.series[j].setData(
              getLinearRegression(
                data.map(rec => rec[0]),
                data.map(rec => rec[1])
              ).values
            );
          }
        }
      }
    }
  }
}
