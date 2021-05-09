'use strict'
window.onload = async () => {
    console.log("page loaded");
    await loadStudents();
}

let loadStudents = async () => {
    let result = await fetch("db/data.json")
    let students = await result.json()

    console.log(students)

    let content = document.getElementById("content");

    for (let student of students) {
        console.log(student)
        content.appendChild(createCard(student));
    }
}

let createCard = (student) => {
    let card = document.createElement("div");
    card.className = "card m-3"
    //card.setAttribute("style", "width: 18rem;")

    let body = document.createElement("div");
    body.className = "card-body";
    card.appendChild(body);

    let title = document.createElement("h5")
    title.className = "card-title";
    body.appendChild(title);
    title.innerText = `${student.name} (${student.age})`;

    let subtitle = document.createElement("h6");
    subtitle.className = "card-subtitle text-muted";
    body.appendChild(subtitle);
    subtitle.innerText = student.degree;

    // let text = document.createElement("p");
    // text.className = "card-text";
    // body.appendChild(text);
    // text.innerText = student.courses.join();

    let ul = document.createElement("ul");
    ul.className = "list-group list-group-flush";
    for(let course of student.courses) {
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.innerText = course;
        ul.appendChild(li);
    }
    card.appendChild(ul);

    return card;


}

