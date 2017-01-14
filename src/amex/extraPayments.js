export default function (description) {
    const result = description.match(/PRESTACAO (\d+) DE (\d+)/);
    if (result) {
        return parseInt(result[1]) - 1;
    } else {
        return 0;
    }
}