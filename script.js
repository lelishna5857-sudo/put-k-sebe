const CONFIG = { vk: '', tg: '', vkchannel: '', checkout: '' };
const groups = ['Освобождение от чувств','Освобождение от сценариев','Ясность: своё и чужое','Истинные желания и смысл','Уверенность и вера','Движение и действие'];
const entries = CARDS_DATA;
const MEDIA_VERSION = '20261123-3';
const CARDS = entries.map(([title,situation,mood,practice], i) => ({id:i+1,title,situation,mood,practice,block:`Блок ${Math.floor(i/6)+1} · ${groups[Math.floor(i/6)]}`,image:`images/card-${String(i+1).padStart(2,'0')}.svg?v=${MEDIA_VERSION}`,audio:`audio/card-${String(i+1).padStart(2,'0')}.mp3?v=${MEDIA_VERSION}`}));
const byId = id => CARDS.find(c => c.id === Number(id));
const result = document.getElementById('demo-result');
const choose = document.getElementById('demo-choose');
const spread = document.getElementById('spread-result');
const player = document.getElementById('card-audio');
const listenCard = document.getElementById('listen-card');
const audioStatus = document.getElementById('audio-status');
let lastId = 0;
function stopAudio() {
  document.querySelectorAll('audio').forEach(audio => audio.pause());
}
function bindListen(button, audio, status) {
  button.addEventListener('click', async () => {
    if (!audio.paused) { audio.pause(); return; }
    stopAudio();
    status.textContent = 'Загружаю озвучку…';
    try { await audio.play(); }
    catch { status.textContent = 'Не удалось запустить звук. Проверьте подключение и громкость устройства.'; }
  });
  audio.addEventListener('play', () => { button.textContent = '❚❚ Пауза'; status.textContent = 'Озвучка воспроизводится'; });
  audio.addEventListener('pause', () => { button.textContent = '▶ Озвучить карту'; if (status.textContent === 'Озвучка воспроизводится') status.textContent = 'Пауза'; });
  audio.addEventListener('ended', () => { button.textContent = '▶ Озвучить снова'; status.textContent = 'Озвучка завершена'; });
  audio.addEventListener('error', () => { status.textContent = 'Аудиофайл не загрузился. Обновите страницу и попробуйте ещё раз.'; });
}
bindListen(listenCard, player, audioStatus);
function randomCards(count, exclude=[]) { const pool=CARDS.filter(c=>!exclude.includes(c.id)); for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];} return pool.slice(0,count); }
function show(card) {
  stopAudio(); spread.hidden=true; audioStatus.textContent='';
  const img=document.getElementById('card-img'); img.hidden=false; img.src=card.image; img.alt=`Иллюстрация карты «${card.title}»`;
  document.getElementById('card-art-name').textContent=card.title;
  for(const field of ['title','block','situation','mood','practice']) document.getElementById(`card-${field}`).textContent=card[field];
  player.src=card.audio; player.setAttribute('aria-label',`Аудио карты ${card.title}`);
  choose.hidden=true; result.hidden=false; lastId=card.id; result.scrollIntoView({behavior:'smooth',block:'start'});
}
function dayCard() { const d=new Date(), key=`put-k-sebe-day-${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`; let id=Number(localStorage.getItem(key)); if(!byId(id)){id=randomCards(1)[0].id;localStorage.setItem(key,String(id));} return byId(id); }
function renderSpread(){ stopAudio();result.hidden=true;choose.hidden=true;spread.replaceChildren(...randomCards(3).map((card,i)=>{const a=document.createElement('article');a.className='reading-card';const image=document.createElement('img');image.src=card.image;image.alt=`Иллюстрация карты «${card.title}»`;const body=document.createElement('div');const heading=document.createElement('h3');heading.textContent=card.title;const position=document.createElement('p');position.className='block-name';position.textContent=['Что меня держит','Что важно понять','На что опереться'][i];body.append(position,heading);for(const [label,value] of [['Ситуация',card.situation],['Настрой',card.mood],['Практика',card.practice]]){const p=document.createElement('p');const strong=document.createElement('strong');strong.textContent=label+'. ';p.append(strong,value);body.append(p);}const audio=document.createElement('audio');audio.controls=true;audio.preload='none';audio.src=card.audio;audio.setAttribute('aria-label',`Аудио карты ${card.title}`);const button=document.createElement('button');button.className='btn btn-gold listen-button';button.type='button';button.textContent='▶ Озвучить карту';const status=document.createElement('p');status.className='audio-status';status.setAttribute('role','status');bindListen(button,audio,status);body.append(button,audio,status);a.append(image,body);return a;}));spread.hidden=false;spread.scrollIntoView({behavior:'smooth'});}
document.querySelectorAll('.back').forEach(b=>b.addEventListener('click',()=>show(randomCards(1,[lastId])[0])));
document.getElementById('again').addEventListener('click',()=>{stopAudio();result.hidden=true;choose.hidden=false;choose.scrollIntoView({behavior:'smooth'});});
document.getElementById('day-button').addEventListener('click',()=>show(dayCard()));
document.getElementById('spread-button').addEventListener('click',renderSpread);
document.getElementById('pick-button').addEventListener('click',()=>{spread.hidden=true;result.hidden=true;choose.hidden=false;choose.scrollIntoView({behavior:'smooth'});});
document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('[data-link]').forEach(link=>{const url=CONFIG[link.dataset.link];if(url)link.href=url;else{link.removeAttribute('href');link.removeAttribute('target');link.setAttribute('aria-disabled','true');link.title='Ссылка скоро появится';}});
