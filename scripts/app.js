//Service worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./service-worker.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// open the drawer menu from the left
function openSlideMenu() {
  document.getElementById("menu").style.width = "250px";
}

// close the drawer menu
function closeSlideMenu() {
  document.getElementById("menu").style.width = "0px";
}

//Display only the home page and search bar
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

//Display only the "map" page and search bar
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

//Display only the "about" page
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

//The search function, currently only looking through products and not stores
function searchHandler() {

    //hide all content besides the search results
    var homecontent = document.getElementById("content-home");
    homecontent.hidden = true;

    var mapcontent = document.getElementById("content-map");
    mapcontent.hidden = true;

    var aboutcontent = document.getElementById("content-about");
    aboutcontent.hidden = true;

    var searchcontent = document.getElementById("content-searchresults");
    searchcontent.hidden = false;

    //clear previous results
    searchcontent.innerHTML = "";

    //get search bar input
    let searchquery = document.getElementById("search-text").value;

    //create url for the api
    let searchurl = "https://astcapi.azurewebsites.net/api/search/" + searchquery;

    //check if search query is empty, and display an error
    if (searchquery == "") {

        let errortext =
            `<div class="error">
            Please enter a search term.
        </div>`

        searchcontent.innerHTML = errortext;

      //if search isn't empty, get data from api
    } else {
        fetch(searchurl)
            .then(
                //if http response isn't 200 ("okay"), print an error to the console
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    //get the api returned data and save it as the array "data"
                    response.json().then(function (data) {

                        //if there are no results, show an error
                        if (!Array.isArray(data) || !data.length) {

                            let errortext =
                            `<div class="error">
                                No results for the product: ${searchquery}
                            </div>`

                            searchcontent.innerHTML = errortext;
                        }

                        //if there are results, create a new html element for each one
                        for (let i = 0; i < data.length; i++) {

                            let productid = "productdd" + i;

                            let product =
                                `<div class="result">
                                <img
                                    class="product-image"
                                    src="https://via.placeholder.com/200?text=Product+image"
                                    alt="image missing"
                                    onclick="testArray(${test})"
                                />
                                <p class="product-name">${data[i].productName}</p>
                                <a href="#" class="seller-dropdown" onclick="toggleSellers('${productid}')">
                                    <i class="fas fa-angle-left"></i>
                                </a>
                                <div class="seller-info seller-hidden" id="${productid}">`;

                            for (let j = 0; j < data[i].productSellers.length; j++) {

                                console.log(data[i].productSellers[j]);

                                let seller =
                                `<p class="seller-name">${data[i].productSellers[j].shopname}</p>
                                <p class="seller-price">${data[i].productSellers[j].price}</p>
                                </br>`;

                                product += seller;
                            }

                            product += `</div></div>`

                            searchcontent.innerHTML += product;

                        }
                    });

                }
            )
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });
    }

    

}

function toggleSellers(id) {
    let target = document.getElementById(id);

    target.classList.toggle("seller-hidden");
}

function testArray(...args) {
    console.log(args);
}

// Replaces the current app with the map
//function openMap() {
//  document.getElementById(
//    "app"
//  ).innerHTML = '<iframe id="frame" src="views/astc-map.html"></iframe>';
//  closeSlideMenu();
//}

//function displayOnMap(product) {
//    let 
//}

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

