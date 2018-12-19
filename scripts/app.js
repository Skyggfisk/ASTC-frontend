//Service worker registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("./service-worker.js").then(
      function(registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function(err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
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

// Display only the home page and search bar
function loadHome() {
  document.getElementById("content-home").hidden = false;
  document.getElementById("content-map").hidden = true;
  document.getElementById("content-about").hidden = true;
  document.getElementById("search-bar1").hidden = true;
  document.getElementById("search-bar2").hidden = false;
  document.getElementById("content-searchresults").hidden = true;

  closeSlideMenu();
}

// Display only the "map" page and search bar
function loadMap() {
  document.getElementById("content-home").hidden = true;
  document.getElementById("content-map").hidden = false;
  document.getElementById("content-about").hidden = true;
  document.getElementById("search-bar1").hidden = false;
  document.getElementById("search-bar2").hidden = true;
  document.getElementById("content-searchresults").hidden = true;

  closeSlideMenu();
}

// Display only the "about" page
function loadAbout() {
  document.getElementById("content-home").hidden = true;
  document.getElementById("content-map").hidden = true;
  document.getElementById("content-about").hidden = false;
  document.getElementById("search-bar1").hidden = true;
  document.getElementById("search-bar2").hidden = true;
  document.getElementById("content-searchresults").hidden = true;

  closeSlideMenu();
}

// global array for passing product info
let pArr = [];

// prevent the search forms from reloading the page
document
  .getElementById("search-bar1")
  .addEventListener("submit", function(event) {
    event.preventDefault();
  });

document
  .getElementById("search-bar2")
  .addEventListener("submit", function(event) {
    event.preventDefault();
  });

// the search function, currently only looking through products and not shops
function searchHandler(val) {
  // clear the previous search results on the map
  pArr = [];

  // clean up previous selections from the map view
  let selections = document
    .getElementById("frame")
    .contentWindow.document.getElementsByClassName("selectedshop");

  while (selections.length) {
    selections[0].classList.remove("selectedshop");
  }

  // hide all content besides the search results
  document.getElementById("content-home").hidden = true;
  document.getElementById("content-map").hidden = true;
  document.getElementById("content-about").hidden = true;
  document.getElementById("search-bar1").hidden = false;
  document.getElementById("search-bar2").hidden = true;

  // show search results and clear previous
  let searchcontent = document.getElementById("content-searchresults");
  searchcontent.hidden = false;
  searchcontent.innerHTML = "<div id='loader'><i  class='fa fa-spinner fa-spin'></i></div>";

  // get search bar input
  let searchquery = document.getElementById("search-text" + val).value;

  // create url for the api
  let searchurl = `https://astcapi.azurewebsites.net/api/search/${searchquery}`;

  // display error if searchcontent is empty, else fetch
  if (searchquery == "") {
    let errortext = `<div class="error">Please enter a search term.</div>`;
    searchcontent.innerHTML = errortext;
  } else {
    fetch(searchurl)
      .then(response => {
        searchcontent.innerHTML = "";
        if (response.status !== 200) {
          console.log(
            `Looks like there was a problem. Status Code: ${response.status}`
          );
          return;
        }
        // get the api returned data and save it as the array "data"
        response.json().then(data => {
          // if there are no results, show an error
          if (!Array.isArray(data) || !data.length) {
            let errortext = `<div class="error">No results for: ${searchquery}</div>`;
            searchcontent.innerHTML = errortext;
          }

          // if there are results, create a new html element for each one and push to the global array
          for (let i = 0; i < data.length; i++) {
            let productid = "productdd" + i;
            pArr.push(data[i]);

            let product = `<div class="result" id="res${i}">
                                <img
                                    class="product-image"
                                    src="https://via.placeholder.com/200/FFFFFF/222222?text=Product+image"
                                    alt="image missing"
                                    onclick="toMap(${i})"
                                />
                                <p class="product-name">${
                                  data[i].productName
                                }</p>
                                <a href="#" class="seller-dropdown" onclick="toggleSellers('${productid}')">
                                    <i class="fas fa-angle-left"></i>
                                </a>
                                <div class="seller-info seller-hidden" id="${productid}">`;

            for (let j = 0; j < data[i].productSellers.length; j++) {
              let seller = `<p class="seller-name">${
                data[i].productSellers[j].shopname
              }</p>
                  <p class="seller-price">${
                    data[i].productSellers[j].price
                  }</p></br>`;

              product += seller;
            }

            product += `</div></div>`;

            searchcontent.innerHTML += product;
          }
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  }
}

// clone result node and display on map, then load the map
function toMap(index) {
  let clone = document.getElementById("res" + index).cloneNode(true);
  let mapResultDiv = document.getElementById("mapResult");
  mapResultDiv.innerHTML = "";
  mapResultDiv.appendChild(clone);

  pArr[index].productSellers.forEach(element => {
    let shopname = element.shopname.replace(/\s+/g, "");
    let iframe = document.getElementById("frame");
    let selectedTarget = iframe.contentWindow.document.getElementById(shopname);
    selectedTarget.classList.add("selectedshop");
  });

  loadMap();
}

function toggleSellers(id) {
  document.getElementById(id).classList.toggle("seller-hidden");
}

function shop() {
  let iframe = document.getElementById("frame");
  let selectedtarget = iframe.contentWindow.document.getElementById("BR");
  selectedtarget.classList.toggle("selectedshop");
}
