const validateEmail = (email) => {
	const template = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return template.test(email);
};

const validatePhone = (phone) => {
	const template = /^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/;
	return template.test(phone);
};

const validateForm = (data) => {
	const { name, email, phone, message } = data;
	let errors = {};

	if (!name) {
		errors.name = 'Имя обязательно для заполнения';
	}
	if (!email) {
		errors.email = 'Email обязательно для заполнения';
	} else if (!validateEmail(email)) {
		errors.email = 'Введите корректный адрес электронной почты';
	}
	if (!phone) {
		errors.phone = 'Телефон обязателен для заполнения';
	} else if (!validatePhone(phone)) {
		errors.phone = 'Введите корректный номер телефона';
	}
	if (!message) {
		errors.message = 'Сообщение обязательно для заполнения';
	}

	return errors;
};

module.exports = { validateForm };
