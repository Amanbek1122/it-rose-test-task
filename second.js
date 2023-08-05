function applyCondition(data, condition) {
    for (let rule in condition) {
      if (rule === "exclude") {
        data = exclude(data, condition[rule]);
      } else if (rule === "include") {
        data = include(data, condition[rule]);
      } else if (rule === "sort_by") {
        data = sortBy(data, condition[rule]);
      }
    }
    return data;
  }

  function exclude(data, filters) {
    return data.filter(item => {
      return !filters.some(filter => {
        return Object.keys(filter).every(key => item[key] === filter[key]);
      });
    });
  }

  function include(data, filters) {
    return data.filter(item => {
      return filters.some(filter => {
        return Object.keys(filter).every(key => item[key] === filter[key]);
      });
    });
  }

  function sortBy(data, keys) {
    return data.sort((a, b) => {
      for (let key of keys) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
      }
      return 0;
    });
  }

  function processData() {
    const inputData = JSON.parse(document.getElementById("data").value);
    const condition = JSON.parse(document.getElementById("condition").value);
    const result = applyCondition(inputData.data, condition);
    document.getElementById("result2").innerText = JSON.stringify({ data: result }, null, 2);
  }