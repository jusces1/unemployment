export const LOADER = `<div>
<div class="loader">
  <svg class="circular" viewBox="25 25 50 50">
    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
  </svg>
  Loading...
</div>
</div>`;

const SELECT = `<select id="chart-select">
<option value="spvsunemployment" >S&P vs Unemployment</option>
<option value="yieldspread">Yield Spread, 5Y/2Y, 10Y/2</option>
<option value="corporatemargins">Corporate Margins</option>
<option value="usmanufacturindex">U.S. Manufacturing Index</option>
<option>Quarterly recession index</option>
<option>Quarterly diffusion index</option>
<option>Quarterly recession financial and nonfinancial subindexes</option>
<option>Monthly recession index</option>
<option>Profits vs. EPS</option>
<option>Total profits vs. non-S&P profits</option>
</select>`;

const SETTINGS_MENU = `<div class="menu-containter">
<div class="toggle margin-left-70">
  <span class="font" id="shading">Recession shading</span>
  <label class="switch">
    <input id="btn" type="checkbox" checked />
    <span class="slider round"></span>
  </label>
</div>
<div class="toggle  margin-left-20" id="manrecesion-cont" style="display: none;" >
  <span class="font" id="shading">Manufacturing Recessions</span>
  <label class="switch">
    <input id="btn-man-recesion" type="checkbox" checked />
    <span class="slider round"></span>
  </label>
</div>
<div class="toggle margin-left-20">
  <span class="font" id="shading">Data points</span>
  <label class="switch">
    <input id="btn-data-points" type="checkbox"  />
    <span class="slider round"></span>
  </label>
</div>
</div>
`;

export const CHART_MAIN_CONTAINER = `<span id="title" class="font">S&P vs Unemployment</span>
<div class="menu">
    ${SELECT}
    ${SETTINGS_MENU}
<div>
<div id="container"></div>`;

export const CHART_NOT_EXISTS = "<div>Chart not exist</div>";
