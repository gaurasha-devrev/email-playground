const fs = require('fs').promises; // Use promises with fs
const { simpleParser } = require('mailparser');

function processHtml(html1, html2) {
    const combinedHtml = html2 ;//+ html2;
    console.log('\n\n\n\n\n\n\n', combinedHtml, '\n\n\n\n\n\n\n');
    // Add any additional logic here
}

function extractHtmlFromEml(filePath) {
    return fs.readFile(filePath)
        .then(data => {
            return simpleParser(data);
        })
        .then(parsed => {
            if (parsed.html) {
                return parsed.html;
            } else {
                console.log(`No HTML content found in ${filePath}.`);
                return '';
            }
        })
        .catch(err => {
            console.error('Error:', err);
            return '';
        });
}

// Usage
const emlFilePath1 = 'eml/email_1.eml'; // Replace with your .eml file path
const emlFilePath2 = 'eml/email_1_1.eml'; // Replace with your .eml file path

Promise.all([extractHtmlFromEml(emlFilePath1), extractHtmlFromEml(emlFilePath2)])
    .then(([html1, html2]) => {
        processHtml1(html1, html2);
    })
    .catch(err => {
        console.error('Failed to extract HTML:', err);
    });




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function jaccardIndex(a, b) {
    const setA = new Set(a.split(' '));
    const setB = new Set(b.split(' '));
    
    const intersection = [...setA].filter(x => setB.has(x)).length;
    const union = new Set([...setA, ...setB]).size;

    return intersection / union; // Returns Jaccard index
}

function myFunction(html1, html2) {
    const parser = new DOMParser();
    const doc1 = parser.parseFromString(html1, 'text/html');
    const doc2 = parser.parseFromString(html2, 'text/html');

    const lines1 = doc1.body.innerText.split('\n').map(line => line.trim());
    const lines2 = doc2.body.innerText.split('\n').map(line => line.trim());

    lines2.forEach(line => {
        lines1.forEach(refLine => {
            if (jaccardIndex(line, refLine) > 0.5) { // threshold for similarity
                const regex = new RegExp(line, 'g');
                doc2.body.innerHTML = doc2.body.innerHTML.replace(regex, `<span style="color: gray; text-decoration: line-through;">${line}</span>`);
            }
        });
    });

    return doc2.body.innerHTML;
}


  function processHtml1(html1, html2) {
    const combinedHtml = myFunction(html1, html2);
    console.log('\n\n\n\n\n\n\n', combinedHtml, '\n\n\n\n\n\n\n');
    // Add any additional logic here
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////