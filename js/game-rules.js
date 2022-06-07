const dialogOpenButton = document.getElementById("dialog-open-button"),
dialogContainer = document.getElementById("dialog-game-rules"),
dialogCloseButton = document.getElementById("dialog-close-button");

dialogOpenButton.addEventListener("click",showRules);

function showRules(){
	dialogContainer.showModal();
	dialogOpenButton.style.display = "none";
	dialogCloseButton.addEventListener("click",hideRules);
}

function hideRules(){
	dialogContainer.close();
	dialogOpenButton.style.display = "inline-block";
}