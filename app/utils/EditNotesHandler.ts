import { DefaultEventsMap, Server, Socket } from "socket.io";
import database from "./database";
import NoteOwnership from "./NoteOwnership";

let allChangedNotes: Array<ChangedNote> = new Array<ChangedNote>();

function addChangedNote(note_id: string, note_content: string) {
    if (
        !allChangedNotes.some((changedNote) => changedNote.note_id == note_id)
    ) {
        allChangedNotes.push(new ChangedNote(note_id, note_content));
    }
}

export default {
    onCloseNote(
        io: Server,
        socket: Socket,
        session_id: string,
        note_id: string
    ) {
        console.log("zamknieto notatke");
        let changedNote = allChangedNotes.find(
            (changedNote) => changedNote.note_id == note_id
        );

        if (changedNote == undefined) return;

        let activeSession = changedNote.activeSessions.find(
            (session) => session.session_id == session_id
        );

        if (activeSession == undefined) return;

        changedNote.activeSessions.splice(
            changedNote.activeSessions.indexOf(activeSession),
            1
        );

        if (changedNote.activeSessions.length == 0) {
            allChangedNotes.splice(allChangedNotes.indexOf(changedNote), 1);
        }
        socket.leave(note_id);
    },
    onNoteEdited(
        io: Server,
        socket: Socket,
        session_id: string,
        note_id: string,
        note_content: string
    ) {
        console.log("zmieniono notatke");
        let changedNote = allChangedNotes.find(
            (changedNote) => changedNote.note_id == note_id
        );

        if (changedNote == undefined) return;

        let activeSession = changedNote.activeSessions.find(
            (session) => session.session_id == session_id
        );
        if (activeSession == undefined) return;

        if (activeSession.ownership == NoteOwnership.CanRead) return;

        changedNote.note_content = note_content;

        io.to(note_id).emit("note_content", note_content);
    },
    async onOpenNote(
        io: Server,
        socket: Socket,
        session_id: string,
        note_id: string
    ) {
        console.log("otworzono notatke");
        const userData = await database.getUserFromSession(session_id);
        if (userData == null) return;
        const ownership = await database.checkNoteOwnerShip(
            userData.id,
            note_id
        );
        if (ownership == null) return;
        if (ownership == NoteOwnership.CannotAnythink) return;

        var note_content = await database.getNoteContent(note_id);
        if (note_content == null) return;

        addChangedNote(note_id, note_content!);

        let changedNote = allChangedNotes.find(
            (changedNote) => changedNote.note_id == note_id
        );
        if (changedNote == undefined) return;
        changedNote.addSession(new NoteSession(session_id, ownership));
        io.to(socket.id).emit("note_content", changedNote.note_content);
        socket.join(note_id);
    },
    async saveToDatabase() {},
};

export class ChangedNote {
    constructor(node_id: string, note_content) {
        this.note_id = node_id;
        this.note_content = note_content;
    }

    addSession(session: NoteSession) {
        if (
            !this.activeSessions.some(
                (active_session) =>
                    active_session.session_id == session.session_id
            )
        ) {
            this.activeSessions.push(session);
        }
    }
    note_id: string;
    note_content: string;
    activeSessions: Array<NoteSession>;
}

export class NoteSession {
    constructor(session_id: string, ownership: NoteOwnership) {
        this.session_id = session_id;
        this.ownership = ownership;
    }
    session_id: string;
    ownership: NoteOwnership;
}