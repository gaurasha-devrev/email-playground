function myFunction(html1, html2) {
    const parser = new DOMParser();
    const doc1 = parser.parseFromString(html1, 'text/html');
    const doc2 = parser.parseFromString(html2, 'text/html');

    function traverse(node1, node2) {
        if (node1.nodeType === Node.TEXT_NODE && node1.nodeValue.trim() !== "") {
            const text = node1.nodeValue.trim();
            if (node2.innerText.includes(text)) {
                const grayOutSpan = `<span style="color: gray; text-decoration: line-through;">${text}</span>`;
                node2.innerHTML = node2.innerHTML.replace(text, grayOutSpan);
            }
        } else {
            for (let child of node1.childNodes) {
                traverse(child, node2);
            }
        }
    }

    traverse(doc1.body, doc2.body);
    return doc2.body.innerHTML;
}
/*

DOM Tree Comparison
Description: Utilize a recursive tree traversal to compare the DOM structures of both HTML documents. When identical nodes are found, mark them for de-emphasis.
*/