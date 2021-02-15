/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!********************************************************************************************!*\
  !*** ./node_modules/ts-loader/index.js??ruleSet[1].rules[2].use[0]!./src/sudoku/worker.ts ***!
  \********************************************************************************************/

var ctx = self;
var SieveOfEratosthenes = /** @class */ (function () {
    function SieveOfEratosthenes() {
    }
    SieveOfEratosthenes.prototype.calculate = function (limit) {
        var sieve = [];
        var primes = [];
        var k;
        var l;
        sieve[1] = false;
        for (k = 2; k <= limit; k += 1) {
            sieve[k] = true;
        }
        for (k = 2; k * k <= limit; k += 1) {
            if (sieve[k] !== true) {
                continue;
            }
            for (l = k * k; l <= limit; l += k) {
                sieve[l] = false;
            }
        }
        sieve.forEach(function (value, key) {
            if (value) {
                primes.push(key);
            }
        });
        return primes;
    };
    return SieveOfEratosthenes;
}());
var sieve = new SieveOfEratosthenes();
ctx.addEventListener("message", function (event) {
    var limit = event.data.limit;
    var primes = sieve.calculate(limit);
    ctx.postMessage({ primes: primes });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYW1lc29sdmVyLy4vc3JjL3N1ZG9rdS93b3JrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTSxHQUFHLEdBQVcsSUFBVyxDQUFDO0FBRWhDO0lBQUE7SUFpQ0EsQ0FBQztJQS9CRyx1Q0FBUyxHQUFULFVBQVUsS0FBYTtRQUVyQixJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxDQUFDO1FBQ04sSUFBSSxDQUFDLENBQUM7UUFFTixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDOUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUNqQjtRQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDckIsU0FBUzthQUNWO1lBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7YUFDbEI7U0FDRjtRQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRztZQUN2QixJQUFJLEtBQUssRUFBRTtnQkFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2xCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUVoQixDQUFDO0lBRUwsMEJBQUM7QUFBRCxDQUFDO0FBRUQsSUFBTSxLQUFLLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO0FBR3hDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBQyxLQUFLO0lBQ2xDLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQy9CLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sVUFBRSxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoibWFpbi53b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjdHg6IFdvcmtlciA9IHNlbGYgYXMgYW55O1xyXG5cclxuY2xhc3MgU2lldmVPZkVyYXRvc3RoZW5lcyB7XHJcbiAgXHJcbiAgICBjYWxjdWxhdGUobGltaXQ6IG51bWJlcikge1xyXG5cclxuICAgICAgY29uc3Qgc2lldmUgPSBbXTtcclxuICAgICAgY29uc3QgcHJpbWVzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICBsZXQgaztcclxuICAgICAgbGV0IGw7XHJcblxyXG4gICAgICBzaWV2ZVsxXSA9IGZhbHNlO1xyXG4gICAgICBmb3IgKGsgPSAyOyBrIDw9IGxpbWl0OyBrICs9IDEpIHtcclxuICAgICAgICBzaWV2ZVtrXSA9IHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAoayA9IDI7IGsgKiBrIDw9IGxpbWl0OyBrICs9IDEpIHtcclxuICAgICAgICBpZiAoc2lldmVba10gIT09IHRydWUpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGwgPSBrICogazsgbCA8PSBsaW1pdDsgbCArPSBrKSB7XHJcbiAgICAgICAgICBzaWV2ZVtsXSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgc2lldmUuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgcHJpbWVzLnB1c2goa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHByaW1lcztcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5jb25zdCBzaWV2ZSA9IG5ldyBTaWV2ZU9mRXJhdG9zdGhlbmVzKCk7XHJcblxyXG5cclxuY3R4LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIChldmVudCkgPT4ge1xyXG4gICAgY29uc3QgbGltaXQgPSBldmVudC5kYXRhLmxpbWl0O1xyXG4gICAgY29uc3QgcHJpbWVzID0gc2lldmUuY2FsY3VsYXRlKGxpbWl0KTtcclxuICAgIGN0eC5wb3N0TWVzc2FnZSh7IHByaW1lcyB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==