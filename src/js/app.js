

// SELECTING ELEMENTS FROM THE DOM //

const titleInput = document.querySelector(".title");
const authorInput = document.querySelector(".author");
const isbnInput = document.querySelector(".isbn");
const narratorInput = document.querySelector(".narrator");
const selectElement = document.querySelector(".format");

submitButton = document.querySelector(".submit-button");
physicalButton = document.querySelector(".render-physical-book-button");
audioButton = document.querySelector(".render-audio-book-button");





// DISABLE INPUTS ACCORDING TO SELECT VALUE //

selectElement.addEventListener("change",  ()=>{
	if (selectElement.value === "physical") {
		isbnInput.removeAttribute("disabled");
		narratorInput.setAttribute("disabled", "");
	} else {
		isbnInput.setAttribute("disabled", "");
		narratorInput.removeAttribute("disabled");
	}
});


// DECLARING THE BOOK CLASS //

class Book {
	constructor(title, author, format, isbn ){
		this.title = title;
		this.author = author;
		this.format = format;
		this.isbn = isbn;
		this.ID = Date.now();		
	}
}


// DECLARING THE AUDIOBOOK CLASS //
class AudioBook extends Book {
	constructor(title, author, format, narrator) {
		super(title, author, format)
		this.narrator = narrator;
		this.ID = Date.now();
	}

}


