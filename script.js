const CONFIG = { vk: '', tg: '', vkchannel: '', checkout: '' };
const groups = ['Освобождение от чувств','Освобождение от сценариев','Ясность: своё и чужое','Истинные желания и смысл','Уверенность и вера','Движение и действие'];
const CARDS = CARDS_DATA.map(([title,situation,mood,practice], index) => ({
  id:index+1,title,situation,mood,practice,
  block:`Блок ${Math.floor(index/6)+1} · ${groups[Math.floor(index/6)]}`
}));
const byId = id => CARDS.find(card => card.id === Number(id));
// Заполняется по номеру карты после сверки авторских файлов.
const cardMedia = {
  24: { image: 'images/IMG_20261123_214127_702.jpg', audio: 'audio/goal-original.mp3' }
};
let lastId = 0;

function stopPlayback() {
  document.querySelectorAll('audio').forEach(player => player.pause());
}

function appendRecording(details, card, url) {
  const player = document.createElement('audio');
  player.controls = true;
  player.preload = 'none';
  player.src = url;
  player.setAttribute('aria-label', 'Запись карты «' + card.title + '»');
  const listen = document.createElement('button');
  listen.type = 'button';
  listen.className = 'btn btn-line listen-button';
  listen.textContent = 'Послушать карту';
  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  listen.addEventListener('click', async () => {
    if (!player.paused) { player.pause(); return; }
    try { await player.play(); }
    catch { status.textContent = 'Не удалось включить запись. Попробуйте ещё раз.'; }
  });
  player.addEventListener('play', () => {
    document.querySelectorAll('audio').forEach(other => {
      if (other !== player) other.pause();
    });
    status.textContent = '';
    listen.textContent = 'Пауза';
  });
  player.addEventListener('pause', () => { listen.textContent = 'Послушать карту'; });
  details.append(listen, player, status);
}
function randomCards(count, exclude=[]) {
  const pool=CARDS.filter(card=>!exclude.includes(card.id));
  for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  return pool.slice(0,count);
}
function dayCard() {
  const d=new Date(), key=`put-k-sebe-day-${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  let id=Number(localStorage.getItem(key));
  if(!byId(id)){id=randomCards(1)[0].id;localStorage.setItem(key,String(id));}
  return byId(id);
}
const reading = document.getElementById('reading');
const positions = ['Что меня держит', 'Что важно понять', 'На что опереться'];

function makeCard(card, position) {
  const article = document.createElement('article');
  article.className = 'reading-card';
  const heading = document.createElement('p');
  heading.className = 'block-name';
  heading.textContent = position;
  const turn = document.createElement('button');
  turn.type = 'button';
  turn.className = 'turn';
  turn.setAttribute('aria-label', 'Открыть карту · ' + position);
  turn.setAttribute('aria-expanded', 'false');
  const back = document.createElement('span');
  back.className = 'turn-back';
  back.textContent = 'Открыть карту';
  const face = document.createElement('span');
  face.className = 'turn-face';
  face.setAttribute('aria-hidden', 'true');
  turn.append(back, face);
  const details = document.createElement('div');
  details.hidden = true;
  article.append(heading, turn, details);

  turn.addEventListener('click', () => {
    const media = cardMedia[card.id];
    if (media?.image) {
      const image = document.createElement('img');
      image.src = media.image;
      image.alt = card.title;
      face.append(image);
    } else {
      face.textContent = card.title;
    }
    turn.classList.add('opened');
    turn.setAttribute('aria-expanded', 'true');
    turn.setAttribute('aria-label', 'Открыта карта «' + card.title + '»');
    turn.setAttribute('aria-disabled', 'true');
    const title = document.createElement('h3');
    title.textContent = card.title;
    details.append(title);
    for (const [label, value] of [['Ситуация', card.situation], ['Настрой', card.mood], ['Практика', card.practice]]) {
      const p = document.createElement('p');
      const name = document.createElement('strong');
      name.textContent = label + '. ';
      p.append(name, value);
      details.append(p);
    }
    if (media?.audio) appendRecording(details, card, media.audio);
    details.hidden = false;
    if (!positions.includes(position)) lastId = card.id;
  }, { once: true });
  return article;
}

function deal(cards, labels) {
  stopPlayback();
  reading.classList.toggle('three', cards.length === 3);
  reading.replaceChildren(...cards.map((card, index) => makeCard(card, labels[index])));
}
function single() { deal(randomCards(1, [lastId]), ['Одна карта']); }
document.getElementById('day-button').addEventListener('click', () => deal([dayCard()], ['Карта дня']));
document.getElementById('spread-button').addEventListener('click', () => deal(randomCards(3), positions));
document.getElementById('pick-button').addEventListener('click', single);
document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('[data-link]').forEach(link=>{
  const url=CONFIG[link.dataset.link];
  if(url)link.href=url;
  else{link.removeAttribute('href');link.removeAttribute('target');link.setAttribute('aria-disabled','true');link.title='Ссылка скоро появится';}
});

const linkedCard = byId(new URLSearchParams(location.search).get('card'));
if (linkedCard) {
  deal([linkedCard], [linkedCard.title]);
  reading.scrollIntoView({ block: 'start' });
} else {
  single();
}
