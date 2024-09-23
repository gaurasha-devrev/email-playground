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

function tokenizeEmail(content) {
    return content.split("\n").map(line => line.trim());
  }

  function LCS(arr1, arr2) {
    const len1 = arr1.length;
    const len2 = arr2.length;
    const dp = Array(len1 + 1).fill().map(() => Array(len2 + 1).fill(0));
    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        if (arr1[i - 1] === arr2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    let i = len1, j = len2;
    const lcs = [];
    while (i > 0 && j > 0) {
      if (arr1[i - 1] === arr2[j - 1]) {
        lcs.unshift(arr1[i - 1]);
        i--;
        j--;
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
    return lcs;
  }

  function markRepeatedContent(newEmail, oldEmail) {
    const newEmailTokens = tokenizeEmail(newEmail);
    const oldEmailTokens = tokenizeEmail(oldEmail);
    const lcs = LCS(newEmailTokens, oldEmailTokens);

    return newEmailTokens.map(line => {
      if (lcs.includes(line)) {
        console.log('line', line, '\n\n');
        return `<span class="repeated">${line}</span>`;
      } else {
        return `<span>${line}</span>`;
      }
    }).join("<br>");
  }

  function processHtml1(html1, html2) {
    const combinedHtml = markRepeatedContent(html1, html2);
    console.log('\n\n\n\n\n\n\n', combinedHtml, '\n\n\n\n\n\n\n');
    // Add any additional logic here
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////