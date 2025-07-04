let searchBtn = document.getElementById("exampleDataList");
let btnSearch = document.getElementById("btnInput");
async function getWeatherCondition(name) {
  let promise = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=5c2253b16ef14bec809132036250207&q=${name}&days=3`
  );
  let response = await promise.json();
  let locationData = response.location;
  let currentData = response.current;
  let forecastData = response.forecast.forecastday;
  displayWeatherDetails(locationData, currentData, forecastData);
}
async function getWeatherConditionOfUserLocation(lat, lon) {
  let promise = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=5c2253b16ef14bec809132036250207&q=${lat},${lon}&days=3`
  );
  let response = await promise.json();
  let locationData = response.location;
  let currentData = response.current;
  let forecastData = response.forecast.forecastday;
  displayWeatherDetails(locationData, currentData, forecastData);
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}
getLocation();
function success(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  getWeatherConditionOfUserLocation(lat, lon);
}
function error() {
  Swal.fire({
    title: "You should open your location first ",
    icon: "error",
    draggable: true,
  });
}
function formatDateToMonthDay(dateInNumber) {
  const date = new Date(dateInNumber);
  return date.toLocaleString("default", { month: "long", day: "numeric" });
}
function formatDateDayName(dateInNumber) {
  const date = new Date(dateInNumber);
  return date.toLocaleString("default", { weekday: "long" });
}
function displayWeatherDetails(locationData, currentData, forecastData) {
  let Day1 = forecastData[1];
  let Day2 = forecastData[2];
  document.getElementById("section2Content").innerHTML = `
            <div class="container">
                <div class=" row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-3 row-cols-xl-3">
                    <div class="card text-white overflow-hidden col border border-0 ">
                        <div class="card-header sideHeaders d-flex justify-content-between">
                            <span>${formatDateDayName(
                              locationData.localtime
                            )}</span><span>${formatDateToMonthDay(
    locationData.localtime
  )}</span>
                        </div>
                        <div class="card-body pt-5 sideBodys ">
                            <h5 class="card-title">${locationData.name}</h5>
                            <div class="card-text currentWeather ">${
                              currentData.temp_c
                            }<sup>o</sup>C</div>
                            <p class="card-text"><small class="text-white"><img src="${
                              currentData.condition.icon
                            }" alt=""></small>
                            </p>
                            <div class="card-text weatherStatus"><span>${
                              currentData.condition.text
                            }</span></div>
                            <div class="card-text d-flex justify-content-evenly">
                                <div class="mt-4 mb-2 pe-3 currentWeatherIcon">
                                    <i class="fa-solid fa-umbrella"></i>
                                    <span>20%</span>
                                </div>
                                <div class="mt-4 mb-2 pe-3 currentWeatherIcon">
                                    <i class="fa-solid fa-wind"></i>
                                    <span>18Km/h</span>
                                </div>
                                <div class="mt-4 mb-2 pe-3 currentWeatherIcon">
                                    <i class="fa-regular fa-compass"></i>
                                    <span>East</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card text-white overflow-hidden col border border-0">
                        <div class="card-header midHeader text-center">${formatDateDayName(
                          Day1.date
                        )}</div>
                        <div class="card-body pt-5 midBody text-center">
                            <p class="card-text "><img src="${
                              Day1.day.condition.icon
                            }" alt=""></p>
                            <span class="card-text nextDayTemp">${
                              Day1.day.maxtemp_c
                            } <sup>o</sup>C</span>
                            <h6 class="fw mb-3">${
                              Day1.day.mintemp_c
                            } <sup>o</sup></h6>
                            <p class="card-text nextDayStatus ">${
                              Day1.day.condition.text
                            }</p>
                        </div>
                    </div>
                    <div class="card text-white overflow-hidden col border border-0">
                        <div class="card-header sideHeaders text-center">${formatDateDayName(
                          Day2.date
                        )}</div>
                        <div class="card-body pt-5 sideBodys text-center">
                            <p class="card-text "><img src="${
                              Day2.day.condition.icon
                            }" alt=""></p>
                            <span class="card-text nextDayTemp">${
                              Day2.day.maxtemp_c
                            } <sup>o</sup>C</span>
                            <h6 class="fw mb-3">${
                              Day2.day.mintemp_c
                            } <sup>o</sup></h6>
                            <p class="card-text nextDayStatus">${
                              Day2.day.condition.text
                            }</p>
                        </div>
                    </div>
                </div>
    `;
}
searchBtn.addEventListener("input", function () {
  let term = searchBtn.value;
  getWeatherCondition(term);
});
btnSearch.addEventListener("click", function () {
  let term = searchBtn.value;
  getWeatherCondition(term);
});
