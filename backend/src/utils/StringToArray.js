module.exports = function StringToArray(string){
    return string.split(',').map(str => str.trim());
}