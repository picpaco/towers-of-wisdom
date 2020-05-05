/**
 * @license Angular v9.1.4
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */

import { HttpBackend } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';


/**
 * Configures `HttpClientTestingBackend` as the `HttpBackend` used by `HttpClient`.
 *
 * Inject `HttpTestingController` to expect and flush requests in your tests.
 *
 * @publicApi
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common/http';
export declare class HttpClientTestingModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<HttpClientTestingModule, never, [typeof ɵngcc1.HttpClientModule], never>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<HttpClientTestingModule>;
}

/**
 * Controller to be injected into tests, that allows for mocking and flushing
 * of requests.
 *
 * @publicApi
 */
export declare abstract class HttpTestingController {
    /**
     * Search for requests that match the given parameter, without any expectations.
     */
    abstract match(match: string | RequestMatch | ((req: HttpRequest<any>) => boolean)): TestRequest[];
    /**
     * Expect that a single request has been made which matches the given URL, and return its
     * mock.
     *
     * If no such request has been made, or more than one such request has been made, fail with an
     * error message including the given request description, if any.
     */
    abstract expectOne(url: string, description?: string): TestRequest;
    /**
     * Expect that a single request has been made which matches the given parameters, and return
     * its mock.
     *
     * If no such request has been made, or more than one such request has been made, fail with an
     * error message including the given request description, if any.
     */
    abstract expectOne(params: RequestMatch, description?: string): TestRequest;
    /**
     * Expect that a single request has been made which matches the given predicate function, and
     * return its mock.
     *
     * If no such request has been made, or more than one such request has been made, fail with an
     * error message including the given request description, if any.
     */
    abstract expectOne(matchFn: ((req: HttpRequest<any>) => boolean), description?: string): TestRequest;
    /**
     * Expect that a single request has been made which matches the given condition, and return
     * its mock.
     *
     * If no such request has been made, or more than one such request has been made, fail with an
     * error message including the given request description, if any.
     */
    abstract expectOne(match: string | RequestMatch | ((req: HttpRequest<any>) => boolean), description?: string): TestRequest;
    /**
     * Expect that no requests have been made which match the given URL.
     *
     * If a matching request has been made, fail with an error message including the given request
     * description, if any.
     */
    abstract expectNone(url: string, description?: string): void;
    /**
     * Expect that no requests have been made which match the given parameters.
     *
     * If a matching request has been made, fail with an error message including the given request
     * description, if any.
     */
    abstract expectNone(params: RequestMatch, description?: string): void;
    /**
     * Expect that no requests have been made which match the given predicate function.
     *
     * If a matching request has been made, fail with an error message including the given request
     * description, if any.
     */
    abstract expectNone(matchFn: ((req: HttpRequest<any>) => boolean), description?: string): void;
    /**
     * Expect that no requests have been made which match the given condition.
     *
     * If a matching request has been made, fail with an error message including the given request
     * description, if any.
     */
    abstract expectNone(match: string | RequestMatch | ((req: HttpRequest<any>) => boolean), description?: string): void;
    /**
     * Verify that no unmatched requests are outstanding.
     *
     * If any requests are outstanding, fail with an error message indicating which requests were not
     * handled.
     *
     * If `ignoreCancelled` is not set (the default), `verify()` will also fail if cancelled requests
     * were not explicitly matched.
     */
    abstract verify(opts?: {
        ignoreCancelled?: boolean;
    }): void;
}

/**
 * Defines a matcher for requests based on URL, method, or both.
 *
 * @publicApi
 */
export declare interface RequestMatch {
    method?: string;
    url?: string;
}

/**
 * A mock requests that was received and is ready to be answered.
 *
 * This interface allows access to the underlying `HttpRequest`, and allows
 * responding with `HttpEvent`s or `HttpErrorResponse`s.
 *
 * @publicApi
 */
