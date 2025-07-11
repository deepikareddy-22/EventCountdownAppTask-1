const form = document.getElementById("profileForm");
const cardsContainer = document.getElementById("cardsContainer");

let cards = JSON.parse(localStorage.getItem("cards")) || [];
renderCards();

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const bio = document.getElementById("bio").value;
  const borderStyle = document.getElementById("borderStyle").value;
  const imageInput = document.getElementById("image");

  const reader = new FileReader();
  reader.onload = function () {
    const cardData = {
      name,
      bio,
      image: reader.result,
      borderStyle,
      theme: "light"
    };

    cards.push(cardData);
    localStorage.setItem("cards", JSON.stringify(cards));
    renderCards();
    form.reset();
  };

  if (imageInput.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  }
});

function renderCards() {
  cardsContainer.innerHTML = "";
  cards.forEach((card, index) => {
    const cardEl = document.createElement("div");
    cardEl.className = `card ${card.theme}`;

    cardEl.innerHTML = `
      <img src="${card.image}" class="border-${card.borderStyle}" />
      <h3>${card.name}</h3>
      <p>${card.bio}</p>
      <button onclick="toggleTheme(${index})">Toggle Theme</button>
      <button onclick="deleteCard(${index})">Delete</button>
    `;

    cardsContainer.appendChild(cardEl);
  });
}

function deleteCard(index) {
  cards.splice(index, 1);
  localStorage.setItem("cards", JSON.stringify(cards));
  renderCards();
}

function toggleTheme(index) {
  cards[index].theme = cards[index].theme === "light" ? "dark" : "light";
  localStorage.setItem("cards", JSON.stringify(cards));
  renderCards();
}
