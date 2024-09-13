interface DataObject {
  [key: string]: any;
}

// Define your custom key order from zZ to aA
const customOrder: string =
  "zZxXywWvVuUtTsSrRqQpPoOnNmMlLkKjJiIhHgGfFeEdDcCbBaA987654321";

// Function to get index in customOrder
function getCustomOrderIndex(char: string): number {
  return customOrder.indexOf(char);
}

// Function to transform key names according to custom order
function transformKeyName(key: string): string {
  // Split key into characters, sort based on custom order, then join back
  return key
    .split("")
    .sort((a, b) => {
      const indexA = getCustomOrderIndex(a);
      const indexB = getCustomOrderIndex(b);
      return indexA - indexB; // Sort in ascending order based on customOrder
    })
    .join("");
}

// Function to count 'e' and 'E' characters in keys
function countEInKey(key: string): number {
  return (key.match(/e/gi) || []).length;
}

// Recursive function to transform keys and count 'e'
export function sortAndTransformKeys(
  obj: DataObject | any[],
): DataObject | any[] {
  if (Array.isArray(obj)) {
    return obj.map((item) =>
      typeof item === "object" ? sortAndTransformKeys(item) : item,
    );
  } else if (typeof obj === "object" && obj !== null) {
    let countE = 0;

    // Calculate countE and create the transformed object
    const transformedObject: DataObject = Object.keys(obj)
      .sort((a, b) => {
        const indexA = getCustomOrderIndex(a[0]);
        const indexB = getCustomOrderIndex(b[0]);
        return indexB - indexA; // Reverse order
      })
      .reduce((result: DataObject, key: string) => {
        const transformedKey = transformKeyName(key);
        const value = sortAndTransformKeys(obj[key]); // Recursively process value

        countE += countEInKey(key); // Count 'e' and 'E' in the key

        result[transformedKey] = value;
        return result;
      }, {});

    const finalObject: DataObject = { countE };
    return { ...finalObject, ...transformedObject }; // Combine countE with the rest
  }
  return obj;
}
