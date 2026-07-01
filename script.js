function saveLetter(){

    const title=document.getElementById("title").value;
    const content=document.getElementById("content").value;
    const song=document.getElementById("song").value;
    const film=document.getElementById("film").value;

    if(content==="") return;

    const letter={
        title,
        content,
        song,
        film,
        date:new Date().toLocaleString()
    };

    let letters=JSON.parse(localStorage.getItem("letters"))||[];

    letters.unshift(letter);

    localStorage.setItem("letters",JSON.stringify(letters));

    document.getElementById("title").value="";
    document.getElementById("content").value="";
    document.getElementById("song").value="";
    document.getElementById("film").value="";

    renderLetters();
}

function renderLetters(){

    const container=document.getElementById("entries");

    const letters=JSON.parse(localStorage.getItem("letters"))||[];

    container.innerHTML="";

    letters.forEach(letter=>{

        container.innerHTML+=`
        <div class="entry">
            <div class="meta">${letter.date}</div>

            <div class="title">${letter.title || "Untitled Letter"}</div>

            <p>${letter.content}</p>

            ${letter.song ? `<div class="media">🎵 ${letter.song}</div>` : ""}

            ${letter.film ? `<div class="media">🎬 ${letter.film}</div>` : ""}
        </div>
        `;
    });

}

renderLetters();
