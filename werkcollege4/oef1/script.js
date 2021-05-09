window.onload = () => {
    getData()
}

let getData = async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/todos")
    if(response.ok) {
        //let data = await response.json()
        showData(await response.json())
    }
}

let showData = data => {
    let list = document.createElement("ul")
    list.className = "list-group"
    for (const todo of data) {
        let li = document.createElement("li");
        li.innerText = todo.title;
        li.className = "list-group-item " + (todo.completed ? "list-group-item-success" : "list-group-item-danger");
        list.appendChild(li);
    }
    document.getElementById("todo-list").appendChild(list);
}