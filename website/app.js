const url = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",us&appid=b6141bf22492492309146aeb7cbae5fb";

//setting the route to post data to the server
const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//setting the route to get data from api
const getWeather = async (url, zip, apiKey) => {
  zip = document.getElementById("zip").value;
  let apiUrl = url + zip + apiKey;
  const res = await fetch(apiUrl);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

//setting the ui updating prommise
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    const lastEntry = allData.data[allData.data.length - 1];
    document.getElementById("date").innerHTML = `Date: ${lastEntry.date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temperature: ${lastEntry.temperature}`;
    document.getElementById(
      "content"
    ).innerHTML = `What you felt at the time: ${lastEntry.userResponse}`;
  } catch (error) {
    console.log("error", error);
  }
};
//adding the event listener  to get data from api and chain promisses
document.getElementById("generate").addEventListener("click", processData);

function processData() {
  getWeather(url, zip, apiKey)
    .then((data) => {
      const newData = {};
      newData.temperature = data.main.temp;
      newData.date = getDateAndTime();
      newData.userResponse = document.getElementById("feelings").value;
      postData("/data", newData);
    })
    .then(updateUI);
}

function getDateAndTime() {
  return new Date().toLocaleString();
}
