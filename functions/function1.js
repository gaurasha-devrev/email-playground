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


/*
The algorithm processes two HTML email strings by first parsing them into DOM structures to extract their textual content. It splits the text from both emails into individual lines and utilizes a Set to store the unique lines from the first email for efficient lookup. For each line in the second email, the algorithm checks if it exists in the set of lines from the first email. If a match is found, it replaces the line in the second email's HTML with a version wrapped in a <span> element, applying styles to gray it out and add a line-through effect, visually indicating redundancy. The final output is a modified HTML string where repeated content from the original email thread is visually de-emphasized.

*/