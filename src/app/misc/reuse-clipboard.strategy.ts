import { RouteReuseStrategy } from '@angular/router';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { Constants } from '../common/constants';

export class ReuseClipboardStrategy implements RouteReuseStrategy {
    static readonly reusedPages = [Constants.routeClipboard];
    routeHandles = new Map<string, DetachedRouteHandle>();
    routeReuseRecords = new Map<string, Date>();

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        this.log(`shouldDetach, route: ${route}`)
        const path = this.getPath(route);
        const withinDuration = this.checkIfWithinDuration(path);

        if (!withinDuration) {
            this.routeHandles.delete(path);
            this.routeReuseRecords.delete(path);
        }

        return withinDuration;
    }

    //this method is invoked only if the shouldDetach returns true
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this.log(`store, route: ${route}`)
        this.routeHandles.set(this.getPath(route), handle);
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        this.log(`shouldAttach, route: ${route}`)
        const path = this.getPath(route);
        const withinDuration = this.checkIfWithinDuration(path);

        if (!withinDuration) {
            this.routeHandles.delete(path);
            this.routeReuseRecords.delete(path);
        }

        return withinDuration && this.routeHandles.has(path);
    }

    //This method is called if shouldAttach returns TRUE
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        this.log(`retrieve, route: ${route}`)
        return this.routeHandles.get(this.getPath(route));
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        this.log(`shouldReuseRoute, curr: ${curr}, future: ${future}`)
        let currentPath = this.getPath(curr);

        //clipboard is the default page for root path
        //fixme: seems not working, also causes problem, massing up the cache duration checking
        // if (currentPath == Constants.routeRoot) {
        //     currentPath = Constants.routeClipboard;
        // }

        if (ReuseClipboardStrategy.reusedPages.indexOf(currentPath) > -1) {
            if (!this.routeReuseRecords.has(currentPath)) {
                this.routeReuseRecords.set(currentPath, new Date());
                this.log(`turn on reuse at: ${this.routeReuseRecords.get(currentPath)}`);
            }
        }

        //the default impl
        return future.routeConfig === curr.routeConfig;
    }

    private getPath(route: ActivatedRouteSnapshot): string {
        if (route != null && route.routeConfig != null && route.routeConfig.path != null) {
            return route.routeConfig.path;
        }

        return '';
    }

    private checkIfWithinDuration(path: string): boolean {
        if (this.routeReuseRecords.has(path)) {
            const duration = Date.now() - this.routeReuseRecords.get(path).valueOf();
            this.log(`duration: ${duration}`);
            return duration < Constants.maxCacheRouteTimeMS;
        }

        return false;
    }

    private log(message: string) {
        //console.log('----- ' + message);
    }

}