/**
 * @license Angular v9.1.4
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */

import { InjectionToken } from '@angular/core';
import { Location } from '@angular/common';
import { LocationChangeListener } from '@angular/common';
import { LocationStrategy } from '@angular/common';
import { PlatformLocation } from '@angular/common';
import { SubscriptionLike } from 'rxjs';

/**
 * Provider for mock platform location config
 *
 * @publicApi
 */
import * as ɵngcc0 from '@angular/core';
export declare const MOCK_PLATFORM_LOCATION_CONFIG: InjectionToken<MockPlatformLocationConfig>;

/**
 * A mock implementation of {@link LocationStrategy} that allows tests to fire simulated
 * location events.
 *
 * @publicApi
 */
export declare class MockLocationStrategy extends LocationStrategy {
    internalBaseHref: string;
    internalPath: string;
    internalTitle: string;
    urlChanges: string[];
    private stateChanges;
    constructor();
    simulatePopState(url: string): void;
    path(includeHash?: boolean): string;
    prepareExternalUrl(internal: string): string;
    pushState(ctx: any, title: string, path: string, query: string): void;
    replaceState(ctx: any, title: string, path: string, query: string): void;
    onPopState(fn: (value: any) => void): void;
    getBaseHref(): string;
    back(): void;
    forward(): void;
    getState(): unknown;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MockLocationStrategy, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<MockLocationStrategy>;
}

/**
 * Mock implementation of URL state.
 *
 * @publicApi
 */
export declare class MockPlatformLocation implements PlatformLocation {
    private baseHref;
    private hashUpdate;
    private urlChanges;
    constructor(config?: MockPlatformLocationConfig);
    get hostname(): string;
    get protocol(): string;
    get port(): string;
    get pathname(): string;
    get search(): string;
    get hash(): string;
    get state(): unknown;
    getBaseHrefFromDOM(): string;
    onPopState(fn: LocationChangeListener): void;
    onHashChange(fn: LocationChangeListener): void;
    get href(): string;
    get url(): string;
    private parseChanges;
    replaceState(state: any, title: string, newUrl: string): void;
    pushState(state: any, title: string, newUrl: string): void;
    forward(): void;
    back(): void;
    getState(): unknown;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MockPlatformLocation, [{ optional: true; }]>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<MockPlatformLocation>;
}

/**
 * Mock platform location config
 *
 * @publicApi
 */
export declare interface MockPlatformLocationConfig {
    startUrl?: string;
    appBaseHref?: string;
}

/**
 * A spy for {@link Location} that allows tests to fire simulated location events.
 *
 * @publicApi
 */
export declare class SpyLocation implements Location {
    urlChanges: string[];
    private _history;
    private _historyIndex;
    setInitialPath(url: string): void;
    setBaseHref(url: string): void;
    path(): string;
    getState(): unknown;
    isCurrentPathEqualTo(path: string, query?: string): boolean;
    simulateUrlPop(pathname: string): void;
    simulateHashChange(pathname: string): void;
    prepareExternalUrl(url: string): string;
    go(path: string, query?: string, state?: any): void;
    replaceState(path: string, query?: string, state?: any): void;
    forward(): void;
    back(): void;
    onUrlChange(fn: (url: string, state: unknown) => void): void;
    subscribe(onNext: (value: any) => void, onThrow?: ((error: any) => void) | null, onReturn?: (() => void) | null): SubscriptionLike;
    normalize(url: string): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SpyLocation, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<SpyLocation>;
}

