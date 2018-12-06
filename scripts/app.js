// open the drawer menu from the left
function openSlideMenu() {
  document.getElementById("menu").style.width = "250px";
}

// close the drawer menu
function closeSlideMenu() {
  document.getElementById("menu").style.width = "0px";
}

// TODO should ideally place a spinner while waiting for results to build
function searchHandler() {
  document.getElementById(
    "app"
  ).innerHTML = '<iframe id="frame" src="views/search-results.html"></iframe>';
}

// Replaces the current app with the map
function openMap() {
  document.getElementById(
    "app"
  ).innerHTML = '<iframe id="frame" src="views/astc-map.html"></iframe>';
  closeSlideMenu();
}

function shop(){
  console.log("start");
    var iframe = document.getElementById("frame");
    //console.log(iframe);
    //console.log(iframe.contentWindow.document.getElementById("map").innerHTML);
    var selectedtarget = iframe.contentWindow.document.getElementById("BR");

    selectedtarget.classList.toggle("selectedshop");
    //console.log(selectedtarget.classList);
    //selectedtarget.classlist.add("test-2-success");
    //console.log(selectedtarget.classList);
}

