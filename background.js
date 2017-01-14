chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.sendMessage(tab.id, {
        action: 'export',
        url: tab.url
    });
});
