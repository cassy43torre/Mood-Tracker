const quotes = {
  '😊': [
    "“Happiness depends upon ourselves.” — Aristotle",
    "“Smile, it confuses people.” — Anonymous",
    "“Wherever you go, no matter the weather, always bring your own sunshine.” — Anthony J. D'Angelo",
    "“Do more of what makes you happy.” — Unknown",
    "“Be happy for this moment. This moment is your life.” — Omar Khayyam"
  ],
  '😢': [
    "“There is a sacredness in tears.” — Washington Irving",
    "“It’s okay to not be okay.” — Unknown",
    "“Tears are words the heart can’t express.” — Unknown",
    "“The emotion that can break your heart is sometimes the very one that heals it.” — Nicholas Sparks",
    "“Every storm runs out of rain.” — Maya Angelou"
  ],
  '😡': [
    "“Speak when you're angry and you'll make the best speech you'll ever regret.” — Ambrose Bierce",
    "“For every minute you remain angry, you give up sixty seconds of peace of mind.” — Ralph Waldo Emerson",
    "“Anger is one letter short of danger.” — Eleanor Roosevelt",
    "“Don’t hold to anger, hurt or pain. They steal your energy and keep you from love.” — Leo Buscaglia",
    "“Control your anger, before it controls you.” — Unknown"
  ],
  '😎': [
    "“Be yourself; everyone else is already taken.” — Oscar Wilde",
    "“Confidence is silent. Insecurities are loud.” — Unknown",
    "“I am not afraid of storms for I am learning how to sail my ship.” — Louisa May Alcott",
    "“Stay cool. Stay kind. Slay always.” — Internet Queen",
    "“The best accessory a girl can wear is confidence.” — Coco Chanel"
  ],
  '🫶': [
    "“You yourself, as much as anybody in the entire universe, deserve your love and affection.” — Buddha",
    "“Love yourself first, and everything else falls into line.” — Lucille Ball",
    "“Self-love is not selfish; you cannot truly love another until you know how to love yourself.” — Unknown",
    "“You carry so much love in your heart. Give some to yourself.” — R.Z.",
    "“Your value doesn’t decrease based on someone’s inability to see your worth.” — Unknown"
  ],
  '🥰': [
    "“To love and be loved is to feel the sun from both sides.” — David Viscott",
    "“Love recognizes no barriers.” — Maya Angelou",
    "“The best thing to hold onto in life is each other.” — Audrey Hepburn",
    "“In all the world, there is no heart for me like yours.” — Maya Angelou",
    "“You are my today and all of my tomorrows.” — Leo Christopher"
  ],
  '🤪': [
    "“Imperfection is beauty, madness is genius and it's better to be absolutely ridiculous than absolutely boring.” — Marilyn Monroe",
    "“You have to be odd to be number one.” — Dr. Seuss",
    "“Stay weird. Stay wonderful.” — Unknown",
    "“If you think you're too small to make a difference, try sleeping with a mosquito.” — Dalai Lama",
    "“Creativity is intelligence having fun.” — Albert Einstein"
  ],
  '😴': [
    "“Sleep is the best meditation.” — Dalai Lama",
    "“Take rest. A field that has rested gives a bountiful crop.” — Ovid",
    "“Rest is not idle, it's productive.” — Unknown",
    "“Even superheroes need naps.” — Internet",
    "“Sleep. Recharge. Conquer.” — Unknown"
  ],
  '🫠': [
    "“Try again tomorrow.” — Mary Anne Radmacher",
    "“You’re not falling apart. You’re just being rearranged.” — Anonymous",
    "“You don’t have to figure it all out right now.” — Unknown",
    "“Sometimes, survival is a form of success.” — Unknown",
    "“Your feelings are valid. Even the melty ones.” — BFF GPT 😭"
  ],
  '💀': [
    "“To die will be an awfully big adventure.” — J.M. Barrie",
    "“You're done but fabulous.” — Internet Baddie",
    "“Deceased, but iconic.” — TikTok Girlies",
    "“Me: alive. Also me: emotionally deceased.” — Memes",
    "“Slayed so hard I passed away.” — Twitter 💀"
  ]
};

const bgColors = {
  '😊': "#fff9e7",
  '😢': "#e7f0ff",
  '😡': "#ffe7e7",
  '😎': "#e7fff3",
  '🫶': "#f9e7ff",
  '🥰': "#ffe7f2",
  '🤪': "#f0fff3",
  '😴': "#f2f2f2",
  '🫠': "#fcefe9",
  '💀': "#eaeaea"
};

let selectedEmoji = null;

function react(emoji) {
  selectedEmoji = emoji;
  const list = quotes[emoji];
  const randomQuote = list[Math.floor(Math.random() * list.length)];
  document.getElementById("message").innerText = randomQuote;
  document.getElementById("page").style.backgroundColor = bgColors[emoji];
}

function saveMood() {
  const note = document.getElementById('note-input').value.trim();
  if (!selectedEmoji) {
    alert("Please select an emoji first!");
    return;
  }

  const moodLog = JSON.parse(localStorage.getItem('moodLog') || '[]');
  const date = new Date().toLocaleString();
  moodLog.unshift({ emoji: selectedEmoji, date, note });
  localStorage.setItem('moodLog', JSON.stringify(moodLog));

  document.getElementById('note-input').value = '';
  displayMoodLog();
  buildCalendar();
}

function displayMoodLog() {
  const moodLog = JSON.parse(localStorage.getItem('moodLog') || '[]');
  const list = document.getElementById('mood-log');
  list.innerHTML = '';

  moodLog.slice(0, 10).forEach(entry => {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${entry.date} — ${entry.emoji}</strong><br>${entry.note || '<em>No message</em>'}`;
    list.appendChild(item);
  });
}

function buildCalendar() {
  const calendarGrid = document.getElementById("calendar-grid");
  calendarGrid.innerHTML = "";

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const moodLog = JSON.parse(localStorage.getItem('moodLog') || '[]');
  const moodByDate = {};
  moodLog.forEach(entry => {
    const key = new Date(entry.date).toDateString();
    if (!moodByDate[key]) moodByDate[key] = entry;
  });

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "calendar-cell";
    calendarGrid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const cell = document.createElement("div");
    cell.className = "calendar-cell";
    const key = date.toDateString();

    let display = `<strong>${day}</strong><br>`;
    if (moodByDate[key]) {
      display += `${moodByDate[key].emoji}`;
      cell.title = moodByDate[key].note || "No message";
    } else {
      display += "—";
    }

    cell.innerHTML = display;
    calendarGrid.appendChild(cell);
  }
}

window.onload = () => {
  displayMoodLog();
  buildCalendar();
};