// simple_file_search_tool.js

const fs = require('fs');
const path = require('path');

function searchFiles(directory, keyword) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        files.forEach(file => {
            const filePath = path.join(directory, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error reading file stats:', err);
                    return;
                }
                if (stats.isDirectory()) {
                    searchFiles(filePath, keyword);
                } else if (stats.isFile() && file.includes(keyword)) {
                    console.log(filePath);
                }
            });
        });
    });
}

// Example usage
searchFiles('/path/to/directory', 'example');
