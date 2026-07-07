import { app } from './app.js';
import 'dotenv/config';

const port = process.env.PORT;

app.listen(port).on("listening", () => {
	console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
