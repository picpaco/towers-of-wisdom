/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Rule } from '@angular-devkit/schematics';
export { polyfillMetadataRule } from './polyfill-metadata';
export { typeScriptHelpersRule } from './typescript-helpers';
export { updateDevkitBuildNgPackagr } from './devkit-ng-packagr';
export default function (): Rule;