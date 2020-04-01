const fetchLocation = address => {
  return fetch(
    `/weather?address=${address}`
  ).then(response => response.json());
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  messageOne.textContent = '';
  messageTwo.textContent = "Loading...";
  fetchLocation(location)
  .then(data => {
    if (data.error) {
      messageTwo.textContent = `Error: ${data.error}`;
    } else {
      messageOne.textContent = 'Location: ' + data.location;
      messageTwo.textContent = 'Forecast: ' + data.forecast;
    }
  })
});
