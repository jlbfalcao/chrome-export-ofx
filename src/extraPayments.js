export default function (description, pattern) {
    const match = description.match(pattern);
    if (match) {
        return parseInt(match[1]) - 1;
    } else {
        return 0;
    }
}
