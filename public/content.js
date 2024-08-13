const button = document.createElement("button");
button.style.position = "fixed";
button.style.bottom = "20px";
button.style.right = "20px";
button.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/5973/5973800.png')";
button.style.backgroundSize = "contain";
button.style.backgroundColor = "transparent";
button.style.border = "none";
button.style.borderRadius = "5px";
button.style.cursor = "pointer";
button.style.zIndex = "1000";
button.style.width = "35px";
button.style.height = "35px";

document.body.appendChild(button);

button.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "open_side_panel" });
});
