import { app, db } from "./firebase-config.js"
import { ref, set, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

document.getElementById("menuIcon").addEventListener("click", () => {
    document.getElementById("vertNav").style.visibility =
        document.getElementById("vertNav").style.visibility == "visible" ? "hidden" : "visible";

});

function loadBlog() {
    const postUl = document.getElementById("postUl");
    while (postUl.firstChild)
        postUl.removeChild(postUl.firstChild);

    onValue(ref(db, "blogs"), (snapshot) => {
        const data = snapshot.val();
        let blogCnt = Object.keys(data).length;

        for (let i = 0; i < blogCnt; i++) {
            let el = data[Object.keys(data)[i]];
            console.log(el.title)
            let key = Object.keys(data)[i];

            const newLi = document.createElement("li");
            newLi.setAttribute("id", key);

            const newTitle = document.createElement("h3");
            newTitle.setAttribute("class", "postTitle");
            const node1 = document.createTextNode(el.title);
            const newDate = document.createElement("p");
            newDate.setAttribute("class", "postDate");
            const parseDate = new Date(el.date);
            const node2 = document.createTextNode(`Last edited by ${el.author ? el.author : "anonymous"} on ${parseDate.getMonth() + 1}/${parseDate.getDate() + 1}/${parseDate.getFullYear()}`);
            const newSummary = document.createElement("p");
            const node3 = document.createTextNode(el.summary);

            const newEdit = document.createElement("button");
            const node4 = document.createElement("i");
            node4.setAttribute("class", "material-icons editIcon");
            node4.innerHTML = "edit";

            newTitle.appendChild(node1);
            newDate.appendChild(node2);
            newSummary.appendChild(node3);

            newLi.appendChild(newTitle);
            newLi.appendChild(newSummary);
            newLi.appendChild(newDate);

            postUl.appendChild(newLi);
        }
    })
}

window.onload = loadBlog();