export default function download(name, content) {
    var a = document.createElement("a");
    a.download = `${name}.ofx`;
    a.href = "data:application/x-ofx;charset=utf-8," + encodeURIComponent(content);
    a.click();
}
