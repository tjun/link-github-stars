'use strict';

chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
    var url = tab.url;
    if (url !== undefined && changeinfo.status == 'complete') {

        chrome.tabs.executeScript(tab.id, {
            file: 'scripts/contentscript.js'
        }, function(res) {
            chrome.tabs.insertCSS(tab.id, {
                file: 'styles/main.css'
            });
        })
    }
});