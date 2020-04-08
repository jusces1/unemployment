export function createEvents(chart) {
  const datapointsBtn = document.getElementById("btn-data-points");
  const shadingbtn = document.getElementById("btn");
  const manrecession = document.getElementById("btn-man-recesion");
  manrecession.addEventListener("click", () => {
    showHideCharts(chart, "U.S. Manufacturing Recession");
  });
  shadingbtn.addEventListener("click", () => {
    showHideCharts(chart, "Recessions");
  });

  datapointsBtn.addEventListener("click", () => {
    chart.options.plotOptions.series.marker.enabled = !chart.options.plotOptions
      .series.marker.enabled;
    for (let i = 0; i < chart.series.length; i++) {
      chart.series[i].update();
    }
  });
}

function showHideCharts(chart, id) {
  chart.xAxis[0].plotLinesAndBands.forEach(el => {
    if (el.svgElem != undefined) {
      if (el.id === id) {
        el.svgElem[el.visible ? "show" : "hide"]();
        el.visible = !el.visible;
      }
    }
  });
}
