import http from "node:http";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import open, { apps } from "open";

/**
 * Creates a server using the http core node module.
 * @param {Array} notes - The array of notes to be rendered in the HTML template.
 * @returns {http.Server} - The created server.
 */
function createServer(notes) {
    return http.createServer(async (req, res) => {
        // use fileURLToPath to avoid error related to Windows type file path.
        const htmlTemplateFilePath = fileURLToPath(
            new URL("template.html", import.meta.url)
        );
        // encoding is imp otherwise Buffer will be returned.
        let templateContent = await fs.readFile(htmlTemplateFilePath, {
            encoding: "utf-8",
        });

        const html = interpolate(templateContent, formatNotesForHTML(notes));
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    });
}

/**
 * Replaces the placeholder in the HTML template with the new HTML code or "No notes found" if newHTMLCode is falsy.
 * @param {string} htmltemplate - The HTML template string.
 * @param {string} newHTMLCode - The new HTML code to be inserted in the template.
 * @returns {string} - The interpolated HTML content.
 */
function interpolate(htmltemplate, newHTMLCode) {
    return (htmltemplate = htmltemplate.replace(
        "{{ notes }}",
        newHTMLCode || "No notes found"
    ));
}

/**
 * Formats the notes array into HTML content.
 * @param {Array} notes - The array of notes to be formatted.
 * @returns {string} - The formatted HTML content.
 */
function formatNotesForHTML(notes) {
    return notes
        .map(({ tags, id, context }) => {
            return `<div class="note">
                <details>
                    <summary>${context}</summary>
                    <p class="tags">Tags: ${tags}</p>
                    <p class="id">ID:   ${id}</p>
                </details>
            </div>`;
        })
        .join("\n");
}

/**
 * Renders the notes in a browser by creating a server and listening on the specified port.
 * @param {Array} notes - The array of notes to be rendered.
 * @param {number} port - The port number to listen on.
 */
export async function renderNotesInBrowser(notes, port) {
    const addr = `http://localhost:${port}`;
    let server = createServer(notes);
    server.listen(port, "0.0.0.0", () => {
        console.log(`Check your notes on: ${addr}`);
    });
    // Opens the URL in the default browser in incognito mode.
    await open(addr);
}
