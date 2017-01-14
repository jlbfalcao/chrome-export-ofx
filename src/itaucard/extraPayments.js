export default function (description) {
    const match = description.match(/(\d+)\/(\d+)/);
    if (match) {
        return parseInt(match[1]) - 1;
    } else {
        return 0;
    }
}