export { }

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5kLnRzIiwic291cmNlcyI6WyJ0ZXN0aW5nLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZSBBbmd1bGFyIHY5LjEuNFxuICogKGMpIDIwMTAtMjAyMCBHb29nbGUgTExDLiBodHRwczovL2FuZ3VsYXIuaW8vXG4gKiBMaWNlbnNlOiBNSVRcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBMb2NhdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUGxhdGZvcm1Mb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkxpa2UgfSBmcm9tICdyeGpzJztcclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlciBmb3IgbW9jayBwbGF0Zm9ybSBsb2NhdGlvbiBjb25maWdcclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY29uc3QgTU9DS19QTEFURk9STV9MT0NBVElPTl9DT05GSUc6IEluamVjdGlvblRva2VuPE1vY2tQbGF0Zm9ybUxvY2F0aW9uQ29uZmlnPjtcclxuXHJcbi8qKlxyXG4gKiBBIG1vY2sgaW1wbGVtZW50YXRpb24gb2Yge0BsaW5rIExvY2F0aW9uU3RyYXRlZ3l9IHRoYXQgYWxsb3dzIHRlc3RzIHRvIGZpcmUgc2ltdWxhdGVkXHJcbiAqIGxvY2F0aW9uIGV2ZW50cy5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTW9ja0xvY2F0aW9uU3RyYXRlZ3kgZXh0ZW5kcyBMb2NhdGlvblN0cmF0ZWd5IHtcclxuICAgIGludGVybmFsQmFzZUhyZWY6IHN0cmluZztcclxuICAgIGludGVybmFsUGF0aDogc3RyaW5nO1xyXG4gICAgaW50ZXJuYWxUaXRsZTogc3RyaW5nO1xyXG4gICAgdXJsQ2hhbmdlczogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIHN0YXRlQ2hhbmdlcztcclxuICAgIGNvbnN0cnVjdG9yKCk7XHJcbiAgICBzaW11bGF0ZVBvcFN0YXRlKHVybDogc3RyaW5nKTogdm9pZDtcclxuICAgIHBhdGgoaW5jbHVkZUhhc2g/OiBib29sZWFuKTogc3RyaW5nO1xyXG4gICAgcHJlcGFyZUV4dGVybmFsVXJsKGludGVybmFsOiBzdHJpbmcpOiBzdHJpbmc7XHJcbiAgICBwdXNoU3RhdGUoY3R4OiBhbnksIHRpdGxlOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgcXVlcnk6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICByZXBsYWNlU3RhdGUoY3R4OiBhbnksIHRpdGxlOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgcXVlcnk6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBvblBvcFN0YXRlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQ7XHJcbiAgICBnZXRCYXNlSHJlZigpOiBzdHJpbmc7XHJcbiAgICBiYWNrKCk6IHZvaWQ7XHJcbiAgICBmb3J3YXJkKCk6IHZvaWQ7XHJcbiAgICBnZXRTdGF0ZSgpOiB1bmtub3duO1xyXG59XHJcblxyXG4vKipcclxuICogTW9jayBpbXBsZW1lbnRhdGlvbiBvZiBVUkwgc3RhdGUuXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1vY2tQbGF0Zm9ybUxvY2F0aW9uIGltcGxlbWVudHMgUGxhdGZvcm1Mb2NhdGlvbiB7XHJcbiAgICBwcml2YXRlIGJhc2VIcmVmO1xyXG4gICAgcHJpdmF0ZSBoYXNoVXBkYXRlO1xyXG4gICAgcHJpdmF0ZSB1cmxDaGFuZ2VzO1xyXG4gICAgY29uc3RydWN0b3IoY29uZmlnPzogTW9ja1BsYXRmb3JtTG9jYXRpb25Db25maWcpO1xyXG4gICAgZ2V0IGhvc3RuYW1lKCk6IHN0cmluZztcclxuICAgIGdldCBwcm90b2NvbCgpOiBzdHJpbmc7XHJcbiAgICBnZXQgcG9ydCgpOiBzdHJpbmc7XHJcbiAgICBnZXQgcGF0aG5hbWUoKTogc3RyaW5nO1xyXG4gICAgZ2V0IHNlYXJjaCgpOiBzdHJpbmc7XHJcbiAgICBnZXQgaGFzaCgpOiBzdHJpbmc7XHJcbiAgICBnZXQgc3RhdGUoKTogdW5rbm93bjtcclxuICAgIGdldEJhc2VIcmVmRnJvbURPTSgpOiBzdHJpbmc7XHJcbiAgICBvblBvcFN0YXRlKGZuOiBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKTogdm9pZDtcclxuICAgIG9uSGFzaENoYW5nZShmbjogTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcik6IHZvaWQ7XHJcbiAgICBnZXQgaHJlZigpOiBzdHJpbmc7XHJcbiAgICBnZXQgdXJsKCk6IHN0cmluZztcclxuICAgIHByaXZhdGUgcGFyc2VDaGFuZ2VzO1xyXG4gICAgcmVwbGFjZVN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIG5ld1VybDogc3RyaW5nKTogdm9pZDtcclxuICAgIHB1c2hTdGF0ZShzdGF0ZTogYW55LCB0aXRsZTogc3RyaW5nLCBuZXdVcmw6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBmb3J3YXJkKCk6IHZvaWQ7XHJcbiAgICBiYWNrKCk6IHZvaWQ7XHJcbiAgICBnZXRTdGF0ZSgpOiB1bmtub3duO1xyXG59XHJcblxyXG4vKipcclxuICogTW9jayBwbGF0Zm9ybSBsb2NhdGlvbiBjb25maWdcclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIE1vY2tQbGF0Zm9ybUxvY2F0aW9uQ29uZmlnIHtcclxuICAgIHN0YXJ0VXJsPzogc3RyaW5nO1xyXG4gICAgYXBwQmFzZUhyZWY/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIHNweSBmb3Ige0BsaW5rIExvY2F0aW9ufSB0aGF0IGFsbG93cyB0ZXN0cyB0byBmaXJlIHNpbXVsYXRlZCBsb2NhdGlvbiBldmVudHMuXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIFNweUxvY2F0aW9uIGltcGxlbWVudHMgTG9jYXRpb24ge1xyXG4gICAgdXJsQ2hhbmdlczogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIF9oaXN0b3J5O1xyXG4gICAgcHJpdmF0ZSBfaGlzdG9yeUluZGV4O1xyXG4gICAgc2V0SW5pdGlhbFBhdGgodXJsOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgc2V0QmFzZUhyZWYodXJsOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgcGF0aCgpOiBzdHJpbmc7XHJcbiAgICBnZXRTdGF0ZSgpOiB1bmtub3duO1xyXG4gICAgaXNDdXJyZW50UGF0aEVxdWFsVG8ocGF0aDogc3RyaW5nLCBxdWVyeT86IHN0cmluZyk6IGJvb2xlYW47XHJcbiAgICBzaW11bGF0ZVVybFBvcChwYXRobmFtZTogc3RyaW5nKTogdm9pZDtcclxuICAgIHNpbXVsYXRlSGFzaENoYW5nZShwYXRobmFtZTogc3RyaW5nKTogdm9pZDtcclxuICAgIHByZXBhcmVFeHRlcm5hbFVybCh1cmw6IHN0cmluZyk6IHN0cmluZztcclxuICAgIGdvKHBhdGg6IHN0cmluZywgcXVlcnk/OiBzdHJpbmcsIHN0YXRlPzogYW55KTogdm9pZDtcclxuICAgIHJlcGxhY2VTdGF0ZShwYXRoOiBzdHJpbmcsIHF1ZXJ5Pzogc3RyaW5nLCBzdGF0ZT86IGFueSk6IHZvaWQ7XHJcbiAgICBmb3J3YXJkKCk6IHZvaWQ7XHJcbiAgICBiYWNrKCk6IHZvaWQ7XHJcbiAgICBvblVybENoYW5nZShmbjogKHVybDogc3RyaW5nLCBzdGF0ZTogdW5rbm93bikgPT4gdm9pZCk6IHZvaWQ7XHJcbiAgICBzdWJzY3JpYmUob25OZXh0OiAodmFsdWU6IGFueSkgPT4gdm9pZCwgb25UaHJvdz86ICgoZXJyb3I6IGFueSkgPT4gdm9pZCkgfCBudWxsLCBvblJldHVybj86ICgoKSA9PiB2b2lkKSB8IG51bGwpOiBTdWJzY3JpcHRpb25MaWtlO1xyXG4gICAgbm9ybWFsaXplKHVybDogc3RyaW5nKTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgeyB9XHJcbiJdfQ==