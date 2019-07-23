export class Constants {
  public static readonly appName: string = 'Angular 101';
  public static readonly lskSessionHeader: string = 'lsk-session-id';
  public static readonly lskSessionDev: string = 'dev001abc';

  private static readonly notesUrlDev: string = 'http://localhost:57005/note';
  private static readonly notesUrlPilot: string = 'http://leoskywork.com:84/api/note';
  private static readonly notesUrlProd: string = 'http://leoskywork.com/api/note';

  public static readonly isDev: boolean = false;
  public static readonly isPilot: boolean = true;

  public static getNoteApiUrl(): string {
    if (Constants.isDev) return Constants.notesUrlDev;
    if (Constants.isPilot) return Constants.notesUrlPilot;
    return Constants.notesUrlProd;
  }

  public static getAppPhase(): string {
    if (Constants.isDev) return 'Dev';
    if (Constants.isPilot) return 'Pilot';
    return '';
  }
}
