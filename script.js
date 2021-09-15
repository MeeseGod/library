let values = [];
let bookDoc = [];
let bookTitle = [];
let bookAuthor = [];
let bookPages = [];
let bookStatus=[];
let bookRemove=[];
let library = [
    {
        name : "Fight Club",
        author: "Chuck Palahniuk",
        pages : 208,
        status: "Not Read"
    }
];

function storeLibrary(){
    localStorage.setItem("library", JSON.stringify(library));
    console.log(localStorage.getItem("library"));
}

// Object constructor for creating books
function createBook(name, author, pages, status){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
    // this.info = function(){
    //     return `${name} is written by ${author} and is ${pages} long. Status: ${status}`;
    // }
};

function openForm(){
    document.getElementById("inputContainer").style.display = "flex";
};

function closeForm(){
    document.getElementById("inputContainer").style.display = "none";
};

function addToLibrary(){
    let retrievedForm = document.getElementById("bookInputForm");
        for(let i = 0; i <= 3; i++){
            values[i] = retrievedForm[i].value
                if(!retrievedForm[3].checked){
                    values[3] = "Not Read"
                }
        };
    if(values[0].length < 100 && values[0].length > 0  // Checks inputs for constraints
    && values[1].length < 100 && values[1].length > 0
    && parseInt(values[2]) < 1000000 && parseInt(values[2]) > 0){
        let arrayTesting = new createBook(values[0], values[1], parseInt(values[2]), values[3]);
        library.push(arrayTesting);

        document.getElementById("bookInputForm").reset();
        closeForm();
        initializeLibrary();
        storeLibrary();
    }
    else if(values[0].length > 100 || values[0].length <= 0 || values[0] === ''){
       alert("Invalid title - Title exceeds 100 characters or was not given");
    }
    else if(values[1].length > 100 || values[1].length < 0 || values[1] === ''){
        alert("Invalid author - Author's name exceeds 100 characters or was not given");
     }
    else if(parseInt(values[2]) >= 1000000){
        alert("Invalid number of pages (1,000,000 pages or higher) - Please check your information");
    }
    else if(parseInt(values[2]) <= 0 || values[2] === ''){
        alert("Invalid number of pages (less than 1 or no number given) - Please check your information");
    }
};

// Sorts through our library and adds the books to our page for display
function initializeLibrary(){
    removeElementsByClass("books"); // Empties the page to repost elements
    for(let i = 0; i <= library.length-1; i++){
            bookDoc[i] = document.createElement("div");
            // bookDoc[i].setAttribute("id", createID(library[i].name) + i);
            bookDoc[i].setAttribute("id", "book" + i);
            bookDoc[i].setAttribute("class", "books");
            booksContainer.appendChild(bookDoc[i]);

            bookTitle[i] = document.createElement("p");
            bookTitle[i].setAttribute("id", "bookTitle" + i);
            bookTitle[i].setAttribute("class", "bookEntry");
            bookTitle[i].innerHTML = library[i].name;
            bookDoc[i].appendChild(bookTitle[i]);

            bookAuthor[i] = document.createElement("p");
            bookAuthor[i].setAttribute("id", "bookAuthor" + i);
            bookAuthor[i].setAttribute("class", "bookEntry");
            bookAuthor[i].innerHTML = library[i].author;
            bookDoc[i].appendChild(bookAuthor[i]);

            bookPages[i] = document.createElement("p");
            bookPages[i].setAttribute("id", "bookPages" + i);
            bookPages[i].setAttribute("class", "bookEntry");
            bookPages[i].innerHTML = library[i].pages;
            bookDoc[i].appendChild(bookPages[i]);

            bookStatus[i] = document.createElement("button");
            bookStatus[i].setAttribute("id", "bookStatus" + i);
            bookStatus[i].setAttribute("class", "bookStatus");
            bookStatus[i].innerHTML = library[i].status;
            bookDoc[i].appendChild(bookStatus[i]); 

            bookRemove[i] = document.createElement("button");
            bookRemove[i].setAttribute("id", "removeBook" + i);
            bookRemove[i].setAttribute("class", "removeButton");
            bookRemove[i].innerHTML = "Remove Book";
            bookDoc[i].appendChild(bookRemove[i]); 

    };
};

// Called to clear page of class divs when the library is initialized(see line: 50)
function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

// Checks for library item in local storage
if(!localStorage.getItem('library')) {
    localStorage.setItem("library", JSON.stringify(library));
  } else {
    library = JSON.parse(localStorage.getItem("library"));
  }

// Initializes page at start
initializeLibrary();

// Removes book from display and objects
let queryRemove = document.querySelectorAll(".removeButton");
document.addEventListener('click', function(e) {
    queryRemove = document.querySelectorAll(".removeButton");
    for(let i = 0; i <= queryRemove.length; i ++){
        if(e.target.id  === queryRemove[i]?.id){
             let targetParent = queryRemove[i].parentElement.id;
             targetParent = targetParent.replace("book", "");
             library.splice(targetParent, 1);
             storeLibrary();
             initializeLibrary();
             console.log("test");
         };
     };
}, false);

// Changes book status
let changeStatus = document.querySelectorAll(".bookStatus");
document.addEventListener('click', function(e) {
    changeStatus = document.querySelectorAll(".bookStatus");
    for(let i = 0; i <= changeStatus.length; i ++){
        if(e.target.id  === changeStatus[i]?.id){
           let targetElement = document.getElementById(e.target.id);
            if(targetElement.innerText === "Not Read"){
                targetElement.innerText = "Read";
                library[parseInt(targetElement.id.replace("bookStatus", ""))].status = "Read";
            }
            else{
                targetElement.innerText = "Not Read";
                library[parseInt(targetElement.id.replace("bookStatus", ""))].status = "Not Read";
            }
            storeLibrary();
         };
     };
}, false);