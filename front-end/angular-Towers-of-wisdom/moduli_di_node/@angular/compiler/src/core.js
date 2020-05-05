/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler/src/core", ["require", "exports", "tslib", "@angular/compiler/src/selector"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    // Attention:
    // This file duplicates types and values from @angular/core
    // so that we are able to make @angular/compiler independent of @angular/core.
    // This is important to prevent a build cycle, as @angular/core needs to
    // be compiled with the compiler.
    var selector_1 = require("@angular/compiler/src/selector");
    exports.createInject = makeMetadataFactory('Inject', function (token) { return ({ token: token }); });
    exports.createInjectionToken = makeMetadataFactory('InjectionToken', function (desc) { return ({ _desc: desc, ɵprov: undefined }); });
    exports.createAttribute = makeMetadataFactory('Attribute', function (attributeName) { return ({ attributeName: attributeName }); });
    exports.createContentChildren = makeMetadataFactory('ContentChildren', function (selector, data) {
        if (data === void 0) { data = {}; }
        return (tslib_1.__assign({ selector: selector, first: false, isViewQuery: false, descendants: false }, data));
    });
    exports.createContentChild = makeMetadataFactory('ContentChild', function (selector, data) {
        if (data === void 0) { data = {}; }
        return (tslib_1.__assign({ selector: selector, first: true, isViewQuery: false, descendants: true }, data));
    });
    exports.createViewChildren = makeMetadataFactory('ViewChildren', function (selector, data) {
        if (data === void 0) { data = {}; }
        return (tslib_1.__assign({ selector: selector, first: false, isViewQuery: true, descendants: true }, data));
    });
    exports.createViewChild = makeMetadataFactory('ViewChild', function (selector, data) {
        return (tslib_1.__assign({ selector: selector, first: true, isViewQuery: true, descendants: true }, data));
    });
    exports.createDirective = makeMetadataFactory('Directive', function (dir) {
        if (dir === void 0) { dir = {}; }
        return dir;
    });
    var ViewEncapsulation;
    (function (ViewEncapsulation) {
        ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
        ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
        ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
        ViewEncapsulation[ViewEncapsulation["ShadowDom"] = 3] = "ShadowDom";
    })(ViewEncapsulation = exports.ViewEncapsulation || (exports.ViewEncapsulation = {}));
    var ChangeDetectionStrategy;
    (function (ChangeDetectionStrategy) {
        ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
        ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
    })(ChangeDetectionStrategy = exports.ChangeDetectionStrategy || (exports.ChangeDetectionStrategy = {}));
    exports.createComponent = makeMetadataFactory('Component', function (c) {
        if (c === void 0) { c = {}; }
        return (tslib_1.__assign({ changeDetection: ChangeDetectionStrategy.Default }, c));
    });
    exports.createPipe = makeMetadataFactory('Pipe', function (p) { return (tslib_1.__assign({ pure: true }, p)); });
    exports.createInput = makeMetadataFactory('Input', function (bindingPropertyName) { return ({ bindingPropertyName: bindingPropertyName }); });
    exports.createOutput = makeMetadataFactory('Output', function (bindingPropertyName) { return ({ bindingPropertyName: bindingPropertyName }); });
    exports.createHostBinding = makeMetadataFactory('HostBinding', function (hostPropertyName) { return ({ hostPropertyName: hostPropertyName }); });
    exports.createHostListener = makeMetadataFactory('HostListener', function (eventName, args) { return ({ eventName: eventName, args: args }); });
    exports.createNgModule = makeMetadataFactory('NgModule', function (ngModule) { return ngModule; });
    exports.createInjectable = makeMetadataFactory('Injectable', function (injectable) {
        if (injectable === void 0) { injectable = {}; }
        return injectable;
    });
    exports.CUSTOM_ELEMENTS_SCHEMA = {
        name: 'custom-elements'
    };
    exports.NO_ERRORS_SCHEMA = {
        name: 'no-errors-schema'
    };
    exports.createOptional = makeMetadataFactory('Optional');
    exports.createSelf = makeMetadataFactory('Self');
    exports.createSkipSelf = makeMetadataFactory('SkipSelf');
    exports.createHost = makeMetadataFactory('Host');
    exports.Type = Function;
    var SecurityContext;
    (function (SecurityContext) {
        SecurityContext[SecurityContext["NONE"] = 0] = "NONE";
        SecurityContext[SecurityContext["HTML"] = 1] = "HTML";
        SecurityContext[SecurityContext["STYLE"] = 2] = "STYLE";
        SecurityContext[SecurityContext["SCRIPT"] = 3] = "SCRIPT";
        SecurityContext[SecurityContext["URL"] = 4] = "URL";
        SecurityContext[SecurityContext["RESOURCE_URL"] = 5] = "RESOURCE_URL";
    })(SecurityContext = exports.SecurityContext || (exports.SecurityContext = {}));
    var MissingTranslationStrategy;
    (function (MissingTranslationStrategy) {
        MissingTranslationStrategy[MissingTranslationStrategy["Error"] = 0] = "Error";
        MissingTranslationStrategy[MissingTranslationStrategy["Warning"] = 1] = "Warning";
        MissingTranslationStrategy[MissingTranslationStrategy["Ignore"] = 2] = "Ignore";
    })(MissingTranslationStrategy = exports.MissingTranslationStrategy || (exports.MissingTranslationStrategy = {}));
    function makeMetadataFactory(name, props) {
        // This must be declared as a function, not a fat arrow, so that ES2015 devmode produces code
        // that works with the static_reflector.ts in the ViewEngine compiler.
        // In particular, `_registerDecoratorOrConstructor` assumes that the value returned here can be
        // new'ed.
        function factory() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var values = props ? props.apply(void 0, tslib_1.__spread(args)) : {};
            return tslib_1.__assign({ ngMetadataName: name }, values);
        }
        factory.isTypeOf = function (obj) { return obj && obj.ngMetadataName === name; };
        factory.ngMetadataName = name;
        return factory;
    }
    function parserSelectorToSimpleSelector(selector) {
        var classes = selector.classNames && selector.classNames.length ? tslib_1.__spread([8 /* CLASS */], selector.classNames) :
            [];
        var elementName = selector.element && selector.element !== '*' ? selector.element : '';
        return tslib_1.__spread([elementName], selector.attrs, classes);
    }
    function parserSelectorToNegativeSelector(selector) {
        var classes = selector.classNames && selector.classNames.length ? tslib_1.__spread([8 /* CLASS */], selector.classNames) :
            [];
        if (selector.element) {
            return tslib_1.__spread([
                1 /* NOT */ | 4 /* ELEMENT */, selector.element
            ], selector.attrs, classes);
        }
        else if (selector.attrs.length) {
            return tslib_1.__spread([1 /* NOT */ | 2 /* ATTRIBUTE */], selector.attrs, classes);
        }
        else {
            return selector.classNames && selector.classNames.length ? tslib_1.__spread([1 /* NOT */ | 8 /* CLASS */], selector.classNames) :
                [];
        }
    }
    function parserSelectorToR3Selector(selector) {
        var positive = parserSelectorToSimpleSelector(selector);
        var negative = selector.notSelectors && selector.notSelectors.length ?
            selector.notSelectors.map(function (notSelector) { return parserSelectorToNegativeSelector(notSelector); }) :
            [];
        return positive.concat.apply(positive, tslib_1.__spread(negative));
    }
    function parseSelectorToR3Selector(selector) {
        return selector ? selector_1.CssSelector.parse(selector).map(parserSelectorToR3Selector) : [];
    }
    exports.parseSelectorToR3Selector = parseSelectorToR3Selector;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7OztJQUVILGFBQWE7SUFDYiwyREFBMkQ7SUFDM0QsOEVBQThFO0lBQzlFLHdFQUF3RTtJQUN4RSxpQ0FBaUM7SUFFakMsMkRBQXVDO0lBSzFCLFFBQUEsWUFBWSxHQUFHLG1CQUFtQixDQUFTLFFBQVEsRUFBRSxVQUFDLEtBQVUsSUFBSyxPQUFBLENBQUMsRUFBQyxLQUFLLE9BQUEsRUFBQyxDQUFDLEVBQVQsQ0FBUyxDQUFDLENBQUM7SUFDaEYsUUFBQSxvQkFBb0IsR0FBRyxtQkFBbUIsQ0FDbkQsZ0JBQWdCLEVBQUUsVUFBQyxJQUFZLElBQUssT0FBQSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO0lBSzlELFFBQUEsZUFBZSxHQUN4QixtQkFBbUIsQ0FBWSxXQUFXLEVBQUUsVUFBQyxhQUFzQixJQUFLLE9BQUEsQ0FBQyxFQUFDLGFBQWEsZUFBQSxFQUFDLENBQUMsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBV2xGLFFBQUEscUJBQXFCLEdBQUcsbUJBQW1CLENBQ3BELGlCQUFpQixFQUNqQixVQUFDLFFBQWMsRUFBRSxJQUFjO1FBQWQscUJBQUEsRUFBQSxTQUFjO1FBQzNCLE9BQUEsb0JBQUUsUUFBUSxVQUFBLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxLQUFLLElBQUssSUFBSSxFQUFFO0lBQTNFLENBQTJFLENBQUMsQ0FBQztJQUN4RSxRQUFBLGtCQUFrQixHQUFHLG1CQUFtQixDQUNqRCxjQUFjLEVBQ2QsVUFBQyxRQUFjLEVBQUUsSUFBYztRQUFkLHFCQUFBLEVB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SyxPQUFPLEVBQzFGO1NBQ0g7YUFBTSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2hDLHlCQUFRLCtCQUEyQyxHQUFLLFFBQVEsQ0FBQyxLQUFLLEVBQUssT0FBTyxFQUFFO1NBQ3JGO2FBQU07WUFDTCxPQUFPLFFBQVEsQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxtQkFDckQsMkJBQXVDLEdBQUssUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNuRSxFQUFFLENBQUM7U0FDUjtJQUNILENBQUM7SUFFRCxTQUFTLDBCQUEwQixDQUFDLFFBQXFCO1FBQ3ZELElBQU0sUUFBUSxHQUFHLDhCQUE4QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTFELElBQU0sUUFBUSxHQUFzQixRQUFRLENBQUMsWUFBWSxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkYsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQSxXQUFXLElBQUksT0FBQSxnQ0FBZ0MsQ0FBQyxXQUFXLENBQUMsRUFBN0MsQ0FBNkMsQ0FBQyxDQUFDLENBQUM7WUFDekYsRUFBRSxDQUFDO1FBRVAsT0FBTyxRQUFRLENBQUMsTUFBTSxPQUFmLFFBQVEsbUJBQVcsUUFBUSxHQUFFO0lBQ3RDLENBQUM7SUFFRCxTQUFnQix5QkFBeUIsQ0FBQyxRQUFxQjtRQUM3RCxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsc0JBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNyRixDQUFDO0lBRkQsOERBRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIEF0dGVudGlvbjpcbi8vIFRoaXMgZmlsZSBkdXBsaWNhdGVzIHR5cGVzIGFuZCB2YWx1ZXMgZnJvbSBAYW5ndWxhci9jb3JlXG4vLyBzbyB0aGF0IHdlIGFyZSBhYmxlIHRvIG1ha2UgQGFuZ3VsYXIvY29tcGlsZXIgaW5kZXBlbmRlbnQgb2YgQGFuZ3VsYXIvY29yZS5cbi8vIFRoaXMgaXMgaW1wb3J0YW50IHRvIHByZXZlbnQgYSBidWlsZCBjeWNsZSwgYXMgQGFuZ3VsYXIvY29yZSBuZWVkcyB0b1xuLy8gYmUgY29tcGlsZWQgd2l0aCB0aGUgY29tcGlsZXIuXG5cbmltcG9ydCB7Q3NzU2VsZWN0b3J9IGZyb20gJy4vc2VsZWN0b3InO1xuXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdCB7XG4gIHRva2VuOiBhbnk7XG59XG5leHBvcnQgY29uc3QgY3JlYXRlSW5qZWN0ID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxJbmplY3Q+KCdJbmplY3QnLCAodG9rZW46IGFueSkgPT4gKHt0b2tlbn0pKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVJbmplY3Rpb25Ub2tlbiA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8b2JqZWN0PihcbiAgICAnSW5qZWN0aW9uVG9rZW4nLCAoZGVzYzogc3RyaW5nKSA9PiAoe19kZXNjOiBkZXNjLCDJtXByb3Y6IHVuZGVmaW5lZH0pKTtcblxuZXhwb3J0IGludGVyZmFjZSBBdHRyaWJ1dGUge1xuICBhdHRyaWJ1dGVOYW1lPzogc3RyaW5nO1xufVxuZXhwb3J0IGNvbnN0IGNyZWF0ZUF0dHJpYnV0ZSA9XG4gICAgbWFrZU1ldGFkYXRhRmFjdG9yeTxBdHRyaWJ1dGU+KCdBdHRyaWJ1dGUnLCAoYXR0cmlidXRlTmFtZT86IHN0cmluZykgPT4gKHthdHRyaWJ1dGVOYW1lfSkpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5IHtcbiAgZGVzY2VuZGFudHM6IGJvb2xlYW47XG4gIGZpcnN0OiBib29sZWFuO1xuICByZWFkOiBhbnk7XG4gIGlzVmlld1F1ZXJ5OiBib29sZWFuO1xuICBzZWxlY3RvcjogYW55O1xuICBzdGF0aWM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlQ29udGVudENoaWxkcmVuID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxRdWVyeT4oXG4gICAgJ0NvbnRlbnRDaGlsZHJlbicsXG4gICAgKHNlbGVjdG9yPzogYW55LCBkYXRhOiBhbnkgPSB7fSkgPT5cbiAgICAgICAgKHtzZWxlY3RvciwgZmlyc3Q6IGZhbHNlLCBpc1ZpZXdRdWVyeTogZmFsc2UsIGRlc2NlbmRhbnRzOiBmYWxzZSwgLi4uZGF0YX0pKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVDb250ZW50Q2hpbGQgPSBtYWtlTWV0YWRhdGFGYWN0b3J5PFF1ZXJ5PihcbiAgICAnQ29udGVudENoaWxkJyxcbiAgICAoc2VsZWN0b3I/OiBhbnksIGRhdGE6IGFueSA9IHt9KSA9PlxuICAgICAgICAoe3NlbGVjdG9yLCBmaXJzdDogdHJ1ZSwgaXNWaWV3UXVlcnk6IGZhbHNlLCBkZXNjZW5kYW50czogdHJ1ZSwgLi4uZGF0YX0pKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVWaWV3Q2hpbGRyZW4gPSBtYWtlTWV0YWRhdGFGYWN0b3J5PFF1ZXJ5PihcbiAgICAnVmlld0NoaWxkcmVuJyxcbiAgICAoc2VsZWN0b3I/OiBhbnksIGRhdGE6IGFueSA9IHt9KSA9PlxuICAgICAgICAoe3NlbGVjdG9yLCBmaXJzdDogZmFsc2UsIGlzVmlld1F1ZXJ5OiB0cnVlLCBkZXNjZW5kYW50czogdHJ1ZSwgLi4uZGF0YX0pKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVWaWV3Q2hpbGQgPSBtYWtlTWV0YWRhdGFGYWN0b3J5PFF1ZXJ5PihcbiAgICAnVmlld0NoaWxkJyxcbiAgICAoc2VsZWN0b3I6IGFueSwgZGF0YTogYW55KSA9PlxuICAgICAgICAoe3NlbGVjdG9yLCBmaXJzdDogdHJ1ZSwgaXNWaWV3UXVlcnk6IHRydWUsIGRlc2NlbmRhbnRzOiB0cnVlLCAuLi5kYXRhfSkpO1xuXG5leHBvcnQgaW50ZXJmYWNlIERpcmVjdGl2ZSB7XG4gIHNlbGVjdG9yPzogc3RyaW5nO1xuICBpbnB1dHM/OiBzdHJpbmdbXTtcbiAgb3V0cHV0cz86IHN0cmluZ1tdO1xuICBob3N0Pzoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gIHByb3ZpZGVycz86IFByb3ZpZGVyW107XG4gIGV4cG9ydEFzPzogc3RyaW5nO1xuICBxdWVyaWVzPzoge1trZXk6IHN0cmluZ106IGFueX07XG4gIGd1YXJkcz86IHtba2V5OiBzdHJpbmddOiBhbnl9O1xufVxuZXhwb3J0IGNvbnN0IGNyZWF0ZURpcmVjdGl2ZSA9XG4gICAgbWFrZU1ldGFkYXRhRmFjdG9yeTxEaXJlY3RpdmU+KCdEaXJlY3RpdmUnLCAoZGlyOiBEaXJlY3RpdmUgPSB7fSkgPT4gZGlyKTtcblxuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnQgZXh0ZW5kcyBEaXJlY3RpdmUge1xuICBjaGFuZ2VEZXRlY3Rpb24/OiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneTtcbiAgdmlld1Byb3ZpZGVycz86IFByb3ZpZGVyW107XG4gIG1vZHVsZUlkPzogc3RyaW5nO1xuICB0ZW1wbGF0ZVVybD86IHN0cmluZztcbiAgdGVtcGxhdGU/OiBzdHJpbmc7XG4gIHN0eWxlVXJscz86IHN0cmluZ1tdO1xuICBzdHlsZXM/OiBzdHJpbmdbXTtcbiAgYW5pbWF0aW9ucz86IGFueVtdO1xuICBlbmNhcHN1bGF0aW9uPzogVmlld0VuY2Fwc3VsYXRpb247XG4gIGludGVycG9sYXRpb24/OiBbc3RyaW5nLCBzdHJpbmddO1xuICBlbnRyeUNvbXBvbmVudHM/OiBBcnJheTxUeXBlfGFueVtdPjtcbiAgcHJlc2VydmVXaGl0ZXNwYWNlcz86IGJvb2xlYW47XG59XG5leHBvcnQgZW51bSBWaWV3RW5jYXBzdWxhdGlvbiB7XG4gIEVtdWxhdGVkID0gMCxcbiAgTmF0aXZlID0gMSxcbiAgTm9uZSA9IDIsXG4gIFNoYWRvd0RvbSA9IDNcbn1cblxuZXhwb3J0IGVudW0gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kge1xuICBPblB1c2ggPSAwLFxuICBEZWZhdWx0ID0gMVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlQ29tcG9uZW50ID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxDb21wb25lbnQ+KFxuICAgICdDb21wb25lbnQnLCAoYzogQ29tcG9uZW50ID0ge30pID0+ICh7Y2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LCAuLi5jfSkpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBpcGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHB1cmU/OiBib29sZWFuO1xufVxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBpcGUgPSBtYWtlTWV0YWRhdGFGYWN0b3J5PFBpcGU+KCdQaXBlJywgKHA6IFBpcGUpID0+ICh7cHVyZTogdHJ1ZSwgLi4ucH0pKTtcblxuZXhwb3J0IGludGVyZmFjZSBJbnB1dCB7XG4gIGJpbmRpbmdQcm9wZXJ0eU5hbWU/OiBzdHJpbmc7XG59XG5leHBvcnQgY29uc3QgY3JlYXRlSW5wdXQgPVxuICAgIG1ha2VNZXRhZGF0YUZhY3Rvcnk8SW5wdXQ+KCdJbnB1dCcsIChiaW5kaW5nUHJvcGVydHlOYW1lPzogc3RyaW5nKSA9PiAoe2JpbmRpbmdQcm9wZXJ0eU5hbWV9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3V0cHV0IHtcbiAgYmluZGluZ1Byb3BlcnR5TmFtZT86IHN0cmluZztcbn1cbmV4cG9ydCBjb25zdCBjcmVhdGVPdXRwdXQgPSBtYWtlTWV0YWRhdGFGYWN0b3J5PE91dHB1dD4oXG4gICAgJ091dHB1dCcsIChiaW5kaW5nUHJvcGVydHlOYW1lPzogc3RyaW5nKSA9PiAoe2JpbmRpbmdQcm9wZXJ0eU5hbWV9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSG9zdEJpbmRpbmcge1xuICBob3N0UHJvcGVydHlOYW1lPzogc3RyaW5nO1xufVxuZXhwb3J0IGNvbnN0IGNyZWF0ZUhvc3RCaW5kaW5nID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxIb3N0QmluZGluZz4oXG4gICAgJ0hvc3RCaW5kaW5nJywgKGhvc3RQcm9wZXJ0eU5hbWU/OiBzdHJpbmcpID0+ICh7aG9zdFByb3BlcnR5TmFtZX0pKTtcblxuZXhwb3J0IGludGVyZmFjZSBIb3N0TGlzdGVuZXIge1xuICBldmVudE5hbWU/OiBzdHJpbmc7XG4gIGFyZ3M/OiBzdHJpbmdbXTtcbn1cbmV4cG9ydCBjb25zdCBjcmVhdGVIb3N0TGlzdGVuZXIgPSBtYWtlTWV0YWRhdGFGYWN0b3J5PEhvc3RMaXN0ZW5lcj4oXG4gICAgJ0hvc3RMaXN0ZW5lcicsIChldmVudE5hbWU/OiBzdHJpbmcsIGFyZ3M/OiBzdHJpbmdbXSkgPT4gKHtldmVudE5hbWUsIGFyZ3N9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmdNb2R1bGUge1xuICBwcm92aWRlcnM/OiBQcm92aWRlcltdO1xuICBkZWNsYXJhdGlvbnM/OiBBcnJheTxUeXBlfGFueVtdPjtcbiAgaW1wb3J0cz86IEFycmF5PFR5cGV8TW9kdWxlV2l0aFByb3ZpZGVyc3xhbnlbXT47XG4gIGV4cG9ydHM/OiBBcnJheTxUeXBlfGFueVtdPjtcbiAgZW50cnlDb21wb25lbnRzPzogQXJyYXk8VHlwZXxhbnlbXT47XG4gIGJvb3RzdHJhcD86IEFycmF5PFR5cGV8YW55W10+O1xuICBzY2hlbWFzPzogQXJyYXk8U2NoZW1hTWV0YWRhdGF8YW55W10+O1xuICBpZD86IHN0cmluZztcbn1cbmV4cG9ydCBjb25zdCBjcmVhdGVOZ01vZHVsZSA9XG4gICAgbWFrZU1ldGFkYXRhRmFjdG9yeTxOZ01vZHVsZT4oJ05nTW9kdWxlJywgKG5nTW9kdWxlOiBOZ01vZHVsZSkgPT4gbmdNb2R1bGUpO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICBuZ01vZHVsZTogVHlwZTtcbiAgcHJvdmlkZXJzPzogUHJvdmlkZXJbXTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0YWJsZSB7XG4gIHByb3ZpZGVkSW4/OiBUeXBlfCdyb290J3xhbnk7XG4gIHVzZUNsYXNzPzogVHlwZXxhbnk7XG4gIHVzZUV4aXN0aW5nPzogVHlwZXxhbnk7XG4gIHVzZVZhbHVlPzogYW55O1xuICB1c2VGYWN0b3J5PzogVHlwZXxhbnk7XG4gIGRlcHM/OiBBcnJheTxUeXBlfGFueVtdPjtcbn1cbmV4cG9ydCBjb25zdCBjcmVhdGVJbmplY3RhYmxlID1cbiAgICBtYWtlTWV0YWRhdGFGYWN0b3J5KCdJbmplY3RhYmxlJywgKGluamVjdGFibGU6IEluamVjdGFibGUgPSB7fSkgPT4gaW5qZWN0YWJsZSk7XG5leHBvcnQgaW50ZXJmYWNlIFNjaGVtYU1ldGFkYXRhIHtcbiAgbmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQTogU2NoZW1hTWV0YWRhdGEgPSB7XG4gIG5hbWU6ICdjdXN0b20tZWxlbWVudHMnXG59O1xuXG5leHBvcnQgY29uc3QgTk9fRVJST1JTX1NDSEVNQTogU2NoZW1hTWV0YWRhdGEgPSB7XG4gIG5hbWU6ICduby1lcnJvcnMtc2NoZW1hJ1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU9wdGlvbmFsID0gbWFrZU1ldGFkYXRhRmFjdG9yeSgnT3B0aW9uYWwnKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVTZWxmID0gbWFrZU1ldGFkYXRhRmFjdG9yeSgnU2VsZicpO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVNraXBTZWxmID0gbWFrZU1ldGFkYXRhRmFjdG9yeSgnU2tpcFNlbGYnKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVIb3N0ID0gbWFrZU1ldGFkYXRhRmFjdG9yeSgnSG9zdCcpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFR5cGUgZXh0ZW5kcyBGdW5jdGlvbiB7XG4gIG5ldyguLi5hcmdzOiBhbnlbXSk6IGFueTtcbn1cbmV4cG9ydCBjb25zdCBUeXBlID0gRnVuY3Rpb247XG5cbmV4cG9ydCBlbnVtIFNlY3VyaXR5Q29udGV4dCB7XG4gIE5PTkUgPSAwLFxuICBIVE1MID0gMSxcbiAgU1RZTEUgPSAyLFxuICBTQ1JJUFQgPSAzLFxuICBVUkwgPSA0LFxuICBSRVNPVVJDRV9VUkwgPSA1LFxufVxuXG5leHBvcnQgdHlwZSBQcm92aWRlciA9IGFueTtcblxuZXhwb3J0IGNvbnN0IGVudW0gTm9kZUZsYWdzIHtcbiAgTm9uZSA9IDAsXG4gIFR5cGVFbGVtZW50ID0gMSA8PCAwLFxuICBUeXBlVGV4dCA9IDEgPDwgMSxcbiAgUHJvamVjdGVkVGVtcGxhdGUgPSAxIDw8IDIsXG4gIENhdFJlbmRlck5vZGUgPSBUeXBlRWxlbWVudCB8IFR5cGVUZXh0LFxuICBUeXBlTmdDb250ZW50ID0gMSA8PCAzLFxuICBUeXBlUGlwZSA9IDEgPDwgNCxcbiAgVHlwZVB1cmVBcnJheSA9IDEgPDwgNSxcbiAgVHlwZVB1cmVPYmplY3QgPSAxIDw8IDYsXG4gIFR5cGVQdXJlUGlwZSA9IDEgPDwgNyxcbiAgQ2F0UHVyZUV4cHJlc3Npb24gPSBUeXBlUHVyZUFycmF5IHwgVHlwZVB1cmVPYmplY3QgfCBUeXBlUHVyZVBpcGUsXG4gIFR5cGVWYWx1ZVByb3ZpZGVyID0gMSA8PCA4LFxuICBUeXBlQ2xhc3NQcm92aWRlciA9IDEgPDwgOSxcbiAgVHlwZUZhY3RvcnlQcm92aWRlciA9IDEgPDwgMTAsXG4gIFR5cGVVc2VFeGlzdGluZ1Byb3ZpZGVyID0gMSA8PCAxMSxcbiAgTGF6eVByb3ZpZGVyID0gMSA8PCAxMixcbiAgUHJpdmF0ZVByb3ZpZGVyID0gMSA8PCAxMyxcbiAgVHlwZURpcmVjdGl2ZSA9IDEgPDwgMTQsXG4gIENvbXBvbmVudCA9IDEgPDwgMTUsXG4gIENhdFByb3ZpZGVyTm9EaXJlY3RpdmUgPVxuICAgICAgVHlwZVZhbHVlUHJvdmlkZXIgfCBUeXBlQ2xhc3NQcm92aWRlciB8IFR5cGVGYWN0b3J5UHJvdmlkZXIgfCBUeXBlVXNlRXhpc3RpbmdQcm92aWRlcixcbiAgQ2F0UHJvdmlkZXIgPSBDYXRQcm92aWRlck5vRGlyZWN0aXZlIHwgVHlwZURpcmVjdGl2ZSxcbiAgT25Jbml0ID0gMSA8PCAxNixcbiAgT25EZXN0cm95ID0gMSA8PCAxNyxcbiAgRG9DaGVjayA9IDEgPDwgMTgsXG4gIE9uQ2hhbmdlcyA9IDEgPDwgMTksXG4gIEFmdGVyQ29udGVudEluaXQgPSAxIDw8IDIwLFxuICBBZnRlckNvbnRlbnRDaGVja2VkID0gMSA8PCAyMSxcbiAgQWZ0ZXJWaWV3SW5pdCA9IDEgPDwgMjIsXG4gIEFmdGVyVmlld0NoZWNrZWQgPSAxIDw8IDIzLFxuICBFbWJlZGRlZFZpZXdzID0gMSA8PCAyNCxcbiAgQ29tcG9uZW50VmlldyA9IDEgPDwgMjUsXG4gIFR5cGVDb250ZW50UXVlcnkgPSAxIDw8IDI2LFxuICBUeXBlVmlld1F1ZXJ5ID0gMSA8PCAyNyxcbiAgU3RhdGljUXVlcnkgPSAxIDw8IDI4LFxuICBEeW5hbWljUXVlcnkgPSAxIDw8IDI5LFxuICBUeXBlTW9kdWxlUHJvdmlkZXIgPSAxIDw8IDMwLFxuICBDYXRRdWVyeSA9IFR5cGVDb250ZW50UXVlcnkgfCBUeXBlVmlld1F1ZXJ5LFxuXG4gIC8vIG11dHVhbGx5IGV4Y2x1c2l2ZSB2YWx1ZXMuLi5cbiAgVHlwZXMgPSBDYXRSZW5kZXJOb2RlIHwgVHlwZU5nQ29udGVudCB8IFR5cGVQaXBlIHwgQ2F0UHVyZUV4cHJlc3Npb24gfCBDYXRQcm92aWRlciB8IENhdFF1ZXJ5XG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIERlcEZsYWdzIHtcbiAgTm9uZSA9IDAsXG4gIFNraXBTZWxmID0gMSA8PCAwLFxuICBPcHRpb25hbCA9IDEgPDwgMSxcbiAgU2VsZiA9IDEgPDwgMixcbiAgVmFsdWUgPSAxIDw8IDMsXG59XG5cbi8qKlxuICogSW5qZWN0aW9uIGZsYWdzIGZvciBESS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gSW5qZWN0RmxhZ3Mge1xuICBEZWZhdWx0ID0gMCxcblxuICAvKipcbiAgICogU3BlY2lmaWVzIHRoYXQgYW4gaW5qZWN0b3Igc2hvdWxkIHJldHJpZXZlIGEgZGVwZW5kZW5jeSBmcm9tIGFueSBpbmplY3RvciB1bnRpbCByZWFjaGluZyB0aGVcbiAgICogaG9zdCBlbGVtZW50IG9mIHRoZSBjdXJyZW50IGNvbXBvbmVudC4gKE9ubHkgdXNlZCB3aXRoIEVsZW1lbnQgSW5qZWN0b3IpXG4gICAqL1xuICBIb3N0ID0gMSA8PCAwLFxuICAvKiogRG9uJ3QgZGVzY2VuZCBpbnRvIGFuY2VzdG9ycyBvZiB0aGUgbm9kZSByZXF1ZXN0aW5nIGluamVjdGlvbi4gKi9cbiAgU2VsZiA9IDEgPDwgMSxcbiAgLyoqIFNraXAgdGhlIG5vZGUgdGhhdCBpcyByZXF1ZXN0aW5nIGluamVjdGlvbi4gKi9cbiAgU2tpcFNlbGYgPSAxIDw8IDIsXG4gIC8qKiBJbmplY3QgYGRlZmF1bHRWYWx1ZWAgaW5zdGVhZCBpZiB0b2tlbiBub3QgZm91bmQuICovXG4gIE9wdGlvbmFsID0gMSA8PCAzLFxufVxuXG5leHBvcnQgY29uc3QgZW51bSBBcmd1bWVudFR5cGUge1xuICBJbmxpbmUgPSAwLFxuICBEeW5hbWljID0gMVxufVxuXG5leHBvcnQgY29uc3QgZW51bSBCaW5kaW5nRmxhZ3Mge1xuICBUeXBlRWxlbWVudEF0dHJpYnV0ZSA9IDEgPDwgMCxcbiAgVHlwZUVsZW1lbnRDbGFzcyA9IDEgPDwgMSxcbiAgVHlwZUVsZW1lbnRTdHlsZSA9IDEgPDwgMixcbiAgVHlwZVByb3BlcnR5ID0gMSA8PCAzLFxuICBTeW50aGV0aWNQcm9wZXJ0eSA9IDEgPDwgNCxcbiAgU3ludGhldGljSG9zdFByb3BlcnR5ID0gMSA8PCA1LFxuICBDYXRTeW50aGV0aWNQcm9wZXJ0eSA9IFN5bnRoZXRpY1Byb3BlcnR5IHwgU3ludGhldGljSG9zdFByb3BlcnR5LFxuXG4gIC8vIG11dHVhbGx5IGV4Y2x1c2l2ZSB2YWx1ZXMuLi5cbiAgVHlwZXMgPSBUeXBlRWxlbWVudEF0dHJpYnV0ZSB8IFR5cGVFbGVtZW50Q2xhc3MgfCBUeXBlRWxlbWVudFN0eWxlIHwgVHlwZVByb3BlcnR5XG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIFF1ZXJ5QmluZGluZ1R5cGUge1xuICBGaXJzdCA9IDAsXG4gIEFsbCA9IDFcbn1cblxuZXhwb3J0IGNvbnN0IGVudW0gUXVlcnlWYWx1ZVR5cGUge1xuICBFbGVtZW50UmVmID0gMCxcbiAgUmVuZGVyRWxlbWVudCA9IDEsXG4gIFRlbXBsYXRlUmVmID0gMixcbiAgVmlld0NvbnRhaW5lclJlZiA9IDMsXG4gIFByb3ZpZGVyID0gNFxufVxuXG5leHBvcnQgY29uc3QgZW51bSBWaWV3RmxhZ3Mge1xuICBOb25lID0gMCxcbiAgT25QdXNoID0gMSA8PCAxLFxufVxuXG5leHBvcnQgZW51bSBNaXNzaW5nVHJhbnNsYXRpb25TdHJhdGVneSB7XG4gIEVycm9yID0gMCxcbiAgV2FybmluZyA9IDEsXG4gIElnbm9yZSA9IDIsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWV0YWRhdGFGYWN0b3J5PFQ+IHtcbiAgKC4uLmFyZ3M6IGFueVtdKTogVDtcbiAgaXNUeXBlT2Yob2JqOiBhbnkpOiBvYmogaXMgVDtcbiAgbmdNZXRhZGF0YU5hbWU6IHN0cmluZztcbn1cblxuZnVuY3Rpb24gbWFrZU1ldGFkYXRhRmFjdG9yeTxUPihuYW1lOiBzdHJpbmcsIHByb3BzPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKTogTWV0YWRhdGFGYWN0b3J5PFQ+IHtcbiAgLy8gVGhpcyBtdXN0IGJlIGRlY2xhcmVkIGFzIGEgZnVuY3Rpb24sIG5vdCBhIGZhdCBhcnJvdywgc28gdGhhdCBFUzIwMTUgZGV2bW9kZSBwcm9kdWNlcyBjb2RlXG4gIC8vIHRoYXQgd29ya3Mgd2l0aCB0aGUgc3RhdGljX3JlZmxlY3Rvci50cyBpbiB0aGUgVmlld0VuZ2luZSBjb21waWxlci5cbiAgLy8gSW4gcGFydGljdWxhciwgYF9yZWdpc3RlckRlY29yYXRvck9yQ29uc3RydWN0b3JgIGFzc3VtZXMgdGhhdCB0aGUgdmFsdWUgcmV0dXJuZWQgaGVyZSBjYW4gYmVcbiAgLy8gbmV3J2VkLlxuICBmdW5jdGlvbiBmYWN0b3J5KC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgY29uc3QgdmFsdWVzID0gcHJvcHMgPyBwcm9wcyguLi5hcmdzKSA6IHt9O1xuICAgIHJldHVybiB7XG4gICAgICBuZ01ldGFkYXRhTmFtZTogbmFtZSxcbiAgICAgIC4uLnZhbHVlcyxcbiAgICB9O1xuICB9XG4gIChmYWN0b3J5IGFzIGFueSkuaXNUeXBlT2YgPSAob2JqOiBhbnkpID0+IG9iaiAmJiBvYmoubmdNZXRhZGF0YU5hbWUgPT09IG5hbWU7XG4gIChmYWN0b3J5IGFzIGFueSkubmdNZXRhZGF0YU5hbWUgPSBuYW1lO1xuICByZXR1cm4gZmFjdG9yeSBhcyBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGUge1xuICBjaGlsZHJlbj86IFJvdXRlW107XG4gIGxvYWRDaGlsZHJlbj86IHN0cmluZ3xUeXBlfGFueTtcbn1cblxuLyoqXG4gKiBGbGFncyB1c2VkIHRvIGdlbmVyYXRlIFIzLXN0eWxlIENTUyBTZWxlY3RvcnMuIFRoZXkgYXJlIHBhc3RlZCBmcm9tXG4gKiBjb3JlL3NyYy9yZW5kZXIzL3Byb2plY3Rpb24udHMgYmVjYXVzZSB0aGV5IGNhbm5vdCBiZSByZWZlcmVuY2VkIGRpcmVjdGx5LlxuICovXG5leHBvcnQgY29uc3QgZW51bSBTZWxlY3RvckZsYWdzIHtcbiAgLyoqIEluZGljYXRlcyB0aGlzIGlzIHRoZSBiZWdpbm5pbmcgb2YgYSBuZXcgbmVnYXRpdmUgc2VsZWN0b3IgKi9cbiAgTk9UID0gMGIwMDAxLFxuXG4gIC8qKiBNb2RlIGZvciBtYXRjaGluZyBhdHRyaWJ1dGVzICovXG4gIEFUVFJJQlVURSA9IDBiMDAxMCxcblxuICAvKiogTW9kZSBmb3IgbWF0Y2hpbmcgdGFnIG5hbWVzICovXG4gIEVMRU1FTlQgPSAwYjAxMDAsXG5cbiAgLyoqIE1vZGUgZm9yIG1hdGNoaW5nIGNsYXNzIG5hbWVzICovXG4gIENMQVNTID0gMGIxMDAwLFxufVxuXG4vLyBUaGVzZSBhcmUgYSBjb3B5IHRoZSBDU1MgdHlwZXMgZnJvbSBjb3JlL3NyYy9yZW5kZXIzL2ludGVyZmFjZXMvcHJvamVjdGlvbi50c1xuLy8gVGhleSBhcmUgZHVwbGljYXRlZCBoZXJlIGFzIHRoZXkgY2Fubm90IGJlIGRpcmVjdGx5IHJlZmVyZW5jZWQgZnJvbSBjb3JlLlxuZXhwb3J0IHR5cGUgUjNDc3NTZWxlY3RvciA9IChzdHJpbmd8U2VsZWN0b3JGbGFncylbXTtcbmV4cG9ydCB0eXBlIFIzQ3NzU2VsZWN0b3JMaXN0ID0gUjNDc3NTZWxlY3RvcltdO1xuXG5mdW5jdGlvbiBwYXJzZXJTZWxlY3RvclRvU2ltcGxlU2VsZWN0b3Ioc2VsZWN0b3I6IENzc1NlbGVjdG9yKTogUjNDc3NTZWxlY3RvciB7XG4gIGNvbnN0IGNsYXNzZXMgPSBzZWxlY3Rvci5jbGFzc05hbWVzICYmIHNlbGVjdG9yLmNsYXNzTmFtZXMubGVuZ3RoID9cbiAgICAgIFtTZWxlY3RvckZsYWdzLkNMQVNTLCAuLi5zZWxlY3Rvci5jbGFzc05hbWVzXSA6XG4gICAgICBbXTtcbiAgY29uc3QgZWxlbWVudE5hbWUgPSBzZWxlY3Rvci5lbGVtZW50ICYmIHNlbGVjdG9yLmVsZW1lbnQgIT09ICcqJyA/IHNlbGVjdG9yLmVsZW1lbnQgOiAnJztcbiAgcmV0dXJuIFtlbGVtZW50TmFtZSwgLi4uc2VsZWN0b3IuYXR0cnMsIC4uLmNsYXNzZXNdO1xufVxuXG5mdW5jdGlvbiBwYXJzZXJTZWxlY3RvclRvTmVnYXRpdmVTZWxlY3RvcihzZWxlY3RvcjogQ3NzU2VsZWN0b3IpOiBSM0Nzc1NlbGVjdG9yIHtcbiAgY29uc3QgY2xhc3NlcyA9IHNlbGVjdG9yLmNsYXNzTmFtZXMgJiYgc2VsZWN0b3IuY2xhc3NOYW1lcy5sZW5ndGggP1xuICAgICAgW1NlbGVjdG9yRmxhZ3MuQ0xBU1MsIC4uLnNlbGVjdG9yLmNsYXNzTmFtZXNdIDpcbiAgICAgIFtdO1xuXG4gIGlmIChzZWxlY3Rvci5lbGVtZW50KSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIFNlbGVjdG9yRmxhZ3MuTk9UIHwgU2VsZWN0b3JGbGFncy5FTEVNRU5ULCBzZWxlY3Rvci5lbGVtZW50LCAuLi5zZWxlY3Rvci5hdHRycywgLi4uY2xhc3Nlc1xuICAgIF07XG4gIH0gZWxzZSBpZiAoc2VsZWN0b3IuYXR0cnMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtTZWxlY3RvckZsYWdzLk5PVCB8IFNlbGVjdG9yRmxhZ3MuQVRUUklCVVRFLCAuLi5zZWxlY3Rvci5hdHRycywgLi4uY2xhc3Nlc107XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yLmNsYXNzTmFtZXMgJiYgc2VsZWN0b3IuY2xhc3NOYW1lcy5sZW5ndGggP1xuICAgICAgICBbU2VsZWN0b3JGbGFncy5OT1QgfCBTZWxlY3RvckZsYWdzLkNMQVNTLCAuLi5zZWxlY3Rvci5jbGFzc05hbWVzXSA6XG4gICAgICAgIFtdO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlclNlbGVjdG9yVG9SM1NlbGVjdG9yKHNlbGVjdG9yOiBDc3NTZWxlY3Rvcik6IFIzQ3NzU2VsZWN0b3Ige1xuICBjb25zdCBwb3NpdGl2ZSA9IHBhcnNlclNlbGVjdG9yVG9TaW1wbGVTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgY29uc3QgbmVnYXRpdmU6IFIzQ3NzU2VsZWN0b3JMaXN0ID0gc2VsZWN0b3Iubm90U2VsZWN0b3JzICYmIHNlbGVjdG9yLm5vdFNlbGVjdG9ycy5sZW5ndGggP1xuICAgICAgc2VsZWN0b3Iubm90U2VsZWN0b3JzLm1hcChub3RTZWxlY3RvciA9PiBwYXJzZXJTZWxlY3RvclRvTmVnYXRpdmVTZWxlY3Rvcihub3RTZWxlY3RvcikpIDpcbiAgICAgIFtdO1xuXG4gIHJldHVybiBwb3NpdGl2ZS5jb25jYXQoLi4ubmVnYXRpdmUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTZWxlY3RvclRvUjNTZWxlY3RvcihzZWxlY3Rvcjogc3RyaW5nfG51bGwpOiBSM0Nzc1NlbGVjdG9yTGlzdCB7XG4gIHJldHVybiBzZWxlY3RvciA/IENzc1NlbGVjdG9yLnBhcnNlKHNlbGVjdG9yKS5tYXAocGFyc2VyU2VsZWN0b3JUb1IzU2VsZWN0b3IpIDogW107XG59XG5cbi8vIFBhc3RlZCBmcm9tIHJlbmRlcjMvaW50ZXJmYWNlcy9kZWZpbml0aW9uIHNpbmNlIGl0IGNhbm5vdCBiZSByZWZlcmVuY2VkIGRpcmVjdGx5XG4vKipcbiAqIEZsYWdzIHBhc3NlZCBpbnRvIHRlbXBsYXRlIGZ1bmN0aW9ucyB0byBkZXRlcm1pbmUgd2hpY2ggYmxvY2tzIChpLmUuIGNyZWF0aW9uLCB1cGRhdGUpXG4gKiBzaG91bGQgYmUgZXhlY3V0ZWQuXG4gKlxuICogVHlwaWNhbGx5LCBhIHRlbXBsYXRlIHJ1bnMgYm90aCB0aGUgY3JlYXRpb24gYmxvY2sgYW5kIHRoZSB1cGRhdGUgYmxvY2sgb24gaW5pdGlhbGl6YXRpb24gYW5kXG4gKiBzdWJzZXF1ZW50IHJ1bnMgb25seSBleGVjdXRlIHRoZSB1cGRhdGUgYmxvY2suIEhvd2V2ZXIsIGR5bmFtaWNhbGx5IGNyZWF0ZWQgdmlld3MgcmVxdWlyZSB0aGF0XG4gKiB0aGUgY3JlYXRpb24gYmxvY2sgYmUgZXhlY3V0ZWQgc2VwYXJhdGVseSBmcm9tIHRoZSB1cGRhdGUgYmxvY2sgKGZvciBiYWNrd2FyZHMgY29tcGF0KS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gUmVuZGVyRmxhZ3Mge1xuICAvKiBXaGV0aGVyIHRvIHJ1biB0aGUgY3JlYXRpb24gYmxvY2sgKGUuZy4gY3JlYXRlIGVsZW1lbnRzIGFuZCBkaXJlY3RpdmVzKSAqL1xuICBDcmVhdGUgPSAwYjAxLFxuXG4gIC8qIFdoZXRoZXIgdG8gcnVuIHRoZSB1cGRhdGUgYmxvY2sgKGUuZy4gcmVmcmVzaCBiaW5kaW5ncykgKi9cbiAgVXBkYXRlID0gMGIxMFxufVxuXG4vLyBQYXN0ZWQgZnJvbSByZW5kZXIzL2ludGVyZmFjZXMvbm9kZS50c1xuLyoqXG4gKiBBIHNldCBvZiBtYXJrZXIgdmFsdWVzIHRvIGJlIHVzZWQgaW4gdGhlIGF0dHJpYnV0ZXMgYXJyYXlzLiBUaGVzZSBtYXJrZXJzIGluZGljYXRlIHRoYXQgc29tZVxuICogaXRlbXMgYXJlIG5vdCByZWd1bGFyIGF0dHJpYnV0ZXMgYW5kIHRoZSBwcm9jZXNzaW5nIHNob3VsZCBiZSBhZGFwdGVkIGFjY29yZGluZ2x5LlxuICovXG5leHBvcnQgY29uc3QgZW51bSBBdHRyaWJ1dGVNYXJrZXIge1xuICAvKipcbiAgICogTWFya2VyIGluZGljYXRlcyB0aGF0IHRoZSBmb2xsb3dpbmcgMyB2YWx1ZXMgaW4gdGhlIGF0dHJpYnV0ZXMgYXJyYXkgYXJlOlxuICAgKiBuYW1lc3BhY2VVcmksIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlXG4gICAqIGluIHRoYXQgb3JkZXIuXG4gICAqL1xuICBOYW1lc3BhY2VVUkkgPSAwLFxuXG4gIC8qKlxuICAgKiBTaWduYWxzIGNsYXNzIGRlY2xhcmF0aW9uLlxuICAgKlxuICAgKiBFYWNoIHZhbHVlIGZvbGxvd2luZyBgQ2xhc3Nlc2AgZGVzaWduYXRlcyBhIGNsYXNzIG5hbWUgdG8gaW5jbHVkZSBvbiB0aGUgZWxlbWVudC5cbiAgICogIyMgRXhhbXBsZTpcbiAgICpcbiAgICogR2l2ZW46XG4gICAqIGBgYFxuICAgKiA8ZGl2IGNsYXNzPVwiZm9vIGJhciBiYXpcIj4uLi48ZC92aT5cbiAgICogYGBgXG4gICAqXG4gICAqIHRoZSBnZW5lcmF0ZWQgY29kZSBpczpcbiAgICogYGBgXG4gICAqIHZhciBfYzEgPSBbQXR0cmlidXRlTWFya2VyLkNsYXNzZXMsICdmb28nLCAnYmFyJywgJ2JheiddO1xuICAgKiBgYGBcbiAgICovXG4gIENsYXNzZXMgPSAxLFxuXG4gIC8qKlxuICAgKiBTaWduYWxzIHN0eWxlIGRlY2xhcmF0aW9uLlxuICAgKlxuICAgKiBFYWNoIHBhaXIgb2YgdmFsdWVzIGZvbGxvd2luZyBgU3R5bGVzYCBkZXNpZ25hdGVzIGEgc3R5bGUgbmFtZSBhbmQgdmFsdWUgdG8gaW5jbHVkZSBvbiB0aGVcbiAgICogZWxlbWVudC5cbiAgICogIyMgRXhhbXBsZTpcbiAgICpcbiAgICogR2l2ZW46XG4gICAqIGBgYFxuICAgKiA8ZGl2IHN0eWxlPVwid2lkdGg6MTAwcHg7IGhlaWdodDoyMDBweDsgY29sb3I6cmVkXCI+Li4uPC9kaXY+XG4gICAqIGBgYFxuICAgKlxuICAgKiB0aGUgZ2VuZXJhdGVkIGNvZGUgaXM6XG4gICAqIGBgYFxuICAgKiB2YXIgX2MxID0gW0F0dHJpYnV0ZU1hcmtlci5TdHlsZXMsICd3aWR0aCcsICcxMDBweCcsICdoZWlnaHQnLiAnMjAwcHgnLCAnY29sb3InLCAncmVkJ107XG4gICAqIGBgYFxuICAgKi9cbiAgU3R5bGVzID0gMixcblxuICAvKipcbiAgICogU2lnbmFscyB0aGF0IHRoZSBmb2xsb3dpbmcgYXR0cmlidXRlIG5hbWVzIHdlcmUgZXh0cmFjdGVkIGZyb20gaW5wdXQgb3Igb3V0cHV0IGJpbmRpbmdzLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgZ2l2ZW4gdGhlIGZvbGxvd2luZyBIVE1MOlxuICAgKlxuICAgKiBgYGBcbiAgICogPGRpdiBtb289XCJjYXJcIiBbZm9vXT1cImV4cFwiIChiYXIpPVwiZG9TdGgoKVwiPlxuICAgKiBgYGBcbiAgICpcbiAgICogdGhlIGdlbmVyYXRlZCBjb2RlIGlzOlxuICAgKlxuICAgKiBgYGBcbiAgICogdmFyIF9jMSA9IFsnbW9vJywgJ2NhcicsIEF0dHJpYnV0ZU1hcmtlci5CaW5kaW5ncywgJ2ZvbycsICdiYXInXTtcbiAgICogYGBgXG4gICAqL1xuICBCaW5kaW5ncyA9IDMsXG5cbiAgLyoqXG4gICAqIFNpZ25hbHMgdGhhdCB0aGUgZm9sbG93aW5nIGF0dHJpYnV0ZSBuYW1lcyB3ZXJlIGhvaXN0ZWQgZnJvbSBhbiBpbmxpbmUtdGVtcGxhdGUgZGVjbGFyYXRpb24uXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBnaXZlbiB0aGUgZm9sbG93aW5nIEhUTUw6XG4gICAqXG4gICAqIGBgYFxuICAgKiA8ZGl2ICpuZ0Zvcj1cImxldCB2YWx1ZSBvZiB2YWx1ZXM7IHRyYWNrQnk6dHJhY2tCeVwiIGRpckEgW2RpckJdPVwidmFsdWVcIj5cbiAgICogYGBgXG4gICAqXG4gICAqIHRoZSBnZW5lcmF0ZWQgY29kZSBmb3IgdGhlIGB0ZW1wbGF0ZSgpYCBpbnN0cnVjdGlvbiB3b3VsZCBpbmNsdWRlOlxuICAgKlxuICAgKiBgYGBcbiAgICogWydkaXJBJywgJycsIEF0dHJpYnV0ZU1hcmtlci5CaW5kaW5ncywgJ2RpckInLCBBdHRyaWJ1dGVNYXJrZXIuVGVtcGxhdGUsICduZ0ZvcicsICduZ0Zvck9mJyxcbiAgICogJ25nRm9yVHJhY2tCeScsICdsZXQtdmFsdWUnXVxuICAgKiBgYGBcbiAgICpcbiAgICogd2hpbGUgdGhlIGdlbmVyYXRlZCBjb2RlIGZvciB0aGUgYGVsZW1lbnQoKWAgaW5zdHJ1Y3Rpb24gaW5zaWRlIHRoZSB0ZW1wbGF0ZSBmdW5jdGlvbiB3b3VsZFxuICAgKiBpbmNsdWRlOlxuICAgKlxuICAgKiBgYGBcbiAgICogWydkaXJBJywgJycsIEF0dHJpYnV0ZU1hcmtlci5CaW5kaW5ncywgJ2RpckInXVxuICAgKiBgYGBcbiAgICovXG4gIFRlbXBsYXRlID0gNCxcblxuICAvKipcbiAgICogU2lnbmFscyB0aGF0IHRoZSBmb2xsb3dpbmcgYXR0cmlidXRlIGlzIGBuZ1Byb2plY3RBc2AgYW5kIGl0cyB2YWx1ZSBpcyBhIHBhcnNlZCBgQ3NzU2VsZWN0b3JgLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgZ2l2ZW4gdGhlIGZvbGxvd2luZyBIVE1MOlxuICAgKlxuICAgKiBgYGBcbiAgICogPGgxIGF0dHI9XCJ2YWx1ZVwiIG5nUHJvamVjdEFzPVwiW3RpdGxlXVwiPlxuICAgKiBgYGBcbiAgICpcbiAgICogdGhlIGdlbmVyYXRlZCBjb2RlIGZvciB0aGUgYGVsZW1lbnQoKWAgaW5zdHJ1Y3Rpb24gd291bGQgaW5jbHVkZTpcbiAgICpcbiAgICogYGBgXG4gICAqIFsnYXR0cicsICd2YWx1ZScsIEF0dHJpYnV0ZU1hcmtlci5Qcm9qZWN0QXMsIFsnJywgJ3RpdGxlJywgJyddXVxuICAgKiBgYGBcbiAgICovXG4gIFByb2plY3RBcyA9IDUsXG5cbiAgLyoqXG4gICAqIFNpZ25hbHMgdGhhdCB0aGUgZm9sbG93aW5nIGF0dHJpYnV0ZSB3aWxsIGJlIHRyYW5zbGF0ZWQgYnkgcnVudGltZSBpMThuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBnaXZlbiB0aGUgZm9sbG93aW5nIEhUTUw6XG4gICAqXG4gICAqIGBgYFxuICAgKiA8ZGl2IG1vbz1cImNhclwiIGZvbz1cInZhbHVlXCIgaTE4bi1mb28gW2Jhcl09XCJiaW5kaW5nXCIgaTE4bi1iYXI+XG4gICAqIGBgYFxuICAgKlxuICAgKiB0aGUgZ2VuZXJhdGVkIGNvZGUgaXM6XG4gICAqXG4gICAqIGBgYFxuICAgKiB2YXIgX2MxID0gWydtb28nLCAnY2FyJywgQXR0cmlidXRlTWFya2VyLkkxOG4sICdmb28nLCAnYmFyJ107XG4gICAqL1xuICBJMThuID0gNixcbn1cbiJdfQ==