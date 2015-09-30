var local_names = {"aa":"Afaraf","ab":"Аҧсуа","ae":"Avesta","af":"Afrikaans","ak":"Akan","am":"አማርኛ","an":"Aragonés","ar":"‫العربية","as":"অসমীয়া","av":"авар мацӀ","ay":"Aymar aru","az":"Azərbaycan dili","ba":"башҡорт теле","be":"Беларуская","bg":"български език","bh":"भोजपुरी","bi":"Bislama","bm":"Bamanankan","bn":"বাংলা","bo":"བོད་ཡིག","br":"Brezhoneg","bs":"Bosanski jezik","ca":"Català","ce":"нохчийн мотт","ch":"Chamoru","co":"Corsu","cr":"ᓀᐦᐃᔭᐍᐏᐣ","cs":"Česky","cu":"Словѣньскъ","cv":"чӑваш чӗлхи","cy":"Cymraeg","da":"Dansk","de":"Deutsch","dv":"‫ދިވެހި","dz":"རྫོང་ཁ","ee":"Ɛʋɛgbɛ","el":"Ελληνικά","en":"English","eo":"Esperanto","es":"Español","et":"Eesti keel","eu":"Euskara","fa":"‫فارسی","ff":"Fulfulde","fi":"Suomen kieli","fj":"Vosa Vakaviti","fo":"Føroyskt","fr":"Français","fy":"Frysk","ga":"Gaeilge","gd":"Gàidhlig","gl":"Galego","gn":"Avañe'ẽ","gu":"ગુજરાતી","gv":"Ghaelg","ha":"‫هَوُسَ","he":"‫עברית","hi":"हिन्दी","ho":"Hiri Motu","hr":"Hrvatski","ht":"Kreyòl ayisyen","hu":"magyar","hy":"Հայերեն","hz":"Otjiherero","ia":"Interlingua","id":"Bahasa Indonesia","ie":"Interlingue","ig":"Igbo","ii":"ꆇꉙ","ik":"Iñupiaq","io":"Ido","is":"Íslenska","it":"Italiano","iu":"ᐃᓄᒃᑎᑐᑦ","ja":"日本語 (にほんご)","jv":"Basa Jawa","ka":"ქართული","kg":"KiKongo","ki":"Gĩkũyũ","kj":"Kuanyama","kk":"Қазақ тілі","kl":"Kalaallisut","km":"ភាសាខ្មែរ","kn":"ಕನ್ನಡ","ko":"한국어 (韓國語)","kr":"Kanuri","ks":"कश्मीरी","ku":"Kurdî","kv":"коми кыв","kw":"Kernewek","ky":"кыргыз тили","la":"Latine","lb":"Lëtzebuergesch","lg":"Luganda","li":"Limburgs","ln":"Lingála","lo":"ພາສາລາວ","lt":"Lietuvių kalba","lu":"kiluba","lv":"Latviešu valoda","mg":"Fiteny malagasy","mh":"Kajin M̧ajeļ","mi":"Te reo Māori","mk":"македонски јазик","ml":"മലയാളം","mn":"Монгол","mo":"лимба молдовеняскэ","mr":"मराठी","ms":"Bahasa Melayu","mt":"Malti","my":"ဗမာစာ","na":"Ekakairũ Naoero","nb":"Norsk bokmål","nd":"isiNdebele","ne":"नेपाली","ng":"Owambo","nl":"Nederlands","nn":"Norsk nynorsk","no":"Norsk","nr":"Ndébélé","nv":"Diné bizaad","ny":"ChiCheŵa","oc":"Occitan","oj":"ᐊᓂᔑᓈᐯᒧᐎᓐ","om":"Afaan Oromoo","or":"ଓଡ଼ିଆ","os":"Ирон æвзаг","pa":"ਪੰਜਾਬੀ","pi":"पािऴ","pl":"Polski","ps":"‫پښتو","pt":"Português","qu":"Runa Simi","rm":"Rumantsch grischun","rn":"kiRundi","ro":"Română","ru":"русский язык","rw":"Kinyarwanda","sa":"संस्कृतम्","sc":"sardu","sd":"सिन्धी","se":"Davvisámegiella","sg":"Yângâ tî sängö","si":"සිංහල","sk":"Slovenčina","sl":"Slovenščina","sm":"Gagana fa'a Samoa","sn":"chiShona","so":"Soomaaliga","sq":"Shqip","sr":"српски језик","ss":"SiSwati","st":"seSotho","su":"Basa Sunda","sv":"Svenska","sw":"Kiswahili","ta":"தமிழ்","te":"తెలుగు","tg":"тоҷикӣ","th":"ไทย","ti":"ትግርኛ","tk":"Türkmen","tl":"Tagalog","tn":"seTswana","to":"faka Tonga","tr":"Türkçe","ts":"xiTsonga","tt":"татарча","tw":"Twi","ty":"Reo Mā`ohi","ug":"Uyƣurqə","uk":"українська мова","ur":"‫اردو","uz":"O'zbek","ve":"tshiVenḓa","vi":"Tiếng Việt","vo":"Volapük","wa":"Walon","wo":"Wollof","xh":"isiXhosa","yi":"‫ייִדיש","yo":"Yorùbá","za":"Saɯ cueŋƅ","zh":"中文, 汉语, 漢語","zu":"isiZulu"};
var escape = function(str) {
	if(str)
		return str.replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
};
var nl2br = function(str) {
	if(str)
		return str.replace("\n",'<br />');
};
var messageService = function(method,params,callback,complete) {
	var url = 'RPC.php?method='+method;
	$.ajax({
		url:url,
		type:'POST',
		data:{
			"params":params
		},
		success: function(obj){
			if(obj.error){
				NotificationObj.showError(obj.error.message + "	" + method);
			}
			else{
				callback(obj.result);
			}
		},
		error: function(xhr, status, error){
			var message = 'Ajax error on url "RPC.php?method='+method+'"<br>';
			if(error)
				message += 'Error: '+error+'<br>';
			if(xhr.status==401){
				window.location.reload(true);
			}
			else{
				if(xhr.status!=200)
					message += 'HTTP '+xhr.status+'<br>';
				message += xhr.responseText;
			}
			NotificationObj.showError(message);
		},
		complete:function(){
			if(typeof(complete)=='function')
				complete();
		},
		dataType: 'json'
	});		 
};
var NotificationObj = {
	init: function(){
		$('#errors #hideBtn').click(this.hideError);
		$('#messages #hideBtn').click(this.hideMessage);
	},
	hideAll: function(){
		this.hideError();
		this.hideMessage();
	},
	showError: function(msg){
		$('<span />').html("<br />" + msg).appendTo('#errors p');
		$('#errors').fadeIn();
		$('#next').hide();
		$('#prev').hide();
	},
	hideError: function(){
		$('#errors').fadeOut();
	},
	showMessage: function(msg){
		$('#messages').stop().css({opacity:0});
		$('#messages span').text(msg);
		$('#messages').animate({opacity:1},300, function(){ $('#messages').animate({opacity:0}, 3000); });
	},
	hideMessage: function(){
		$('#messages').css({opacity:0});
	}
};

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
var messagesLoadCallback;
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

