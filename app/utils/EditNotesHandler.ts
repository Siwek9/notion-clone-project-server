import { Socket } from "socket.io";
import database from "./database";
import NoteOwnership from "./NoteOwnership";

let allChangedNotes: Array<ChangedNote> = new Array<ChangedNote>();

function addChangedNote(note_id: string) {
    if (
        !allChangedNotes.some((changedNote) => changedNote.note_id == note_id)
    ) {
        this.activeSessions.push(note_id);
    }
}

export default {
    onNoteEdited(session_id, note_id, note_content) {},
    async onOpenNote(socket: Socket, session_id: string, note_id: string) {
        const userData = await database.getUserFromSession(session_id);
        if (userData == null) return;
        const ownership = await database.checkNoteOwnerShip(
            userData.id,
            note_id
        );
        if (ownership == null) return;
        if (ownership == NoteOwnership.CannotAnythink) return;

        addChangedNote(note_id);
        let changedNote = allChangedNotes.find(
            (changedNote) => changedNote.note_id == note_id
        );
        if (changedNote == undefined) return;
        changedNote.addSession(new NoteSession(session_id, ownership));
        socket.join(note_id);
    },
};

export class ChangedNote {
    constructor(node_id: string) {
        this.note_id = node_id;
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
