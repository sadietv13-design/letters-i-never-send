function saveLetter() {

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const song = document.getElementById("song").value;
    const film = document.getElementById("film").value;

    if (content === "") return;

    playEnvelopeAnimation(function () {

        const letter = {
            title,
            content,
            song,
            film,
            date: new Date().toLocaleString()
        };

        let letters = JSON.parse(localStorage.getItem("letters")) || [];

        letters.unshift(letter);

        localStorage.setItem("letters", JSON.stringify(letters));

        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
        document.getElementById("song").value = "";
        document.getElementById("film").value = "";

        renderLetters();

    });

}

function renderLetters() {

    const container = document.getElementById("entries");

    const letters = JSON.parse(localStorage.getItem("letters")) || [];

    container.innerHTML = "";

    letters.forEach((letter, index) => {

        container.innerHTML += `
        <div class="entry">

            <div class="meta">${letter.date}</div>

            <div class="title">${letter.title || "Untitled Letter"}</div>

            <p>${letter.content}</p>

            ${letter.song ? `<div class="media">🎵 ${letter.song}</div>` : ""}

            ${letter.film ? `<div class="media">🎬 ${letter.film}</div>` : ""}

            <button onclick="deleteLetter(${index})">🗑 Delete</button>

        </div>
        `;

    });

}

function deleteLetter(index) {

    let letters = JSON.parse(localStorage.getItem("letters")) || [];

    letters.splice(index, 1);

    localStorage.setItem("letters", JSON.stringify(letters));

    renderLetters();

}

function playEnvelopeAnimation(callback) {

    const overlay = document.getElementById("envelopeOverlay");

    const envelope = document.querySelector(".envelope");

    overlay.classList.remove("hidden");

    setTimeout(() => {
        envelope.classList.add("open");
    }, 200);

    setTimeout(() => {

        overlay.classList.add("hidden");

        envelope.classList.remove("open");

        if (callback) callback();

    }, 1800);

}

renderLetters();
