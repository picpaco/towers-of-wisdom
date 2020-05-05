/**
 * @fileoverview added by tsickle
 * Generated from: packages/core/src/core.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point from which you should import all public core APIs.
 */
export { Attribute, ANALYZE_FOR_ENTRY_COMPONENTS, ContentChild, ContentChildren, Query, ViewChild, ViewChildren, Component, Directive, HostBinding, HostListener, Input, Output, Pipe, NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ViewEncapsulation } from './metadata';
export { Version, VERSION } from './version';
export { InjectFlags, ɵɵdefineInjectable, defineInjectable, ɵɵdefineInjector, forwardRef, resolveForwardRef, Injectable, Injector, ɵɵinject, inject, INJECTOR, ɵɵinvalidFactoryDep, ReflectiveInjector, ResolvedReflectiveFactory, ReflectiveKey, InjectionToken, Inject, Optional, Self, SkipSelf, Host } from './di';
export { createPlatform, assertPlatform, destroyPlatform, getPlatform, PlatformRef, ApplicationRef, createPlatformFactory, NgProbeToken } from './application_ref';
export { enableProdMode, isDevMode } from './util/is_dev_mode';
export { APP_ID, PACKAGE_ROOT_URL, PLATFORM_INITIALIZER, PLATFORM_ID, APP_BOOTSTRAP_LISTENER } from './application_tokens';
export { APP_INITIALIZER, ApplicationInitStatus } from './application_init';
export { NgZone, ɵNoopNgZone } from './zone';
export { Renderer2, RendererFactory2, RendererStyleFlags2 } from './render';
export { Compiler, COMPILER_OPTIONS, CompilerFactory, ModuleWithComponentFactories, ComponentFactory, ComponentRef, ComponentFactoryResolver, ElementRef, NgModuleFactory, NgModuleRef, getModuleFactory, NgModuleFactoryLoader, QueryList, SystemJsNgModuleLoader, SystemJsNgModuleLoaderConfig, TemplateRef, ViewContainerRef, EmbeddedViewRef, ViewRef } from './linker';
export { DebugElement, DebugEventListener, DebugNode, asNativeElements, getDebugNode } from './debug/debug_node';
export { Testability, TestabilityRegistry, setTestabilityGetter } from './testability/testability';
export { ChangeDetectionStrategy, ChangeDetectorRef, DefaultIterableDiffer, IterableDiffers, KeyValueDiffers, SimpleChange, WrappedValue } from './change_detection';
export { platformCore } from './platform_core_providers';
export { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, DEFAULT_CURRENCY_CODE, MissingTranslationStrategy } from './i18n/tokens';
export { ApplicationModule } from './application_module';
export { Type } from './interface/type';
export { EventEmitter } from './event_emitter';
export { ErrorHandler } from './error_handler';
export { ɵALLOW_MULTIPLE_PLATFORMS, ɵAPP_ID_RANDOM_PROVIDER, ɵdefaultIterableDiffers, ɵdefaultKeyValueDiffers, ɵdevModeEqual, ɵisListLikeIterable, ɵChangeDetectorStatus, ɵisDefaultChangeDetectionStrategy, ɵConsole, ɵgetDebugNodeR2, ɵsetCurrentInjector, ɵgetInjectableDef, ɵINJECTOR_SCOPE, ɵfindLocaleData, ɵgetLocaleCurrencyCode, ɵgetLocalePluralCase, ɵLocaleDataIndex, ɵregisterLocaleData, ɵunregisterLocaleData, ɵDEFAULT_LOCALE_ID, ɵivyEnabled, ɵComponentFactory, ɵCodegenComponentFactoryResolver, ɵclearResolutionOfComponentResourcesQueue, ɵresolveComponentResources, ɵReflectionCapabilities, ɵallowSanitizationBypassAndThrow, ɵgetSanitizationBypassType, ɵunwrapSafeValue, ɵ_sanitizeHtml, ɵ_sanitizeStyle, ɵ_sanitizeUrl, ɵlooseIdentical, ɵmakeDecorator, ɵglobal, ɵisObservable, ɵisPromise, ɵstringify, ɵclearOverrides, ɵinitServicesIfNeeded, ɵoverrideComponentView, ɵoverrideProvider, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from './core_private_export';
export { ɵcompileNgModuleFactory__POST_R3__, ɵisBoundToModule__POST_R3__, ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__, ɵgetDebugNode__POST_R3__, ɵSWITCH_COMPILE_INJECTABLE__POST_R3__, ɵINJECTOR_IMPL__POST_R3__, ɵNG_INJ_DEF, ɵNG_PROV_DEF, ɵcreateInjector, ɵSWITCH_IVY_ENABLED__POST_R3__, ɵCompiler_compileModuleAndAllComponentsAsync__POST_R3__, ɵCompiler_compileModuleAndAllComponentsSync__POST_R3__, ɵCompiler_compileModuleAsync__POST_R3__, ɵCompiler_compileModuleSync__POST_R3__, ɵSWITCH_ELEMENT_REF_FACTORY__POST_R3__, ɵgetModuleFactory__POST_R3__, ɵregisterNgModuleType, ɵSWITCH_TEMPLATE_REF_FACTORY__POST_R3__, ɵSWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__, ɵSWITCH_COMPILE_COMPONENT__POST_R3__, ɵSWITCH_COMPILE_DIRECTIVE__POST_R3__, ɵSWITCH_COMPILE_PIPE__POST_R3__, ɵSWITCH_COMPILE_NGMODULE__POST_R3__, ɵSWITCH_RENDERER2_FACTORY__POST_R3__, ɵgetLContext, ɵNG_COMP_DEF, ɵNG_DIR_DEF, ɵNG_ELEMENT_ID, ɵNG_MOD_DEF, ɵNG_PIPE_DEF, ɵRender3ComponentFactory, ɵRender3ComponentRef, ɵdetectChanges, ɵgetDirectives, ɵgetHostElement, ɵLifecycleHooksFeature, ɵmarkDirty, ɵNgModuleFactory, ɵRender3NgModuleRef, ɵNO_CHANGE, ɵrenderComponent, ɵsetClassMetadata, ɵsetLocaleId, ɵstore, ɵwhenRendered, ɵɵadvance, ɵɵattribute, ɵɵattributeInterpolate1, ɵɵattributeInterpolate2, ɵɵattributeInterpolate3, ɵɵattributeInterpolate4, ɵɵattributeInterpolate5, ɵɵattributeInterpolate6, ɵɵattributeInterpolate7, ɵɵattributeInterpolate8, ɵɵattributeInterpolateV, ɵɵclassMap, ɵɵclassMapInterpolate1, ɵɵclassMapInterpolate2, ɵɵclassMapInterpolate3, ɵɵclassMapInterpolate4, ɵɵclassMapInterpolate5, ɵɵclassMapInterpolate6, ɵɵclassMapInterpolate7, ɵɵclassMapInterpolate8, ɵɵclassMapInterpolateV, ɵɵclassProp, ɵɵcomponentHostSyntheticListener, ɵɵcontainer, ɵɵcontainerRefreshEnd, ɵɵcontainerRefreshStart, ɵɵcontentQuery, ɵɵCopyDefinitionFeature, ɵɵdefineComponent, ɵɵdefineDirective, ɵɵdefineNgModule, ɵɵdefinePipe, ɵɵdirectiveInject, ɵɵdisableBindings, ɵɵelement, ɵɵelementContainer, ɵɵelementContainerEnd, ɵɵelementContainerStart, ɵɵelementEnd, ɵɵelementStart, ɵɵembeddedViewEnd, ɵɵembeddedViewStart, ɵɵenableBindings, ɵɵgetCurrentView, ɵɵgetFactoryOf, ɵɵgetInheritedFactory, ɵɵhostProperty, ɵɵi18n, ɵɵi18nApply, ɵɵi18nAttributes, ɵɵi18nEnd, ɵɵi18nExp, ɵɵi18nPostprocess, ɵɵi18nStart, ɵɵInheritDefinitionFeature, ɵɵinjectAttribute, ɵɵinjectPipeChangeDetectorRef, ɵɵinvalidFactory, ɵɵlistener, ɵɵloadQuery, ɵɵnamespaceHTML, ɵɵnamespaceMathML, ɵɵnamespaceSVG, ɵɵnextContext, ɵɵNgOnChangesFeature, ɵɵpipe, ɵɵpipeBind1, ɵɵpipeBind2, ɵɵpipeBind3, ɵɵpipeBind4, ɵɵpipeBindV, ɵɵprojection, ɵɵprojectionDef, ɵɵproperty, ɵɵpropertyInterpolate, ɵɵpropertyInterpolate1, ɵɵpropertyInterpolate2, ɵɵpropertyInterpolate3, ɵɵpropertyInterpolate4, ɵɵpropertyInterpolate5, ɵɵpropertyInterpolate6, ɵɵpropertyInterpolate7, ɵɵpropertyInterpolate8, ɵɵpropertyInterpolateV, ɵɵProvidersFeature, ɵɵpureFunction0, ɵɵpureFunction1, ɵɵpureFunction2, ɵɵpureFunction3, ɵɵpureFunction4, ɵɵpureFunction5, ɵɵpureFunction6, ɵɵpureFunction7, ɵɵpureFunction8, ɵɵpureFunctionV, ɵɵqueryRefresh, ɵɵreference, ɵɵresolveBody, ɵɵresolveDocument, ɵɵresolveWindow, ɵɵrestoreView, ɵɵselect, ɵɵsetComponentScope, ɵɵsetNgModuleScope, ɵɵstaticContentQuery, ɵɵstaticViewQuery, ɵɵstyleMap, ɵɵstyleMapInterpolate1, ɵɵstyleMapInterpolate2, ɵɵstyleMapInterpolate3, ɵɵstyleMapInterpolate4, ɵɵstyleMapInterpolate5, ɵɵstyleMapInterpolate6, ɵɵstyleMapInterpolate7, ɵɵstyleMapInterpolate8, ɵɵstyleMapInterpolateV, ɵɵstyleProp, ɵɵstylePropInterpolate1, ɵɵstylePropInterpolate2, ɵɵstylePropInterpolate3, ɵɵstylePropInterpolate4, ɵɵstylePropInterpolate5, ɵɵstylePropInterpolate6, ɵɵstylePropInterpolate7, ɵɵstylePropInterpolate8, ɵɵstylePropInterpolateV, ɵɵstyleSanitizer, ɵɵtemplate, ɵɵtemplateRefExtractor, ɵɵtext, ɵɵtextInterpolate, ɵɵtextInterpolate1, ɵɵtextInterpolate2, ɵɵtextInterpolate3, ɵɵtextInterpolate4, ɵɵtextInterpolate5, ɵɵtextInterpolate6, ɵɵtextInterpolate7, ɵɵtextInterpolate8, ɵɵtextInterpolateV, ɵɵupdateSyntheticHostBinding, ɵɵviewQuery, ɵsetDocument, ɵcompileComponent, ɵcompileDirective, ɵresetJitOptions, ɵcompileNgModule, ɵcompileNgModuleDefs, ɵflushModuleScopingQueueAsMuchAsPossible, ɵpatchComponentDefWithScope, ɵresetCompiledComponents, ɵtransitiveScopesFor, ɵcompilePipe, ɵpublishDefaultGlobalUtils, ɵpublishGlobalUtil, ɵbypassSanitizationTrustHtml, ɵbypassSanitizationTrustResourceUrl, ɵbypassSanitizationTrustScript, ɵbypassSanitizationTrustStyle, ɵbypassSanitizationTrustUrl, ɵɵdefaultStyleSanitizer, ɵɵsanitizeHtml, ɵɵsanitizeResourceUrl, ɵɵsanitizeScript, ɵɵsanitizeStyle, ɵɵsanitizeUrl, ɵɵsanitizeUrlOrResourceUrl } from './core_render3_private_export';
export { SecurityContext } from './sanitization/security';
export { Sanitizer } from './sanitization/sanitizer';
export { ɵregisterModuleFactory, ɵand, ɵccf, ɵcmf, ɵcrt, ɵdid, ɵeld, ɵEMPTY_ARRAY, ɵEMPTY_MAP, ɵgetComponentViewDefinitionFactory, ɵinlineInterpolate, ɵinterpolate, ɵmod, ɵmpd, ɵncd, ɵnov, ɵpid, ɵprd, ɵpad, ɵpod, ɵppd, ɵqud, ɵted, ɵunv, ɵvid } from './codegen_private_exports';
import { global } from './util/global';
if (ngDevMode) {
    // This helper is to give a reasonable error message to people upgrading to v9 that have not yet
    // installed `@angular/localize` in their app.
    // tslint:disable-next-line: no-toplevel-property-access
    global.$localize = global.$localize || (/**
     * @return {?}
     */
    function () {
        throw new Error('It looks like your application or one of its dependencies is using i18n.\n' +
            'Angular 9 introduced a global `$localize()` function that needs to be loaded.\n' +
            'Please run `ng add @angular/localize` from the Angular CLI.\n' +
            '(For non-CLI projects, add `import \'@angular/localize/init\';` to your `polyfills.ts` file.\n' +
            'For server-side rendering applications add the import to your `main.server.ts` file.)');
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxvUUFBYyxZQUFZLENBQUM7QUFDM0IsaUNBQWMsV0FBVyxDQUFDO0FBRTFCLGdUQUFjLE1BQU0sQ0FBQztBQUNyQixPQUFPLEVBQUMsY0FBYyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUsWUFBWSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakssT0FBTyxFQUFDLGNBQWMsRUFBRSxTQUFTLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RCxPQUFPLEVBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQixFQUFFLFdBQVcsRUFBRSxzQkFBc0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3pILE9BQU8sRUFBQyxlQUFlLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUMxRSxvQ0FBYyxRQUFRLENBQUM7QUFDdkIsaUVBQWMsVUFBVSxDQUFDO0FBQ3pCLGlXQUFjLFVBQVUsQ0FBQztBQUN6QixPQUFPLEVBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUMxSCxPQUFPLEVBQWlCLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2pILGdKQUFjLG9CQUFvQixDQUFDO0FBQ25DLDZCQUFjLDJCQUEyQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLHFCQUFxQixFQUFFLDBCQUEwQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlILE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBZSxJQUFJLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLHM2QkFBYyx1QkFBdUIsQ0FBQztBQUN0Qyx3OUlBQWMsK0JBQStCLENBQUM7QUFDOUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCx5UEFBYywyQkFBMkIsQ0FBQztBQUUxQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLElBQUksU0FBUyxFQUFFO0lBQ2IsZ0dBQWdHO0lBQ2hHLDhDQUE4QztJQUM5Qyx3REFBd0Q7SUFDeEQsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUzs7O0lBQUk7UUFDckMsTUFBTSxJQUFJLEtBQUssQ0FDWCw0RUFBNEU7WUFDNUUsaUZBQWlGO1lBQ2pGLCtEQUErRDtZQUMvRCxnR0FBZ0c7WUFDaEcsdUZBQXVGLENBQUMsQ0FBQztJQUMvRixDQUFDLENBQUEsQ0FBQztDQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIEBtb2R1bGVcbiAqIEBkZXNjcmlwdGlvblxuICogRW50cnkgcG9pbnQgZnJvbSB3aGljaCB5b3Ugc2hvdWxkIGltcG9ydCBhbGwgcHVibGljIGNvcmUgQVBJcy5cbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9tZXRhZGF0YSc7XG5leHBvcnQgKiBmcm9tICcuL3ZlcnNpb24nO1xuZXhwb3J0IHtUeXBlRGVjb3JhdG9yfSBmcm9tICcuL3V0aWwvZGVjb3JhdG9ycyc7XG5leHBvcnQgKiBmcm9tICcuL2RpJztcbmV4cG9ydCB7Y3JlYXRlUGxhdGZvcm0sIGFzc2VydFBsYXRmb3JtLCBkZXN0cm95UGxhdGZvcm0sIGdldFBsYXRmb3JtLCBQbGF0Zm9ybVJlZiwgQXBwbGljYXRpb25SZWYsIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgTmdQcm9iZVRva2VufSBmcm9tICcuL2FwcGxpY2F0aW9uX3JlZic7XG5leHBvcnQge2VuYWJsZVByb2RNb2RlLCBpc0Rldk1vZGV9IGZyb20gJy4vdXRpbC9pc19kZXZfbW9kZSc7XG5leHBvcnQge0FQUF9JRCwgUEFDS0FHRV9ST09UX1VSTCwgUExBVEZPUk1fSU5JVElBTElaRVIsIFBMQVRGT1JNX0lELCBBUFBfQk9PVFNUUkFQX0xJU1RFTkVSfSBmcm9tICcuL2FwcGxpY2F0aW9uX3Rva2Vucyc7XG5leHBvcnQge0FQUF9JTklUSUFMSVpFUiwgQXBwbGljYXRpb25Jbml0U3RhdHVzfSBmcm9tICcuL2FwcGxpY2F0aW9uX2luaXQnO1xuZXhwb3J0ICogZnJvbSAnLi96b25lJztcbmV4cG9ydCAqIGZyb20gJy4vcmVuZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vbGlua2VyJztcbmV4cG9ydCB7RGVidWdFbGVtZW50LCBEZWJ1Z0V2ZW50TGlzdGVuZXIsIERlYnVnTm9kZSwgYXNOYXRpdmVFbGVtZW50cywgZ2V0RGVidWdOb2RlLCBQcmVkaWNhdGV9IGZyb20gJy4vZGVidWcvZGVidWdfbm9kZSc7XG5leHBvcnQge0dldFRlc3RhYmlsaXR5LCBUZXN0YWJpbGl0eSwgVGVzdGFiaWxpdHlSZWdpc3RyeSwgc2V0VGVzdGFiaWxpdHlHZXR0ZXJ9IGZyb20gJy4vdGVzdGFiaWxpdHkvdGVzdGFiaWxpdHknO1xuZXhwb3J0ICogZnJvbSAnLi9jaGFuZ2VfZGV0ZWN0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vcGxhdGZvcm1fY29yZV9wcm92aWRlcnMnO1xuZXhwb3J0IHtUUkFOU0xBVElPTlMsIFRSQU5TTEFUSU9OU19GT1JNQVQsIExPQ0FMRV9JRCwgREVGQVVMVF9DVVJSRU5DWV9DT0RFLCBNaXNzaW5nVHJhbnNsYXRpb25TdHJhdGVneX0gZnJvbSAnLi9pMThuL3Rva2Vucyc7XG5leHBvcnQge0FwcGxpY2F0aW9uTW9kdWxlfSBmcm9tICcuL2FwcGxpY2F0aW9uX21vZHVsZSc7XG5leHBvcnQge0Fic3RyYWN0VHlwZSwgVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2UvdHlwZSc7XG5leHBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnLi9ldmVudF9lbWl0dGVyJztcbmV4cG9ydCB7RXJyb3JIYW5kbGVyfSBmcm9tICcuL2Vycm9yX2hhbmRsZXInO1xuZXhwb3J0ICogZnJvbSAnLi9jb3JlX3ByaXZhdGVfZXhwb3J0JztcbmV4cG9ydCAqIGZyb20gJy4vY29yZV9yZW5kZXIzX3ByaXZhdGVfZXhwb3J0JztcbmV4cG9ydCB7U2VjdXJpdHlDb250ZXh0fSBmcm9tICcuL3Nhbml0aXphdGlvbi9zZWN1cml0eSc7XG5leHBvcnQge1Nhbml0aXplcn0gZnJvbSAnLi9zYW5pdGl6YXRpb24vc2FuaXRpemVyJztcbmV4cG9ydCAqIGZyb20gJy4vY29kZWdlbl9wcml2YXRlX2V4cG9ydHMnO1xuXG5pbXBvcnQge2dsb2JhbH0gZnJvbSAnLi91dGlsL2dsb2JhbCc7XG5pZiAobmdEZXZNb2RlKSB7XG4gIC8vIFRoaXMgaGVscGVyIGlzIHRvIGdpdmUgYSByZWFzb25hYmxlIGVycm9yIG1lc3NhZ2UgdG8gcGVvcGxlIHVwZ3JhZGluZyB0byB2OSB0aGF0IGhhdmUgbm90IHlldFxuICAvLyBpbnN0YWxsZWQgYEBhbmd1bGFyL2xvY2FsaXplYCBpbiB0aGVpciBhcHAuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdG9wbGV2ZWwtcHJvcGVydHktYWNjZXNzXG4gIGdsb2JhbC4kbG9jYWxpemUgPSBnbG9iYWwuJGxvY2FsaXplIHx8IGZ1bmN0aW9uKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0l0IGxvb2tzIGxpa2UgeW91ciBhcHBsaWNhdGlvbiBvciBvbmUgb2YgaXRzIGRlcGVuZGVuY2llcyBpcyB1c2luZyBpMThuLlxcbicgK1xuICAgICAgICAnQW5ndWxhciA5IGludHJvZHVjZWQgYSBnbG9iYWwgYCRsb2NhbGl6ZSgpYCBmdW5jdGlvbiB0aGF0IG5lZWRzIHRvIGJlIGxvYWRlZC5cXG4nICtcbiAgICAgICAgJ1BsZWFzZSBydW4gYG5nIGFkZCBAYW5ndWxhci9sb2NhbGl6ZWAgZnJvbSB0aGUgQW5ndWxhciBDTEkuXFxuJyArXG4gICAgICAgICcoRm9yIG5vbi1DTEkgcHJvamVjdHMsIGFkZCBgaW1wb3J0IFxcJ0Bhbmd1bGFyL2xvY2FsaXplL2luaXRcXCc7YCB0byB5b3VyIGBwb2x5ZmlsbHMudHNgIGZpbGUuXFxuJyArXG4gICAgICAgICdGb3Igc2VydmVyLXNpZGUgcmVuZGVyaW5nIGFwcGxpY2F0aW9ucyBhZGQgdGhlIGltcG9ydCB0byB5b3VyIGBtYWluLnNlcnZlci50c2AgZmlsZS4pJyk7XG4gIH07XG59XG4iXX0=