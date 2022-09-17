import express, { application } from 'express';

const app = express();

app.get('/games', (req, res) => {
	return res.json([]);
});

app.post('/ads', (req, res) => {
	return res.status(201).json([]);
});

app.get('/games/:id/ads', (req, res) => {
	const gameId = req.params.id;
	res.json([
		{ name: 'Google', url: 'https://google.com' },
		{ name: 'Facebook', url: 'https://facebook.com' },
		{ name: 'Twitter', url: 'https://twitter.com' },
		{ name: 'Instagram', url: 'https://instagram.com' },
	]);
});

app.get('ads/:id/discord', (req, res) => {
	const adId = req.params.id;
	return res.json([]);
});

app.listen(3333, () => {
	console.log('Server started on port 3333');
});
