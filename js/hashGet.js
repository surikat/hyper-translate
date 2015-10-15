var getHash = function(){
	var hash = window.location.hash;
	if(hash.substr(0,1)=='#')
		hash = hash.substr(1);
	return hash;
};
var replaceHash = function(k,v,nh){
	var cv = $hashGet(k);
	if(cv!='')
		nh = nh.replace(k+'='+cv,v!==false?k+'='+v:'');
	else if(v!==false)
		nh += '&'+k+'='+v;
	if(nh.substr(-1)=='&')
		nh = nh.substr(0,nh.length-1);
	return nh;
};
var setHash = function(k,v){
	var nh = getHash();
	if(typeof(k)=='object'){
		for(var key in k){
			nh = replaceHash(key,k[key],nh);
		}
	}
	else{
		nh = replaceHash(k,v,nh);
	}
	window.location.hash = '#'+nh;
};
var $hashGet = function(k,def){
	var urlVars = [],hash;
	var hashes = getHash().split('&');
	var y = 0;
	for(var i=0;i<hashes.length;i++){
		hash = hashes[i].split('=');
		if(hash.length){
			urlVars[hash[0]] = hash[1];
		}
		else{
			urlVars[y] = hashes[i];
			y++;
		}
	}
	return typeof(urlVars[k])!='undefined'&&urlVars[k]!=''?urlVars[k]:(typeof(def)!='undefined'?def:'');
};