export declare class TestRequest {
    request: HttpRequest<any>;
    private observer;
    /**
     * Whether the request was cancelled after it was sent.
     */
    get cancelled(): boolean;
    constructor(request: HttpRequest<any>, observer: Observer<HttpEvent<any>>);
    /**
     * Resolve the request by returning a body plus additional HTTP information (such as response
     * headers) if provided.
     * If the request specifies an expected body type, the body is converted into the requested type.
     * Otherwise, the body is converted to `JSON` by default.
     *
     * Both successful and unsuccessful responses can be delivered via `flush()`.
     */
    flush(body: ArrayBuffer | Blob | string | number | Object | (string | number | Object | null)[] | null, opts?: {
        headers?: HttpHeaders | {
            [name: string]: string | string[];
        };
        status?: number;
        statusText?: string;
    }): void;
    /**
     * Resolve the request by returning an `ErrorEvent` (e.g. simulating a network failure).
     */
    error(error: ErrorEvent, opts?: {
        headers?: HttpHeaders | {
            [name: string]: string | string[];
        };
        status?: number;
        statusText?: string;
    }): void;
    /**
     * Deliver an arbitrary `HttpEvent` (such as a progress event) on the response stream for this
     * request.
     */
    event(event: HttpEvent<any>): void;
}

/**
 * A testing backend for `HttpClient` which both acts as an `HttpBackend`
 * and as the `HttpTestingController`.
 *
 * `HttpClientTestingBackend` works by keeping a list of all open requests.
 * As requests come in, they're added to the list. Users can assert that specific
 * requests were made and then flush them. In the end, a verify() method asserts
 * that no unexpected requests were made.
 *
 *
 */
export declare class ɵangular_packages_common_http_testing_testing_a implements HttpBackend, HttpTestingController {
    /**
     * List of pending requests which have not yet been expected.
     */
    private open;
    /**
     * Handle an incoming request by queueing it in the list of open requests.
     */
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
    /**
     * Helper function to search for requests in the list of open requests.
     */
    private _match;
    /**
     * Search for requests in the list of open requests, and return all that match
     * without asserting anything about the number of matches.
     */
    match(match: string | RequestMatch | ((req: HttpRequest<any>) => boolean)): TestRequest[];
    /**
     * Expect that a single outstanding request matches the given matcher, and return
     * it.
     *
     * Requests returned through this API will no longer be in the list of open requests,
     * and thus will not match twice.
     */
    expectOne(match: string | RequestMatch | ((req: HttpRequest<any>) => boolean), description?: string): TestRequest;
    /**
     * Expect that no outstanding requests match the given matcher, and throw an error
     * if any do.
     */
    expectNone(match: string | RequestMatch | ((req: HttpRequest<any>) => boolean), description?: string): void;
    /**
     * Validate that there are no outstanding requests.
     */
    verify(opts?: {
        ignoreCancelled?: boolean;
    }): void;
    private descriptionFromMatcher;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ɵangular_packages_common_http_testing_testing_a, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<ɵangular_packages_common_http_testing_testing_a>;
}

