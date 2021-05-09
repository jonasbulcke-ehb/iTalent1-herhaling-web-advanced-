let bookList;
let insertBook;

window.onload = async () => {
    bookList = document.getElementById("book-list");
    insertBook = document.getElementById("insert-book");
    await showBooks()
    document.getElementById("list-btn").addEventListener("click", () => {
        showBooks();
    });
    document.getElementById("insert-btn").addEventListener("click", () => {
        bookList.style.display = "none";
        insertBook.style.display = "block";
    })
    document.getElementById("insert-form").addEventListener("submit", async event => {
        event.preventDefault();
        let book = {
            title : document.getElementById("title").value,
            author : document.getElementById("author").value,
            price : document.getElementById("price").value,
            publisher : document.getElementById("publisher").value
        };
        await saveBook(book);
    })
}


let getBooks = async () => {
    let response = await fetch("http://localhost:3000/getBooks");
    if (response.ok) {
        let books = await response.json();
        return books;
    } else {
        console.log(`Error: ${response.error()}`)
    }
}

let showBooks = async () => {
    bookList.innerHTML = null;
    for (let book of await getBooks()) {
        let card = document.createElement("div")
        card.className = "card";
        card.innerHTML = `<div class="card-body">
                <h5 class="card-title">${book.title} - ${book.author}</h5>
                <p class="card-text">Published by <strong> ${book.publisher} </strong> <br/> Price: ${book.price}</p>
            </div>`
        bookList.appendChild(card);
    }
    insertBook.style.display = "none";
    bookList.style.display = "block";
}

let saveBook = async (book) => {
    const requestInfo = {
        headers: {
          "Content-Type" : "application/json; charset=UTF-8"
        },
        method : "POST",
        body : JSON.stringify(book)
    }

    console.log(requestInfo)

    let response = await fetch("http://localhost:3000/insertBook", requestInfo);

    if(response.ok) {
        await showBooks();
    }
}

