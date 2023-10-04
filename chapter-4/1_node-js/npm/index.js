const fs = require('fs');

// read file
let file = fs.readFileSync('./text.txt', 'utf-8');
console.log(file);

let students = [
    { name: 'agus' },
    { name: 'ajeng' },
    { name: 'joko' }
];
fs.writeFileSync('./students.json', JSON.stringify(students, null, 4));