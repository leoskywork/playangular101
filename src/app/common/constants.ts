export class Constants {
    public static readonly version: string = '1.0.1';
    public static readonly versionDate: string = '2019-8-10';

    public static readonly appName: string = 'Note 101'; //'Angular 101';
    public static readonly lskSessionHeader: string = 'lsk-session-id';
    public static readonly lskSessionDev: string = 'dev001abc';

    private static readonly baseUrlDev: string = 'http://localhost:57005/';
    private static readonly baseUrlPilot: string = 'http://leoskywork.com:84/api/';
    private static readonly baseUrlProd: string = 'http://leoskywork.com/api/';

    public static readonly isDev: boolean = false;
    public static readonly isPilot: boolean = true;

    public static readonly minVisualTimeMS = 400;

    public static getNoteApiUrl(): string {
        return this.getBaseApiUrl() + 'note/';
    }

    public static getBaseApiUrl(): string {
        if (Constants.isDev) return Constants.baseUrlDev;
        if (Constants.isPilot) return Constants.baseUrlPilot;
        return Constants.baseUrlProd;
    }

    public static getAppEnv(): string {
        if (Constants.isDev) return 'Dev';
        if (Constants.isPilot) return 'Pilot';
        return '';
    }
}
