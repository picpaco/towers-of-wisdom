/**
 * @license Angular v9.1.4
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */

import { AnimationMetadata } from '@angular/animations';
import { AnimationOptions } from '@angular/animations';
import { AnimationPlayer } from '@angular/animations';
import { AnimationTriggerMetadata } from '@angular/animations';
import { ɵStyleData } from '@angular/animations';

/**
 * @publicApi
 */
import * as ɵngcc0 from '@angular/core';
export declare abstract class AnimationDriver {
    static NOOP: AnimationDriver;
    abstract validateStyleProperty(prop: string): boolean;
    abstract matchesElement(element: any, selector: string): boolean;
    abstract containsElement(elm1: any, elm2: any): boolean;
    abstract query(element: any, selector: string, multi: boolean): any[];
    abstract computeStyle(element: any, prop: string, defaultValue?: string): string;
    abstract animate(element: any, keyframes: {
        [key: string]: string | number;
    }[], duration: number, delay: number, easing?: string | null, previousPlayers?: any[], scrubberAccessRequested?: boolean): any;
}

declare interface AnimationEngineInstruction {
    type: AnimationTransitionInstructionType;
}

declare interface AnimationTimelineInstruction extends AnimationEngineInstruction {
    element: any;
    keyframes: ɵStyleData[];
    preStyleProps: string[];
    postStyleProps: string[];
    duration: number;
    delay: number;
    totalTime: number;
    easing: string | null;
    stretchStartingKeyframe?: boolean;
    subTimeline: boolean;
}


declare const enum AnimationTransitionInstructionType {
    TransitionAnimation = 0,
    TimelineAnimation = 1
}


/**
 * DOMAnimation represents the Animation Web API.
 *
 * It is an external API by the browser, and must thus use "declare interface",
 * to prevent renaming by Closure Compiler.
 *
 * @see https://developer.mozilla.org/de/docs/Web/API/Animation
 */
declare interface DOMAnimation {
    cancel(): void;
    play(): void;
    pause(): void;
    finish(): void;
    onfinish: Function;
    position: number;
    currentTime: number;
    addEventListener(eventName: string, handler: (event: any) => any): any;
    dispatchEvent(eventName: string): any;
}

declare class ElementInstructionMap {
    private _map;
    consume(element: any): AnimationTimelineInstruction[];
    append(element: any, instructions: AnimationTimelineInstruction[]): void;
    has(element: any): boolean;
    clear(): void;
}

export declare function ɵallowPreviousPlayerStylesMerge(duration: number, delay: number): boolean;

/**
 * Designed to be executed during a keyframe-based animation to apply any special-cased styles.
 *
 * When started (when the `start()` method is run) then the provided `startStyles`
 * will be applied. When finished (when the `finish()` method is called) the
 * `endStyles` will be applied as well any any starting styles. Finally when
 * `destroy()` is called then all styles will be removed.
 */
export declare class ɵangular_packages_animations_browser_browser_a {
    private _element;
    private _startStyles;
    private _endStyles;
    static initialStylesByElement: WeakMap<any, {
        [key: string]: any;
    }>;
    private _state;
    private _initialStyles;
    constructor(_element: any, _startStyles: {
        [key: string]: any;
    } | null, _endStyles: {
        [key: string]: any;
    } | null);
    start(): void;
    finish(): void;
    destroy(): void;
}

export declare class ɵAnimation {
    private _driver;
    private _animationAst;
    constructor(_driver: AnimationDriver, input: AnimationMetadata | AnimationMetadata[]);
    buildTimelines(element: any, startingStyles: ɵStyleData | ɵStyleData[], destinationStyles: ɵStyleData | ɵStyleData[], options: AnimationOptions, subInstructions?: ElementInstructionMap): AnimationTimelineInstruction[];
}

export declare class ɵAnimationEngine {
    private bodyNode;
    private _driver;
    private _transitionEngine;
    private _timelineEngine;
    private _triggerCache;
    onRemovalComplete: (element: any, context: any) => void;
    constructor(bodyNode: any, _driver: AnimationDriver, normalizer: ɵAnimationStyleNormalizer);
    registerTrigger(componentId: string, namespaceId: string, hostElement: any, name: string, metadata: AnimationTriggerMetadata): void;
    register(namespaceId: string, hostElement: any): void;
    destroy(namespaceId: string, context: any): void;
    onInsert(namespaceId: string, element: any, parent: any, insertBefore: boolean): void;
    onRemove(namespaceId: string, element: any, context: any, isHostElement?: boolean): void;
    disableAnimations(element: any, disable: boolean): void;
    process(namespaceId: string, element: any, property: string, value: any): void;
    listen(namespaceId: string, element: any, eventName: string, eventPhase: string, callback: (event: any) => any): () => any;
    flush(microtaskId?: number): void;
    get players(): AnimationPlayer[];
    whenRenderingDone(): Promise<any>;
}


/**
 * @publicApi
 */
export declare abstract class ɵAnimationStyleNormalizer {
    abstract normalizePropertyName(propertyName: string, errors: string[]): string;
    abstract normalizeStyleValue(userProvidedProperty: string, normalizedProperty: string, value: string | number, errors: string[]): string;
}

