const fs = require('fs');

const dataString = `Termin Zapłaty	Należność
10.01.2021	2700
10.02.2021	2700
...
10.08.2023	2700`;

// Split the data into lines
const lines = dataString.split('\n');

// Extract header line and split into array of column names
const header = lines.shift().split('\t');

// Process each line
const payments = lines.map(line => {
    const columns = line.split('\t');
    const obj = {};

    header.forEach((columnName, index) => {
        // Convert amounts to float, leave other values as-is
        obj[columnName] = isNaN(columns[index]) ? columns[index] : parseFloat(columns[index]);
    });

    return obj;
});

// Write data to a JSON file
fs.writeFileSync('payments.json', JSON.stringify(payments, null, 2));
