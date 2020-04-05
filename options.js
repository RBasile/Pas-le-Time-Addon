function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    sitelist: document.querySelector("#sitelist").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#sitelist").value = result.sitelist || "/watch";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("sitelist");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);