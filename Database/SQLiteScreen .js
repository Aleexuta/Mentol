import React from 'react';
import SQLite from 'react-native-sqlite-storage';
import {Alert} from 'react-native';
const db = SQLite.openDatabase(
  {
    name: 'mydb',
    location: 'default',
  },
  () => {
    console.log('Database connected!');
  }, //on success
  error => console.log('Database error', error), //on error
);

const createNoteTable = () => {
  db.executeSql(
    'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note VARCHAR, date VARCHAR, result VARCHAR)',
    [],
    result => {
      console.log('Table created successfully');
    },
    error => {
      console.log('Create table error', error);
    },
  );
};
const createNote = (text, date) => {
  let sql = 'INSERT INTO notes (note, date) VALUES (?, ?)';
  db.executeSql(
    sql,
    [text, date],
    result => {
      Alert.alert('Success', 'Note created successfully.');
    },
    error => {
      console.log('Create note error', error);
    },
  );
};
//list all the notes
const listNotes = async () => {
  let sql = 'SELECT * FROM notes';
  db.transaction(tx => {
    tx.executeSql(
      sql,
      [],
      (tx, resultSet) => {
        var length = resultSet.rows.length;
        for (var i = 0; i < length; i++) {
          console.log(resultSet.rows.item(i));
        }
      },
      error => {
        console.log('List user error', error);
      },
    );
  });
};

//update note record
const updateNote = (note, date, id) => {
  let sql = 'UPDATE notes SET note = ?, date = ? WHERE id = ?';
  let params = [note, date, id];
  db.executeSql(
    sql,
    params,
    resultSet => {
      Alert.alert('Success', 'Record updated successfully');
    },
    error => {
      console.log(error);
    },
  );
};

//delete note record
const deleteNote = () => {
  let sql = 'DELETE FROM note WHERE id = ?';
  let params = [1];
  db.executeSql(
    sql,
    params,
    resultSet => {
      Alert.alert('Success', 'Note deleted successfully');
    },
    error => {
      console.log('Delete note error', error);
    },
  );
};

//update note record
const setResultNote = (result, id) => {
  let sql = 'UPDATE notes SET reslt = ? WHERE id = ?';
  let params = [result, id];
  db.executeSql(
    sql,
    params,
    resultSet => {
      Alert.alert('Success', 'Record updated successfully');
    },
    error => {
      console.log(error);
    },
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
