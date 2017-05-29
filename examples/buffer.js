const Navatar = require('../index');

let avatar = new Navatar('name',50)

console.log(avatar.toBuffer().toString('base64'));
