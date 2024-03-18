import { getDataFromDB, saveDataToDB, insertDataToDB } from "./db.js";

/**
 * Retrieves all notes from the database.
 * @returns {Promise<Array<Object>>} An array of objects containing notes content.
 */
export const getAllNotes = async () => {
    // returns array of object which contain notes content
    return (await getDataFromDB()).notes;
};

// Add new note to db
export const addNote = async (noteContext, tags) => {
    const newNote = {
        tags, // equivalent to 'tags: tags,
        id: Date.now(),
        context: noteContext,
    };
    const res = await insertDataToDB(newNote);
    return res ? newNote : false;
};

// Filter node based on provided filter keyword
export const filterNotes = async (filterkey) => {
    let db = await getDataFromDB();
    return db.notes.filter((noteObj) => {
        return noteObj.context.toLowerCase().includes(filterkey.toLowerCase());
    });
};

/**
 * Removes a note from the database based on the given ID.
 * @param {number} noteID - The ID of the note to be removed.
 * @returns {Promise<boolean>} - A promise that resolves to true if the note is successfully removed, false otherwise.
 */
export const removeNoteBasedOnGivenID = async (noteID) => {
    noteID = Number(noteID);
    let db = await getDataFromDB();
    // - Corrected removeNoteBasedOnGivenID function
    let newDB = db.notes.filter((noteObj) => {
        return noteObj.id !== noteID;
    });
    db.notes = newDB
    const res = await saveDataToDB(db);
    return res ? true : false;
};

// Remove all notes from DB
export const removeAllNotes = async () => {
    const saveResult = await saveDataToDB({ notes: [] });
    return saveResult === true ? true : false;
};
