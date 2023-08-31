const interestRates = require('./data/interestRates.json');



const calculateInterest = require('./functions/calculateInterest').calculateInterest; 
const moveToNextWeekday =require('./functions/calculateInterest'). moveToNextWeekday;

const expectedPayments = require('./data/obligations.json');
const payments = require('./data/payments.json');

// Sort both lists by date
const flaggedExpectedPayments = expectedPayments.map(ep => ({ ...ep, type: 'expected' }));
const flaggedPayments = payments.map(p => ({ ...p, type: 'actual' }));

// Combine and sort the arrays
const combinedPayments = [...flaggedExpectedPayments, ...flaggedPayments].sort((a, b) => {
    return new Date(a.date.split('.').reverse().join('-')) - new Date(b.date.split('.').reverse().join('-'));
});

function calculateRemainingBalance() {
    let currentBalance = 0;
    let lastDate = null;
    let expectedBalance = 0
    let actualBalance = 0
    let interestBalance = 0
    let paidInterest = 0


    for (const payment of combinedPayments) {
        if (payment.type === 'actual') {
            let paymentAfterInterest = payment.amount
            if(paymentAfterInterest > interestBalance){
                paidInterest += interestBalance
                paidInterest = parseFloat(paidInterest.toFixed(2))
                paymentAfterInterest += interestBalance
                paymentAfterInterest =  parseFloat(paymentAfterInterest.toFixed(2));
                interestBalance = 0

            } else{
                interestBalance -= paymentAfterInterest
                interestBalance = parseFloat(interestBalance.toFixed(2))
                paymentAfterInterest = 0
            }
            console.log(paymentAfterInterest,payment.amount)
            currentBalance += paymentAfterInterest;
            currentBalance = parseFloat(currentBalance.toFixed(2));
            actualBalance += payment.amount;


        }

        if (payment.type === 'expected') {

            if (lastDate !== null) {
                let currentInterest = parseFloat(calculateInterest(currentBalance, lastDate, moveToNextWeekday(payment.date), interestRates).toFixed(2))
                interestBalance = interestBalance + currentInterest
                interestBalance = parseFloat(interestBalance.toFixed(2))
                // console.log(`expectedBalance: ${expectedBalance}, interestBalance: ${interestBalance}, currentInterest: ${currentInterest}, dateStart: ${lastDate}, expectedDate ${moveToNextWeekday(payment.date)}`)
            }

            expectedBalance += payment.amountDue


            // Deduct the expected payment from the current balance
            currentBalance -= payment.amountDue;
            currentBalance = parseFloat(currentBalance.toFixed(2));

            // Update the last date for the next interest calculation
            lastDate = moveToNextWeekday(payment.date);
        }

        if (payment.type === 'actual') {
            // Update the last date for the next interest calculation
            lastDate = payment.date;
        }
    }

    // console.log(actualBalance- expectedBalance, currentBalance, paidInterest)
    // console.log(interestBalance)

    console.log(`Final balance after expected payments and interests: ${currentBalance.toFixed(2)}`);
    console.log(`Actual balance: ${actualBalance}, Expected balance: ${expectedBalance}`)
}

calculateRemainingBalance()
// console.log(calculateInterest(5400,"10.03.2021","10.04.2021",interestRates).toFixed(2))
