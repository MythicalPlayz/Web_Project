/**
 * Changes the requirement of an element
 * @param {Element} ID - ID of an element
 * @param {boolean} value - status of requirement
 */
function manageRequired(ID, value) {
    let element = document.getElementById(ID)
    element.required = value
}