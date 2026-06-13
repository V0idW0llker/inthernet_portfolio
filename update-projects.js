const fs = require('fs');

const file = 'index.html';
let s = fs.readFileSync(file, 'utf8');

const start = s.indexOf('<section class="projects-section"');
if (start < 0) throw new Error('projects section start not found');
const end = s.indexOf('</section>', start);
if (end < 0) throw new Error('projects section end not found');

const before = s.slice(0, start);
const after = s.slice(end + '</section>'.length);

const repl = `
<section class="projects-section" id="projects">
    <div class="projects-text">
        <h2 class="section-title">Мои проекты</h2>
        <p>Так как я учусь в IT-колледже (top-academy), мы постоянно делаем какие-то проекты. На парах с преподавателем или сами. Кто-то один делает, а бывает, что в паре или небольшой группкой собираемся.</p>
        <p>Сейчас в основном я стараюсь хранить свои проекты на GitHub, но я так стал делать только в по��леднее время. К сожалению, некоторые мои проекты, более старые, удалены, а некоторые хранятся только локально.</p>
        <p class="projects-hint">Ниже — карусель с проектами. Можно перетаскивать мышью (drag), навести курсор чтобы остановить автопрокрутку, или листать свайпом на телефоне.</p>
    </div>

    <div class="projects-carousel" aria-label="Карусель проектов">
        <div class="carousel-container">
            <div class="carousel-track">
                <article class="project-card">
                    <div class="project-icon">🏗️</div>
                    <h3 class="project-title">stroyinvest-k</h3>
                    <p class="project-desc">Сайт для строительной компании <em>StroyInvest-K</em>. Современный дизайн, адаптивная верстка.</p>
                    <p class="project-stack"><span>Стек:</span> Django, Python, HTML, CSS, JavaScript</p>
                    <div class="project-actions">
                        <a href="https://stroyinvest-k.ru" class="project-link" target="_blank" rel="noopener">Сайт ���</a>
                        <a href="https://github.com/V0idW0llker" class="project-link" target="_blank" rel="noopener">GitHub →</a>
                    </div>
                </article>

                <article class="project-card">
                    <div class="project-icon">♟️</div>
                    <h3 class="project-title">Chess-Game ("Chess of War")</h3>
                    <p class="project-desc">Локальная многопользовательская игра в шахматы с сетевым режимом. Полноценная логика игры, удобный интерфейс.</p>
                    <p class="project-stack"><span>Стек:</span> C# (.NET)</p>
                    <div class="project-actions">
                        <a href="https://github.com/V0idW0llker" class="project-link" target="_blank" rel="noopener">GitHub →</a>
                    </div>
                </article>

                <article class="project-card">
                    <div class="project-icon">💼</div>
                    <h3 class="project-title">portfolio_tipa</h3>
                    <p class="project-desc">Персональный сайт-портфолио. Минималистичный стиль, плавные ани��ации, быстрая загрузка.</p>
                    <p class="project-stack"><span>Стек:</span> HTML, CSS, JavaScript</p>
                    <div class="project-actions">
                        <a href="https://github.com/V0idW0llker" class="project-link" target="_blank" rel="noopener">GitHub →</a>
                    </div>
                </article>

                <article class="project-card">
                    <div class="project-icon">👕</div>
                    <h3 class="project-title">Inversiy_demo</h3>
                    <p class="project-desc">Демо-версия интернет-магазина одежды. Каталог товаров, корзина, фильтрация.</p>
                    <p class="project-stack"><span>Стек:</span> HTML, CSS, JavaScript</p>
                    <div class="project-actions">
                        <a href="https://github.com/V0idW0llker" class="project-link" target="_blank" rel="noopener">GitHub →</a>
                    </div>
                </article>

                <article class="project-card">
                    <div class="project-icon">⌚</div>
                    <h3 class="project-title">Veyra-Altura <span class="project-badge">участие ограничено</span></h3>
                    <p class="project-desc">Виджет для отслеживания времени на устройстве. Участие в проекте было частичным — детали стека и архитектуры неизвестны.</p>
                    <div class="project-actions">
                        <a href="https://github.com/V0idW0llker" class="project-link" target="_blank" rel="noopener">GitHub →</a>
                    </div>
                </article>
            </div>
        </div>

        <button class="carousel-btn prev" type="button" aria-label="Предыдущие проекты">←</button>
        <button class="carousel-btn next" type="button" aria-label="Следующие проекты">→</button>

        <div class="carousel-indicators" aria-hidden="true"></div>
    </div>

    <div style="text-align: center; margin-top: 20px;">
        <a href="https://github.com/V0idW0llker?tab=repositories" class="btn btn-primary" target="_blank" rel="noopener">
            Смотреть все проекты на GitHub
        </a>
    </div>
</section>
`;

fs.writeFileSync(file, before + repl + after, 'utf8');
console.log('index.html updated');
