const moment = require('moment');

function moveToNextWeekday(date) {
    // Create a moment object from the JavaScript date
    let momentDate = moment(date, "DD.MM.YYYY");

    // Get the day of the week
    let day = momentDate.day();

    // If it's Saturday (6) or Sunday (0), move to the next weekday
    if (day === 0 || day === 6) {
        let daysToMove = (day === 0) ? 1 : 2;
        momentDate.add(daysToMove, 'days');
    }

    return momentDate.format("DD.MM.YYYY");
}

function calculateInterest(principal, start, end, interestRates) {
    let totalInterest = 0;

    // Convert DD.MM.YYYY to Moment object
    const startDate = moment(start, "DD.MM.YYYY").add(1, 'days');

    // Convert DD.MM.YYYY to Moment object
    const endDate = moment(end, "DD.MM.YYYY");

    for (const period of interestRates) {
        const periodStart = moment(period.start);
        const periodEnd = moment(period.end);

        // Check if the periods overlap
        if (endDate.isBefore(periodStart) || startDate.isAfter(periodEnd)) continue;

        // Calculate the number of days for the overlapping period
        const overlapStart = moment.max(startDate, periodStart);
        const overlapEnd = moment.min(endDate, periodEnd);

        const overlapDays = overlapEnd.diff(overlapStart, 'days') + 1;

        // Calculate interest for the overlapping period
        let interestForPeriod = (principal * period.rate / 100) * (overlapDays / 365);
        interestForPeriod = parseFloat(interestForPeriod.toFixed(2));  // Round to 2 decimal places

        totalInterest += interestForPeriod;
    }

    return totalInterest;
}

module.exports = {
    moveToNextWeekday,
    calculateInterest
};
