// ===============================
// Letters I Never Sent v2
// Part 1
// ===============================

const opening = document.getElementById("opening");
const collection = document.getElementById("collection");
const writer = document.getElementById("writer");
const reader = document.getElementById("reader");

const startEnvelope = document.getElementById("startEnvelope");
const newLetterBtn = document.getElementById("newLetterBtn");
const saveBtn = document.getElementById("saveBtn");

const backButtons = document.querySelectorAll(".backBtn");

const letterGrid = document.getElementById("letterGrid");
const letterView = document.getElementById("letterView");

function showScreen(screen){

    document.querySelectorAll(".screen").forEach(s=>{
        s.classList.remove("active");
    });

    screen.classList.add("active");

}

startEnvelope.addEventListener("click",()=>{

    startEnvelope.classList.add("open");

    setTimeout(()=>{

        showScreen(collection);

        renderLetters();

    },1200);

});

newLetterBtn.addEventListener("click",()=>{

    showScreen(writer);

});

backButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        showScreen(collection);

        renderLetters();

    });

});
// ===============================
// Save a Letter
// ===============================

saveBtn.addEventListener("click", saveLetter);

function saveLetter(){

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const song = document.getElementById("song").value.trim();
    const film = document.getElementById("film").value.trim();

    if(content === ""){

        alert("Write something first 💙");
        return;

    }

    const letters = JSON.parse(localStorage.getItem("letters")) || [];

    letters.unshift({

        title: title || "Untitled Letter",

        content,

        song,

        film,

        date: new Date().toLocaleString()

    });

    localStorage.setItem("letters", JSON.stringify(letters));

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("song").value = "";
    document.getElementById("film").value = "";

    showScreen(collection);

    renderLetters();

}
// ===============================
// Render Envelope Collection
// ===============================

function renderLetters(){

    const letters = JSON.parse(localStorage.getItem("letters")) || [];

    letterGrid.innerHTML = "";

    if(letters.length === 0){

        letterGrid.innerHTML = `
            <div style="
                width:100%;
                text-align:center;
                opacity:.8;
                padding:40px;
            ">
                <h3>No letters yet 💙</h3>
                <p>Write your first letter.</p>
            </div>
        `;

        return;

    }

    letters.forEach((letter,index)=>{

        const card = document.createElement("div");

        card.className = "letter-card";

        card.innerHTML = `
            <div class="letter-title">
                ${letter.title}
            </div>
        `;

        card.addEventListener("click",()=>{

            openLetter(index);

        });

        letterGrid.appendChild(card);

    });

}
// ===============================
// Open Letter
// ===============================

function openLetter(index){

    const letters = JSON.parse(localStorage.getItem("letters")) || [];

    const letter = letters[index];

    letterView.innerHTML = `

        <div class="meta">
            ${letter.date}
        </div>

        <h3>
            ${letter.title}
        </h3>

        <p>
            ${letter.content.replace(/\n/g,"<br>")}
        </p>

        ${
            letter.song
            ? `<p><strong>🎵 Song:</strong> ${letter.song}</p>`
            : ""
        }

        ${
            letter.film
            ? `<p><strong>🎬 Film:</strong> ${letter.film}</p>`
            : ""
        }

        <button
            class="deleteBtn"
            onclick="deleteLetter(${index})">
            🗑 Delete Letter
        </button>

    `;

    showScreen(reader);

}

// ===============================
// Delete Letter
// ===============================

function deleteLetter(index){

    if(!confirm("Delete this letter forever?")) return;

    let letters = JSON.parse(localStorage.getItem("letters")) || [];

    letters.splice(index,1);

    localStorage.setItem(
        "letters",
        JSON.stringify(letters)
    );

    showScreen(collection);

    renderLetters();

              }
// ===============================
// PART 5 - Startup & Animations
// ===============================

// Fade between screens
function fadeTo(screen){

    document.querySelectorAll(".screen").forEach(s=>{

        s.style.opacity="0";

    });

    setTimeout(()=>{

        showScreen(screen);

        screen.style.opacity="1";

    },250);

}

// Floating animation for envelopes
function animateEnvelopes(){

    const cards=document.querySelectorAll(".letter-card");

    cards.forEach((card,index)=>{

        card.style.animation=
            `float 3s ease-in-out ${index*0.15}s infinite`;

    });

}

// Override render to animate cards
const oldRender=renderLetters;

renderLetters=function(){

    oldRender();

    animateEnvelopes();

}

// Start website
window.onload=function(){

    showScreen(opening);

    renderLetters();

}
