function getAddress(field) {

    var headers = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.50', 'Content-Type': 'application/x-www-form-urlencoded' };

    var cache = getCache.call(field.url);

    if (cache != null) {
       return JSON.stringify({ url: cache, headers: headers });
    }

    var object = { url: field.url, headers: JSON.stringify(headers) };
    var res = get.call(object);

    var url = res.match(/hlsManifestUrl":"(.*m3u8)/);
    if (url == null || url.length != 2) {
        return '該直播已停止';
    }
    url = url[1].replaceAll('\\u0026','&');

    var field = { name: field.url, value: url, expire: "21600000" }
    setCache.call(field);

    return JSON.stringify({ url: url, headers: headers });

}
