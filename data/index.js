'use strict';
const sql = require('mssql');
const { config } = require('../config');


const getProducts = async () => {
    try {
        let pool = await sql.connect(config);
        const result = await pool.query('select * from Product');
        sql.close();
        if (result.recordset.length === 0) {
            return null;
        }
        return result.recordset;
    } catch (err) {
        return err.message;
    }
}

const getProductById = async (productId) => {
    try {
        let pool = await sql.connect(config)
        const result = await pool.request()
            .input('id', sql.Int, productId)
            .query(`select * from Product where ProductId = @id`);
        sql.close();
        if (result.recordset.length === 0) {
            return null;
        }
        return result.recordset[0];
    } catch (err) {
        return err.message;
    }
}

const addProduct = async (data) => {
    try {
        let pool = await sql.connect(config)
        const insertData = await pool.request()
            .input('name', sql.NVarChar, data.name)
            .input('desc', sql.NVarChar, data.desc)
            .query(`insert into Product (ProductName, ProductDescription) values (@name, @desc)`);
        sql.close();
        return insertData.rowsAffected;
    } catch (err) {
        return err.message;
    }
}


const updateProduct = async (updatedData, id) => {
    try {
        let pool = await sql.connect(config);
        const updaData = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.NVarChar, updatedData.name)
            .input('desc', sql.NVarChar, updatedData.desc)
            .query('update Product set (ProductName=@name, ProductDescription=@desc) where ProductId=@id')
        sql.close();
        return updaData.rowsAffected;
    } catch (err) {
        return err.message;
    }
}

const deleteProduct = async (productId) => {
    try {
        let pool = await sql.connect(config)
        const deleteData = await pool.request()
            .input('id', sql.Int, productId)
            .query(`delete from [dbo].[Product] where ProductId = @id`);
        sql.close();
        return deleteData.rowsAffected;
    } catch (err) {
        return err.message;
    }
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}