import React from 'react';
import SQLite from 'react-native-sqlite-storage';

export default class SQLiteScreen extends React.Component {
  constructor() {
    super();
    SQLite.DEBUG = true;
  }

  /**
   * Execute sql queries
   *
   * @param sql
   * @param params
   *
   * @returns {resolve} results
   */
  ExecuteQuery = (sql, params = []) =>
    new Promise((resolve, reject) => {
      global.db.transaction(trans => {
        trans.executeSql(
          sql,
          params,
          (trans, results) => {
            resolve(results);
          },
          error => {
            reject(error);
          },
        );
      });
    });

  // Create Table
  async CreateTable() {
    let Table = await this.executeQuery(
      'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, text TEXT, date text, result text)',
      [],
    );
    console.log(Table);
  }
  /**
   * Insert a row and retrieve the ID for the inserted row
   *
   * @param columnTextValue
   * @param columnDateValue
   *
   * @returns {resolve} insertedRowId
   */
  async InsertQuery(columnTextValue, columnDateValue) {
    const query = 'INSERT INTO notes(text,date) VALUES (?,?)';

    console.log(query);
    try {
      const results = await this.ExecuteQuery(query, [
        columnTextValue,
        columnDateValue,
      ]);
      const insertedRowId = results.insertId;
      return insertedRowId;
    } catch (error) {
      console.log('Error inserting row '.error);
      return null;
    }
  }
}
