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

// Example usage
const A = '&gt; wrote:';
const B = '<span style="color: gray; text-decoration: line-through;">&gt; wrote: </span>';
const C = 'On Tue, Sep 17, 2024 at 2:17 PM &lt;<a href="mailto:devspintly@qatesting.xyz" target="_blank"><span style="color: gray; text-decoration: line-through;">devspintly@qatesting.xyz</span></a>&gt; wrote:<br>';

const result = replaceOccurrences(A, B, C);
console.log(result);
