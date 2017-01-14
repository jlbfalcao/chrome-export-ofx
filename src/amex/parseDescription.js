export default function (description) {
    const tokens = description.split("\n");
    return {
        description: tokens[0].trim(),
        memo: tokens.length > 1 ? tokens[1].trim() : ''
    }
}