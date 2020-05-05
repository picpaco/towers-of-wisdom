/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var b64 = require('base64-js');
var SourceMapConsumer = require('source-map').SourceMapConsumer;
export function originalPositionFor(sourceMap, genPosition) {
    var smc = new SourceMapConsumer(sourceMap);
    // Note: We don't return the original object as it also contains a `name` property
    // which is always null and we don't want to include that in our assertions...
    var _a = smc.originalPositionFor(genPosition), line = _a.line, column = _a.column, source = _a.source;
    return { line: line, column: column, source: source };
}
export function extractSourceMap(source) {
    var idx = source.lastIndexOf('\n//#');
    if (idx == -1)
        return null;
    var smComment = source.slice(idx).split('\n', 2)[1].trim();
    var smB64 = smComment.split('sourceMappingURL=data:application/json;base64,')[1];
    return smB64 ? JSON.parse(decodeB64String(smB64)) : null;
}
function decodeB64String(s) {
    return b64.toByteArray(s).reduce(function (s, c) { return s + String.fromCharCode(c); }, '');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlX21hcF91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvdGVzdGluZy9zcmMvb3V0cHV0L3NvdXJjZV9tYXBfdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDakMsSUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsaUJBQWlCLENBQUM7QUFRbEUsTUFBTSxVQUFVLG1CQUFtQixDQUMvQixTQUFvQixFQUFFLFdBQXFEO0lBQzdFLElBQU0sR0FBRyxHQUFHLElBQUksaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0Msa0ZBQWtGO0lBQ2xGLDhFQUE4RTtJQUN4RSxJQUFBLHlDQUE2RCxFQUE1RCxjQUFJLEVBQUUsa0JBQU0sRUFBRSxrQkFBOEMsQ0FBQztJQUNwRSxPQUFPLEVBQUMsSUFBSSxNQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLE1BQWM7SUFDN0MsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFBRSxPQUFPLElBQUksQ0FBQztJQUMzQixJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0QsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25GLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDM0QsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLENBQVM7SUFDaEMsT0FBTyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQVMsRUFBRSxDQUFTLElBQUssT0FBQSxDQUFDLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBMUIsQ0FBMEIsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM3RixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1NvdXJjZU1hcH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuY29uc3QgYjY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJyk7XG5jb25zdCBTb3VyY2VNYXBDb25zdW1lciA9IHJlcXVpcmUoJ3NvdXJjZS1tYXAnKS5Tb3VyY2VNYXBDb25zdW1lcjtcblxuZXhwb3J0IGludGVyZmFjZSBTb3VyY2VMb2NhdGlvbiB7XG4gIGxpbmU6IG51bWJlcjtcbiAgY29sdW1uOiBudW1iZXI7XG4gIHNvdXJjZTogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3JpZ2luYWxQb3NpdGlvbkZvcihcbiAgICBzb3VyY2VNYXA6IFNvdXJjZU1hcCwgZ2VuUG9zaXRpb246IHtsaW5lOiBudW1iZXJ8bnVsbCwgY29sdW1uOiBudW1iZXJ8bnVsbH0pOiBTb3VyY2VMb2NhdGlvbiB7XG4gIGNvbnN0IHNtYyA9IG5ldyBTb3VyY2VNYXBDb25zdW1lcihzb3VyY2VNYXApO1xuICAvLyBOb3RlOiBXZSBkb24ndCByZXR1cm4gdGhlIG9yaWdpbmFsIG9iamVjdCBhcyBpdCBhbHNvIGNvbnRhaW5zIGEgYG5hbWVgIHByb3BlcnR5XG4gIC8vIHdoaWNoIGlzIGFsd2F5cyBudWxsIGFuZCB3ZSBkb24ndCB3YW50IHRvIGluY2x1ZGUgdGhhdCBpbiBvdXIgYXNzZXJ0aW9ucy4uLlxuICBjb25zdCB7bGluZSwgY29sdW1uLCBzb3VyY2V9ID0gc21jLm9yaWdpbmFsUG9zaXRpb25Gb3IoZ2VuUG9zaXRpb24pO1xuICByZXR1cm4ge2xpbmUsIGNvbHVtbiwgc291cmNlfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RTb3VyY2VNYXAoc291cmNlOiBzdHJpbmcpOiBTb3VyY2VNYXB8bnVsbCB7XG4gIGxldCBpZHggPSBzb3VyY2UubGFzdEluZGV4T2YoJ1xcbi8vIycpO1xuICBpZiAoaWR4ID09IC0xKSByZXR1cm4gbnVsbDtcbiAgY29uc3Qgc21Db21tZW50ID0gc291cmNlLnNsaWNlKGlkeCkuc3BsaXQoJ1xcbicsIDIpWzFdLnRyaW0oKTtcbiAgY29uc3Qgc21CNjQgPSBzbUNvbW1lbnQuc3BsaXQoJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnKVsxXTtcbiAgcmV0dXJuIHNtQjY0ID8gSlNPTi5wYXJzZShkZWNvZGVCNjRTdHJpbmcoc21CNjQpKSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIGRlY29kZUI2NFN0cmluZyhzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gYjY0LnRvQnl0ZUFycmF5KHMpLnJlZHVjZSgoczogc3RyaW5nLCBjOiBudW1iZXIpID0+IHMgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpLCAnJyk7XG59XG4iXX0=