export declare const ɵcontainsElement: (elm1: any, elm2: any) => boolean;

export declare class ɵCssKeyframesDriver implements AnimationDriver {
    private _count;
    private readonly _head;
    private _warningIssued;
    validateStyleProperty(prop: string): boolean;
    matchesElement(element: any, selector: string): boolean;
    containsElement(elm1: any, elm2: any): boolean;
    query(element: any, selector: string, multi: boolean): any[];
    computeStyle(element: any, prop: string, defaultValue?: string): string;
    buildKeyframeElement(element: any, name: string, keyframes: {
        [key: string]: any;
    }[]): any;
    animate(element: any, keyframes: ɵStyleData[], duration: number, delay: number, easing: string, previousPlayers?: AnimationPlayer[], scrubberAccessRequested?: boolean): AnimationPlayer;
    private _notifyFaultyScrubber;
}

export declare class ɵCssKeyframesPlayer implements AnimationPlayer {
    readonly element: any;
    readonly keyframes: {
        [key: string]: string | number;
    }[];
    readonly animationName: string;
    private readonly _duration;
    private readonly _delay;
    private readonly _finalStyles;
    private readonly _specialStyles?;
    private _onDoneFns;
    private _onStartFns;
    private _onDestroyFns;
    private _started;
    private _styler;
    parentPlayer: AnimationPlayer;
    readonly totalTime: number;
    readonly easing: string;
    currentSnapshot: {
        [key: string]: string;
    };
    private _state;
    constructor(element: any, keyframes: {
        [key: string]: string | number;
    }[], animationName: string, _duration: number, _delay: number, easing: string, _finalStyles: {
        [key: string]: any;
    }, _specialStyles?: ɵangular_packages_animations_browser_browser_a | null | undefined);
    onStart(fn: () => void): void;
    onDone(fn: () => void): void;
    onDestroy(fn: () => void): void;
    destroy(): void;
    private _flushDoneFns;
    private _flushStartFns;
    finish(): void;
    setPosition(value: number): void;
    getPosition(): number;
    hasStarted(): boolean;
    init(): void;
    play(): void;
    pause(): void;
    restart(): void;
    reset(): void;
    private _buildStyler;
    beforeDestroy(): void;
}

export declare const ɵinvokeQuery: (element: any, selector: string, multi: boolean) => any[];

export declare const ɵmatchesElement: (element: any, selector: string) => boolean;

/**
 * @publicApi
 */
export declare class ɵNoopAnimationDriver implements AnimationDriver {
    validateStyleProperty(prop: string): boolean;
    matchesElement(element: any, selector: string): boolean;
    containsElement(elm1: any, elm2: any): boolean;
    query(element: any, selector: string, multi: boolean): any[];
    computeStyle(element: any, prop: string, defaultValue?: string): string;
    animate(element: any, keyframes: {
        [key: string]: string | number;
    }[], duration: number, delay: number, easing: string, previousPlayers?: any[], scrubberAccessRequested?: boolean): AnimationPlayer;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ɵNoopAnimationDriver, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<ɵNoopAnimationDriver>;
}

/**
 * @publicApi
 */
export declare class ɵNoopAnimationStyleNormalizer {
    normalizePropertyName(propertyName: string, errors: string[]): string;
    normalizeStyleValue(userProvidedProperty: string, normalizedProperty: string, value: string | number, errors: string[]): string;
}

export declare function ɵsupportsWebAnimations(): boolean;

export declare function ɵvalidateStyleProperty(prop: string): boolean;

export declare class ɵWebAnimationsDriver implements AnimationDriver {
    private _isNativeImpl;
    private _cssKeyframesDriver;
    validateStyleProperty(prop: string): boolean;
    matchesElement(element: any, selector: string): boolean;
    containsElement(elm1: any, elm2: any): boolean;
    query(element: any, selector: string, multi: boolean): any[];
    computeStyle(element: any, prop: string, defaultValue?: string): string;
    overrideWebAnimationsSupport(supported: boolean): void;
    animate(element: any, keyframes: ɵStyleData[], duration: number, delay: number, easing: string, previousPlayers?: AnimationPlayer[], scrubberAccessRequested?: boolean): AnimationPlayer;
}

export declare class ɵWebAnimationsPlayer implements AnimationPlayer {
    element: any;
    keyframes: {
        [key: string]: string | number;
    }[];
    options: {
        [key: string]: string | number;
    };
    private _specialStyles?;
    private _onDoneFns;
    private _onStartFns;
    private _onDestroyFns;
    private _duration;
    private _delay;
    private _initialized;
    private _finished;
    private _started;
    private _destroyed;
    private _finalKeyframe;
    readonly domPlayer: DOMAnimation;
    time: number;
    parentPlayer: AnimationPlayer | null;
    currentSnapshot: {
        [styleName: string]: string | number;
    };
    constructor(element: any, keyframes: {
        [key: string]: string | number;
    }[], options: {
        [key: string]: string | number;
    }, _specialStyles?: ɵangular_packages_animations_browser_browser_a | null | undefined);
    private _onFinish;
    init(): void;
    private _buildPlayer;
    private _preparePlayerBeforeStart;
    onStart(fn: () => void): void;
    onDone(fn: () => void): void;
    onDestroy(fn: () => void): void;
    play(): void;
    pause(): void;
    finish(): void;
    reset(): void;
    private _resetDomPlayerState;
    restart(): void;
    hasStarted(): boolean;
    destroy(): void;
    setPosition(p: number): void;
    getPosition(): number;
    get totalTime(): number;
    beforeDestroy(): void;
}

