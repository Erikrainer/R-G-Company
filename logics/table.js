function objectsToTable(objects) {
    if (objects.length === 0) {
        return ''; // Return an empty string if the array is empty
    }

    let table = '';

    // Calculate column widths
    const columnWidths = {};
    objects.forEach(obj => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                // Handle null values
                const value = obj[key] !== null ? obj[key].toString() : '';
                columnWidths[key] = Math.max(columnWidths[key] || 0, key.length, value.length);
            }
        }
    });

    // Generate table header
    for (const key in objects[0]) {
        if (objects[0].hasOwnProperty(key)) {
            table += `${key.padEnd(columnWidths[key])} | `;
        }
    }
    table += '\n';

    // Generate separator line
    for (const key in objects[0]) {
        if (objects[0].hasOwnProperty(key)) {
            table += '-'.repeat(columnWidths[key]) + ' | ';
        }
    }
    table += '\n';

    // Generate table data
    objects.forEach(obj => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                // Handle null values
                const value = obj[key] !== null ? obj[key].toString().padEnd(columnWidths[key]) : ''.padEnd(columnWidths[key]);
                table += `${value} | `;
            }
        }
        table += '\n';
    });

    return table;
}

module.exports = objectsToTable;