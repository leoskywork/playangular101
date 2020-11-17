export class Constants {
    public static readonly createdAt: string = '2019-7-15';
    public static readonly version: string = '1.0.2';
    public static readonly versionDate: string = '2019-11-4';

    public static readonly appName: string = 'Note 101'; //'Angular 101';
    public static readonly lskSessionHeader: string = 'lsk-session-id';
    public static readonly lskSessionDev: string = 'dev001abc';

    private static readonly baseUrlDev: string = 'http://localhost:57005/';
    private static readonly baseUrlPilot: string = 'https://leoskywork.com:84/api/';
    private static readonly baseUrlProd: string = 'https://leoskywork.com/api/';


    private static readonly _appMode: string = 'dev'; //dev, pilot
    private static readonly _backendEnvironment: string = 'node'; // node, asp.net

    public static readonly minVisualTimeMS = 400;
    public static readonly routeRoot: string = '';
    public static readonly routeRootSlash: string = '/';
    public static readonly routeClipboard: string = 'clipboard';
    public static readonly routeAbout: string = 'about';
    public static readonly routeFaq: string = 'faq';
    public static readonly routeLogin: string = 'login';
    public static readonly routeSignup: string = 'signup';
    public static readonly routeTest: string = 'test';
    public static readonly maxCacheRouteTimeMS: number = 3 * 10 * 1000;

    public static getNoteApiUrl(): string {
        return this.getBaseApiUrl() + 'note/';
    }

    public static getBaseApiUrl(): string {
        if (Constants.isDev) return Constants.baseUrlDev;
        if (Constants.isPilot) return Constants.baseUrlPilot;
        return Constants.baseUrlProd;
    }

    public static isDev(): boolean {
        return Constants._appMode === 'dev';
    }

    public static isPilot(): boolean {
        return Constants._appMode === 'pilot';
    }

    public static getAppEnv(): string {
        return this.capitalize(Constants._appMode); //?? '--unknown--';
    }

    public static isNode(): boolean {
        return Constants._backendEnvironment === 'node';
    }

    public static getBackendEnvironment(): string {
        return this.capitalize(Constants._backendEnvironment);// ?? '--unknown--';
    }

    private static capitalize(value: string): string {
        return value && value.length > 0 ? value.charAt(0).toUpperCase() + value.slice(1) : value;
    }
}
