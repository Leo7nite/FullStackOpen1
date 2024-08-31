const Header = ({ title }) => {
	return (
		<>
			<h1>{title}</h1>
		</>
	);
};

const Part = ({ id, name, amountOfEx }) => {
	return (
		<>
			<li id={id}>
				{name} {amountOfEx}
			</li>
		</>
	);
};

const TotalSum = ({ sum }) => {
	return (
		<>
			<div>
				<strong>total of {sum} exercises</strong>
			</div>
		</>
	);
};

const Content = ({ parts }) => {
	const sum = parts.reduce((acc, obj) => {
		return acc + obj.exercises;
	}, 0);
	return (
		<>
			{parts.map((part) => (
				<Part id={part.id} name={part.name} amountOfEx={part.exercises} />
			))}
			<TotalSum sum={sum} />
		</>
	);
};
const Course = ({ course }) => {
	return (
		<>
			<div>
				<Header title={course.name} />

				<Content parts={course.parts} />
			</div>
		</>
	);
};

export default Course;
