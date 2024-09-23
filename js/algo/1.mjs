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

  function processHtml1(html1, html2) {
    const combinedHtml = markRepeatedContent(html1, html2);
    console.log('\n\n\n\n\n\n\n', combinedHtml, '\n\n\n\n\n\n\n');
    // Add any additional logic here
  }