function GradesTable({ grades, questions, students }) {
	if (questions === null || students === null || grades === null) {
		return <h3>No students, no assignments, or no grades to display</h3>
	}

	return (
		<table>
		<thead>
			<tr>
			<th>Student</th>
			{questions.map((q) => (
				<th key={q.questionTitle}>{q.questionTitle}</th>
			))}
			</tr>
		</thead>
		<tbody>
			{students.map((item) => (
				<tr key={item.id}>
					<td>{item.id}</td>
					{questions.map((q) => {
						const datapoint = grades.find(obj => obj.id === item.id && obj.question === q.questionTitle);
						return datapoint !== undefined ? 
							<td key={`${item.id}-${q.questionTitle}`}>
								{datapoint.score}
							</td>
							: <td>-</td>
					})}
				</tr>
			))}
		</tbody>
		</table>
	);
}

export default GradesTable;