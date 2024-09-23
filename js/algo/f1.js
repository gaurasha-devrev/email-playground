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
