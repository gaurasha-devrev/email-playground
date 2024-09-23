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
// Install the necessary modules first by running:
// npm install jsdom he

const { JSDOM } = require('jsdom');
const { encode, decode } = require('html-entities');


function myFunction(html1, html2) {
    // Use JSDOM to parse HTML strings
    const dom1 = new JSDOM(html1);
    const dom2 = new JSDOM(html2);

    const doc1 = dom1.window.document;
    const doc2 = dom2.window.document;

    // Create a Set to store encoded text from doc1
    const textSet = new Set();

    // Traverse a document and add text nodes to the Set
    function addTextNodesToSet(node) {
        if (isNonEmptyTextNode(node)) {
            const encodedText = escapeHtml(node.nodeValue.trim());
            textSet.add(encodedText);
        } else {
            node.childNodes.forEach(addTextNodesToSet);
        }
    }

    // Helper function to check if a node is a non-empty text node
    function isNonEmptyTextNode(node) {
        return node.nodeType === 3 && node.nodeValue.trim() !== ""; // Node.TEXT_NODE is 3 in Node.js
    }

    // Escape HTML entities
    function escapeHtml(html) {
        return encode(html);
    }

    // Decode HTML entities
    function decodeHtml(html) {
        return decode(html);
    }

    // Traverse doc1 to fill the Set
    addTextNodesToSet(doc1.body);
    console.log('textSet:', textSet);
    
    // Replace occurrences of matched text in doc2
    function replaceOccurrencesInDoc(node) {
        if (isNonEmptyTextNode(node)) {
            const originalText = node.nodeValue.trim();
            const encodedText = escapeHtml(originalText);
            const markedText = `<span style="color: gray; text-decoration: line-through;">${encodedText}</span>`;
            console.log('encodedText:', encodedText,textSet.has(encodedText),  replaceOccurrences(encodedText, markedText, node.parentNode.innerHTML));
            if (textSet.has(encodedText)) {
                const markedText = `<span style="color: gray; text-decoration: line-through;">${encodedText}</span>`;
                node.parentNode.innerHTML = replaceOccurrences(encodedText, markedText, node.parentNode.innerHTML);
            }
        } else {
            node.childNodes.forEach(replaceOccurrencesInDoc);
        }
    }

    // Replace all occurrences of 'a' with 'b' in 'c'
    function replaceOccurrences(a, b, c) {
        const regex = new RegExp(escapeRegExp(a), 'g');
        return c.replace(regex, b);
    }

    // Escape special characters for RegExp
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    // Traverse doc2 and replace matched text
    replaceOccurrencesInDoc(doc2.body);

    return doc2.body.innerHTML;
}

  function processHtml1(html1, html2) {
    const combinedHtml = myFunction(html1, html2);
    console.log('\n\n\n\n\n\n\n', combinedHtml, '\n\n\n\n\n\n\n');
    // Add any additional logic here
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////