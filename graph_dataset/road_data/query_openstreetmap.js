import fetch from 'node-fetch';  // Import node-fetch to use fetch in ES Modules
import fs from 'fs';  // Import the file system module


// Define query parameters using template literals
const outputFormat = "json";
const timeout = 90;

// way[highway]; Filters for ways with any highway tag value. 


const bbox = {
  south: 48.273,
  west: 2.224,
  north: 49.211,
  east: 2.469
};

// 
// const bbox = {
//   south: 49.205587,
//   west: -123.28145,
//   north: 49.29335,
//   east: -123.022058
// };

// Construct the OverpassQL query with template literals
const query = `
  [out:${outputFormat}][timeout:${timeout}][bbox:${bbox.south},${bbox.west},${bbox.north},${bbox.east}];
  (
    way[highway]; 
    relation[restriction];
  );
  out geom;
`;

// Construct the body for the POST request
const body = "data=" + encodeURIComponent(query);

// Use the constructed body in the fetch request
async function fetchOSMData() {
  const response = await fetch(
    "https://overpass-api.de/api/interpreter",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error, Status: ${response.status}`);
  }

  const result = await response.json();
  

  
  fs.writeFile('osm_data.json', JSON.stringify(result, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log(`Completed: ${result.elements.length} returned`)
    }
  });
}

fetchOSMData();
