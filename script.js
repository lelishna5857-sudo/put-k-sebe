const CONFIG = { vk: '', tg: '', vkchannel: '', checkout: '' };
const groups = ['Освобождение от вины','Право хотеть','Границы и выбор','Принятие себя','Уверенность и вера','Движение и действие'];
// Title, situation, affirmation, practice. IDs and media paths stay stable for future bot APIs.
const entries = [
['Отпустить вину','Ты снова ищешь ошибку в прошлом.','Я беру из прошлого опыт и выбираю бережность к себе.','Назови один урок и один способ поддержать себя.'],
['Не моя ответственность','Ты отвечаешь за чувства других.','Я отвечаю за свои действия; чужой путь принадлежит другому.','Запиши, что сегодня действительно зависит от тебя.'],
['Достаточно','Кажется, что сделано слишком мало.','Мои усилия имеют значение. Мне можно остановиться.','Перечисли три уже завершённых дела.'],
['Прощение себе','Одна ошибка затмевает всё хорошее.','Ошибки не отменяют моей ценности. Я учусь.','Скажи себе слова, которые сказала бы другу.'],
['Чужие ожидания','Ты пытаешься соответствовать всем.','Я могу уважать других и слышать себя.','Спроси: чей это выбор на самом деле?'],
['Лёгкое сердце','Старая обида забирает силы.','Я отпускаю то, что больше не помогает мне жить.','Выдохни и назови чувство, которому даёшь место.'],
['Моё желание','Ты откладываешь свои желания.','Моё желание заслуживает внимания уже сейчас.','Запиши одно желание без оправданий.'],
['Право на радость','Радость кажется наградой за труд.','Я могу радоваться без особого повода.','Удели десять минут тому, что радует.'],
['Честный ответ','Трудно признаться себе, чего хочется.','Я могу говорить с собой честно и мягко.','Закончи: «Если бы я не боялась, я бы…»'],
['Свободное мечтание','Практичность не оставляет места мечте.','Мечта помогает мне увидеть направление.','Представь желаемый день и запиши три детали.'],
['Разрешение получать','Принимать помощь или похвалу неловко.','Я могу принимать добро без долга и вины.','Ответь на комплимент простым «спасибо».'],
['Место для себя','В расписании нет времени для тебя.','Мои потребности важны. Я оставляю себе время.','Выдели пятнадцать минут только для себя.'],
['Мягкое нет','Ты соглашаешься раньше, чем подумаешь.','Моё «нет» сохраняет мои силы.','Скажи: «Спасибо, сейчас мне это не подходит».'],
['Мой выбор','Ты ждёшь разрешения на решение.','Я могу выбирать и менять направление.','Назови один выбор, который сделаешь сегодня.'],
['Пауза','Срочность других становится твоей.','Я имею право на паузу перед ответом.','Сделай три вдоха, прежде чем согласиться.'],
['Личное пространство','Твои границы остаются невидимыми.','Я могу обозначать, что для меня приемлемо.','Сформулируй одну границу простым предложением.'],
['Без объяснений','Каждый отказ хочется оправдать.','Я могу беречь себя без длинных доказательств.','Попробуй короткий уважительный отказ.'],
['Верность себе','Чужие мнения отдаляют тебя от себя.','Я слышу свои ценности и следую им.','Запиши ценность, на которую опираешься.'],
['Настоящая я','Ты сравниваешь себя с идеалом.','Мне не нужно быть идеальной, чтобы быть ценной.','Заметь качество, которое уже помогает тебе.'],
['Все мои чувства','Некоторые чувства хочется спрятать.','Каждое чувство несёт сигнал. Я выслушаю себя.','Назови чувство и стоящую за ним потребность.'],
['Своё тело','Ты замечаешь тело, когда оно устало.','Моё тело заслуживает внимания и заботы.','Найди напряжение и мягко расслабь эту область.'],
['Сравнение','Чужой успех кажется мерой твоей жизни.','У меня свой ритм и свой путь.','Вспомни, чему ты научилась за год.'],
['Несовершенство','Страх ошибки мешает показать работу.','Живое и настоящее важнее безупречного.','Заверши одно дело достаточно хорошо.'],
['Тихая забота','Забота о себе всё время откладывается.','Я забочусь о себе маленькими действиями.','Спроси тело, что ему нужно сейчас.'],
['Внутренняя опора','Перемены лишают чувства устойчивости.','Моя опора внутри: опыт, сила и ценности.','Почувствуй стопы и скажи: «Я здесь».'],
['Доверие себе','Ты сомневаешься в каждом решении.','Я учусь доверять своему выбору.','Вспомни решение, которое было верным.'],
['Смелость быть','Страх оценки заставляет прятаться.','Я могу быть видимой и оставаться собой.','Покажи кому-то часть своей работы.'],
['Мои силы','Усталость скрывает твои ресурсы.','Во мне есть силы; я могу их пополнять.','Назови три источника энергии на эту неделю.'],
['Надежда','Будущее выглядит туманным.','Мне не нужны все ответы, чтобы продолжать.','Запиши одну открытую возможность.'],
['Вера в путь','Движение кажется слишком медленным.','Маленькие шаги тоже складываются в путь.','Сравни себя с собой месяц назад.'],
['Первый шаг','Большая цель пугает, и начинать рано.','Мне достаточно первой ступени. Я начинаю сегодня.','Сделай самый маленький шаг к цели.'],
['Сегодня','Ты ждёшь идеального момента.','Сегодня достаточно для одного действия.','Выбери дело на пять минут и начни.'],
['Новый поворот','Привычный план больше не работает.','Я могу искать другой путь без поражения.','Придумай два новых подхода к задаче.'],
['Маленькая победа','Промежуточный результат незаметен.','Я вижу и ценю свой прогресс.','Отметь один сегодняшний шаг.'],
['Продолжать','После трудного дня хочется сдаться.','Я могу отдохнуть и вернуться к важному.','Назначь время для следующего шага.'],
['Открытая дверь','Путь кажется только один.','Я открыта возможностям и выбираю своё.','Заметь новую возможность сегодня.']
];
const CARDS = entries.map(([title,situation,mood,practice], i) => ({id:i+1,title,situation,mood,practice,block:`Блок ${Math.floor(i/6)+1} · ${groups[Math.floor(i/6)]}`,image:`images/card-${String(i+1).padStart(2,'0')}.svg`,audio:`audio/card-${String(i+1).padStart(2,'0')}.mp3`}));
const byId = id => CARDS.find(c => c.id === Number(id));
const result = document.getElementById('demo-result');
const choose = document.getElementById('demo-choose');
const spread = document.getElementById('spread-result');
const player = document.getElementById('card-audio');
let lastId = 0;
function randomCards(count, exclude=[]) { const pool=CARDS.filter(c=>!exclude.includes(c.id)); for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];} return pool.slice(0,count); }
function show(card) {
  player.pause(); spread.hidden=true;
  const img=document.getElementById('card-img'); img.src=card.image; img.alt=`Иллюстрация карты «${card.title}»`;
  document.getElementById('card-art-name').textContent=card.title;
  for(const field of ['title','block','situation','mood','practice']) document.getElementById(`card-${field}`).textContent=card[field];
  player.src=card.audio; player.setAttribute('aria-label',`Аудио карты ${card.title}`);
  choose.hidden=true; result.hidden=false; lastId=card.id; result.scrollIntoView({behavior:'smooth',block:'start'});
}
function dayCard() { const d=new Date(), key=`put-k-sebe-day-${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`; let id=Number(localStorage.getItem(key)); if(!byId(id)){id=randomCards(1)[0].id;localStorage.setItem(key,String(id));} return byId(id); }
function renderSpread(){ player.pause();result.hidden=true;choose.hidden=true;spread.replaceChildren(...randomCards(3).map((card,i)=>{const a=document.createElement('article');a.className='reading-card';const image=document.createElement('img');image.src=card.image;image.alt=`Иллюстрация карты «${card.title}»`;const body=document.createElement('div');const heading=document.createElement('h3');heading.textContent=card.title;const position=document.createElement('p');position.className='block-name';position.textContent=['Что меня держит','Что важно понять','На что опереться'][i];body.append(position,heading);for(const [label,value] of [['Ситуация',card.situation],['Настрой',card.mood],['Практика',card.practice]]){const p=document.createElement('p');const strong=document.createElement('strong');strong.textContent=label+'. ';p.append(strong,value);body.append(p);}const audio=document.createElement('audio');audio.controls=true;audio.preload='none';audio.src=card.audio;audio.setAttribute('aria-label',`Аудио карты ${card.title}`);body.append(audio);a.append(image,body);return a;}));spread.hidden=false;spread.scrollIntoView({behavior:'smooth'});}
document.querySelectorAll('.back').forEach(b=>b.addEventListener('click',()=>show(randomCards(1,[lastId])[0])));
document.getElementById('again').addEventListener('click',()=>{player.pause();result.hidden=true;choose.hidden=false;choose.scrollIntoView({behavior:'smooth'});});
document.getElementById('day-button').addEventListener('click',()=>show(dayCard()));
document.getElementById('spread-button').addEventListener('click',renderSpread);
document.getElementById('pick-button').addEventListener('click',()=>{spread.hidden=true;result.hidden=true;choose.hidden=false;choose.scrollIntoView({behavior:'smooth'});});
document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('[data-link]').forEach(link=>{const url=CONFIG[link.dataset.link];if(url)link.href=url;else{link.removeAttribute('href');link.removeAttribute('target');link.setAttribute('aria-disabled','true');link.title='Ссылка скоро появится';}});
