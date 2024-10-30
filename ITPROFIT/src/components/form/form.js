import './styles.sass';
import Inputmask from 'inputmask';
import { showMessage } from '../../components/message/message';

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

	if (field.id === 'phone') {
		const phoneMask = new Inputmask('+375 (99) 999-99-99', { showMaskOnHover: false, showMaskOnFocus: true });
		phoneMask.mask(input);
	}

	input.id = field.id;
	input.name = field.id;

	const errorDiv = document.createElement('div');
	errorDiv.className = 'error-message';
	errorDiv.textContent = ' ';

	formGroup.appendChild(label);
	formGroup.appendChild(input);
	formGroup.appendChild(errorDiv);
	form.appendChild(formGroup);
});

const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.className = 'submit-button';
submitButton.textContent = 'Отправить';
submitButton.disabled = false;

form.appendChild(submitButton);
body.appendChild(form);

form.addEventListener('input', () => {
	checkForErrors();
});

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const formData = {};

	fields.forEach(field => {
		const input = document.getElementById(field.id);
		formData[field.id] = input.value;
	});

	fetch('http://localhost:9090/api/registration', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData)
	})
		.then(response => {
			if (!response.ok) {
				return response.json().then(error => {
					throw new Error(JSON.stringify(error));
				});
			}
			return response.json();
		})
		.then(data => {
			console.log(data);
			form.reset();
			clearErrors();
			showMessage(data.msg, data.status);
		})
		.catch(error => {
			console.error(`Error: ${error.message}`);
			const errorObj = JSON.parse(error.message);
			const errorFields = errorObj.fields;

			handleErrors(errorFields);
			showMessage(errorFields, errorObj.status);
			checkForErrors();
		});
});

function checkForErrors() {
	const hasErrors = fields.some(field => {
		const input = document.getElementById(field.id);
		return input.classList.contains('error');
	});
	submitButton.disabled = hasErrors;
}

function handleErrors(fields) {
	clearErrors();
	
	for (const [field, message] of Object.entries(fields)) {
		const input = document.getElementById(field);
		const errorDiv = input.nextElementSibling;
		if (input) {
			input.classList.add('error');
			errorDiv.textContent = message;

			input.addEventListener('input', () => {
				input.classList.remove('error');
				errorDiv.textContent = '';
			});
		}
	}
}

function clearErrors() {
	fields.forEach(field => {
		const input = document.getElementById(field.id);
		const errorDiv = input.nextElementSibling;
		input.classList.remove('error');
		errorDiv.textContent = '';
	});
}

checkForErrors();
