import './styles.sass';
import successImage from '../../assets/success.png';
import errorImage from '../../assets/error.png';

const messageBox = document.createElement('div');
const messageImage = document.createElement('img');
const messageContainer = document.createElement('div');

messageBox.className = 'message';
messageImage.className = 'message-image';
messageImage.src = '';

messageContainer.className = 'message-container';
messageBox.appendChild(messageImage);
messageBox.appendChild(messageContainer);

document.body.appendChild(messageBox);

export function showMessage(message, type) {
	messageContainer.textContent = '';
	const messageText = document.createElement('div');
	messageText.className = 'message-text';

	if (typeof message === 'string') {
		messageText.textContent = message;
	} else {
		Object.entries(message).forEach(([key, value]) => {
			const individualMessage = document.createElement('div');
			individualMessage.textContent = `${key}: ${value}`;
			messageContainer.appendChild(individualMessage);
		});
	}

	messageContainer.appendChild(messageText);

	messageBox.className = `message ${type}`;
	messageImage.src = type === 'success' ? successImage : errorImage;

	messageBox.classList.add('visible');

	const delay = 2500;

	setTimeout(() => {
		messageBox.classList.add('fade-out');
	}, delay);

	setTimeout(() => {
		messageBox.classList.remove('visible');
		messageBox.classList.remove('fade-out');
	}, delay + 800);
}
