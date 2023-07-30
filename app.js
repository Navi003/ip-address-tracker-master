"user strict";

const mapContainerEl = document.getElementById("map-container");

const getmain = (el) => el.split(" ").slice(0, 2).join(" ");

const state = {
  ip: "",
  location: "",
  timeZone: "",
  isp: "",
  lat: "",
  lan: "",
};
let map = L.map("map-container");
map.off();
const findLocation = function () {
  map.setView([state.lat, state.lan], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

  L.marker([state.lat, state.lan]).addTo(map).bindPopup(state.ip).openPopup();
};

// findLocation();

////////////////////////////////////////////////////////////////////////

const btnMain = document.getElementById("btn-search");

btnMain.addEventListener("click", function (e) {
  const getLocation = async function (ip) {
    const resp = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_StY4ZZNRFcQ78tp9EBCAKLRnkCih7&ipAddress=${ip}`
    );

    const data = await resp.json();

    console.log(data);
    state.ip = data.ip;
    state.location = data.location.region;
    state.timeZone = data.location.timezone;
    state.isp = data.isp;
    state.lat = data.location.lat;
    state.lan = data.location.lng;

    document.getElementById("ip-info").innerText = state.ip;
    document.getElementById("location-info").innerText = state.location;
    document.getElementById("timezone").innerText = state.timeZone;
    document.getElementById("isp").innerText = getmain(state.isp);

    findLocation(state.lat, state.lan);
  };

  const ipSearch = document.getElementById("ip-adress").value;

  getLocation(ipSearch);
});
