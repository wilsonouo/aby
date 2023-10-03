module.exports = function checkNull(data) {
    for(var key in data) {
        // not empty
        return false;
    }
    // empty
    return true;
}

