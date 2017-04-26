function sendJSON(method, url, data, sessionid) {
  return new Promise(function(resolve, reject) {
    var http = new XMLHttpRequest();
    http.open(method, url, true);
    http.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    if (sessionid) {
      http.setRequestHeader('Authorization', 'Bearer '+sessionid);
    }
    http.onreadystatechange = function() {
      if (Number(http.readyState) === 4 && Number(http.status) === 200) {
        //response
        var resData = (http.responseText);
        resolve(JSON.parse(resData));
      } else if (Number(http.status) < 200 || Number(http.status) >= 300) {
        reject(new Error(http.status+' data: '+data));
      }
    };
    if (typeof data === 'string' || data instanceof String) {
      http.send(data);
    } else if (!data) {
      http.send();
    } else {
      http.send(JSON.stringify(data));
    }
  });
}
function getJSON(url, sessionid) {
  return sendJSON('GET', url, null, sessionid);
}
function deleteJSON(url, sessionid) {
  return sendJSON('DELETE', url, null, sessionid);
}
