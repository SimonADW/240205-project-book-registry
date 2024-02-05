const books = [];
const audioBooks = [];

// SELECTING ELEMENTS FROM THE DOM //

const titleInput = document.querySelector(".title");
const authorInput = document.querySelector(".author");
const formatInput = document.querySelector(".format");
const isbnInput = document.querySelector(".isbn");
const narratorInput = document.querySelector(".narrator");

const bookForm = document.querySelector(".book-form");
const submitButton = document.querySelector(".submit-button");
const renderPhysicalBooksButton = document.querySelector(".render-physical-book-button");
const renderAudioBooksButton = document.querySelector(".render-audio-book-button");


const displayPhysicalBooksContainer = document.querySelector(".display-physical-books");
const displayAudioBooksContainer = document.querySelector(".display-audio-books");
const booksList = document.querySelector(".physical-books-list");
const audioBooksList = document.querySelector(".audio-books-list");

// ADDING EVENT LISTENERS
// DISABLE INPUTS ACCORDING TO SELECT VALUE //

formatInput.addEventListener("change",  ()=>{
	if (formatInput.value === "physical") {
		isbnInput.removeAttribute("disabled");
		narratorInput.setAttribute("disabled", "");
	} else {
		isbnInput.setAttribute("disabled", "");
		narratorInput.removeAttribute("disabled");
	};
});



bookForm.addEventListener("submit", (event)=> {
	event.preventDefault();
	let newBook;
	if(formatInput.value === "physical") {
		newBook = new Book(titleInput.value,authorInput.value,formatInput.value,isbnInput.value);
	} else {
		newBook = new AudioBook(titleInput.value,authorInput.value,formatInput.value,narratorInput.value)
	}
	Book.addBook(newBook);

	console.log(newBook);
	console.log(books);
	console.log(audioBooks);
});

renderPhysicalBooksButton.addEventListener("click", ()=>{
	UI.activeTab = "physical";
	UI.renderBooks(books);
});

renderAudioBooksButton.addEventListener("click", ()=>{
	UI.activeTab = "audio";
	UI.renderAudioBooks(audioBooks);
})

// DECLARING THE BOOK CLASS //

class Book {
	constructor(title, author, format, isbn ){
		this.title = title;
		this.author = author;
		this.format = format;
		this.isbn = isbn;
		this.ID = Date.now();		
	}
	static addBook(book){
		if(book.format === "physical") {
			books.push(book);
		} else {
			audioBooks.push(book);
		}
	}

	// DELETE METHOD //

	static deleteBook(id, booksArray){
		const index = booksArray.findIndex(book => book.ID.toString() === id.toString());
		if(index !== -1) {
			booksArray.splice(index, 1);
			if(UI.activeTab === "physical") {
				UI.renderBooks(books);
			} else {
				UI.renderAudioBooks(audioBooks)
			}
		}
	}
}


// DECLARING THE AUDIOBOOK CLASS //
class AudioBook extends Book {
	constructor(title, author, format, narrator) {
		super(title, author, format)
		this.narrator = narrator;
		this.ID = Date.now();
	};
};

// DECLARE THE UI CLASS

class UI{
	static activeTab = "physical";
	static renderBooks(books){
		booksList.textContent = " ";
		displayAudioBooksContainer.style.display = "none";
		displayPhysicalBooksContainer.style.display = "block";
		if(UI.activeTab === "physical"){
			books.forEach(book => {	
				const liRow = document.createElement("li");
				const renderedTitle = document.createElement("span");
				const renderedAuthor = document.createElement("span");
				const renderedFormat = document.createElement("span");
				const renderedIsbn = document.createElement("span");
				const deleteButtonContainer = document.createElement("span");
				const deleteButton = document.createElement("button");
			
				renderedTitle.textContent = book.title;
				renderedAuthor.textContent = book.author;
				renderedFormat.textContent = book.format;
				renderedIsbn.textContent = book.isbn;
				deleteButton.textContent = "Delete ❌";

				liRow.dataset.id = book.ID;
			
				booksList.append(liRow);
				liRow.append(renderedTitle, renderedAuthor, renderedFormat, renderedIsbn, deleteButtonContainer);
				deleteButtonContainer.append(deleteButton);	

				liRow.classList.add("physical-books-row");

				deleteButton.addEventListener("click", (event)=>{
					console.log(event.currentTarget.parentElement.parentElement.dataset.id);
					const rowId = event.currentTarget.parentElement.parentElement.dataset.id;
					Book.deleteBook(rowId, books);
				})
			});
		}
	}

	static renderAudioBooks(audioBooks){
		audioBooksList.textContent = "";
		displayPhysicalBooksContainer.style.display = "none";
		displayAudioBooksContainer.style.display = "block";
		
		if(UI.activeTab === "audio"){
			audioBooks.forEach(audioBook => {
				const liRow = document.createElement("li");
				const renderedTitle = document.createElement("span");
				const renderedAuthor = document.createElement("span");
				const renderedFormat = document.createElement("span");
				const renderedNarrator = document.createElement("span");
				const deleteButtonContainer = document.createElement("span");
				const deleteButton = document.createElement("button");

				renderedTitle.textContent = audioBook.title;
				renderedAuthor.textContent = audioBook.author;
				renderedFormat.textContent = audioBook.format;
				renderedNarrator.textContent = audioBook.narrator;
				deleteButton.textContent = "Delete ❌";

				liRow.dataset.id = AudioBook.ID;
			
				audioBooksList.append(liRow);
				liRow.append(renderedTitle, renderedAuthor, renderedFormat, renderedNarrator, deleteButtonContainer);
				deleteButtonContainer.append(deleteButton);	

				liRow.classList.add("audio-books-row");

				deleteButton.addEventListener("click", (event)=>{
					const rowId = event.currentTarget.parentElement.parentElement.dataset.id;
					Book.deleteBook(rowId, audioBooks);
				})
			})
		}
	}
}

