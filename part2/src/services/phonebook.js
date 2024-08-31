import axios from "axios";
const baseUrl = "http://localhost:3002/persons";

const getAll = () => {
	const request = axios.get(baseUrl);
	const nonExisting = {
		name: "Non existant",
		number: 9999,
		id: 10000,
	};
	return request.then((response) => response.data.concat(nonExisting));
};

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject);
	return request.then((response) => response.data);
};

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request.then((response) => response.data);
};

const deleteObj = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request.then((response) => response.data);
};

export default {
	getAll,
	create,
	update,
	deleteObj,
};
