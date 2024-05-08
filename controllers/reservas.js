import sql from 'mssql';

export const getReservas = (req, res) => {
	new sql.Request().query("SELECT * FROM BIBLIOTECA_RESERVAS", (err, result) => {
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
	new sql.Request().query(`UPDATE BIBLIOTECA_RESERVAS SET DATAHORA_DEVOLUCAO = GETDATE() WHERE ID = '${req.params.id}'`, (err, result) => {
		if (err) {
			console.error("Error executing query:", err);
		} else {
			res.send(result.recordset); // Send query result as response
		}
	});
}