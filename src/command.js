import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as notesUtils from "./notes-utils.js";
import { renderNotesInBrowser } from "./web-utils.js";

yargs(hideBin(process.argv))
    .scriptName("note")
    .command(
        "show",
        "Show all saved notes",
        () => {},
        (argv) => {
            notesUtils.getAllNotes().then((result) => {
                console.log(result.length === 0 ? "No notes found. Add Notes" : result);
            });
        }
    )
    .command(
        "new <note>",
        "Create new note",
        (yargs) => {
            return yargs.positional("note", {
                describe: "The content of new note you want to add",
                type: "string",
            });
        },
        (argv) => {
            const tags = argv.tags ? argv.tags.split(",") : [];
            notesUtils.addNote(argv.note, tags).then((result) => {
                if (!result) {
                    console.log("Error: Can't add your note :O(");
                } else {
                    console.log(result);
                }
            });
        }
    )
    .option("tags", {
        alias: "t",
        type: "string",
        description: "Add tags to the note",
    })
    .command(
        "find <filter>",
        "Find your notes using fuzzy search",
        (yargs) => {
            return yargs.positional("filter", {
                describe: "Filter keyword to search within your saved notes",
                type: "string",
            });
        },
        (argv) => {
            notesUtils.filterNotes(argv.filter).then((result) => {
                if (result.length === 0) {
                    console.log("No notes found with given keyword.");
                } else {
                    console.log(result);
                }
            });
        }
    )
    .command(
        "remove <id>",
        "Remove note with given ID",
        (yargs) => {
            return yargs.positional("id", {
                describe: "id of note which you want to remove",
                type: "string",
            });
        },
        (argv) => {
            notesUtils.removeNoteBasedOnGivenID(argv.id).then((res) => {
                if (res) {
                    console.log("Removed Note with ID:", argv.id);
                } else {
                    console.log("No note found and removed for given ID");
                }
            });
        }
    )
    .command(
        "web [port]",
        "Open your notes in Browser",
        (yargs) => {
            return yargs.positional("port", {
                describe: "port to bind on",
                default: 5000,
                type: "string",
            });
        },
        async (argv) => {
            const notes = await notesUtils.getAllNotes();
            renderNotesInBrowser(notes, argv.port);
        }
    )
    .command(
        "clean",
        "Clean all your notes",
        () => {},
        (argv) => {
            notesUtils.removeAllNotes().then((result) => {
                if (result) {
                    console.log("Removed all notes");
                }
            });
        }
    )
    .demandCommand(1)
    .parse();
