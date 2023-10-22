import { getActiveTabURL } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();

  const queryParameters = new URL(activeTab.url).searchParams;
  const currentVideo = queryParameters.get("v");
  const container = document.querySelector(".main");
  if (activeTab.url.includes("youtube.com/watch")) {
    if(currentVideo=="mOtULdszHqY"){ container.innerHTML = '<button id="redirectButton">Redirect Link</button>';
    document
      .getElementById("redirectButton")
      .addEventListener("click", function () {
        changeUrl(activeTab,currentVideo);
      });}else{
        container.innerHTML =
      '<div class="title">Allowed.</div>';
      }
   
  } else {
    container.innerHTML =
      '<div class="title">A youtube video has not yet started.</div>';
  }
});

function changeUrl(activeTab,currentVideo) {
  var newURL = "http://localhost:3000/verify?param1="+currentVideo;
  chrome.tabs.update(activeTab.id, { url: newURL });
}

