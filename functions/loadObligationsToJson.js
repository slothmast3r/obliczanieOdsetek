const fs = require('fs');

const dataString = `10.01.2021\t2700
10.02.2021\t2700
10.03.2021\t2700
10.04.2021\t2700
10.05.2021\t2700
10.06.2021\t2700
10.07.2021\t2700
10.08.2021\t2700
10.09.2021\t2700
10.10.2021\t2700
10.11.2021\t2700
10.12.2021\t2700
10.01.2022\t2700
10.02.2022\t2700
10.03.2022\t2700
10.04.2022\t2700
10.05.2022\t2700
10.06.2022\t2700
10.07.2022\t2700
10.08.2022\t2700
10.09.2022\t2700
10.10.2022\t2700
10.11.2022\t2700
10.12.2022\t2700
10.01.2023\t2700
10.02.2023\t2700
10.03.2023\t2700
10.04.2023\t2700
10.05.2023\t2700
10.06.2023\t2700
10.07.2023\t2700
10.08.2023\t2700`;

// Split the data into lines
const lines = dataString.split('\n');

// Remove the header line
const header = lines.shift();

// Process each line
const payments = lines.map(line => {
    const columns = line.split('\t');

    return {
        date: columns[0],
        amountDue: parseFloat(columns[1])
    };
});

// Write data to a JSON file
fs.writeFileSync('obligations.json', JSON.stringify(payments, null, 2));
