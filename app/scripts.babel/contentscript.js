'use strict';

(function() {
    console.log('content script start');

    var reGithub = new RegExp('^https:\/\/github.com\/([^\/]+)/([^\/#]+)$');
    var links = document.getElementsByTagName('a'); // get all link

    for (var i = 0; i < links.length; i++) {
        var url = links[i].href.toString();

        var res = reGithub.exec(url);
        if (res === null) {
            continue;
        }

        var user = res[1];
        var repo = res[2];
        if (user === 'site' || user == 'settings' || user === 'organizations' || user === 'new' || user === 'trending') {
            // skip non repo urls
            continue;
        }

        console.log('user:' + user + ', repo:' + repo);
        var link = links[i];

        var apiURL = 'https://api.github.com/repos/' + user + '/' + repo;

        var req = new XMLHttpRequest();
        req.onreadystatechange = (function(el) {
            return function() {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.response) {

                        var data = this.response;

                        var span = document.createElement('span');
                        span.className = 'ex-link-github-stars';
                        span.textContent = '★' + data.stargazers_count;

                        var tmp = document.createElement('div');
                        tmp.appendChild(span);
                        var spanstr = tmp.innerHTML;

                        el.insertAdjacentHTML('afterend', spanstr);
                    }
                }
            }
        })(link);

        req.open('GET', apiURL, true);
        req.responseType = 'json';
        req.send(null);

    }
})();