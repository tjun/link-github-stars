'use strict';

var reGithub = new RegExp('^https:\/\/github.com\/([^\/]+)/([^\/#]+)$');
var links = document.getElementsByTagName('a'); // get all links
$.each($('a'), function() {
    var url = this.href.toString();

    var res = reGithub.exec(url);
    if (res === null) { return; }
    var user = res[1];
    var repo = res[2];
    if (user === 'site' || user == 'settings' || user === 'organizations' || user === 'new') {
        // skip non repo urls
        return
    }

    console.log('user:' + user + ', repo:' + repo);
    var link = this;

    var apiURL = 'https://api.github.com/repos/' + user + '/' + repo;
    $.getJSON(apiURL, function(data) {
        link.after($('<span>', {
            'class': 'link-github-stars',
            text: '★' + data.stargazers_count,
        })[0]);
    });
})