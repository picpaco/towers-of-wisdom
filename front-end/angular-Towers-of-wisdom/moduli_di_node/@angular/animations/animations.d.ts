/**
 * @license Angular v9.1.4
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */


/**
 * Defines an animation step that combines styling information with timing information.
 *
 * @param timings Sets `AnimateTimings` for the parent animation.
 * A string in the format "duration [delay] [easing]".
 *  - Duration and delay are expressed as a number and optional time unit,
 * such as "1s" or "10ms" for one second and 10 milliseconds, respectively.
 * The default unit is milliseconds.
 *  - The easing value controls how the animation accelerates and decelerates
 * during its runtime. Value is one of  `ease`, `ease-in`, `ease-out`,
 * `ease-in-out`, or a `cubic-bezier()` function call.
 * If not supplied, no easing is applied.
 *
 * For example, the string "1s 100ms ease-out" specifies a duration of
 * 1000 milliseconds, and delay of 100 ms, and the "ease-out" easing style,
 * which decelerates near the end of the duration.
 * @param styles Sets AnimationStyles for the parent animation.
 * A function call to either `style()` or `keyframes()`
 * that returns a collection of CSS style entries to be applied to the parent animation.
 * When null, uses the styles from the destination state.
 * This is useful when describing an animation step that will complete an animation;
 * see "Animating to the final state" in `transitions()`.
 * @returns An object that encapsulates the animation step.
 *
 * @usageNotes
 * Call within an animation `sequence()`, `{@link animations/group group()}`, or
 * `transition()` call to specify an animation step
 * that applies given style data to the parent animation for a given amount of time.
 *
 * ### Syntax Examples
 * **Timing examples**
 *
 * The following examples show various `timings` specifications.
 * - `animate(500)` : Duration is 500 milliseconds.
 * - `animate("1s")` : Duration is 1000 milliseconds.
 * - `animate("100ms 0.5s")` : Duration is 100 milliseconds, delay is 500 milliseconds.
 * - `animate("5s ease-in")` : Duration is 5000 milliseconds, easing in.
 * - `animate("5s 10ms cubic-bezier(.17,.67,.88,.1)")` : Duration is 5000 milliseconds, delay is 10
 * milliseconds, easing according to a bezier curve.
 *
 * **Style examples**
 *
 * The following example calls `style()` to set a single CSS style.
 * ```typescript
 * animate(500, style({ background: "red" }))
 * ```
 * The following example calls `keyframes()` to set a CSS style
 * to different values for successive keyframes.
 * ```typescript
 * animate(500, keyframes(
 *  [
 *   style({ background: "blue" })),
 *   style({ background: "red" }))
 *  ])
 * ```
 *
 * @publicApi
 */
export declare function animate(timings: string | number, styles?: AnimationStyleMetadata | AnimationKeyframesSequenceMetadata | null): AnimationAnimateMetadata;

/**
 * Executes a queried inner animation element within an animation sequence.
 *
 * @param options An options object that can contain a delay value for the start of the
 * animation, and additional override values for developer-defined parameters.
 * @return An object that encapsulates the child animation data.
 *
 * @usageNotes
 * Each time an animation is triggered in Angular, the parent animation
 * has priority and any child animations are blocked. In order
 * for a child animation to run, the parent animation must query each of the elements
 * containing child animations, and run them using this function.
 *
 * Note that this feature is designed to be used with `query()` and it will only work
 * with animations that are assigned using the Angular animation library. CSS keyframes
 * and transitions are not handled by this API.
 *
 * @publicApi
 */
export declare function animateChild(options?: AnimateChildOptions | null): AnimationAnimateChildMetadata;

/**
 * Adds duration options to control animation styling and timing for a child animation.
 *
 * @see `animateChild()`
 *
 * @publicApi
 */
export declare interface AnimateChildOptions extends AnimationOptions {
    duration?: number | string;
}

/**
 * Represents animation-step timing parameters for an animation step.
 * @see `animate()`
 *
 * @publicApi
 */
export declare type AnimateTimings = {
    /**
     * The full duration of an animation step. A number and optional time unit,
     * such as "1s" or "10ms" for one second and 10 milliseconds, respectively.
     * The default unit is milliseconds.
     */
    duration: number;
    /**
     * The delay in applying an animation step. A number and optional time unit.
     * The default unit is milliseconds.
     */
    delay: number;
    /**
     * An easing style that controls how an animations step accelerates
     * and decelerates during its run time. An easing function such as `cubic-bezier()`,
     * or one of the following constants:
     * - `ease-in`
     * - `ease-out`
     * - `ease-in-and-out`
     */
    easing: string | null;
};

/**
 * Produces a reusable animation that can be invoked in another animation or sequence,
 * by calling the `useAnimation()` function.
 *
 * @param steps One or more animation objects, as returned by the `animate()`
 * or `sequence()` function, that form a transformation from one state to another.
 * A sequence is used by default when you pass an array.
 * @param options An options object that can contain a delay value for the start of the
 * animation, and additional developer-defined parameters.
 * Provided values for additional parameters are used as defaults,
 * and override values can be passed to the caller on invocation.
 * @returns An object that encapsulates the animation data.
 *
 * @usageNotes
 * The following example defines a reusable animation, providing some default parameter
 * values.
 *
 * ```typescript
 * var fadeAnimation = animation([
 *   style({ opacity: '{{ start }}' }),
 *   animate('{{ time }}',
 *   style({ opacity: '{{ end }}'}))
 *   ],
 *   { params: { time: '1000ms', start: 0, end: 1 }});
 * ```
 *
 * The following invokes the defined animation with a call to `useAnimation()`,
 * passing in override parameter values.
 *
 * ```js
 * useAnimation(fadeAnimation, {
 *   params: {
 *     time: '2s',
 *     start: 1,
 *     end: 0
 *   }
 * })
 * ```
 *
 * If any of the passed-in parameter values are missing from this call,
 * the default values are used. If one or more parameter values are missing before a step is
 * animated, `useAnimation()` throws an error.
 *
 * @publicApi
 */
export declare function animation(steps: AnimationMetadata | AnimationMetadata[], options?: AnimationOptions | null): AnimationReferenceMetadata;

/**
 * Encapsulates a child animation, that can be run explicitly when the parent is run.
 * Instantiated and returned by the `animateChild` function.
 *
 * @publicApi
 */
export declare interface AnimationAnimateChildMetadata extends AnimationMetadata {
    /**
     * An options object containing a delay and
     * developer-defined parameters that provide styling defaults and
     * can be overridden on invocation. Default delay is 0.
     */
    options: AnimationOptions | null;
}

/**
 * Encapsulates an animation step. Instantiated and returned by
 * the `animate()` function.
 *
 * @publicApi
 */
export declare interface AnimationAnimateMetadata extends AnimationMetadata {
    /**
     * The timing data for the step.
     */
    timings: string | number | AnimateTimings;
    /**
     * A set of styles used in the step.
     */
    styles: AnimationStyleMetadata | AnimationKeyframesSequenceMetadata | null;
}

/**
 * Encapsulates a reusable animation.
 * Instantiated and returned by the `useAnimation()` function.
 *
 * @publicApi
 */
export declare interface AnimationAnimateRefMetadata extends AnimationMetadata {
    /**
     * An animation reference object.
     */
    animation: AnimationReferenceMetadata;
    /**
     * An options object containing a delay and
     * developer-defined parameters that provide styling defaults and
     * can be overridden on invocation. Default delay is 0.
     */
    options: AnimationOptions | null;
}

/**
 * An injectable service that produces an animation sequence programmatically within an
 * Angular component or directive.
 * Provided by the `BrowserAnimationsModule` or `NoopAnimationsModule`.
 *
 * @usageNotes
 *
 * To use this service, add it to your component or directive as a dependency.
 * The service is instantiated along with your component.
 *
 * Apps do not typically need to create their own animation players, but if you
 * do need to, follow these steps:
 *
 * 1. Use the `build()` method to create a programmatic animation using the
 * `animate()` function. The method returns an `AnimationFactory` instance.
 *
 * 2. Use the factory object to create an `AnimationPlayer` and attach it to a DOM element.
 *
 * 3. Use the player object to control the animation programmatically.
 *
 * For example:
 *
 * ```ts
 * // import the service from BrowserAnimationsModule
 * import {AnimationBuilder} from '@angular/animations';
 * // require the service as a dependency
 * class MyCmp {
 *   constructor(private _builder: AnimationBuilder) {}
 *
 *   makeAnimation(element: any) {
 *     // first define a reusable animation
 *     const myAnimation = this._builder.build([
 *       style({ width: 0 }),
 *       animate(1000, style({ width: '100px' }))
 *     ]);
 *
 *     // use the returned factory object to create a player
 *     const player = myAnimation.create(element);
 *
 *     player.play();
 *   }
 * }
 * ```
 *
 * @publicApi
 */
export declare abstract class AnimationBuilder {
    /**
     * Builds a factory for producing a defined animation.
     * @param animation A reusable animation definition.
     * @returns A factory object that can create a player for the defined animation.
     * @see `animate()`
     */
    abstract build(animation: AnimationMetadata | AnimationMetadata[]): AnimationFactory;
}


/**
 * An instance of this class is returned as an event parameter when an animation
 * callback is captured for an animation either during the start or done phase.
 *
 * ```typescript
 * @Component({
 *   host: {
 *     '[@myAnimationTrigger]': 'someExpression',
 *     '(@myAnimationTrigger.start)': 'captureStartEvent($event)',
 *     '(@myAnimationTrigger.done)': 'captureDoneEvent($event)',
 *   },
 *   animations: [
 *     trigger("myAnimationTrigger", [
 *        // ...
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   someExpression: any = false;
 *   captureStartEvent(event: AnimationEvent) {
 *     // the toState, fromState and totalTime data is accessible from the event variable
 *   }
 *
 *   captureDoneEvent(event: AnimationEvent) {
 *     // the toState, fromState and totalTime data is accessible from the event variable
 *   }
 * }
 * ```
 *
 * @publicApi
 */
export declare interface AnimationEvent {
    /**
     * The name of the state from which the animation is triggered.
     */
    fromState: string;
    /**
     * The name of the state in which the animation completes.
     */
    toState: string;
    /**
     * The time it takes the animation to complete, in milliseconds.
     */
    totalTime: number;
    /**
     * The animation phase in which the callback was invoked, one of
     * "start" or "done".
     */
    phaseName: string;
    /**
     * The element to which the animation is attached.
     */
    element: any;
    /**
     * Internal.
     */
    triggerName: string;
    /**
     * Internal.
     */
    disabled: boolean;
}

/**
 * A factory object returned from the `AnimationBuilder`.`build()` method.
 *
 * @publicApi
 */
export declare abstract class AnimationFactory {
    /**
     * Creates an `AnimationPlayer` instance for the reusable animation defined by
     * the `AnimationBuilder`.`build()` method that created this factory.
     * Attaches the new player a DOM element.
     * @param element The DOM element to which to attach the animation.
     * @param options A set of options that can include a time delay and
     * additional developer-defined parameters.
     */
    abstract create(element: any, options?: AnimationOptions): AnimationPlayer;
}

/**
 * Encapsulates an animation group.
 * Instantiated and returned by the `{@link animations/group group()}` function.
 *
 * @publicApi
 */
export declare interface AnimationGroupMetadata extends AnimationMetadata {
    /**
     * One or more animation or style steps that form this group.
     */
    steps: AnimationMetadata[];
    /**
     * An options object containing a delay and
     * developer-defined parameters that provide styling defaults and
     * can be overridden on invocation. Default delay is 0.
     */
    options: AnimationOptions | null;
}

/**
 * Encapsulates a keyframes sequence. Instantiated and returned by
 * the `keyframes()` function.
 *
 * @publicApi
 */
export declare interface AnimationKeyframesSequenceMetadata extends AnimationMetadata {
    /**
     * An array of animation styles.
     */
    steps: AnimationStyleMetadata[];
}

/**
 * Base for animation data structures.
 *
 * @publicApi
 */
export declare interface AnimationMetadata {
    type: AnimationMetadataType;
}

/**
 * @description Constants for the categories of parameters that can be defined for animations.
 *
 * A corresponding function defines a set of parameters for each category, and
 * collects them into a corresponding `AnimationMetadata` object.
 *
 * @publicApi
 */
export declare const enum AnimationMetadataType {
    /**
     * Associates a named animation state with a set of CSS styles.
     * See `state()`
     */
    State = 0,
    /**
     * Data for a transition from one animation state to another.
     * See `transition()`
     */
    Transition = 1,
    /**
     * Contains a set of animation steps.
     * See `sequence()`
     */
    Sequence = 2,
    /**
     * Contains a set of animation steps.
     * See `{@link animations/group group()}`
     */
    Group = 3,
    /**
     * Contains an animation step.
     * See `animate()`
     */
    Animate = 4,
    /**
     * Contains a set of animation steps.
     * See `keyframes()`
     */
    Keyframes = 5,
    /**
     * Contains a set of CSS property-value pairs into a named style.
     * See `style()`
     */
    Style = 6,
    /**
     * Associates an animation with an entry trigger that can be attached to an element.
     * See `trigger()`
     */
    Trigger = 7,
    /**
     * Contains a re-usable animation.
     * See `animation()`
     */
    Reference = 8,
    /**
     * Contains data to use in executing child animations returned by a query.
     * See `animateChild()`
     */
    AnimateChild = 9,
    /**
     * Contains animation parameters for a re-usable animation.
     * See `useAnimation()`
     */
    AnimateRef = 10,
    /**
     * Contains child-animation query data.
     * See `query()`
     */
    Query = 11,
    /**
     * Contains data for staggering an animation sequence.
     * See `stagger()`
     */
    Stagger = 12
}

/**
 * @description Options that control animation styling and timing.
 *
 * The following animation functions accept `AnimationOptions` data:
 *
 * - `transition()`
 * - `sequence()`
 * - `{@link animations/group group()}`
 * - `query()`
 * - `animation()`
 * - `useAnimation()`
 * - `animateChild()`
 *
 * Programmatic animations built using the `AnimationBuilder` service also
 * make use of `AnimationOptions`.
 *
 * @publicApi
 */
export declare interface AnimationOptions {
    /**
     * Sets a time-delay for initiating an animation action.
     * A number and optional time unit, such as "1s" or "10ms" for one second
     * and 10 milliseconds, respectively.The default unit is milliseconds.
     * Default value is 0, meaning no delay.
     */
    delay?: number | string;
    /**
     * A set of developer-defined parameters that modify styling and timing
     * when an animation action starts. An array of key-value pairs, where the provided value
     * is used as a default.
     */
    params?: {
        [name: string]: any;
    };
}

/**
 * Provides programmatic control of a reusable animation sequence,
 * built using the `build()` method of `AnimationBuilder`. The `build()` method
 * returns a factory, whose `create()` method instantiates and initializes this interface.
 *
 * @see `AnimationBuilder`
 * @see `AnimationFactory`
 * @see `animate()`
 *
 * @publicApi
 */
export declare interface AnimationPlayer {
    /**
     * Provides a callback to invoke when the animation finishes.
     * @param fn The callback function.
     * @see `finish()`
     */
    onDone(fn: () => void): void;
    /**
     * Provides a callback to invoke when the animation starts.
     * @param fn The callback function.
     * @see `run()`
     */
    onStart(fn: () => void): void;
    /**
     * Provides a callback to invoke after the animation is destroyed.
     * @param fn The callback function.
     * @see `destroy()`
     * @see `beforeDestroy()`
     */
    onDestroy(fn: () => void): void;
    /**
     * Initializes the animation.
     */
    init(): void;
    /**
     * Reports whether the animation has started.
     * @returns True if the animation has started, false otherwise.
     */
    hasStarted(): boolean;
    /**
     * Runs the animation, invoking the `onStart()` callback.
     */
    play(): void;
    /**
     * Pauses the animation.
     */
    pause(): void;
    /**
     * Restarts the paused animation.
     */
    restart(): void;
    /**
     * Ends the animation, invoking the `onDone()` callback.
     */
    finish(): void;
    /**
     * Destroys the animation, after invoking the `beforeDestroy()` callback.
     * Calls the `onDestroy()` callback when destruction is completed.
     */
    destroy(): void;
    /**
     * Resets the animation to its initial state.
     */
    reset(): void;
    /**
     * Sets the position of the animation.
     * @param position A 0-based offset into the duration, in milliseconds.
     */
    setPosition(position: any /** TODO #9100 */): void;
    /**
     * Reports the current position of the animation.
     * @returns A 0-based offset into the duration, in milliseconds.
     */
    getPosition(): number;
    /**
     * The parent of this player, if any.
     */
    parentPlayer: AnimationPlayer | null;
    /**
     * The total run time of the animation, in milliseconds.
     */
    readonly totalTime: number;
    /**
     * Provides a callback to invoke before the animation is destroyed.
     */
    beforeDestroy?: () => any;
}

/**
 * Encapsulates an animation query. Instantiated and returned by
 * the `query()` function.
 *
 * @publicApi
 */
export declare interface AnimationQueryMetadata extends AnimationMetadata {
    /**
     *  The CSS selector for this query.
     */
    selector: string;
    /**
     * One or more animation step objects.
     */
    animation: AnimationMetadata | AnimationMetadata[];
    /**
     * A query options object.
     */
    options: AnimationQueryOptions | null;
}

/**
 * Encapsulates animation query options.
 * Passed to the `query()` function.
 *
 * @publicApi
 */
export declare interface AnimationQueryOptions extends AnimationOptions {
    /**
     * True if this query is optional, false if it is required. Default is false.
     * A required query throws an error if no elements are retrieved when
     * the query is executed. An optional query does not.
     *
     */
    optional?: boolean;
    /**
     * A maximum total number of results to return from the query.
     * If negative, results are limited from the end of the query list towards the beginning.
     * By default, results are not limited.
     */
    limit?: number;
}

/**
 * Encapsulates a reusable animation, which is a collection of individual animation steps.
 * Instantiated and returned by the `animation()` function, and
 * passed to the `useAnimation()` function.
 *
 * @publicApi
 */
export declare interface AnimationReferenceMetadata extends AnimationMetadata {
    /**
     *  One or more animation step objects.
     */
    animation: AnimationMetadata | AnimationMetadata[];
    /**
     * An options object containing a delay and
     * developer-defined parameters that provide styling defaults and
     * can be overridden on invocation. Default delay is 0.
     */
    options: AnimationOptions | null;
}

/**
 * Encapsulates an animation sequence.
 * Instantiated and returned by the `sequence()` function.
 *
 * @publicApi
 */
export declare interface AnimationSequenceMetadata extends AnimationMetadata {
    /**
     *  An array of animation step objects.
     */
    steps: AnimationMetadata[];
    /**
     * An options object containing a delay and
     * developer-defined parameters that provide styling defaults and
     * can be overridden on invocation. Default delay is 0.
     */
    options: AnimationOptions | null;
}

/**
 * Encapsulates parameters for staggering the start times of a set of animation steps.
 * Instantiated and returned by the `stagger()` function.
 *
 * @publicApi
 **/
export declare interface AnimationStaggerMetadata extends AnimationMetadata {
    /**
     * The timing data for the steps.
     */
    timings: string | number;
    /**
     * One or more animation steps.
     */
    animation: AnimationMetadata | AnimationMetadata[];
}

/**
 * Encapsulates an animation state by associating a state name with a set of CSS styles.
 * Instantiated and returned by the `state()` function.
 *
 * @publicApi
 */
export declare interface AnimationStateMetadata extends AnimationMetadata {
    /**
     * The state name, unique within the component.
     */
    name: string;
    /**
     *  The CSS styles associated with this state.
     */
    styles: AnimationStyleMetadata;
    /**
     * An options object containing
     * developer-defined parameters that provide styling defaults and
     * can be overridden on invocation.
     */
    options?: {
        params: {
            [name: string]: any;
        };
    };
}

/**
 * Encapsulates an animation style. Instantiated and returned by
 * the `style()` function.
 *
 * @publicApi
 */
export declare interface AnimationStyleMetadata extends AnimationMetadata {
    /**
     * A set of CSS style properties.
     */
    styles: '*' | {
        [key: string]: string | number;
    } | Array<{
        [key: string]: string | number;
    } | '*'>;
    /**
     * A percentage of the total animate time at which the style is to be applied.
     */
    offset: number | null;
}

/**
 * Encapsulates an animation transition. Instantiated and returned by the
 * `transition()` function.
 *
 * @publicApi
 */
export declare interface AnimationTransitionMetadata extends AnimationMetadata {
    /**
     * An expression that describes a state change.
     */
    expr: string | ((fromState: string, toState: string, element?: any, params?: {
        [key: string]: any;
    }) => boolean);
    /**
     * One or more animation objects to which this transition applies.
     */
    animation: AnimationMetadata | AnimationMetadata[];
    /**
     * An options object containing a delay and
     * developer-defined parameters that provide styling defaults and
     * can be overridden on invocation. Default delay is 0.
     */
    options: AnimationOptions | null;
}

/**
 * Contains an animation trigger. Instantiated and returned by the
 * `trigger()` function.
 *
 * @publicApi
 */
export declare interface AnimationTriggerMetadata extends AnimationMetadata {
    /**
     * The trigger name, used to associate it with an element. Unique within the component.
     */
    name: string;
    /**
     * An animation definition object, containing an array of state and transition declarations.
     */
    definitions: AnimationMetadata[];
    /**
     * An options object containing a delay and
     * developer-defined parameters that provide styling defaults and
     * can be overridden on invocation. Default delay is 0.
     */
    options: {
        params?: {
            [name: string]: any;
        };
    } | null;
}

/**
 * Specifies automatic styling.
 *
 * @publicApi
 */
export declare const AUTO_STYLE = "*";

/**
 * @description Defines a list of animation steps to be run in parallel.
 *
 * @param steps An array of animation step objects.
 * - When steps are defined by `style()` or `animate()`
 * function calls, each call within the group is executed instantly.
 * - To specify offset styles to be applied at a later time, define steps with
 * `keyframes()`, or use `animate()` calls with a delay value.
 * For example:
 *
 * ```typescript
 * group([
 *   animate("1s", style({ background: "black" })),
 *   animate("2s", style({ color: "white" }))
 * ])
 * ```
 *
 * @param options An options object containing a delay and
 * developer-defined parameters that provide styling defaults and
 * can be overridden on invocation.
 *
 * @return An object that encapsulates the group data.
 *
 * @usageNotes
 * Grouped animations are useful when a series of styles must be
 * animated at different starting times and closed off at different ending times.
 *
 * When called within a `sequence()` or a
 * `transition()` call, does not continue to the next
 * instruction until all of the inner animation steps have completed.
 *
 * @publicApi
 */
export declare function group(steps: AnimationMetadata[], options?: AnimationOptions | null): AnimationGroupMetadata;

/**
 * Defines a set of animation styles, associating each style with an optional `offset` value.
 *
 * @param steps A set of animation styles with optional offset data.
 * The optional `offset` value for a style specifies a percentage of the total animation
 * time at which that style is applied.
 * @returns An object that encapsulates the keyframes data.
 *
 * @usageNotes
 * Use with the `animate()` call. Instead of applying animations
 * from the current state
 * to the destination state, keyframes describe how each style entry is applied and at what point
 * within the animation arc.
 * Compare [CSS Keyframe Animations](https://www.w3schools.com/css/css3_animations.asp).
 *
 * ### Usage
 *
 * In the following example, the offset values describe
 * when each `backgroundColor` value is applied. The color is red at the start, and changes to
 * blue when 20% of the total time has elapsed.
 *
 * ```typescript
 * // the provided offset values
 * animate("5s", keyframes([
 *   style({ backgroundColor: "red", offset: 0 }),
 *   style({ backgroundColor: "blue", offset: 0.2 }),
 *   style({ backgroundColor: "orange", offset: 0.3 }),
 *   style({ backgroundColor: "black", offset: 1 })
 * ]))
 * ```
 *
 * If there are no `offset` values specified in the style entries, the offsets
 * are calculated automatically.
 *
 * ```typescript
 * animate("5s", keyframes([
 *   style({ backgroundColor: "red" }) // offset = 0
 *   style({ backgroundColor: "blue" }) // offset = 0.33
 *   style({ backgroundColor: "orange" }) // offset = 0.66
 *   style({ backgroundColor: "black" }) // offset = 1
 * ]))
 *```

 * @publicApi
 */
