class AppGlobal {
    static current: AppGlobal = new AppGlobal();
    user: any;

    getUserFromLocalStorage() {
        //todo
    }
}

class EventArgs<T> {
    type: string;
    args?: T;

    constructor(type: string, args?: T) {
        this.type = type;
        this.args = args;
    }
}

class EventType {
    static readonly deleteNote: string = 'delete-note';
    static readonly updatedNote: string = 'update-note-completed'
}

export { AppGlobal, EventArgs, EventType }