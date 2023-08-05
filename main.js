const convertBtn = document.getElementById("convert_button");


// Словарь для хранения соотношений конвертации
const conversionTable = {
  m: { ft: 3.28084, cm: 100, in: 39.3701 },
  cm: { m: 0.01, ft: 0.0328084, in: 0.393701 },
  in: { m: 0.0254, cm: 2.54, ft: 0.0833333 },
  ft: { m: 0.3048, cm: 30.48, in: 12 },
};

const loadConversionRules = (jsonFile) => {
    fetch(jsonFile)
    .then(response => response.json())
    .then(conversionRules => Object.assign(conversionTable, conversionRules))
    .catch(error => console.error('Error loading conversion rules:', error));
}

function convertDistance() {
  const distanceInput = document.getElementById("distance");
  const unitFromSelect = document.getElementById("unit-from");
  const unitToSelect = document.getElementById("unit-to");
  const resultDiv = document.getElementById("result");

  const unitFrom = unitFromSelect.value;
  const value = parseFloat(distanceInput.value);
  const unitTo = unitToSelect.value;

  // Конвертация значения
  let resultValue;
  if (isNaN(value)) {
    resultValue = "Invalid input";
  } else if (unitFrom === unitTo) {
    resultValue = value;
  } else {
    const conversionFactor = conversionTable[unitFrom][unitTo];
    resultValue = (value * conversionFactor).toFixed(2);
  }

  resultDiv.textContent = `${resultValue} ${unitTo}`;
}

loadConversionRules('conversion_rules.json');

convertBtn.addEventListener('click', convertDistance)