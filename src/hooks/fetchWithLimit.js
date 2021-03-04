export function fetchWithLimit (arr, requestsPerSec, maxInFlight, fn) {
    return new Promise(function (resolve, reject) {
        var index = 0;
        var inFlightCntr = 0;
        var doneCntr = 0;
        var launchTimes = [];
        var results = new Array(arr.length);

        // calculate num requests in last second
        function calcRequestsInLastSecond() {
            var now = Date.now();
            var cnt = 0;
            for (var i = launchTimes.length - 1; i >= 0; i--) {
                if (now - launchTimes[i] < 1000) {
                    ++cnt;
                } else {
                    break;
                }
            }
            return cnt;
        }

        function runMore () {
            while (
                index < arr.length &&
                inFlightCntr < maxInFlight &&
                calcRequestsInLastSecond() < requestsPerSec
            ) {
                ((i) => {
                    ++inFlightCntr;
                    launchTimes.push(Date.now());
                    fn(arr[i]).then(function (val) {
                        results[i] = val;
                        --inFlightCntr;
                        ++doneCntr;
                        runMore();
                    }, reject);
                })(index);
                ++index;
            }
            if (doneCntr === arr.length) {
                resolve(results);
            } else if (launchTimes.length >= requestsPerSec) {
                var delta =
                    1000 -
                    (Date.now() - launchTimes[launchTimes.length - requestsPerSec]);
                if (delta >= 0) {
                    setTimeout(runMore, ++delta);
                }
            }
        }
        runMore();
    });
}
