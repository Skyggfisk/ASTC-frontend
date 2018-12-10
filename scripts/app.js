// open the drawer menu from the left
function openSlideMenu() {
  document.getElementById("menu").style.width = "250px";
}

// close the drawer menu
function closeSlideMenu() {
  document.getElementById("menu").style.width = "0px";
}

function loadHome() {

    var homecontent = document.getElementById("content-home");
    homecontent.classList.replace("inactivepage", "activepage");

    var mapcontent = document.getElementById("content-map")
    mapcontent.classList.replace("activepage", "inactivepage");

    var aboutcontent = document.getElementById("content-about")
    aboutcontent.classList.replace("activepage", "inactivepage");

    closeSlideMenu();
}

function loadMap() {

    var homecontent = document.getElementById("content-home");
    homecontent.classList.replace("activepage", "inactivepage");

    var mapcontent = document.getElementById("content-map")
    mapcontent.classList.replace("inactivepage", "activepage");

    var aboutcontent = document.getElementById("content-about")
    aboutcontent.classList.replace("activepage", "inactivepage");

    closeSlideMenu();
}

function loadAbout() {

    var homecontent = document.getElementById("content-home");
    homecontent.classList.replace("activepage", "inactivepage");

    var mapcontent = document.getElementById("content-map")
    mapcontent.classList.replace("activepage", "inactivepage");

    var aboutcontent = document.getElementById("content-about")
    aboutcontent.classList.replace("inactivepage", "activepage");

    closeSlideMenu();
}

// TODO should ideally place a spinner while waiting for results to build
//function searchHandler() {
//  document.getElementById(
//    "app"
//  ).innerHTML = '<iframe id="frame" src="views/search-results.html"></iframe>';
//}
function searchHandler() {
    window.location.href("search.html")

    fetch('https://localhost:44320/api/products')
        .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            response.json().then(function (data) {
                console.log(data);
            });


        }
    )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });

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

