/**
 * Redirects the user to a different webpage after a specified delay.
 * @param {string} URL - The Universal Resource Locator (URL) of the destination webpage.
 * @param {number} [delay=1000] - The time in milliseconds to wait before redirection. Default is 1000 milliseconds (1 second).
 */
function redirectTo(URL, delay = 1000) {
    setTimeout(function() {
    window.location.href = URL
    }, delay);
}

export {redirectTo}