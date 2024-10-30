const express = require('express');
const cors = require('cors');
const { validateForm } = require('../src/shared/utils/validation');
const app = express();

const port = 9090;

app.use(cors());
app.use(express.json());

app.post('/api/registration', (req, res) => {
	const errors = validateForm(req.body);

	if (Object.keys(errors).length > 0) {
		return res.status(400).send({ 
			status: 'error',
			fields: errors,
		});
	}

	setTimeout(() => {
		res.status(200).send({
			status: 'success',
			msg: 'Форма успешно отправлена',
		});
	}, Math.random() * 1000);
});

app.get('/api/ping', (req, res) => {
	res.status(200).send({
		status: 'success',
		message: 'Server is ready',
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
