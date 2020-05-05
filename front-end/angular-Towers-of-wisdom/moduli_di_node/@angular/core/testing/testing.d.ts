/**
 * @license Angular v9.1.4
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */

import { AbstractType } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Compiler } from '@angular/core';
import { CompilerOptions } from '@angular/core';
import { Component } from '@angular/core';
import { ComponentFactory } from '@angular/core';
import { ComponentRef } from '@angular/core';
import { DebugElement } from '@angular/core';
import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { InjectFlags } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { Injector } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgZone } from '@angular/core';
import { Pipe } from '@angular/core';
import { PlatformRef } from '@angular/core';
import { SchemaMetadata } from '@angular/core';
import { Type } from '@angular/core';


import * as ɵngcc0 from '@angular/core';
export declare const __core_private_testing_placeholder__ = "";


/**
 * Wraps a test function in an asynchronous test zone. The test will automatically
 * complete when all asynchronous calls within this zone are done. Can be used
 * to wrap an {@link inject} call.
 *
 * Example:
 *
 * ```
 * it('...', async(inject([AClass], (object) => {
 *   object.doSomething.then(() => {
 *     expect(...);
 *   })
 * });
 * ```
 *
 * @publicApi
 */
export declare function async(fn: Function): (done: any) => any;

/**
 * Fixture for debugging and testing a component.
 *
 * @publicApi
 */
export declare class ComponentFixture<T> {
    componentRef: ComponentRef<T>;
    ngZone: NgZone | null;
    private _autoDetect;
    /**
     * The DebugElement associated with the root element of this component.
     */
    debugElement: DebugElement;
    /**
     * The instance of the root component class.
     */
    componentInstance: T;
    /**
     * The native element at the root of the component.
     */
    nativeElement: any;
    /**
     * The ElementRef for the element at the root of the component.
     */
    elementRef: ElementRef;
    /**
     * The ChangeDetectorRef for the component
     */
    changeDetectorRef: ChangeDetectorRef;
    private _renderer;
    private _isStable;
    private _isDestroyed;
    private _resolve;
    private _promise;
    private _onUnstableSubscription;
    private _onStableSubscription;
    private _onMicrotaskEmptySubscription;
    private _onErrorSubscription;
    constructor(componentRef: ComponentRef<T>, ngZone: NgZone | null, _autoDetect: boolean);
    private _tick;
    /**
     * Trigger a change detection cycle for the component.
     */
    detectChanges(checkNoChanges?: boolean): void;
    /**
     * Do a change detection run to make sure there were no changes.
     */
    checkNoChanges(): void;
    /**
     * Set whether the fixture should autodetect changes.
     *
     * Also runs detectChanges once so that any existing change is detected.
     */
    autoDetectChanges(autoDetect?: boolean): void;
    /**
     * Return whether the fixture is currently stable or has async tasks that have not been completed
     * yet.
     */
    isStable(): boolean;
    /**
     * Get a promise that resolves when the fixture is stable.
     *
     * This can be used to resume testing after events have triggered asynchronous activity or
     * asynchronous change detection.
     */
    whenStable(): Promise<any>;
    private _getRenderer;
    /**
     * Get a promise that resolves when the ui state is stable following animations.
     */
    whenRenderingDone(): Promise<any>;
    /**
     * Trigger component destruction.
     */
    destroy(): void;
}

/**
 * @publicApi
 */
export declare const ComponentFixtureAutoDetect: InjectionToken<boolean[]>;

/**
 * @publicApi
 */
export declare const ComponentFixtureNoNgZone: InjectionToken<boolean[]>;

/**
 * Discard all remaining periodic tasks.
 *
 * @publicApi
 */
export declare function discardPeriodicTasks(): void;

/**
 * Wraps a function to be executed in the fakeAsync zone:
 * - microtasks are manually executed by calling `flushMicrotasks()`,
 * - timers are synchronous, `tick()` simulates the asynchronous passage of time.
 *
 * If there are any pending timers at the end of the function, an exception will be thrown.
 *
 * Can be used to wrap inject() calls.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/testing/ts/fake_async.ts region='basic'}
 *
 * @param fn
 * @returns The function wrapped to be executed in the fakeAsync zone
 *
 * @publicApi
 */
export declare function fakeAsync(fn: Function): (...args: any[]) => any;

/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone by
 * draining the macrotask queue until it is empty. The returned value is the milliseconds
 * of time that would have been elapsed.
 *
 * @param maxTurns
 * @returns The simulated time elapsed, in millis.
 *
 * @publicApi
 */
export declare function flush(maxTurns?: number): number;

/**
 * Flush any pending microtasks.
 *
 * @publicApi
 */
export declare function flushMicrotasks(): void;

/**
 * Returns a singleton of the applicable `TestBed`.
 *
 * It will be either an instance of `TestBedViewEngine` or `TestBedRender3`.
 *
 * @publicApi
 */
export declare const getTestBed: () => TestBed;

/**
 * Allows injecting dependencies in `beforeEach()` and `it()`.
 *
 * Example:
 *
 * ```
 * beforeEach(inject([Dependency, AClass], (dep, object) => {
 *   // some code that uses `dep` and `object`
 *   // ...
 * }));
 *
 * it('...', inject([AClass], (object) => {
 *   object.doSomething();
 *   expect(...);
 * })
 * ```
 *
 * Notes:
 * - inject is currently a function because of some Traceur limitation the syntax should
 * eventually
 *   becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
 *
 * @publicApi
 */
export declare function inject(tokens: any[], fn: Function): () => any;

/**
 * @publicApi
 */
export declare class InjectSetupWrapper {
    private _moduleDef;
    constructor(_moduleDef: () => TestModuleMetadata);
    private _addModule;
    inject(tokens: any[], fn: Function): () => any;
}


/**
 * Type used for modifications to metadata
 *
 * @publicApi
 */
export declare type MetadataOverride<T> = {
    add?: Partial<T>;
    remove?: Partial<T>;
    set?: Partial<T>;
};

/**
 * Clears out the shared fake async zone for a test.
 * To be called in a global `beforeEach`.
 *
 * @publicApi
 */
export declare function resetFakeAsyncZone(): void;

/**
 * @publicApi
 */
export declare interface TestBed {
    platform: PlatformRef;
    ngModule: Type<any> | Type<any>[];
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     */
    initTestEnvironment(ngModule: Type<any> | Type<any>[], platform: PlatformRef, aotSummaries?: () => any[]): void;
    /**
     * Reset the providers for the test injector.
     */
    resetTestEnvironment(): void;
    resetTestingModule(): void;
    configureCompiler(config: {
        providers?: any[];
        useJit?: boolean;
    }): void;
    configureTestingModule(moduleDef: TestModuleMetadata): void;
    compileComponents(): Promise<any>;
    inject<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue?: T, flags?: InjectFlags): T;
    inject<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue: null, flags?: InjectFlags): T | null;
    /** @deprecated from v9.0.0 use TestBed.inject */
    get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): any;
    /** @deprecated from v9.0.0 use TestBed.inject */
    get(token: any, notFoundValue?: any): any;
    execute(tokens: any[], fn: Function, context?: any): any;
    overrideModule(ngModule: Type<any>, override: MetadataOverride<NgModule>): void;
    overrideComponent(component: Type<any>, override: MetadataOverride<Component>): void;
    overrideDirective(directive: Type<any>, override: MetadataOverride<Directive>): void;
    overridePipe(pipe: Type<any>, override: MetadataOverride<Pipe>): void;
    /**
     * Overwrites all providers for the given token with the given provider definition.
     */
    overrideProvider(token: any, provider: {
        useFactory: Function;
        deps: any[];
    }): void;
    overrideProvider(token: any, provider: {
        useValue: any;
    }): void;
    overrideProvider(token: any, provider: {
        useFactory?: Function;
        useValue?: any;
        deps?: any[];
    }): void;
    overrideTemplateUsingTestingModule(component: Type<any>, template: string): void;
    createComponent<T>(component: Type<T>): ComponentFixture<T>;
}

/**
 * @description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * `TestBed` is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 *
 * @publicApi
 */
export declare const TestBed: TestBedStatic;

/**
 * Static methods implemented by the `TestBedViewEngine` and `TestBedRender3`
 *
 * @publicApi
 */
export declare interface TestBedStatic {
    new (...args: any[]): TestBed;
    initTestEnvironment(ngModule: Type<any> | Type<any>[], platform: PlatformRef, aotSummaries?: () => any[]): TestBed;
    /**
     * Reset the providers for the test injector.
     */
    resetTestEnvironment(): void;
    resetTestingModule(): TestBedStatic;
    /**
     * Allows overriding default compiler providers and settings
     * which are defined in test_injector.js
     */
    configureCompiler(config: {
        providers?: any[];
        useJit?: boolean;
    }): TestBedStatic;
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     */
    configureTestingModule(moduleDef: TestModuleMetadata): TestBedStatic;
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     */
    compileComponents(): Promise<any>;
    overrideModule(ngModule: Type<any>, override: MetadataOverride<NgModule>): TestBedStatic;
    overrideComponent(component: Type<any>, override: MetadataOverride<Component>): TestBedStatic;
    overrideDirective(directive: Type<any>, override: MetadataOverride<Directive>): TestBedStatic;
    overridePipe(pipe: Type<any>, override: MetadataOverride<Pipe>): TestBedStatic;
    overrideTemplate(component: Type<any>, template: string): TestBedStatic;
    /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     */
    overrideTemplateUsingTestingModule(component: Type<any>, template: string): TestBedStatic;
    /**
     * Overwrites all providers for the given token with the given provider definition.
     *
     * Note: This works for JIT and AOTed components as well.
     */
    overrideProvider(token: any, provider: {
        useFactory: Function;
        deps: any[];
    }): TestBedStatic;
    overrideProvider(token: any, provider: {
        useValue: any;
    }): TestBedStatic;
    overrideProvider(token: any, provider: {
        useFactory?: Function;
        useValue?: any;
        deps?: any[];
    }): TestBedStatic;
    inject<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue?: T, flags?: InjectFlags): T;
    inject<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue: null, flags?: InjectFlags): T | null;
    /** @deprecated from v9.0.0 use TestBed.inject */
    get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): any;
    /** @deprecated from v9.0.0 use TestBed.inject */
    get(token: any, notFoundValue?: any): any;
    createComponent<T>(component: Type<T>): ComponentFixture<T>;
}

/**
 * An abstract class for inserting the root test component element in a platform independent way.
 *
 * @publicApi
 */
export declare class TestComponentRenderer {
    insertRootElement(rootElementId: string): void;
}

/**
 * @publicApi
 */
export declare type TestModuleMetadata = {
    providers?: any[];
    declarations?: any[];
    imports?: any[];
    schemas?: Array<SchemaMetadata | any[]>;
    aotSummaries?: () => any[];
};

/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone.
 *
 * The microtasks queue is drained at the very start of this function and after any timer callback
 * has been executed.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/testing/ts/fake_async.ts region='basic'}
 *
 * @param millis, the number of millisecond to advance the virtual timer
 * @param tickOptions, the options of tick with a flag called
 * processNewMacroTasksSynchronously, whether to invoke the new macroTasks, by default is
 * false, means the new macroTasks will be invoked
 *
 * For example,
 *
 * it ('test with nested setTimeout', fakeAsync(() => {
 *   let nestedTimeoutInvoked = false;
 *   function funcWithNestedTimeout() {
 *     setTimeout(() => {
 *       nestedTimeoutInvoked = true;
 *     });
 *   };
 *   setTimeout(funcWithNestedTimeout);
 *   tick();
 *   expect(nestedTimeoutInvoked).toBe(true);
 * }));
 *
 * in this case, we have a nested timeout (new macroTask), when we tick, both the
 * funcWithNestedTimeout and the nested timeout both will be invoked.
 *
 * it ('test with nested setTimeout', fakeAsync(() => {
 *   let nestedTimeoutInvoked = false;
 *   function funcWithNestedTimeout() {
 *     setTimeout(() => {
 *       nestedTimeoutInvoked = true;
 *     });
 *   };
 *   setTimeout(funcWithNestedTimeout);
 *   tick(0, {processNewMacroTasksSynchronously: false});
 *   expect(nestedTimeoutInvoked).toBe(false);
 * }));
 *
 * if we pass the tickOptions with processNewMacroTasksSynchronously to be false, the nested timeout
 * will not be invoked.
 *
 *
 * @publicApi
 */
export declare function tick(millis?: number, tickOptions?: {
    processNewMacroTasksSynchronously: boolean;
}): void;

/**
 * @publicApi
 */
export declare function withModule(moduleDef: TestModuleMetadata): InjectSetupWrapper;

export declare function withModule(moduleDef: TestModuleMetadata, fn: Function): () => any;

/**
 * @description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * `TestBed` is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 */
