const Highcharts = require("highcharts/highstock");

// Load module after Highcharts is loaded
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/data")(Highcharts);
require("highcharts/modules/pattern-fill")(Highcharts);
require("highcharts/indicators/regressions")(Highcharts);

import { initlibrary } from "./scripts/highChartsSpline";

import "./styles/style.css";

initlibrary({
  elementId: "container",
  sheetId: "1GqX6_4qXWTOfBiunduEAIOgljN9sRrGEHEH4ahbqgeQ",
  charts: {
    spvsunemployment: {
      yAxisTitle: ["Unemployment Rate", "S&P 500"],
      gId: ["107149301"],
      columns: ["Unemployment Rate", "S&P 500"],
      credits: {
        enable: true,
        text: "Highcharts.com",
        position: "right"
      },
      recession: {
        107149301: [{ name: "Recessions", color: "#CCCCCC" }]
      },
      caption: "Source: BLS, S&P, The GailFosler Group"
    },
    yieldspread: {
      yAxisTitle: "Percent",
      gId: ["1127970116"],
      columns: ["5Y/2Y", "10Y/2Y"],
      limitYaxis: {
        min: -2,
        max: 4
      },
      tickMark: [-2, 0, 2, 4],
      recession: {
        1127970116: [{ name: "Recessions", color: "#CCCCCC" }]
      },
      credits: {
        enable: true,
        text: "Highcharts.com",
        position: "right"
      },
      caption: "Source: Federal Reserve, The GailFosler Group"
    },
    corporatemargins: {
      yAxisTitle: "Percent",
      gId: ["1426623504"],
      columns: ["Pre-Tax Margins", "After-Tax Margins"],
      recession: {
        1426623504: [{ name: "Recessions", color: "#CCCCCC" }]
      },
      credits: {
        enable: true,
        text: "Highcharts.com",
        position: "right"
      },
      caption: "Source: BEA, The GailFosler Group"
    },
    usmanufacturindex: {
      yAxisTitle: "Percent",
      gId: ["107149301"],
      columns: [
        "U.S. Manufacturing Output Index",
        "U.S. Manufacturing Diffusion Index"
      ],
      tickMark: [-8, -4, 0, 4, 8],
      limitYaxis: {
        min: -8,
        max: 8
      },
      recession: {
        107149301: [
          { name: "Recessions", color: "#CCCCCC" },
          {
            name: "U.S. Manufacturing Recession",
            color: {
              pattern: {
                path: {
                  d: "M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11",
                  strokeWidth: 0.8
                },
                color: "#000",
                width: 3,
                height: 3,
                opacity: 0.3
              }
            }
          }
        ]
      },
      credits: {
        enable: true,
        text: "Highcharts.com",
        position: "right"
      },
      caption: "Source: BEA, The GailFosler Group"
    }
  }
});
