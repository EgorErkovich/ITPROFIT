import './styles.sass';

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

const modalText = document.createElement('div');
modalText.id = 'modalText';
modalText.textContent = 'Сделано Ерковичем Егором.';

modalContent.appendChild(closeButton);
modalContent.appendChild(modalText);
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
