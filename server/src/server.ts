import express from 'express';

const app = express();

app.get('/ads', (req, res) => {
	res.json([
		{ name: 'Google', url: 'https://google.com' },
		{ name: 'Facebook', url: 'https://facebook.com' },
		{ name: 'Twitter', url: 'https://twitter.com' },
		{ name: 'Instagram', url: 'https://instagram.com' },
	]);
});

app.listen(3333, () => {
	console.log('Server started on port 3333');
});
