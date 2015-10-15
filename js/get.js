var urlVars = [], hash;
var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
var y = 0;
for(var i = 0; i < hashes.length; i++){
	hash = hashes[i].split('=');
	if(hash.length){
		urlVars[hash[0]] = hash[1];
	}
	else{
		urlVars[y] = hashes[i];
		y++;
	}
}
$get = function(k,def){
	return typeof(urlVars[k])!='undefined'&&urlVars[k]!=''?urlVars[k]:(typeof(def)!='undefined'?def:'');
};