export declare class ɵangular_packages_core_testing_testing_a implements TestBed {
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     */
    static initTestEnvironment(ngModule: Type<any> | Type<any>[], platform: PlatformRef, aotSummaries?: () => any[]): ɵangular_packages_core_testing_testing_a;
    /**
     * Reset the providers for the test injector.
     */
    static resetTestEnvironment(): void;
    static resetTestingModule(): TestBedStatic;
    /**
     * Allows overriding default compiler providers and settings
     * which are defined in test_injector.js
     */
    static configureCompiler(config: {
        providers?: any[];
        useJit?: boolean;
    }): TestBedStatic;
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     */
    static configureTestingModule(moduleDef: TestModuleMetadata): TestBedStatic;
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     */
    static compileComponents(): Promise<any>;
    static overrideModule(ngModule: Type<any>, override: MetadataOverride<NgModule>): TestBedStatic;
    static overrideComponent(component: Type<any>, override: MetadataOverride<Component>): TestBedStatic;
    static overrideDirective(directive: Type<any>, override: MetadataOverride<Directive>): TestBedStatic;
    static overridePipe(pipe: Type<any>, override: MetadataOverride<Pipe>): TestBedStatic;
    static overrideTemplate(component: Type<any>, template: string): TestBedStatic;
    /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     */
    static overrideTemplateUsingTestingModule(component: Type<any>, template: string): TestBedStatic;
    /**
     * Overwrites all providers for the given token with the given provider definition.
     *
     * Note: This works for JIT and AOTed components as well.
     */
    static overrideProvider(token: any, provider: {
        useFactory: Function;
        deps: any[];
    }): TestBedStatic;
    static overrideProvider(token: any, provider: {
        useValue: any;
    }): TestBedStatic;
    static inject<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue?: T, flags?: InjectFlags): T;
    static inject<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue: null, flags?: InjectFlags): T | null;
    /** @deprecated from v9.0.0 use TestBed.inject */
    static get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): any;
    /**
     * @deprecated from v9.0.0 use TestBed.inject
     * @suppress {duplicate}
     */
    static get(token: any, notFoundValue?: any): any;
    static createComponent<T>(component: Type<T>): ComponentFixture<T>;
    private _instantiated;
    private _compiler;
    private _moduleRef;
    private _moduleFactory;
    private _compilerOptions;
    private _moduleOverrides;
    private _componentOverrides;
    private _directiveOverrides;
    private _pipeOverrides;
    private _providers;
    private _declarations;
    private _imports;
    private _schemas;
    private _activeFixtures;
    private _testEnvAotSummaries;
    private _aotSummaries;
    private _templateOverrides;
    private _isRoot;
    private _rootProviderOverrides;
    platform: PlatformRef;
    ngModule: Type<any> | Type<any>[];
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     */
    initTestEnvironment(ngModule: Type<any> | Type<any>[], platform: PlatformRef, aotSummaries?: () => any[]): void;
    /**
     * Reset the providers for the test injector.
     */
    resetTestEnvironment(): void;
    resetTestingModule(): void;
    configureCompiler(config: {
        providers?: any[];
        useJit?: boolean;
    }): void;
    configureTestingModule(moduleDef: TestModuleMetadata): void;
    compileComponents(): Promise<any>;
    private _initIfNeeded;
    private _createCompilerAndModule;
    private _assertNotInstantiated;
    inject<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue?: T, flags?: InjectFlags): T;
    inject<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue: null, flags?: InjectFlags): T | null;
    /** @deprecated from v9.0.0 use TestBed.inject */
    get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): any;
    /** @deprecated from v9.0.0 use TestBed.inject */
    get(token: any, notFoundValue?: any): any;
    execute(tokens: any[], fn: Function, context?: any): any;
    overrideModule(ngModule: Type<any>, override: MetadataOverride<NgModule>): void;
    overrideComponent(component: Type<any>, override: MetadataOverride<Component>): void;
    overrideDirective(directive: Type<any>, override: MetadataOverride<Directive>): void;
    overridePipe(pipe: Type<any>, override: MetadataOverride<Pipe>): void;
    /**
     * Overwrites all providers for the given token with the given provider definition.
     */
    overrideProvider(token: any, provider: {
        useFactory: Function;
        deps: any[];
    }): void;
    overrideProvider(token: any, provider: {
        useValue: any;
    }): void;
    private overrideProviderImpl;
    overrideTemplateUsingTestingModule(component: Type<any>, template: string): void;
    createComponent<T>(component: Type<T>): ComponentFixture<T>;
}

/**
 * @description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * TestBed is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 */
export declare class ɵangular_packages_core_testing_testing_b implements TestBed {
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     *
     * @publicApi
     */
    static initTestEnvironment(ngModule: Type<any> | Type<any>[], platform: PlatformRef, aotSummaries?: () => any[]): TestBed;
    /**
     * Reset the providers for the test injector.
     *
     * @publicApi
     */
    static resetTestEnvironment(): void;
    static configureCompiler(config: {
        providers?: any[];
        useJit?: boolean;
    }): TestBedStatic;
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     */
    static configureTestingModule(moduleDef: TestModuleMetadata): TestBedStatic;
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     */
    static compileComponents(): Promise<any>;
    static overrideModule(ngModule: Type<any>, override: MetadataOverride<NgModule>): TestBedStatic;
    static overrideComponent(component: Type<any>, override: MetadataOverride<Component>): TestBedStatic;
    static overrideDirective(directive: Type<any>, override: MetadataOverride<Directive>): TestBedStatic;
    static overridePipe(pipe: Type<any>, override: MetadataOverride<Pipe>): TestBedStatic;
    static overrideTemplate(component: Type<any>, template: string): TestBedStatic;
    /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     */
    static overrideTemplateUsingTestingModule(component: Type<any>, template: string): TestBedStatic;
    static overrideProvider(token: any, provider: {
        useFactory: Function;
        deps: any[];
    }): TestBedStatic;
    static overrideProvider(token: any, provider: {
        useValue: any;
    }): TestBedStatic;
    static inject<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue?: T, flags?: InjectFlags): T;
    static inject<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue: null, flags?: InjectFlags): T | null;
    /** @deprecated from v9.0.0 use TestBed.inject */
    static get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): any;
    /** @deprecated from v9.0.0 use TestBed.inject */
    static get(token: any, notFoundValue?: any): any;
    static createComponent<T>(component: Type<T>): ComponentFixture<T>;
    static resetTestingModule(): TestBedStatic;
    platform: PlatformRef;
    ngModule: Type<any> | Type<any>[];
    private _compiler;
    private _testModuleRef;
    private _activeFixtures;
    private _globalCompilationChecked;
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     *
     * @publicApi
     */
    initTestEnvironment(ngModule: Type<any> | Type<any>[], platform: PlatformRef, aotSummaries?: () => any[]): void;
    /**
     * Reset the providers for the test injector.
     *
     * @publicApi
     */
    resetTestEnvironment(): void;
    resetTestingModule(): void;
    configureCompiler(config: {
        providers?: any[];
        useJit?: boolean;
    }): void;
    configureTestingModule(moduleDef: TestModuleMetadata): void;
    compileComponents(): Promise<any>;
    inject<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue?: T, flags?: InjectFlags): T;
    inject<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue: null, flags?: InjectFlags): T | null;
    /** @deprecated from v9.0.0 use TestBed.inject */
    get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): any;
    /** @deprecated from v9.0.0 use TestBed.inject */
    get(token: any, notFoundValue?: any): any;
    execute(tokens: any[], fn: Function, context?: any): any;
    overrideModule(ngModule: Type<any>, override: MetadataOverride<NgModule>): void;
    overrideComponent(component: Type<any>, override: MetadataOverride<Component>): void;
    overrideTemplateUsingTestingModule(component: Type<any>, template: string): void;
    overrideDirective(directive: Type<any>, override: MetadataOverride<Directive>): void;
    overridePipe(pipe: Type<any>, override: MetadataOverride<Pipe>): void;
    /**
     * Overwrites all providers for the given token with the given provider definition.
     */
    overrideProvider(token: any, provider: {
        useFactory?: Function;
        useValue?: any;
        deps?: any[];
    }): void;
    createComponent<T>(type: Type<T>): ComponentFixture<T>;
    private assertNotInstantiated;
    /**
     * Check whether the module scoping queue should be flushed, and flush it if needed.
     *
     * When the TestBed is reset, it clears the JIT module compilation queue, cancelling any
     * in-progress module compilation. This creates a potential hazard - the very first time the
     * TestBed is initialized (or if it's reset without being initialized), there may be pending
     * compilations of modules declared in global scope. These compilations should be finished.
     *
     * To ensure that globally declared modules have their components scoped properly, this function
     * is called whenever TestBed is initialized or reset. The _first_ time that this happens, prior
     * to any other operations, the scoping queue is flushed.
     */
    private checkGlobalCompilationFinished;
    private destroyActiveFixtures;
}

export declare function ɵangular_packages_core_testing_testing_c(): ɵangular_packages_core_testing_testing_b;

export declare class ɵMetadataOverrider {
    private _references;
    /**
     * Creates a new instance for the given metadata class
     * based on an old instance and overrides.
     */
    overrideMetadata<C extends T, T>(metadataClass: {
        new (options: T): C;
    }, oldMetadata: C, override: MetadataOverride<T>): C;
}

/**
 * Special interface to the compiler only used by testing
 *
 * @publicApi
 */
export declare class ɵTestingCompiler extends Compiler {
    get injector(): Injector;
    overrideModule(module: Type<any>, overrides: MetadataOverride<NgModule>): void;
    overrideDirective(directive: Type<any>, overrides: MetadataOverride<Directive>): void;
    overrideComponent(component: Type<any>, overrides: MetadataOverride<Component>): void;
    overridePipe(directive: Type<any>, overrides: MetadataOverride<Pipe>): void;
    /**
     * Allows to pass the compile summary from AOT compilation to the JIT compiler,
     * so that it can use the code generated by AOT.
     */
    loadAotSummaries(summaries: () => any[]): void;
    /**
     * Gets the component factory for the given component.
     * This assumes that the component has been compiled before calling this call using
     * `compileModuleAndAllComponents*`.
     */
    getComponentFactory<T>(component: Type<T>): ComponentFactory<T>;
    /**
     * Returns the component type that is stored in the given error.
     * This can be used for errors created by compileModule...
     */
    getComponentFromError(error: Error): Type<any> | null;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ɵTestingCompiler, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<ɵTestingCompiler>;
}

/**
 * A factory for creating a Compiler
 *
 * @publicApi
 */
export declare abstract class ɵTestingCompilerFactory {
    abstract createTestingCompiler(options?: CompilerOptions[]): ɵTestingCompiler;
}

