const fs = require('fs');

// Twoje dane jako jeden długi string (zakładam, że są one tak wczytane)
const dataString = `12.04.2023\tPrzelew na konto\t6500\tPLN\t52160014621800450050000001\t2045-01-01 00:00:00\t20-417 LUBLIN
23.02.2023\tPrzelew na konto\t3500\tPLN\t52160014621800450050000001\t2045-01-01 00:00:00\t20-417 LUBLIN
29.12.2022\tPrzelew z rachunku\t2500\tPLN\t52160014621800450050000001\tBIODEVELOPMENT SPÓŁKA Z OGRANICZON\tLUBLIN UL. KUNICKIEGO WŁADYSŁAWA 45 20-417
22.12.2022\tPrzelew na konto\t2500\tPLN\t52160014621800450050000001\t2045-01-01 00:00:00\t20-417 LUBLIN
14.11.2022\tPrzelew z rachunku\t10000\tPLN\t52160014621800450050000001\tBIODEVELOPMENT SPÓŁKA Z OGRANICZON\tLUBLIN UL. KUNICKIEGO WŁADYSŁAWA 45 20-417
29.09.2022\tPrzelew z rachunku\t5000\tPLN\t52160014621800450050000001\tBIODEVELOPMENT SPÓŁKA Z OGRANICZON\tLUBLIN UL. KUNICKIEGO WŁADYSŁAWA 45 20-417
09.09.2022\tPrzelew na konto\t10000\tPLN\t52160014621800450050000001\t2045-01-01 00:00:00\t20-417 LUBLIN
09.09.2022\tPrzelew na konto\t100\tPLN\t52160014621800450050000001\t2045-01-01 00:00:00\t20-417 LUBLIN
31.08.2022\tPrzelew z rachunku\t4700\tPLN\t52160014621800450050000001\tBIODEVELOPMENT SPÓŁKA Z OGRANICZON\tLUBLIN UL. KUNICKIEGO WŁADYSŁAWA 45 20-417
29.07.2022\tPrzelew na konto\t700\tPLN\t52160014621800450050000001\t2045-01-01 00:00:00\t20-417 LUBLIN
28.07.2022\tPrzelew na konto\t2000\tPLN\t52160014621800450050000001\t2045-01-01 00:00:00\t20-417 LUBLIN
05.07.2022\tPrzelew na konto\t1300\tPLN\t59132000190099041520000398\t2045-01-01 00:00:00\t20-417 LUBLIN
22.06.2022\tPrzelew na konto\t1700\tPLN\t52160014621800450050000001\t2045-01-01 00:00:00\t20-417 LUBLIN
20.06.2022\tPrzelew na konto\t2000\tPLN\t52160014621800450050000001\t2045-01-01 00:00:00\t20-417 LUBLIN
27.04.2022\tPrzelew na konto\t3000\tPLN\t52160014621800450050000001\t2045-01-01 00:00:00\t20-417 LUBLIN`;
const lines = dataString.split('\n');

// Przetwarzamy każdą linię
const payments = lines.map(line => {
    const columns = line.split('\t');

    return {
        date: columns[0],
        transactionType: columns[1],
        amount: parseFloat(columns[2]),
        currency: columns[3],
        accountNumber: columns[4],
        companyName: columns[5],
        address: columns[6]
    };
});

// Zapisujemy dane do pliku JSON
fs.writeFileSync('payments.json', JSON.stringify(payments, null, 2));