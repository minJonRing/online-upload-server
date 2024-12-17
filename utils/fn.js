

const fs = require('fs');

const readFile = (root) => {
    const jsonData = fs.readFileSync(root, 'utf8');
    return JSON.parse(jsonData)
}
const saveFile = (root, data) => {
    const str = JSON.stringify(data)
    return fs.writeFileSync(root, str);
}

module.exports = {
    readFile,
    saveFile
}