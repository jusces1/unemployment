import { creatGreyArray, afterSetExtremes } from "./utils";
import { createEvents } from "./events";
const Highcharts = require("highcharts/highstock");

function drawChart(
  chartData,
  elementId,
  geryArreasArray,
  yAxisTitle,
  limit,
  yAxis,
  tickMark,
  credits,
  caption
) {
  Highcharts.stockChart(
    elementId,
    {
      chart: {
        width: 800,
        height: caption ? 420 : 400
      },
      credits: {
        enabled: credits.enable,
        text: credits.text,
        position: {
          align: credits.position
        }
      },
      caption: {
        text: caption,
        // x: 60,
        align: "right"
      },
      rangeSelector: {
        allButtonsEnabled: true,
        buttons: [
          {
            type: "year",
            count: 1,
            text: "1Y",
            dataGrouping: {
              forced: true,
              units: [["week", [1]]]
            }
          },
          {
            type: "year",
            count: 5,
            text: "5Y",
            dataGrouping: {
              forced: true,
              units: [["week", [1]]]
            }
          },
          {
            type: "year",
            count: 10,
            text: "10Y",
            dataGrouping: {
              forced: true,
              units: [["week", [1]]]
            }
          },
          {
            type: "all",
            text: "All",
            dataGrouping: {
              forced: true,
              units: [["month", [1]]]
            }
          }
        ],
        selected: 4
      },
      yAxis: yAxis || {
        opposite: false,
        showLastLabel: true,
        title: {
          text: yAxisTitle
        },
        min: limit ? limit.min : null,
        max: limit ? limit.max : null,
        tickInterval: limit ? limit.max : null,

        tickPositioner: () => tickMark
      },
      xAxis: {
        plotBands: geryArreasArray,
        ordinal: true,
        events: {
          afterSetExtremes: function(event) {
            afterSetExtremes(event, this.chart);
          }
        }
      },
      plotOptions: {
        series: {
          showInLegend: true,
          allowPointSelect: true,
          marker: {
            enabled: false,
            radius: 4
          }
        }
      },
      legend: {
        enabled: true
      },
      series: chartData,
      exporting: {
        buttons: {
          contextButton: {
            menuItems: ["downloadPNG", "downloadSVG"],
            y: -2
          }
        }
      }
    },
    function(chart) {
      createEvents(chart);
    }
  );
}

export function collectGreyAreas(
  mainSpreadSheet,
  response,
  chartData,
  elementId,
  yAxisTitle,
  recession,
  headers,
  limit,
  yAxis,
  tickMark,
  credits,
  caption
) {
  //Error handling.
  if (response && response.isError()) {
    console.log(response, "isError");
  }
  let geryArreasArray = [];

  if (response) {
    const data = response.getDataTable().eg;
    const headers2 = response.getDataTable().Ff;
    geryArreasArray = creatGreyArray(
      data,
      geryArreasArray,
      headers2,
      recession[Object.keys(recession)[1]].name,
      recession[Object.keys(recession)[1]].color
    );
  }
  for (let i = 0; i < recession[Object.keys(recession)].length; i++) {
    geryArreasArray = creatGreyArray(
      mainSpreadSheet,
      geryArreasArray,
      headers,
      recession[Object.keys(recession)[0]][i].name,
      recession[Object.keys(recession)[0]][i].color
    );
  }

  drawChart(
    chartData,
    elementId,
    geryArreasArray,
    yAxisTitle,
    limit,
    yAxis,
    tickMark,
    credits,
    caption
  );
}
