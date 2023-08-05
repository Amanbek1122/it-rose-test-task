function calculateDistance(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  const dz = point1.z - point2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function getRandomPoint() {
  const x = Math.floor(Math.random() * 101);
  const y = Math.floor(Math.random() * 101);
  const z = Math.floor(Math.random() * 101);
  return { x, y, z };
}

function searchAlgorithm(searchPoints) {
  let randomPoint = getRandomPoint();
  let minDistance = Number.MAX_SAFE_INTEGER;
  let closestPoint;

  for (const point of searchPoints) {
    const distance = calculateDistance(point, randomPoint);
    if (distance < minDistance) {
      minDistance = distance;
      closestPoint = point;
    }
  }

  return { randomPoint, closestPoint };
}

const inputData = {
  result: {
    random_point: { x: 10, y: 10, z: 10 },
    search_points: [
      { x: 0, y: 1, z: 2 },
      { x: 10, y: 321, z: 11 },
    ],
    calls: 85,
  },
};

const outputElement = document.getElementById("output");
const result = searchAlgorithm(inputData.result.search_points);
outputElement.innerText = JSON.stringify(result, null, 2);
