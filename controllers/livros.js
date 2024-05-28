import sql from 'mssql';

export const getLivros = (req, res) => {
	const query = `
	SELECT id, titulo, categoria, subcategoria, autor, paginas, status, link_capa
	FROM LIVROS
	WHERE ISNULL(deletado,'') = ''
	`
	new sql.Request().query(query, (err, result) => {
		if (err) {
			console.error("Error executing query:", err);
		} else {
			res.send(result.recordset); // Send query result as response
		}
	});
}

export const postLivros = (req, res) => {
	const query = `INSERT INTO LIVROS VALUES(
		'${req.body.titulo}'
		,'${req.body.categoria}'
		,'${req.body.subcategoria}'
		,'${req.body.autor}'
		,${req.body.paginas}
		,'Ativo'
		,'http://10.0.73.216:83/NodeBiblioteca/capas/${req.body.titulo}.jpg'
		,null)`;

	console.log(query);
	
	new sql.Request().query(query, (err, result) => {
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
	console.log(query);
	new sql.Request().query(query, (err, result) => {
		if (err) {
			console.error("Error executing query:", err);
		} else {
			res.send(result.recordset); // Send query result as response
		}
	});
}