export { }

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5kLnRzIiwic291cmNlcyI6WyJ0ZXN0aW5nLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlIEFuZ3VsYXIgdjkuMS40XG4gKiAoYykgMjAxMC0yMDIwIEdvb2dsZSBMTEMuIGh0dHBzOi8vYW5ndWxhci5pby9cbiAqIExpY2Vuc2U6IE1JVFxuICovXG5cbmltcG9ydCB7IEFic3RyYWN0VHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21waWxlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21waWxlck9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudEZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERlYnVnRWxlbWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJbmplY3RGbGFncyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQbGF0Zm9ybVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTY2hlbWFNZXRhZGF0YSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5cclxuZXhwb3J0IGRlY2xhcmUgY29uc3QgX19jb3JlX3ByaXZhdGVfdGVzdGluZ19wbGFjZWhvbGRlcl9fID0gXCJcIjtcclxuXHJcblxyXG4vKipcclxuICogV3JhcHMgYSB0ZXN0IGZ1bmN0aW9uIGluIGFuIGFzeW5jaHJvbm91cyB0ZXN0IHpvbmUuIFRoZSB0ZXN0IHdpbGwgYXV0b21hdGljYWxseVxyXG4gKiBjb21wbGV0ZSB3aGVuIGFsbCBhc3luY2hyb25vdXMgY2FsbHMgd2l0aGluIHRoaXMgem9uZSBhcmUgZG9uZS4gQ2FuIGJlIHVzZWRcclxuICogdG8gd3JhcCBhbiB7QGxpbmsgaW5qZWN0fSBjYWxsLlxyXG4gKlxyXG4gKiBFeGFtcGxlOlxyXG4gKlxyXG4gKiBgYGBcclxuICogaXQoJy4uLicsIGFzeW5jKGluamVjdChbQUNsYXNzXSwgKG9iamVjdCkgPT4ge1xyXG4gKiAgIG9iamVjdC5kb1NvbWV0aGluZy50aGVuKCgpID0+IHtcclxuICogICAgIGV4cGVjdCguLi4pO1xyXG4gKiAgIH0pXHJcbiAqIH0pO1xyXG4gKiBgYGBcclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gYXN5bmMoZm46IEZ1bmN0aW9uKTogKGRvbmU6IGFueSkgPT4gYW55O1xyXG5cclxuLyoqXHJcbiAqIEZpeHR1cmUgZm9yIGRlYnVnZ2luZyBhbmQgdGVzdGluZyBhIGNvbXBvbmVudC5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgQ29tcG9uZW50Rml4dHVyZTxUPiB7XHJcbiAgICBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxUPjtcclxuICAgIG5nWm9uZTogTmdab25lIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX2F1dG9EZXRlY3Q7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBEZWJ1Z0VsZW1lbnQgYXNzb2NpYXRlZCB3aXRoIHRoZSByb290IGVsZW1lbnQgb2YgdGhpcyBjb21wb25lbnQuXHJcbiAgICAgKi9cclxuICAgIGRlYnVnRWxlbWVudDogRGVidWdFbGVtZW50O1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgaW5zdGFuY2Ugb2YgdGhlIHJvb3QgY29tcG9uZW50IGNsYXNzLlxyXG4gICAgICovXHJcbiAgICBjb21wb25lbnRJbnN0YW5jZTogVDtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5hdGl2ZSBlbGVtZW50IGF0IHRoZSByb290IG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAgKi9cclxuICAgIG5hdGl2ZUVsZW1lbnQ6IGFueTtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIEVsZW1lbnRSZWYgZm9yIHRoZSBlbGVtZW50IGF0IHRoZSByb290IG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAgKi9cclxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBDaGFuZ2VEZXRlY3RvclJlZiBmb3IgdGhlIGNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWY7XHJcbiAgICBwcml2YXRlIF9yZW5kZXJlcjtcclxuICAgIHByaXZhdGUgX2lzU3RhYmxlO1xyXG4gICAgcHJpdmF0ZSBfaXNEZXN0cm95ZWQ7XHJcbiAgICBwcml2YXRlIF9yZXNvbHZlO1xyXG4gICAgcHJpdmF0ZSBfcHJvbWlzZTtcclxuICAgIHByaXZhdGUgX29uVW5zdGFibGVTdWJzY3JpcHRpb247XHJcbiAgICBwcml2YXRlIF9vblN0YWJsZVN1YnNjcmlwdGlvbjtcclxuICAgIHByaXZhdGUgX29uTWljcm90YXNrRW1wdHlTdWJzY3JpcHRpb247XHJcbiAgICBwcml2YXRlIF9vbkVycm9yU3Vic2NyaXB0aW9uO1xyXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8VD4sIG5nWm9uZTogTmdab25lIHwgbnVsbCwgX2F1dG9EZXRlY3Q6IGJvb2xlYW4pO1xyXG4gICAgcHJpdmF0ZSBfdGljaztcclxuICAgIC8qKlxyXG4gICAgICogVHJpZ2dlciBhIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUgZm9yIHRoZSBjb21wb25lbnQuXHJcbiAgICAgKi9cclxuICAgIGRldGVjdENoYW5nZXMoY2hlY2tOb0NoYW5nZXM/OiBib29sZWFuKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogRG8gYSBjaGFuZ2UgZGV0ZWN0aW9uIHJ1biB0byBtYWtlIHN1cmUgdGhlcmUgd2VyZSBubyBjaGFuZ2VzLlxyXG4gICAgICovXHJcbiAgICBjaGVja05vQ2hhbmdlcygpOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgd2hldGhlciB0aGUgZml4dHVyZSBzaG91bGQgYXV0b2RldGVjdCBjaGFuZ2VzLlxyXG4gICAgICpcclxuICAgICAqIEFsc28gcnVucyBkZXRlY3RDaGFuZ2VzIG9uY2Ugc28gdGhhdCBhbnkgZXhpc3RpbmcgY2hhbmdlIGlzIGRldGVjdGVkLlxyXG4gICAgICovXHJcbiAgICBhdXRvRGV0ZWN0Q2hhbmdlcyhhdXRvRGV0ZWN0PzogYm9vbGVhbik6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB3aGV0aGVyIHRoZSBmaXh0dXJlIGlzIGN1cnJlbnRseSBzdGFibGUgb3IgaGFzIGFzeW5jIHRhc2tzIHRoYXQgaGF2ZSBub3QgYmVlbiBjb21wbGV0ZWRcclxuICAgICAqIHlldC5cclxuICAgICAqL1xyXG4gICAgaXNTdGFibGUoKTogYm9vbGVhbjtcclxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGZpeHR1cmUgaXMgc3RhYmxlLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gcmVzdW1lIHRlc3RpbmcgYWZ0ZXIgZXZlbnRzIGhhdmUgdHJpZ2dlcmVkIGFzeW5jaHJvbm91cyBhY3Rpdml0eSBvclxyXG4gICAgICogYXN5bmNocm9ub3VzIGNoYW5nZSBkZXRlY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIHdoZW5TdGFibGUoKTogUHJvbWlzZTxhbnk+O1xyXG4gICAgcHJpdmF0ZSBfZ2V0UmVuZGVyZXI7XHJcbiAgICAvKipcclxuICAgICAqIEdldCBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB1aSBzdGF0ZSBpcyBzdGFibGUgZm9sbG93aW5nIGFuaW1hdGlvbnMuXHJcbiAgICAgKi9cclxuICAgIHdoZW5SZW5kZXJpbmdEb25lKCk6IFByb21pc2U8YW55PjtcclxuICAgIC8qKlxyXG4gICAgICogVHJpZ2dlciBjb21wb25lbnQgZGVzdHJ1Y3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGRlc3Ryb3koKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IENvbXBvbmVudEZpeHR1cmVBdXRvRGV0ZWN0OiBJbmplY3Rpb25Ub2tlbjxib29sZWFuW10+O1xyXG5cclxuLyoqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IENvbXBvbmVudEZpeHR1cmVOb05nWm9uZTogSW5qZWN0aW9uVG9rZW48Ym9vbGVhbltdPjtcclxuXHJcbi8qKlxyXG4gKiBEaXNjYXJkIGFsbCByZW1haW5pbmcgcGVyaW9kaWMgdGFza3MuXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIGRpc2NhcmRQZXJpb2RpY1Rhc2tzKCk6IHZvaWQ7XHJcblxyXG4vKipcclxuICogV3JhcHMgYSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBpbiB0aGUgZmFrZUFzeW5jIHpvbmU6XHJcbiAqIC0gbWljcm90YXNrcyBhcmUgbWFudWFsbHkgZXhlY3V0ZWQgYnkgY2FsbGluZyBgZmx1c2hNaWNyb3Rhc2tzKClgLFxyXG4gKiAtIHRpbWVycyBhcmUgc3luY2hyb25vdXMsIGB0aWNrKClgIHNpbXVsYXRlcyB0aGUgYXN5bmNocm9ub3VzIHBhc3NhZ2Ugb2YgdGltZS5cclxuICpcclxuICogSWYgdGhlcmUgYXJlIGFueSBwZW5kaW5nIHRpbWVycyBhdCB0aGUgZW5kIG9mIHRoZSBmdW5jdGlvbiwgYW4gZXhjZXB0aW9uIHdpbGwgYmUgdGhyb3duLlxyXG4gKlxyXG4gKiBDYW4gYmUgdXNlZCB0byB3cmFwIGluamVjdCgpIGNhbGxzLlxyXG4gKlxyXG4gKiBAdXNhZ2VOb3Rlc1xyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKlxyXG4gKiB7QGV4YW1wbGUgY29yZS90ZXN0aW5nL3RzL2Zha2VfYXN5bmMudHMgcmVnaW9uPSdiYXNpYyd9XHJcbiAqXHJcbiAqIEBwYXJhbSBmblxyXG4gKiBAcmV0dXJucyBUaGUgZnVuY3Rpb24gd3JhcHBlZCB0byBiZSBleGVjdXRlZCBpbiB0aGUgZmFrZUFzeW5jIHpvbmVcclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gZmFrZUFzeW5jKGZuOiBGdW5jdGlvbik6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xyXG5cclxuLyoqXHJcbiAqIFNpbXVsYXRlcyB0aGUgYXN5bmNocm9ub3VzIHBhc3NhZ2Ugb2YgdGltZSBmb3IgdGhlIHRpbWVycyBpbiB0aGUgZmFrZUFzeW5jIHpvbmUgYnlcclxuICogZHJhaW5pbmcgdGhlIG1hY3JvdGFzayBxdWV1ZSB1bnRpbCBpdCBpcyBlbXB0eS4gVGhlIHJldHVybmVkIHZhbHVlIGlzIHRoZSBtaWxsaXNlY29uZHNcclxuICogb2YgdGltZSB0aGF0IHdvdWxkIGhhdmUgYmVlbiBlbGFwc2VkLlxyXG4gKlxyXG4gKiBAcGFyYW0gbWF4VHVybnNcclxuICogQHJldHVybnMgVGhlIHNpbXVsYXRlZCB0aW1lIGVsYXBzZWQsIGluIG1pbGxpcy5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gZmx1c2gobWF4VHVybnM/OiBudW1iZXIpOiBudW1iZXI7XHJcblxyXG4vKipcclxuICogRmx1c2ggYW55IHBlbmRpbmcgbWljcm90YXNrcy5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gZmx1c2hNaWNyb3Rhc2tzKCk6IHZvaWQ7XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIHNpbmdsZXRvbiBvZiB0aGUgYXBwbGljYWJsZSBgVGVzdEJlZGAuXHJcbiAqXHJcbiAqIEl0IHdpbGwgYmUgZWl0aGVyIGFuIGluc3RhbmNlIG9mIGBUZXN0QmVkVmlld0VuZ2luZWAgb3IgYFRlc3RCZWRSZW5kZXIzYC5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY29uc3QgZ2V0VGVzdEJlZDogKCkgPT4gVGVzdEJlZDtcclxuXHJcbi8qKlxyXG4gKiBBbGxvd3MgaW5qZWN0aW5nIGRlcGVuZGVuY2llcyBpbiBgYmVmb3JlRWFjaCgpYCBhbmQgYGl0KClgLlxyXG4gKlxyXG4gKiBFeGFtcGxlOlxyXG4gKlxyXG4gKiBgYGBcclxuICogYmVmb3JlRWFjaChpbmplY3QoW0RlcGVuZGVuY3ksIEFDbGFzc10sIChkZXAsIG9iamVjdCkgPT4ge1xyXG4gKiAgIC8vIHNvbWUgY29kZSB0aGF0IHVzZXMgYGRlcGAgYW5kIGBvYmplY3RgXHJcbiAqICAgLy8gLi4uXHJcbiAqIH0pKTtcclxuICpcclxuICogaXQoJy4uLicsIGluamVjdChbQUNsYXNzXSwgKG9iamVjdCkgPT4ge1xyXG4gKiAgIG9iamVjdC5kb1NvbWV0aGluZygpO1xyXG4gKiAgIGV4cGVjdCguLi4pO1xyXG4gKiB9KVxyXG4gKiBgYGBcclxuICpcclxuICogTm90ZXM6XHJcbiAqIC0gaW5qZWN0IGlzIGN1cnJlbnRseSBhIGZ1bmN0aW9uIGJlY2F1c2Ugb2Ygc29tZSBUcmFjZXVyIGxpbWl0YXRpb24gdGhlIHN5bnRheCBzaG91bGRcclxuICogZXZlbnR1YWxseVxyXG4gKiAgIGJlY29tZXMgYGl0KCcuLi4nLCBASW5qZWN0IChvYmplY3Q6IEFDbGFzcywgYXN5bmM6IEFzeW5jVGVzdENvbXBsZXRlcikgPT4geyAuLi4gfSk7YFxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBpbmplY3QodG9rZW5zOiBhbnlbXSwgZm46IEZ1bmN0aW9uKTogKCkgPT4gYW55O1xyXG5cclxuLyoqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEluamVjdFNldHVwV3JhcHBlciB7XHJcbiAgICBwcml2YXRlIF9tb2R1bGVEZWY7XHJcbiAgICBjb25zdHJ1Y3RvcihfbW9kdWxlRGVmOiAoKSA9PiBUZXN0TW9kdWxlTWV0YWRhdGEpO1xyXG4gICAgcHJpdmF0ZSBfYWRkTW9kdWxlO1xyXG4gICAgaW5qZWN0KHRva2VuczogYW55W10sIGZuOiBGdW5jdGlvbik6ICgpID0+IGFueTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBUeXBlIHVzZWQgZm9yIG1vZGlmaWNhdGlvbnMgdG8gbWV0YWRhdGFcclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgdHlwZSBNZXRhZGF0YU92ZXJyaWRlPFQ+ID0ge1xyXG4gICAgYWRkPzogUGFydGlhbDxUPjtcclxuICAgIHJlbW92ZT86IFBhcnRpYWw8VD47XHJcbiAgICBzZXQ/OiBQYXJ0aWFsPFQ+O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENsZWFycyBvdXQgdGhlIHNoYXJlZCBmYWtlIGFzeW5jIHpvbmUgZm9yIGEgdGVzdC5cclxuICogVG8gYmUgY2FsbGVkIGluIGEgZ2xvYmFsIGBiZWZvcmVFYWNoYC5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gcmVzZXRGYWtlQXN5bmNab25lKCk6IHZvaWQ7XHJcblxyXG4vKipcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFRlc3RCZWQge1xyXG4gICAgcGxhdGZvcm06IFBsYXRmb3JtUmVmO1xyXG4gICAgbmdNb2R1bGU6IFR5cGU8YW55PiB8IFR5cGU8YW55PltdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplIHRoZSBlbnZpcm9ubWVudCBmb3IgdGVzdGluZyB3aXRoIGEgY29tcGlsZXIgZmFjdG9yeSwgYSBQbGF0Zm9ybVJlZiwgYW5kIGFuXHJcbiAgICAgKiBhbmd1bGFyIG1vZHVsZS4gVGhlc2UgYXJlIGNvbW1vbiB0byBldmVyeSB0ZXN0IGluIHRoZSBzdWl0ZS5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIG1heSBvbmx5IGJlIGNhbGxlZCBvbmNlLCB0byBzZXQgdXAgdGhlIGNvbW1vbiBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHRlc3RcclxuICAgICAqIHN1aXRlIG9uIHRoZSBjdXJyZW50IHBsYXRmb3JtLiBJZiB5b3UgYWJzb2x1dGVseSBuZWVkIHRvIGNoYW5nZSB0aGUgcHJvdmlkZXJzLFxyXG4gICAgICogZmlyc3QgdXNlIGByZXNldFRlc3RFbnZpcm9ubWVudGAuXHJcbiAgICAgKlxyXG4gICAgICogVGVzdCBtb2R1bGVzIGFuZCBwbGF0Zm9ybXMgZm9yIGluZGl2aWR1YWwgcGxhdGZvcm1zIGFyZSBhdmFpbGFibGUgZnJvbVxyXG4gICAgICogJ0Bhbmd1bGFyLzxwbGF0Zm9ybV9uYW1lPi90ZXN0aW5nJy5cclxuICAgICAqL1xyXG4gICAgaW5pdFRlc3RFbnZpcm9ubWVudChuZ01vZHVsZTogVHlwZTxhbnk+IHwgVHlwZTxhbnk+W10sIHBsYXRmb3JtOiBQbGF0Zm9ybVJlZiwgYW90U3VtbWFyaWVzPzogKCkgPT4gYW55W10pOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldCB0aGUgcHJvdmlkZXJzIGZvciB0aGUgdGVzdCBpbmplY3Rvci5cclxuICAgICAqL1xyXG4gICAgcmVzZXRUZXN0RW52aXJvbm1lbnQoKTogdm9pZDtcclxuICAgIHJlc2V0VGVzdGluZ01vZHVsZSgpOiB2b2lkO1xyXG4gICAgY29uZmlndXJlQ29tcGlsZXIoY29uZmlnOiB7XHJcbiAgICAgICAgcHJvdmlkZXJzPzogYW55W107XHJcbiAgICAgICAgdXNlSml0PzogYm9vbGVhbjtcclxuICAgIH0pOiB2b2lkO1xyXG4gICAgY29uZmlndXJlVGVzdGluZ01vZHVsZShtb2R1bGVEZWY6IFRlc3RNb2R1bGVNZXRhZGF0YSk6IHZvaWQ7XHJcbiAgICBjb21waWxlQ29tcG9uZW50cygpOiBQcm9taXNlPGFueT47XHJcbiAgICBpbmplY3Q8VD4odG9rZW46IFR5cGU8VD4gfCBJbmplY3Rpb25Ub2tlbjxUPiB8IEFic3RyYWN0VHlwZTxUPiwgbm90Rm91bmRWYWx1ZT86IFQsIGZsYWdzPzogSW5qZWN0RmxhZ3MpOiBUO1xyXG4gICAgaW5qZWN0PFQ+KHRva2VuOiBUeXBlPFQ+IHwgSW5qZWN0aW9uVG9rZW48VD4gfCBBYnN0cmFjdFR5cGU8VD4sIG5vdEZvdW5kVmFsdWU6IG51bGwsIGZsYWdzPzogSW5qZWN0RmxhZ3MpOiBUIHwgbnVsbDtcclxuICAgIC8qKiBAZGVwcmVjYXRlZCBmcm9tIHY5LjAuMCB1c2UgVGVzdEJlZC5pbmplY3QgKi9cclxuICAgIGdldDxUPih0b2tlbjogVHlwZTxUPiB8IEluamVjdGlvblRva2VuPFQ+LCBub3RGb3VuZFZhbHVlPzogVCwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IGFueTtcclxuICAgIC8qKiBAZGVwcmVjYXRlZCBmcm9tIHY5LjAuMCB1c2UgVGVzdEJlZC5pbmplY3QgKi9cclxuICAgIGdldCh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlPzogYW55KTogYW55O1xyXG4gICAgZXhlY3V0ZSh0b2tlbnM6IGFueVtdLCBmbjogRnVuY3Rpb24sIGNvbnRleHQ/OiBhbnkpOiBhbnk7XHJcbiAgICBvdmVycmlkZU1vZHVsZShuZ01vZHVsZTogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxOZ01vZHVsZT4pOiB2b2lkO1xyXG4gICAgb3ZlcnJpZGVDb21wb25lbnQoY29tcG9uZW50OiBUeXBlPGFueT4sIG92ZXJyaWRlOiBNZXRhZGF0YU92ZXJyaWRlPENvbXBvbmVudD4pOiB2b2lkO1xyXG4gICAgb3ZlcnJpZGVEaXJlY3RpdmUoZGlyZWN0aXZlOiBUeXBlPGFueT4sIG92ZXJyaWRlOiBNZXRhZGF0YU92ZXJyaWRlPERpcmVjdGl2ZT4pOiB2b2lkO1xyXG4gICAgb3ZlcnJpZGVQaXBlKHBpcGU6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8UGlwZT4pOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBPdmVyd3JpdGVzIGFsbCBwcm92aWRlcnMgZm9yIHRoZSBnaXZlbiB0b2tlbiB3aXRoIHRoZSBnaXZlbiBwcm92aWRlciBkZWZpbml0aW9uLlxyXG4gICAgICovXHJcbiAgICBvdmVycmlkZVByb3ZpZGVyKHRva2VuOiBhbnksIHByb3ZpZGVyOiB7XHJcbiAgICAgICAgdXNlRmFjdG9yeTogRnVuY3Rpb247XHJcbiAgICAgICAgZGVwczogYW55W107XHJcbiAgICB9KTogdm9pZDtcclxuICAgIG92ZXJyaWRlUHJvdmlkZXIodG9rZW46IGFueSwgcHJvdmlkZXI6IHtcclxuICAgICAgICB1c2VWYWx1ZTogYW55O1xyXG4gICAgfSk6IHZvaWQ7XHJcbiAgICBvdmVycmlkZVByb3ZpZGVyKHRva2VuOiBhbnksIHByb3ZpZGVyOiB7XHJcbiAgICAgICAgdXNlRmFjdG9yeT86IEZ1bmN0aW9uO1xyXG4gICAgICAgIHVzZVZhbHVlPzogYW55O1xyXG4gICAgICAgIGRlcHM/OiBhbnlbXTtcclxuICAgIH0pOiB2b2lkO1xyXG4gICAgb3ZlcnJpZGVUZW1wbGF0ZVVzaW5nVGVzdGluZ01vZHVsZShjb21wb25lbnQ6IFR5cGU8YW55PiwgdGVtcGxhdGU6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBjcmVhdGVDb21wb25lbnQ8VD4oY29tcG9uZW50OiBUeXBlPFQ+KTogQ29tcG9uZW50Rml4dHVyZTxUPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBDb25maWd1cmVzIGFuZCBpbml0aWFsaXplcyBlbnZpcm9ubWVudCBmb3IgdW5pdCB0ZXN0aW5nIGFuZCBwcm92aWRlcyBtZXRob2RzIGZvclxyXG4gKiBjcmVhdGluZyBjb21wb25lbnRzIGFuZCBzZXJ2aWNlcyBpbiB1bml0IHRlc3RzLlxyXG4gKlxyXG4gKiBgVGVzdEJlZGAgaXMgdGhlIHByaW1hcnkgYXBpIGZvciB3cml0aW5nIHVuaXQgdGVzdHMgZm9yIEFuZ3VsYXIgYXBwbGljYXRpb25zIGFuZCBsaWJyYXJpZXMuXHJcbiAqXHJcbiAqIE5vdGU6IFVzZSBgVGVzdEJlZGAgaW4gdGVzdHMuIEl0IHdpbGwgYmUgc2V0IHRvIGVpdGhlciBgVGVzdEJlZFZpZXdFbmdpbmVgIG9yIGBUZXN0QmVkUmVuZGVyM2BcclxuICogYWNjb3JkaW5nIHRvIHRoZSBjb21waWxlciB1c2VkLlxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjb25zdCBUZXN0QmVkOiBUZXN0QmVkU3RhdGljO1xyXG5cclxuLyoqXHJcbiAqIFN0YXRpYyBtZXRob2RzIGltcGxlbWVudGVkIGJ5IHRoZSBgVGVzdEJlZFZpZXdFbmdpbmVgIGFuZCBgVGVzdEJlZFJlbmRlcjNgXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBUZXN0QmVkU3RhdGljIHtcclxuICAgIG5ldyAoLi4uYXJnczogYW55W10pOiBUZXN0QmVkO1xyXG4gICAgaW5pdFRlc3RFbnZpcm9ubWVudChuZ01vZHVsZTogVHlwZTxhbnk+IHwgVHlwZTxhbnk+W10sIHBsYXRmb3JtOiBQbGF0Zm9ybVJlZiwgYW90U3VtbWFyaWVzPzogKCkgPT4gYW55W10pOiBUZXN0QmVkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldCB0aGUgcHJvdmlkZXJzIGZvciB0aGUgdGVzdCBpbmplY3Rvci5cclxuICAgICAqL1xyXG4gICAgcmVzZXRUZXN0RW52aXJvbm1lbnQoKTogdm9pZDtcclxuICAgIHJlc2V0VGVzdGluZ01vZHVsZSgpOiBUZXN0QmVkU3RhdGljO1xyXG4gICAgLyoqXHJcbiAgICAgKiBBbGxvd3Mgb3ZlcnJpZGluZyBkZWZhdWx0IGNvbXBpbGVyIHByb3ZpZGVycyBhbmQgc2V0dGluZ3NcclxuICAgICAqIHdoaWNoIGFyZSBkZWZpbmVkIGluIHRlc3RfaW5qZWN0b3IuanNcclxuICAgICAqL1xyXG4gICAgY29uZmlndXJlQ29tcGlsZXIoY29uZmlnOiB7XHJcbiAgICAgICAgcHJvdmlkZXJzPzogYW55W107XHJcbiAgICAgICAgdXNlSml0PzogYm9vbGVhbjtcclxuICAgIH0pOiBUZXN0QmVkU3RhdGljO1xyXG4gICAgLyoqXHJcbiAgICAgKiBBbGxvd3Mgb3ZlcnJpZGluZyBkZWZhdWx0IHByb3ZpZGVycywgZGlyZWN0aXZlcywgcGlwZXMsIG1vZHVsZXMgb2YgdGhlIHRlc3QgaW5qZWN0b3IsXHJcbiAgICAgKiB3aGljaCBhcmUgZGVmaW5lZCBpbiB0ZXN0X2luamVjdG9yLmpzXHJcbiAgICAgKi9cclxuICAgIGNvbmZpZ3VyZVRlc3RpbmdNb2R1bGUobW9kdWxlRGVmOiBUZXN0TW9kdWxlTWV0YWRhdGEpOiBUZXN0QmVkU3RhdGljO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb21waWxlIGNvbXBvbmVudHMgd2l0aCBhIGB0ZW1wbGF0ZVVybGAgZm9yIHRoZSB0ZXN0J3MgTmdNb2R1bGUuXHJcbiAgICAgKiBJdCBpcyBuZWNlc3NhcnkgdG8gY2FsbCB0aGlzIGZ1bmN0aW9uXHJcbiAgICAgKiBhcyBmZXRjaGluZyB1cmxzIGlzIGFzeW5jaHJvbm91cy5cclxuICAgICAqL1xyXG4gICAgY29tcGlsZUNvbXBvbmVudHMoKTogUHJvbWlzZTxhbnk+O1xyXG4gICAgb3ZlcnJpZGVNb2R1bGUobmdNb2R1bGU6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8TmdNb2R1bGU+KTogVGVzdEJlZFN0YXRpYztcclxuICAgIG92ZXJyaWRlQ29tcG9uZW50KGNvbXBvbmVudDogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxDb21wb25lbnQ+KTogVGVzdEJlZFN0YXRpYztcclxuICAgIG92ZXJyaWRlRGlyZWN0aXZlKGRpcmVjdGl2ZTogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxEaXJlY3RpdmU+KTogVGVzdEJlZFN0YXRpYztcclxuICAgIG92ZXJyaWRlUGlwZShwaXBlOiBUeXBlPGFueT4sIG92ZXJyaWRlOiBNZXRhZGF0YU92ZXJyaWRlPFBpcGU+KTogVGVzdEJlZFN0YXRpYztcclxuICAgIG92ZXJyaWRlVGVtcGxhdGUoY29tcG9uZW50OiBUeXBlPGFueT4sIHRlbXBsYXRlOiBzdHJpbmcpOiBUZXN0QmVkU3RhdGljO1xyXG4gICAgLyoqXHJcbiAgICAgKiBPdmVycmlkZXMgdGhlIHRlbXBsYXRlIG9mIHRoZSBnaXZlbiBjb21wb25lbnQsIGNvbXBpbGluZyB0aGUgdGVtcGxhdGVcclxuICAgICAqIGluIHRoZSBjb250ZXh0IG9mIHRoZSBUZXN0aW5nTW9kdWxlLlxyXG4gICAgICpcclxuICAgICAqIE5vdGU6IFRoaXMgd29ya3MgZm9yIEpJVCBhbmQgQU9UZWQgY29tcG9uZW50cyBhcyB3ZWxsLlxyXG4gICAgICovXHJcbiAgICBvdmVycmlkZVRlbXBsYXRlVXNpbmdUZXN0aW5nTW9kdWxlKGNvbXBvbmVudDogVHlwZTxhbnk+LCB0ZW1wbGF0ZTogc3RyaW5nKTogVGVzdEJlZFN0YXRpYztcclxuICAgIC8qKlxyXG4gICAgICogT3ZlcndyaXRlcyBhbGwgcHJvdmlkZXJzIGZvciB0aGUgZ2l2ZW4gdG9rZW4gd2l0aCB0aGUgZ2l2ZW4gcHJvdmlkZXIgZGVmaW5pdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBOb3RlOiBUaGlzIHdvcmtzIGZvciBKSVQgYW5kIEFPVGVkIGNvbXBvbmVudHMgYXMgd2VsbC5cclxuICAgICAqL1xyXG4gICAgb3ZlcnJpZGVQcm92aWRlcih0b2tlbjogYW55LCBwcm92aWRlcjoge1xyXG4gICAgICAgIHVzZUZhY3Rvcnk6IEZ1bmN0aW9uO1xyXG4gICAgICAgIGRlcHM6IGFueVtdO1xyXG4gICAgfSk6IFRlc3RCZWRTdGF0aWM7XHJcbiAgICBvdmVycmlkZVByb3ZpZGVyKHRva2VuOiBhbnksIHByb3ZpZGVyOiB7XHJcbiAgICAgICAgdXNlVmFsdWU6IGFueTtcclxuICAgIH0pOiBUZXN0QmVkU3RhdGljO1xyXG4gICAgb3ZlcnJpZGVQcm92aWRlcih0b2tlbjogYW55LCBwcm92aWRlcjoge1xyXG4gICAgICAgIHVzZUZhY3Rvcnk/OiBGdW5jdGlvbjtcclxuICAgICAgICB1c2VWYWx1ZT86IGFueTtcclxuICAgICAgICBkZXBzPzogYW55W107XHJcbiAgICB9KTogVGVzdEJlZFN0YXRpYztcclxuICAgIGluamVjdDxUPih0b2tlbjogVHlwZTxUPiB8IEluamVjdGlvblRva2VuPFQ+IHwgQWJzdHJhY3RUeXBlPFQ+LCBub3RGb3VuZFZhbHVlPzogVCwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IFQ7XHJcbiAgICBpbmplY3Q8VD4odG9rZW46IFR5cGU8VD4gfCBJbmplY3Rpb25Ub2tlbjxUPiB8IEFic3RyYWN0VHlwZTxUPiwgbm90Rm91bmRWYWx1ZTogbnVsbCwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IFQgfCBudWxsO1xyXG4gICAgLyoqIEBkZXByZWNhdGVkIGZyb20gdjkuMC4wIHVzZSBUZXN0QmVkLmluamVjdCAqL1xyXG4gICAgZ2V0PFQ+KHRva2VuOiBUeXBlPFQ+IHwgSW5qZWN0aW9uVG9rZW48VD4sIG5vdEZvdW5kVmFsdWU/OiBULCBmbGFncz86IEluamVjdEZsYWdzKTogYW55O1xyXG4gICAgLyoqIEBkZXByZWNhdGVkIGZyb20gdjkuMC4wIHVzZSBUZXN0QmVkLmluamVjdCAqL1xyXG4gICAgZ2V0KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU/OiBhbnkpOiBhbnk7XHJcbiAgICBjcmVhdGVDb21wb25lbnQ8VD4oY29tcG9uZW50OiBUeXBlPFQ+KTogQ29tcG9uZW50Rml4dHVyZTxUPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFuIGFic3RyYWN0IGNsYXNzIGZvciBpbnNlcnRpbmcgdGhlIHJvb3QgdGVzdCBjb21wb25lbnQgZWxlbWVudCBpbiBhIHBsYXRmb3JtIGluZGVwZW5kZW50IHdheS5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgVGVzdENvbXBvbmVudFJlbmRlcmVyIHtcclxuICAgIGluc2VydFJvb3RFbGVtZW50KHJvb3RFbGVtZW50SWQ6IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSB0eXBlIFRlc3RNb2R1bGVNZXRhZGF0YSA9IHtcclxuICAgIHByb3ZpZGVycz86IGFueVtdO1xyXG4gICAgZGVjbGFyYXRpb25zPzogYW55W107XHJcbiAgICBpbXBvcnRzPzogYW55W107XHJcbiAgICBzY2hlbWFzPzogQXJyYXk8U2NoZW1hTWV0YWRhdGEgfCBhbnlbXT47XHJcbiAgICBhb3RTdW1tYXJpZXM/OiAoKSA9PiBhbnlbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTaW11bGF0ZXMgdGhlIGFzeW5jaHJvbm91cyBwYXNzYWdlIG9mIHRpbWUgZm9yIHRoZSB0aW1lcnMgaW4gdGhlIGZha2VBc3luYyB6b25lLlxyXG4gKlxyXG4gKiBUaGUgbWljcm90YXNrcyBxdWV1ZSBpcyBkcmFpbmVkIGF0IHRoZSB2ZXJ5IHN0YXJ0IG9mIHRoaXMgZnVuY3Rpb24gYW5kIGFmdGVyIGFueSB0aW1lciBjYWxsYmFja1xyXG4gKiBoYXMgYmVlbiBleGVjdXRlZC5cclxuICpcclxuICogQHVzYWdlTm90ZXNcclxuICogIyMjIEV4YW1wbGVcclxuICpcclxuICoge0BleGFtcGxlIGNvcmUvdGVzdGluZy90cy9mYWtlX2FzeW5jLnRzIHJlZ2lvbj0nYmFzaWMnfVxyXG4gKlxyXG4gKiBAcGFyYW0gbWlsbGlzLCB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kIHRvIGFkdmFuY2UgdGhlIHZpcnR1YWwgdGltZXJcclxuICogQHBhcmFtIHRpY2tPcHRpb25zLCB0aGUgb3B0aW9ucyBvZiB0aWNrIHdpdGggYSBmbGFnIGNhbGxlZFxyXG4gKiBwcm9jZXNzTmV3TWFjcm9UYXNrc1N5bmNocm9ub3VzbHksIHdoZXRoZXIgdG8gaW52b2tlIHRoZSBuZXcgbWFjcm9UYXNrcywgYnkgZGVmYXVsdCBpc1xyXG4gKiBmYWxzZSwgbWVhbnMgdGhlIG5ldyBtYWNyb1Rhc2tzIHdpbGwgYmUgaW52b2tlZFxyXG4gKlxyXG4gKiBGb3IgZXhhbXBsZSxcclxuICpcclxuICogaXQgKCd0ZXN0IHdpdGggbmVzdGVkIHNldFRpbWVvdXQnLCBmYWtlQXN5bmMoKCkgPT4ge1xyXG4gKiAgIGxldCBuZXN0ZWRUaW1lb3V0SW52b2tlZCA9IGZhbHNlO1xyXG4gKiAgIGZ1bmN0aW9uIGZ1bmNXaXRoTmVzdGVkVGltZW91dCgpIHtcclxuICogICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gKiAgICAgICBuZXN0ZWRUaW1lb3V0SW52b2tlZCA9IHRydWU7XHJcbiAqICAgICB9KTtcclxuICogICB9O1xyXG4gKiAgIHNldFRpbWVvdXQoZnVuY1dpdGhOZXN0ZWRUaW1lb3V0KTtcclxuICogICB0aWNrKCk7XHJcbiAqICAgZXhwZWN0KG5lc3RlZFRpbWVvdXRJbnZva2VkKS50b0JlKHRydWUpO1xyXG4gKiB9KSk7XHJcbiAqXHJcbiAqIGluIHRoaXMgY2FzZSwgd2UgaGF2ZSBhIG5lc3RlZCB0aW1lb3V0IChuZXcgbWFjcm9UYXNrKSwgd2hlbiB3ZSB0aWNrLCBib3RoIHRoZVxyXG4gKiBmdW5jV2l0aE5lc3RlZFRpbWVvdXQgYW5kIHRoZSBuZXN0ZWQgdGltZW91dCBib3RoIHdpbGwgYmUgaW52b2tlZC5cclxuICpcclxuICogaXQgKCd0ZXN0IHdpdGggbmVzdGVkIHNldFRpbWVvdXQnLCBmYWtlQXN5bmMoKCkgPT4ge1xyXG4gKiAgIGxldCBuZXN0ZWRUaW1lb3V0SW52b2tlZCA9IGZhbHNlO1xyXG4gKiAgIGZ1bmN0aW9uIGZ1bmNXaXRoTmVzdGVkVGltZW91dCgpIHtcclxuICogICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gKiAgICAgICBuZXN0ZWRUaW1lb3V0SW52b2tlZCA9IHRydWU7XHJcbiAqICAgICB9KTtcclxuICogICB9O1xyXG4gKiAgIHNldFRpbWVvdXQoZnVuY1dpdGhOZXN0ZWRUaW1lb3V0KTtcclxuICogICB0aWNrKDAsIHtwcm9jZXNzTmV3TWFjcm9UYXNrc1N5bmNocm9ub3VzbHk6IGZhbHNlfSk7XHJcbiAqICAgZXhwZWN0KG5lc3RlZFRpbWVvdXRJbnZva2VkKS50b0JlKGZhbHNlKTtcclxuICogfSkpO1xyXG4gKlxyXG4gKiBpZiB3ZSBwYXNzIHRoZSB0aWNrT3B0aW9ucyB3aXRoIHByb2Nlc3NOZXdNYWNyb1Rhc2tzU3luY2hyb25vdXNseSB0byBiZSBmYWxzZSwgdGhlIG5lc3RlZCB0aW1lb3V0XHJcbiAqIHdpbGwgbm90IGJlIGludm9rZWQuXHJcbiAqXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIHRpY2sobWlsbGlzPzogbnVtYmVyLCB0aWNrT3B0aW9ucz86IHtcclxuICAgIHByb2Nlc3NOZXdNYWNyb1Rhc2tzU3luY2hyb25vdXNseTogYm9vbGVhbjtcclxufSk6IHZvaWQ7XHJcblxyXG4vKipcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gd2l0aE1vZHVsZShtb2R1bGVEZWY6IFRlc3RNb2R1bGVNZXRhZGF0YSk6IEluamVjdFNldHVwV3JhcHBlcjtcclxuXHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIHdpdGhNb2R1bGUobW9kdWxlRGVmOiBUZXN0TW9kdWxlTWV0YWRhdGEsIGZuOiBGdW5jdGlvbik6ICgpID0+IGFueTtcclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogQ29uZmlndXJlcyBhbmQgaW5pdGlhbGl6ZXMgZW52aXJvbm1lbnQgZm9yIHVuaXQgdGVzdGluZyBhbmQgcHJvdmlkZXMgbWV0aG9kcyBmb3JcclxuICogY3JlYXRpbmcgY29tcG9uZW50cyBhbmQgc2VydmljZXMgaW4gdW5pdCB0ZXN0cy5cclxuICpcclxuICogYFRlc3RCZWRgIGlzIHRoZSBwcmltYXJ5IGFwaSBmb3Igd3JpdGluZyB1bml0IHRlc3RzIGZvciBBbmd1bGFyIGFwcGxpY2F0aW9ucyBhbmQgbGlicmFyaWVzLlxyXG4gKlxyXG4gKiBOb3RlOiBVc2UgYFRlc3RCZWRgIGluIHRlc3RzLiBJdCB3aWxsIGJlIHNldCB0byBlaXRoZXIgYFRlc3RCZWRWaWV3RW5naW5lYCBvciBgVGVzdEJlZFJlbmRlcjNgXHJcbiAqIGFjY29yZGluZyB0byB0aGUgY29tcGlsZXIgdXNlZC5cclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIMm1YW5ndWxhcl9wYWNrYWdlc19jb3JlX3Rlc3RpbmdfdGVzdGluZ19hIGltcGxlbWVudHMgVGVzdEJlZCB7XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemUgdGhlIGVudmlyb25tZW50IGZvciB0ZXN0aW5nIHdpdGggYSBjb21waWxlciBmYWN0b3J5LCBhIFBsYXRmb3JtUmVmLCBhbmQgYW5cclxuICAgICAqIGFuZ3VsYXIgbW9kdWxlLiBUaGVzZSBhcmUgY29tbW9uIHRvIGV2ZXJ5IHRlc3QgaW4gdGhlIHN1aXRlLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgbWF5IG9ubHkgYmUgY2FsbGVkIG9uY2UsIHRvIHNldCB1cCB0aGUgY29tbW9uIHByb3ZpZGVycyBmb3IgdGhlIGN1cnJlbnQgdGVzdFxyXG4gICAgICogc3VpdGUgb24gdGhlIGN1cnJlbnQgcGxhdGZvcm0uIElmIHlvdSBhYnNvbHV0ZWx5IG5lZWQgdG8gY2hhbmdlIHRoZSBwcm92aWRlcnMsXHJcbiAgICAgKiBmaXJzdCB1c2UgYHJlc2V0VGVzdEVudmlyb25tZW50YC5cclxuICAgICAqXHJcbiAgICAgKiBUZXN0IG1vZHVsZXMgYW5kIHBsYXRmb3JtcyBmb3IgaW5kaXZpZHVhbCBwbGF0Zm9ybXMgYXJlIGF2YWlsYWJsZSBmcm9tXHJcbiAgICAgKiAnQGFuZ3VsYXIvPHBsYXRmb3JtX25hbWU+L3Rlc3RpbmcnLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW5pdFRlc3RFbnZpcm9ubWVudChuZ01vZHVsZTogVHlwZTxhbnk+IHwgVHlwZTxhbnk+W10sIHBsYXRmb3JtOiBQbGF0Zm9ybVJlZiwgYW90U3VtbWFyaWVzPzogKCkgPT4gYW55W10pOiDJtWFuZ3VsYXJfcGFja2FnZXNfY29yZV90ZXN0aW5nX3Rlc3RpbmdfYTtcclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgdGhlIHByb3ZpZGVycyBmb3IgdGhlIHRlc3QgaW5qZWN0b3IuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXNldFRlc3RFbnZpcm9ubWVudCgpOiB2b2lkO1xyXG4gICAgc3RhdGljIHJlc2V0VGVzdGluZ01vZHVsZSgpOiBUZXN0QmVkU3RhdGljO1xyXG4gICAgLyoqXHJcbiAgICAgKiBBbGxvd3Mgb3ZlcnJpZGluZyBkZWZhdWx0IGNvbXBpbGVyIHByb3ZpZGVycyBhbmQgc2V0dGluZ3NcclxuICAgICAqIHdoaWNoIGFyZSBkZWZpbmVkIGluIHRlc3RfaW5qZWN0b3IuanNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNvbmZpZ3VyZUNvbXBpbGVyKGNvbmZpZzoge1xyXG4gICAgICAgIHByb3ZpZGVycz86IGFueVtdO1xyXG4gICAgICAgIHVzZUppdD86IGJvb2xlYW47XHJcbiAgICB9KTogVGVzdEJlZFN0YXRpYztcclxuICAgIC8qKlxyXG4gICAgICogQWxsb3dzIG92ZXJyaWRpbmcgZGVmYXVsdCBwcm92aWRlcnMsIGRpcmVjdGl2ZXMsIHBpcGVzLCBtb2R1bGVzIG9mIHRoZSB0ZXN0IGluamVjdG9yLFxyXG4gICAgICogd2hpY2ggYXJlIGRlZmluZWQgaW4gdGVzdF9pbmplY3Rvci5qc1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY29uZmlndXJlVGVzdGluZ01vZHVsZShtb2R1bGVEZWY6IFRlc3RNb2R1bGVNZXRhZGF0YSk6IFRlc3RCZWRTdGF0aWM7XHJcbiAgICAvKipcclxuICAgICAqIENvbXBpbGUgY29tcG9uZW50cyB3aXRoIGEgYHRlbXBsYXRlVXJsYCBmb3IgdGhlIHRlc3QncyBOZ01vZHVsZS5cclxuICAgICAqIEl0IGlzIG5lY2Vzc2FyeSB0byBjYWxsIHRoaXMgZnVuY3Rpb25cclxuICAgICAqIGFzIGZldGNoaW5nIHVybHMgaXMgYXN5bmNocm9ub3VzLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY29tcGlsZUNvbXBvbmVudHMoKTogUHJvbWlzZTxhbnk+O1xyXG4gICAgc3RhdGljIG92ZXJyaWRlTW9kdWxlKG5nTW9kdWxlOiBUeXBlPGFueT4sIG92ZXJyaWRlOiBNZXRhZGF0YU92ZXJyaWRlPE5nTW9kdWxlPik6IFRlc3RCZWRTdGF0aWM7XHJcbiAgICBzdGF0aWMgb3ZlcnJpZGVDb21wb25lbnQoY29tcG9uZW50OiBUeXBlPGFueT4sIG92ZXJyaWRlOiBNZXRhZGF0YU92ZXJyaWRlPENvbXBvbmVudD4pOiBUZXN0QmVkU3RhdGljO1xyXG4gICAgc3RhdGljIG92ZXJyaWRlRGlyZWN0aXZlKGRpcmVjdGl2ZTogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxEaXJlY3RpdmU+KTogVGVzdEJlZFN0YXRpYztcclxuICAgIHN0YXRpYyBvdmVycmlkZVBpcGUocGlwZTogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxQaXBlPik6IFRlc3RCZWRTdGF0aWM7XHJcbiAgICBzdGF0aWMgb3ZlcnJpZGVUZW1wbGF0ZShjb21wb25lbnQ6IFR5cGU8YW55PiwgdGVtcGxhdGU6IHN0cmluZyk6IFRlc3RCZWRTdGF0aWM7XHJcbiAgICAvKipcclxuICAgICAqIE92ZXJyaWRlcyB0aGUgdGVtcGxhdGUgb2YgdGhlIGdpdmVuIGNvbXBvbmVudCwgY29tcGlsaW5nIHRoZSB0ZW1wbGF0ZVxyXG4gICAgICogaW4gdGhlIGNvbnRleHQgb2YgdGhlIFRlc3RpbmdNb2R1bGUuXHJcbiAgICAgKlxyXG4gICAgICogTm90ZTogVGhpcyB3b3JrcyBmb3IgSklUIGFuZCBBT1RlZCBjb21wb25lbnRzIGFzIHdlbGwuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBvdmVycmlkZVRlbXBsYXRlVXNpbmdUZXN0aW5nTW9kdWxlKGNvbXBvbmVudDogVHlwZTxhbnk+LCB0ZW1wbGF0ZTogc3RyaW5nKTogVGVzdEJlZFN0YXRpYztcclxuICAgIC8qKlxyXG4gICAgICogT3ZlcndyaXRlcyBhbGwgcHJvdmlkZXJzIGZvciB0aGUgZ2l2ZW4gdG9rZW4gd2l0aCB0aGUgZ2l2ZW4gcHJvdmlkZXIgZGVmaW5pdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBOb3RlOiBUaGlzIHdvcmtzIGZvciBKSVQgYW5kIEFPVGVkIGNvbXBvbmVudHMgYXMgd2VsbC5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIG92ZXJyaWRlUHJvdmlkZXIodG9rZW46IGFueSwgcHJvdmlkZXI6IHtcclxuICAgICAgICB1c2VGYWN0b3J5OiBGdW5jdGlvbjtcclxuICAgICAgICBkZXBzOiBhbnlbXTtcclxuICAgIH0pOiBUZXN0QmVkU3RhdGljO1xyXG4gICAgc3RhdGljIG92ZXJyaWRlUHJvdmlkZXIodG9rZW46IGFueSwgcHJvdmlkZXI6IHtcclxuICAgICAgICB1c2VWYWx1ZTogYW55O1xyXG4gICAgfSk6IFRlc3RCZWRTdGF0aWM7XHJcbiAgICBzdGF0aWMgaW5qZWN0PFQ+KHRva2VuOiBUeXBlPFQ+IHwgSW5qZWN0aW9uVG9rZW48VD4gfCBBYnN0cmFjdFR5cGU8VD4sIG5vdEZvdW5kVmFsdWU/OiBULCBmbGFncz86IEluamVjdEZsYWdzKTogVDtcclxuICAgIHN0YXRpYyBpbmplY3Q8VD4odG9rZW46IFR5cGU8VD4gfCBJbmplY3Rpb25Ub2tlbjxUPiB8IEFic3RyYWN0VHlwZTxUPiwgbm90Rm91bmRWYWx1ZTogbnVsbCwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IFQgfCBudWxsO1xyXG4gICAgLyoqIEBkZXByZWNhdGVkIGZyb20gdjkuMC4wIHVzZSBUZXN0QmVkLmluamVjdCAqL1xyXG4gICAgc3RhdGljIGdldDxUPih0b2tlbjogVHlwZTxUPiB8IEluamVjdGlvblRva2VuPFQ+LCBub3RGb3VuZFZhbHVlPzogVCwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IGFueTtcclxuICAgIC8qKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgZnJvbSB2OS4wLjAgdXNlIFRlc3RCZWQuaW5qZWN0XHJcbiAgICAgKiBAc3VwcHJlc3Mge2R1cGxpY2F0ZX1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldCh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlPzogYW55KTogYW55O1xyXG4gICAgc3RhdGljIGNyZWF0ZUNvbXBvbmVudDxUPihjb21wb25lbnQ6IFR5cGU8VD4pOiBDb21wb25lbnRGaXh0dXJlPFQ+O1xyXG4gICAgcHJpdmF0ZSBfaW5zdGFudGlhdGVkO1xyXG4gICAgcHJpdmF0ZSBfY29tcGlsZXI7XHJcbiAgICBwcml2YXRlIF9tb2R1bGVSZWY7XHJcbiAgICBwcml2YXRlIF9tb2R1bGVGYWN0b3J5O1xyXG4gICAgcHJpdmF0ZSBfY29tcGlsZXJPcHRpb25zO1xyXG4gICAgcHJpdmF0ZSBfbW9kdWxlT3ZlcnJpZGVzO1xyXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50T3ZlcnJpZGVzO1xyXG4gICAgcHJpdmF0ZSBfZGlyZWN0aXZlT3ZlcnJpZGVzO1xyXG4gICAgcHJpdmF0ZSBfcGlwZU92ZXJyaWRlcztcclxuICAgIHByaXZhdGUgX3Byb3ZpZGVycztcclxuICAgIHByaXZhdGUgX2RlY2xhcmF0aW9ucztcclxuICAgIHByaXZhdGUgX2ltcG9ydHM7XHJcbiAgICBwcml2YXRlIF9zY2hlbWFzO1xyXG4gICAgcHJpdmF0ZSBfYWN0aXZlRml4dHVyZXM7XHJcbiAgICBwcml2YXRlIF90ZXN0RW52QW90U3VtbWFyaWVzO1xyXG4gICAgcHJpdmF0ZSBfYW90U3VtbWFyaWVzO1xyXG4gICAgcHJpdmF0ZSBfdGVtcGxhdGVPdmVycmlkZXM7XHJcbiAgICBwcml2YXRlIF9pc1Jvb3Q7XHJcbiAgICBwcml2YXRlIF9yb290UHJvdmlkZXJPdmVycmlkZXM7XHJcbiAgICBwbGF0Zm9ybTogUGxhdGZvcm1SZWY7XHJcbiAgICBuZ01vZHVsZTogVHlwZTxhbnk+IHwgVHlwZTxhbnk+W107XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemUgdGhlIGVudmlyb25tZW50IGZvciB0ZXN0aW5nIHdpdGggYSBjb21waWxlciBmYWN0b3J5LCBhIFBsYXRmb3JtUmVmLCBhbmQgYW5cclxuICAgICAqIGFuZ3VsYXIgbW9kdWxlLiBUaGVzZSBhcmUgY29tbW9uIHRvIGV2ZXJ5IHRlc3QgaW4gdGhlIHN1aXRlLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgbWF5IG9ubHkgYmUgY2FsbGVkIG9uY2UsIHRvIHNldCB1cCB0aGUgY29tbW9uIHByb3ZpZGVycyBmb3IgdGhlIGN1cnJlbnQgdGVzdFxyXG4gICAgICogc3VpdGUgb24gdGhlIGN1cnJlbnQgcGxhdGZvcm0uIElmIHlvdSBhYnNvbHV0ZWx5IG5lZWQgdG8gY2hhbmdlIHRoZSBwcm92aWRlcnMsXHJcbiAgICAgKiBmaXJzdCB1c2UgYHJlc2V0VGVzdEVudmlyb25tZW50YC5cclxuICAgICAqXHJcbiAgICAgKiBUZXN0IG1vZHVsZXMgYW5kIHBsYXRmb3JtcyBmb3IgaW5kaXZpZHVhbCBwbGF0Zm9ybXMgYXJlIGF2YWlsYWJsZSBmcm9tXHJcbiAgICAgKiAnQGFuZ3VsYXIvPHBsYXRmb3JtX25hbWU+L3Rlc3RpbmcnLlxyXG4gICAgICovXHJcbiAgICBpbml0VGVzdEVudmlyb25tZW50KG5nTW9kdWxlOiBUeXBlPGFueT4gfCBUeXBlPGFueT5bXSwgcGxhdGZvcm06IFBsYXRmb3JtUmVmLCBhb3RTdW1tYXJpZXM/OiAoKSA9PiBhbnlbXSk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IHRoZSBwcm92aWRlcnMgZm9yIHRoZSB0ZXN0IGluamVjdG9yLlxyXG4gICAgICovXHJcbiAgICByZXNldFRlc3RFbnZpcm9ubWVudCgpOiB2b2lkO1xyXG4gICAgcmVzZXRUZXN0aW5nTW9kdWxlKCk6IHZvaWQ7XHJcbiAgICBjb25maWd1cmVDb21waWxlcihjb25maWc6IHtcclxuICAgICAgICBwcm92aWRlcnM/OiBhbnlbXTtcclxuICAgICAgICB1c2VKaXQ/OiBib29sZWFuO1xyXG4gICAgfSk6IHZvaWQ7XHJcbiAgICBjb25maWd1cmVUZXN0aW5nTW9kdWxlKG1vZHVsZURlZjogVGVzdE1vZHVsZU1ldGFkYXRhKTogdm9pZDtcclxuICAgIGNvbXBpbGVDb21wb25lbnRzKCk6IFByb21pc2U8YW55PjtcclxuICAgIHByaXZhdGUgX2luaXRJZk5lZWRlZDtcclxuICAgIHByaXZhdGUgX2NyZWF0ZUNvbXBpbGVyQW5kTW9kdWxlO1xyXG4gICAgcHJpdmF0ZSBfYXNzZXJ0Tm90SW5zdGFudGlhdGVkO1xyXG4gICAgaW5qZWN0PFQ+KHRva2VuOiBUeXBlPFQ+IHwgSW5qZWN0aW9uVG9rZW48VD4gfCBBYnN0cmFjdFR5cGU8VD4sIG5vdEZvdW5kVmFsdWU/OiBULCBmbGFncz86IEluamVjdEZsYWdzKTogVDtcclxuICAgIGluamVjdDxUPih0b2tlbjogVHlwZTxUPiB8IEluamVjdGlvblRva2VuPFQ+IHwgQWJzdHJhY3RUeXBlPFQ+LCBub3RGb3VuZFZhbHVlOiBudWxsLCBmbGFncz86IEluamVjdEZsYWdzKTogVCB8IG51bGw7XHJcbiAgICAvKiogQGRlcHJlY2F0ZWQgZnJvbSB2OS4wLjAgdXNlIFRlc3RCZWQuaW5qZWN0ICovXHJcbiAgICBnZXQ8VD4odG9rZW46IFR5cGU8VD4gfCBJbmplY3Rpb25Ub2tlbjxUPiwgbm90Rm91bmRWYWx1ZT86IFQsIGZsYWdzPzogSW5qZWN0RmxhZ3MpOiBhbnk7XHJcbiAgICAvKiogQGRlcHJlY2F0ZWQgZnJvbSB2OS4wLjAgdXNlIFRlc3RCZWQuaW5qZWN0ICovXHJcbiAgICBnZXQodG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZT86IGFueSk6IGFueTtcclxuICAgIGV4ZWN1dGUodG9rZW5zOiBhbnlbXSwgZm46IEZ1bmN0aW9uLCBjb250ZXh0PzogYW55KTogYW55O1xyXG4gICAgb3ZlcnJpZGVNb2R1bGUobmdNb2R1bGU6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8TmdNb2R1bGU+KTogdm9pZDtcclxuICAgIG92ZXJyaWRlQ29tcG9uZW50KGNvbXBvbmVudDogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxDb21wb25lbnQ+KTogdm9pZDtcclxuICAgIG92ZXJyaWRlRGlyZWN0aXZlKGRpcmVjdGl2ZTogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxEaXJlY3RpdmU+KTogdm9pZDtcclxuICAgIG92ZXJyaWRlUGlwZShwaXBlOiBUeXBlPGFueT4sIG92ZXJyaWRlOiBNZXRhZGF0YU92ZXJyaWRlPFBpcGU+KTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogT3ZlcndyaXRlcyBhbGwgcHJvdmlkZXJzIGZvciB0aGUgZ2l2ZW4gdG9rZW4gd2l0aCB0aGUgZ2l2ZW4gcHJvdmlkZXIgZGVmaW5pdGlvbi5cclxuICAgICAqL1xyXG4gICAgb3ZlcnJpZGVQcm92aWRlcih0b2tlbjogYW55LCBwcm92aWRlcjoge1xyXG4gICAgICAgIHVzZUZhY3Rvcnk6IEZ1bmN0aW9uO1xyXG4gICAgICAgIGRlcHM6IGFueVtdO1xyXG4gICAgfSk6IHZvaWQ7XHJcbiAgICBvdmVycmlkZVByb3ZpZGVyKHRva2VuOiBhbnksIHByb3ZpZGVyOiB7XHJcbiAgICAgICAgdXNlVmFsdWU6IGFueTtcclxuICAgIH0pOiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBvdmVycmlkZVByb3ZpZGVySW1wbDtcclxuICAgIG92ZXJyaWRlVGVtcGxhdGVVc2luZ1Rlc3RpbmdNb2R1bGUoY29tcG9uZW50OiBUeXBlPGFueT4sIHRlbXBsYXRlOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgY3JlYXRlQ29tcG9uZW50PFQ+KGNvbXBvbmVudDogVHlwZTxUPik6IENvbXBvbmVudEZpeHR1cmU8VD47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogQ29uZmlndXJlcyBhbmQgaW5pdGlhbGl6ZXMgZW52aXJvbm1lbnQgZm9yIHVuaXQgdGVzdGluZyBhbmQgcHJvdmlkZXMgbWV0aG9kcyBmb3JcclxuICogY3JlYXRpbmcgY29tcG9uZW50cyBhbmQgc2VydmljZXMgaW4gdW5pdCB0ZXN0cy5cclxuICpcclxuICogVGVzdEJlZCBpcyB0aGUgcHJpbWFyeSBhcGkgZm9yIHdyaXRpbmcgdW5pdCB0ZXN0cyBmb3IgQW5ndWxhciBhcHBsaWNhdGlvbnMgYW5kIGxpYnJhcmllcy5cclxuICpcclxuICogTm90ZTogVXNlIGBUZXN0QmVkYCBpbiB0ZXN0cy4gSXQgd2lsbCBiZSBzZXQgdG8gZWl0aGVyIGBUZXN0QmVkVmlld0VuZ2luZWAgb3IgYFRlc3RCZWRSZW5kZXIzYFxyXG4gKiBhY2NvcmRpbmcgdG8gdGhlIGNvbXBpbGVyIHVzZWQuXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyDJtWFuZ3VsYXJfcGFja2FnZXNfY29yZV90ZXN0aW5nX3Rlc3RpbmdfYiBpbXBsZW1lbnRzIFRlc3RCZWQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplIHRoZSBlbnZpcm9ubWVudCBmb3IgdGVzdGluZyB3aXRoIGEgY29tcGlsZXIgZmFjdG9yeSwgYSBQbGF0Zm9ybVJlZiwgYW5kIGFuXHJcbiAgICAgKiBhbmd1bGFyIG1vZHVsZS4gVGhlc2UgYXJlIGNvbW1vbiB0byBldmVyeSB0ZXN0IGluIHRoZSBzdWl0ZS5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIG1heSBvbmx5IGJlIGNhbGxlZCBvbmNlLCB0byBzZXQgdXAgdGhlIGNvbW1vbiBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHRlc3RcclxuICAgICAqIHN1aXRlIG9uIHRoZSBjdXJyZW50IHBsYXRmb3JtLiBJZiB5b3UgYWJzb2x1dGVseSBuZWVkIHRvIGNoYW5nZSB0aGUgcHJvdmlkZXJzLFxyXG4gICAgICogZmlyc3QgdXNlIGByZXNldFRlc3RFbnZpcm9ubWVudGAuXHJcbiAgICAgKlxyXG4gICAgICogVGVzdCBtb2R1bGVzIGFuZCBwbGF0Zm9ybXMgZm9yIGluZGl2aWR1YWwgcGxhdGZvcm1zIGFyZSBhdmFpbGFibGUgZnJvbVxyXG4gICAgICogJ0Bhbmd1bGFyLzxwbGF0Zm9ybV9uYW1lPi90ZXN0aW5nJy5cclxuICAgICAqXHJcbiAgICAgKiBAcHVibGljQXBpXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpbml0VGVzdEVudmlyb25tZW50KG5nTW9kdWxlOiBUeXBlPGFueT4gfCBUeXBlPGFueT5bXSwgcGxhdGZvcm06IFBsYXRmb3JtUmVmLCBhb3RTdW1tYXJpZXM/OiAoKSA9PiBhbnlbXSk6IFRlc3RCZWQ7XHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IHRoZSBwcm92aWRlcnMgZm9yIHRoZSB0ZXN0IGluamVjdG9yLlxyXG4gICAgICpcclxuICAgICAqIEBwdWJsaWNBcGlcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlc2V0VGVzdEVudmlyb25tZW50KCk6IHZvaWQ7XHJcbiAgICBzdGF0aWMgY29uZmlndXJlQ29tcGlsZXIoY29uZmlnOiB7XHJcbiAgICAgICAgcHJvdmlkZXJzPzogYW55W107XHJcbiAgICAgICAgdXNlSml0PzogYm9vbGVhbjtcclxuICAgIH0pOiBUZXN0QmVkU3RhdGljO1xyXG4gICAgLyoqXHJcbiAgICAgKiBBbGxvd3Mgb3ZlcnJpZGluZyBkZWZhdWx0IHByb3ZpZGVycywgZGlyZWN0aXZlcywgcGlwZXMsIG1vZHVsZXMgb2YgdGhlIHRlc3QgaW5qZWN0b3IsXHJcbiAgICAgKiB3aGljaCBhcmUgZGVmaW5lZCBpbiB0ZXN0X2luamVjdG9yLmpzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjb25maWd1cmVUZXN0aW5nTW9kdWxlKG1vZHVsZURlZjogVGVzdE1vZHVsZU1ldGFkYXRhKTogVGVzdEJlZFN0YXRpYztcclxuICAgIC8qKlxyXG4gICAgICogQ29tcGlsZSBjb21wb25lbnRzIHdpdGggYSBgdGVtcGxhdGVVcmxgIGZvciB0aGUgdGVzdCdzIE5nTW9kdWxlLlxyXG4gICAgICogSXQgaXMgbmVjZXNzYXJ5IHRvIGNhbGwgdGhpcyBmdW5jdGlvblxyXG4gICAgICogYXMgZmV0Y2hpbmcgdXJscyBpcyBhc3luY2hyb25vdXMuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjb21waWxlQ29tcG9uZW50cygpOiBQcm9taXNlPGFueT47XHJcbiAgICBzdGF0aWMgb3ZlcnJpZGVNb2R1bGUobmdNb2R1bGU6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8TmdNb2R1bGU+KTogVGVzdEJlZFN0YXRpYztcclxuICAgIHN0YXRpYyBvdmVycmlkZUNvbXBvbmVudChjb21wb25lbnQ6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8Q29tcG9uZW50Pik6IFRlc3RCZWRTdGF0aWM7XHJcbiAgICBzdGF0aWMgb3ZlcnJpZGVEaXJlY3RpdmUoZGlyZWN0aXZlOiBUeXBlPGFueT4sIG92ZXJyaWRlOiBNZXRhZGF0YU92ZXJyaWRlPERpcmVjdGl2ZT4pOiBUZXN0QmVkU3RhdGljO1xyXG4gICAgc3RhdGljIG92ZXJyaWRlUGlwZShwaXBlOiBUeXBlPGFueT4sIG92ZXJyaWRlOiBNZXRhZGF0YU92ZXJyaWRlPFBpcGU+KTogVGVzdEJlZFN0YXRpYztcclxuICAgIHN0YXRpYyBvdmVycmlkZVRlbXBsYXRlKGNvbXBvbmVudDogVHlwZTxhbnk+LCB0ZW1wbGF0ZTogc3RyaW5nKTogVGVzdEJlZFN0YXRpYztcclxuICAgIC8qKlxyXG4gICAgICogT3ZlcnJpZGVzIHRoZSB0ZW1wbGF0ZSBvZiB0aGUgZ2l2ZW4gY29tcG9uZW50LCBjb21waWxpbmcgdGhlIHRlbXBsYXRlXHJcbiAgICAgKiBpbiB0aGUgY29udGV4dCBvZiB0aGUgVGVzdGluZ01vZHVsZS5cclxuICAgICAqXHJcbiAgICAgKiBOb3RlOiBUaGlzIHdvcmtzIGZvciBKSVQgYW5kIEFPVGVkIGNvbXBvbmVudHMgYXMgd2VsbC5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIG92ZXJyaWRlVGVtcGxhdGVVc2luZ1Rlc3RpbmdNb2R1bGUoY29tcG9uZW50OiBUeXBlPGFueT4sIHRlbXBsYXRlOiBzdHJpbmcpOiBUZXN0QmVkU3RhdGljO1xyXG4gICAgc3RhdGljIG92ZXJyaWRlUHJvdmlkZXIodG9rZW46IGFueSwgcHJvdmlkZXI6IHtcclxuICAgICAgICB1c2VGYWN0b3J5OiBGdW5jdGlvbjtcclxuICAgICAgICBkZXBzOiBhbnlbXTtcclxuICAgIH0pOiBUZXN0QmVkU3RhdGljO1xyXG4gICAgc3RhdGljIG92ZXJyaWRlUHJvdmlkZXIodG9rZW46IGFueSwgcHJvdmlkZXI6IHtcclxuICAgICAgICB1c2VWYWx1ZTogYW55O1xyXG4gICAgfSk6IFRlc3RCZWRTdGF0aWM7XHJcbiAgICBzdGF0aWMgaW5qZWN0PFQ+KHRva2VuOiBUeXBlPFQ+IHwgSW5qZWN0aW9uVG9rZW48VD4gfCBBYnN0cmFjdFR5cGU8VD4sIG5vdEZvdW5kVmFsdWU/OiBULCBmbGFncz86IEluamVjdEZsYWdzKTogVDtcclxuICAgIHN0YXRpYyBpbmplY3Q8VD4odG9rZW46IFR5cGU8VD4gfCBJbmplY3Rpb25Ub2tlbjxUPiB8IEFic3RyYWN0VHlwZTxUPiwgbm90Rm91bmRWYWx1ZTogbnVsbCwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IFQgfCBudWxsO1xyXG4gICAgLyoqIEBkZXByZWNhdGVkIGZyb20gdjkuMC4wIHVzZSBUZXN0QmVkLmluamVjdCAqL1xyXG4gICAgc3RhdGljIGdldDxUPih0b2tlbjogVHlwZTxUPiB8IEluamVjdGlvblRva2VuPFQ+LCBub3RGb3VuZFZhbHVlPzogVCwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IGFueTtcclxuICAgIC8qKiBAZGVwcmVjYXRlZCBmcm9tIHY5LjAuMCB1c2UgVGVzdEJlZC5pbmplY3QgKi9cclxuICAgIHN0YXRpYyBnZXQodG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZT86IGFueSk6IGFueTtcclxuICAgIHN0YXRpYyBjcmVhdGVDb21wb25lbnQ8VD4oY29tcG9uZW50OiBUeXBlPFQ+KTogQ29tcG9uZW50Rml4dHVyZTxUPjtcclxuICAgIHN0YXRpYyByZXNldFRlc3RpbmdNb2R1bGUoKTogVGVzdEJlZFN0YXRpYztcclxuICAgIHBsYXRmb3JtOiBQbGF0Zm9ybVJlZjtcclxuICAgIG5nTW9kdWxlOiBUeXBlPGFueT4gfCBUeXBlPGFueT5bXTtcclxuICAgIHByaXZhdGUgX2NvbXBpbGVyO1xyXG4gICAgcHJpdmF0ZSBfdGVzdE1vZHVsZVJlZjtcclxuICAgIHByaXZhdGUgX2FjdGl2ZUZpeHR1cmVzO1xyXG4gICAgcHJpdmF0ZSBfZ2xvYmFsQ29tcGlsYXRpb25DaGVja2VkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplIHRoZSBlbnZpcm9ubWVudCBmb3IgdGVzdGluZyB3aXRoIGEgY29tcGlsZXIgZmFjdG9yeSwgYSBQbGF0Zm9ybVJlZiwgYW5kIGFuXHJcbiAgICAgKiBhbmd1bGFyIG1vZHVsZS4gVGhlc2UgYXJlIGNvbW1vbiB0byBldmVyeSB0ZXN0IGluIHRoZSBzdWl0ZS5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIG1heSBvbmx5IGJlIGNhbGxlZCBvbmNlLCB0byBzZXQgdXAgdGhlIGNvbW1vbiBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHRlc3RcclxuICAgICAqIHN1aXRlIG9uIHRoZSBjdXJyZW50IHBsYXRmb3JtLiBJZiB5b3UgYWJzb2x1dGVseSBuZWVkIHRvIGNoYW5nZSB0aGUgcHJvdmlkZXJzLFxyXG4gICAgICogZmlyc3QgdXNlIGByZXNldFRlc3RFbnZpcm9ubWVudGAuXHJcbiAgICAgKlxyXG4gICAgICogVGVzdCBtb2R1bGVzIGFuZCBwbGF0Zm9ybXMgZm9yIGluZGl2aWR1YWwgcGxhdGZvcm1zIGFyZSBhdmFpbGFibGUgZnJvbVxyXG4gICAgICogJ0Bhbmd1bGFyLzxwbGF0Zm9ybV9uYW1lPi90ZXN0aW5nJy5cclxuICAgICAqXHJcbiAgICAgKiBAcHVibGljQXBpXHJcbiAgICAgKi9cclxuICAgIGluaXRUZXN0RW52aXJvbm1lbnQobmdNb2R1bGU6IFR5cGU8YW55PiB8IFR5cGU8YW55PltdLCBwbGF0Zm9ybTogUGxhdGZvcm1SZWYsIGFvdFN1bW1hcmllcz86ICgpID0+IGFueVtdKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgdGhlIHByb3ZpZGVycyBmb3IgdGhlIHRlc3QgaW5qZWN0b3IuXHJcbiAgICAgKlxyXG4gICAgICogQHB1YmxpY0FwaVxyXG4gICAgICovXHJcbiAgICByZXNldFRlc3RFbnZpcm9ubWVudCgpOiB2b2lkO1xyXG4gICAgcmVzZXRUZXN0aW5nTW9kdWxlKCk6IHZvaWQ7XHJcbiAgICBjb25maWd1cmVDb21waWxlcihjb25maWc6IHtcclxuICAgICAgICBwcm92aWRlcnM/OiBhbnlbXTtcclxuICAgICAgICB1c2VKaXQ/OiBib29sZWFuO1xyXG4gICAgfSk6IHZvaWQ7XHJcbiAgICBjb25maWd1cmVUZXN0aW5nTW9kdWxlKG1vZHVsZURlZjogVGVzdE1vZHVsZU1ldGFkYXRhKTogdm9pZDtcclxuICAgIGNvbXBpbGVDb21wb25lbnRzKCk6IFByb21pc2U8YW55PjtcclxuICAgIGluamVjdDxUPih0b2tlbjogVHlwZTxUPiB8IEluamVjdGlvblRva2VuPFQ+IHwgQWJzdHJhY3RUeXBlPFQ+LCBub3RGb3VuZFZhbHVlPzogVCwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IFQ7XHJcbiAgICBpbmplY3Q8VD4odG9rZW46IFR5cGU8VD4gfCBJbmplY3Rpb25Ub2tlbjxUPiB8IEFic3RyYWN0VHlwZTxUPiwgbm90Rm91bmRWYWx1ZTogbnVsbCwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IFQgfCBudWxsO1xyXG4gICAgLyoqIEBkZXByZWNhdGVkIGZyb20gdjkuMC4wIHVzZSBUZXN0QmVkLmluamVjdCAqL1xyXG4gICAgZ2V0PFQ+KHRva2VuOiBUeXBlPFQ+IHwgSW5qZWN0aW9uVG9rZW48VD4sIG5vdEZvdW5kVmFsdWU/OiBULCBmbGFncz86IEluamVjdEZsYWdzKTogYW55O1xyXG4gICAgLyoqIEBkZXByZWNhdGVkIGZyb20gdjkuMC4wIHVzZSBUZXN0QmVkLmluamVjdCAqL1xyXG4gICAgZ2V0KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU/OiBhbnkpOiBhbnk7XHJcbiAgICBleGVjdXRlKHRva2VuczogYW55W10sIGZuOiBGdW5jdGlvbiwgY29udGV4dD86IGFueSk6IGFueTtcclxuICAgIG92ZXJyaWRlTW9kdWxlKG5nTW9kdWxlOiBUeXBlPGFueT4sIG92ZXJyaWRlOiBNZXRhZGF0YU92ZXJyaWRlPE5nTW9kdWxlPik6IHZvaWQ7XHJcbiAgICBvdmVycmlkZUNvbXBvbmVudChjb21wb25lbnQ6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8Q29tcG9uZW50Pik6IHZvaWQ7XHJcbiAgICBvdmVycmlkZVRlbXBsYXRlVXNpbmdUZXN0aW5nTW9kdWxlKGNvbXBvbmVudDogVHlwZTxhbnk+LCB0ZW1wbGF0ZTogc3RyaW5nKTogdm9pZDtcclxuICAgIG92ZXJyaWRlRGlyZWN0aXZlKGRpcmVjdGl2ZTogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxEaXJlY3RpdmU+KTogdm9pZDtcclxuICAgIG92ZXJyaWRlUGlwZShwaXBlOiBUeXBlPGFueT4sIG92ZXJyaWRlOiBNZXRhZGF0YU92ZXJyaWRlPFBpcGU+KTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogT3ZlcndyaXRlcyBhbGwgcHJvdmlkZXJzIGZvciB0aGUgZ2l2ZW4gdG9rZW4gd2l0aCB0aGUgZ2l2ZW4gcHJvdmlkZXIgZGVmaW5pdGlvbi5cclxuICAgICAqL1xyXG4gICAgb3ZlcnJpZGVQcm92aWRlcih0b2tlbjogYW55LCBwcm92aWRlcjoge1xyXG4gICAgICAgIHVzZUZhY3Rvcnk/OiBGdW5jdGlvbjtcclxuICAgICAgICB1c2VWYWx1ZT86IGFueTtcclxuICAgICAgICBkZXBzPzogYW55W107XHJcbiAgICB9KTogdm9pZDtcclxuICAgIGNyZWF0ZUNvbXBvbmVudDxUPih0eXBlOiBUeXBlPFQ+KTogQ29tcG9uZW50Rml4dHVyZTxUPjtcclxuICAgIHByaXZhdGUgYXNzZXJ0Tm90SW5zdGFudGlhdGVkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayB3aGV0aGVyIHRoZSBtb2R1bGUgc2NvcGluZyBxdWV1ZSBzaG91bGQgYmUgZmx1c2hlZCwgYW5kIGZsdXNoIGl0IGlmIG5lZWRlZC5cclxuICAgICAqXHJcbiAgICAgKiBXaGVuIHRoZSBUZXN0QmVkIGlzIHJlc2V0LCBpdCBjbGVhcnMgdGhlIEpJVCBtb2R1bGUgY29tcGlsYXRpb24gcXVldWUsIGNhbmNlbGxpbmcgYW55XHJcbiAgICAgKiBpbi1wcm9ncmVzcyBtb2R1bGUgY29tcGlsYXRpb24uIFRoaXMgY3JlYXRlcyBhIHBvdGVudGlhbCBoYXphcmQgLSB0aGUgdmVyeSBmaXJzdCB0aW1lIHRoZVxyXG4gICAgICogVGVzdEJlZCBpcyBpbml0aWFsaXplZCAob3IgaWYgaXQncyByZXNldCB3aXRob3V0IGJlaW5nIGluaXRpYWxpemVkKSwgdGhlcmUgbWF5IGJlIHBlbmRpbmdcclxuICAgICAqIGNvbXBpbGF0aW9ucyBvZiBtb2R1bGVzIGRlY2xhcmVkIGluIGdsb2JhbCBzY29wZS4gVGhlc2UgY29tcGlsYXRpb25zIHNob3VsZCBiZSBmaW5pc2hlZC5cclxuICAgICAqXHJcbiAgICAgKiBUbyBlbnN1cmUgdGhhdCBnbG9iYWxseSBkZWNsYXJlZCBtb2R1bGVzIGhhdmUgdGhlaXIgY29tcG9uZW50cyBzY29wZWQgcHJvcGVybHksIHRoaXMgZnVuY3Rpb25cclxuICAgICAqIGlzIGNhbGxlZCB3aGVuZXZlciBUZXN0QmVkIGlzIGluaXRpYWxpemVkIG9yIHJlc2V0LiBUaGUgX2ZpcnN0XyB0aW1lIHRoYXQgdGhpcyBoYXBwZW5zLCBwcmlvclxyXG4gICAgICogdG8gYW55IG90aGVyIG9wZXJhdGlvbnMsIHRoZSBzY29waW5nIHF1ZXVlIGlzIGZsdXNoZWQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tHbG9iYWxDb21waWxhdGlvbkZpbmlzaGVkO1xyXG4gICAgcHJpdmF0ZSBkZXN0cm95QWN0aXZlRml4dHVyZXM7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIMm1YW5ndWxhcl9wYWNrYWdlc19jb3JlX3Rlc3RpbmdfdGVzdGluZ19jKCk6IMm1YW5ndWxhcl9wYWNrYWdlc19jb3JlX3Rlc3RpbmdfdGVzdGluZ19iO1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgybVNZXRhZGF0YU92ZXJyaWRlciB7XHJcbiAgICBwcml2YXRlIF9yZWZlcmVuY2VzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIGZvciB0aGUgZ2l2ZW4gbWV0YWRhdGEgY2xhc3NcclxuICAgICAqIGJhc2VkIG9uIGFuIG9sZCBpbnN0YW5jZSBhbmQgb3ZlcnJpZGVzLlxyXG4gICAgICovXHJcbiAgICBvdmVycmlkZU1ldGFkYXRhPEMgZXh0ZW5kcyBULCBUPihtZXRhZGF0YUNsYXNzOiB7XHJcbiAgICAgICAgbmV3IChvcHRpb25zOiBUKTogQztcclxuICAgIH0sIG9sZE1ldGFkYXRhOiBDLCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxUPik6IEM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTcGVjaWFsIGludGVyZmFjZSB0byB0aGUgY29tcGlsZXIgb25seSB1c2VkIGJ5IHRlc3RpbmdcclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgybVUZXN0aW5nQ29tcGlsZXIgZXh0ZW5kcyBDb21waWxlciB7XHJcbiAgICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3I7XHJcbiAgICBvdmVycmlkZU1vZHVsZShtb2R1bGU6IFR5cGU8YW55Piwgb3ZlcnJpZGVzOiBNZXRhZGF0YU92ZXJyaWRlPE5nTW9kdWxlPik6IHZvaWQ7XHJcbiAgICBvdmVycmlkZURpcmVjdGl2ZShkaXJlY3RpdmU6IFR5cGU8YW55Piwgb3ZlcnJpZGVzOiBNZXRhZGF0YU92ZXJyaWRlPERpcmVjdGl2ZT4pOiB2b2lkO1xyXG4gICAgb3ZlcnJpZGVDb21wb25lbnQoY29tcG9uZW50OiBUeXBlPGFueT4sIG92ZXJyaWRlczogTWV0YWRhdGFPdmVycmlkZTxDb21wb25lbnQ+KTogdm9pZDtcclxuICAgIG92ZXJyaWRlUGlwZShkaXJlY3RpdmU6IFR5cGU8YW55Piwgb3ZlcnJpZGVzOiBNZXRhZGF0YU92ZXJyaWRlPFBpcGU+KTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogQWxsb3dzIHRvIHBhc3MgdGhlIGNvbXBpbGUgc3VtbWFyeSBmcm9tIEFPVCBjb21waWxhdGlvbiB0byB0aGUgSklUIGNvbXBpbGVyLFxyXG4gICAgICogc28gdGhhdCBpdCBjYW4gdXNlIHRoZSBjb2RlIGdlbmVyYXRlZCBieSBBT1QuXHJcbiAgICAgKi9cclxuICAgIGxvYWRBb3RTdW1tYXJpZXMoc3VtbWFyaWVzOiAoKSA9PiBhbnlbXSk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGNvbXBvbmVudCBmYWN0b3J5IGZvciB0aGUgZ2l2ZW4gY29tcG9uZW50LlxyXG4gICAgICogVGhpcyBhc3N1bWVzIHRoYXQgdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBjb21waWxlZCBiZWZvcmUgY2FsbGluZyB0aGlzIGNhbGwgdXNpbmdcclxuICAgICAqIGBjb21waWxlTW9kdWxlQW5kQWxsQ29tcG9uZW50cypgLlxyXG4gICAgICovXHJcbiAgICBnZXRDb21wb25lbnRGYWN0b3J5PFQ+KGNvbXBvbmVudDogVHlwZTxUPik6IENvbXBvbmVudEZhY3Rvcnk8VD47XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNvbXBvbmVudCB0eXBlIHRoYXQgaXMgc3RvcmVkIGluIHRoZSBnaXZlbiBlcnJvci5cclxuICAgICAqIFRoaXMgY2FuIGJlIHVzZWQgZm9yIGVycm9ycyBjcmVhdGVkIGJ5IGNvbXBpbGVNb2R1bGUuLi5cclxuICAgICAqL1xyXG4gICAgZ2V0Q29tcG9uZW50RnJvbUVycm9yKGVycm9yOiBFcnJvcik6IFR5cGU8YW55PiB8IG51bGw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGZhY3RvcnkgZm9yIGNyZWF0aW5nIGEgQ29tcGlsZXJcclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgYWJzdHJhY3QgY2xhc3MgybVUZXN0aW5nQ29tcGlsZXJGYWN0b3J5IHtcclxuICAgIGFic3RyYWN0IGNyZWF0ZVRlc3RpbmdDb21waWxlcihvcHRpb25zPzogQ29tcGlsZXJPcHRpb25zW10pOiDJtVRlc3RpbmdDb21waWxlcjtcclxufVxyXG5cclxuZXhwb3J0IHsgfVxyXG4iXX0=