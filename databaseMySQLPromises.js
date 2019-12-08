const mysql = require('promise-mysql');

function getConnection() {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "ikea-trådfri",
        multipleStatements: true
    });
}

exports.read = async function (tableName, id) {
    let connection;
    try {
        connection = await getConnection();
        let query = `SELECT * FROM ${tableName}` + (id ? ` WHERE bulb_id = ${id}` : "");
        let result = await connection.query(query);
        return result.length === 0 ? await Promise.reject() : result;
    } catch (e) {
        throw e;
    } finally {
        if (connection)
            connection.end();
    }
};

exports.create = async function (bulb_id, hardware_type_number, software_version, status_bool, nominal_consumption, actual_consumption, light_intensity = null, color = null) {
    let connection;
    try {
        connection = await getConnection();
        let query = `INSERT INTO smart_bulbs (bulb_id, hardware_type_number, software_version, status_bool, nominal_consumption, actual_consumption, light_intensity, color) VALUES ('${bulb_id}', '${hardware_type_number}', '${software_version}', '${status_bool}','${nominal_consumption}', '${actual_consumption}','${light_intensity}', '${color}')`;
        await connection.query(query);
        return bulb_id;
    } catch (e) {
        throw e;
    } finally {
        if (connection)
            connection.end();
    }
};

exports.update = async function (id, updatedName, updatedPrice) {
    let connection;
    try {
        connection = await getConnection();
        let query = `UPDATE foodstuffs SET fs_name = '${updatedName}', fs_price = '${updatedPrice}' WHERE fs_id = '${id}'`;
        await connection.query(query);
    } catch (e) {
        throw e;
    } finally {
        if (connection)
            connection.end();
    }
};

exports.deleteSomething = async function (id) {
    let connection;
    try {
        connection = await getConnection();
        let query = `DELETE FROM foodstuffs WHERE fs_id = '${id}'`;
        let result = await connection.query(query);
        return result.affectedRows === 0 ? await Promise.reject() : result;
    } catch (e) {
        throw e;
    } finally {
        if (connection)
            connection.end();
    }
};