export { }

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5kLnRzIiwic291cmNlcyI6WyJ0ZXN0aW5nLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZSBBbmd1bGFyIHY5LjEuNFxuICogKGMpIDIwMTAtMjAyMCBHb29nbGUgTExDLiBodHRwczovL2FuZ3VsYXIuaW8vXG4gKiBMaWNlbnNlOiBNSVRcbiAqL1xuXG5pbXBvcnQgeyBIdHRwQmFja2VuZCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSHR0cEV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuXHJcblxyXG4vKipcclxuICogQ29uZmlndXJlcyBgSHR0cENsaWVudFRlc3RpbmdCYWNrZW5kYCBhcyB0aGUgYEh0dHBCYWNrZW5kYCB1c2VkIGJ5IGBIdHRwQ2xpZW50YC5cclxuICpcclxuICogSW5qZWN0IGBIdHRwVGVzdGluZ0NvbnRyb2xsZXJgIHRvIGV4cGVjdCBhbmQgZmx1c2ggcmVxdWVzdHMgaW4geW91ciB0ZXN0cy5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgSHR0cENsaWVudFRlc3RpbmdNb2R1bGUge1xyXG59XHJcblxyXG4vKipcclxuICogQ29udHJvbGxlciB0byBiZSBpbmplY3RlZCBpbnRvIHRlc3RzLCB0aGF0IGFsbG93cyBmb3IgbW9ja2luZyBhbmQgZmx1c2hpbmdcclxuICogb2YgcmVxdWVzdHMuXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGFic3RyYWN0IGNsYXNzIEh0dHBUZXN0aW5nQ29udHJvbGxlciB7XHJcbiAgICAvKipcclxuICAgICAqIFNlYXJjaCBmb3IgcmVxdWVzdHMgdGhhdCBtYXRjaCB0aGUgZ2l2ZW4gcGFyYW1ldGVyLCB3aXRob3V0IGFueSBleHBlY3RhdGlvbnMuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IG1hdGNoKG1hdGNoOiBzdHJpbmcgfCBSZXF1ZXN0TWF0Y2ggfCAoKHJlcTogSHR0cFJlcXVlc3Q8YW55PikgPT4gYm9vbGVhbikpOiBUZXN0UmVxdWVzdFtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBlY3QgdGhhdCBhIHNpbmdsZSByZXF1ZXN0IGhhcyBiZWVuIG1hZGUgd2hpY2ggbWF0Y2hlcyB0aGUgZ2l2ZW4gVVJMLCBhbmQgcmV0dXJuIGl0c1xyXG4gICAgICogbW9jay5cclxuICAgICAqXHJcbiAgICAgKiBJZiBubyBzdWNoIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSwgb3IgbW9yZSB0aGFuIG9uZSBzdWNoIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSwgZmFpbCB3aXRoIGFuXHJcbiAgICAgKiBlcnJvciBtZXNzYWdlIGluY2x1ZGluZyB0aGUgZ2l2ZW4gcmVxdWVzdCBkZXNjcmlwdGlvbiwgaWYgYW55LlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBleHBlY3RPbmUodXJsOiBzdHJpbmcsIGRlc2NyaXB0aW9uPzogc3RyaW5nKTogVGVzdFJlcXVlc3Q7XHJcbiAgICAvKipcclxuICAgICAqIEV4cGVjdCB0aGF0IGEgc2luZ2xlIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSB3aGljaCBtYXRjaGVzIHRoZSBnaXZlbiBwYXJhbWV0ZXJzLCBhbmQgcmV0dXJuXHJcbiAgICAgKiBpdHMgbW9jay5cclxuICAgICAqXHJcbiAgICAgKiBJZiBubyBzdWNoIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSwgb3IgbW9yZSB0aGFuIG9uZSBzdWNoIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSwgZmFpbCB3aXRoIGFuXHJcbiAgICAgKiBlcnJvciBtZXNzYWdlIGluY2x1ZGluZyB0aGUgZ2l2ZW4gcmVxdWVzdCBkZXNjcmlwdGlvbiwgaWYgYW55LlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBleHBlY3RPbmUocGFyYW1zOiBSZXF1ZXN0TWF0Y2gsIGRlc2NyaXB0aW9uPzogc3RyaW5nKTogVGVzdFJlcXVlc3Q7XHJcbiAgICAvKipcclxuICAgICAqIEV4cGVjdCB0aGF0IGEgc2luZ2xlIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSB3aGljaCBtYXRjaGVzIHRoZSBnaXZlbiBwcmVkaWNhdGUgZnVuY3Rpb24sIGFuZFxyXG4gICAgICogcmV0dXJuIGl0cyBtb2NrLlxyXG4gICAgICpcclxuICAgICAqIElmIG5vIHN1Y2ggcmVxdWVzdCBoYXMgYmVlbiBtYWRlLCBvciBtb3JlIHRoYW4gb25lIHN1Y2ggcmVxdWVzdCBoYXMgYmVlbiBtYWRlLCBmYWlsIHdpdGggYW5cclxuICAgICAqIGVycm9yIG1lc3NhZ2UgaW5jbHVkaW5nIHRoZSBnaXZlbiByZXF1ZXN0IGRlc2NyaXB0aW9uLCBpZiBhbnkuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGV4cGVjdE9uZShtYXRjaEZuOiAoKHJlcTogSHR0cFJlcXVlc3Q8YW55PikgPT4gYm9vbGVhbiksIGRlc2NyaXB0aW9uPzogc3RyaW5nKTogVGVzdFJlcXVlc3Q7XHJcbiAgICAvKipcclxuICAgICAqIEV4cGVjdCB0aGF0IGEgc2luZ2xlIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSB3aGljaCBtYXRjaGVzIHRoZSBnaXZlbiBjb25kaXRpb24sIGFuZCByZXR1cm5cclxuICAgICAqIGl0cyBtb2NrLlxyXG4gICAgICpcclxuICAgICAqIElmIG5vIHN1Y2ggcmVxdWVzdCBoYXMgYmVlbiBtYWRlLCBvciBtb3JlIHRoYW4gb25lIHN1Y2ggcmVxdWVzdCBoYXMgYmVlbiBtYWRlLCBmYWlsIHdpdGggYW5cclxuICAgICAqIGVycm9yIG1lc3NhZ2UgaW5jbHVkaW5nIHRoZSBnaXZlbiByZXF1ZXN0IGRlc2NyaXB0aW9uLCBpZiBhbnkuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGV4cGVjdE9uZShtYXRjaDogc3RyaW5nIHwgUmVxdWVzdE1hdGNoIHwgKChyZXE6IEh0dHBSZXF1ZXN0PGFueT4pID0+IGJvb2xlYW4pLCBkZXNjcmlwdGlvbj86IHN0cmluZyk6IFRlc3RSZXF1ZXN0O1xyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBlY3QgdGhhdCBubyByZXF1ZXN0cyBoYXZlIGJlZW4gbWFkZSB3aGljaCBtYXRjaCB0aGUgZ2l2ZW4gVVJMLlxyXG4gICAgICpcclxuICAgICAqIElmIGEgbWF0Y2hpbmcgcmVxdWVzdCBoYXMgYmVlbiBtYWRlLCBmYWlsIHdpdGggYW4gZXJyb3IgbWVzc2FnZSBpbmNsdWRpbmcgdGhlIGdpdmVuIHJlcXVlc3RcclxuICAgICAqIGRlc2NyaXB0aW9uLCBpZiBhbnkuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGV4cGVjdE5vbmUodXJsOiBzdHJpbmcsIGRlc2NyaXB0aW9uPzogc3RyaW5nKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogRXhwZWN0IHRoYXQgbm8gcmVxdWVzdHMgaGF2ZSBiZWVuIG1hZGUgd2hpY2ggbWF0Y2ggdGhlIGdpdmVuIHBhcmFtZXRlcnMuXHJcbiAgICAgKlxyXG4gICAgICogSWYgYSBtYXRjaGluZyByZXF1ZXN0IGhhcyBiZWVuIG1hZGUsIGZhaWwgd2l0aCBhbiBlcnJvciBtZXNzYWdlIGluY2x1ZGluZyB0aGUgZ2l2ZW4gcmVxdWVzdFxyXG4gICAgICogZGVzY3JpcHRpb24sIGlmIGFueS5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgZXhwZWN0Tm9uZShwYXJhbXM6IFJlcXVlc3RNYXRjaCwgZGVzY3JpcHRpb24/OiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBlY3QgdGhhdCBubyByZXF1ZXN0cyBoYXZlIGJlZW4gbWFkZSB3aGljaCBtYXRjaCB0aGUgZ2l2ZW4gcHJlZGljYXRlIGZ1bmN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIElmIGEgbWF0Y2hpbmcgcmVxdWVzdCBoYXMgYmVlbiBtYWRlLCBmYWlsIHdpdGggYW4gZXJyb3IgbWVzc2FnZSBpbmNsdWRpbmcgdGhlIGdpdmVuIHJlcXVlc3RcclxuICAgICAqIGRlc2NyaXB0aW9uLCBpZiBhbnkuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGV4cGVjdE5vbmUobWF0Y2hGbjogKChyZXE6IEh0dHBSZXF1ZXN0PGFueT4pID0+IGJvb2xlYW4pLCBkZXNjcmlwdGlvbj86IHN0cmluZyk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIEV4cGVjdCB0aGF0IG5vIHJlcXVlc3RzIGhhdmUgYmVlbiBtYWRlIHdoaWNoIG1hdGNoIHRoZSBnaXZlbiBjb25kaXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogSWYgYSBtYXRjaGluZyByZXF1ZXN0IGhhcyBiZWVuIG1hZGUsIGZhaWwgd2l0aCBhbiBlcnJvciBtZXNzYWdlIGluY2x1ZGluZyB0aGUgZ2l2ZW4gcmVxdWVzdFxyXG4gICAgICogZGVzY3JpcHRpb24sIGlmIGFueS5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgZXhwZWN0Tm9uZShtYXRjaDogc3RyaW5nIHwgUmVxdWVzdE1hdGNoIHwgKChyZXE6IEh0dHBSZXF1ZXN0PGFueT4pID0+IGJvb2xlYW4pLCBkZXNjcmlwdGlvbj86IHN0cmluZyk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIFZlcmlmeSB0aGF0IG5vIHVubWF0Y2hlZCByZXF1ZXN0cyBhcmUgb3V0c3RhbmRpbmcuXHJcbiAgICAgKlxyXG4gICAgICogSWYgYW55IHJlcXVlc3RzIGFyZSBvdXRzdGFuZGluZywgZmFpbCB3aXRoIGFuIGVycm9yIG1lc3NhZ2UgaW5kaWNhdGluZyB3aGljaCByZXF1ZXN0cyB3ZXJlIG5vdFxyXG4gICAgICogaGFuZGxlZC5cclxuICAgICAqXHJcbiAgICAgKiBJZiBgaWdub3JlQ2FuY2VsbGVkYCBpcyBub3Qgc2V0ICh0aGUgZGVmYXVsdCksIGB2ZXJpZnkoKWAgd2lsbCBhbHNvIGZhaWwgaWYgY2FuY2VsbGVkIHJlcXVlc3RzXHJcbiAgICAgKiB3ZXJlIG5vdCBleHBsaWNpdGx5IG1hdGNoZWQuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHZlcmlmeShvcHRzPzoge1xyXG4gICAgICAgIGlnbm9yZUNhbmNlbGxlZD86IGJvb2xlYW47XHJcbiAgICB9KTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgYSBtYXRjaGVyIGZvciByZXF1ZXN0cyBiYXNlZCBvbiBVUkwsIG1ldGhvZCwgb3IgYm90aC5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFJlcXVlc3RNYXRjaCB7XHJcbiAgICBtZXRob2Q/OiBzdHJpbmc7XHJcbiAgICB1cmw/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIG1vY2sgcmVxdWVzdHMgdGhhdCB3YXMgcmVjZWl2ZWQgYW5kIGlzIHJlYWR5IHRvIGJlIGFuc3dlcmVkLlxyXG4gKlxyXG4gKiBUaGlzIGludGVyZmFjZSBhbGxvd3MgYWNjZXNzIHRvIHRoZSB1bmRlcmx5aW5nIGBIdHRwUmVxdWVzdGAsIGFuZCBhbGxvd3NcclxuICogcmVzcG9uZGluZyB3aXRoIGBIdHRwRXZlbnRgcyBvciBgSHR0cEVycm9yUmVzcG9uc2Vgcy5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgVGVzdFJlcXVlc3Qge1xyXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PjtcclxuICAgIHByaXZhdGUgb2JzZXJ2ZXI7XHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdGhlIHJlcXVlc3Qgd2FzIGNhbmNlbGxlZCBhZnRlciBpdCB3YXMgc2VudC5cclxuICAgICAqL1xyXG4gICAgZ2V0IGNhbmNlbGxlZCgpOiBib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Piwgb2JzZXJ2ZXI6IE9ic2VydmVyPEh0dHBFdmVudDxhbnk+Pik7XHJcbiAgICAvKipcclxuICAgICAqIFJlc29sdmUgdGhlIHJlcXVlc3QgYnkgcmV0dXJuaW5nIGEgYm9keSBwbHVzIGFkZGl0aW9uYWwgSFRUUCBpbmZvcm1hdGlvbiAoc3VjaCBhcyByZXNwb25zZVxyXG4gICAgICogaGVhZGVycykgaWYgcHJvdmlkZWQuXHJcbiAgICAgKiBJZiB0aGUgcmVxdWVzdCBzcGVjaWZpZXMgYW4gZXhwZWN0ZWQgYm9keSB0eXBlLCB0aGUgYm9keSBpcyBjb252ZXJ0ZWQgaW50byB0aGUgcmVxdWVzdGVkIHR5cGUuXHJcbiAgICAgKiBPdGhlcndpc2UsIHRoZSBib2R5IGlzIGNvbnZlcnRlZCB0byBgSlNPTmAgYnkgZGVmYXVsdC5cclxuICAgICAqXHJcbiAgICAgKiBCb3RoIHN1Y2Nlc3NmdWwgYW5kIHVuc3VjY2Vzc2Z1bCByZXNwb25zZXMgY2FuIGJlIGRlbGl2ZXJlZCB2aWEgYGZsdXNoKClgLlxyXG4gICAgICovXHJcbiAgICBmbHVzaChib2R5OiBBcnJheUJ1ZmZlciB8IEJsb2IgfCBzdHJpbmcgfCBudW1iZXIgfCBPYmplY3QgfCAoc3RyaW5nIHwgbnVtYmVyIHwgT2JqZWN0IHwgbnVsbClbXSB8IG51bGwsIG9wdHM/OiB7XHJcbiAgICAgICAgaGVhZGVycz86IEh0dHBIZWFkZXJzIHwge1xyXG4gICAgICAgICAgICBbbmFtZTogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzdGF0dXM/OiBudW1iZXI7XHJcbiAgICAgICAgc3RhdHVzVGV4dD86IHN0cmluZztcclxuICAgIH0pOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNvbHZlIHRoZSByZXF1ZXN0IGJ5IHJldHVybmluZyBhbiBgRXJyb3JFdmVudGAgKGUuZy4gc2ltdWxhdGluZyBhIG5ldHdvcmsgZmFpbHVyZSkuXHJcbiAgICAgKi9cclxuICAgIGVycm9yKGVycm9yOiBFcnJvckV2ZW50LCBvcHRzPzoge1xyXG4gICAgICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyB8IHtcclxuICAgICAgICAgICAgW25hbWU6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3RhdHVzPzogbnVtYmVyO1xyXG4gICAgICAgIHN0YXR1c1RleHQ/OiBzdHJpbmc7XHJcbiAgICB9KTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogRGVsaXZlciBhbiBhcmJpdHJhcnkgYEh0dHBFdmVudGAgKHN1Y2ggYXMgYSBwcm9ncmVzcyBldmVudCkgb24gdGhlIHJlc3BvbnNlIHN0cmVhbSBmb3IgdGhpc1xyXG4gICAgICogcmVxdWVzdC5cclxuICAgICAqL1xyXG4gICAgZXZlbnQoZXZlbnQ6IEh0dHBFdmVudDxhbnk+KTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEEgdGVzdGluZyBiYWNrZW5kIGZvciBgSHR0cENsaWVudGAgd2hpY2ggYm90aCBhY3RzIGFzIGFuIGBIdHRwQmFja2VuZGBcclxuICogYW5kIGFzIHRoZSBgSHR0cFRlc3RpbmdDb250cm9sbGVyYC5cclxuICpcclxuICogYEh0dHBDbGllbnRUZXN0aW5nQmFja2VuZGAgd29ya3MgYnkga2VlcGluZyBhIGxpc3Qgb2YgYWxsIG9wZW4gcmVxdWVzdHMuXHJcbiAqIEFzIHJlcXVlc3RzIGNvbWUgaW4sIHRoZXkncmUgYWRkZWQgdG8gdGhlIGxpc3QuIFVzZXJzIGNhbiBhc3NlcnQgdGhhdCBzcGVjaWZpY1xyXG4gKiByZXF1ZXN0cyB3ZXJlIG1hZGUgYW5kIHRoZW4gZmx1c2ggdGhlbS4gSW4gdGhlIGVuZCwgYSB2ZXJpZnkoKSBtZXRob2QgYXNzZXJ0c1xyXG4gKiB0aGF0IG5vIHVuZXhwZWN0ZWQgcmVxdWVzdHMgd2VyZSBtYWRlLlxyXG4gKlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgybVhbmd1bGFyX3BhY2thZ2VzX2NvbW1vbl9odHRwX3Rlc3RpbmdfdGVzdGluZ19hIGltcGxlbWVudHMgSHR0cEJhY2tlbmQsIEh0dHBUZXN0aW5nQ29udHJvbGxlciB7XHJcbiAgICAvKipcclxuICAgICAqIExpc3Qgb2YgcGVuZGluZyByZXF1ZXN0cyB3aGljaCBoYXZlIG5vdCB5ZXQgYmVlbiBleHBlY3RlZC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvcGVuO1xyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgYW4gaW5jb21pbmcgcmVxdWVzdCBieSBxdWV1ZWluZyBpdCBpbiB0aGUgbGlzdCBvZiBvcGVuIHJlcXVlc3RzLlxyXG4gICAgICovXHJcbiAgICBoYW5kbGUocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj47XHJcbiAgICAvKipcclxuICAgICAqIEhlbHBlciBmdW5jdGlvbiB0byBzZWFyY2ggZm9yIHJlcXVlc3RzIGluIHRoZSBsaXN0IG9mIG9wZW4gcmVxdWVzdHMuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX21hdGNoO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZWFyY2ggZm9yIHJlcXVlc3RzIGluIHRoZSBsaXN0IG9mIG9wZW4gcmVxdWVzdHMsIGFuZCByZXR1cm4gYWxsIHRoYXQgbWF0Y2hcclxuICAgICAqIHdpdGhvdXQgYXNzZXJ0aW5nIGFueXRoaW5nIGFib3V0IHRoZSBudW1iZXIgb2YgbWF0Y2hlcy5cclxuICAgICAqL1xyXG4gICAgbWF0Y2gobWF0Y2g6IHN0cmluZyB8IFJlcXVlc3RNYXRjaCB8ICgocmVxOiBIdHRwUmVxdWVzdDxhbnk+KSA9PiBib29sZWFuKSk6IFRlc3RSZXF1ZXN0W107XHJcbiAgICAvKipcclxuICAgICAqIEV4cGVjdCB0aGF0IGEgc2luZ2xlIG91dHN0YW5kaW5nIHJlcXVlc3QgbWF0Y2hlcyB0aGUgZ2l2ZW4gbWF0Y2hlciwgYW5kIHJldHVyblxyXG4gICAgICogaXQuXHJcbiAgICAgKlxyXG4gICAgICogUmVxdWVzdHMgcmV0dXJuZWQgdGhyb3VnaCB0aGlzIEFQSSB3aWxsIG5vIGxvbmdlciBiZSBpbiB0aGUgbGlzdCBvZiBvcGVuIHJlcXVlc3RzLFxyXG4gICAgICogYW5kIHRodXMgd2lsbCBub3QgbWF0Y2ggdHdpY2UuXHJcbiAgICAgKi9cclxuICAgIGV4cGVjdE9uZShtYXRjaDogc3RyaW5nIHwgUmVxdWVzdE1hdGNoIHwgKChyZXE6IEh0dHBSZXF1ZXN0PGFueT4pID0+IGJvb2xlYW4pLCBkZXNjcmlwdGlvbj86IHN0cmluZyk6IFRlc3RSZXF1ZXN0O1xyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBlY3QgdGhhdCBubyBvdXRzdGFuZGluZyByZXF1ZXN0cyBtYXRjaCB0aGUgZ2l2ZW4gbWF0Y2hlciwgYW5kIHRocm93IGFuIGVycm9yXHJcbiAgICAgKiBpZiBhbnkgZG8uXHJcbiAgICAgKi9cclxuICAgIGV4cGVjdE5vbmUobWF0Y2g6IHN0cmluZyB8IFJlcXVlc3RNYXRjaCB8ICgocmVxOiBIdHRwUmVxdWVzdDxhbnk+KSA9PiBib29sZWFuKSwgZGVzY3JpcHRpb24/OiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZSB0aGF0IHRoZXJlIGFyZSBubyBvdXRzdGFuZGluZyByZXF1ZXN0cy5cclxuICAgICAqL1xyXG4gICAgdmVyaWZ5KG9wdHM/OiB7XHJcbiAgICAgICAgaWdub3JlQ2FuY2VsbGVkPzogYm9vbGVhbjtcclxuICAgIH0pOiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBkZXNjcmlwdGlvbkZyb21NYXRjaGVyO1xyXG59XHJcblxyXG5leHBvcnQgeyB9XHJcbiJdfQ==