interface Coordinate {
  x: number;
  y: number;
}

export function findShortestPath(start: Coordinate, end: Coordinate): Coordinate[] {
  // Possible movement directions (up, down, left, right, diagonals)
  const directions: Coordinate[] = [
      {x: 0, y: 1}, {x: 0, y: -1}, 
      {x: 1, y: 0}, {x: -1, y: 0},
      {x: 1, y: 1}, {x: 1, y: -1}, 
      {x: -1, y: 1}, {x: -1, y: -1}
  ];

  // Set to keep track of visited coordinates
  const visited = new Set<string>();

  // Queue for BFS
  const queue: {point: Coordinate, path: Coordinate[]}[] = [
      {point: start, path: [start]}
  ];

  // Helper function to convert coordinate to string key
  const getKey = (coord: Coordinate) => `${coord.x},${coord.y}`;

  // Mark start point as visited
  visited.add(getKey(start));

  while (queue.length > 0) {
      const {point, path} = queue.shift()!;

      // Check if reached end point
      if (point.x === end.x && point.y === end.y) {
          return path;
      }

      // Explore all possible directions
      for (const dir of directions) {
          const nextPoint: Coordinate = {
              x: point.x + dir.x,
              y: point.y + dir.y
          };

          const nextKey = getKey(nextPoint);

          // Skip if already visited
          if (!visited.has(nextKey)) {
              visited.add(nextKey);
              queue.push({
                  point: nextPoint, 
                  path: [...path, nextPoint]
              });
          }
      }
  }

  // No path found
  return [];
}