export declare class ɵWebAnimationsStyleNormalizer extends ɵAnimationStyleNormalizer {
    normalizePropertyName(propertyName: string, errors: string[]): string;
    normalizeStyleValue(userProvidedProperty: string, normalizedProperty: string, value: string | number, errors: string[]): string;
}

export { }

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5kLnRzIiwic291cmNlcyI6WyJicm93c2VyLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2UgQW5ndWxhciB2OS4xLjRcbiAqIChjKSAyMDEwLTIwMjAgR29vZ2xlIExMQy4gaHR0cHM6Ly9hbmd1bGFyLmlvL1xuICogTGljZW5zZTogTUlUXG4gKi9cblxuaW1wb3J0IHsgQW5pbWF0aW9uTWV0YWRhdGEgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgQW5pbWF0aW9uT3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBBbmltYXRpb25QbGF5ZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IMm1U3R5bGVEYXRhIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcblxyXG4vKipcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgYWJzdHJhY3QgY2xhc3MgQW5pbWF0aW9uRHJpdmVyIHtcclxuICAgIHN0YXRpYyBOT09QOiBBbmltYXRpb25Ecml2ZXI7XHJcbiAgICBhYnN0cmFjdCB2YWxpZGF0ZVN0eWxlUHJvcGVydHkocHJvcDogc3RyaW5nKTogYm9vbGVhbjtcclxuICAgIGFic3RyYWN0IG1hdGNoZXNFbGVtZW50KGVsZW1lbnQ6IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW47XHJcbiAgICBhYnN0cmFjdCBjb250YWluc0VsZW1lbnQoZWxtMTogYW55LCBlbG0yOiBhbnkpOiBib29sZWFuO1xyXG4gICAgYWJzdHJhY3QgcXVlcnkoZWxlbWVudDogYW55LCBzZWxlY3Rvcjogc3RyaW5nLCBtdWx0aTogYm9vbGVhbik6IGFueVtdO1xyXG4gICAgYWJzdHJhY3QgY29tcHV0ZVN0eWxlKGVsZW1lbnQ6IGFueSwgcHJvcDogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBzdHJpbmcpOiBzdHJpbmc7XHJcbiAgICBhYnN0cmFjdCBhbmltYXRlKGVsZW1lbnQ6IGFueSwga2V5ZnJhbWVzOiB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgfVtdLCBkdXJhdGlvbjogbnVtYmVyLCBkZWxheTogbnVtYmVyLCBlYXNpbmc/OiBzdHJpbmcgfCBudWxsLCBwcmV2aW91c1BsYXllcnM/OiBhbnlbXSwgc2NydWJiZXJBY2Nlc3NSZXF1ZXN0ZWQ/OiBib29sZWFuKTogYW55O1xyXG59XHJcblxyXG5kZWNsYXJlIGludGVyZmFjZSBBbmltYXRpb25FbmdpbmVJbnN0cnVjdGlvbiB7XHJcbiAgICB0eXBlOiBBbmltYXRpb25UcmFuc2l0aW9uSW5zdHJ1Y3Rpb25UeXBlO1xyXG59XHJcblxyXG5kZWNsYXJlIGludGVyZmFjZSBBbmltYXRpb25UaW1lbGluZUluc3RydWN0aW9uIGV4dGVuZHMgQW5pbWF0aW9uRW5naW5lSW5zdHJ1Y3Rpb24ge1xyXG4gICAgZWxlbWVudDogYW55O1xyXG4gICAga2V5ZnJhbWVzOiDJtVN0eWxlRGF0YVtdO1xyXG4gICAgcHJlU3R5bGVQcm9wczogc3RyaW5nW107XHJcbiAgICBwb3N0U3R5bGVQcm9wczogc3RyaW5nW107XHJcbiAgICBkdXJhdGlvbjogbnVtYmVyO1xyXG4gICAgZGVsYXk6IG51bWJlcjtcclxuICAgIHRvdGFsVGltZTogbnVtYmVyO1xyXG4gICAgZWFzaW5nOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgc3RyZXRjaFN0YXJ0aW5nS2V5ZnJhbWU/OiBib29sZWFuO1xyXG4gICAgc3ViVGltZWxpbmU6IGJvb2xlYW47XHJcbn1cclxuXHJcblxyXG5kZWNsYXJlIGNvbnN0IGVudW0gQW5pbWF0aW9uVHJhbnNpdGlvbkluc3RydWN0aW9uVHlwZSB7XHJcbiAgICBUcmFuc2l0aW9uQW5pbWF0aW9uID0gMCxcclxuICAgIFRpbWVsaW5lQW5pbWF0aW9uID0gMVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIERPTUFuaW1hdGlvbiByZXByZXNlbnRzIHRoZSBBbmltYXRpb24gV2ViIEFQSS5cclxuICpcclxuICogSXQgaXMgYW4gZXh0ZXJuYWwgQVBJIGJ5IHRoZSBicm93c2VyLCBhbmQgbXVzdCB0aHVzIHVzZSBcImRlY2xhcmUgaW50ZXJmYWNlXCIsXHJcbiAqIHRvIHByZXZlbnQgcmVuYW1pbmcgYnkgQ2xvc3VyZSBDb21waWxlci5cclxuICpcclxuICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kZS9kb2NzL1dlYi9BUEkvQW5pbWF0aW9uXHJcbiAqL1xyXG5kZWNsYXJlIGludGVyZmFjZSBET01BbmltYXRpb24ge1xyXG4gICAgY2FuY2VsKCk6IHZvaWQ7XHJcbiAgICBwbGF5KCk6IHZvaWQ7XHJcbiAgICBwYXVzZSgpOiB2b2lkO1xyXG4gICAgZmluaXNoKCk6IHZvaWQ7XHJcbiAgICBvbmZpbmlzaDogRnVuY3Rpb247XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgY3VycmVudFRpbWU6IG51bWJlcjtcclxuICAgIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IChldmVudDogYW55KSA9PiBhbnkpOiBhbnk7XHJcbiAgICBkaXNwYXRjaEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nKTogYW55O1xyXG59XHJcblxyXG5kZWNsYXJlIGNsYXNzIEVsZW1lbnRJbnN0cnVjdGlvbk1hcCB7XHJcbiAgICBwcml2YXRlIF9tYXA7XHJcbiAgICBjb25zdW1lKGVsZW1lbnQ6IGFueSk6IEFuaW1hdGlvblRpbWVsaW5lSW5zdHJ1Y3Rpb25bXTtcclxuICAgIGFwcGVuZChlbGVtZW50OiBhbnksIGluc3RydWN0aW9uczogQW5pbWF0aW9uVGltZWxpbmVJbnN0cnVjdGlvbltdKTogdm9pZDtcclxuICAgIGhhcyhlbGVtZW50OiBhbnkpOiBib29sZWFuO1xyXG4gICAgY2xlYXIoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gybVhbGxvd1ByZXZpb3VzUGxheWVyU3R5bGVzTWVyZ2UoZHVyYXRpb246IG51bWJlciwgZGVsYXk6IG51bWJlcik6IGJvb2xlYW47XHJcblxyXG4vKipcclxuICogRGVzaWduZWQgdG8gYmUgZXhlY3V0ZWQgZHVyaW5nIGEga2V5ZnJhbWUtYmFzZWQgYW5pbWF0aW9uIHRvIGFwcGx5IGFueSBzcGVjaWFsLWNhc2VkIHN0eWxlcy5cclxuICpcclxuICogV2hlbiBzdGFydGVkICh3aGVuIHRoZSBgc3RhcnQoKWAgbWV0aG9kIGlzIHJ1bikgdGhlbiB0aGUgcHJvdmlkZWQgYHN0YXJ0U3R5bGVzYFxyXG4gKiB3aWxsIGJlIGFwcGxpZWQuIFdoZW4gZmluaXNoZWQgKHdoZW4gdGhlIGBmaW5pc2goKWAgbWV0aG9kIGlzIGNhbGxlZCkgdGhlXHJcbiAqIGBlbmRTdHlsZXNgIHdpbGwgYmUgYXBwbGllZCBhcyB3ZWxsIGFueSBhbnkgc3RhcnRpbmcgc3R5bGVzLiBGaW5hbGx5IHdoZW5cclxuICogYGRlc3Ryb3koKWAgaXMgY2FsbGVkIHRoZW4gYWxsIHN0eWxlcyB3aWxsIGJlIHJlbW92ZWQuXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyDJtWFuZ3VsYXJfcGFja2FnZXNfYW5pbWF0aW9uc19icm93c2VyX2Jyb3dzZXJfYSB7XHJcbiAgICBwcml2YXRlIF9lbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfc3RhcnRTdHlsZXM7XHJcbiAgICBwcml2YXRlIF9lbmRTdHlsZXM7XHJcbiAgICBzdGF0aWMgaW5pdGlhbFN0eWxlc0J5RWxlbWVudDogV2Vha01hcDxhbnksIHtcclxuICAgICAgICBba2V5OiBzdHJpbmddOiBhbnk7XHJcbiAgICB9PjtcclxuICAgIHByaXZhdGUgX3N0YXRlO1xyXG4gICAgcHJpdmF0ZSBfaW5pdGlhbFN0eWxlcztcclxuICAgIGNvbnN0cnVjdG9yKF9lbGVtZW50OiBhbnksIF9zdGFydFN0eWxlczoge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZ106IGFueTtcclxuICAgIH0gfCBudWxsLCBfZW5kU3R5bGVzOiB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogYW55O1xyXG4gICAgfSB8IG51bGwpO1xyXG4gICAgc3RhcnQoKTogdm9pZDtcclxuICAgIGZpbmlzaCgpOiB2b2lkO1xyXG4gICAgZGVzdHJveSgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyDJtUFuaW1hdGlvbiB7XHJcbiAgICBwcml2YXRlIF9kcml2ZXI7XHJcbiAgICBwcml2YXRlIF9hbmltYXRpb25Bc3Q7XHJcbiAgICBjb25zdHJ1Y3RvcihfZHJpdmVyOiBBbmltYXRpb25Ecml2ZXIsIGlucHV0OiBBbmltYXRpb25NZXRhZGF0YSB8IEFuaW1hdGlvbk1ldGFkYXRhW10pO1xyXG4gICAgYnVpbGRUaW1lbGluZXMoZWxlbWVudDogYW55LCBzdGFydGluZ1N0eWxlczogybVTdHlsZURhdGEgfCDJtVN0eWxlRGF0YVtdLCBkZXN0aW5hdGlvblN0eWxlczogybVTdHlsZURhdGEgfCDJtVN0eWxlRGF0YVtdLCBvcHRpb25zOiBBbmltYXRpb25PcHRpb25zLCBzdWJJbnN0cnVjdGlvbnM/OiBFbGVtZW50SW5zdHJ1Y3Rpb25NYXApOiBBbmltYXRpb25UaW1lbGluZUluc3RydWN0aW9uW107XHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIMm1QW5pbWF0aW9uRW5naW5lIHtcclxuICAgIHByaXZhdGUgYm9keU5vZGU7XHJcbiAgICBwcml2YXRlIF9kcml2ZXI7XHJcbiAgICBwcml2YXRlIF90cmFuc2l0aW9uRW5naW5lO1xyXG4gICAgcHJpdmF0ZSBfdGltZWxpbmVFbmdpbmU7XHJcbiAgICBwcml2YXRlIF90cmlnZ2VyQ2FjaGU7XHJcbiAgICBvblJlbW92YWxDb21wbGV0ZTogKGVsZW1lbnQ6IGFueSwgY29udGV4dDogYW55KSA9PiB2b2lkO1xyXG4gICAgY29uc3RydWN0b3IoYm9keU5vZGU6IGFueSwgX2RyaXZlcjogQW5pbWF0aW9uRHJpdmVyLCBub3JtYWxpemVyOiDJtUFuaW1hdGlvblN0eWxlTm9ybWFsaXplcik7XHJcbiAgICByZWdpc3RlclRyaWdnZXIoY29tcG9uZW50SWQ6IHN0cmluZywgbmFtZXNwYWNlSWQ6IHN0cmluZywgaG9zdEVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCBtZXRhZGF0YTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhKTogdm9pZDtcclxuICAgIHJlZ2lzdGVyKG5hbWVzcGFjZUlkOiBzdHJpbmcsIGhvc3RFbGVtZW50OiBhbnkpOiB2b2lkO1xyXG4gICAgZGVzdHJveShuYW1lc3BhY2VJZDogc3RyaW5nLCBjb250ZXh0OiBhbnkpOiB2b2lkO1xyXG4gICAgb25JbnNlcnQobmFtZXNwYWNlSWQ6IHN0cmluZywgZWxlbWVudDogYW55LCBwYXJlbnQ6IGFueSwgaW5zZXJ0QmVmb3JlOiBib29sZWFuKTogdm9pZDtcclxuICAgIG9uUmVtb3ZlKG5hbWVzcGFjZUlkOiBzdHJpbmcsIGVsZW1lbnQ6IGFueSwgY29udGV4dDogYW55LCBpc0hvc3RFbGVtZW50PzogYm9vbGVhbik6IHZvaWQ7XHJcbiAgICBkaXNhYmxlQW5pbWF0aW9ucyhlbGVtZW50OiBhbnksIGRpc2FibGU6IGJvb2xlYW4pOiB2b2lkO1xyXG4gICAgcHJvY2VzcyhuYW1lc3BhY2VJZDogc3RyaW5nLCBlbGVtZW50OiBhbnksIHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkO1xyXG4gICAgbGlzdGVuKG5hbWVzcGFjZUlkOiBzdHJpbmcsIGVsZW1lbnQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIGV2ZW50UGhhc2U6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiBhbnkpOiAoKSA9PiBhbnk7XHJcbiAgICBmbHVzaChtaWNyb3Rhc2tJZD86IG51bWJlcik6IHZvaWQ7XHJcbiAgICBnZXQgcGxheWVycygpOiBBbmltYXRpb25QbGF5ZXJbXTtcclxuICAgIHdoZW5SZW5kZXJpbmdEb25lKCk6IFByb21pc2U8YW55PjtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBhYnN0cmFjdCBjbGFzcyDJtUFuaW1hdGlvblN0eWxlTm9ybWFsaXplciB7XHJcbiAgICBhYnN0cmFjdCBub3JtYWxpemVQcm9wZXJ0eU5hbWUocHJvcGVydHlOYW1lOiBzdHJpbmcsIGVycm9yczogc3RyaW5nW10pOiBzdHJpbmc7XHJcbiAgICBhYnN0cmFjdCBub3JtYWxpemVTdHlsZVZhbHVlKHVzZXJQcm92aWRlZFByb3BlcnR5OiBzdHJpbmcsIG5vcm1hbGl6ZWRQcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyLCBlcnJvcnM6IHN0cmluZ1tdKTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSBjb25zdCDJtWNvbnRhaW5zRWxlbWVudDogKGVsbTE6IGFueSwgZWxtMjogYW55KSA9PiBib29sZWFuO1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgybVDc3NLZXlmcmFtZXNEcml2ZXIgaW1wbGVtZW50cyBBbmltYXRpb25Ecml2ZXIge1xyXG4gICAgcHJpdmF0ZSBfY291bnQ7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9oZWFkO1xyXG4gICAgcHJpdmF0ZSBfd2FybmluZ0lzc3VlZDtcclxuICAgIHZhbGlkYXRlU3R5bGVQcm9wZXJ0eShwcm9wOiBzdHJpbmcpOiBib29sZWFuO1xyXG4gICAgbWF0Y2hlc0VsZW1lbnQoZWxlbWVudDogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbjtcclxuICAgIGNvbnRhaW5zRWxlbWVudChlbG0xOiBhbnksIGVsbTI6IGFueSk6IGJvb2xlYW47XHJcbiAgICBxdWVyeShlbGVtZW50OiBhbnksIHNlbGVjdG9yOiBzdHJpbmcsIG11bHRpOiBib29sZWFuKTogYW55W107XHJcbiAgICBjb21wdXRlU3R5bGUoZWxlbWVudDogYW55LCBwcm9wOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IHN0cmluZyk6IHN0cmluZztcclxuICAgIGJ1aWxkS2V5ZnJhbWVFbGVtZW50KGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCBrZXlmcmFtZXM6IHtcclxuICAgICAgICBba2V5OiBzdHJpbmddOiBhbnk7XHJcbiAgICB9W10pOiBhbnk7XHJcbiAgICBhbmltYXRlKGVsZW1lbnQ6IGFueSwga2V5ZnJhbWVzOiDJtVN0eWxlRGF0YVtdLCBkdXJhdGlvbjogbnVtYmVyLCBkZWxheTogbnVtYmVyLCBlYXNpbmc6IHN0cmluZywgcHJldmlvdXNQbGF5ZXJzPzogQW5pbWF0aW9uUGxheWVyW10sIHNjcnViYmVyQWNjZXNzUmVxdWVzdGVkPzogYm9vbGVhbik6IEFuaW1hdGlvblBsYXllcjtcclxuICAgIHByaXZhdGUgX25vdGlmeUZhdWx0eVNjcnViYmVyO1xyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyDJtUNzc0tleWZyYW1lc1BsYXllciBpbXBsZW1lbnRzIEFuaW1hdGlvblBsYXllciB7XHJcbiAgICByZWFkb25seSBlbGVtZW50OiBhbnk7XHJcbiAgICByZWFkb25seSBrZXlmcmFtZXM6IHtcclxuICAgICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICB9W107XHJcbiAgICByZWFkb25seSBhbmltYXRpb25OYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kdXJhdGlvbjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2RlbGF5O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZmluYWxTdHlsZXM7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zcGVjaWFsU3R5bGVzPztcclxuICAgIHByaXZhdGUgX29uRG9uZUZucztcclxuICAgIHByaXZhdGUgX29uU3RhcnRGbnM7XHJcbiAgICBwcml2YXRlIF9vbkRlc3Ryb3lGbnM7XHJcbiAgICBwcml2YXRlIF9zdGFydGVkO1xyXG4gICAgcHJpdmF0ZSBfc3R5bGVyO1xyXG4gICAgcGFyZW50UGxheWVyOiBBbmltYXRpb25QbGF5ZXI7XHJcbiAgICByZWFkb25seSB0b3RhbFRpbWU6IG51bWJlcjtcclxuICAgIHJlYWRvbmx5IGVhc2luZzogc3RyaW5nO1xyXG4gICAgY3VycmVudFNuYXBzaG90OiB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xyXG4gICAgfTtcclxuICAgIHByaXZhdGUgX3N0YXRlO1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogYW55LCBrZXlmcmFtZXM6IHtcclxuICAgICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICB9W10sIGFuaW1hdGlvbk5hbWU6IHN0cmluZywgX2R1cmF0aW9uOiBudW1iZXIsIF9kZWxheTogbnVtYmVyLCBlYXNpbmc6IHN0cmluZywgX2ZpbmFsU3R5bGVzOiB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogYW55O1xyXG4gICAgfSwgX3NwZWNpYWxTdHlsZXM/OiDJtWFuZ3VsYXJfcGFja2FnZXNfYW5pbWF0aW9uc19icm93c2VyX2Jyb3dzZXJfYSB8IG51bGwgfCB1bmRlZmluZWQpO1xyXG4gICAgb25TdGFydChmbjogKCkgPT4gdm9pZCk6IHZvaWQ7XHJcbiAgICBvbkRvbmUoZm46ICgpID0+IHZvaWQpOiB2b2lkO1xyXG4gICAgb25EZXN0cm95KGZuOiAoKSA9PiB2b2lkKTogdm9pZDtcclxuICAgIGRlc3Ryb3koKTogdm9pZDtcclxuICAgIHByaXZhdGUgX2ZsdXNoRG9uZUZucztcclxuICAgIHByaXZhdGUgX2ZsdXNoU3RhcnRGbnM7XHJcbiAgICBmaW5pc2goKTogdm9pZDtcclxuICAgIHNldFBvc2l0aW9uKHZhbHVlOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgZ2V0UG9zaXRpb24oKTogbnVtYmVyO1xyXG4gICAgaGFzU3RhcnRlZCgpOiBib29sZWFuO1xyXG4gICAgaW5pdCgpOiB2b2lkO1xyXG4gICAgcGxheSgpOiB2b2lkO1xyXG4gICAgcGF1c2UoKTogdm9pZDtcclxuICAgIHJlc3RhcnQoKTogdm9pZDtcclxuICAgIHJlc2V0KCk6IHZvaWQ7XHJcbiAgICBwcml2YXRlIF9idWlsZFN0eWxlcjtcclxuICAgIGJlZm9yZURlc3Ryb3koKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGRlY2xhcmUgY29uc3QgybVpbnZva2VRdWVyeTogKGVsZW1lbnQ6IGFueSwgc2VsZWN0b3I6IHN0cmluZywgbXVsdGk6IGJvb2xlYW4pID0+IGFueVtdO1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgY29uc3QgybVtYXRjaGVzRWxlbWVudDogKGVsZW1lbnQ6IGFueSwgc2VsZWN0b3I6IHN0cmluZykgPT4gYm9vbGVhbjtcclxuXHJcbi8qKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyDJtU5vb3BBbmltYXRpb25Ecml2ZXIgaW1wbGVtZW50cyBBbmltYXRpb25Ecml2ZXIge1xyXG4gICAgdmFsaWRhdGVTdHlsZVByb3BlcnR5KHByb3A6IHN0cmluZyk6IGJvb2xlYW47XHJcbiAgICBtYXRjaGVzRWxlbWVudChlbGVtZW50OiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuO1xyXG4gICAgY29udGFpbnNFbGVtZW50KGVsbTE6IGFueSwgZWxtMjogYW55KTogYm9vbGVhbjtcclxuICAgIHF1ZXJ5KGVsZW1lbnQ6IGFueSwgc2VsZWN0b3I6IHN0cmluZywgbXVsdGk6IGJvb2xlYW4pOiBhbnlbXTtcclxuICAgIGNvbXB1dGVTdHlsZShlbGVtZW50OiBhbnksIHByb3A6IHN0cmluZywgZGVmYXVsdFZhbHVlPzogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgYW5pbWF0ZShlbGVtZW50OiBhbnksIGtleWZyYW1lczoge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcjtcclxuICAgIH1bXSwgZHVyYXRpb246IG51bWJlciwgZGVsYXk6IG51bWJlciwgZWFzaW5nOiBzdHJpbmcsIHByZXZpb3VzUGxheWVycz86IGFueVtdLCBzY3J1YmJlckFjY2Vzc1JlcXVlc3RlZD86IGJvb2xlYW4pOiBBbmltYXRpb25QbGF5ZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyDJtU5vb3BBbmltYXRpb25TdHlsZU5vcm1hbGl6ZXIge1xyXG4gICAgbm9ybWFsaXplUHJvcGVydHlOYW1lKHByb3BlcnR5TmFtZTogc3RyaW5nLCBlcnJvcnM6IHN0cmluZ1tdKTogc3RyaW5nO1xyXG4gICAgbm9ybWFsaXplU3R5bGVWYWx1ZSh1c2VyUHJvdmlkZWRQcm9wZXJ0eTogc3RyaW5nLCBub3JtYWxpemVkUHJvcGVydHk6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bWJlciwgZXJyb3JzOiBzdHJpbmdbXSk6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gybVzdXBwb3J0c1dlYkFuaW1hdGlvbnMoKTogYm9vbGVhbjtcclxuXHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIMm1dmFsaWRhdGVTdHlsZVByb3BlcnR5KHByb3A6IHN0cmluZyk6IGJvb2xlYW47XHJcblxyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyDJtVdlYkFuaW1hdGlvbnNEcml2ZXIgaW1wbGVtZW50cyBBbmltYXRpb25Ecml2ZXIge1xyXG4gICAgcHJpdmF0ZSBfaXNOYXRpdmVJbXBsO1xyXG4gICAgcHJpdmF0ZSBfY3NzS2V5ZnJhbWVzRHJpdmVyO1xyXG4gICAgdmFsaWRhdGVTdHlsZVByb3BlcnR5KHByb3A6IHN0cmluZyk6IGJvb2xlYW47XHJcbiAgICBtYXRjaGVzRWxlbWVudChlbGVtZW50OiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuO1xyXG4gICAgY29udGFpbnNFbGVtZW50KGVsbTE6IGFueSwgZWxtMjogYW55KTogYm9vbGVhbjtcclxuICAgIHF1ZXJ5KGVsZW1lbnQ6IGFueSwgc2VsZWN0b3I6IHN0cmluZywgbXVsdGk6IGJvb2xlYW4pOiBhbnlbXTtcclxuICAgIGNvbXB1dGVTdHlsZShlbGVtZW50OiBhbnksIHByb3A6IHN0cmluZywgZGVmYXVsdFZhbHVlPzogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgb3ZlcnJpZGVXZWJBbmltYXRpb25zU3VwcG9ydChzdXBwb3J0ZWQ6IGJvb2xlYW4pOiB2b2lkO1xyXG4gICAgYW5pbWF0ZShlbGVtZW50OiBhbnksIGtleWZyYW1lczogybVTdHlsZURhdGFbXSwgZHVyYXRpb246IG51bWJlciwgZGVsYXk6IG51bWJlciwgZWFzaW5nOiBzdHJpbmcsIHByZXZpb3VzUGxheWVycz86IEFuaW1hdGlvblBsYXllcltdLCBzY3J1YmJlckFjY2Vzc1JlcXVlc3RlZD86IGJvb2xlYW4pOiBBbmltYXRpb25QbGF5ZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIMm1V2ViQW5pbWF0aW9uc1BsYXllciBpbXBsZW1lbnRzIEFuaW1hdGlvblBsYXllciB7XHJcbiAgICBlbGVtZW50OiBhbnk7XHJcbiAgICBrZXlmcmFtZXM6IHtcclxuICAgICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICB9W107XHJcbiAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgfTtcclxuICAgIHByaXZhdGUgX3NwZWNpYWxTdHlsZXM/O1xyXG4gICAgcHJpdmF0ZSBfb25Eb25lRm5zO1xyXG4gICAgcHJpdmF0ZSBfb25TdGFydEZucztcclxuICAgIHByaXZhdGUgX29uRGVzdHJveUZucztcclxuICAgIHByaXZhdGUgX2R1cmF0aW9uO1xyXG4gICAgcHJpdmF0ZSBfZGVsYXk7XHJcbiAgICBwcml2YXRlIF9pbml0aWFsaXplZDtcclxuICAgIHByaXZhdGUgX2ZpbmlzaGVkO1xyXG4gICAgcHJpdmF0ZSBfc3RhcnRlZDtcclxuICAgIHByaXZhdGUgX2Rlc3Ryb3llZDtcclxuICAgIHByaXZhdGUgX2ZpbmFsS2V5ZnJhbWU7XHJcbiAgICByZWFkb25seSBkb21QbGF5ZXI6IERPTUFuaW1hdGlvbjtcclxuICAgIHRpbWU6IG51bWJlcjtcclxuICAgIHBhcmVudFBsYXllcjogQW5pbWF0aW9uUGxheWVyIHwgbnVsbDtcclxuICAgIGN1cnJlbnRTbmFwc2hvdDoge1xyXG4gICAgICAgIFtzdHlsZU5hbWU6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcjtcclxuICAgIH07XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBhbnksIGtleWZyYW1lczoge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcjtcclxuICAgIH1bXSwgb3B0aW9uczoge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcjtcclxuICAgIH0sIF9zcGVjaWFsU3R5bGVzPzogybVhbmd1bGFyX3BhY2thZ2VzX2FuaW1hdGlvbnNfYnJvd3Nlcl9icm93c2VyX2EgfCBudWxsIHwgdW5kZWZpbmVkKTtcclxuICAgIHByaXZhdGUgX29uRmluaXNoO1xyXG4gICAgaW5pdCgpOiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBfYnVpbGRQbGF5ZXI7XHJcbiAgICBwcml2YXRlIF9wcmVwYXJlUGxheWVyQmVmb3JlU3RhcnQ7XHJcbiAgICBvblN0YXJ0KGZuOiAoKSA9PiB2b2lkKTogdm9pZDtcclxuICAgIG9uRG9uZShmbjogKCkgPT4gdm9pZCk6IHZvaWQ7XHJcbiAgICBvbkRlc3Ryb3koZm46ICgpID0+IHZvaWQpOiB2b2lkO1xyXG4gICAgcGxheSgpOiB2b2lkO1xyXG4gICAgcGF1c2UoKTogdm9pZDtcclxuICAgIGZpbmlzaCgpOiB2b2lkO1xyXG4gICAgcmVzZXQoKTogdm9pZDtcclxuICAgIHByaXZhdGUgX3Jlc2V0RG9tUGxheWVyU3RhdGU7XHJcbiAgICByZXN0YXJ0KCk6IHZvaWQ7XHJcbiAgICBoYXNTdGFydGVkKCk6IGJvb2xlYW47XHJcbiAgICBkZXN0cm95KCk6IHZvaWQ7XHJcbiAgICBzZXRQb3NpdGlvbihwOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgZ2V0UG9zaXRpb24oKTogbnVtYmVyO1xyXG4gICAgZ2V0IHRvdGFsVGltZSgpOiBudW1iZXI7XHJcbiAgICBiZWZvcmVEZXN0cm95KCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIMm1V2ViQW5pbWF0aW9uc1N0eWxlTm9ybWFsaXplciBleHRlbmRzIMm1QW5pbWF0aW9uU3R5bGVOb3JtYWxpemVyIHtcclxuICAgIG5vcm1hbGl6ZVByb3BlcnR5TmFtZShwcm9wZXJ0eU5hbWU6IHN0cmluZywgZXJyb3JzOiBzdHJpbmdbXSk6IHN0cmluZztcclxuICAgIG5vcm1hbGl6ZVN0eWxlVmFsdWUodXNlclByb3ZpZGVkUHJvcGVydHk6IHN0cmluZywgbm9ybWFsaXplZFByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIGVycm9yczogc3RyaW5nW10pOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCB7IH1cclxuIl19