import './styles.sass';
import telegram from '../../assets/telegram.png';
import linkedin from '../../assets/linkedin.png';
import github from '../../assets/github.png';

const body = document.body;

const openModalButton = document.createElement('button');
openModalButton.id = 'openModal';
openModalButton.className = 'open-button';
openModalButton.textContent = 'Открыть модальное окно';
body.appendChild(openModalButton);

const modal = document.createElement('div');
modal.id = 'modal';
modal.className = 'modal';

const modalContent = document.createElement('div');
modalContent.className = 'modal-content';

const closeButton = document.createElement('span');
closeButton.className = 'close-button';
closeButton.textContent = '×';

const header = document.createElement('h2');
header.textContent = 'Мои контакты';
modalContent.appendChild(header);

const linkList = document.createElement('div');
linkList.className = 'link-list';

const links = [
	{ href: 'https://t.me/Ederkovich', text: 'Telegram', imgSrc: telegram },
	{ href: 'https://www.linkedin.com/in/egor-erkovich/', text: 'LinkedIn', imgSrc: linkedin },
	{ href: 'https://github.com/EgorErkovich', text: 'GitHub', imgSrc: github },
];

links.forEach(link => {
	const linkItem = document.createElement('div');
	linkItem.className = 'link-item';

	const img = document.createElement('img');
	img.src = link.imgSrc;
	img.alt = link.text;
	img.className = 'link-icon';

	const a = document.createElement('a');
	a.href = link.href;
	a.textContent = link.text;
	a.target = '_blank';

	linkItem.appendChild(img);
	linkItem.appendChild(a);
	linkList.appendChild(linkItem);
});

modalContent.appendChild(closeButton);
modalContent.appendChild(linkList);
modal.appendChild(modalContent);
body.appendChild(modal);

openModalButton.addEventListener('click', () => {
	const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
	body.style.paddingRight = `${scrollBarWidth}px`;

	modal.classList.add('show');
	openModalButton.classList.add('hidden');
	body.classList.add('no-scroll');
});

closeButton.addEventListener('click', () => {
	closeModal();
});

modal.addEventListener('click', (event) => {
	if (event.target === modal) {
		closeModal();
	}
});

function closeModal() {
	modal.classList.remove('show');
	openModalButton.classList.remove('hidden');
	body.classList.remove('no-scroll');
	body.style.paddingRight = '';
}
