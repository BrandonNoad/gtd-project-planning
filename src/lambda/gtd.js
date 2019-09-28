'use strict';

const path = require('path');

// If .env.development is missing (e.g production), this will fail silently.
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.development') });

const Boom = require('boom');
const Joi = require('joi');
const Evernote = require('evernote');

const generateEnexList = (inputString) => {
    const listItems = inputString
        .split('\n')
        .map((li) => li.trim())
        .filter((li) => li.length > 0)
        .map((li) => `<li><div>${li}</div></li>`);

    if (listItems.length === 0) {
        return '';
    }

    return `<ul>${listItems.join('')}</ul>`;
};

const generateEnexNextActionsTable = (nextAction) => {
    const colWidth = 300;

    const colStyle = `width: ${colWidth}px;`;

    const tdStyle = `width: ${colWidth}px; padding: 8px; border: 1px solid;`;

    return `<table style="border-collapse: collapse; min-width: 100%;"><colgroup><col style="${colStyle}" /><col style="${colStyle}" /><col style="${colStyle}" /></colgroup><tbody><tr><td style="${tdStyle}"><div><b>Next Actions</b></div></td><td style="${tdStyle}"><div><b>WIP</b></div></td><td style="${tdStyle}"><div><b>Done</b></div></td></tr><tr><td style="${tdStyle}"><div>${
        nextAction !== '' ? `=&gt; ${nextAction}` : '<br />'
    }</div></td><td style="${tdStyle}"><div><br /></div></td><td style="${tdStyle}"><div><br /></div></td></tr></tbody></table>`;
};

exports.handler = async (event, context) => {
    try {
        // -- Check HTTP method.

        if (event.httpMethod !== 'POST') {
            throw Boom.methodNotAllowed();
        }

        // -- Check auth.

        // The user object is present if the function request has an Authorization: Bearer <token>
        // header with a valid JWT from the Identity instance. In this case the object will contain
        // the decoded claims.
        const { user } = context.clientContext;

        if (user === undefined) {
            throw Boom.unauthorized(undefined, 'Bearer');
        }

        // -- Validate payload.

        const payloadSchema = Joi.object({
            projectName: Joi.string()
                .trim()
                .required(),
            purpose: Joi.string()
                .trim()
                .required(),
            outcome: Joi.string()
                .trim()
                .required(),
            brainstorming: Joi.string()
                .trim()
                .allow('')
                .default(''),
            nextAction: Joi.string()
                .trim()
                .allow('')
                .default('')
        });

        const { error, value: postPayload } = Joi.validate(event.body, payloadSchema);

        if (error !== null) {
            throw Boom.boomify(error, { statusCode: 400 });
        }

        const evernoteClient = new Evernote.Client({
            token: process.env.EVERNOTE_DEVELOPER_TOKEN,
            sandbox: !!parseInt(process.env.EVERNOTE_IS_SANDBOX, 10)
        });

        // process.env.EVERNOTE_NOTE_STORE_URL will be undefined in the development environment.
        const evernoteNoteStore = evernoteClient.getNoteStore(process.env.EVERNOTE_NOTE_STORE_URL);

        const evernoteNotebookPayload = {
            ...new Evernote.Types.Notebook(),
            name: postPayload.projectName,
            stack: process.env.EVERNOTE_PROJECTS_STACK
        };

        const newEvernoteNotebook = await evernoteNoteStore.createNotebook(evernoteNotebookPayload);

        const nextActionsTable = generateEnexNextActionsTable(postPayload.nextAction);

        const brainstormingList = generateEnexList(postPayload.brainstorming);

        const noteContent = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd"><en-note>${nextActionsTable}<hr /><div>PURPOSE: ${
            postPayload.purpose
        }</div><hr /><div>OUTCOME: ${
            postPayload.outcome
        }</div><hr /><div>BRAINSTORMING:</div><div><br /></div>${brainstormingList}<div><br /></div></en-note>`;

        const evernoteNotePayload = {
            ...new Evernote.Types.Note(),
            title: `PROJECT: ${postPayload.projectName}`,
            content: noteContent,
            notebookGuid: newEvernoteNotebook.guid,
            tagNames: ['*Project'],
            attributes: {
                // When set by an official Evernote application, this value will be a Unix
                // timestamp, expressed in MILLISECONDS, indicating when the user marked the note as
                // a reminder.
                reminderOrder: Date.now()
            }
        };

        await evernoteNoteStore.createNote(evernoteNotePayload);

        return {
            statusCode: 200,
            body: JSON.stringify(null)
        };
    } catch (err) {
        if (Boom.isBoom(err)) {
            return {
                statusCode: err.output.statusCode,
                body: JSON.stringify(err.output.payload)
            };
        }

        // Re-throw error.
        throw err;
    }
};