var lang,pages,page,sorting,order;

// Get the stored catalogues
var getCatalogues = function(){
	 messageService('getCatalogues', [lang], function(data){
		if(data.length==0){
			NotificationObj.showError("No PO Catalalogues Found.");
			return;
		}
		var catList = $('#catalogue_list');
		catList.empty();
		for (var i=0;i<data.length;++i){
			var opt = $("<option />");
			opt.attr('data-name',data[i]).text(data[i]);
			if(data[i]==$hashGet('name','messages')){
				opt.attr('selected','selected');
			}
			catList.append(opt);
		}
		catList.change(function(){
			setHash('name',$(this).val());
		});
	});
	
};
var getStats = function(){
	messageService('getStats', [lang,$hashGet('name','messages')], function(cat){
		if(cat.message_count)
			cat.message_count = cat.message_count;
		var pbw = $('.progressbar').width()	* ( cat.translated_count / (cat.message_count));
		if(pbw)
			pbw += 1;
		$('.progressbar .inner').css( 'width',pbw);
		
		$('.translated').text(cat.translated_count?cat.translated_count:0);
		$('.total').text(cat.message_count?cat.message_count:0);
		var percent = (cat.message_count&&cat.translated_count?parseInt(cat.translated_count / (cat.message_count) *100):'0') + " %";
		$('.percent').text(percent);
	});
};
var showForTable = '#edit_table,#nav';
var showForRow = '#edit_row,#nav_row';
var editOpen = function(){
	$(showForTable).hide();
	$(showForRow).show();
};
var editClose = function(){	
	$(showForRow).hide();
	$(showForTable).show();
};
var countPotMessages = function(){
	messageService('countPotMessages',[],function(count){
		if(count)
			$('#counter').text(count);
	});
};
var moveBy = function(num){
	var moveTo = getCurrentMessage() + num;
	if(moveTo > msgs.length-1 || moveTo < 0){
		var pageCallback;
		if(moveTo > msgs.length-1){
			messagesLoadCallback = function(){
				selectMessage(0);
			};
			if($('a.page-link.next').length){
				pageCallback = function(){
					setHash('page',parseInt($hashGet('page','0'))+1);
				};
			}
			else{
				pageCallback = function(){
					setHash('page',1);
				};
			}
		}
		else{
			messagesLoadCallback = function(){
				selectMessage($('#msg_table tbody tr').length-1);
			};
			if($('a.page-link.prev').length){
				pageCallback = function(){
					setHash('page',parseInt($hashGet('page'))-1);
				};
			}
			else{
				pageCallback = function(){
					setHash('page',$('a.page-link:eq('+($('a.page-link').length-2)+')').text());
				};
			}
		}
		if(saving){
			var timeoutCallback = function(){
				setTimeout(function(){
					if(saving){
						timeoutCallback();
					}
					else{
						pageCallback();
					}			
				},1000);
			};
			timeoutCallback();
		}
		else{
			pageCallback();
		}
	}
	else{
		moveTo >= 0 && selectMessage(moveTo);
	}
};

