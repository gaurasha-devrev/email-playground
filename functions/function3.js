function myFunction(html1, html2) {
    const parser = new DOMParser();
    const doc1 = parser.parseFromString(html1, 'text/html');
    const doc2 = parser.parseFromString(html2, 'text/html');

    // Create a Set to store text from doc1
    const textSet = new Set();

    // Traverse doc1 to fill the Set
    function fillTextSet(node) {
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
            textSet.add(node.nodeValue.trim());
        } else {
            for (let child of node.childNodes) {
                fillTextSet(child);
            }
        }
    }

    fillTextSet(doc1.body);
console.log(textSet);
    // Traverse doc2 and mark repeated text
    function traverseAndMark(node) {
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
            const text = node.nodeValue.trim();
console.log(text, textSet.has(text))
            if (textSet.has(text)) {
                const grayOutSpan = `<span style="color: gray; text-decoration: line-through;">${text}</span>`;
console.log(node.parentNode.innerHTML);
                node.parentNode.innerHTML = node.parentNode.innerHTML.replace(text, grayOutSpan);
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
Hash with DOM Tree Comparison
*/
