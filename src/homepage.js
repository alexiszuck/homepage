/* global fetch */

const version = require("../package.json").version;

function visit() {
  let vc = document.getElementById("visitCount");
  let u = `${process.env.ENDPOINT_PREFIX}/.netlify/functions/visit`;
console.log(u);
  fetch(u, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Network response was not ok.');
  })
  .then(res => {
    vc.innerHTML = res.visits;
  })
  .catch(error => {
    vc.innerHTML = '-';
    //console.error(error);
  });
}

(function(){
  visit();
  let v = document.getElementById("version");
  v.innerHTML = version;
})();