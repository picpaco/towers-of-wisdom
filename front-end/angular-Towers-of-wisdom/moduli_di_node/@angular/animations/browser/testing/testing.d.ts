/**
 * @license Angular v9.1.4
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */

import { AnimationDriver } from '@angular/animations/browser';
import { AnimationPlayer } from '@angular/animations';
import { NoopAnimationPlayer } from '@angular/animations';
import { ɵStyleData } from '@angular/animations';

/**
 * @publicApi
 */
export declare class MockAnimationDriver implements AnimationDriver {
    static log: AnimationPlayer[];
    validateStyleProperty(prop: string): boolean;
    matchesElement(element: any, selector: string): boolean;
    containsElement(elm1: any, elm2: any): boolean;
    query(element: any, selector: string, multi: boolean): any[];
    computeStyle(element: any, prop: string, defaultValue?: string): string;
    animate(element: any, keyframes: {
        [key: string]: string | number;
    }[], duration: number, delay: number, easing: string, previousPlayers?: any[]): MockAnimationPlayer;
}

/**
 * @publicApi
 */
export declare class MockAnimationPlayer extends NoopAnimationPlayer {
    element: any;
    keyframes: {
        [key: string]: string | number;
    }[];
    duration: number;
    delay: number;
    easing: string;
    previousPlayers: any[];
    private __finished;
    private __started;
    previousStyles: {
        [key: string]: string | number;
    };
    private _onInitFns;
    currentSnapshot: ɵStyleData;
    constructor(element: any, keyframes: {
        [key: string]: string | number;
    }[], duration: number, delay: number, easing: string, previousPlayers: any[]);
    finish(): void;
    destroy(): void;
    play(): void;
    hasStarted(): boolean;
    beforeDestroy(): void;
}

export { }

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5kLnRzIiwic291cmNlcyI6WyJ0ZXN0aW5nLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2UgQW5ndWxhciB2OS4xLjRcbiAqIChjKSAyMDEwLTIwMjAgR29vZ2xlIExMQy4gaHR0cHM6Ly9hbmd1bGFyLmlvL1xuICogTGljZW5zZTogTUlUXG4gKi9cblxuaW1wb3J0IHsgQW5pbWF0aW9uRHJpdmVyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucy9icm93c2VyJztcclxuaW1wb3J0IHsgQW5pbWF0aW9uUGxheWVyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IE5vb3BBbmltYXRpb25QbGF5ZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgybVTdHlsZURhdGEgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuXHJcbi8qKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBNb2NrQW5pbWF0aW9uRHJpdmVyIGltcGxlbWVudHMgQW5pbWF0aW9uRHJpdmVyIHtcclxuICAgIHN0YXRpYyBsb2c6IEFuaW1hdGlvblBsYXllcltdO1xyXG4gICAgdmFsaWRhdGVTdHlsZVByb3BlcnR5KHByb3A6IHN0cmluZyk6IGJvb2xlYW47XHJcbiAgICBtYXRjaGVzRWxlbWVudChlbGVtZW50OiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuO1xyXG4gICAgY29udGFpbnNFbGVtZW50KGVsbTE6IGFueSwgZWxtMjogYW55KTogYm9vbGVhbjtcclxuICAgIHF1ZXJ5KGVsZW1lbnQ6IGFueSwgc2VsZWN0b3I6IHN0cmluZywgbXVsdGk6IGJvb2xlYW4pOiBhbnlbXTtcclxuICAgIGNvbXB1dGVTdHlsZShlbGVtZW50OiBhbnksIHByb3A6IHN0cmluZywgZGVmYXVsdFZhbHVlPzogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgYW5pbWF0ZShlbGVtZW50OiBhbnksIGtleWZyYW1lczoge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcjtcclxuICAgIH1bXSwgZHVyYXRpb246IG51bWJlciwgZGVsYXk6IG51bWJlciwgZWFzaW5nOiBzdHJpbmcsIHByZXZpb3VzUGxheWVycz86IGFueVtdKTogTW9ja0FuaW1hdGlvblBsYXllcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1vY2tBbmltYXRpb25QbGF5ZXIgZXh0ZW5kcyBOb29wQW5pbWF0aW9uUGxheWVyIHtcclxuICAgIGVsZW1lbnQ6IGFueTtcclxuICAgIGtleWZyYW1lczoge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcjtcclxuICAgIH1bXTtcclxuICAgIGR1cmF0aW9uOiBudW1iZXI7XHJcbiAgICBkZWxheTogbnVtYmVyO1xyXG4gICAgZWFzaW5nOiBzdHJpbmc7XHJcbiAgICBwcmV2aW91c1BsYXllcnM6IGFueVtdO1xyXG4gICAgcHJpdmF0ZSBfX2ZpbmlzaGVkO1xyXG4gICAgcHJpdmF0ZSBfX3N0YXJ0ZWQ7XHJcbiAgICBwcmV2aW91c1N0eWxlczoge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcjtcclxuICAgIH07XHJcbiAgICBwcml2YXRlIF9vbkluaXRGbnM7XHJcbiAgICBjdXJyZW50U25hcHNob3Q6IMm1U3R5bGVEYXRhO1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogYW55LCBrZXlmcmFtZXM6IHtcclxuICAgICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICB9W10sIGR1cmF0aW9uOiBudW1iZXIsIGRlbGF5OiBudW1iZXIsIGVhc2luZzogc3RyaW5nLCBwcmV2aW91c1BsYXllcnM6IGFueVtdKTtcclxuICAgIGZpbmlzaCgpOiB2b2lkO1xyXG4gICAgZGVzdHJveSgpOiB2b2lkO1xyXG4gICAgcGxheSgpOiB2b2lkO1xyXG4gICAgaGFzU3RhcnRlZCgpOiBib29sZWFuO1xyXG4gICAgYmVmb3JlRGVzdHJveSgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgeyB9XHJcbiJdfQ==