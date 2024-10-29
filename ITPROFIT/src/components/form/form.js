import './styles.sass';

const body = document.body;

const form = document.createElement('form');
form.id = 'contactForm';

const title = document.createElement('h2');
title.textContent = 'Обратная связь';
form.appendChild(title);

const fields = [
	{ label: 'Имя', type: 'text', id: 'name', placeholder: 'Введите ваше имя' },
	{ label: 'E-mail', type: 'email', id: 'email', placeholder: 'Введите ваш E-mail' },
	{ label: 'Телефон', type: 'text', id: 'phone', placeholder: 'Введите ваш телефон' },
	{ label: 'Сообщение', type: 'textarea', id: 'message', placeholder: 'Введите ваше сообщение', rows: 5 }
];

fields.forEach(field => {
	const formGroup = document.createElement('div');
	formGroup.className = 'form-group';

	const label = document.createElement('label');
	label.setAttribute('for', field.id);
	label.textContent = field.label;

	let input;
	if (field.type === 'textarea') {
		input = document.createElement('textarea');
		input.rows = field.rows;
		input.placeholder = field.placeholder;
	} else {
		input = document.createElement('input');
		input.type = field.type;
		input.placeholder = field.placeholder;
	}

	input.id = field.id;
	input.name = field.id;

	const errorDiv = document.createElement('div');
	errorDiv.className = 'error-message';

	formGroup.appendChild(label);
	formGroup.appendChild(input);
	formGroup.appendChild(errorDiv);
	form.appendChild(formGroup);
});

const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.className = 'submit-button';
submitButton.textContent = 'Отправить';

form.appendChild(submitButton);
body.appendChild(form);

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const formData = {};
    
	fields.forEach(field => {
		const input = document.getElementById(field.id);
		formData[field.id] = input.value;
	});

	console.log(formData);
});
