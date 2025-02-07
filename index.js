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

const svgList = {
  //<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>weather-sunset-up</title><path d="M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,16.3L15.82,19.41C16.21,19.8 16.21,20.43 15.82,20.82C15.43,21.21 14.8,21.21 14.41,20.82L12,18.41L9.59,20.82C9.2,21.21 8.57,21.21 8.18,20.82C7.79,20.43 7.79,19.8 8.18,19.41L11.29,16.3C11.5,16.1 11.74,16 12,16C12.26,16 12.5,16.1 12.71,16.3Z" /></svg>
  sunrise: () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 0 24 24");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,16.3L15.82,19.41C16.21,19.8 16.21,20.43 15.82,20.82C15.43,21.21 14.8,21.21 14.41,20.82L12,18.41L9.59,20.82C9.2,21.21 8.57,21.21 8.18,20.82C7.79,20.43 7.79,19.8 8.18,19.41L11.29,16.3C11.5,16.1 11.74,16 12,16C12.26,16 12.5,16.1 12.71,16.3Z"
    );

    svg.appendChild(path);

    return svg;
  },

  //<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>weather-sunset-down</title><path d="M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,20.71L15.82,17.6C16.21,17.21 16.21,16.57 15.82,16.18C15.43,15.79 14.8,15.79 14.41,16.18L12,18.59L9.59,16.18C9.2,15.79 8.57,15.79 8.18,16.18C7.79,16.57 7.79,17.21 8.18,17.6L11.29,20.71C11.5,20.9 11.74,21 12,21C12.26,21 12.5,20.9 12.71,20.71Z" /></svg>
  sunset: () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 0 24 24");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,20.71L15.82,17.6C16.21,17.21 16.21,16.57 15.82,16.18C15.43,15.79 14.8,15.79 14.41,16.18L12,18.59L9.59,16.18C9.2,15.79 8.57,15.79 8.18,16.18C7.79,16.57 7.79,17.21 8.18,17.6L11.29,20.71C11.5,20.9 11.74,21 12,21C12.26,21 12.5,20.9 12.71,20.71Z"
    );

    svg.appendChild(path);
    return svg;
  },
};

function displayData(data) {
  removeDataContainer();
  const dataContainer = document.createElement("div");
  dataContainer.classList.add("dataContainer");

  const middleDiv = document.createElement("div");
  middleDiv.classList.add("middleDiv");

  const weather = document.createElement("p");
  weather.classList.add("weather");
  weather.textContent = data.conditions;
  middleDiv.appendChild(weather);

  const tempDiv = document.createElement("div");
  tempDiv.classList.add("tempDiv");

  const temperature = document.createElement("p");
  temperature.textContent = data.temp_F;
  temperature.classList.add("temperature");
  tempDiv.appendChild(temperature);

  const spanDegrees = document.createElement("span");
  spanDegrees.textContent = "\u00B0F";
  spanDegrees.classList.add("spanDegrees");
  temperature.appendChild(spanDegrees);

  middleDiv.appendChild(tempDiv);

  const location = document.createElement("p");
  location.textContent = data.address;
  location.classList.add("location");
  middleDiv.appendChild(location);

  const additionalInfoDiv = document.createElement("div");
  additionalInfoDiv.classList.add("additionalInfoDiv");

  const tempMax = document.createElement("p");
  tempMax.classList.add("tempMax");
  tempMax.textContent = `\u2191 ${data.tempMax_F}\u00B0F`;

  const tempMin = document.createElement("p");
  tempMin.classList.add("tempMin");
  tempMin.textContent = `\u2193 ${data.tempMin_F}\u00B0F`;

  const sunriseTime = document.createElement("p");
  sunriseTime.classList.add("sunriseTime");
  sunriseTime.appendChild(svgList.sunrise());
  sunriseTime.append(data.sunrise);

  const sunsetTime = document.createElement("p");
  sunsetTime.classList.add("sunsetTime");
  sunsetTime.appendChild(svgList.sunset());
  sunsetTime.append(data.sunset);

  additionalInfoDiv.appendChild(tempMax);
  additionalInfoDiv.appendChild(tempMin);
  additionalInfoDiv.appendChild(sunriseTime);
  additionalInfoDiv.appendChild(sunsetTime);

  dataContainer.appendChild(middleDiv);
  tempDiv.appendChild(additionalInfoDiv);
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
