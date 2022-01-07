const changelogInfo = [
	{
		version: "v1.0",
		description: ["First launched version of Five Hands Poker"],
		date: "05-12-2021"
	},
	{
		version: "v1.0.1",
		description: [
			"Renamed internal function 'setCardColorAndFigure' to 'setCardColor'",
			"Optimized and improved internal function 'changeSelectedCards'",
			"Fixed wrong change of cards when executing function 'changeSelectedCards'",
			"Improved generation of first 5 hands of each hand on internal function 'startGame'",
			"Added function 'hideShowButton' for game buttons",
			"Renamed all internal variables to camelCase naming convention",
			"Renamed internal function 'setCardNumberAndFigure' to 'setCardNumAndFig'",
			"Removed 'card' parameter on setCardNumAndFig",
			"Added function 'clearCurrentHandClass'",
			"Fixed som wrong validation of hands",
			"Removed some unnecessary commments",
			"Updated comments to JSDoc syntax",
			"Added functions 'arrayRandElement', 'cleanArray' and 'removeElement' for using with arrays",
			"Updated generation of cards to be more randomly"
		],
		date: "07-01-2022"
	}
];

changelogInfo.reverse();

for (let info of changelogInfo) {
	const sectionContainer = document.createElement("section");
	sectionContainer.classList.add("col-12");

	const version = document.createElement("div");
	const versionText = document.createTextNode(`${info.version} | ${info.date}`);

	version.appendChild(versionText);
	version.classList.add("game-version");

	const versionDescription = document.createElement("div");
	const ulContainer = document.createElement("ul");

	versionDescription.appendChild(ulContainer);
	versionDescription.classList.add("game-version-description");

	for (let description of info.description) {
		const liContainer = document.createElement("li");
		const liContainerText = document.createTextNode(description);

		liContainer.appendChild(liContainerText);

		ulContainer.appendChild(liContainer);
	}

	sectionContainer.appendChild(version);
	sectionContainer.appendChild(versionDescription);

	const article = document.getElementById("article");
	article.appendChild(sectionContainer);
}

const returnButton = document.getElementById("return");

returnButton.addEventListener("click", () => {
	location.href = "./index.html";
});