var selectMessage = function(index){
	$('#msg_table tbody tr.selected').removeClass('selected');
	$('#msg_table tbody tr:eq(' +(index)+ ')').addClass('selected');
	editOpen();
	fillEditBar(index);
};

var getCurrentMessage = function(){
	return $('#msg_table tr.selected').index();
};

var ttlines;
var updater = function(t){
	messageService('importCatalogue',[lang,$hashGet('name','messages'),t],function(data){
		if(data.timeout){
			updater(data.timeout);
			$('.atline').html('importing from POT<br>line: '+data.timeout+'/'+ttlines+'<br>Please wait...');
		}
		else{
			$('.atline').hide();
			$('#update_cat').show();
			load();
			$('#body_w').css('opacity',1);
		}
	});
};

var saving;
var beforeBlur = function(){
	if ( !$('#msg_table tr.selected').length ) return;
	var $row = $('#msg_table tr:eq(' + (getCurrentMessage()+1) + ')');
	var msg = msgs[$row.index()];
	var dirty = msg && ( $('#msgstr').val() != msg.msgstr || $('#comments').val() != msg.comments || $('#fuzz').prop('checked') != msg.fuzzy || $('#notr').prop('checked') != msg.noTranslate );
	if (dirty) {
		saving = true;
		msg.msgstr = $('#msgstr').val().replace(/\n+$/,'');
		msg.fuzzy = $('#fuzz').prop('checked');
		msg.noTranslate = $('#notr').prop('checked');
		msg.comments = $('#comments').val();
		$row.trigger('sync');
		messageService('updateMessage', [msg.id, msg.comments, msg.msgstr, msg.fuzzy, msg.noTranslate],function(){
			saving = false;
			getStats();
		});
	}
};

