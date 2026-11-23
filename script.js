const CONFIG = { vk: '', tg: '', vkchannel: '', checkout: '' };
const groups = ['Освобождение от чувств','Освобождение от сценариев','Ясность: своё и чужое','Истинные желания и смысл','Уверенность и вера','Движение и действие'];
const CARDS = CARDS_DATA.map(([title,situation,mood,practice], index) => ({
  id:index+1,title,situation,mood,practice,
  block:`Блок ${Math.floor(index/6)+1} · ${groups[Math.floor(index/6)]}`
}));
const byId = id => CARDS.find(card => card.id === Number(id));
const choose = document.getElementById('demo-choose');
const result = document.getElementById('demo-result');
const spread = document.getElementById('spread-result');
let lastId = 0;
function randomCards(count, exclude=[]) {
  const pool=CARDS.filter(card=>!exclude.includes(card.id));
  for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  return pool.slice(0,count);
}
function show(card) {
  spread.hidden=true;
  for(const key of ['title','block','situation','mood','practice'])
    document.getElementById(`card-${key}`).textContent=card[key];
  choose.hidden=true; result.hidden=false; lastId=card.id;
  result.scrollIntoView({behavior:'smooth',block:'start'});
}
function dayCard() {
  const d=new Date(), key=`put-k-sebe-day-${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  let id=Number(localStorage.getItem(key));
  if(!byId(id)){id=randomCards(1)[0].id;localStorage.setItem(key,String(id));}
  return byId(id);
}
function renderSpread() {
  result.hidden=true; choose.hidden=true;
  spread.replaceChildren(...randomCards(3).map((card,index)=>{
    const article=document.createElement('article');article.className='reading-card';
    const body=document.createElement('div');
    const position=document.createElement('p');position.className='block-name';
    position.textContent=['Что меня держит','Что важно понять','На что опереться'][index];
    const heading=document.createElement('h3');heading.textContent=card.title;
    body.append(position,heading);
    for(const [label,value] of [['Ситуация',card.situation],['Настрой',card.mood],['Практика',card.practice]]){
      const p=document.createElement('p'),strong=document.createElement('strong');
      strong.textContent=`${label}. `;p.append(strong,value);body.append(p);
    }
    article.append(body);return article;
  }));
  spread.hidden=false;spread.scrollIntoView({behavior:'smooth'});
}
document.querySelectorAll('.back').forEach(button=>button.addEventListener('click',()=>show(randomCards(1,[lastId])[0])));
document.getElementById('again').addEventListener('click',()=>{result.hidden=true;choose.hidden=false;choose.scrollIntoView({behavior:'smooth'});});
document.getElementById('day-button').addEventListener('click',()=>show(dayCard()));
document.getElementById('spread-button').addEventListener('click',renderSpread);
document.getElementById('pick-button').addEventListener('click',()=>{spread.hidden=true;result.hidden=true;choose.hidden=false;choose.scrollIntoView({behavior:'smooth'});});
document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('[data-link]').forEach(link=>{
  const url=CONFIG[link.dataset.link];
  if(url)link.href=url;
  else{link.removeAttribute('href');link.removeAttribute('target');link.setAttribute('aria-disabled','true');link.title='Ссылка скоро появится';}
});
