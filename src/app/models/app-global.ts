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
  static readonly confirmedDeleteNote: string = 'confirmed-delete-note';
  static readonly afterUpdateNote: string = 'update-note-completed';
  static readonly submitNewNote: string = 'submit-new-note';
}

export { AppGlobal, EventArgs, EventType };
