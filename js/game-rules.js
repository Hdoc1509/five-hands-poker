const dialog_open_button = document.getElementById("dialog-open-button");
const dialog_container = document.getElementById("dialog-game-rules");
const dialog_close_button = document.getElementById("dialog-close-button");

dialog_open_button.addEventListener("click",showRules);

function showRules(){
	dialog_container.showModal();
	dialog_open_button.style.display = "none";
	dialog_close_button.addEventListener("click",hideRules);
}

function hideRules(){
	dialog_container.close();
	dialog_open_button.style.display = "inline-block";
}