var sync = function () {
	var $row2 = $(this);
	var msg2 = msgs[$row2.index()];
	$row2.find('td.msgid div').text(msg2.msgid).end().find('td.msgstr div').text(msg2.msgstr);
	msg2.msgstr == "" ? $row2.addClass('empty') : $row2.removeClass('empty');
	msg2.fuzzy == 1 ? $row2.addClass('f').find('.fuzzy').text('F') : $row2.removeClass('f').find('.fuzzy').text('');
	msg2.noTranslate == 1 ? $row2.addClass('n').find('.notr').text('N') : $row2.removeClass('n').find('.notr').text('');
	msg2.isObsolete && $row2.addClass('d').find('.depr').text('D');
};
var renderRowAsString = function(obj) {
	var tr_class = "" 
		+ (!obj.msgstr.length ? 'empty ' : '')
		+ (obj.fuzzy == 1 ? 'f ' : '')
		+ (obj.noTranslate == 1 ? 'n ' : '')
		+ (obj.isObsolete ? 'd ' : ''); 
	return	''
		+ '<tr class="' + tr_class + '" data-id="'+obj.id+'">'
		+ '<td class="msgid"><div><span>'
		+ escape(obj.msgid) + '</span></div></td>'
		+ '<td class="msgstr"><div>'
		+ (obj.msgstr?escape(obj.msgstr):'') + '</div></td>'
		+ '<td class="fuzzy">'
		+ (obj.fuzzy == 1 ? 'F' : '')
		+ '</td>'
		+ '<td class="notr">'
		+ (obj.noTranslate == 1 ? 'N' : '')
		+ '</td>'
		+ '<td class="depr">'
		+ (obj.isObsolete ? 'D' : '')
		+ '</td>';
}
var msgs;
// Fill the Edit Bar with the selected message
var fillEditBar = function(index){
	var msg = msgs[index];
	if(!msg){
		console.log(msgs);
		console.log(index);
		return;
	}
	$('#ref_data').html( nl2br(escape(msg.reference)) || '-' );
	$('#com_data').html( nl2br(escape(msg.extractedComments)) || '-' );
	$('#update_data').html( msg.updatedAt || '-' );
	$('#comments').val(msg.comments);
	$('#msgid').html( nl2br(escape(msg.msgid)) || "-" );
	$('#msgstr').val(msg.msgstr?msg.msgstr:'');
	( msg.fuzzy == 1 ) ? $('#fuzz').prop('checked',true) : $('#fuzz').prop('checked',false);
	( msg.noTranslate == 1 ) ? $('#notr').prop('checked',true) : $('#notr').prop('checked',false);
	$('#edit_id').attr( 'value', msg.id );
};
var init = function(){
	countPotMessages();
	$('#makepot').click(function(e){
		e.preventDefault();
		$('body').css('opacity',0.2);
		messageService('makePot',[],function(){
			countPotMessages();
			$('body').css('opacity',1);
		});
		return false;
	});
	NotificationObj.init();
	$('#return_table').click(function(){
		editClose();
	});
	
	$('#msg_table thead th').click(function() {
		var direction = !!$(this).hasClass('sort-desc')||!$(this).hasClass('sort-asc');
		var nOrder = $(this).attr('class').split(' ')[0];
		$(this).siblings().andSelf().removeClass('sort-asc sort-desc');
		$(this).addClass(direction ? 'sort-asc' : 'sort-desc');
		setHash({
			'order':nOrder,
			'sorting':direction?'asc':'desc',
			'page':false,
		});
	});
	
	// Add toggle effect
	$('#edit_row .block h3 a.expand').click(function(){
		$(this).parents('.block').find('.data').toggle('fast');
	}).parents('.block').find('.data').toggle();
	
	// Add rollover effect to Side Bar
	$('body').on('mouseover', '#ref_head',function(){
		var left = $(this).offset().left;
		var top = $(this).offset().top + $(this).height() +5;
		$('#ref_data').css({'left':left, 'top':top}).fadeIn('fast');
	}).on('mouseout', '#ref_head',function(){
		$('#ref_data').fadeOut();
	});
	$('body').on("mouseover", '#update_head',function(){
		var left = $(this).offset().left;
		var top = $(this).offset().top + $(this).height() +5;
		$('#update_data').css({'left':left, 'top':top}).fadeIn('fast');
	}).on("mouseout",'#update_head', function(){
		$('#update_data').fadeOut();
	});
	$('body').on("mouseover", '#src_com_head',function(){
		var left = $(this).offset().left;
		var top = $(this).offset().top + $(this).height() +5;
		$('#com_data').css({'left':left, 'top':top}).fadeIn('fast');
	}).on("mouseout", '#src_com_head',function(){
		$('#com_data').fadeOut();
	});
	
	$('#clean_obsolete').click(function(e){
		$('body').css('opacity',0.2);
		e.preventDefault();
		messageService('cleanObsolete',[lang,$hashGet('name','messages')],function(){
			load();
		});
		return false;
	});
	
	$('#update_cat').off('click').click(function(){
		messageService('countPotLines',[$hashGet('name','messages')],function(ttl){
			ttlines = ttl;
			$('#body_w').css('opacity',0.2);
			$('.atline')
				.width($(this).width())
				.height($(this).height())
				.html('importing from POT<br>line: 0/'+ttlines+'<br>Please wait...')
				.show()
			;
			updater();
		});
	});
	$('#compile_cat').off('click').click(function(){
		$('#body_w').css('opacity',0.2);
		messageService('exportCatalogue',[lang,$hashGet('name','messages')],function(){
			$('#body_w').css('opacity',1);
		});
	});
	
	$('#next').click(function(e){
		e.preventDefault();
		moveBy(1);
		$('#msgstr').focus();
	});
	$('#prev').click(function(e){
		e.preventDefault();
		moveBy(-1);
		$('#msgstr').focus();
	});
	$('#fuzz').click(function(){
		beforeBlur();
	});
	$('#notr').click(function(){
		beforeBlur();
	});
	$('#msgstr').blur(function(e){
		beforeBlur();
	});
	$(document).keydown(function(e){
		var nt = e.target.type,code;
		if( !(nt == 'input' || nt == 'textarea') ) {
			code = e.which || e.keyCode;
			switch(e.which || e.keyCode) {
				case 37:
				case 38:
					moveBy(-1);
					e.preventDefault();
				break;
				case 39:
				case 40:
					moveBy(1);
					e.preventDefault();
				break;
			}
		}
	});
	$('#msg_table thead th.'+order).addClass('sort-'+sorting);
	
	$('body').show();
};
var showForLang = '#edit_table,#update_cat,#compile_cat,#cat_stats,#clean_obsolete,#pagination,#selected-lang';
var load = function(){
	
	lang	= $hashGet('lang');
	pages	= 1;
	page	= parseInt($hashGet('page',1));
	sorting	= $hashGet('sorting','asc');
	order	= $hashGet('order','msgid');	
	
	if(lang){
		$('#selected-lang').html('<img width="16" height="16" src="img/langs/'+lang+'.png" /> '+local_names[lang]);
		var title = $('title');
		var originTitle = title.data('title');
		if(!originTitle){
			originTitle = title.text();
			title.data('title',originTitle);
		}
		title.text(originTitle+' - '+local_names[lang]);
		$('link[rel=icon]').attr('href','img/langs/'+lang+'.png');
		$(showForLang).show();
		$('#flags').hide();
	}
	else{
		$('#nav_row,#edit_row').hide();
		$(showForLang).hide();
		$('#flags').show();
	}
	getCatalogues();
	if(lang){
		messageService('getCountMessages',[lang,$hashGet('name','messages')],function(total){
			pages = Math.ceil(total/parseInt($hashGet('limit','15')));
			$('#pagination').pagination({
				pages: pages,
				currentPage: page,
				cssStyle: 'compact-theme',
				onPageClick: function(pageNumber, event){
					event.preventDefault();
					setHash('page',pageNumber);
				}
			});
		});
		getStats();
		$('#loading_indicator').show();
		messageService('getMessages',[lang,$hashGet('name','messages'),page,order,sorting],function(d){
			msgs = []; // save data to global messages
			for(var k in d){
				msgs.push(d[k]);
			}
			var $tbody = $('#msg_table tbody');
			$tbody.empty();
			if (msgs&&msgs.length){
				var html="";
				$.each(msgs,function(i,e){
					html += renderRowAsString(e);
				})
				$tbody.append(html).find('tr')
					.on('sync',sync)
					.click(function(){
						selectMessage($(this).index());
					});
			}
			editClose();
			if(messagesLoadCallback){
				messagesLoadCallback();
				messagesLoadCallback = null;
			}
		},function(){
			$('#loading_indicator').hide();
		});
	}
};

init();

$(window).on('hashchange', function(){
	load();
});

load();