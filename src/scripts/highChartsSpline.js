import { collectGreyAreas } from "./spline";
import { convertData } from "./utils";
import { LOADER, CHART_MAIN_CONTAINER, CHART_NOT_EXISTS } from "./constants";

export function initlibrary(data) {
  google.charts.load("current", { packages: ["corechart"] });
  document.getElementById("main-container").innerHTML = CHART_MAIN_CONTAINER;
  document.getElementById("container").innerHTML = LOADER;
  google.charts.setOnLoadCallback(() =>
    createChart({
      elementId: data.elementId,
      sheetId: data.sheetId,
      gId: data.charts["spvsunemployment"].gId,
      yAxis: [
        {
          gridLineWidth: 0,
          title: {
            text: data.charts["spvsunemployment"].yAxisTitle[0]
          }
        },
        {
          opposite: false,
          title: {
            text: data.charts["spvsunemployment"].yAxisTitle[1],
            style: {
              color: "#6391de"
            }
          },
          labels: {
            style: {
              color: "#6391de"
            }
          }
        }
      ],
      start: 2,
      columns: data.charts["spvsunemployment"].columns,
      recession: data.charts["spvsunemployment"].recession,
      credits: data.charts["spvsunemployment"].credits,
      caption: data.charts["spvsunemployment"].caption
    })
  );

  document.getElementById("chart-select").addEventListener("change", e => {
    document.getElementById("btn-data-points").checked = false;
    document.getElementById("title").innerHTML =
      e.target.options[e.target.selectedIndex].text;
    document.getElementById("container").innerHTML = LOADER;
    const manrecession = document.getElementById("manrecesion-cont");

    if (e.target.value === "usmanufacturindex") {
      manrecession.style.cssText = "display: inline-block;";
    } else {
      manrecession.style.cssText = "display: none;";
    }
    if (e.target.value === "spvsunemployment") {
      google.charts.setOnLoadCallback(() =>
        createChart({
          elementId: data.elementId,
          sheetId: data.sheetId,
          gId: data.charts[e.target.value].gId,
          yAxis: [
            {
              gridLineWidth: 0,
              title: {
                text: data.charts[e.target.value].yAxisTitle[0]
              }
            },
            {
              opposite: false,
              title: {
                text: data.charts[e.target.value].yAxisTitle[1],
                style: {
                  color: "#6391de"
                }
              },
              labels: {
                style: {
                  color: "#6391de"
                }
              }
            }
          ],
          start: 2,
          columns: data.charts[e.target.value].columns,
          recession: data.charts[e.target.value].recession,
          credits: data.charts[e.target.value].credits,
          caption: data.charts[e.target.value].caption
        })
      );
    } else if (data.charts[e.target.value]) {
      google.charts.setOnLoadCallback(() =>
        createChart({
          elementId: data.elementId,
          sheetId: data.sheetId,
          gId: data.charts[e.target.value].gId,
          yAxisTitle: data.charts[e.target.value].yAxisTitle,
          columns: data.charts[e.target.value].columns,
          limit: data.charts[e.target.value].limitYaxis,
          tickMark: data.charts[e.target.value].tickMark,
          recession: data.charts[e.target.value].recession,
          start: 2,
          credits: data.charts[e.target.value].credits,
          caption: data.charts[e.target.value].caption
        })
      );
    } else {
      document.getElementById("container").innerHTML = CHART_NOT_EXISTS;
    }
  });
}

function parseData(
  response,
  elementId,
  sheetId,
  yAxisTitle,
  gId2,
  start,
  columns,
  recession,
  limit,
  yAxis,
  tickMark,
  credits,
  caption
) {
  //Error handling.
  if (response.isError()) {
    console.log(response, "isError");
  }

  //No errors, proceed.
  const { data, chartData } = convertData(response, start, columns, yAxis);
  const headers = response.getDataTable().Ff;
  const queryQuaterly = new google.visualization.Query(
    `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?gid=${gId2}&headers=1&tq=`
  );

  if (gId2 && Object.keys(recession).filter(item => item !== gId2).length > 0) {
    queryQuaterly.send(response =>
      collectGreyAreas(
        data,
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
      )
    );
  } else {
    collectGreyAreas(
      data,
      null,
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
    );
  }
}

//send response to draw function.
function createChart(data) {
  var query = new google.visualization.Query(
    `https://docs.google.com/spreadsheets/d/${data.sheetId}/gviz/tq?gid=${data.gId[0]}&headers=1&tq=`
  );
  query.send(response =>
    parseData(
      response,
      data.elementId,
      data.sheetId,
      data.yAxisTitle,
      data.gId[1],
      data.start,
      data.columns,
      data.recession,
      data.limit,
      data.yAxis,
      data.tickMark,
      data.credits,
      data.caption
    )
  );
}
