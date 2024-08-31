import { useState, useEffect } from "react";
import phoneBookService from "./services/phonebook";

const Filter = ({ value, onChange }) => {
	return (
		<div>
			<label>filter shown with</label>
			<input value={value} onChange={onChange} />
		</div>
	);
};

const PersonForm = ({
	onSubmit,
	newName,
	handleInputChange,
	newNumber,
	handleInputNumber,
}) => {
	return (
		<form onSubmit={onSubmit}>
			<div>
				name: <input value={newName} onChange={handleInputChange} />
				<br />
				<br />
				number: <input value={newNumber} onChange={handleInputNumber} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

const Persons = ({ persons, onClick }) => {
	return (
		<ul>
			{persons.map((person) => (
				<li key={person.id}>
					{person.name} and {person.number}
					<button onClick={() => onClick(person.id)}>Delete</button>
				</li>
			))}
		</ul>
	);
};

const ErrMsg = ({ error }) => {
	return <div>{error}</div>;
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState(0);
	const [newFilterName, setNewFilterName] = useState("");
	const [newErrorMsg, setNewErrorMsg] = useState("");

	useEffect(() => {
		phoneBookService.getAll().then((initialData) => {
			console.log(initialData);
			setPersons(initialData);
		});
	}, []);

	const handleButton = (event) => {
		event.preventDefault();

		// Check if the person already exists in the phonebook by name
		const existingPerson = persons.find((per) => per.name === newName);

		if (existingPerson) {
			// If the person exists, update their number
			const updatedPerson = { ...existingPerson, number: newNumber };

			phoneBookService
				.update(existingPerson.id, updatedPerson) // Use existingPerson.id here
				.then((returnedPerson) => {
					setPersons(
						persons.map((p) =>
							p.id !== existingPerson.id ? p : returnedPerson
						)
					);
					setNewName("");
					setNewNumber("");
				})
				.catch((error) => {
					alert(`Failed to update ${newName}: ${error}`);
				});

			alert(`${newName} is already added to your phonebook, number updated!`);
		} else {
			// If the person doesn't exist, create a new entry
			const newPerson = {
				name: newName,
				number: newNumber,
			};

			phoneBookService
				.create(newPerson)
				.then((returnedPerson) => {
					setPersons(persons.concat(returnedPerson));
					setNewName("");
					setNewNumber("");

					setNewErrorMsg(`${returnedPerson.name} was added successfuly`);
					setTimeout(() => {
						setNewErrorMsg("");
					}, 5000);
				})
				.catch((error) => {
					alert(`Failed to add ${newName}: ${error}`);
				});
		}
	};

	const updatePerson = (id) => {
		phoneBookService.update(id).then(() => {
			setPersons;
		});
	};

	const handleInputChange = (event) => {
		setNewName(event.target.value);
	};

	const handleInputNumber = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilterInputName = (event) => {
		setNewFilterName(event.target.value);
	};

	const filteredPersons = newFilterName
		? persons.filter((person) =>
				person.name.toLowerCase().includes(newFilterName.toLowerCase())
		  )
		: persons;

	const deletePersonBtn = (id) => {
		const person = persons.find((n) => n.id === id);
		console.log(person);
		phoneBookService
			.deleteObj(id)
			.then(() => {
				setPersons(persons.filter((n) => n.id !== id));
			})
			.catch((error) => {
				alert(
					"The person " + person.name + " was already deleted from the server!"
				);
				setPersons(persons.filter((n) => n.id !== id));
			});
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<ErrMsg error={newErrorMsg} />
			<Filter value={newFilterName} onChange={handleFilterInputName} />

			<h3>Add a new</h3>

			<PersonForm
				onSubmit={handleButton}
				newName={newName}
				handleInputChange={handleInputChange}
				newNumber={newNumber}
				handleInputNumber={handleInputNumber}
			/>

			<h3>Numbers</h3>

			<Persons
				persons={filteredPersons}
				onClick={deletePersonBtn}
				onChange={updatePerson}
			/>
		</div>
	);
};

export default App;
