import fs from "node:fs/promises";
import { URL, fileURLToPath } from "node:url";

const DB_PATH = fileURLToPath(new URL("../dbStore.json", import.meta.url));

/**
 * Retrieves data from the database.
 * @returns {Promise<Object|boolean>} The data from the database, or false if an error occurs.
 */
export const getDataFromDB = async () => {
    try {
        const dbContent = await fs.readFile(DB_PATH, "utf-8");
        return JSON.parse(dbContent);
    } catch (err) {
        console.log(err.message);
        return false;
    }
};

/**
 * Saves data to the database.
 * @param {Object} dbInJSOForm - The data to be saved in JavaScript object form.
 * @returns {Promise<boolean>} A boolean indicating whether the data was successfully saved.
 */
export const saveDataToDB = async (dbInJSOForm) => {
    // fn is going to take dbInJSOForm (JavaScript Object) then convert it to
    // JSON representation and save it to DB.
    // fs.writeFile overwrite whole file, with new modified DB with newNotes, RemovedNotes
    // and sometime totally removed notes from DB.
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(dbInJSOForm, null, 2));
        return true;
    } catch (err) {
        console.log(err.message);
        return false;
    }
};

/**
 * Inserts data into the database.
 * @param {Object} newNote - The new note to be inserted into the database.
 * @returns {Promise<boolean>} A boolean indicating whether the data was successfully inserted.
 */
export const insertDataToDB = async (newNote) => {
    try {
        let dbInJSOForm = await getDataFromDB(DB_PATH);
        dbInJSOForm.notes.push(newNote);
        await saveDataToDB(dbInJSOForm);
        return true;
    } catch (err) {
        console.log(err.message);
        return false;
    }
};
