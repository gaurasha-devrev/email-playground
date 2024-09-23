function myFunction(html1, html2) {
    // Create a DOM parser to convert HTML strings to DOM elements
    const parser = new DOMParser();
    const doc1 = parser.parseFromString(html1, 'text/html');
    const doc2 = parser.parseFromString(html2, 'text/html');

    // Function to find and gray out repeated content
    function grayOutRepeatedContent(doc1, doc2) {
        const text1 = doc1.body.innerText;
        const text2 = doc2.body.innerText;

        // Split the text into lines for easier comparison
        const lines1 = text1.split('\n').map(line => line.trim()).filter(line => line);
        const lines2 = text2.split('\n').map(line => line.trim()).filter(line => line);

        const seen = new Set(lines1);

        lines2.forEach(line => {
            if (seen.has(line)) {
                // If the line exists in html1, gray it out in html2
                const regex = new RegExp(line, 'g');
                doc2.body.innerHTML = doc2.body.innerHTML.replace(regex, `<span style="color: gray; text-decoration: line-through;">${line}</span>`);
            }
        });
    }

    // Gray out repeated content
    grayOutRepeatedContent(doc1, doc2);

    // Return the new HTML as a string
    return doc2.body.innerHTML;
}

// Example usage
const email1 = "<div>Hello, this is the first email.</div><div>Best, John</div>";
const email2 = "<div>Hello, this is the first email.</div><div>Looking forward to your reply.</div><div>Best, John</div>";

const new_html = myFunction(email1, email2);
console.log(new_html);


/*

lev


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
        return `<span class="repeated">${line}</span>`;
      } else {
        return `<span>${line}</span>`;
      }
    }).join("<br>");
  }

  function myFunction(html1, html2) {
    const combinedHtml = markRepeatedContent(html1, html2);
    console.log('\n\n\n\n\n\n\n', combinedHtml, '\n\n\n\n\n\n\n');
    // Add any additional logic here
  }
*/