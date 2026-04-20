const notes = JSON.parse(localStorage.getItem("notes")) || [];
function renderNote() {
  const searchInput = document.querySelector(".search-input").value;
  let filteredNotes = notes;
  filteredNotes = notes.filter((note) => {
    return note.title.includes(searchInput);
  });
  let htmlNote = "";
  filteredNotes.forEach((note, index) => {
    const { title, content } = note;
    htmlNote += `
      <div class="note"><button class="delete" onclick="deleteNote(${index})"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff0303"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
          <h4>${title}</h4>
          <p>${content}</p>
        </div>

    `;
  });
  const search = document.querySelector(".search-input");
  search.addEventListener("keyup", () => {
    renderNote();
  });
  document.querySelector(".notes").innerHTML = htmlNote;
}
renderNote();
function addNote() {
  const title = document.getElementById("noteTitle").value;
  const content = document.getElementById("noteContent").value;
  if (!title || !content) return;
  notes.push({ title, content });

  document.getElementById("noteTitle").value = "";
  document.getElementById("noteContent").value = "";
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNote();
}
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.removeItem("notes");
  renderNote();
}
document.getElementById("addNoteBtn").addEventListener("click", addNote);
const toggleBtn = document.getElementById("themeToggle");

let vantaEffect = null;

function updateIcon() {
  if (document.body.classList.contains("dark")) {
    toggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-800v-120h80v120h-80Zm0 760v-120h80v120h-80Zm360-400v-80h120v80H800Zm-760 0v-80h120v80H40Zm708-252-56-56 70-72 58 58-72 70ZM198-140l-58-58 72-70 56 56-70 72Zm564 0-70-72 56-56 72 70-58 58ZM212-692l-72-70 58-58 70 72-56 56Zm98 382q-70-70-70-170t70-170q70-70 170-70t170 70q70 70 70 170t-70 170q-70 70-170 70t-170-70Zm283.5-56.5Q640-413 640-480t-46.5-113.5Q547-640 480-640t-113.5 46.5Q320-547 320-480t46.5 113.5Q413-320 480-320t113.5-46.5ZM480-480Z"/></svg>`;
  } else {
    toggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>`;
  }
}

window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  updateIcon();
  initVanta();
});

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);

  updateIcon();
  initVanta();
});

function initVanta() {
  if (vantaEffect) vantaEffect.destroy();

  vantaEffect = VANTA.BIRDS({
    el: "#vanta-birds",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,

    backgroundColor: document.body.classList.contains("dark")
      ? 0x000000
      : 0xffffff,

    color1: 0x3adfc0,
    color2: 0x0f0f0f,
    colorMode: "lerp",
    backgroundAlpha: 0.87,
  });
}
