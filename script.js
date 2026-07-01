// =====================================
// Letters I Never Sent v2
// Part 1
// =====================================

const opening = document.getElementById("opening");
const collection = document.getElementById("collection");
const writer = document.getElementById("writer");
const reader = document.getElementById("reader");

const introEnvelope = document.getElementById("introEnvelope");

const writeBtn = document.getElementById("writeBtn");
const saveBtn = document.getElementById("saveLetter");
const cancelBtn = document.querySelector(".back");
const backBtn = document.getElementById("backToCollection");

const letterCollection = document.getElementById("letterCollection");
const letterView = document.getElementById("letterView");

function showScreen(screen){

document.querySelectorAll(".screen").forEach(page=>{

page.classList.remove("active");

});

screen.classList.add("active");

}

let letters = JSON.parse(localStorage.getItem("letters")) || [];

introEnvelope.addEventListener("click",()=>{

introEnvelope.classList.add("open");

setTimeout(()=>{

showScreen(collection);

renderLetters();

introEnvelope.classList.remove("open");

},1200);

});

writeBtn.addEventListener("click",()=>{

showScreen(writer);

});

cancelBtn.addEventListener("click",()=>{

showScreen(collection);

});

backBtn.addEventListener("click",()=>{

showScreen(collection);

});
// =====================================
// Letters I Never Sent v2
// Part 1
// =====================================

const opening = document.getElementById("opening");
const collection = document.getElementById("collection");
const writer = document.getElementById("writer");
const reader = document.getElementById("reader");

const introEnvelope = document.getElementById("introEnvelope");

const writeBtn = document.getElementById("writeBtn");
const saveBtn = document.getElementById("saveLetter");
const cancelBtn = document.querySelector(".back");
const backBtn = document.getElementById("backToCollection");

const letterCollection = document.getElementById("letterCollection");
const letterView = document.getElementById("letterView");

function showScreen(screen){

document.querySelectorAll(".screen").forEach(page=>{

page.classList.remove("active");

});

screen.classList.add("active");

}

let letters = JSON.parse(localStorage.getItem("letters")) || [];

introEnvelope.addEventListener("click",()=>{

introEnvelope.classList.add("open");

setTimeout(()=>{

showScreen(collection);

renderLetters();

introEnvelope.classList.remove("open");

},1200);

});

writeBtn.addEventListener("click",()=>{

showScreen(writer);

});

cancelBtn.addEventListener("click",()=>{

showScreen(collection);

});

backBtn.addEventListener("click",()=>{

showScreen(collection);

});
// =====================================
// Render Envelope Collection
// =====================================

function renderLetters(){

letters = JSON.parse(localStorage.getItem("letters")) || [];

letterCollection.innerHTML = "";

if(letters.length===0){

letterCollection.innerHTML=`

<div class="empty">

<h2>No letters yet 💙</h2>

<p>Write your first letter.</p>

</div>

`;

return;

}

letters.forEach((letter,index)=>{

const card=document.createElement("div");

card.className="letter-card";

card.innerHTML=`

<div class="letter-title">

${letter.title}

</div>

`;

card.addEventListener("click",()=>{

openLetter(index);

});

letterCollection.appendChild(card);

});

}

// =====================================
// Open Letter
// =====================================

function openLetter(index){

const letter=letters[index];

letterView.innerHTML=`

<div class="meta">

${letter.date}

</div>

<h3>

${letter.title}

</h3>

<p>

${letter.content.replace(/\n/g,"<br>")}

</p>

${letter.song ? `<div class="media">🎵 ${letter.song}</div>` : ""}

${letter.film ? `<div class="media">🎬 ${letter.film}</div>` : ""}

<button class="deleteBtn" onclick="deleteLetter(${index})">

Delete Letter

</button>

`;

showScreen(reader);

                }
// =====================================
// Delete Letter
// =====================================

function deleteLetter(index){

if(!confirm("Delete this letter forever?")){

return;

}

letters.splice(index,1);

localStorage.setItem(

"letters",

JSON.stringify(letters)

);

showScreen(collection);

renderLetters();

}

// =====================================
// Helper Functions
// =====================================

function playTransition(callback){

const transition=document.getElementById("transition");

transition.classList.add("show");

setTimeout(()=>{

if(callback){

callback();

}

transition.classList.remove("show");

},500);

}

// =====================================
// Open Letter With Transition
// =====================================

const originalOpenLetter=openLetter;

openLetter=function(index){

playTransition(()=>{

originalOpenLetter(index);

});

};
// =====================================
// Startup
// =====================================

window.addEventListener("load",()=>{

showScreen(opening);

letters = JSON.parse(localStorage.getItem("letters")) || [];

renderLetters();

});

// =====================================
// Keyboard Shortcut
// Ctrl/Cmd + Enter = Save Letter
// =====================================

document.getElementById("content").addEventListener("keydown",(e)=>{

if((e.ctrlKey || e.metaKey) && e.key==="Enter"){

e.preventDefault();

saveLetter();

}

});

// =====================================
// Keep Local Storage Synced
// =====================================

window.addEventListener("storage",()=>{

letters = JSON.parse(localStorage.getItem("letters")) || [];

renderLetters();

});
