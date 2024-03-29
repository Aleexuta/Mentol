import React from 'react';
import SQLite from 'react-native-sqlite-storage';
import {Alert} from 'react-native';

const db = SQLite.openDatabase({name: 'myDB', location: 'default'});

const createNoteTable = () => {
  db.transaction(tx =>
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note VARCHAR, date VARCHAR, result VARCHAR)',
      [],
      () => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Create table error', error);
      },
    ),
  );
};

const createNote = (text, date, res) => {
  let sql = 'INSERT INTO notes (note, date, result) VALUES (?, ?, ?)';
  db.transaction(tx =>
    tx.executeSql(
      sql,
      [text, date, res],
      () => {
        //Alert.alert('Success', 'Note created successfully.');
      },
      error => {
        console.log('Create note error', error);
      },
    ),
  );
};

const listNotes = () => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM notes';
    db.transaction(
      tx => {
        tx.executeSql(
          sql,
          [],
          (_, resultSet) => {
            var length = resultSet.rows.length;
            var tempData = [];
            for (var i = 0; i < length; i++) {
              tempData.push(resultSet.rows.item(i));
            }
            console.log(tempData);
            resolve(tempData.reverse());
          },
          error => {
            console.log('List notes error', error);
            reject([]);
          },
        );
      },
      error => {
        console.log('Transaction error', error);
        reject([]);
      },
    );
  });
};

const updateNote = (note, date, id) => {
  let sql = 'UPDATE notes SET note = ?, WHERE id = ?';
  let params = [note, id];
  db.transaction(tx =>
    tx.executeSql(
      sql,
      params,
      () => {
        // Alert.alert('Success', 'Record updated successfully');
      },
      error => {
        console.log(error);
      },
    ),
  );
};

const deleteNote = id => {
  let sql = 'DELETE FROM notes WHERE id = ?';
  let params = [id];
  db.transaction(tx =>
    tx.executeSql(
      sql,
      params,
      () => {
        Alert.alert('Success', 'Note deleted successfully');
      },
      error => {
        console.log('Delete note error', error);
      },
    ),
  );
};

const setResultNote = (result, id) => {
  let sql = 'UPDATE notes SET result = ? WHERE id = ?';
  let params = [result, id];
  db.transaction(tx =>
    tx.executeSql(
      sql,
      params,
      () => {
        Alert.alert('Success', 'Record updated successfully');
      },
      error => {
        console.log(error);
      },
    ),
  );
};

export {
  createNoteTable,
  createNote,
  listNotes,
  updateNote,
  deleteNote,
  setResultNote,
};
