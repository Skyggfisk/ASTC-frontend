// open the drawer menu from the left
function openSlideMenu() {
  document.getElementById("menu").style.width = "250px";
}

// close the drawer menu
function closeSlideMenu() {
  document.getElementById("menu").style.width = "0px";
}

// TODO should ideally place a spinner while awaiting results to build
function searchHandler() {
  document.getElementById(
    "app"
  ).innerHTML = `<iframe src="views/search-results.html"></iframe>"`;
}

// Replaces the current app with the map
function openMap() {
  document.getElementById(
    "app"
  ).innerHTML = `<div id="map"><iframe src="views/astc-map.html"></iframe></div>`;
  closeSlideMenu();
}
