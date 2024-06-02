function copyToClipboard(elementId) {
    var copyText = document.getElementById(elementId).dataset.link;
    navigator.clipboard.writeText(copyText).then(function() {
        alert("Copied to clipboard: " + copyText);
    }, function(err) {
        alert("Failed to copy text: " + err);
    });
}
