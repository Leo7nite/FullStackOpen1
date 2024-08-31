const express = require("express");
const app = express();

app.use(express.json());

let persons = [
	{
		id: "1",
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: "2",
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: "3",
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: "4",
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.get("/api/persons", (request, response) => {
	response.json(persons);
});

app.get("/info", (request, response) => {
	const dateNow = new Date().toString();
	response.send(`
        <p>
            Phonebook has info for ${persons.length} people <br />
            <br />
            ${dateNow}
        </p>
    `);
});

app.get("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	const person = persons.find((person) => person.id === id);
	if (person) {
		response.json(person);
	} else {
		response.status(404).send(`Cannot GET /api/persons/${id}`).end();
	}
});

app.delete("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	persons = persons.filter((person) => person.id !== id);
	response.status(204).end();
});

app.post("/api/persons", (request, response) => {
	const body = request.body;
	const id = Math.floor(Math.random() * 1000000000000).toString();
	const name = body.name;
	const number = body.number;
	// Check if name or number is missing
	if (!name || !number) {
		return response.status(404).json({
			error: "Name or number is missing!",
		});
	}

	// Check if name already exists in the database
	if (persons.some((person) => person.name === name)) {
		return response.status(404).json({
			error: "Name already exists in the database",
		});
	}

	const person = {
		id: id,
		name: body.name,
		number: body.number,
	};
	persons = persons.concat(person);

	response.json(person);
});

const PORT = 3002;
app.listen(PORT, () => {
	console.log("Listening on ", PORT);
});
