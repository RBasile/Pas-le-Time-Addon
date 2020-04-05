var toogle = true;
var Speed = 1.0;

function compareUrl(urlCur , urlLi) {
  console.log(urlLi)
  for (var i = 0; i < urlLi.length; i++) {
    if (urlLi[i] == ""){console.log("passed"); continue;}
    if (urlCur.search(urlLi[i]) >= 0){return false;}
  }
  return true;
}


function onError(error) {
  console.log(`Error: ${error}`);
}
function onGot(item) {
  let slist = "youtube.com\nnetflix.com";
  if (item.sitelist) {
    slist = item.sitelist;
  }
  site = window.location.href;
  var allsite = slist.split('\n');
  
  if (compareUrl(site,allsite)) {
    setTimeout(loadVid, 2000,false);
  } else {
    loadVid(true);
  }
}

let getting = browser.storage.sync.get("sitelist");
getting.then(onGot, onError);

function loadVid(urlTrue) {
  let list  = document.getElementsByTagName("video");
  if (list.length > 0 || urlTrue) {
    if (document.getElementById('numbtextId') == null) {
      let numb = document.createElement("P");
      numb.textContent = Speed;
      numb.className = "numbtext";
      numb.id = "numbtextId";
      numb.style.opacity = 0.3;
      numb.addEventListener("click", activ);
      document.body.appendChild(numb);
    }
    document.addEventListener("keypress", changeSp);
  }
}

function activ() {
  let numb = document.getElementById('numbtextId')
  if (numb.style.opacity==0.3){
    numb.style.opacity = .01;
    document.removeEventListener("keypress", changeSp);
  }else{
    numb.style.opacity = .3;
    document.addEventListener("keypress", changeSp);
  }
  console.log("click");
}


function changeSp(self) {
  //console.log("key¨press ="+self.key);
  let list  = document.getElementsByTagName("video");
  let numb = document.getElementById('numbtextId')
  if (self.key == "r" || self.key == "R") {
    if (toogle == true) {
      Speed = list[0].playbackRate
      for (var i = 0; i < list.length; i++) {
        list[i].playbackRate = 1;
      }
      numb.textContent = 1
      toogle = false;
    } else {
      for (var i = 0; i < list.length; i++) {
        list[i].playbackRate = Speed;
      }
      numb.textContent = Speed.toFixed(1);
      toogle = true;
    }
    
  }

  if (self.key == "d" || self.key == "D") {
    
    for (var i = 0; i < list.length; i++) {
      list[i].playbackRate += 0.1;
    }
    numb.textContent = list[0].playbackRate.toFixed(1);
    toogle = true;
  }


  if (self.key == "s" || self.key == "S") {
    for (var i = 0; i < list.length; i++) {
      list[i].playbackRate -= 0.1;
    }
    numb.textContent = list[0].playbackRate.toFixed(1);
    toogle = true;
  }

}

