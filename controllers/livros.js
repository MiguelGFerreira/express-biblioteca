import sql from 'mssql';

export const getLivros = (req, res) => {
	new sql.Request().query("SELECT * FROM LIVROS", (err, result) => {
		if (err) {
			console.error("Error executing query:", err);
		} else {
			res.send(result.recordset); // Send query result as response
			console.log("Foi feito uma consulta na tabela LIVROS")
		}
	});
}

export const postLivros = (req, res) => {
	new sql.Request().query(`INSERT INTO LIVROS VALUES(
		'${req.body.titulo}'
		,'${req.body.categoria}'
		,'${req.body.subcategoria}'
		,'${req.body.autor}'
		,'${req.body.status}'
		,'TESTE')`, (err, result) => {
		if (err) {
			console.error("Error executing query:", err);
		} else {
			res.send(result.recordset); // Send query result as response
		}
	});
}

export const getLivro = (req, res) => {
	new sql.Request().query(`SELECT * FROM LIVROS WHERE id = '${req.params.id}'`, (err, result) => {
		if (err) {
			console.error("Error executing query:", err);
		} else {
			res.send(result.recordset); // Send query result as response
		}
	});
}

export const patchLivro = (req, res) => {
	const colsArray = []
	const keys = Object.keys(req.body)
	for (const key of keys) {
		console.log(`${key} = ${req.body[key]}`)
		colsArray.push(`${key} = '${req.body[key]}'`)
	}
	const query = `UPDATE LIVROS SET ${colsArray.join(', ')} WHERE id = ${req.params.id}`
	new sql.Request().query(query, (err, result) => {
		if (err) {
			console.error("Error executing query:", err);
		} else {
			res.send(result.recordset); // Send query result as response
		}
	});
}