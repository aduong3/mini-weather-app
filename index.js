const form = document.querySelector("form");
const degrees = document.querySelector(".degrees");
let menuButtons = document.querySelectorAll(".menuButton");

//bright photo Photo by <a href="https://unsplash.com/@wolfgang_hasselmann?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Wolfgang Hasselmann</a> on <a href="https://unsplash.com/photos/blue-sky-and-white-clouds-over-lake-bR_-gllg7Bs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
//dark photo Photo by <a href="https://unsplash.com/@wackeltin_meem?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Valentin Müller</a> on <a href="https://unsplash.com/photos/dew-drops-on-glass-panel-bWtd1ZyEy6w?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  inputLocation();
}

function spliceTime(sunrise = "06:45:30", sunset = "7:30:22") {
  let [riseHour, riseMinute] = sunrise.split(":");
  let [setHour, setMinute] = sunset.split(":");

  return {
    sunrise: `${riseHour}:${riseMinute}`,
    sunset: `${setHour}:${setMinute}`,
  };
}

async function fetchData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=us&include=current&key=6W8SUSA9ARJFUX6MQ5Z9Y678H&contentType=json`,
    { mode: "cors" }
  );

  if (!response.ok) {
    throw new Error("Fetch failed");
  }
  const result = await response.json();
  console.log(result);

  const data = processData(result);
  displayData(data);
}

function toCelsius(degreesF) {
  return ((degreesF - 32) * 5) / 9;
}

function processData(result) {
  const today = result.days[0];
  const { sunrise, sunset } = spliceTime(today.sunrise, today.sunset);

  const returnedData = {
    address: result.resolvedAddress,
    conditions: today.conditions,
    temp_F: Math.ceil(today.temp),
    temp_C: Math.ceil(toCelsius(today.temp)),
    tempMax_F: Math.ceil(today.tempmax),
    tempMax_C: Math.ceil(toCelsius(today.tempmax)),
    tempMin_F: Math.ceil(today.tempmin),
    tempMin_C: Math.ceil(toCelsius(today.tempmin)),
    sunrise,
    sunset,
  };
  return returnedData;
}

function removeDataContainer() {
  const dataContainer = document.querySelector(".dataContainer");

  if (dataContainer) dataContainer.remove();
}

function displayData(data) {
  removeDataContainer();
  const dataContainer = document.createElement("div");
  dataContainer.classList.add("dataContainer");

  const weather = document.createElement("p");
  weather.classList.add("weather");
  weather.textContent = data.conditions;
  dataContainer.appendChild(weather);

  const location = document.createElement("p");
  location.textContent = data.address;
  dataContainer.appendChild(location);

  document.body.appendChild(dataContainer);
}

function inputLocation() {
  const locationInput = document.querySelector("#location");
  fetchData(locationInput.value);
}

function changeDegrees() {
  const degrees = document.querySelector(".degrees");
  degrees.value = degrees.value === "Fahrenheit" ? "Celsius" : "Fahrenheit";
  degrees.textContent =
    degrees.value === "Fahrenheit" ? "Fahrenheit" : "Celsius";
}

degrees.addEventListener("click", changeDegrees);

function showAndHideMenu() {
  const menu = document.querySelector(".menu");
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
  } else {
    menu.classList.add("active");
  }
}

menuButtons.forEach((menuButton) => {
  menuButton.addEventListener("click", showAndHideMenu);
});