export declare function keyframes(steps: AnimationStyleMetadata[]): AnimationKeyframesSequenceMetadata;

/**
 * An empty programmatic controller for reusable animations.
 * Used internally when animations are disabled, to avoid
 * checking for the null case when an animation player is expected.
 *
 * @see `animate()`
 * @see `AnimationPlayer`
 * @see `GroupPlayer`
 *
 * @publicApi
 */
export declare class NoopAnimationPlayer implements AnimationPlayer {
    private _onDoneFns;
    private _onStartFns;
    private _onDestroyFns;
    private _started;
    private _destroyed;
    private _finished;
    parentPlayer: AnimationPlayer | null;
    readonly totalTime: number;
    constructor(duration?: number, delay?: number);
    private _onFinish;
    onStart(fn: () => void): void;
    onDone(fn: () => void): void;
    onDestroy(fn: () => void): void;
    hasStarted(): boolean;
    init(): void;
    play(): void;
    private _onStart;
    pause(): void;
    restart(): void;
    finish(): void;
    destroy(): void;
    reset(): void;
    setPosition(position: number): void;
    getPosition(): number;
}

/**
 * Finds one or more inner elements within the current element that is
 * being animated within a sequence. Use with `animate()`.
 *
 * @param selector The element to query, or a set of elements that contain Angular-specific
 * characteristics, specified with one or more of the following tokens.
 *  - `query(":enter")` or `query(":leave")` : Query for newly inserted/removed elements.
 *  - `query(":animating")` : Query all currently animating elements.
 *  - `query("@triggerName")` : Query elements that contain an animation trigger.
 *  - `query("@*")` : Query all elements that contain an animation triggers.
 *  - `query(":self")` : Include the current element into the animation sequence.
 *
 * @param animation One or more animation steps to apply to the queried element or elements.
 * An array is treated as an animation sequence.
 * @param options An options object. Use the 'limit' field to limit the total number of
 * items to collect.
 * @return An object that encapsulates the query data.
 *
 * @usageNotes
 * Tokens can be merged into a combined query selector string. For example:
 *
 * ```typescript
 *  query(':self, .record:enter, .record:leave, @subTrigger', [...])
 * ```
 *
 * The `query()` function collects multiple elements and works internally by using
 * `element.querySelectorAll`. Use the `limit` field of an options object to limit
 * the total number of items to be collected. For example:
 *
 * ```js
 * query('div', [
 *   animate(...),
 *   animate(...)
 * ], { limit: 1 })
 * ```
 *
 * By default, throws an error when zero items are found. Set the
 * `optional` flag to ignore this error. For example:
 *
 * ```js
 * query('.some-element-that-may-not-be-there', [
 *   animate(...),
 *   animate(...)
 * ], { optional: true })
 * ```
 *
 * ### Usage Example
 *
 * The following example queries for inner elements and animates them
 * individually using `animate()`.
 *
 * ```typescript
 * @Component({
 *   selector: 'inner',
 *   template: `
 *     <div [@queryAnimation]="exp">
 *       <h1>Title</h1>
 *       <div class="content">
 *         Blah blah blah
 *       </div>
 *     </div>
 *   `,
 *   animations: [
 *    trigger('queryAnimation', [
 *      transition('* => goAnimate', [
 *        // hide the inner elements
 *        query('h1', style({ opacity: 0 })),
 *        query('.content', style({ opacity: 0 })),
 *
 *        // animate the inner elements in, one by one
 *        query('h1', animate(1000, style({ opacity: 1 }))),
 *        query('.content', animate(1000, style({ opacity: 1 }))),
 *      ])
 *    ])
 *  ]
 * })
 * class Cmp {
 *   exp = '';
 *
 *   goAnimate() {
 *     this.exp = 'goAnimate';
 *   }
 * }
 * ```
 *
 * @publicApi
 */
export declare function query(selector: string, animation: AnimationMetadata | AnimationMetadata[], options?: AnimationQueryOptions | null): AnimationQueryMetadata;

/**
 * Defines a list of animation steps to be run sequentially, one by one.
 *
 * @param steps An array of animation step objects.
 * - Steps defined by `style()` calls apply the styling data immediately.
 * - Steps defined by `animate()` calls apply the styling data over time
 *   as specified by the timing data.
 *
 * ```typescript
 * sequence([
 *   style({ opacity: 0 }),
 *   animate("1s", style({ opacity: 1 }))
 * ])
 * ```
 *
 * @param options An options object containing a delay and
 * developer-defined parameters that provide styling defaults and
 * can be overridden on invocation.
 *
 * @return An object that encapsulates the sequence data.
 *
 * @usageNotes
 * When you pass an array of steps to a
 * `transition()` call, the steps run sequentially by default.
 * Compare this to the `{@link animations/group group()}` call, which runs animation steps in
 *parallel.
 *
 * When a sequence is used within a `{@link animations/group group()}` or a `transition()` call,
 * execution continues to the next instruction only after each of the inner animation
 * steps have completed.
 *
 * @publicApi
 **/
export declare function sequence(steps: AnimationMetadata[], options?: AnimationOptions | null): AnimationSequenceMetadata;

/**
 * Use within an animation `query()` call to issue a timing gap after
 * each queried item is animated.
 *
 * @param timings A delay value.
 * @param animation One ore more animation steps.
 * @returns An object that encapsulates the stagger data.
 *
 * @usageNotes
 * In the following example, a container element wraps a list of items stamped out
 * by an `ngFor`. The container element contains an animation trigger that will later be set
 * to query for each of the inner items.
 *
 * Each time items are added, the opacity fade-in animation runs,
 * and each removed item is faded out.
 * When either of these animations occur, the stagger effect is
 * applied after each item's animation is started.
 *
 * ```html
 * <!-- list.component.html -->
 * <button (click)="toggle()">Show / Hide Items</button>
 * <hr />
 * <div [@listAnimation]="items.length">
 *   <div *ngFor="let item of items">
 *     {{ item }}
 *   </div>
 * </div>
 * ```
 *
 * Here is the component code:
 *
 * ```typescript
 * import {trigger, transition, style, animate, query, stagger} from '@angular/animations';
 * @Component({
 *   templateUrl: 'list.component.html',
 *   animations: [
 *     trigger('listAnimation', [
 *     ...
 *     ])
 *   ]
 * })
 * class ListComponent {
 *   items = [];
 *
 *   showItems() {
 *     this.items = [0,1,2,3,4];
 *   }
 *
 *   hideItems() {
 *     this.items = [];
 *   }
 *
 *   toggle() {
 *     this.items.length ? this.hideItems() : this.showItems();
 *    }
 *  }
 * ```
 *
 * Here is the animation trigger code:
 *
 * ```typescript
 * trigger('listAnimation', [
 *   transition('* => *', [ // each time the binding value changes
 *     query(':leave', [
 *       stagger(100, [
 *         animate('0.5s', style({ opacity: 0 }))
 *       ])
 *     ]),
 *     query(':enter', [
 *       style({ opacity: 0 }),
 *       stagger(100, [
 *         animate('0.5s', style({ opacity: 1 }))
 *       ])
 *     ])
 *   ])
 * ])
 * ```
 *
 * @publicApi
 */
export declare function stagger(timings: string | number, animation: AnimationMetadata | AnimationMetadata[]): AnimationStaggerMetadata;

/**
 * Declares an animation state within a trigger attached to an element.
 *
 * @param name One or more names for the defined state in a comma-separated string.
 * The following reserved state names can be supplied to define a style for specific use
 * cases:
 *
 * - `void` You can associate styles with this name to be used when
 * the element is detached from the application. For example, when an `ngIf` evaluates
 * to false, the state of the associated element is void.
 *  - `*` (asterisk) Indicates the default state. You can associate styles with this name
 * to be used as the fallback when the state that is being animated is not declared
 * within the trigger.
 *
 * @param styles A set of CSS styles associated with this state, created using the
 * `style()` function.
 * This set of styles persists on the element once the state has been reached.
 * @param options Parameters that can be passed to the state when it is invoked.
 * 0 or more key-value pairs.
 * @return An object that encapsulates the new state data.
 *
 * @usageNotes
 * Use the `trigger()` function to register states to an animation trigger.
 * Use the `transition()` function to animate between states.
 * When a state is active within a component, its associated styles persist on the element,
 * even when the animation ends.
 *
 * @publicApi
 **/
export declare function state(name: string, styles: AnimationStyleMetadata, options?: {
    params: {
        [name: string]: any;
    };
}): AnimationStateMetadata;

/**
 * Declares a key/value object containing CSS properties/styles that
 * can then be used for an animation `state`, within an animation `sequence`,
 * or as styling data for calls to `animate()` and `keyframes()`.
 *
 * @param tokens A set of CSS styles or HTML styles associated with an animation state.
 * The value can be any of the following:
 * - A key-value style pair associating a CSS property with a value.
 * - An array of key-value style pairs.
 * - An asterisk (*), to use auto-styling, where styles are derived from the element
 * being animated and applied to the animation when it starts.
 *
 * Auto-styling can be used to define a state that depends on layout or other
 * environmental factors.
 *
 * @return An object that encapsulates the style data.
 *
 * @usageNotes
 * The following examples create animation styles that collect a set of
 * CSS property values:
 *
 * ```typescript
 * // string values for CSS properties
 * style({ background: "red", color: "blue" })
 *
 * // numerical pixel values
 * style({ width: 100, height: 0 })
 * ```
 *
 * The following example uses auto-styling to allow a component to animate from
 * a height of 0 up to the height of the parent element:
 *
 * ```
 * style({ height: 0 }),
 * animate("1s", style({ height: "*" }))
 * ```
 *
 * @publicApi
 **/
export declare function style(tokens: '*' | {
    [key: string]: string | number;
} | Array<'*' | {
    [key: string]: string | number;
}>): AnimationStyleMetadata;

/**
 * Declares an animation transition as a sequence of animation steps to run when a given
 * condition is satisfied. The condition is a Boolean expression or function that compares
 * the previous and current animation states, and returns true if this transition should occur.
 * When the state criteria of a defined transition are met, the associated animation is
 * triggered.
 *
 * @param stateChangeExpr A Boolean expression or function that compares the previous and current
 * animation states, and returns true if this transition should occur. Note that  "true" and "false"
 * match 1 and 0, respectively. An expression is evaluated each time a state change occurs in the
 * animation trigger element.
 * The animation steps run when the expression evaluates to true.
 *
 * - A state-change string takes the form "state1 => state2", where each side is a defined animation
 * state, or an asterix (*) to refer to a dynamic start or end state.
 *   - The expression string can contain multiple comma-separated statements;
 * for example "state1 => state2, state3 => state4".
 *   - Special values `:enter` and `:leave` initiate a transition on the entry and exit states,
 * equivalent to  "void => *"  and "* => void".
 *   - Special values `:increment` and `:decrement` initiate a transition when a numeric value has
 * increased or decreased in value.
 * - A function is executed each time a state change occurs in the animation trigger element.
 * The animation steps run when the function returns true.
 *
 * @param steps One or more animation objects, as returned by the `animate()` or
 * `sequence()` function, that form a transformation from one state to another.
 * A sequence is used by default when you pass an array.
 * @param options An options object that can contain a delay value for the start of the animation,
 * and additional developer-defined parameters. Provided values for additional parameters are used
 * as defaults, and override values can be passed to the caller on invocation.
 * @returns An object that encapsulates the transition data.
 *
 * @usageNotes
 * The template associated with a component binds an animation trigger to an element.
 *
 * ```HTML
 * <!-- somewhere inside of my-component-tpl.html -->
 * <div [@myAnimationTrigger]="myStatusExp">...</div>
 * ```
 *
 * All transitions are defined within an animation trigger,
 * along with named states that the transitions change to and from.
 *
 * ```typescript
 * trigger("myAnimationTrigger", [
 *  // define states
 *  state("on", style({ background: "green" })),
 *  state("off", style({ background: "grey" })),
 *  ...]
 * ```
 *
 * Note that when you call the `sequence()` function within a `{@link animations/group group()}`
 * or a `transition()` call, execution does not continue to the next instruction
 * until each of the inner animation steps have completed.
 *
 * ### Syntax examples
 *
 * The following examples define transitions between the two defined states (and default states),
 * using various options:
 *
 * ```typescript
 * // Transition occurs when the state value
 * // bound to "myAnimationTrigger" changes from "on" to "off"
 * transition("on => off", animate(500))
 * // Run the same animation for both directions
 * transition("on <=> off", animate(500))
 * // Define multiple state-change pairs separated by commas
 * transition("on => off, off => void", animate(500))
 * ```
 *
 * ### Special values for state-change expressions
 *
 * - Catch-all state change for when an element is inserted into the page and the
 * destination state is unknown:
 *
 * ```typescript
 * transition("void => *", [
 *  style({ opacity: 0 }),
 *  animate(500)
 *  ])
 * ```
 *
 * - Capture a state change between any states:
 *
 *  `transition("* => *", animate("1s 0s"))`
 *
 * - Entry and exit transitions:
 *
 * ```typescript
 * transition(":enter", [
 *   style({ opacity: 0 }),
 *   animate(500, style({ opacity: 1 }))
 *   ]),
 * transition(":leave", [
 *   animate(500, style({ opacity: 0 }))
 *   ])
 * ```
 *
 * - Use `:increment` and `:decrement` to initiate transitions:
 *
 * ```typescript
 * transition(":increment", group([
 *  query(':enter', [
 *     style({ left: '100%' }),
 *     animate('0.5s ease-out', style('*'))
 *   ]),
 *  query(':leave', [
 *     animate('0.5s ease-out', style({ left: '-100%' }))
 *  ])
 * ]))
 *
 * transition(":decrement", group([
 *  query(':enter', [
 *     style({ left: '100%' }),
 *     animate('0.5s ease-out', style('*'))
 *   ]),
 *  query(':leave', [
 *     animate('0.5s ease-out', style({ left: '-100%' }))
 *  ])
 * ]))
 * ```
 *
 * ### State-change functions
 *
 * Here is an example of a `fromState` specified as a state-change function that invokes an
 * animation when true:
 *
 * ```typescript
 * transition((fromState, toState) =>
 *  {
 *   return fromState == "off" && toState == "on";
 *  },
 *  animate("1s 0s"))
 * ```
 *
 * ### Animating to the final state
 *
 * If the final step in a transition is a call to `animate()` that uses a timing value
 * with no style data, that step is automatically considered the final animation arc,
 * for the element to reach the final state. Angular automatically adds or removes
 * CSS styles to ensure that the element is in the correct final state.
 *
 * The following example defines a transition that starts by hiding the element,
 * then makes sure that it animates properly to whatever state is currently active for trigger:
 *
 * ```typescript
 * transition("void => *", [
 *   style({ opacity: 0 }),
 *   animate(500)
 *  ])
 * ```
 * ### Boolean value matching
 * If a trigger binding value is a Boolean, it can be matched using a transition expression
 * that compares true and false or 1 and 0. For example:
 *
 * ```
 * // in the template
 * <div [@openClose]="open ? true : false">...</div>
 * // in the component metadata
 * trigger('openClose', [
 *   state('true', style({ height: '*' })),
 *   state('false', style({ height: '0px' })),
 *   transition('false <=> true', animate(500))
 * ])
 * ```
 *
 * @publicApi
 **/
export declare function transition(stateChangeExpr: string | ((fromState: string, toState: string, element?: any, params?: {
    [key: string]: any;
}) => boolean), steps: AnimationMetadata | AnimationMetadata[], options?: AnimationOptions | null): AnimationTransitionMetadata;

/**
 * Creates a named animation trigger, containing a  list of `state()`
 * and `transition()` entries to be evaluated when the expression
 * bound to the trigger changes.
 *
 * @param name An identifying string.
 * @param definitions  An animation definition object, containing an array of `state()`
 * and `transition()` declarations.
 *
 * @return An object that encapsulates the trigger data.
 *
 * @usageNotes
 * Define an animation trigger in the `animations` section of `@Component` metadata.
 * In the template, reference the trigger by name and bind it to a trigger expression that
 * evaluates to a defined animation state, using the following format:
 *
 * `[@triggerName]="expression"`
 *
 * Animation trigger bindings convert all values to strings, and then match the
 * previous and current values against any linked transitions.
 * Booleans can be specified as `1` or `true` and `0` or `false`.
 *
 * ### Usage Example
 *
 * The following example creates an animation trigger reference based on the provided
 * name value.
 * The provided animation value is expected to be an array consisting of state and
 * transition declarations.
 *
 * ```typescript
 * @Component({
 *   selector: "my-component",
 *   templateUrl: "my-component-tpl.html",
 *   animations: [
 *     trigger("myAnimationTrigger", [
 *       state(...),
 *       state(...),
 *       transition(...),
 *       transition(...)
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   myStatusExp = "something";
 * }
 * ```
 *
 * The template associated with this component makes use of the defined trigger
 * by binding to an element within its template code.
 *
 * ```html
 * <!-- somewhere inside of my-component-tpl.html -->
 * <div [@myAnimationTrigger]="myStatusExp">...</div>
 * ```
 *
 * ### Using an inline function
 * The `transition` animation method also supports reading an inline function which can decide
 * if its associated animation should be run.
 *
 * ```typescript
 * // this method is run each time the `myAnimationTrigger` trigger value changes.
 * function myInlineMatcherFn(fromState: string, toState: string, element: any, params: {[key:
 string]: any}): boolean {
 *   // notice that `element` and `params` are also available here
 *   return toState == 'yes-please-animate';
 * }
 *
 * @Component({
 *   selector: 'my-component',
 *   templateUrl: 'my-component-tpl.html',
 *   animations: [
 *     trigger('myAnimationTrigger', [
 *       transition(myInlineMatcherFn, [
 *         // the animation sequence code
 *       ]),
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   myStatusExp = "yes-please-animate";
 * }
 * ```
 *
 * ### Disabling Animations
 * When true, the special animation control binding `@.disabled` binding prevents
 * all animations from rendering.
 * Place the  `@.disabled` binding on an element to disable
 * animations on the element itself, as well as any inner animation triggers
 * within the element.
 *
 * The following example shows how to use this feature:
 *
 * ```typescript
 * @Component({
 *   selector: 'my-component',
 *   template: `
 *     <div [@.disabled]="isDisabled">
 *       <div [@childAnimation]="exp"></div>
 *     </div>
 *   `,
 *   animations: [
 *     trigger("childAnimation", [
 *       // ...
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   isDisabled = true;
 *   exp = '...';
 * }
 * ```
 *
 * When `@.disabled` is true, it prevents the `@childAnimation` trigger from animating,
 * along with any inner animations.
 *
 * ### Disable animations application-wide
 * When an area of the template is set to have animations disabled,
 * **all** inner components have their animations disabled as well.
 * This means that you can disable all animations for an app
 * by placing a host binding set on `@.disabled` on the topmost Angular component.
 *
 * ```typescript
 * import {Component, HostBinding} from '@angular/core';
 *
 * @Component({
 *   selector: 'app-component',
 *   templateUrl: 'app.component.html',
 * })
 * class AppComponent {
 *   @HostBinding('@.disabled')
 *   public animationsDisabled = true;
 * }
 * ```
 *
 * ### Overriding disablement of inner animations
 * Despite inner animations being disabled, a parent animation can `query()`
 * for inner elements located in disabled areas of the template and still animate
 * them if needed. This is also the case for when a sub animation is
 * queried by a parent and then later animated using `animateChild()`.
 *
 * ### Detecting when an animation is disabled
 * If a region of the DOM (or the entire application) has its animations disabled, the animation
 * trigger callbacks still fire, but for zero seconds. When the callback fires, it provides
 * an instance of an `AnimationEvent`. If animations are disabled,
 * the `.disabled` flag on the event is true.
 *
 * @publicApi
 */
export declare function trigger(name: string, definitions: AnimationMetadata[]): AnimationTriggerMetadata;

/**
 * Starts a reusable animation that is created using the `animation()` function.
 *
 * @param animation The reusable animation to start.
 * @param options An options object that can contain a delay value for the start of
 * the animation, and additional override values for developer-defined parameters.
 * @return An object that contains the animation parameters.
 *
 * @publicApi
 */
export declare function useAnimation(animation: AnimationReferenceMetadata, options?: AnimationOptions | null): AnimationAnimateRefMetadata;

/**
 * A programmatic controller for a group of reusable animations.
 * Used internally to control animations.
 *
 * @see `AnimationPlayer`
 * @see `{@link animations/group group()}`
 *
 */
export declare class ɵAnimationGroupPlayer implements AnimationPlayer {
    private _onDoneFns;
    private _onStartFns;
    private _finished;
    private _started;
    private _destroyed;
    private _onDestroyFns;
    parentPlayer: AnimationPlayer | null;
    totalTime: number;
    readonly players: AnimationPlayer[];
    constructor(_players: AnimationPlayer[]);
    private _onFinish;
    init(): void;
    onStart(fn: () => void): void;
    private _onStart;
    onDone(fn: () => void): void;
    onDestroy(fn: () => void): void;
    hasStarted(): boolean;
    play(): void;
    pause(): void;
    restart(): void;
    finish(): void;
    destroy(): void;
    private _onDestroy;
    reset(): void;
    setPosition(p: number): void;
    getPosition(): number;
    beforeDestroy(): void;
}

export declare const ɵPRE_STYLE = "!";


/**
 * Represents a set of CSS styles for use in an animation style.
 */
export declare interface ɵStyleData {
    [key: string]: string | number;
}

