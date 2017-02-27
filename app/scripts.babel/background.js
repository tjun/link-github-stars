'use strict';

chrome.runtime.onInstalled.addListener(details => {
    console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
    var url = tab.url;
    if (url !== undefined && changeinfo.status == 'complete') {

        console.log(tab);

        chrome.tabs.executeScript(tab.id, {
            file: 'scripts/contentscript.js'
        });
    }

});