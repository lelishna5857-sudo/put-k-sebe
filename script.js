// ============ НАСТРОЙКИ: вставьте сюда свои ссылки ============
const LINKS = {
  vk: "#",         // бот в VK, например https://vk.me/ваше_сообщество
  tg: "#",         // бот в Telegram, например https://t.me/ваш_бот
  vkchannel: "#"   // ваш VK-канал, например https://vk.com/ваше_сообщество
};

// ============ ДЕМО-КАРТЫ ============
// Сюда можно добавлять новые карты. Картинку положите в папку images
// и впишите имя файла в поле image (если картинки нет, останется рисунок из CSS).
const CARDS = [
  {
    title: "Первый шаг",
    block: "Блок 6 · Движение и действие",
    situation: "Большая цель пугает, и кажется, что начинать ещё рано.",
    mood: "Мне не нужно видеть всю лестницу, достаточно первой ступени. Я делаю первый шаг сегодня. Маленький шаг — уже движение. Путь открывается тому, кто идёт. Я выбираю начать из любви и благодарности.",
    practice: "Какой самый маленький шаг к цели ты можешь сделать сегодня? Сделай его.",
    image: "images/first-step.jpg"
  },
  {
    title: "Опора",
    block: "Блок 5 · Уверенность и вера",
    situation: "Когда опора снаружи — в людях, деньгах, обстоятельствах, — любая перемена выбивает почву из-под ног.",
    mood: "Моя опора внутри меня. Я стою на своих ногах уверенно и спокойно. Что бы ни происходило вокруг, я остаюсь собой. Я опираюсь на свой опыт, свою силу и свои ценности. Я выбираю опору на себя из любви и благодарности.",
    practice: "Встань, почувствуй стопы на полу и скажи: «Я здесь. Я опираюсь на себя».",
    image: "images/support.jpg"
  }
];

// ============ ССЫЛКИ ============
document.querySelectorAll("[data-link]").forEach(function (a) {
  a.href = LINKS[a.dataset.link] || "#";
});

// ============ ДЕМО ============
const choose = document.getElementById("demo-choose");
const result = document.getElementById("demo-result");
const img = document.getElementById("card-img");
let last = -1;

function show(i) {
  const c = CARDS[i];
  document.getElementById("card-title").textContent = c.title;
  document.getElementById("card-art-name").textContent = c.title;
  document.getElementById("card-block").textContent = c.block;
  document.getElementById("card-situation").textContent = c.situation;
  document.getElementById("card-mood").textContent = c.mood;
  document.getElementById("card-practice").textContent = c.practice;

  // Картинка карты: если файла нет, остаётся рисунок из CSS
  img.hidden = true;
  if (c.image) {
    img.onload = function () { img.hidden = false; };
    img.onerror = function () { img.hidden = true; };
    img.src = c.image;
  }

  choose.hidden = true;
  result.hidden = false;
  result.style.animation = "none";
  void result.offsetWidth; // перезапуск анимации
  result.style.animation = "";
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}

function pick() {
  // случайная карта, не повторяем предыдущую подряд
  let i;
  do { i = Math.floor(Math.random() * CARDS.length); } while (CARDS.length > 1 && i === last);
  last = i;
  show(i);
}

document.querySelectorAll(".back").forEach(function (b) { b.addEventListener("click", pick); });
document.getElementById("again").addEventListener("click", function () {
  result.hidden = true;
  choose.hidden = false;
  document.getElementById("demo").scrollIntoView({ behavior: "smooth" });
});

// ============ ГОД В ПОДВАЛЕ ============
document.getElementById("year").textContent = new Date().getFullYear();
