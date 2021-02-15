"use strict";
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
//# sourceMappingURL=worker.js.map