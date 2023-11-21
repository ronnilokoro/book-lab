document.addEventListener('DOMContentLoaded', function () {
    const numberInput = document.getElementById('numberInput');
    const timeResultDisplay = document.getElementById('timeResult');
    const moneyResultDisplay = document.getElementById('moneyResult');
    const plusButton = document.getElementById('plus');
    const minusButton = document.getElementById('minus');
    const maxInputValue = 90000;
    const stepValue = 1000;
    let animationTimeout1, animationTimeout2;
    let currentTimeResult = 54300; // 90hrs 30mins in seconds
    let currentMoneyResult = 2110.10;

    const formatNumber = (num) => {
        return num.toLocaleString();
    };

      const formatTime = (totalSeconds) => {
        let hours = Math.ceil(totalSeconds / 3600); // To the nearest hour
        return `${hours} hrs`;
    };

    const formatMoney = (amount) => {
        return `$ ${Math.round(amount).toLocaleString()}`; // To the nearest whole number and format
    };

    const animateResult = (start, end, isTime) => {
        const duration = 1000;
        const stepTime = 20;
        let current = start;
        let steps = duration / stepTime;
        let stepSize = (end - start) / steps;

        const step = () => {
            current += stepSize;
            if (isTime) {
                timeResultDisplay.textContent = formatTime(Math.round(current));
            } else {
                moneyResultDisplay.textContent = formatMoney(current);
            }

            if ((stepSize > 0 && current < end) || (stepSize < 0 && current > end)) {
                setTimeout(step, stepTime);
            } else {
                if (isTime) {
                    timeResultDisplay.textContent = formatTime(Math.round(end));
                    currentTimeResult = Math.round(end);
                } else {
                    moneyResultDisplay.textContent = formatMoney(end);
                    currentMoneyResult = end;
                }
            }
        };

        step();
    };

    const updateResults = (newValue) => {
        let timeResult = newValue * 2.7; // Formulla for time, ask Joe
        let moneyResult = newValue * 0.105505; // Formula for money, also ask Joe
        
        clearTimeout(animationTimeout1);
        animationTimeout1 = setTimeout(() => animateResult(currentTimeResult, timeResult, true), 1000);
        
        clearTimeout(animationTimeout2);
        animationTimeout2 = setTimeout(() => animateResult(currentMoneyResult, moneyResult, false), 2000);
    };

    const updateInputValue = (delta) => {
        let value = parseInt(numberInput.value.replace(/,/g, ''), 10) || 0;
        value = Math.min(Math.max(value + delta, 0), maxInputValue);
        numberInput.value = formatNumber(value);
        updateResults(value);
    };

    numberInput.addEventListener('input', () => {
        let value = parseInt(numberInput.value.replace(/,/g, ''), 10) || 0;
        if (!isNaN(value) && value >= 0 && value <= maxInputValue) {
            numberInput.value = formatNumber(value);
            updateResults(value);
        } else {
            numberInput.value = formatNumber(Math.min(Math.max(value, 0), maxInputValue));
            updateResults(Math.min(Math.max(value, 0), maxInputValue));
        }
    });

    plusButton.addEventListener('click', () => updateInputValue(stepValue));
    minusButton.addEventListener('click', () => updateInputValue(-stepValue));

    // Start with 20,000
    numberInput.value = formatNumber(20000);
    updateResults(20000);
});
