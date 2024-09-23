function myFunction(html1, html2) {
    const parser = new DOMParser();
    const doc1 = parser.parseFromString(html1, 'text/html');
    const doc2 = parser.parseFromString(html2, 'text/html');

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
        return node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "";
    }

    // Escape HTML entities
    function escapeHtml(html) {
        const textNode = document.createTextNode(html);
        const div = document.createElement('div');
        div.appendChild(textNode);
        return div.innerHTML;
    }

    // Decode HTML entities
    function decodeHtml(html) {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = html;
        return textarea.value;
    }

    // Traverse doc1 to fill the Set
    addTextNodesToSet(doc1.body);

    // Replace occurrences of matched text in doc2
    function replaceOccurrencesInDoc(node) {
        if (isNonEmptyTextNode(node)) {
            const originalText = node.nodeValue.trim();
            const encodedText = escapeHtml(originalText);

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
