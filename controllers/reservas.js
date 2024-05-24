import sql from 'mssql';

export const getReservas = (req, res) => {
	const query = `
		SELECT R.id, L.titulo, R.matricula, TRIM(RA_NOME) nome, CONVERT(VARCHAR,R.data_emprestimo,103) data_emprestimo,
		ISNULL(CONVERT(VARCHAR,R.data_devolucao,103),'Não devolvido') data_devolucao
		FROM BIBLIOTECA_RESERVAS R
		INNER JOIN LIVROS L ON R.id_livro = L.id
		LEFT JOIN FOLV2210..SRA010 RA ON RA_MAT = R.matricula
	`
	new sql.Request().query(query, (err, result) => {
		if (err) {
			console.error("Error executing query:", err);
		} else {
			res.send(result.recordset); // Send query result as response
		}
	});
}

export const postReserva = (req, res) => {
	new sql.Request().query(`INSERT INTO BIBLIOTECA_RESERVAS VALUES(
		'${req.body.MATRICULA}'
		,${req.body.ID_LIVRO}
		,GETDATE()
		,NULL)`, (err, result) => {
		if (err) {
			console.error("Error executing query:", err);
		} else {
			res.send(result.recordset); // Send query result as response
		}
	});
}

export const getReserva = (req, res) => {
	new sql.Request().query(`SELECT * FROM BIBLIOTECA_RESERVAS WHERE ID = '${req.params.id}'`, (err, result) => {
		if (err) {
			console.error("Error executing query:", err);
		} else {
			res.send(result.recordset); // Send query result as response
		}
	});
}

export const patchReserva = (req, res) => {
	new sql.Request().query(`UPDATE BIBLIOTECA_RESERVAS SET data_devolucao = GETDATE() WHERE id = '${req.params.id}'`, (err, result) => {
		if (err) {
			console.error("Error executing query:", err);
		} else {
			res.send(result.recordset); // Send query result as response
		}
	});
}