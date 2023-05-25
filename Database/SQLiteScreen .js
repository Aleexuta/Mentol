import React from "react";
import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";
// const db = SQLite.openDatabase(
//   {
//     name: 'mydb',
//     location: 'default',
//   },
//   () => {
//     console.log('Database connected!');
//   }, //on success
//   error => console.log('Database error', error), //on error
// );
const db = SQLite.openDatabase("myDB");

const createNoteTable = () => {
  db.transaction((tx) =>
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note VARCHAR, date VARCHAR, result VARCHAR)",
      [],
      (result) => {
        console.log("Table created successfully");
      },
      (error) => {
        console.log("Create table error", error);
      }
    )
  );
};
const createNote = (text, date) => {
  let sql = "INSERT INTO notes (note, date) VALUES (?, ?)";
  db.transaction((tx) =>
    tx.executeSql(
      sql,
      [text, date],
      (result) => {
        Alert.alert("Success", "Note created successfully.");
      },
      (error) => {
        console.log("Create note error", error);
      }
    )
  );
};
//list all the notes
const listNotes = () => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM notes";
    db.transaction(
      (tx) => {
        tx.executeSql(
          sql,
          [],
          (_, resultSet) => {
            var length = resultSet.rows.length;
            var tempData = [];
            for (var i = 0; i < length; i++) {
              tempData.push(resultSet.rows.item(i));
            }
            resolve(tempData);
          },
          (error) => {
            console.log("List notes error", error);
            reject([]);
          }
        );
      },
      (error) => {
        console.log("Transaction error", error);
        reject([]);
      }
    );
  });
};

//update note record
const updateNote = (note, date, id) => {
  let sql = "UPDATE notes SET note = ?, date = ? WHERE id = ?";
  let params = [note, date, id];
  db.transaction((tx) =>
    tx.executeSql(
      sql,
      params,
      (resultSet) => {
        Alert.alert("Success", "Record updated successfully");
      },
      (error) => {
        console.log(error);
      }
    )
  );
};

//delete note record
const deleteNote = (id) => {
  let sql = "DELETE FROM notes WHERE id = ?";
  let params = [id];
  db.transaction((tx) =>
    tx.executeSql(
      sql,
      params,
      (resultSet) => {
        Alert.alert("Success", "Note deleted successfully");
      },
      (error) => {
        console.log("Delete note error", error);
      }
    )
  );
};

//update note record
const setResultNote = (result, id) => {
  let sql = "UPDATE notes SET reslt = ? WHERE id = ?";
  let params = [result, id];
  db.executeSql(
    sql,
    params,
    (resultSet) => {
      Alert.alert("Success", "Record updated successfully");
    },
    (error) => {
      console.log(error);
    }
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
