function saveOptions(e) {
  e.preventDefault();
  let value = document.querySelector("#sitelist").value
  console.log(value)
  if (value == false) {
    value = "\n"
  }
  browser.storage.sync.set({
    sitelist: value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#sitelist").value = result.sitelist || "youtube.com\nnetflix.com";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("sitelist");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);