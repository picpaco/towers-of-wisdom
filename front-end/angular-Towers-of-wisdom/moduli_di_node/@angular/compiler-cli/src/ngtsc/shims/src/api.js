(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngtsc/shims/src/api", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL3NyYy9uZ3RzYy9zaGltcy9zcmMvYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7QWJzb2x1dGVGc1BhdGh9IGZyb20gJy4uLy4uL2ZpbGVfc3lzdGVtJztcblxuZXhwb3J0IGludGVyZmFjZSBTaGltR2VuZXJhdG9yIHtcbiAgLyoqXG4gICAqIFJldHVybnMgYHRydWVgIGlmIHRoaXMgZ2VuZXJhdG9yIGlzIGludGVuZGVkIHRvIGhhbmRsZSB0aGUgZ2l2ZW4gZmlsZS5cbiAgICovXG4gIHJlY29nbml6ZShmaWxlTmFtZTogQWJzb2x1dGVGc1BhdGgpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIHNoaW0ncyBgdHMuU291cmNlRmlsZWAgZm9yIHRoZSBnaXZlbiBvcmlnaW5hbCBmaWxlLlxuICAgKlxuICAgKiBgcmVhZEZpbGVgIGlzIGEgZnVuY3Rpb24gd2hpY2ggYWxsb3dzIHRoZSBnZW5lcmF0b3IgdG8gbG9vayB1cCB0aGUgY29udGVudHMgb2YgZXhpc3Rpbmcgc291cmNlXG4gICAqIGZpbGVzLiBJdCByZXR1cm5zIG51bGwgaWYgdGhlIHJlcXVlc3RlZCBmaWxlIGRvZXNuJ3QgZXhpc3QuXG4gICAqXG4gICAqIElmIGBnZW5lcmF0ZWAgcmV0dXJucyBudWxsLCB0aGVuIHRoZSBzaGltIGdlbmVyYXRvciBkZWNsaW5lcyB0byBnZW5lcmF0ZSB0aGUgZmlsZSBhZnRlciBhbGwuXG4gICAqL1xuICBnZW5lcmF0ZShnZW5GaWxlTmFtZTogQWJzb2x1dGVGc1BhdGgsIHJlYWRGaWxlOiAoZmlsZU5hbWU6IHN0cmluZykgPT4gdHMuU291cmNlRmlsZSB8IG51bGwpOlxuICAgICAgdHMuU291cmNlRmlsZXxudWxsO1xufSJdfQ==