export { }

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9ucy5kLnRzIiwic291cmNlcyI6WyJhbmltYXRpb25zLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlIEFuZ3VsYXIgdjkuMS40XG4gKiAoYykgMjAxMC0yMDIwIEdvb2dsZSBMTEMuIGh0dHBzOi8vYW5ndWxhci5pby9cbiAqIExpY2Vuc2U6IE1JVFxuICovXG5cblxyXG4vKipcclxuICogRGVmaW5lcyBhbiBhbmltYXRpb24gc3RlcCB0aGF0IGNvbWJpbmVzIHN0eWxpbmcgaW5mb3JtYXRpb24gd2l0aCB0aW1pbmcgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSB0aW1pbmdzIFNldHMgYEFuaW1hdGVUaW1pbmdzYCBmb3IgdGhlIHBhcmVudCBhbmltYXRpb24uXHJcbiAqIEEgc3RyaW5nIGluIHRoZSBmb3JtYXQgXCJkdXJhdGlvbiBbZGVsYXldIFtlYXNpbmddXCIuXHJcbiAqICAtIER1cmF0aW9uIGFuZCBkZWxheSBhcmUgZXhwcmVzc2VkIGFzIGEgbnVtYmVyIGFuZCBvcHRpb25hbCB0aW1lIHVuaXQsXHJcbiAqIHN1Y2ggYXMgXCIxc1wiIG9yIFwiMTBtc1wiIGZvciBvbmUgc2Vjb25kIGFuZCAxMCBtaWxsaXNlY29uZHMsIHJlc3BlY3RpdmVseS5cclxuICogVGhlIGRlZmF1bHQgdW5pdCBpcyBtaWxsaXNlY29uZHMuXHJcbiAqICAtIFRoZSBlYXNpbmcgdmFsdWUgY29udHJvbHMgaG93IHRoZSBhbmltYXRpb24gYWNjZWxlcmF0ZXMgYW5kIGRlY2VsZXJhdGVzXHJcbiAqIGR1cmluZyBpdHMgcnVudGltZS4gVmFsdWUgaXMgb25lIG9mICBgZWFzZWAsIGBlYXNlLWluYCwgYGVhc2Utb3V0YCxcclxuICogYGVhc2UtaW4tb3V0YCwgb3IgYSBgY3ViaWMtYmV6aWVyKClgIGZ1bmN0aW9uIGNhbGwuXHJcbiAqIElmIG5vdCBzdXBwbGllZCwgbm8gZWFzaW5nIGlzIGFwcGxpZWQuXHJcbiAqXHJcbiAqIEZvciBleGFtcGxlLCB0aGUgc3RyaW5nIFwiMXMgMTAwbXMgZWFzZS1vdXRcIiBzcGVjaWZpZXMgYSBkdXJhdGlvbiBvZlxyXG4gKiAxMDAwIG1pbGxpc2Vjb25kcywgYW5kIGRlbGF5IG9mIDEwMCBtcywgYW5kIHRoZSBcImVhc2Utb3V0XCIgZWFzaW5nIHN0eWxlLFxyXG4gKiB3aGljaCBkZWNlbGVyYXRlcyBuZWFyIHRoZSBlbmQgb2YgdGhlIGR1cmF0aW9uLlxyXG4gKiBAcGFyYW0gc3R5bGVzIFNldHMgQW5pbWF0aW9uU3R5bGVzIGZvciB0aGUgcGFyZW50IGFuaW1hdGlvbi5cclxuICogQSBmdW5jdGlvbiBjYWxsIHRvIGVpdGhlciBgc3R5bGUoKWAgb3IgYGtleWZyYW1lcygpYFxyXG4gKiB0aGF0IHJldHVybnMgYSBjb2xsZWN0aW9uIG9mIENTUyBzdHlsZSBlbnRyaWVzIHRvIGJlIGFwcGxpZWQgdG8gdGhlIHBhcmVudCBhbmltYXRpb24uXHJcbiAqIFdoZW4gbnVsbCwgdXNlcyB0aGUgc3R5bGVzIGZyb20gdGhlIGRlc3RpbmF0aW9uIHN0YXRlLlxyXG4gKiBUaGlzIGlzIHVzZWZ1bCB3aGVuIGRlc2NyaWJpbmcgYW4gYW5pbWF0aW9uIHN0ZXAgdGhhdCB3aWxsIGNvbXBsZXRlIGFuIGFuaW1hdGlvbjtcclxuICogc2VlIFwiQW5pbWF0aW5nIHRvIHRoZSBmaW5hbCBzdGF0ZVwiIGluIGB0cmFuc2l0aW9ucygpYC5cclxuICogQHJldHVybnMgQW4gb2JqZWN0IHRoYXQgZW5jYXBzdWxhdGVzIHRoZSBhbmltYXRpb24gc3RlcC5cclxuICpcclxuICogQHVzYWdlTm90ZXNcclxuICogQ2FsbCB3aXRoaW4gYW4gYW5pbWF0aW9uIGBzZXF1ZW5jZSgpYCwgYHtAbGluayBhbmltYXRpb25zL2dyb3VwIGdyb3VwKCl9YCwgb3JcclxuICogYHRyYW5zaXRpb24oKWAgY2FsbCB0byBzcGVjaWZ5IGFuIGFuaW1hdGlvbiBzdGVwXHJcbiAqIHRoYXQgYXBwbGllcyBnaXZlbiBzdHlsZSBkYXRhIHRvIHRoZSBwYXJlbnQgYW5pbWF0aW9uIGZvciBhIGdpdmVuIGFtb3VudCBvZiB0aW1lLlxyXG4gKlxyXG4gKiAjIyMgU3ludGF4IEV4YW1wbGVzXHJcbiAqICoqVGltaW5nIGV4YW1wbGVzKipcclxuICpcclxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlcyBzaG93IHZhcmlvdXMgYHRpbWluZ3NgIHNwZWNpZmljYXRpb25zLlxyXG4gKiAtIGBhbmltYXRlKDUwMClgIDogRHVyYXRpb24gaXMgNTAwIG1pbGxpc2Vjb25kcy5cclxuICogLSBgYW5pbWF0ZShcIjFzXCIpYCA6IER1cmF0aW9uIGlzIDEwMDAgbWlsbGlzZWNvbmRzLlxyXG4gKiAtIGBhbmltYXRlKFwiMTAwbXMgMC41c1wiKWAgOiBEdXJhdGlvbiBpcyAxMDAgbWlsbGlzZWNvbmRzLCBkZWxheSBpcyA1MDAgbWlsbGlzZWNvbmRzLlxyXG4gKiAtIGBhbmltYXRlKFwiNXMgZWFzZS1pblwiKWAgOiBEdXJhdGlvbiBpcyA1MDAwIG1pbGxpc2Vjb25kcywgZWFzaW5nIGluLlxyXG4gKiAtIGBhbmltYXRlKFwiNXMgMTBtcyBjdWJpYy1iZXppZXIoLjE3LC42NywuODgsLjEpXCIpYCA6IER1cmF0aW9uIGlzIDUwMDAgbWlsbGlzZWNvbmRzLCBkZWxheSBpcyAxMFxyXG4gKiBtaWxsaXNlY29uZHMsIGVhc2luZyBhY2NvcmRpbmcgdG8gYSBiZXppZXIgY3VydmUuXHJcbiAqXHJcbiAqICoqU3R5bGUgZXhhbXBsZXMqKlxyXG4gKlxyXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgY2FsbHMgYHN0eWxlKClgIHRvIHNldCBhIHNpbmdsZSBDU1Mgc3R5bGUuXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogYW5pbWF0ZSg1MDAsIHN0eWxlKHsgYmFja2dyb3VuZDogXCJyZWRcIiB9KSlcclxuICogYGBgXHJcbiAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBjYWxscyBga2V5ZnJhbWVzKClgIHRvIHNldCBhIENTUyBzdHlsZVxyXG4gKiB0byBkaWZmZXJlbnQgdmFsdWVzIGZvciBzdWNjZXNzaXZlIGtleWZyYW1lcy5cclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBhbmltYXRlKDUwMCwga2V5ZnJhbWVzKFxyXG4gKiAgW1xyXG4gKiAgIHN0eWxlKHsgYmFja2dyb3VuZDogXCJibHVlXCIgfSkpLFxyXG4gKiAgIHN0eWxlKHsgYmFja2dyb3VuZDogXCJyZWRcIiB9KSlcclxuICogIF0pXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBhbmltYXRlKHRpbWluZ3M6IHN0cmluZyB8IG51bWJlciwgc3R5bGVzPzogQW5pbWF0aW9uU3R5bGVNZXRhZGF0YSB8IEFuaW1hdGlvbktleWZyYW1lc1NlcXVlbmNlTWV0YWRhdGEgfCBudWxsKTogQW5pbWF0aW9uQW5pbWF0ZU1ldGFkYXRhO1xyXG5cclxuLyoqXHJcbiAqIEV4ZWN1dGVzIGEgcXVlcmllZCBpbm5lciBhbmltYXRpb24gZWxlbWVudCB3aXRoaW4gYW4gYW5pbWF0aW9uIHNlcXVlbmNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gb3B0aW9ucyBBbiBvcHRpb25zIG9iamVjdCB0aGF0IGNhbiBjb250YWluIGEgZGVsYXkgdmFsdWUgZm9yIHRoZSBzdGFydCBvZiB0aGVcclxuICogYW5pbWF0aW9uLCBhbmQgYWRkaXRpb25hbCBvdmVycmlkZSB2YWx1ZXMgZm9yIGRldmVsb3Blci1kZWZpbmVkIHBhcmFtZXRlcnMuXHJcbiAqIEByZXR1cm4gQW4gb2JqZWN0IHRoYXQgZW5jYXBzdWxhdGVzIHRoZSBjaGlsZCBhbmltYXRpb24gZGF0YS5cclxuICpcclxuICogQHVzYWdlTm90ZXNcclxuICogRWFjaCB0aW1lIGFuIGFuaW1hdGlvbiBpcyB0cmlnZ2VyZWQgaW4gQW5ndWxhciwgdGhlIHBhcmVudCBhbmltYXRpb25cclxuICogaGFzIHByaW9yaXR5IGFuZCBhbnkgY2hpbGQgYW5pbWF0aW9ucyBhcmUgYmxvY2tlZC4gSW4gb3JkZXJcclxuICogZm9yIGEgY2hpbGQgYW5pbWF0aW9uIHRvIHJ1biwgdGhlIHBhcmVudCBhbmltYXRpb24gbXVzdCBxdWVyeSBlYWNoIG9mIHRoZSBlbGVtZW50c1xyXG4gKiBjb250YWluaW5nIGNoaWxkIGFuaW1hdGlvbnMsIGFuZCBydW4gdGhlbSB1c2luZyB0aGlzIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBOb3RlIHRoYXQgdGhpcyBmZWF0dXJlIGlzIGRlc2lnbmVkIHRvIGJlIHVzZWQgd2l0aCBgcXVlcnkoKWAgYW5kIGl0IHdpbGwgb25seSB3b3JrXHJcbiAqIHdpdGggYW5pbWF0aW9ucyB0aGF0IGFyZSBhc3NpZ25lZCB1c2luZyB0aGUgQW5ndWxhciBhbmltYXRpb24gbGlicmFyeS4gQ1NTIGtleWZyYW1lc1xyXG4gKiBhbmQgdHJhbnNpdGlvbnMgYXJlIG5vdCBoYW5kbGVkIGJ5IHRoaXMgQVBJLlxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBhbmltYXRlQ2hpbGQob3B0aW9ucz86IEFuaW1hdGVDaGlsZE9wdGlvbnMgfCBudWxsKTogQW5pbWF0aW9uQW5pbWF0ZUNoaWxkTWV0YWRhdGE7XHJcblxyXG4vKipcclxuICogQWRkcyBkdXJhdGlvbiBvcHRpb25zIHRvIGNvbnRyb2wgYW5pbWF0aW9uIHN0eWxpbmcgYW5kIHRpbWluZyBmb3IgYSBjaGlsZCBhbmltYXRpb24uXHJcbiAqXHJcbiAqIEBzZWUgYGFuaW1hdGVDaGlsZCgpYFxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQW5pbWF0ZUNoaWxkT3B0aW9ucyBleHRlbmRzIEFuaW1hdGlvbk9wdGlvbnMge1xyXG4gICAgZHVyYXRpb24/OiBudW1iZXIgfCBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuaW1hdGlvbi1zdGVwIHRpbWluZyBwYXJhbWV0ZXJzIGZvciBhbiBhbmltYXRpb24gc3RlcC5cclxuICogQHNlZSBgYW5pbWF0ZSgpYFxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSB0eXBlIEFuaW1hdGVUaW1pbmdzID0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZnVsbCBkdXJhdGlvbiBvZiBhbiBhbmltYXRpb24gc3RlcC4gQSBudW1iZXIgYW5kIG9wdGlvbmFsIHRpbWUgdW5pdCxcclxuICAgICAqIHN1Y2ggYXMgXCIxc1wiIG9yIFwiMTBtc1wiIGZvciBvbmUgc2Vjb25kIGFuZCAxMCBtaWxsaXNlY29uZHMsIHJlc3BlY3RpdmVseS5cclxuICAgICAqIFRoZSBkZWZhdWx0IHVuaXQgaXMgbWlsbGlzZWNvbmRzLlxyXG4gICAgICovXHJcbiAgICBkdXJhdGlvbjogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGVsYXkgaW4gYXBwbHlpbmcgYW4gYW5pbWF0aW9uIHN0ZXAuIEEgbnVtYmVyIGFuZCBvcHRpb25hbCB0aW1lIHVuaXQuXHJcbiAgICAgKiBUaGUgZGVmYXVsdCB1bml0IGlzIG1pbGxpc2Vjb25kcy5cclxuICAgICAqL1xyXG4gICAgZGVsYXk6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogQW4gZWFzaW5nIHN0eWxlIHRoYXQgY29udHJvbHMgaG93IGFuIGFuaW1hdGlvbnMgc3RlcCBhY2NlbGVyYXRlc1xyXG4gICAgICogYW5kIGRlY2VsZXJhdGVzIGR1cmluZyBpdHMgcnVuIHRpbWUuIEFuIGVhc2luZyBmdW5jdGlvbiBzdWNoIGFzIGBjdWJpYy1iZXppZXIoKWAsXHJcbiAgICAgKiBvciBvbmUgb2YgdGhlIGZvbGxvd2luZyBjb25zdGFudHM6XHJcbiAgICAgKiAtIGBlYXNlLWluYFxyXG4gICAgICogLSBgZWFzZS1vdXRgXHJcbiAgICAgKiAtIGBlYXNlLWluLWFuZC1vdXRgXHJcbiAgICAgKi9cclxuICAgIGVhc2luZzogc3RyaW5nIHwgbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9kdWNlcyBhIHJldXNhYmxlIGFuaW1hdGlvbiB0aGF0IGNhbiBiZSBpbnZva2VkIGluIGFub3RoZXIgYW5pbWF0aW9uIG9yIHNlcXVlbmNlLFxyXG4gKiBieSBjYWxsaW5nIHRoZSBgdXNlQW5pbWF0aW9uKClgIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RlcHMgT25lIG9yIG1vcmUgYW5pbWF0aW9uIG9iamVjdHMsIGFzIHJldHVybmVkIGJ5IHRoZSBgYW5pbWF0ZSgpYFxyXG4gKiBvciBgc2VxdWVuY2UoKWAgZnVuY3Rpb24sIHRoYXQgZm9ybSBhIHRyYW5zZm9ybWF0aW9uIGZyb20gb25lIHN0YXRlIHRvIGFub3RoZXIuXHJcbiAqIEEgc2VxdWVuY2UgaXMgdXNlZCBieSBkZWZhdWx0IHdoZW4geW91IHBhc3MgYW4gYXJyYXkuXHJcbiAqIEBwYXJhbSBvcHRpb25zIEFuIG9wdGlvbnMgb2JqZWN0IHRoYXQgY2FuIGNvbnRhaW4gYSBkZWxheSB2YWx1ZSBmb3IgdGhlIHN0YXJ0IG9mIHRoZVxyXG4gKiBhbmltYXRpb24sIGFuZCBhZGRpdGlvbmFsIGRldmVsb3Blci1kZWZpbmVkIHBhcmFtZXRlcnMuXHJcbiAqIFByb3ZpZGVkIHZhbHVlcyBmb3IgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGFyZSB1c2VkIGFzIGRlZmF1bHRzLFxyXG4gKiBhbmQgb3ZlcnJpZGUgdmFsdWVzIGNhbiBiZSBwYXNzZWQgdG8gdGhlIGNhbGxlciBvbiBpbnZvY2F0aW9uLlxyXG4gKiBAcmV0dXJucyBBbiBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgdGhlIGFuaW1hdGlvbiBkYXRhLlxyXG4gKlxyXG4gKiBAdXNhZ2VOb3Rlc1xyXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgZGVmaW5lcyBhIHJldXNhYmxlIGFuaW1hdGlvbiwgcHJvdmlkaW5nIHNvbWUgZGVmYXVsdCBwYXJhbWV0ZXJcclxuICogdmFsdWVzLlxyXG4gKlxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIHZhciBmYWRlQW5pbWF0aW9uID0gYW5pbWF0aW9uKFtcclxuICogICBzdHlsZSh7IG9wYWNpdHk6ICd7eyBzdGFydCB9fScgfSksXHJcbiAqICAgYW5pbWF0ZSgne3sgdGltZSB9fScsXHJcbiAqICAgc3R5bGUoeyBvcGFjaXR5OiAne3sgZW5kIH19J30pKVxyXG4gKiAgIF0sXHJcbiAqICAgeyBwYXJhbXM6IHsgdGltZTogJzEwMDBtcycsIHN0YXJ0OiAwLCBlbmQ6IDEgfX0pO1xyXG4gKiBgYGBcclxuICpcclxuICogVGhlIGZvbGxvd2luZyBpbnZva2VzIHRoZSBkZWZpbmVkIGFuaW1hdGlvbiB3aXRoIGEgY2FsbCB0byBgdXNlQW5pbWF0aW9uKClgLFxyXG4gKiBwYXNzaW5nIGluIG92ZXJyaWRlIHBhcmFtZXRlciB2YWx1ZXMuXHJcbiAqXHJcbiAqIGBgYGpzXHJcbiAqIHVzZUFuaW1hdGlvbihmYWRlQW5pbWF0aW9uLCB7XHJcbiAqICAgcGFyYW1zOiB7XHJcbiAqICAgICB0aW1lOiAnMnMnLFxyXG4gKiAgICAgc3RhcnQ6IDEsXHJcbiAqICAgICBlbmQ6IDBcclxuICogICB9XHJcbiAqIH0pXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBJZiBhbnkgb2YgdGhlIHBhc3NlZC1pbiBwYXJhbWV0ZXIgdmFsdWVzIGFyZSBtaXNzaW5nIGZyb20gdGhpcyBjYWxsLFxyXG4gKiB0aGUgZGVmYXVsdCB2YWx1ZXMgYXJlIHVzZWQuIElmIG9uZSBvciBtb3JlIHBhcmFtZXRlciB2YWx1ZXMgYXJlIG1pc3NpbmcgYmVmb3JlIGEgc3RlcCBpc1xyXG4gKiBhbmltYXRlZCwgYHVzZUFuaW1hdGlvbigpYCB0aHJvd3MgYW4gZXJyb3IuXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIGFuaW1hdGlvbihzdGVwczogQW5pbWF0aW9uTWV0YWRhdGEgfCBBbmltYXRpb25NZXRhZGF0YVtdLCBvcHRpb25zPzogQW5pbWF0aW9uT3B0aW9ucyB8IG51bGwpOiBBbmltYXRpb25SZWZlcmVuY2VNZXRhZGF0YTtcclxuXHJcbi8qKlxyXG4gKiBFbmNhcHN1bGF0ZXMgYSBjaGlsZCBhbmltYXRpb24sIHRoYXQgY2FuIGJlIHJ1biBleHBsaWNpdGx5IHdoZW4gdGhlIHBhcmVudCBpcyBydW4uXHJcbiAqIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnkgdGhlIGBhbmltYXRlQ2hpbGRgIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQW5pbWF0aW9uQW5pbWF0ZUNoaWxkTWV0YWRhdGEgZXh0ZW5kcyBBbmltYXRpb25NZXRhZGF0YSB7XHJcbiAgICAvKipcclxuICAgICAqIEFuIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmcgYSBkZWxheSBhbmRcclxuICAgICAqIGRldmVsb3Blci1kZWZpbmVkIHBhcmFtZXRlcnMgdGhhdCBwcm92aWRlIHN0eWxpbmcgZGVmYXVsdHMgYW5kXHJcbiAgICAgKiBjYW4gYmUgb3ZlcnJpZGRlbiBvbiBpbnZvY2F0aW9uLiBEZWZhdWx0IGRlbGF5IGlzIDAuXHJcbiAgICAgKi9cclxuICAgIG9wdGlvbnM6IEFuaW1hdGlvbk9wdGlvbnMgfCBudWxsO1xyXG59XHJcblxyXG4vKipcclxuICogRW5jYXBzdWxhdGVzIGFuIGFuaW1hdGlvbiBzdGVwLiBJbnN0YW50aWF0ZWQgYW5kIHJldHVybmVkIGJ5XHJcbiAqIHRoZSBgYW5pbWF0ZSgpYCBmdW5jdGlvbi5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEFuaW1hdGlvbkFuaW1hdGVNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIHRpbWluZyBkYXRhIGZvciB0aGUgc3RlcC5cclxuICAgICAqL1xyXG4gICAgdGltaW5nczogc3RyaW5nIHwgbnVtYmVyIHwgQW5pbWF0ZVRpbWluZ3M7XHJcbiAgICAvKipcclxuICAgICAqIEEgc2V0IG9mIHN0eWxlcyB1c2VkIGluIHRoZSBzdGVwLlxyXG4gICAgICovXHJcbiAgICBzdHlsZXM6IEFuaW1hdGlvblN0eWxlTWV0YWRhdGEgfCBBbmltYXRpb25LZXlmcmFtZXNTZXF1ZW5jZU1ldGFkYXRhIHwgbnVsbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVuY2Fwc3VsYXRlcyBhIHJldXNhYmxlIGFuaW1hdGlvbi5cclxuICogSW5zdGFudGlhdGVkIGFuZCByZXR1cm5lZCBieSB0aGUgYHVzZUFuaW1hdGlvbigpYCBmdW5jdGlvbi5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEFuaW1hdGlvbkFuaW1hdGVSZWZNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcclxuICAgIC8qKlxyXG4gICAgICogQW4gYW5pbWF0aW9uIHJlZmVyZW5jZSBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGFuaW1hdGlvbjogQW5pbWF0aW9uUmVmZXJlbmNlTWV0YWRhdGE7XHJcbiAgICAvKipcclxuICAgICAqIEFuIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmcgYSBkZWxheSBhbmRcclxuICAgICAqIGRldmVsb3Blci1kZWZpbmVkIHBhcmFtZXRlcnMgdGhhdCBwcm92aWRlIHN0eWxpbmcgZGVmYXVsdHMgYW5kXHJcbiAgICAgKiBjYW4gYmUgb3ZlcnJpZGRlbiBvbiBpbnZvY2F0aW9uLiBEZWZhdWx0IGRlbGF5IGlzIDAuXHJcbiAgICAgKi9cclxuICAgIG9wdGlvbnM6IEFuaW1hdGlvbk9wdGlvbnMgfCBudWxsO1xyXG59XHJcblxyXG4vKipcclxuICogQW4gaW5qZWN0YWJsZSBzZXJ2aWNlIHRoYXQgcHJvZHVjZXMgYW4gYW5pbWF0aW9uIHNlcXVlbmNlIHByb2dyYW1tYXRpY2FsbHkgd2l0aGluIGFuXHJcbiAqIEFuZ3VsYXIgY29tcG9uZW50IG9yIGRpcmVjdGl2ZS5cclxuICogUHJvdmlkZWQgYnkgdGhlIGBCcm93c2VyQW5pbWF0aW9uc01vZHVsZWAgb3IgYE5vb3BBbmltYXRpb25zTW9kdWxlYC5cclxuICpcclxuICogQHVzYWdlTm90ZXNcclxuICpcclxuICogVG8gdXNlIHRoaXMgc2VydmljZSwgYWRkIGl0IHRvIHlvdXIgY29tcG9uZW50IG9yIGRpcmVjdGl2ZSBhcyBhIGRlcGVuZGVuY3kuXHJcbiAqIFRoZSBzZXJ2aWNlIGlzIGluc3RhbnRpYXRlZCBhbG9uZyB3aXRoIHlvdXIgY29tcG9uZW50LlxyXG4gKlxyXG4gKiBBcHBzIGRvIG5vdCB0eXBpY2FsbHkgbmVlZCB0byBjcmVhdGUgdGhlaXIgb3duIGFuaW1hdGlvbiBwbGF5ZXJzLCBidXQgaWYgeW91XHJcbiAqIGRvIG5lZWQgdG8sIGZvbGxvdyB0aGVzZSBzdGVwczpcclxuICpcclxuICogMS4gVXNlIHRoZSBgYnVpbGQoKWAgbWV0aG9kIHRvIGNyZWF0ZSBhIHByb2dyYW1tYXRpYyBhbmltYXRpb24gdXNpbmcgdGhlXHJcbiAqIGBhbmltYXRlKClgIGZ1bmN0aW9uLiBUaGUgbWV0aG9kIHJldHVybnMgYW4gYEFuaW1hdGlvbkZhY3RvcnlgIGluc3RhbmNlLlxyXG4gKlxyXG4gKiAyLiBVc2UgdGhlIGZhY3Rvcnkgb2JqZWN0IHRvIGNyZWF0ZSBhbiBgQW5pbWF0aW9uUGxheWVyYCBhbmQgYXR0YWNoIGl0IHRvIGEgRE9NIGVsZW1lbnQuXHJcbiAqXHJcbiAqIDMuIFVzZSB0aGUgcGxheWVyIG9iamVjdCB0byBjb250cm9sIHRoZSBhbmltYXRpb24gcHJvZ3JhbW1hdGljYWxseS5cclxuICpcclxuICogRm9yIGV4YW1wbGU6XHJcbiAqXHJcbiAqIGBgYHRzXHJcbiAqIC8vIGltcG9ydCB0aGUgc2VydmljZSBmcm9tIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlXHJcbiAqIGltcG9ydCB7QW5pbWF0aW9uQnVpbGRlcn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbiAqIC8vIHJlcXVpcmUgdGhlIHNlcnZpY2UgYXMgYSBkZXBlbmRlbmN5XHJcbiAqIGNsYXNzIE15Q21wIHtcclxuICogICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9idWlsZGVyOiBBbmltYXRpb25CdWlsZGVyKSB7fVxyXG4gKlxyXG4gKiAgIG1ha2VBbmltYXRpb24oZWxlbWVudDogYW55KSB7XHJcbiAqICAgICAvLyBmaXJzdCBkZWZpbmUgYSByZXVzYWJsZSBhbmltYXRpb25cclxuICogICAgIGNvbnN0IG15QW5pbWF0aW9uID0gdGhpcy5fYnVpbGRlci5idWlsZChbXHJcbiAqICAgICAgIHN0eWxlKHsgd2lkdGg6IDAgfSksXHJcbiAqICAgICAgIGFuaW1hdGUoMTAwMCwgc3R5bGUoeyB3aWR0aDogJzEwMHB4JyB9KSlcclxuICogICAgIF0pO1xyXG4gKlxyXG4gKiAgICAgLy8gdXNlIHRoZSByZXR1cm5lZCBmYWN0b3J5IG9iamVjdCB0byBjcmVhdGUgYSBwbGF5ZXJcclxuICogICAgIGNvbnN0IHBsYXllciA9IG15QW5pbWF0aW9uLmNyZWF0ZShlbGVtZW50KTtcclxuICpcclxuICogICAgIHBsYXllci5wbGF5KCk7XHJcbiAqICAgfVxyXG4gKiB9XHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBhYnN0cmFjdCBjbGFzcyBBbmltYXRpb25CdWlsZGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogQnVpbGRzIGEgZmFjdG9yeSBmb3IgcHJvZHVjaW5nIGEgZGVmaW5lZCBhbmltYXRpb24uXHJcbiAgICAgKiBAcGFyYW0gYW5pbWF0aW9uIEEgcmV1c2FibGUgYW5pbWF0aW9uIGRlZmluaXRpb24uXHJcbiAgICAgKiBAcmV0dXJucyBBIGZhY3Rvcnkgb2JqZWN0IHRoYXQgY2FuIGNyZWF0ZSBhIHBsYXllciBmb3IgdGhlIGRlZmluZWQgYW5pbWF0aW9uLlxyXG4gICAgICogQHNlZSBgYW5pbWF0ZSgpYFxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBidWlsZChhbmltYXRpb246IEFuaW1hdGlvbk1ldGFkYXRhIHwgQW5pbWF0aW9uTWV0YWRhdGFbXSk6IEFuaW1hdGlvbkZhY3Rvcnk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzcyBpcyByZXR1cm5lZCBhcyBhbiBldmVudCBwYXJhbWV0ZXIgd2hlbiBhbiBhbmltYXRpb25cclxuICogY2FsbGJhY2sgaXMgY2FwdHVyZWQgZm9yIGFuIGFuaW1hdGlvbiBlaXRoZXIgZHVyaW5nIHRoZSBzdGFydCBvciBkb25lIHBoYXNlLlxyXG4gKlxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgIGhvc3Q6IHtcclxuICogICAgICdbQG15QW5pbWF0aW9uVHJpZ2dlcl0nOiAnc29tZUV4cHJlc3Npb24nLFxyXG4gKiAgICAgJyhAbXlBbmltYXRpb25UcmlnZ2VyLnN0YXJ0KSc6ICdjYXB0dXJlU3RhcnRFdmVudCgkZXZlbnQpJyxcclxuICogICAgICcoQG15QW5pbWF0aW9uVHJpZ2dlci5kb25lKSc6ICdjYXB0dXJlRG9uZUV2ZW50KCRldmVudCknLFxyXG4gKiAgIH0sXHJcbiAqICAgYW5pbWF0aW9uczogW1xyXG4gKiAgICAgdHJpZ2dlcihcIm15QW5pbWF0aW9uVHJpZ2dlclwiLCBbXHJcbiAqICAgICAgICAvLyAuLi5cclxuICogICAgIF0pXHJcbiAqICAgXVxyXG4gKiB9KVxyXG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XHJcbiAqICAgc29tZUV4cHJlc3Npb246IGFueSA9IGZhbHNlO1xyXG4gKiAgIGNhcHR1cmVTdGFydEV2ZW50KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xyXG4gKiAgICAgLy8gdGhlIHRvU3RhdGUsIGZyb21TdGF0ZSBhbmQgdG90YWxUaW1lIGRhdGEgaXMgYWNjZXNzaWJsZSBmcm9tIHRoZSBldmVudCB2YXJpYWJsZVxyXG4gKiAgIH1cclxuICpcclxuICogICBjYXB0dXJlRG9uZUV2ZW50KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xyXG4gKiAgICAgLy8gdGhlIHRvU3RhdGUsIGZyb21TdGF0ZSBhbmQgdG90YWxUaW1lIGRhdGEgaXMgYWNjZXNzaWJsZSBmcm9tIHRoZSBldmVudCB2YXJpYWJsZVxyXG4gKiAgIH1cclxuICogfVxyXG4gKiBgYGBcclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEFuaW1hdGlvbkV2ZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIHN0YXRlIGZyb20gd2hpY2ggdGhlIGFuaW1hdGlvbiBpcyB0cmlnZ2VyZWQuXHJcbiAgICAgKi9cclxuICAgIGZyb21TdGF0ZTogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgc3RhdGUgaW4gd2hpY2ggdGhlIGFuaW1hdGlvbiBjb21wbGV0ZXMuXHJcbiAgICAgKi9cclxuICAgIHRvU3RhdGU6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogVGhlIHRpbWUgaXQgdGFrZXMgdGhlIGFuaW1hdGlvbiB0byBjb21wbGV0ZSwgaW4gbWlsbGlzZWNvbmRzLlxyXG4gICAgICovXHJcbiAgICB0b3RhbFRpbWU6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGFuaW1hdGlvbiBwaGFzZSBpbiB3aGljaCB0aGUgY2FsbGJhY2sgd2FzIGludm9rZWQsIG9uZSBvZlxyXG4gICAgICogXCJzdGFydFwiIG9yIFwiZG9uZVwiLlxyXG4gICAgICovXHJcbiAgICBwaGFzZU5hbWU6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGVsZW1lbnQgdG8gd2hpY2ggdGhlIGFuaW1hdGlvbiBpcyBhdHRhY2hlZC5cclxuICAgICAqL1xyXG4gICAgZWxlbWVudDogYW55O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnRlcm5hbC5cclxuICAgICAqL1xyXG4gICAgdHJpZ2dlck5hbWU6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogSW50ZXJuYWwuXHJcbiAgICAgKi9cclxuICAgIGRpc2FibGVkOiBib29sZWFuO1xyXG59XHJcblxyXG4vKipcclxuICogQSBmYWN0b3J5IG9iamVjdCByZXR1cm5lZCBmcm9tIHRoZSBgQW5pbWF0aW9uQnVpbGRlcmAuYGJ1aWxkKClgIG1ldGhvZC5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgYWJzdHJhY3QgY2xhc3MgQW5pbWF0aW9uRmFjdG9yeSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gYEFuaW1hdGlvblBsYXllcmAgaW5zdGFuY2UgZm9yIHRoZSByZXVzYWJsZSBhbmltYXRpb24gZGVmaW5lZCBieVxyXG4gICAgICogdGhlIGBBbmltYXRpb25CdWlsZGVyYC5gYnVpbGQoKWAgbWV0aG9kIHRoYXQgY3JlYXRlZCB0aGlzIGZhY3RvcnkuXHJcbiAgICAgKiBBdHRhY2hlcyB0aGUgbmV3IHBsYXllciBhIERPTSBlbGVtZW50LlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgVGhlIERPTSBlbGVtZW50IHRvIHdoaWNoIHRvIGF0dGFjaCB0aGUgYW5pbWF0aW9uLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgQSBzZXQgb2Ygb3B0aW9ucyB0aGF0IGNhbiBpbmNsdWRlIGEgdGltZSBkZWxheSBhbmRcclxuICAgICAqIGFkZGl0aW9uYWwgZGV2ZWxvcGVyLWRlZmluZWQgcGFyYW1ldGVycy5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgY3JlYXRlKGVsZW1lbnQ6IGFueSwgb3B0aW9ucz86IEFuaW1hdGlvbk9wdGlvbnMpOiBBbmltYXRpb25QbGF5ZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbmNhcHN1bGF0ZXMgYW4gYW5pbWF0aW9uIGdyb3VwLlxyXG4gKiBJbnN0YW50aWF0ZWQgYW5kIHJldHVybmVkIGJ5IHRoZSBge0BsaW5rIGFuaW1hdGlvbnMvZ3JvdXAgZ3JvdXAoKX1gIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQW5pbWF0aW9uR3JvdXBNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcclxuICAgIC8qKlxyXG4gICAgICogT25lIG9yIG1vcmUgYW5pbWF0aW9uIG9yIHN0eWxlIHN0ZXBzIHRoYXQgZm9ybSB0aGlzIGdyb3VwLlxyXG4gICAgICovXHJcbiAgICBzdGVwczogQW5pbWF0aW9uTWV0YWRhdGFbXTtcclxuICAgIC8qKlxyXG4gICAgICogQW4gb3B0aW9ucyBvYmplY3QgY29udGFpbmluZyBhIGRlbGF5IGFuZFxyXG4gICAgICogZGV2ZWxvcGVyLWRlZmluZWQgcGFyYW1ldGVycyB0aGF0IHByb3ZpZGUgc3R5bGluZyBkZWZhdWx0cyBhbmRcclxuICAgICAqIGNhbiBiZSBvdmVycmlkZGVuIG9uIGludm9jYXRpb24uIERlZmF1bHQgZGVsYXkgaXMgMC5cclxuICAgICAqL1xyXG4gICAgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9ucyB8IG51bGw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbmNhcHN1bGF0ZXMgYSBrZXlmcmFtZXMgc2VxdWVuY2UuIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnlcclxuICogdGhlIGBrZXlmcmFtZXMoKWAgZnVuY3Rpb24uXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBBbmltYXRpb25LZXlmcmFtZXNTZXF1ZW5jZU1ldGFkYXRhIGV4dGVuZHMgQW5pbWF0aW9uTWV0YWRhdGEge1xyXG4gICAgLyoqXHJcbiAgICAgKiBBbiBhcnJheSBvZiBhbmltYXRpb24gc3R5bGVzLlxyXG4gICAgICovXHJcbiAgICBzdGVwczogQW5pbWF0aW9uU3R5bGVNZXRhZGF0YVtdO1xyXG59XHJcblxyXG4vKipcclxuICogQmFzZSBmb3IgYW5pbWF0aW9uIGRhdGEgc3RydWN0dXJlcy5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEFuaW1hdGlvbk1ldGFkYXRhIHtcclxuICAgIHR5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvbiBDb25zdGFudHMgZm9yIHRoZSBjYXRlZ29yaWVzIG9mIHBhcmFtZXRlcnMgdGhhdCBjYW4gYmUgZGVmaW5lZCBmb3IgYW5pbWF0aW9ucy5cclxuICpcclxuICogQSBjb3JyZXNwb25kaW5nIGZ1bmN0aW9uIGRlZmluZXMgYSBzZXQgb2YgcGFyYW1ldGVycyBmb3IgZWFjaCBjYXRlZ29yeSwgYW5kXHJcbiAqIGNvbGxlY3RzIHRoZW0gaW50byBhIGNvcnJlc3BvbmRpbmcgYEFuaW1hdGlvbk1ldGFkYXRhYCBvYmplY3QuXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IGVudW0gQW5pbWF0aW9uTWV0YWRhdGFUeXBlIHtcclxuICAgIC8qKlxyXG4gICAgICogQXNzb2NpYXRlcyBhIG5hbWVkIGFuaW1hdGlvbiBzdGF0ZSB3aXRoIGEgc2V0IG9mIENTUyBzdHlsZXMuXHJcbiAgICAgKiBTZWUgYHN0YXRlKClgXHJcbiAgICAgKi9cclxuICAgIFN0YXRlID0gMCxcclxuICAgIC8qKlxyXG4gICAgICogRGF0YSBmb3IgYSB0cmFuc2l0aW9uIGZyb20gb25lIGFuaW1hdGlvbiBzdGF0ZSB0byBhbm90aGVyLlxyXG4gICAgICogU2VlIGB0cmFuc2l0aW9uKClgXHJcbiAgICAgKi9cclxuICAgIFRyYW5zaXRpb24gPSAxLFxyXG4gICAgLyoqXHJcbiAgICAgKiBDb250YWlucyBhIHNldCBvZiBhbmltYXRpb24gc3RlcHMuXHJcbiAgICAgKiBTZWUgYHNlcXVlbmNlKClgXHJcbiAgICAgKi9cclxuICAgIFNlcXVlbmNlID0gMixcclxuICAgIC8qKlxyXG4gICAgICogQ29udGFpbnMgYSBzZXQgb2YgYW5pbWF0aW9uIHN0ZXBzLlxyXG4gICAgICogU2VlIGB7QGxpbmsgYW5pbWF0aW9ucy9ncm91cCBncm91cCgpfWBcclxuICAgICAqL1xyXG4gICAgR3JvdXAgPSAzLFxyXG4gICAgLyoqXHJcbiAgICAgKiBDb250YWlucyBhbiBhbmltYXRpb24gc3RlcC5cclxuICAgICAqIFNlZSBgYW5pbWF0ZSgpYFxyXG4gICAgICovXHJcbiAgICBBbmltYXRlID0gNCxcclxuICAgIC8qKlxyXG4gICAgICogQ29udGFpbnMgYSBzZXQgb2YgYW5pbWF0aW9uIHN0ZXBzLlxyXG4gICAgICogU2VlIGBrZXlmcmFtZXMoKWBcclxuICAgICAqL1xyXG4gICAgS2V5ZnJhbWVzID0gNSxcclxuICAgIC8qKlxyXG4gICAgICogQ29udGFpbnMgYSBzZXQgb2YgQ1NTIHByb3BlcnR5LXZhbHVlIHBhaXJzIGludG8gYSBuYW1lZCBzdHlsZS5cclxuICAgICAqIFNlZSBgc3R5bGUoKWBcclxuICAgICAqL1xyXG4gICAgU3R5bGUgPSA2LFxyXG4gICAgLyoqXHJcbiAgICAgKiBBc3NvY2lhdGVzIGFuIGFuaW1hdGlvbiB3aXRoIGFuIGVudHJ5IHRyaWdnZXIgdGhhdCBjYW4gYmUgYXR0YWNoZWQgdG8gYW4gZWxlbWVudC5cclxuICAgICAqIFNlZSBgdHJpZ2dlcigpYFxyXG4gICAgICovXHJcbiAgICBUcmlnZ2VyID0gNyxcclxuICAgIC8qKlxyXG4gICAgICogQ29udGFpbnMgYSByZS11c2FibGUgYW5pbWF0aW9uLlxyXG4gICAgICogU2VlIGBhbmltYXRpb24oKWBcclxuICAgICAqL1xyXG4gICAgUmVmZXJlbmNlID0gOCxcclxuICAgIC8qKlxyXG4gICAgICogQ29udGFpbnMgZGF0YSB0byB1c2UgaW4gZXhlY3V0aW5nIGNoaWxkIGFuaW1hdGlvbnMgcmV0dXJuZWQgYnkgYSBxdWVyeS5cclxuICAgICAqIFNlZSBgYW5pbWF0ZUNoaWxkKClgXHJcbiAgICAgKi9cclxuICAgIEFuaW1hdGVDaGlsZCA9IDksXHJcbiAgICAvKipcclxuICAgICAqIENvbnRhaW5zIGFuaW1hdGlvbiBwYXJhbWV0ZXJzIGZvciBhIHJlLXVzYWJsZSBhbmltYXRpb24uXHJcbiAgICAgKiBTZWUgYHVzZUFuaW1hdGlvbigpYFxyXG4gICAgICovXHJcbiAgICBBbmltYXRlUmVmID0gMTAsXHJcbiAgICAvKipcclxuICAgICAqIENvbnRhaW5zIGNoaWxkLWFuaW1hdGlvbiBxdWVyeSBkYXRhLlxyXG4gICAgICogU2VlIGBxdWVyeSgpYFxyXG4gICAgICovXHJcbiAgICBRdWVyeSA9IDExLFxyXG4gICAgLyoqXHJcbiAgICAgKiBDb250YWlucyBkYXRhIGZvciBzdGFnZ2VyaW5nIGFuIGFuaW1hdGlvbiBzZXF1ZW5jZS5cclxuICAgICAqIFNlZSBgc3RhZ2dlcigpYFxyXG4gICAgICovXHJcbiAgICBTdGFnZ2VyID0gMTJcclxufVxyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvbiBPcHRpb25zIHRoYXQgY29udHJvbCBhbmltYXRpb24gc3R5bGluZyBhbmQgdGltaW5nLlxyXG4gKlxyXG4gKiBUaGUgZm9sbG93aW5nIGFuaW1hdGlvbiBmdW5jdGlvbnMgYWNjZXB0IGBBbmltYXRpb25PcHRpb25zYCBkYXRhOlxyXG4gKlxyXG4gKiAtIGB0cmFuc2l0aW9uKClgXHJcbiAqIC0gYHNlcXVlbmNlKClgXHJcbiAqIC0gYHtAbGluayBhbmltYXRpb25zL2dyb3VwIGdyb3VwKCl9YFxyXG4gKiAtIGBxdWVyeSgpYFxyXG4gKiAtIGBhbmltYXRpb24oKWBcclxuICogLSBgdXNlQW5pbWF0aW9uKClgXHJcbiAqIC0gYGFuaW1hdGVDaGlsZCgpYFxyXG4gKlxyXG4gKiBQcm9ncmFtbWF0aWMgYW5pbWF0aW9ucyBidWlsdCB1c2luZyB0aGUgYEFuaW1hdGlvbkJ1aWxkZXJgIHNlcnZpY2UgYWxzb1xyXG4gKiBtYWtlIHVzZSBvZiBgQW5pbWF0aW9uT3B0aW9uc2AuXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBBbmltYXRpb25PcHRpb25zIHtcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBhIHRpbWUtZGVsYXkgZm9yIGluaXRpYXRpbmcgYW4gYW5pbWF0aW9uIGFjdGlvbi5cclxuICAgICAqIEEgbnVtYmVyIGFuZCBvcHRpb25hbCB0aW1lIHVuaXQsIHN1Y2ggYXMgXCIxc1wiIG9yIFwiMTBtc1wiIGZvciBvbmUgc2Vjb25kXHJcbiAgICAgKiBhbmQgMTAgbWlsbGlzZWNvbmRzLCByZXNwZWN0aXZlbHkuVGhlIGRlZmF1bHQgdW5pdCBpcyBtaWxsaXNlY29uZHMuXHJcbiAgICAgKiBEZWZhdWx0IHZhbHVlIGlzIDAsIG1lYW5pbmcgbm8gZGVsYXkuXHJcbiAgICAgKi9cclxuICAgIGRlbGF5PzogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBBIHNldCBvZiBkZXZlbG9wZXItZGVmaW5lZCBwYXJhbWV0ZXJzIHRoYXQgbW9kaWZ5IHN0eWxpbmcgYW5kIHRpbWluZ1xyXG4gICAgICogd2hlbiBhbiBhbmltYXRpb24gYWN0aW9uIHN0YXJ0cy4gQW4gYXJyYXkgb2Yga2V5LXZhbHVlIHBhaXJzLCB3aGVyZSB0aGUgcHJvdmlkZWQgdmFsdWVcclxuICAgICAqIGlzIHVzZWQgYXMgYSBkZWZhdWx0LlxyXG4gICAgICovXHJcbiAgICBwYXJhbXM/OiB7XHJcbiAgICAgICAgW25hbWU6IHN0cmluZ106IGFueTtcclxuICAgIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlcyBwcm9ncmFtbWF0aWMgY29udHJvbCBvZiBhIHJldXNhYmxlIGFuaW1hdGlvbiBzZXF1ZW5jZSxcclxuICogYnVpbHQgdXNpbmcgdGhlIGBidWlsZCgpYCBtZXRob2Qgb2YgYEFuaW1hdGlvbkJ1aWxkZXJgLiBUaGUgYGJ1aWxkKClgIG1ldGhvZFxyXG4gKiByZXR1cm5zIGEgZmFjdG9yeSwgd2hvc2UgYGNyZWF0ZSgpYCBtZXRob2QgaW5zdGFudGlhdGVzIGFuZCBpbml0aWFsaXplcyB0aGlzIGludGVyZmFjZS5cclxuICpcclxuICogQHNlZSBgQW5pbWF0aW9uQnVpbGRlcmBcclxuICogQHNlZSBgQW5pbWF0aW9uRmFjdG9yeWBcclxuICogQHNlZSBgYW5pbWF0ZSgpYFxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQW5pbWF0aW9uUGxheWVyIHtcclxuICAgIC8qKlxyXG4gICAgICogUHJvdmlkZXMgYSBjYWxsYmFjayB0byBpbnZva2Ugd2hlbiB0aGUgYW5pbWF0aW9uIGZpbmlzaGVzLlxyXG4gICAgICogQHBhcmFtIGZuIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqIEBzZWUgYGZpbmlzaCgpYFxyXG4gICAgICovXHJcbiAgICBvbkRvbmUoZm46ICgpID0+IHZvaWQpOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhIGNhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRoZSBhbmltYXRpb24gc3RhcnRzLlxyXG4gICAgICogQHBhcmFtIGZuIFRoZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqIEBzZWUgYHJ1bigpYFxyXG4gICAgICovXHJcbiAgICBvblN0YXJ0KGZuOiAoKSA9PiB2b2lkKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogUHJvdmlkZXMgYSBjYWxsYmFjayB0byBpbnZva2UgYWZ0ZXIgdGhlIGFuaW1hdGlvbiBpcyBkZXN0cm95ZWQuXHJcbiAgICAgKiBAcGFyYW0gZm4gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICogQHNlZSBgZGVzdHJveSgpYFxyXG4gICAgICogQHNlZSBgYmVmb3JlRGVzdHJveSgpYFxyXG4gICAgICovXHJcbiAgICBvbkRlc3Ryb3koZm46ICgpID0+IHZvaWQpOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgYW5pbWF0aW9uLlxyXG4gICAgICovXHJcbiAgICBpbml0KCk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIFJlcG9ydHMgd2hldGhlciB0aGUgYW5pbWF0aW9uIGhhcyBzdGFydGVkLlxyXG4gICAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgYW5pbWF0aW9uIGhhcyBzdGFydGVkLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgKi9cclxuICAgIGhhc1N0YXJ0ZWQoKTogYm9vbGVhbjtcclxuICAgIC8qKlxyXG4gICAgICogUnVucyB0aGUgYW5pbWF0aW9uLCBpbnZva2luZyB0aGUgYG9uU3RhcnQoKWAgY2FsbGJhY2suXHJcbiAgICAgKi9cclxuICAgIHBsYXkoKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogUGF1c2VzIHRoZSBhbmltYXRpb24uXHJcbiAgICAgKi9cclxuICAgIHBhdXNlKCk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIFJlc3RhcnRzIHRoZSBwYXVzZWQgYW5pbWF0aW9uLlxyXG4gICAgICovXHJcbiAgICByZXN0YXJ0KCk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIEVuZHMgdGhlIGFuaW1hdGlvbiwgaW52b2tpbmcgdGhlIGBvbkRvbmUoKWAgY2FsbGJhY2suXHJcbiAgICAgKi9cclxuICAgIGZpbmlzaCgpOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZXN0cm95cyB0aGUgYW5pbWF0aW9uLCBhZnRlciBpbnZva2luZyB0aGUgYGJlZm9yZURlc3Ryb3koKWAgY2FsbGJhY2suXHJcbiAgICAgKiBDYWxscyB0aGUgYG9uRGVzdHJveSgpYCBjYWxsYmFjayB3aGVuIGRlc3RydWN0aW9uIGlzIGNvbXBsZXRlZC5cclxuICAgICAqL1xyXG4gICAgZGVzdHJveSgpOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldHMgdGhlIGFuaW1hdGlvbiB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cclxuICAgICAqL1xyXG4gICAgcmVzZXQoKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGFuaW1hdGlvbi5cclxuICAgICAqIEBwYXJhbSBwb3NpdGlvbiBBIDAtYmFzZWQgb2Zmc2V0IGludG8gdGhlIGR1cmF0aW9uLCBpbiBtaWxsaXNlY29uZHMuXHJcbiAgICAgKi9cclxuICAgIHNldFBvc2l0aW9uKHBvc2l0aW9uOiBhbnkgLyoqIFRPRE8gIzkxMDAgKi8pOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXBvcnRzIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBhbmltYXRpb24uXHJcbiAgICAgKiBAcmV0dXJucyBBIDAtYmFzZWQgb2Zmc2V0IGludG8gdGhlIGR1cmF0aW9uLCBpbiBtaWxsaXNlY29uZHMuXHJcbiAgICAgKi9cclxuICAgIGdldFBvc2l0aW9uKCk6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIHBhcmVudCBvZiB0aGlzIHBsYXllciwgaWYgYW55LlxyXG4gICAgICovXHJcbiAgICBwYXJlbnRQbGF5ZXI6IEFuaW1hdGlvblBsYXllciB8IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0b3RhbCBydW4gdGltZSBvZiB0aGUgYW5pbWF0aW9uLCBpbiBtaWxsaXNlY29uZHMuXHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IHRvdGFsVGltZTogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhIGNhbGxiYWNrIHRvIGludm9rZSBiZWZvcmUgdGhlIGFuaW1hdGlvbiBpcyBkZXN0cm95ZWQuXHJcbiAgICAgKi9cclxuICAgIGJlZm9yZURlc3Ryb3k/OiAoKSA9PiBhbnk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbmNhcHN1bGF0ZXMgYW4gYW5pbWF0aW9uIHF1ZXJ5LiBJbnN0YW50aWF0ZWQgYW5kIHJldHVybmVkIGJ5XHJcbiAqIHRoZSBgcXVlcnkoKWAgZnVuY3Rpb24uXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBBbmltYXRpb25RdWVyeU1ldGFkYXRhIGV4dGVuZHMgQW5pbWF0aW9uTWV0YWRhdGEge1xyXG4gICAgLyoqXHJcbiAgICAgKiAgVGhlIENTUyBzZWxlY3RvciBmb3IgdGhpcyBxdWVyeS5cclxuICAgICAqL1xyXG4gICAgc2VsZWN0b3I6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogT25lIG9yIG1vcmUgYW5pbWF0aW9uIHN0ZXAgb2JqZWN0cy5cclxuICAgICAqL1xyXG4gICAgYW5pbWF0aW9uOiBBbmltYXRpb25NZXRhZGF0YSB8IEFuaW1hdGlvbk1ldGFkYXRhW107XHJcbiAgICAvKipcclxuICAgICAqIEEgcXVlcnkgb3B0aW9ucyBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIG9wdGlvbnM6IEFuaW1hdGlvblF1ZXJ5T3B0aW9ucyB8IG51bGw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbmNhcHN1bGF0ZXMgYW5pbWF0aW9uIHF1ZXJ5IG9wdGlvbnMuXHJcbiAqIFBhc3NlZCB0byB0aGUgYHF1ZXJ5KClgIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQW5pbWF0aW9uUXVlcnlPcHRpb25zIGV4dGVuZHMgQW5pbWF0aW9uT3B0aW9ucyB7XHJcbiAgICAvKipcclxuICAgICAqIFRydWUgaWYgdGhpcyBxdWVyeSBpcyBvcHRpb25hbCwgZmFsc2UgaWYgaXQgaXMgcmVxdWlyZWQuIERlZmF1bHQgaXMgZmFsc2UuXHJcbiAgICAgKiBBIHJlcXVpcmVkIHF1ZXJ5IHRocm93cyBhbiBlcnJvciBpZiBubyBlbGVtZW50cyBhcmUgcmV0cmlldmVkIHdoZW5cclxuICAgICAqIHRoZSBxdWVyeSBpcyBleGVjdXRlZC4gQW4gb3B0aW9uYWwgcXVlcnkgZG9lcyBub3QuXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBvcHRpb25hbD86IGJvb2xlYW47XHJcbiAgICAvKipcclxuICAgICAqIEEgbWF4aW11bSB0b3RhbCBudW1iZXIgb2YgcmVzdWx0cyB0byByZXR1cm4gZnJvbSB0aGUgcXVlcnkuXHJcbiAgICAgKiBJZiBuZWdhdGl2ZSwgcmVzdWx0cyBhcmUgbGltaXRlZCBmcm9tIHRoZSBlbmQgb2YgdGhlIHF1ZXJ5IGxpc3QgdG93YXJkcyB0aGUgYmVnaW5uaW5nLlxyXG4gICAgICogQnkgZGVmYXVsdCwgcmVzdWx0cyBhcmUgbm90IGxpbWl0ZWQuXHJcbiAgICAgKi9cclxuICAgIGxpbWl0PzogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogRW5jYXBzdWxhdGVzIGEgcmV1c2FibGUgYW5pbWF0aW9uLCB3aGljaCBpcyBhIGNvbGxlY3Rpb24gb2YgaW5kaXZpZHVhbCBhbmltYXRpb24gc3RlcHMuXHJcbiAqIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnkgdGhlIGBhbmltYXRpb24oKWAgZnVuY3Rpb24sIGFuZFxyXG4gKiBwYXNzZWQgdG8gdGhlIGB1c2VBbmltYXRpb24oKWAgZnVuY3Rpb24uXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBBbmltYXRpb25SZWZlcmVuY2VNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcclxuICAgIC8qKlxyXG4gICAgICogIE9uZSBvciBtb3JlIGFuaW1hdGlvbiBzdGVwIG9iamVjdHMuXHJcbiAgICAgKi9cclxuICAgIGFuaW1hdGlvbjogQW5pbWF0aW9uTWV0YWRhdGEgfCBBbmltYXRpb25NZXRhZGF0YVtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBBbiBvcHRpb25zIG9iamVjdCBjb250YWluaW5nIGEgZGVsYXkgYW5kXHJcbiAgICAgKiBkZXZlbG9wZXItZGVmaW5lZCBwYXJhbWV0ZXJzIHRoYXQgcHJvdmlkZSBzdHlsaW5nIGRlZmF1bHRzIGFuZFxyXG4gICAgICogY2FuIGJlIG92ZXJyaWRkZW4gb24gaW52b2NhdGlvbi4gRGVmYXVsdCBkZWxheSBpcyAwLlxyXG4gICAgICovXHJcbiAgICBvcHRpb25zOiBBbmltYXRpb25PcHRpb25zIHwgbnVsbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVuY2Fwc3VsYXRlcyBhbiBhbmltYXRpb24gc2VxdWVuY2UuXHJcbiAqIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnkgdGhlIGBzZXF1ZW5jZSgpYCBmdW5jdGlvbi5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEFuaW1hdGlvblNlcXVlbmNlTWV0YWRhdGEgZXh0ZW5kcyBBbmltYXRpb25NZXRhZGF0YSB7XHJcbiAgICAvKipcclxuICAgICAqICBBbiBhcnJheSBvZiBhbmltYXRpb24gc3RlcCBvYmplY3RzLlxyXG4gICAgICovXHJcbiAgICBzdGVwczogQW5pbWF0aW9uTWV0YWRhdGFbXTtcclxuICAgIC8qKlxyXG4gICAgICogQW4gb3B0aW9ucyBvYmplY3QgY29udGFpbmluZyBhIGRlbGF5IGFuZFxyXG4gICAgICogZGV2ZWxvcGVyLWRlZmluZWQgcGFyYW1ldGVycyB0aGF0IHByb3ZpZGUgc3R5bGluZyBkZWZhdWx0cyBhbmRcclxuICAgICAqIGNhbiBiZSBvdmVycmlkZGVuIG9uIGludm9jYXRpb24uIERlZmF1bHQgZGVsYXkgaXMgMC5cclxuICAgICAqL1xyXG4gICAgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9ucyB8IG51bGw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbmNhcHN1bGF0ZXMgcGFyYW1ldGVycyBmb3Igc3RhZ2dlcmluZyB0aGUgc3RhcnQgdGltZXMgb2YgYSBzZXQgb2YgYW5pbWF0aW9uIHN0ZXBzLlxyXG4gKiBJbnN0YW50aWF0ZWQgYW5kIHJldHVybmVkIGJ5IHRoZSBgc3RhZ2dlcigpYCBmdW5jdGlvbi5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKiovXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBBbmltYXRpb25TdGFnZ2VyTWV0YWRhdGEgZXh0ZW5kcyBBbmltYXRpb25NZXRhZGF0YSB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0aW1pbmcgZGF0YSBmb3IgdGhlIHN0ZXBzLlxyXG4gICAgICovXHJcbiAgICB0aW1pbmdzOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIE9uZSBvciBtb3JlIGFuaW1hdGlvbiBzdGVwcy5cclxuICAgICAqL1xyXG4gICAgYW5pbWF0aW9uOiBBbmltYXRpb25NZXRhZGF0YSB8IEFuaW1hdGlvbk1ldGFkYXRhW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbmNhcHN1bGF0ZXMgYW4gYW5pbWF0aW9uIHN0YXRlIGJ5IGFzc29jaWF0aW5nIGEgc3RhdGUgbmFtZSB3aXRoIGEgc2V0IG9mIENTUyBzdHlsZXMuXHJcbiAqIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnkgdGhlIGBzdGF0ZSgpYCBmdW5jdGlvbi5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEFuaW1hdGlvblN0YXRlTWV0YWRhdGEgZXh0ZW5kcyBBbmltYXRpb25NZXRhZGF0YSB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzdGF0ZSBuYW1lLCB1bmlxdWUgd2l0aGluIHRoZSBjb21wb25lbnQuXHJcbiAgICAgKi9cclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogIFRoZSBDU1Mgc3R5bGVzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHN0YXRlLlxyXG4gICAgICovXHJcbiAgICBzdHlsZXM6IEFuaW1hdGlvblN0eWxlTWV0YWRhdGE7XHJcbiAgICAvKipcclxuICAgICAqIEFuIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmdcclxuICAgICAqIGRldmVsb3Blci1kZWZpbmVkIHBhcmFtZXRlcnMgdGhhdCBwcm92aWRlIHN0eWxpbmcgZGVmYXVsdHMgYW5kXHJcbiAgICAgKiBjYW4gYmUgb3ZlcnJpZGRlbiBvbiBpbnZvY2F0aW9uLlxyXG4gICAgICovXHJcbiAgICBvcHRpb25zPzoge1xyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICBbbmFtZTogc3RyaW5nXTogYW55O1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG59XHJcblxyXG4vKipcclxuICogRW5jYXBzdWxhdGVzIGFuIGFuaW1hdGlvbiBzdHlsZS4gSW5zdGFudGlhdGVkIGFuZCByZXR1cm5lZCBieVxyXG4gKiB0aGUgYHN0eWxlKClgIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQW5pbWF0aW9uU3R5bGVNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcclxuICAgIC8qKlxyXG4gICAgICogQSBzZXQgb2YgQ1NTIHN0eWxlIHByb3BlcnRpZXMuXHJcbiAgICAgKi9cclxuICAgIHN0eWxlczogJyonIHwge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcjtcclxuICAgIH0gfCBBcnJheTx7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgfSB8ICcqJz47XHJcbiAgICAvKipcclxuICAgICAqIEEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgYW5pbWF0ZSB0aW1lIGF0IHdoaWNoIHRoZSBzdHlsZSBpcyB0byBiZSBhcHBsaWVkLlxyXG4gICAgICovXHJcbiAgICBvZmZzZXQ6IG51bWJlciB8IG51bGw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbmNhcHN1bGF0ZXMgYW4gYW5pbWF0aW9uIHRyYW5zaXRpb24uIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnkgdGhlXHJcbiAqIGB0cmFuc2l0aW9uKClgIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQW5pbWF0aW9uVHJhbnNpdGlvbk1ldGFkYXRhIGV4dGVuZHMgQW5pbWF0aW9uTWV0YWRhdGEge1xyXG4gICAgLyoqXHJcbiAgICAgKiBBbiBleHByZXNzaW9uIHRoYXQgZGVzY3JpYmVzIGEgc3RhdGUgY2hhbmdlLlxyXG4gICAgICovXHJcbiAgICBleHByOiBzdHJpbmcgfCAoKGZyb21TdGF0ZTogc3RyaW5nLCB0b1N0YXRlOiBzdHJpbmcsIGVsZW1lbnQ/OiBhbnksIHBhcmFtcz86IHtcclxuICAgICAgICBba2V5OiBzdHJpbmddOiBhbnk7XHJcbiAgICB9KSA9PiBib29sZWFuKTtcclxuICAgIC8qKlxyXG4gICAgICogT25lIG9yIG1vcmUgYW5pbWF0aW9uIG9iamVjdHMgdG8gd2hpY2ggdGhpcyB0cmFuc2l0aW9uIGFwcGxpZXMuXHJcbiAgICAgKi9cclxuICAgIGFuaW1hdGlvbjogQW5pbWF0aW9uTWV0YWRhdGEgfCBBbmltYXRpb25NZXRhZGF0YVtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBBbiBvcHRpb25zIG9iamVjdCBjb250YWluaW5nIGEgZGVsYXkgYW5kXHJcbiAgICAgKiBkZXZlbG9wZXItZGVmaW5lZCBwYXJhbWV0ZXJzIHRoYXQgcHJvdmlkZSBzdHlsaW5nIGRlZmF1bHRzIGFuZFxyXG4gICAgICogY2FuIGJlIG92ZXJyaWRkZW4gb24gaW52b2NhdGlvbi4gRGVmYXVsdCBkZWxheSBpcyAwLlxyXG4gICAgICovXHJcbiAgICBvcHRpb25zOiBBbmltYXRpb25PcHRpb25zIHwgbnVsbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnRhaW5zIGFuIGFuaW1hdGlvbiB0cmlnZ2VyLiBJbnN0YW50aWF0ZWQgYW5kIHJldHVybmVkIGJ5IHRoZVxyXG4gKiBgdHJpZ2dlcigpYCBmdW5jdGlvbi5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIHRyaWdnZXIgbmFtZSwgdXNlZCB0byBhc3NvY2lhdGUgaXQgd2l0aCBhbiBlbGVtZW50LiBVbmlxdWUgd2l0aGluIHRoZSBjb21wb25lbnQuXHJcbiAgICAgKi9cclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogQW4gYW5pbWF0aW9uIGRlZmluaXRpb24gb2JqZWN0LCBjb250YWluaW5nIGFuIGFycmF5IG9mIHN0YXRlIGFuZCB0cmFuc2l0aW9uIGRlY2xhcmF0aW9ucy5cclxuICAgICAqL1xyXG4gICAgZGVmaW5pdGlvbnM6IEFuaW1hdGlvbk1ldGFkYXRhW107XHJcbiAgICAvKipcclxuICAgICAqIEFuIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmcgYSBkZWxheSBhbmRcclxuICAgICAqIGRldmVsb3Blci1kZWZpbmVkIHBhcmFtZXRlcnMgdGhhdCBwcm92aWRlIHN0eWxpbmcgZGVmYXVsdHMgYW5kXHJcbiAgICAgKiBjYW4gYmUgb3ZlcnJpZGRlbiBvbiBpbnZvY2F0aW9uLiBEZWZhdWx0IGRlbGF5IGlzIDAuXHJcbiAgICAgKi9cclxuICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBwYXJhbXM/OiB7XHJcbiAgICAgICAgICAgIFtuYW1lOiBzdHJpbmddOiBhbnk7XHJcbiAgICAgICAgfTtcclxuICAgIH0gfCBudWxsO1xyXG59XHJcblxyXG4vKipcclxuICogU3BlY2lmaWVzIGF1dG9tYXRpYyBzdHlsaW5nLlxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjb25zdCBBVVRPX1NUWUxFID0gXCIqXCI7XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uIERlZmluZXMgYSBsaXN0IG9mIGFuaW1hdGlvbiBzdGVwcyB0byBiZSBydW4gaW4gcGFyYWxsZWwuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdGVwcyBBbiBhcnJheSBvZiBhbmltYXRpb24gc3RlcCBvYmplY3RzLlxyXG4gKiAtIFdoZW4gc3RlcHMgYXJlIGRlZmluZWQgYnkgYHN0eWxlKClgIG9yIGBhbmltYXRlKClgXHJcbiAqIGZ1bmN0aW9uIGNhbGxzLCBlYWNoIGNhbGwgd2l0aGluIHRoZSBncm91cCBpcyBleGVjdXRlZCBpbnN0YW50bHkuXHJcbiAqIC0gVG8gc3BlY2lmeSBvZmZzZXQgc3R5bGVzIHRvIGJlIGFwcGxpZWQgYXQgYSBsYXRlciB0aW1lLCBkZWZpbmUgc3RlcHMgd2l0aFxyXG4gKiBga2V5ZnJhbWVzKClgLCBvciB1c2UgYGFuaW1hdGUoKWAgY2FsbHMgd2l0aCBhIGRlbGF5IHZhbHVlLlxyXG4gKiBGb3IgZXhhbXBsZTpcclxuICpcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBncm91cChbXHJcbiAqICAgYW5pbWF0ZShcIjFzXCIsIHN0eWxlKHsgYmFja2dyb3VuZDogXCJibGFja1wiIH0pKSxcclxuICogICBhbmltYXRlKFwiMnNcIiwgc3R5bGUoeyBjb2xvcjogXCJ3aGl0ZVwiIH0pKVxyXG4gKiBdKVxyXG4gKiBgYGBcclxuICpcclxuICogQHBhcmFtIG9wdGlvbnMgQW4gb3B0aW9ucyBvYmplY3QgY29udGFpbmluZyBhIGRlbGF5IGFuZFxyXG4gKiBkZXZlbG9wZXItZGVmaW5lZCBwYXJhbWV0ZXJzIHRoYXQgcHJvdmlkZSBzdHlsaW5nIGRlZmF1bHRzIGFuZFxyXG4gKiBjYW4gYmUgb3ZlcnJpZGRlbiBvbiBpbnZvY2F0aW9uLlxyXG4gKlxyXG4gKiBAcmV0dXJuIEFuIG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyB0aGUgZ3JvdXAgZGF0YS5cclxuICpcclxuICogQHVzYWdlTm90ZXNcclxuICogR3JvdXBlZCBhbmltYXRpb25zIGFyZSB1c2VmdWwgd2hlbiBhIHNlcmllcyBvZiBzdHlsZXMgbXVzdCBiZVxyXG4gKiBhbmltYXRlZCBhdCBkaWZmZXJlbnQgc3RhcnRpbmcgdGltZXMgYW5kIGNsb3NlZCBvZmYgYXQgZGlmZmVyZW50IGVuZGluZyB0aW1lcy5cclxuICpcclxuICogV2hlbiBjYWxsZWQgd2l0aGluIGEgYHNlcXVlbmNlKClgIG9yIGFcclxuICogYHRyYW5zaXRpb24oKWAgY2FsbCwgZG9lcyBub3QgY29udGludWUgdG8gdGhlIG5leHRcclxuICogaW5zdHJ1Y3Rpb24gdW50aWwgYWxsIG9mIHRoZSBpbm5lciBhbmltYXRpb24gc3RlcHMgaGF2ZSBjb21wbGV0ZWQuXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIGdyb3VwKHN0ZXBzOiBBbmltYXRpb25NZXRhZGF0YVtdLCBvcHRpb25zPzogQW5pbWF0aW9uT3B0aW9ucyB8IG51bGwpOiBBbmltYXRpb25Hcm91cE1ldGFkYXRhO1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgYSBzZXQgb2YgYW5pbWF0aW9uIHN0eWxlcywgYXNzb2NpYXRpbmcgZWFjaCBzdHlsZSB3aXRoIGFuIG9wdGlvbmFsIGBvZmZzZXRgIHZhbHVlLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RlcHMgQSBzZXQgb2YgYW5pbWF0aW9uIHN0eWxlcyB3aXRoIG9wdGlvbmFsIG9mZnNldCBkYXRhLlxyXG4gKiBUaGUgb3B0aW9uYWwgYG9mZnNldGAgdmFsdWUgZm9yIGEgc3R5bGUgc3BlY2lmaWVzIGEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgYW5pbWF0aW9uXHJcbiAqIHRpbWUgYXQgd2hpY2ggdGhhdCBzdHlsZSBpcyBhcHBsaWVkLlxyXG4gKiBAcmV0dXJucyBBbiBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgdGhlIGtleWZyYW1lcyBkYXRhLlxyXG4gKlxyXG4gKiBAdXNhZ2VOb3Rlc1xyXG4gKiBVc2Ugd2l0aCB0aGUgYGFuaW1hdGUoKWAgY2FsbC4gSW5zdGVhZCBvZiBhcHBseWluZyBhbmltYXRpb25zXHJcbiAqIGZyb20gdGhlIGN1cnJlbnQgc3RhdGVcclxuICogdG8gdGhlIGRlc3RpbmF0aW9uIHN0YXRlLCBrZXlmcmFtZXMgZGVzY3JpYmUgaG93IGVhY2ggc3R5bGUgZW50cnkgaXMgYXBwbGllZCBhbmQgYXQgd2hhdCBwb2ludFxyXG4gKiB3aXRoaW4gdGhlIGFuaW1hdGlvbiBhcmMuXHJcbiAqIENvbXBhcmUgW0NTUyBLZXlmcmFtZSBBbmltYXRpb25zXShodHRwczovL3d3dy53M3NjaG9vbHMuY29tL2Nzcy9jc3MzX2FuaW1hdGlvbnMuYXNwKS5cclxuICpcclxuICogIyMjIFVzYWdlXHJcbiAqXHJcbiAqIEluIHRoZSBmb2xsb3dpbmcgZXhhbXBsZSwgdGhlIG9mZnNldCB2YWx1ZXMgZGVzY3JpYmVcclxuICogd2hlbiBlYWNoIGBiYWNrZ3JvdW5kQ29sb3JgIHZhbHVlIGlzIGFwcGxpZWQuIFRoZSBjb2xvciBpcyByZWQgYXQgdGhlIHN0YXJ0LCBhbmQgY2hhbmdlcyB0b1xyXG4gKiBibHVlIHdoZW4gMjAlIG9mIHRoZSB0b3RhbCB0aW1lIGhhcyBlbGFwc2VkLlxyXG4gKlxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIC8vIHRoZSBwcm92aWRlZCBvZmZzZXQgdmFsdWVzXHJcbiAqIGFuaW1hdGUoXCI1c1wiLCBrZXlmcmFtZXMoW1xyXG4gKiAgIHN0eWxlKHsgYmFja2dyb3VuZENvbG9yOiBcInJlZFwiLCBvZmZzZXQ6IDAgfSksXHJcbiAqICAgc3R5bGUoeyBiYWNrZ3JvdW5kQ29sb3I6IFwiYmx1ZVwiLCBvZmZzZXQ6IDAuMiB9KSxcclxuICogICBzdHlsZSh7IGJhY2tncm91bmRDb2xvcjogXCJvcmFuZ2VcIiwgb2Zmc2V0OiAwLjMgfSksXHJcbiAqICAgc3R5bGUoeyBiYWNrZ3JvdW5kQ29sb3I6IFwiYmxhY2tcIiwgb2Zmc2V0OiAxIH0pXHJcbiAqIF0pKVxyXG4gKiBgYGBcclxuICpcclxuICogSWYgdGhlcmUgYXJlIG5vIGBvZmZzZXRgIHZhbHVlcyBzcGVjaWZpZWQgaW4gdGhlIHN0eWxlIGVudHJpZXMsIHRoZSBvZmZzZXRzXHJcbiAqIGFyZSBjYWxjdWxhdGVkIGF1dG9tYXRpY2FsbHkuXHJcbiAqXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogYW5pbWF0ZShcIjVzXCIsIGtleWZyYW1lcyhbXHJcbiAqICAgc3R5bGUoeyBiYWNrZ3JvdW5kQ29sb3I6IFwicmVkXCIgfSkgLy8gb2Zmc2V0ID0gMFxyXG4gKiAgIHN0eWxlKHsgYmFja2dyb3VuZENvbG9yOiBcImJsdWVcIiB9KSAvLyBvZmZzZXQgPSAwLjMzXHJcbiAqICAgc3R5bGUoeyBiYWNrZ3JvdW5kQ29sb3I6IFwib3JhbmdlXCIgfSkgLy8gb2Zmc2V0ID0gMC42NlxyXG4gKiAgIHN0eWxlKHsgYmFja2dyb3VuZENvbG9yOiBcImJsYWNrXCIgfSkgLy8gb2Zmc2V0ID0gMVxyXG4gKiBdKSlcclxuICpgYGBcclxuXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIGtleWZyYW1lcyhzdGVwczogQW5pbWF0aW9uU3R5bGVNZXRhZGF0YVtdKTogQW5pbWF0aW9uS2V5ZnJhbWVzU2VxdWVuY2VNZXRhZGF0YTtcclxuXHJcbi8qKlxyXG4gKiBBbiBlbXB0eSBwcm9ncmFtbWF0aWMgY29udHJvbGxlciBmb3IgcmV1c2FibGUgYW5pbWF0aW9ucy5cclxuICogVXNlZCBpbnRlcm5hbGx5IHdoZW4gYW5pbWF0aW9ucyBhcmUgZGlzYWJsZWQsIHRvIGF2b2lkXHJcbiAqIGNoZWNraW5nIGZvciB0aGUgbnVsbCBjYXNlIHdoZW4gYW4gYW5pbWF0aW9uIHBsYXllciBpcyBleHBlY3RlZC5cclxuICpcclxuICogQHNlZSBgYW5pbWF0ZSgpYFxyXG4gKiBAc2VlIGBBbmltYXRpb25QbGF5ZXJgXHJcbiAqIEBzZWUgYEdyb3VwUGxheWVyYFxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBOb29wQW5pbWF0aW9uUGxheWVyIGltcGxlbWVudHMgQW5pbWF0aW9uUGxheWVyIHtcclxuICAgIHByaXZhdGUgX29uRG9uZUZucztcclxuICAgIHByaXZhdGUgX29uU3RhcnRGbnM7XHJcbiAgICBwcml2YXRlIF9vbkRlc3Ryb3lGbnM7XHJcbiAgICBwcml2YXRlIF9zdGFydGVkO1xyXG4gICAgcHJpdmF0ZSBfZGVzdHJveWVkO1xyXG4gICAgcHJpdmF0ZSBfZmluaXNoZWQ7XHJcbiAgICBwYXJlbnRQbGF5ZXI6IEFuaW1hdGlvblBsYXllciB8IG51bGw7XHJcbiAgICByZWFkb25seSB0b3RhbFRpbWU6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKGR1cmF0aW9uPzogbnVtYmVyLCBkZWxheT86IG51bWJlcik7XHJcbiAgICBwcml2YXRlIF9vbkZpbmlzaDtcclxuICAgIG9uU3RhcnQoZm46ICgpID0+IHZvaWQpOiB2b2lkO1xyXG4gICAgb25Eb25lKGZuOiAoKSA9PiB2b2lkKTogdm9pZDtcclxuICAgIG9uRGVzdHJveShmbjogKCkgPT4gdm9pZCk6IHZvaWQ7XHJcbiAgICBoYXNTdGFydGVkKCk6IGJvb2xlYW47XHJcbiAgICBpbml0KCk6IHZvaWQ7XHJcbiAgICBwbGF5KCk6IHZvaWQ7XHJcbiAgICBwcml2YXRlIF9vblN0YXJ0O1xyXG4gICAgcGF1c2UoKTogdm9pZDtcclxuICAgIHJlc3RhcnQoKTogdm9pZDtcclxuICAgIGZpbmlzaCgpOiB2b2lkO1xyXG4gICAgZGVzdHJveSgpOiB2b2lkO1xyXG4gICAgcmVzZXQoKTogdm9pZDtcclxuICAgIHNldFBvc2l0aW9uKHBvc2l0aW9uOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgZ2V0UG9zaXRpb24oKTogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZHMgb25lIG9yIG1vcmUgaW5uZXIgZWxlbWVudHMgd2l0aGluIHRoZSBjdXJyZW50IGVsZW1lbnQgdGhhdCBpc1xyXG4gKiBiZWluZyBhbmltYXRlZCB3aXRoaW4gYSBzZXF1ZW5jZS4gVXNlIHdpdGggYGFuaW1hdGUoKWAuXHJcbiAqXHJcbiAqIEBwYXJhbSBzZWxlY3RvciBUaGUgZWxlbWVudCB0byBxdWVyeSwgb3IgYSBzZXQgb2YgZWxlbWVudHMgdGhhdCBjb250YWluIEFuZ3VsYXItc3BlY2lmaWNcclxuICogY2hhcmFjdGVyaXN0aWNzLCBzcGVjaWZpZWQgd2l0aCBvbmUgb3IgbW9yZSBvZiB0aGUgZm9sbG93aW5nIHRva2Vucy5cclxuICogIC0gYHF1ZXJ5KFwiOmVudGVyXCIpYCBvciBgcXVlcnkoXCI6bGVhdmVcIilgIDogUXVlcnkgZm9yIG5ld2x5IGluc2VydGVkL3JlbW92ZWQgZWxlbWVudHMuXHJcbiAqICAtIGBxdWVyeShcIjphbmltYXRpbmdcIilgIDogUXVlcnkgYWxsIGN1cnJlbnRseSBhbmltYXRpbmcgZWxlbWVudHMuXHJcbiAqICAtIGBxdWVyeShcIkB0cmlnZ2VyTmFtZVwiKWAgOiBRdWVyeSBlbGVtZW50cyB0aGF0IGNvbnRhaW4gYW4gYW5pbWF0aW9uIHRyaWdnZXIuXHJcbiAqICAtIGBxdWVyeShcIkAqXCIpYCA6IFF1ZXJ5IGFsbCBlbGVtZW50cyB0aGF0IGNvbnRhaW4gYW4gYW5pbWF0aW9uIHRyaWdnZXJzLlxyXG4gKiAgLSBgcXVlcnkoXCI6c2VsZlwiKWAgOiBJbmNsdWRlIHRoZSBjdXJyZW50IGVsZW1lbnQgaW50byB0aGUgYW5pbWF0aW9uIHNlcXVlbmNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gYW5pbWF0aW9uIE9uZSBvciBtb3JlIGFuaW1hdGlvbiBzdGVwcyB0byBhcHBseSB0byB0aGUgcXVlcmllZCBlbGVtZW50IG9yIGVsZW1lbnRzLlxyXG4gKiBBbiBhcnJheSBpcyB0cmVhdGVkIGFzIGFuIGFuaW1hdGlvbiBzZXF1ZW5jZS5cclxuICogQHBhcmFtIG9wdGlvbnMgQW4gb3B0aW9ucyBvYmplY3QuIFVzZSB0aGUgJ2xpbWl0JyBmaWVsZCB0byBsaW1pdCB0aGUgdG90YWwgbnVtYmVyIG9mXHJcbiAqIGl0ZW1zIHRvIGNvbGxlY3QuXHJcbiAqIEByZXR1cm4gQW4gb2JqZWN0IHRoYXQgZW5jYXBzdWxhdGVzIHRoZSBxdWVyeSBkYXRhLlxyXG4gKlxyXG4gKiBAdXNhZ2VOb3Rlc1xyXG4gKiBUb2tlbnMgY2FuIGJlIG1lcmdlZCBpbnRvIGEgY29tYmluZWQgcXVlcnkgc2VsZWN0b3Igc3RyaW5nLiBGb3IgZXhhbXBsZTpcclxuICpcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiAgcXVlcnkoJzpzZWxmLCAucmVjb3JkOmVudGVyLCAucmVjb3JkOmxlYXZlLCBAc3ViVHJpZ2dlcicsIFsuLi5dKVxyXG4gKiBgYGBcclxuICpcclxuICogVGhlIGBxdWVyeSgpYCBmdW5jdGlvbiBjb2xsZWN0cyBtdWx0aXBsZSBlbGVtZW50cyBhbmQgd29ya3MgaW50ZXJuYWxseSBieSB1c2luZ1xyXG4gKiBgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsYC4gVXNlIHRoZSBgbGltaXRgIGZpZWxkIG9mIGFuIG9wdGlvbnMgb2JqZWN0IHRvIGxpbWl0XHJcbiAqIHRoZSB0b3RhbCBudW1iZXIgb2YgaXRlbXMgdG8gYmUgY29sbGVjdGVkLiBGb3IgZXhhbXBsZTpcclxuICpcclxuICogYGBganNcclxuICogcXVlcnkoJ2RpdicsIFtcclxuICogICBhbmltYXRlKC4uLiksXHJcbiAqICAgYW5pbWF0ZSguLi4pXHJcbiAqIF0sIHsgbGltaXQ6IDEgfSlcclxuICogYGBgXHJcbiAqXHJcbiAqIEJ5IGRlZmF1bHQsIHRocm93cyBhbiBlcnJvciB3aGVuIHplcm8gaXRlbXMgYXJlIGZvdW5kLiBTZXQgdGhlXHJcbiAqIGBvcHRpb25hbGAgZmxhZyB0byBpZ25vcmUgdGhpcyBlcnJvci4gRm9yIGV4YW1wbGU6XHJcbiAqXHJcbiAqIGBgYGpzXHJcbiAqIHF1ZXJ5KCcuc29tZS1lbGVtZW50LXRoYXQtbWF5LW5vdC1iZS10aGVyZScsIFtcclxuICogICBhbmltYXRlKC4uLiksXHJcbiAqICAgYW5pbWF0ZSguLi4pXHJcbiAqIF0sIHsgb3B0aW9uYWw6IHRydWUgfSlcclxuICogYGBgXHJcbiAqXHJcbiAqICMjIyBVc2FnZSBFeGFtcGxlXHJcbiAqXHJcbiAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBxdWVyaWVzIGZvciBpbm5lciBlbGVtZW50cyBhbmQgYW5pbWF0ZXMgdGhlbVxyXG4gKiBpbmRpdmlkdWFsbHkgdXNpbmcgYGFuaW1hdGUoKWAuXHJcbiAqXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogQENvbXBvbmVudCh7XHJcbiAqICAgc2VsZWN0b3I6ICdpbm5lcicsXHJcbiAqICAgdGVtcGxhdGU6IGBcclxuICogICAgIDxkaXYgW0BxdWVyeUFuaW1hdGlvbl09XCJleHBcIj5cclxuICogICAgICAgPGgxPlRpdGxlPC9oMT5cclxuICogICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cclxuICogICAgICAgICBCbGFoIGJsYWggYmxhaFxyXG4gKiAgICAgICA8L2Rpdj5cclxuICogICAgIDwvZGl2PlxyXG4gKiAgIGAsXHJcbiAqICAgYW5pbWF0aW9uczogW1xyXG4gKiAgICB0cmlnZ2VyKCdxdWVyeUFuaW1hdGlvbicsIFtcclxuICogICAgICB0cmFuc2l0aW9uKCcqID0+IGdvQW5pbWF0ZScsIFtcclxuICogICAgICAgIC8vIGhpZGUgdGhlIGlubmVyIGVsZW1lbnRzXHJcbiAqICAgICAgICBxdWVyeSgnaDEnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpLFxyXG4gKiAgICAgICAgcXVlcnkoJy5jb250ZW50Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKSxcclxuICpcclxuICogICAgICAgIC8vIGFuaW1hdGUgdGhlIGlubmVyIGVsZW1lbnRzIGluLCBvbmUgYnkgb25lXHJcbiAqICAgICAgICBxdWVyeSgnaDEnLCBhbmltYXRlKDEwMDAsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSkpLFxyXG4gKiAgICAgICAgcXVlcnkoJy5jb250ZW50JywgYW5pbWF0ZSgxMDAwLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpKSxcclxuICogICAgICBdKVxyXG4gKiAgICBdKVxyXG4gKiAgXVxyXG4gKiB9KVxyXG4gKiBjbGFzcyBDbXAge1xyXG4gKiAgIGV4cCA9ICcnO1xyXG4gKlxyXG4gKiAgIGdvQW5pbWF0ZSgpIHtcclxuICogICAgIHRoaXMuZXhwID0gJ2dvQW5pbWF0ZSc7XHJcbiAqICAgfVxyXG4gKiB9XHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBxdWVyeShzZWxlY3Rvcjogc3RyaW5nLCBhbmltYXRpb246IEFuaW1hdGlvbk1ldGFkYXRhIHwgQW5pbWF0aW9uTWV0YWRhdGFbXSwgb3B0aW9ucz86IEFuaW1hdGlvblF1ZXJ5T3B0aW9ucyB8IG51bGwpOiBBbmltYXRpb25RdWVyeU1ldGFkYXRhO1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgYSBsaXN0IG9mIGFuaW1hdGlvbiBzdGVwcyB0byBiZSBydW4gc2VxdWVudGlhbGx5LCBvbmUgYnkgb25lLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RlcHMgQW4gYXJyYXkgb2YgYW5pbWF0aW9uIHN0ZXAgb2JqZWN0cy5cclxuICogLSBTdGVwcyBkZWZpbmVkIGJ5IGBzdHlsZSgpYCBjYWxscyBhcHBseSB0aGUgc3R5bGluZyBkYXRhIGltbWVkaWF0ZWx5LlxyXG4gKiAtIFN0ZXBzIGRlZmluZWQgYnkgYGFuaW1hdGUoKWAgY2FsbHMgYXBwbHkgdGhlIHN0eWxpbmcgZGF0YSBvdmVyIHRpbWVcclxuICogICBhcyBzcGVjaWZpZWQgYnkgdGhlIHRpbWluZyBkYXRhLlxyXG4gKlxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIHNlcXVlbmNlKFtcclxuICogICBzdHlsZSh7IG9wYWNpdHk6IDAgfSksXHJcbiAqICAgYW5pbWF0ZShcIjFzXCIsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSlcclxuICogXSlcclxuICogYGBgXHJcbiAqXHJcbiAqIEBwYXJhbSBvcHRpb25zIEFuIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmcgYSBkZWxheSBhbmRcclxuICogZGV2ZWxvcGVyLWRlZmluZWQgcGFyYW1ldGVycyB0aGF0IHByb3ZpZGUgc3R5bGluZyBkZWZhdWx0cyBhbmRcclxuICogY2FuIGJlIG92ZXJyaWRkZW4gb24gaW52b2NhdGlvbi5cclxuICpcclxuICogQHJldHVybiBBbiBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgdGhlIHNlcXVlbmNlIGRhdGEuXHJcbiAqXHJcbiAqIEB1c2FnZU5vdGVzXHJcbiAqIFdoZW4geW91IHBhc3MgYW4gYXJyYXkgb2Ygc3RlcHMgdG8gYVxyXG4gKiBgdHJhbnNpdGlvbigpYCBjYWxsLCB0aGUgc3RlcHMgcnVuIHNlcXVlbnRpYWxseSBieSBkZWZhdWx0LlxyXG4gKiBDb21wYXJlIHRoaXMgdG8gdGhlIGB7QGxpbmsgYW5pbWF0aW9ucy9ncm91cCBncm91cCgpfWAgY2FsbCwgd2hpY2ggcnVucyBhbmltYXRpb24gc3RlcHMgaW5cclxuICpwYXJhbGxlbC5cclxuICpcclxuICogV2hlbiBhIHNlcXVlbmNlIGlzIHVzZWQgd2l0aGluIGEgYHtAbGluayBhbmltYXRpb25zL2dyb3VwIGdyb3VwKCl9YCBvciBhIGB0cmFuc2l0aW9uKClgIGNhbGwsXHJcbiAqIGV4ZWN1dGlvbiBjb250aW51ZXMgdG8gdGhlIG5leHQgaW5zdHJ1Y3Rpb24gb25seSBhZnRlciBlYWNoIG9mIHRoZSBpbm5lciBhbmltYXRpb25cclxuICogc3RlcHMgaGF2ZSBjb21wbGV0ZWQuXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICoqL1xyXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBzZXF1ZW5jZShzdGVwczogQW5pbWF0aW9uTWV0YWRhdGFbXSwgb3B0aW9ucz86IEFuaW1hdGlvbk9wdGlvbnMgfCBudWxsKTogQW5pbWF0aW9uU2VxdWVuY2VNZXRhZGF0YTtcclxuXHJcbi8qKlxyXG4gKiBVc2Ugd2l0aGluIGFuIGFuaW1hdGlvbiBgcXVlcnkoKWAgY2FsbCB0byBpc3N1ZSBhIHRpbWluZyBnYXAgYWZ0ZXJcclxuICogZWFjaCBxdWVyaWVkIGl0ZW0gaXMgYW5pbWF0ZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB0aW1pbmdzIEEgZGVsYXkgdmFsdWUuXHJcbiAqIEBwYXJhbSBhbmltYXRpb24gT25lIG9yZSBtb3JlIGFuaW1hdGlvbiBzdGVwcy5cclxuICogQHJldHVybnMgQW4gb2JqZWN0IHRoYXQgZW5jYXBzdWxhdGVzIHRoZSBzdGFnZ2VyIGRhdGEuXHJcbiAqXHJcbiAqIEB1c2FnZU5vdGVzXHJcbiAqIEluIHRoZSBmb2xsb3dpbmcgZXhhbXBsZSwgYSBjb250YWluZXIgZWxlbWVudCB3cmFwcyBhIGxpc3Qgb2YgaXRlbXMgc3RhbXBlZCBvdXRcclxuICogYnkgYW4gYG5nRm9yYC4gVGhlIGNvbnRhaW5lciBlbGVtZW50IGNvbnRhaW5zIGFuIGFuaW1hdGlvbiB0cmlnZ2VyIHRoYXQgd2lsbCBsYXRlciBiZSBzZXRcclxuICogdG8gcXVlcnkgZm9yIGVhY2ggb2YgdGhlIGlubmVyIGl0ZW1zLlxyXG4gKlxyXG4gKiBFYWNoIHRpbWUgaXRlbXMgYXJlIGFkZGVkLCB0aGUgb3BhY2l0eSBmYWRlLWluIGFuaW1hdGlvbiBydW5zLFxyXG4gKiBhbmQgZWFjaCByZW1vdmVkIGl0ZW0gaXMgZmFkZWQgb3V0LlxyXG4gKiBXaGVuIGVpdGhlciBvZiB0aGVzZSBhbmltYXRpb25zIG9jY3VyLCB0aGUgc3RhZ2dlciBlZmZlY3QgaXNcclxuICogYXBwbGllZCBhZnRlciBlYWNoIGl0ZW0ncyBhbmltYXRpb24gaXMgc3RhcnRlZC5cclxuICpcclxuICogYGBgaHRtbFxyXG4gKiA8IS0tIGxpc3QuY29tcG9uZW50Lmh0bWwgLS0+XHJcbiAqIDxidXR0b24gKGNsaWNrKT1cInRvZ2dsZSgpXCI+U2hvdyAvIEhpZGUgSXRlbXM8L2J1dHRvbj5cclxuICogPGhyIC8+XHJcbiAqIDxkaXYgW0BsaXN0QW5pbWF0aW9uXT1cIml0ZW1zLmxlbmd0aFwiPlxyXG4gKiAgIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIj5cclxuICogICAgIHt7IGl0ZW0gfX1cclxuICogICA8L2Rpdj5cclxuICogPC9kaXY+XHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBIZXJlIGlzIHRoZSBjb21wb25lbnQgY29kZTpcclxuICpcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBpbXBvcnQge3RyaWdnZXIsIHRyYW5zaXRpb24sIHN0eWxlLCBhbmltYXRlLCBxdWVyeSwgc3RhZ2dlcn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgIHRlbXBsYXRlVXJsOiAnbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAqICAgYW5pbWF0aW9uczogW1xyXG4gKiAgICAgdHJpZ2dlcignbGlzdEFuaW1hdGlvbicsIFtcclxuICogICAgIC4uLlxyXG4gKiAgICAgXSlcclxuICogICBdXHJcbiAqIH0pXHJcbiAqIGNsYXNzIExpc3RDb21wb25lbnQge1xyXG4gKiAgIGl0ZW1zID0gW107XHJcbiAqXHJcbiAqICAgc2hvd0l0ZW1zKCkge1xyXG4gKiAgICAgdGhpcy5pdGVtcyA9IFswLDEsMiwzLDRdO1xyXG4gKiAgIH1cclxuICpcclxuICogICBoaWRlSXRlbXMoKSB7XHJcbiAqICAgICB0aGlzLml0ZW1zID0gW107XHJcbiAqICAgfVxyXG4gKlxyXG4gKiAgIHRvZ2dsZSgpIHtcclxuICogICAgIHRoaXMuaXRlbXMubGVuZ3RoID8gdGhpcy5oaWRlSXRlbXMoKSA6IHRoaXMuc2hvd0l0ZW1zKCk7XHJcbiAqICAgIH1cclxuICogIH1cclxuICogYGBgXHJcbiAqXHJcbiAqIEhlcmUgaXMgdGhlIGFuaW1hdGlvbiB0cmlnZ2VyIGNvZGU6XHJcbiAqXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogdHJpZ2dlcignbGlzdEFuaW1hdGlvbicsIFtcclxuICogICB0cmFuc2l0aW9uKCcqID0+IConLCBbIC8vIGVhY2ggdGltZSB0aGUgYmluZGluZyB2YWx1ZSBjaGFuZ2VzXHJcbiAqICAgICBxdWVyeSgnOmxlYXZlJywgW1xyXG4gKiAgICAgICBzdGFnZ2VyKDEwMCwgW1xyXG4gKiAgICAgICAgIGFuaW1hdGUoJzAuNXMnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXHJcbiAqICAgICAgIF0pXHJcbiAqICAgICBdKSxcclxuICogICAgIHF1ZXJ5KCc6ZW50ZXInLCBbXHJcbiAqICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMCB9KSxcclxuICogICAgICAgc3RhZ2dlcigxMDAsIFtcclxuICogICAgICAgICBhbmltYXRlKCcwLjVzJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKVxyXG4gKiAgICAgICBdKVxyXG4gKiAgICAgXSlcclxuICogICBdKVxyXG4gKiBdKVxyXG4gKiBgYGBcclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gc3RhZ2dlcih0aW1pbmdzOiBzdHJpbmcgfCBudW1iZXIsIGFuaW1hdGlvbjogQW5pbWF0aW9uTWV0YWRhdGEgfCBBbmltYXRpb25NZXRhZGF0YVtdKTogQW5pbWF0aW9uU3RhZ2dlck1ldGFkYXRhO1xyXG5cclxuLyoqXHJcbiAqIERlY2xhcmVzIGFuIGFuaW1hdGlvbiBzdGF0ZSB3aXRoaW4gYSB0cmlnZ2VyIGF0dGFjaGVkIHRvIGFuIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSBuYW1lIE9uZSBvciBtb3JlIG5hbWVzIGZvciB0aGUgZGVmaW5lZCBzdGF0ZSBpbiBhIGNvbW1hLXNlcGFyYXRlZCBzdHJpbmcuXHJcbiAqIFRoZSBmb2xsb3dpbmcgcmVzZXJ2ZWQgc3RhdGUgbmFtZXMgY2FuIGJlIHN1cHBsaWVkIHRvIGRlZmluZSBhIHN0eWxlIGZvciBzcGVjaWZpYyB1c2VcclxuICogY2FzZXM6XHJcbiAqXHJcbiAqIC0gYHZvaWRgIFlvdSBjYW4gYXNzb2NpYXRlIHN0eWxlcyB3aXRoIHRoaXMgbmFtZSB0byBiZSB1c2VkIHdoZW5cclxuICogdGhlIGVsZW1lbnQgaXMgZGV0YWNoZWQgZnJvbSB0aGUgYXBwbGljYXRpb24uIEZvciBleGFtcGxlLCB3aGVuIGFuIGBuZ0lmYCBldmFsdWF0ZXNcclxuICogdG8gZmFsc2UsIHRoZSBzdGF0ZSBvZiB0aGUgYXNzb2NpYXRlZCBlbGVtZW50IGlzIHZvaWQuXHJcbiAqICAtIGAqYCAoYXN0ZXJpc2spIEluZGljYXRlcyB0aGUgZGVmYXVsdCBzdGF0ZS4gWW91IGNhbiBhc3NvY2lhdGUgc3R5bGVzIHdpdGggdGhpcyBuYW1lXHJcbiAqIHRvIGJlIHVzZWQgYXMgdGhlIGZhbGxiYWNrIHdoZW4gdGhlIHN0YXRlIHRoYXQgaXMgYmVpbmcgYW5pbWF0ZWQgaXMgbm90IGRlY2xhcmVkXHJcbiAqIHdpdGhpbiB0aGUgdHJpZ2dlci5cclxuICpcclxuICogQHBhcmFtIHN0eWxlcyBBIHNldCBvZiBDU1Mgc3R5bGVzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHN0YXRlLCBjcmVhdGVkIHVzaW5nIHRoZVxyXG4gKiBgc3R5bGUoKWAgZnVuY3Rpb24uXHJcbiAqIFRoaXMgc2V0IG9mIHN0eWxlcyBwZXJzaXN0cyBvbiB0aGUgZWxlbWVudCBvbmNlIHRoZSBzdGF0ZSBoYXMgYmVlbiByZWFjaGVkLlxyXG4gKiBAcGFyYW0gb3B0aW9ucyBQYXJhbWV0ZXJzIHRoYXQgY2FuIGJlIHBhc3NlZCB0byB0aGUgc3RhdGUgd2hlbiBpdCBpcyBpbnZva2VkLlxyXG4gKiAwIG9yIG1vcmUga2V5LXZhbHVlIHBhaXJzLlxyXG4gKiBAcmV0dXJuIEFuIG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyB0aGUgbmV3IHN0YXRlIGRhdGEuXHJcbiAqXHJcbiAqIEB1c2FnZU5vdGVzXHJcbiAqIFVzZSB0aGUgYHRyaWdnZXIoKWAgZnVuY3Rpb24gdG8gcmVnaXN0ZXIgc3RhdGVzIHRvIGFuIGFuaW1hdGlvbiB0cmlnZ2VyLlxyXG4gKiBVc2UgdGhlIGB0cmFuc2l0aW9uKClgIGZ1bmN0aW9uIHRvIGFuaW1hdGUgYmV0d2VlbiBzdGF0ZXMuXHJcbiAqIFdoZW4gYSBzdGF0ZSBpcyBhY3RpdmUgd2l0aGluIGEgY29tcG9uZW50LCBpdHMgYXNzb2NpYXRlZCBzdHlsZXMgcGVyc2lzdCBvbiB0aGUgZWxlbWVudCxcclxuICogZXZlbiB3aGVuIHRoZSBhbmltYXRpb24gZW5kcy5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKiovXHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIHN0YXRlKG5hbWU6IHN0cmluZywgc3R5bGVzOiBBbmltYXRpb25TdHlsZU1ldGFkYXRhLCBvcHRpb25zPzoge1xyXG4gICAgcGFyYW1zOiB7XHJcbiAgICAgICAgW25hbWU6IHN0cmluZ106IGFueTtcclxuICAgIH07XHJcbn0pOiBBbmltYXRpb25TdGF0ZU1ldGFkYXRhO1xyXG5cclxuLyoqXHJcbiAqIERlY2xhcmVzIGEga2V5L3ZhbHVlIG9iamVjdCBjb250YWluaW5nIENTUyBwcm9wZXJ0aWVzL3N0eWxlcyB0aGF0XHJcbiAqIGNhbiB0aGVuIGJlIHVzZWQgZm9yIGFuIGFuaW1hdGlvbiBgc3RhdGVgLCB3aXRoaW4gYW4gYW5pbWF0aW9uIGBzZXF1ZW5jZWAsXHJcbiAqIG9yIGFzIHN0eWxpbmcgZGF0YSBmb3IgY2FsbHMgdG8gYGFuaW1hdGUoKWAgYW5kIGBrZXlmcmFtZXMoKWAuXHJcbiAqXHJcbiAqIEBwYXJhbSB0b2tlbnMgQSBzZXQgb2YgQ1NTIHN0eWxlcyBvciBIVE1MIHN0eWxlcyBhc3NvY2lhdGVkIHdpdGggYW4gYW5pbWF0aW9uIHN0YXRlLlxyXG4gKiBUaGUgdmFsdWUgY2FuIGJlIGFueSBvZiB0aGUgZm9sbG93aW5nOlxyXG4gKiAtIEEga2V5LXZhbHVlIHN0eWxlIHBhaXIgYXNzb2NpYXRpbmcgYSBDU1MgcHJvcGVydHkgd2l0aCBhIHZhbHVlLlxyXG4gKiAtIEFuIGFycmF5IG9mIGtleS12YWx1ZSBzdHlsZSBwYWlycy5cclxuICogLSBBbiBhc3RlcmlzayAoKiksIHRvIHVzZSBhdXRvLXN0eWxpbmcsIHdoZXJlIHN0eWxlcyBhcmUgZGVyaXZlZCBmcm9tIHRoZSBlbGVtZW50XHJcbiAqIGJlaW5nIGFuaW1hdGVkIGFuZCBhcHBsaWVkIHRvIHRoZSBhbmltYXRpb24gd2hlbiBpdCBzdGFydHMuXHJcbiAqXHJcbiAqIEF1dG8tc3R5bGluZyBjYW4gYmUgdXNlZCB0byBkZWZpbmUgYSBzdGF0ZSB0aGF0IGRlcGVuZHMgb24gbGF5b3V0IG9yIG90aGVyXHJcbiAqIGVudmlyb25tZW50YWwgZmFjdG9ycy5cclxuICpcclxuICogQHJldHVybiBBbiBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgdGhlIHN0eWxlIGRhdGEuXHJcbiAqXHJcbiAqIEB1c2FnZU5vdGVzXHJcbiAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZXMgY3JlYXRlIGFuaW1hdGlvbiBzdHlsZXMgdGhhdCBjb2xsZWN0IGEgc2V0IG9mXHJcbiAqIENTUyBwcm9wZXJ0eSB2YWx1ZXM6XHJcbiAqXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogLy8gc3RyaW5nIHZhbHVlcyBmb3IgQ1NTIHByb3BlcnRpZXNcclxuICogc3R5bGUoeyBiYWNrZ3JvdW5kOiBcInJlZFwiLCBjb2xvcjogXCJibHVlXCIgfSlcclxuICpcclxuICogLy8gbnVtZXJpY2FsIHBpeGVsIHZhbHVlc1xyXG4gKiBzdHlsZSh7IHdpZHRoOiAxMDAsIGhlaWdodDogMCB9KVxyXG4gKiBgYGBcclxuICpcclxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlIHVzZXMgYXV0by1zdHlsaW5nIHRvIGFsbG93IGEgY29tcG9uZW50IHRvIGFuaW1hdGUgZnJvbVxyXG4gKiBhIGhlaWdodCBvZiAwIHVwIHRvIHRoZSBoZWlnaHQgb2YgdGhlIHBhcmVudCBlbGVtZW50OlxyXG4gKlxyXG4gKiBgYGBcclxuICogc3R5bGUoeyBoZWlnaHQ6IDAgfSksXHJcbiAqIGFuaW1hdGUoXCIxc1wiLCBzdHlsZSh7IGhlaWdodDogXCIqXCIgfSkpXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqKi9cclxuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gc3R5bGUodG9rZW5zOiAnKicgfCB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXI7XHJcbn0gfCBBcnJheTwnKicgfCB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXI7XHJcbn0+KTogQW5pbWF0aW9uU3R5bGVNZXRhZGF0YTtcclxuXHJcbi8qKlxyXG4gKiBEZWNsYXJlcyBhbiBhbmltYXRpb24gdHJhbnNpdGlvbiBhcyBhIHNlcXVlbmNlIG9mIGFuaW1hdGlvbiBzdGVwcyB0byBydW4gd2hlbiBhIGdpdmVuXHJcbiAqIGNvbmRpdGlvbiBpcyBzYXRpc2ZpZWQuIFRoZSBjb25kaXRpb24gaXMgYSBCb29sZWFuIGV4cHJlc3Npb24gb3IgZnVuY3Rpb24gdGhhdCBjb21wYXJlc1xyXG4gKiB0aGUgcHJldmlvdXMgYW5kIGN1cnJlbnQgYW5pbWF0aW9uIHN0YXRlcywgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGlzIHRyYW5zaXRpb24gc2hvdWxkIG9jY3VyLlxyXG4gKiBXaGVuIHRoZSBzdGF0ZSBjcml0ZXJpYSBvZiBhIGRlZmluZWQgdHJhbnNpdGlvbiBhcmUgbWV0LCB0aGUgYXNzb2NpYXRlZCBhbmltYXRpb24gaXNcclxuICogdHJpZ2dlcmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RhdGVDaGFuZ2VFeHByIEEgQm9vbGVhbiBleHByZXNzaW9uIG9yIGZ1bmN0aW9uIHRoYXQgY29tcGFyZXMgdGhlIHByZXZpb3VzIGFuZCBjdXJyZW50XHJcbiAqIGFuaW1hdGlvbiBzdGF0ZXMsIGFuZCByZXR1cm5zIHRydWUgaWYgdGhpcyB0cmFuc2l0aW9uIHNob3VsZCBvY2N1ci4gTm90ZSB0aGF0ICBcInRydWVcIiBhbmQgXCJmYWxzZVwiXHJcbiAqIG1hdGNoIDEgYW5kIDAsIHJlc3BlY3RpdmVseS4gQW4gZXhwcmVzc2lvbiBpcyBldmFsdWF0ZWQgZWFjaCB0aW1lIGEgc3RhdGUgY2hhbmdlIG9jY3VycyBpbiB0aGVcclxuICogYW5pbWF0aW9uIHRyaWdnZXIgZWxlbWVudC5cclxuICogVGhlIGFuaW1hdGlvbiBzdGVwcyBydW4gd2hlbiB0aGUgZXhwcmVzc2lvbiBldmFsdWF0ZXMgdG8gdHJ1ZS5cclxuICpcclxuICogLSBBIHN0YXRlLWNoYW5nZSBzdHJpbmcgdGFrZXMgdGhlIGZvcm0gXCJzdGF0ZTEgPT4gc3RhdGUyXCIsIHdoZXJlIGVhY2ggc2lkZSBpcyBhIGRlZmluZWQgYW5pbWF0aW9uXHJcbiAqIHN0YXRlLCBvciBhbiBhc3Rlcml4ICgqKSB0byByZWZlciB0byBhIGR5bmFtaWMgc3RhcnQgb3IgZW5kIHN0YXRlLlxyXG4gKiAgIC0gVGhlIGV4cHJlc3Npb24gc3RyaW5nIGNhbiBjb250YWluIG11bHRpcGxlIGNvbW1hLXNlcGFyYXRlZCBzdGF0ZW1lbnRzO1xyXG4gKiBmb3IgZXhhbXBsZSBcInN0YXRlMSA9PiBzdGF0ZTIsIHN0YXRlMyA9PiBzdGF0ZTRcIi5cclxuICogICAtIFNwZWNpYWwgdmFsdWVzIGA6ZW50ZXJgIGFuZCBgOmxlYXZlYCBpbml0aWF0ZSBhIHRyYW5zaXRpb24gb24gdGhlIGVudHJ5IGFuZCBleGl0IHN0YXRlcyxcclxuICogZXF1aXZhbGVudCB0byAgXCJ2b2lkID0+ICpcIiAgYW5kIFwiKiA9PiB2b2lkXCIuXHJcbiAqICAgLSBTcGVjaWFsIHZhbHVlcyBgOmluY3JlbWVudGAgYW5kIGA6ZGVjcmVtZW50YCBpbml0aWF0ZSBhIHRyYW5zaXRpb24gd2hlbiBhIG51bWVyaWMgdmFsdWUgaGFzXHJcbiAqIGluY3JlYXNlZCBvciBkZWNyZWFzZWQgaW4gdmFsdWUuXHJcbiAqIC0gQSBmdW5jdGlvbiBpcyBleGVjdXRlZCBlYWNoIHRpbWUgYSBzdGF0ZSBjaGFuZ2Ugb2NjdXJzIGluIHRoZSBhbmltYXRpb24gdHJpZ2dlciBlbGVtZW50LlxyXG4gKiBUaGUgYW5pbWF0aW9uIHN0ZXBzIHJ1biB3aGVuIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdGVwcyBPbmUgb3IgbW9yZSBhbmltYXRpb24gb2JqZWN0cywgYXMgcmV0dXJuZWQgYnkgdGhlIGBhbmltYXRlKClgIG9yXHJcbiAqIGBzZXF1ZW5jZSgpYCBmdW5jdGlvbiwgdGhhdCBmb3JtIGEgdHJhbnNmb3JtYXRpb24gZnJvbSBvbmUgc3RhdGUgdG8gYW5vdGhlci5cclxuICogQSBzZXF1ZW5jZSBpcyB1c2VkIGJ5IGRlZmF1bHQgd2hlbiB5b3UgcGFzcyBhbiBhcnJheS5cclxuICogQHBhcmFtIG9wdGlvbnMgQW4gb3B0aW9ucyBvYmplY3QgdGhhdCBjYW4gY29udGFpbiBhIGRlbGF5IHZhbHVlIGZvciB0aGUgc3RhcnQgb2YgdGhlIGFuaW1hdGlvbixcclxuICogYW5kIGFkZGl0aW9uYWwgZGV2ZWxvcGVyLWRlZmluZWQgcGFyYW1ldGVycy4gUHJvdmlkZWQgdmFsdWVzIGZvciBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgYXJlIHVzZWRcclxuICogYXMgZGVmYXVsdHMsIGFuZCBvdmVycmlkZSB2YWx1ZXMgY2FuIGJlIHBhc3NlZCB0byB0aGUgY2FsbGVyIG9uIGludm9jYXRpb24uXHJcbiAqIEByZXR1cm5zIEFuIG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyB0aGUgdHJhbnNpdGlvbiBkYXRhLlxyXG4gKlxyXG4gKiBAdXNhZ2VOb3Rlc1xyXG4gKiBUaGUgdGVtcGxhdGUgYXNzb2NpYXRlZCB3aXRoIGEgY29tcG9uZW50IGJpbmRzIGFuIGFuaW1hdGlvbiB0cmlnZ2VyIHRvIGFuIGVsZW1lbnQuXHJcbiAqXHJcbiAqIGBgYEhUTUxcclxuICogPCEtLSBzb21ld2hlcmUgaW5zaWRlIG9mIG15LWNvbXBvbmVudC10cGwuaHRtbCAtLT5cclxuICogPGRpdiBbQG15QW5pbWF0aW9uVHJpZ2dlcl09XCJteVN0YXR1c0V4cFwiPi4uLjwvZGl2PlxyXG4gKiBgYGBcclxuICpcclxuICogQWxsIHRyYW5zaXRpb25zIGFyZSBkZWZpbmVkIHdpdGhpbiBhbiBhbmltYXRpb24gdHJpZ2dlcixcclxuICogYWxvbmcgd2l0aCBuYW1lZCBzdGF0ZXMgdGhhdCB0aGUgdHJhbnNpdGlvbnMgY2hhbmdlIHRvIGFuZCBmcm9tLlxyXG4gKlxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIHRyaWdnZXIoXCJteUFuaW1hdGlvblRyaWdnZXJcIiwgW1xyXG4gKiAgLy8gZGVmaW5lIHN0YXRlc1xyXG4gKiAgc3RhdGUoXCJvblwiLCBzdHlsZSh7IGJhY2tncm91bmQ6IFwiZ3JlZW5cIiB9KSksXHJcbiAqICBzdGF0ZShcIm9mZlwiLCBzdHlsZSh7IGJhY2tncm91bmQ6IFwiZ3JleVwiIH0pKSxcclxuICogIC4uLl1cclxuICogYGBgXHJcbiAqXHJcbiAqIE5vdGUgdGhhdCB3aGVuIHlvdSBjYWxsIHRoZSBgc2VxdWVuY2UoKWAgZnVuY3Rpb24gd2l0aGluIGEgYHtAbGluayBhbmltYXRpb25zL2dyb3VwIGdyb3VwKCl9YFxyXG4gKiBvciBhIGB0cmFuc2l0aW9uKClgIGNhbGwsIGV4ZWN1dGlvbiBkb2VzIG5vdCBjb250aW51ZSB0byB0aGUgbmV4dCBpbnN0cnVjdGlvblxyXG4gKiB1bnRpbCBlYWNoIG9mIHRoZSBpbm5lciBhbmltYXRpb24gc3RlcHMgaGF2ZSBjb21wbGV0ZWQuXHJcbiAqXHJcbiAqICMjIyBTeW50YXggZXhhbXBsZXNcclxuICpcclxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlcyBkZWZpbmUgdHJhbnNpdGlvbnMgYmV0d2VlbiB0aGUgdHdvIGRlZmluZWQgc3RhdGVzIChhbmQgZGVmYXVsdCBzdGF0ZXMpLFxyXG4gKiB1c2luZyB2YXJpb3VzIG9wdGlvbnM6XHJcbiAqXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogLy8gVHJhbnNpdGlvbiBvY2N1cnMgd2hlbiB0aGUgc3RhdGUgdmFsdWVcclxuICogLy8gYm91bmQgdG8gXCJteUFuaW1hdGlvblRyaWdnZXJcIiBjaGFuZ2VzIGZyb20gXCJvblwiIHRvIFwib2ZmXCJcclxuICogdHJhbnNpdGlvbihcIm9uID0+IG9mZlwiLCBhbmltYXRlKDUwMCkpXHJcbiAqIC8vIFJ1biB0aGUgc2FtZSBhbmltYXRpb24gZm9yIGJvdGggZGlyZWN0aW9uc1xyXG4gKiB0cmFuc2l0aW9uKFwib24gPD0+IG9mZlwiLCBhbmltYXRlKDUwMCkpXHJcbiAqIC8vIERlZmluZSBtdWx0aXBsZSBzdGF0ZS1jaGFuZ2UgcGFpcnMgc2VwYXJhdGVkIGJ5IGNvbW1hc1xyXG4gKiB0cmFuc2l0aW9uKFwib24gPT4gb2ZmLCBvZmYgPT4gdm9pZFwiLCBhbmltYXRlKDUwMCkpXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiAjIyMgU3BlY2lhbCB2YWx1ZXMgZm9yIHN0YXRlLWNoYW5nZSBleHByZXNzaW9uc1xyXG4gKlxyXG4gKiAtIENhdGNoLWFsbCBzdGF0ZSBjaGFuZ2UgZm9yIHdoZW4gYW4gZWxlbWVudCBpcyBpbnNlcnRlZCBpbnRvIHRoZSBwYWdlIGFuZCB0aGVcclxuICogZGVzdGluYXRpb24gc3RhdGUgaXMgdW5rbm93bjpcclxuICpcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiB0cmFuc2l0aW9uKFwidm9pZCA9PiAqXCIsIFtcclxuICogIHN0eWxlKHsgb3BhY2l0eTogMCB9KSxcclxuICogIGFuaW1hdGUoNTAwKVxyXG4gKiAgXSlcclxuICogYGBgXHJcbiAqXHJcbiAqIC0gQ2FwdHVyZSBhIHN0YXRlIGNoYW5nZSBiZXR3ZWVuIGFueSBzdGF0ZXM6XHJcbiAqXHJcbiAqICBgdHJhbnNpdGlvbihcIiogPT4gKlwiLCBhbmltYXRlKFwiMXMgMHNcIikpYFxyXG4gKlxyXG4gKiAtIEVudHJ5IGFuZCBleGl0IHRyYW5zaXRpb25zOlxyXG4gKlxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIHRyYW5zaXRpb24oXCI6ZW50ZXJcIiwgW1xyXG4gKiAgIHN0eWxlKHsgb3BhY2l0eTogMCB9KSxcclxuICogICBhbmltYXRlKDUwMCwgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKVxyXG4gKiAgIF0pLFxyXG4gKiB0cmFuc2l0aW9uKFwiOmxlYXZlXCIsIFtcclxuICogICBhbmltYXRlKDUwMCwgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxyXG4gKiAgIF0pXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiAtIFVzZSBgOmluY3JlbWVudGAgYW5kIGA6ZGVjcmVtZW50YCB0byBpbml0aWF0ZSB0cmFuc2l0aW9uczpcclxuICpcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiB0cmFuc2l0aW9uKFwiOmluY3JlbWVudFwiLCBncm91cChbXHJcbiAqICBxdWVyeSgnOmVudGVyJywgW1xyXG4gKiAgICAgc3R5bGUoeyBsZWZ0OiAnMTAwJScgfSksXHJcbiAqICAgICBhbmltYXRlKCcwLjVzIGVhc2Utb3V0Jywgc3R5bGUoJyonKSlcclxuICogICBdKSxcclxuICogIHF1ZXJ5KCc6bGVhdmUnLCBbXHJcbiAqICAgICBhbmltYXRlKCcwLjVzIGVhc2Utb3V0Jywgc3R5bGUoeyBsZWZ0OiAnLTEwMCUnIH0pKVxyXG4gKiAgXSlcclxuICogXSkpXHJcbiAqXHJcbiAqIHRyYW5zaXRpb24oXCI6ZGVjcmVtZW50XCIsIGdyb3VwKFtcclxuICogIHF1ZXJ5KCc6ZW50ZXInLCBbXHJcbiAqICAgICBzdHlsZSh7IGxlZnQ6ICcxMDAlJyB9KSxcclxuICogICAgIGFuaW1hdGUoJzAuNXMgZWFzZS1vdXQnLCBzdHlsZSgnKicpKVxyXG4gKiAgIF0pLFxyXG4gKiAgcXVlcnkoJzpsZWF2ZScsIFtcclxuICogICAgIGFuaW1hdGUoJzAuNXMgZWFzZS1vdXQnLCBzdHlsZSh7IGxlZnQ6ICctMTAwJScgfSkpXHJcbiAqICBdKVxyXG4gKiBdKSlcclxuICogYGBgXHJcbiAqXHJcbiAqICMjIyBTdGF0ZS1jaGFuZ2UgZnVuY3Rpb25zXHJcbiAqXHJcbiAqIEhlcmUgaXMgYW4gZXhhbXBsZSBvZiBhIGBmcm9tU3RhdGVgIHNwZWNpZmllZCBhcyBhIHN0YXRlLWNoYW5nZSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYW5cclxuICogYW5pbWF0aW9uIHdoZW4gdHJ1ZTpcclxuICpcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiB0cmFuc2l0aW9uKChmcm9tU3RhdGUsIHRvU3RhdGUpID0+XHJcbiAqICB7XHJcbiAqICAgcmV0dXJuIGZyb21TdGF0ZSA9PSBcIm9mZlwiICYmIHRvU3RhdGUgPT0gXCJvblwiO1xyXG4gKiAgfSxcclxuICogIGFuaW1hdGUoXCIxcyAwc1wiKSlcclxuICogYGBgXHJcbiAqXHJcbiAqICMjIyBBbmltYXRpbmcgdG8gdGhlIGZpbmFsIHN0YXRlXHJcbiAqXHJcbiAqIElmIHRoZSBmaW5hbCBzdGVwIGluIGEgdHJhbnNpdGlvbiBpcyBhIGNhbGwgdG8gYGFuaW1hdGUoKWAgdGhhdCB1c2VzIGEgdGltaW5nIHZhbHVlXHJcbiAqIHdpdGggbm8gc3R5bGUgZGF0YSwgdGhhdCBzdGVwIGlzIGF1dG9tYXRpY2FsbHkgY29uc2lkZXJlZCB0aGUgZmluYWwgYW5pbWF0aW9uIGFyYyxcclxuICogZm9yIHRoZSBlbGVtZW50IHRvIHJlYWNoIHRoZSBmaW5hbCBzdGF0ZS4gQW5ndWxhciBhdXRvbWF0aWNhbGx5IGFkZHMgb3IgcmVtb3Zlc1xyXG4gKiBDU1Mgc3R5bGVzIHRvIGVuc3VyZSB0aGF0IHRoZSBlbGVtZW50IGlzIGluIHRoZSBjb3JyZWN0IGZpbmFsIHN0YXRlLlxyXG4gKlxyXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgZGVmaW5lcyBhIHRyYW5zaXRpb24gdGhhdCBzdGFydHMgYnkgaGlkaW5nIHRoZSBlbGVtZW50LFxyXG4gKiB0aGVuIG1ha2VzIHN1cmUgdGhhdCBpdCBhbmltYXRlcyBwcm9wZXJseSB0byB3aGF0ZXZlciBzdGF0ZSBpcyBjdXJyZW50bHkgYWN0aXZlIGZvciB0cmlnZ2VyOlxyXG4gKlxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIHRyYW5zaXRpb24oXCJ2b2lkID0+ICpcIiwgW1xyXG4gKiAgIHN0eWxlKHsgb3BhY2l0eTogMCB9KSxcclxuICogICBhbmltYXRlKDUwMClcclxuICogIF0pXHJcbiAqIGBgYFxyXG4gKiAjIyMgQm9vbGVhbiB2YWx1ZSBtYXRjaGluZ1xyXG4gKiBJZiBhIHRyaWdnZXIgYmluZGluZyB2YWx1ZSBpcyBhIEJvb2xlYW4sIGl0IGNhbiBiZSBtYXRjaGVkIHVzaW5nIGEgdHJhbnNpdGlvbiBleHByZXNzaW9uXHJcbiAqIHRoYXQgY29tcGFyZXMgdHJ1ZSBhbmQgZmFsc2Ugb3IgMSBhbmQgMC4gRm9yIGV4YW1wbGU6XHJcbiAqXHJcbiAqIGBgYFxyXG4gKiAvLyBpbiB0aGUgdGVtcGxhdGVcclxuICogPGRpdiBbQG9wZW5DbG9zZV09XCJvcGVuID8gdHJ1ZSA6IGZhbHNlXCI+Li4uPC9kaXY+XHJcbiAqIC8vIGluIHRoZSBjb21wb25lbnQgbWV0YWRhdGFcclxuICogdHJpZ2dlcignb3BlbkNsb3NlJywgW1xyXG4gKiAgIHN0YXRlKCd0cnVlJywgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXHJcbiAqICAgc3RhdGUoJ2ZhbHNlJywgc3R5bGUoeyBoZWlnaHQ6ICcwcHgnIH0pKSxcclxuICogICB0cmFuc2l0aW9uKCdmYWxzZSA8PT4gdHJ1ZScsIGFuaW1hdGUoNTAwKSlcclxuICogXSlcclxuICogYGBgXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICoqL1xyXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiB0cmFuc2l0aW9uKHN0YXRlQ2hhbmdlRXhwcjogc3RyaW5nIHwgKChmcm9tU3RhdGU6IHN0cmluZywgdG9TdGF0ZTogc3RyaW5nLCBlbGVtZW50PzogYW55LCBwYXJhbXM/OiB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XHJcbn0pID0+IGJvb2xlYW4pLCBzdGVwczogQW5pbWF0aW9uTWV0YWRhdGEgfCBBbmltYXRpb25NZXRhZGF0YVtdLCBvcHRpb25zPzogQW5pbWF0aW9uT3B0aW9ucyB8IG51bGwpOiBBbmltYXRpb25UcmFuc2l0aW9uTWV0YWRhdGE7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIG5hbWVkIGFuaW1hdGlvbiB0cmlnZ2VyLCBjb250YWluaW5nIGEgIGxpc3Qgb2YgYHN0YXRlKClgXHJcbiAqIGFuZCBgdHJhbnNpdGlvbigpYCBlbnRyaWVzIHRvIGJlIGV2YWx1YXRlZCB3aGVuIHRoZSBleHByZXNzaW9uXHJcbiAqIGJvdW5kIHRvIHRoZSB0cmlnZ2VyIGNoYW5nZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSBuYW1lIEFuIGlkZW50aWZ5aW5nIHN0cmluZy5cclxuICogQHBhcmFtIGRlZmluaXRpb25zICBBbiBhbmltYXRpb24gZGVmaW5pdGlvbiBvYmplY3QsIGNvbnRhaW5pbmcgYW4gYXJyYXkgb2YgYHN0YXRlKClgXHJcbiAqIGFuZCBgdHJhbnNpdGlvbigpYCBkZWNsYXJhdGlvbnMuXHJcbiAqXHJcbiAqIEByZXR1cm4gQW4gb2JqZWN0IHRoYXQgZW5jYXBzdWxhdGVzIHRoZSB0cmlnZ2VyIGRhdGEuXHJcbiAqXHJcbiAqIEB1c2FnZU5vdGVzXHJcbiAqIERlZmluZSBhbiBhbmltYXRpb24gdHJpZ2dlciBpbiB0aGUgYGFuaW1hdGlvbnNgIHNlY3Rpb24gb2YgYEBDb21wb25lbnRgIG1ldGFkYXRhLlxyXG4gKiBJbiB0aGUgdGVtcGxhdGUsIHJlZmVyZW5jZSB0aGUgdHJpZ2dlciBieSBuYW1lIGFuZCBiaW5kIGl0IHRvIGEgdHJpZ2dlciBleHByZXNzaW9uIHRoYXRcclxuICogZXZhbHVhdGVzIHRvIGEgZGVmaW5lZCBhbmltYXRpb24gc3RhdGUsIHVzaW5nIHRoZSBmb2xsb3dpbmcgZm9ybWF0OlxyXG4gKlxyXG4gKiBgW0B0cmlnZ2VyTmFtZV09XCJleHByZXNzaW9uXCJgXHJcbiAqXHJcbiAqIEFuaW1hdGlvbiB0cmlnZ2VyIGJpbmRpbmdzIGNvbnZlcnQgYWxsIHZhbHVlcyB0byBzdHJpbmdzLCBhbmQgdGhlbiBtYXRjaCB0aGVcclxuICogcHJldmlvdXMgYW5kIGN1cnJlbnQgdmFsdWVzIGFnYWluc3QgYW55IGxpbmtlZCB0cmFuc2l0aW9ucy5cclxuICogQm9vbGVhbnMgY2FuIGJlIHNwZWNpZmllZCBhcyBgMWAgb3IgYHRydWVgIGFuZCBgMGAgb3IgYGZhbHNlYC5cclxuICpcclxuICogIyMjIFVzYWdlIEV4YW1wbGVcclxuICpcclxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlIGNyZWF0ZXMgYW4gYW5pbWF0aW9uIHRyaWdnZXIgcmVmZXJlbmNlIGJhc2VkIG9uIHRoZSBwcm92aWRlZFxyXG4gKiBuYW1lIHZhbHVlLlxyXG4gKiBUaGUgcHJvdmlkZWQgYW5pbWF0aW9uIHZhbHVlIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGFycmF5IGNvbnNpc3Rpbmcgb2Ygc3RhdGUgYW5kXHJcbiAqIHRyYW5zaXRpb24gZGVjbGFyYXRpb25zLlxyXG4gKlxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgIHNlbGVjdG9yOiBcIm15LWNvbXBvbmVudFwiLFxyXG4gKiAgIHRlbXBsYXRlVXJsOiBcIm15LWNvbXBvbmVudC10cGwuaHRtbFwiLFxyXG4gKiAgIGFuaW1hdGlvbnM6IFtcclxuICogICAgIHRyaWdnZXIoXCJteUFuaW1hdGlvblRyaWdnZXJcIiwgW1xyXG4gKiAgICAgICBzdGF0ZSguLi4pLFxyXG4gKiAgICAgICBzdGF0ZSguLi4pLFxyXG4gKiAgICAgICB0cmFuc2l0aW9uKC4uLiksXHJcbiAqICAgICAgIHRyYW5zaXRpb24oLi4uKVxyXG4gKiAgICAgXSlcclxuICogICBdXHJcbiAqIH0pXHJcbiAqIGNsYXNzIE15Q29tcG9uZW50IHtcclxuICogICBteVN0YXR1c0V4cCA9IFwic29tZXRoaW5nXCI7XHJcbiAqIH1cclxuICogYGBgXHJcbiAqXHJcbiAqIFRoZSB0ZW1wbGF0ZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBjb21wb25lbnQgbWFrZXMgdXNlIG9mIHRoZSBkZWZpbmVkIHRyaWdnZXJcclxuICogYnkgYmluZGluZyB0byBhbiBlbGVtZW50IHdpdGhpbiBpdHMgdGVtcGxhdGUgY29kZS5cclxuICpcclxuICogYGBgaHRtbFxyXG4gKiA8IS0tIHNvbWV3aGVyZSBpbnNpZGUgb2YgbXktY29tcG9uZW50LXRwbC5odG1sIC0tPlxyXG4gKiA8ZGl2IFtAbXlBbmltYXRpb25UcmlnZ2VyXT1cIm15U3RhdHVzRXhwXCI+Li4uPC9kaXY+XHJcbiAqIGBgYFxyXG4gKlxyXG4gKiAjIyMgVXNpbmcgYW4gaW5saW5lIGZ1bmN0aW9uXHJcbiAqIFRoZSBgdHJhbnNpdGlvbmAgYW5pbWF0aW9uIG1ldGhvZCBhbHNvIHN1cHBvcnRzIHJlYWRpbmcgYW4gaW5saW5lIGZ1bmN0aW9uIHdoaWNoIGNhbiBkZWNpZGVcclxuICogaWYgaXRzIGFzc29jaWF0ZWQgYW5pbWF0aW9uIHNob3VsZCBiZSBydW4uXHJcbiAqXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogLy8gdGhpcyBtZXRob2QgaXMgcnVuIGVhY2ggdGltZSB0aGUgYG15QW5pbWF0aW9uVHJpZ2dlcmAgdHJpZ2dlciB2YWx1ZSBjaGFuZ2VzLlxyXG4gKiBmdW5jdGlvbiBteUlubGluZU1hdGNoZXJGbihmcm9tU3RhdGU6IHN0cmluZywgdG9TdGF0ZTogc3RyaW5nLCBlbGVtZW50OiBhbnksIHBhcmFtczoge1trZXk6XHJcbiBzdHJpbmddOiBhbnl9KTogYm9vbGVhbiB7XHJcbiAqICAgLy8gbm90aWNlIHRoYXQgYGVsZW1lbnRgIGFuZCBgcGFyYW1zYCBhcmUgYWxzbyBhdmFpbGFibGUgaGVyZVxyXG4gKiAgIHJldHVybiB0b1N0YXRlID09ICd5ZXMtcGxlYXNlLWFuaW1hdGUnO1xyXG4gKiB9XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgIHNlbGVjdG9yOiAnbXktY29tcG9uZW50JyxcclxuICogICB0ZW1wbGF0ZVVybDogJ215LWNvbXBvbmVudC10cGwuaHRtbCcsXHJcbiAqICAgYW5pbWF0aW9uczogW1xyXG4gKiAgICAgdHJpZ2dlcignbXlBbmltYXRpb25UcmlnZ2VyJywgW1xyXG4gKiAgICAgICB0cmFuc2l0aW9uKG15SW5saW5lTWF0Y2hlckZuLCBbXHJcbiAqICAgICAgICAgLy8gdGhlIGFuaW1hdGlvbiBzZXF1ZW5jZSBjb2RlXHJcbiAqICAgICAgIF0pLFxyXG4gKiAgICAgXSlcclxuICogICBdXHJcbiAqIH0pXHJcbiAqIGNsYXNzIE15Q29tcG9uZW50IHtcclxuICogICBteVN0YXR1c0V4cCA9IFwieWVzLXBsZWFzZS1hbmltYXRlXCI7XHJcbiAqIH1cclxuICogYGBgXHJcbiAqXHJcbiAqICMjIyBEaXNhYmxpbmcgQW5pbWF0aW9uc1xyXG4gKiBXaGVuIHRydWUsIHRoZSBzcGVjaWFsIGFuaW1hdGlvbiBjb250cm9sIGJpbmRpbmcgYEAuZGlzYWJsZWRgIGJpbmRpbmcgcHJldmVudHNcclxuICogYWxsIGFuaW1hdGlvbnMgZnJvbSByZW5kZXJpbmcuXHJcbiAqIFBsYWNlIHRoZSAgYEAuZGlzYWJsZWRgIGJpbmRpbmcgb24gYW4gZWxlbWVudCB0byBkaXNhYmxlXHJcbiAqIGFuaW1hdGlvbnMgb24gdGhlIGVsZW1lbnQgaXRzZWxmLCBhcyB3ZWxsIGFzIGFueSBpbm5lciBhbmltYXRpb24gdHJpZ2dlcnNcclxuICogd2l0aGluIHRoZSBlbGVtZW50LlxyXG4gKlxyXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgc2hvd3MgaG93IHRvIHVzZSB0aGlzIGZlYXR1cmU6XHJcbiAqXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogQENvbXBvbmVudCh7XHJcbiAqICAgc2VsZWN0b3I6ICdteS1jb21wb25lbnQnLFxyXG4gKiAgIHRlbXBsYXRlOiBgXHJcbiAqICAgICA8ZGl2IFtALmRpc2FibGVkXT1cImlzRGlzYWJsZWRcIj5cclxuICogICAgICAgPGRpdiBbQGNoaWxkQW5pbWF0aW9uXT1cImV4cFwiPjwvZGl2PlxyXG4gKiAgICAgPC9kaXY+XHJcbiAqICAgYCxcclxuICogICBhbmltYXRpb25zOiBbXHJcbiAqICAgICB0cmlnZ2VyKFwiY2hpbGRBbmltYXRpb25cIiwgW1xyXG4gKiAgICAgICAvLyAuLi5cclxuICogICAgIF0pXHJcbiAqICAgXVxyXG4gKiB9KVxyXG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XHJcbiAqICAgaXNEaXNhYmxlZCA9IHRydWU7XHJcbiAqICAgZXhwID0gJy4uLic7XHJcbiAqIH1cclxuICogYGBgXHJcbiAqXHJcbiAqIFdoZW4gYEAuZGlzYWJsZWRgIGlzIHRydWUsIGl0IHByZXZlbnRzIHRoZSBgQGNoaWxkQW5pbWF0aW9uYCB0cmlnZ2VyIGZyb20gYW5pbWF0aW5nLFxyXG4gKiBhbG9uZyB3aXRoIGFueSBpbm5lciBhbmltYXRpb25zLlxyXG4gKlxyXG4gKiAjIyMgRGlzYWJsZSBhbmltYXRpb25zIGFwcGxpY2F0aW9uLXdpZGVcclxuICogV2hlbiBhbiBhcmVhIG9mIHRoZSB0ZW1wbGF0ZSBpcyBzZXQgdG8gaGF2ZSBhbmltYXRpb25zIGRpc2FibGVkLFxyXG4gKiAqKmFsbCoqIGlubmVyIGNvbXBvbmVudHMgaGF2ZSB0aGVpciBhbmltYXRpb25zIGRpc2FibGVkIGFzIHdlbGwuXHJcbiAqIFRoaXMgbWVhbnMgdGhhdCB5b3UgY2FuIGRpc2FibGUgYWxsIGFuaW1hdGlvbnMgZm9yIGFuIGFwcFxyXG4gKiBieSBwbGFjaW5nIGEgaG9zdCBiaW5kaW5nIHNldCBvbiBgQC5kaXNhYmxlZGAgb24gdGhlIHRvcG1vc3QgQW5ndWxhciBjb21wb25lbnQuXHJcbiAqXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHtDb21wb25lbnQsIEhvc3RCaW5kaW5nfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICAgc2VsZWN0b3I6ICdhcHAtY29tcG9uZW50JyxcclxuICogICB0ZW1wbGF0ZVVybDogJ2FwcC5jb21wb25lbnQuaHRtbCcsXHJcbiAqIH0pXHJcbiAqIGNsYXNzIEFwcENvbXBvbmVudCB7XHJcbiAqICAgQEhvc3RCaW5kaW5nKCdALmRpc2FibGVkJylcclxuICogICBwdWJsaWMgYW5pbWF0aW9uc0Rpc2FibGVkID0gdHJ1ZTtcclxuICogfVxyXG4gKiBgYGBcclxuICpcclxuICogIyMjIE92ZXJyaWRpbmcgZGlzYWJsZW1lbnQgb2YgaW5uZXIgYW5pbWF0aW9uc1xyXG4gKiBEZXNwaXRlIGlubmVyIGFuaW1hdGlvbnMgYmVpbmcgZGlzYWJsZWQsIGEgcGFyZW50IGFuaW1hdGlvbiBjYW4gYHF1ZXJ5KClgXHJcbiAqIGZvciBpbm5lciBlbGVtZW50cyBsb2NhdGVkIGluIGRpc2FibGVkIGFyZWFzIG9mIHRoZSB0ZW1wbGF0ZSBhbmQgc3RpbGwgYW5pbWF0ZVxyXG4gKiB0aGVtIGlmIG5lZWRlZC4gVGhpcyBpcyBhbHNvIHRoZSBjYXNlIGZvciB3aGVuIGEgc3ViIGFuaW1hdGlvbiBpc1xyXG4gKiBxdWVyaWVkIGJ5IGEgcGFyZW50IGFuZCB0aGVuIGxhdGVyIGFuaW1hdGVkIHVzaW5nIGBhbmltYXRlQ2hpbGQoKWAuXHJcbiAqXHJcbiAqICMjIyBEZXRlY3Rpbmcgd2hlbiBhbiBhbmltYXRpb24gaXMgZGlzYWJsZWRcclxuICogSWYgYSByZWdpb24gb2YgdGhlIERPTSAob3IgdGhlIGVudGlyZSBhcHBsaWNhdGlvbikgaGFzIGl0cyBhbmltYXRpb25zIGRpc2FibGVkLCB0aGUgYW5pbWF0aW9uXHJcbiAqIHRyaWdnZXIgY2FsbGJhY2tzIHN0aWxsIGZpcmUsIGJ1dCBmb3IgemVybyBzZWNvbmRzLiBXaGVuIHRoZSBjYWxsYmFjayBmaXJlcywgaXQgcHJvdmlkZXNcclxuICogYW4gaW5zdGFuY2Ugb2YgYW4gYEFuaW1hdGlvbkV2ZW50YC4gSWYgYW5pbWF0aW9ucyBhcmUgZGlzYWJsZWQsXHJcbiAqIHRoZSBgLmRpc2FibGVkYCBmbGFnIG9uIHRoZSBldmVudCBpcyB0cnVlLlxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiB0cmlnZ2VyKG5hbWU6IHN0cmluZywgZGVmaW5pdGlvbnM6IEFuaW1hdGlvbk1ldGFkYXRhW10pOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XHJcblxyXG4vKipcclxuICogU3RhcnRzIGEgcmV1c2FibGUgYW5pbWF0aW9uIHRoYXQgaXMgY3JlYXRlZCB1c2luZyB0aGUgYGFuaW1hdGlvbigpYCBmdW5jdGlvbi5cclxuICpcclxuICogQHBhcmFtIGFuaW1hdGlvbiBUaGUgcmV1c2FibGUgYW5pbWF0aW9uIHRvIHN0YXJ0LlxyXG4gKiBAcGFyYW0gb3B0aW9ucyBBbiBvcHRpb25zIG9iamVjdCB0aGF0IGNhbiBjb250YWluIGEgZGVsYXkgdmFsdWUgZm9yIHRoZSBzdGFydCBvZlxyXG4gKiB0aGUgYW5pbWF0aW9uLCBhbmQgYWRkaXRpb25hbCBvdmVycmlkZSB2YWx1ZXMgZm9yIGRldmVsb3Blci1kZWZpbmVkIHBhcmFtZXRlcnMuXHJcbiAqIEByZXR1cm4gQW4gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIGFuaW1hdGlvbiBwYXJhbWV0ZXJzLlxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiB1c2VBbmltYXRpb24oYW5pbWF0aW9uOiBBbmltYXRpb25SZWZlcmVuY2VNZXRhZGF0YSwgb3B0aW9ucz86IEFuaW1hdGlvbk9wdGlvbnMgfCBudWxsKTogQW5pbWF0aW9uQW5pbWF0ZVJlZk1ldGFkYXRhO1xyXG5cclxuLyoqXHJcbiAqIEEgcHJvZ3JhbW1hdGljIGNvbnRyb2xsZXIgZm9yIGEgZ3JvdXAgb2YgcmV1c2FibGUgYW5pbWF0aW9ucy5cclxuICogVXNlZCBpbnRlcm5hbGx5IHRvIGNvbnRyb2wgYW5pbWF0aW9ucy5cclxuICpcclxuICogQHNlZSBgQW5pbWF0aW9uUGxheWVyYFxyXG4gKiBAc2VlIGB7QGxpbmsgYW5pbWF0aW9ucy9ncm91cCBncm91cCgpfWBcclxuICpcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIMm1QW5pbWF0aW9uR3JvdXBQbGF5ZXIgaW1wbGVtZW50cyBBbmltYXRpb25QbGF5ZXIge1xyXG4gICAgcHJpdmF0ZSBfb25Eb25lRm5zO1xyXG4gICAgcHJpdmF0ZSBfb25TdGFydEZucztcclxuICAgIHByaXZhdGUgX2ZpbmlzaGVkO1xyXG4gICAgcHJpdmF0ZSBfc3RhcnRlZDtcclxuICAgIHByaXZhdGUgX2Rlc3Ryb3llZDtcclxuICAgIHByaXZhdGUgX29uRGVzdHJveUZucztcclxuICAgIHBhcmVudFBsYXllcjogQW5pbWF0aW9uUGxheWVyIHwgbnVsbDtcclxuICAgIHRvdGFsVGltZTogbnVtYmVyO1xyXG4gICAgcmVhZG9ubHkgcGxheWVyczogQW5pbWF0aW9uUGxheWVyW107XHJcbiAgICBjb25zdHJ1Y3RvcihfcGxheWVyczogQW5pbWF0aW9uUGxheWVyW10pO1xyXG4gICAgcHJpdmF0ZSBfb25GaW5pc2g7XHJcbiAgICBpbml0KCk6IHZvaWQ7XHJcbiAgICBvblN0YXJ0KGZuOiAoKSA9PiB2b2lkKTogdm9pZDtcclxuICAgIHByaXZhdGUgX29uU3RhcnQ7XHJcbiAgICBvbkRvbmUoZm46ICgpID0+IHZvaWQpOiB2b2lkO1xyXG4gICAgb25EZXN0cm95KGZuOiAoKSA9PiB2b2lkKTogdm9pZDtcclxuICAgIGhhc1N0YXJ0ZWQoKTogYm9vbGVhbjtcclxuICAgIHBsYXkoKTogdm9pZDtcclxuICAgIHBhdXNlKCk6IHZvaWQ7XHJcbiAgICByZXN0YXJ0KCk6IHZvaWQ7XHJcbiAgICBmaW5pc2goKTogdm9pZDtcclxuICAgIGRlc3Ryb3koKTogdm9pZDtcclxuICAgIHByaXZhdGUgX29uRGVzdHJveTtcclxuICAgIHJlc2V0KCk6IHZvaWQ7XHJcbiAgICBzZXRQb3NpdGlvbihwOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgZ2V0UG9zaXRpb24oKTogbnVtYmVyO1xyXG4gICAgYmVmb3JlRGVzdHJveSgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSBjb25zdCDJtVBSRV9TVFlMRSA9IFwiIVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgc2V0IG9mIENTUyBzdHlsZXMgZm9yIHVzZSBpbiBhbiBhbmltYXRpb24gc3R5bGUuXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgybVTdHlsZURhdGEge1xyXG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgeyB9XHJcbiJdfQ==