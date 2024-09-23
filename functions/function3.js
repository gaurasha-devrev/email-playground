function myFunction(html1, html2) {
    const parser = new DOMParser();
    const doc1 = parser.parseFromString(html1, 'text/html');
    const doc2 = parser.parseFromString(html2, 'text/html');

    // Create a Set to store encoded text from doc1
    const textSet = new Set();

    // Traverse doc1 to fill the Set
    function fillTextSet(node) {
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
            const encodedText = escapeHtml(node.nodeValue.trim());
            textSet.add(encodedText);
        } else {
            for (let child of node.childNodes) {
                fillTextSet(child);
            }
        }
    }

    fillTextSet(doc1.body);
    console.log(textSet);

    // Function to decode HTML entities
    function decodeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    // Function to escape HTML entities
    function escapeHtml(html) {
        var text = document.createTextNode(html);
        var div = document.createElement('div');
        div.appendChild(text);
        return div.innerHTML;
    }
function replaceOccurrences(a, b, c) {
  // Use a regular expression to replace all occurrences of 'a' with 'b'
  // The 'g' flag ensures that all occurrences are replaced
  const regex = new RegExp(escapeRegExp(a), 'g');
  return c.replace(regex, b);
}

// Function to escape special characters for use in RegExp
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole string
}
    // Traverse doc2 and mark repeated text
    function traverseAndMark(node) {
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
            const originalText = node.nodeValue.trim();
            const encodedText = escapeHtml(originalText);

            // Use a temporary element to get the plain text from innerHTML
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = node.parentNode.innerHTML;
            const innerText = tempDiv.innerText || tempDiv.textContent;

            console.log(encodedText, textSet.has(encodedText));

            if (textSet.has(encodedText)) {
                const grayOutSpan = `<span style="color: gray; text-decoration: line-through;">${encodedText}</span>`;
                console.log(node.parentNode.innerHTML);
                
                // Replace using encodedText to handle special characters
                node.parentNode.innerHTML = replaceOccurrences( encodedText,grayOutSpan, node.parentNode.innerHTML);
                console.log(node.parentNode);
            }
        } else {
            for (let child of node.childNodes) {
                traverseAndMark(child);
            }
        }
    }

    traverseAndMark(doc2.body);
    console.log(doc2.body.innerHTML);
    return doc2.body.innerHTML;
}

/*
Hash With DOM Tree 
Description: Utilize a recursive tree traversal to compare the DOM structures of both HTML documents. When identical nodes are found, mark them for de-emphasis.
*/
