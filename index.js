const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(e){
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
//   console.log(result);

  const data = processData(result);
  displayData(data);
}

function toCelsius(degreesF) {
  return ((degreesF - 32) * 5) / 9;
}

function processData(result) {
  const today = result.days[0];
  const {sunrise, sunset} = spliceTime(today.sunrise, today.sunset);

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

function displayData(data) {
    console.log(data);
    const test = document.createElement('p');
    test.textContent = data.address;
    document.body.appendChild(test);
}

function inputLocation(){
    const locationInput = document.querySelector('#location');
    fetchData(locationInput.value);
}


