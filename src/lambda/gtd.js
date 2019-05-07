'use strict';

const path = require('path');

// If .env.development is missing (e.g production), this will fail silently.
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.development') });

const Boom = require('boom');
const Joi = require('joi');
const Evernote = require('evernote');
const Axios = require('axios');

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

        const trelloCredentials = {
            // Trello API Key (public)
            key: process.env.TRELLO_API_KEY,

            // Trello sample token
            token: process.env.TRELLO_AUTH_TOKEN
        };

        // -- Find the Trello board to copy.

        const boardsForUserUrl = `https://api.trello.com/1/members/${
            process.env.TRELLO_USERNAME
        }/boards`;

        const { data: boardsForUser } = await Axios.get(boardsForUserUrl, {
            params: { ...trelloCredentials }
        });

        const boardToCopy = boardsForUser.find(
            ({ shortLink }) => shortLink === process.env.TRELLO_BOARD_TO_COPY_SHORT_LINK
        );

        if (boardToCopy === undefined) {
            throw new Error('Bad Implementation!');
        }

        // -- Create new Trello board using the board to copy as a template.

        const newTrelloBoardUrl = 'https://api.trello.com/1/boards';

        const idBoardSource = boardToCopy.id;

        const { data: newTrelloBoard } = await Axios.post(newTrelloBoardUrl, undefined, {
            params: { ...trelloCredentials, name: postPayload.projectName, idBoardSource }
        });

        if (postPayload.nextAction !== '') {
            // -- Find the "Next Actions" list so we can add a card to it.

            const listsUrlForNewTrelloBoard = `https://api.trello.com/1/boards/${
                newTrelloBoard.id
            }/lists`;

            const { data: lists } = await Axios.get(listsUrlForNewTrelloBoard, {
                params: { ...trelloCredentials, cards: 'none' }
            });

            const nextActionsList = lists.find(({ name }) => name === 'Next Actions');

            if (nextActionsList === undefined) {
                throw new Error('Bad Implementation!');
            }

            // -- Add a card to the "Next Actions" list for the given next action.

            const newTrelloCardUrl = 'https://api.trello.com/1/cards';

            const idList = nextActionsList.id;

            await Axios.post(newTrelloCardUrl, undefined, {
                params: { ...trelloCredentials, name: postPayload.nextAction, idList }
            });
        }

        const brainstormingList = generateEnexList(postPayload.brainstorming);

        const noteContent = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd"><en-note><div>NEXT ACTION: <a href="${
            newTrelloBoard.shortUrl
        }" style="color: rgb(56, 56, 56); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 14px; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;">Next Actions Trello Board</a></div><hr /><div>PURPOSE: ${
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
