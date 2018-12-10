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
    homecontent.hidden = false;

    var mapcontent = document.getElementById("content-map");
    mapcontent.hidden = true;

    var aboutcontent = document.getElementById("content-about");
    aboutcontent.hidden = true;

    var searchbar = document.getElementById("search-bar");
    searchbar.hidden = false;

    var searchcontent = document.getElementById("content-searchresults");
    searchcontent.hidden = true;

    closeSlideMenu();
}

function loadMap() {

    var homecontent = document.getElementById("content-home");
    homecontent.hidden = true;

    var mapcontent = document.getElementById("content-map");
    mapcontent.hidden = false;

    var aboutcontent = document.getElementById("content-about");
    aboutcontent.hidden = true;

    var searchbar = document.getElementById("search-bar");
    searchbar.hidden = false;

    var searchcontent = document.getElementById("content-searchresults");
    searchcontent.hidden = true;

    closeSlideMenu();
}

function loadAbout() {

    var homecontent = document.getElementById("content-home");
    homecontent.hidden = true;

    var mapcontent = document.getElementById("content-map");
    mapcontent.hidden = true;

    var aboutcontent = document.getElementById("content-about");
    aboutcontent.hidden = false;

    var searchbar = document.getElementById("search-bar");
    searchbar.hidden = true;

    var searchcontent = document.getElementById("content-searchresults");
    searchcontent.hidden = true;

    closeSlideMenu();
}

// TODO should ideally place a spinner while waiting for results to build
//function searchHandler() {
//  document.getElementById(
//    "app"
//  ).innerHTML = '<iframe id="frame" src="views/search-results.html"></iframe>';
//}
function searchHandler() {
    var homecontent = document.getElementById("content-home");
    homecontent.hidden = true;

    var mapcontent = document.getElementById("content-map");
    mapcontent.hidden = true;

    var aboutcontent = document.getElementById("content-about");
    aboutcontent.hidden = true;

    var searchcontent = document.getElementById("content-searchresults");
    searchcontent.hidden = false;

    searchcontent.innerHTML = "";

    fetch('https://localhost:44320/api/products')
        .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            response.json().then(function (data) {
                //console.log(data);

                for (let i = 0; i < data.length; i++) {

                    let product =
                    `<div class="result">
                        <img
                            class="product-image"
                            src="https://via.placeholder.com/200?text=Product+image"
                            alt="image missing"
                        />
                        <div class="product-info">
                            <p class="product-name">${data[i].productName}</p>
                            <p class="product-price">price</p>
                            <p class="product-store">store</p>
                        </div>
                    </div>`

                    searchcontent.innerHTML += product;

                }
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

