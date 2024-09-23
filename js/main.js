

const fs = require('fs');
const { simpleParser } = require('mailparser');

function processHtml(htmlContent) {
    console.log(htmlContent);
    // Add your logic here to process the HTML content
}

function extractHtmlFromEml(filePath) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        simpleParser(data, (err, parsed) => {
            if (err) {
                console.error('Error parsing the email:', err);
                return;
            }

            if (parsed.html) {
                //  processHtml(parsed.html);
                return parsed.html;
            } else {
                console.log('No HTML content found.');
            }
        });
    });
}

// Usage
const emlFilePath1 = 'eml/email_1.eml'; // Replace with your .eml file path
const emlFilePath2 = 'eml/email_1_1.eml'; // Replace with your .eml file path

const html1 = extractHtmlFromEml(emlFilePath1);
const html2 = extractHtmlFromEml(emlFilePath2);

console.log(html1);
console.log(html2);


function processHtml(html1, html2) {
    return html1 + html2;
}