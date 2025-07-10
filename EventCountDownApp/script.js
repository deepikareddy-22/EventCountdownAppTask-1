const eventForm = document.getElementById('eventForm');
const eventsContainer = document.getElementById('eventsContainer');
let events = JSON.parse(localStorage.getItem('events')) || [];

function saveEvents() {
  localStorage.setItem('events', JSON.stringify(events));
}

function showEvents() {
  eventsContainer.innerHTML = '';
  events.forEach((event, index) => {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';

    const countdown = document.createElement('div');
    countdown.className = 'countdown';
    countdown.id = `countdown-${index}`;

    const reminder = event.email
      ? `<div class="reminder">Reminder will be sent to: ${event.email}</div>`
      : '';

    eventCard.innerHTML = `
      <div class="category-icon">${event.category}</div>
      <h3>${event.title}</h3>
      <p>${event.description}</p>
      ${countdown.outerHTML}
      ${reminder}
      <button class="btn delete-btn" onclick="deleteEvent(${index})">Delete</button>
    `;
    eventsContainer.appendChild(eventCard);
    updateCountdown(index);
    setInterval(() => updateCountdown(index), 1000);
  });
}

function updateCountdown(index) {
  const now = new Date().getTime();
  const eventDate = new Date(events[index].datetime).getTime();
  const distance = eventDate - now;

  const countdownEl = document.getElementById(`countdown-${index}`);

  if (distance <= 0) {
    countdownEl.innerHTML = `🎉 ${events[index].title} is happening now!`;
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.innerHTML = `${days} Days ${hours}:${minutes}:${seconds}`;

  if (events[index].email && !events[index].reminded && distance <= 86400000) {
    console.log(
      `Reminder: '${events[index].title}' is happening tomorrow. Email sent to: ${events[index].email}`
    );
    alert(
      `Reminder: '${events[index].title}' is happening tomorrow. Email sent to: ${events[index].email}`
    );
    events[index].reminded = true;
    saveEvents();
  }
}

function deleteEvent(index) {
  if (confirm('Are you sure you want to delete this event?')) {
    events.splice(index, 1);
    saveEvents();
    showEvents();
  }
}

eventForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const datetime = document.getElementById('datetime').value;
  const email = document.getElementById('email').value.trim();
  const category = document.getElementById('category').value;

  if (!title || !datetime || new Date(datetime) <= new Date()) {
    alert('Please enter a valid future date and fill all required fields.');
    return;
  }

  events.push({ title, description, datetime, email, category, reminded: false });
  saveEvents();
  showEvents();
  eventForm.reset();
});

showEvents();
