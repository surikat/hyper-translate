var context = {
	lang:null,
	page:1,
	order:'id',
	sorting:'asc',
	name:'messages',
	limit:300,
};
var local_names;
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
			$('#body_w').css('opacity',1);
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

var messagesLoadCallback;
var pages = 1;
var getCatalogues = function(){
	 messageService('getCatalogues', [context.lang], function(data){
		if(data.length==0){
			NotificationObj.showError("No PO Catalalogues Found.");
			return;
		}
		var catList = $('#catalogue_list');
		catList.empty();
		for (var i=0;i<data.length;++i){
			var opt = $("<option />");
			opt.attr('data-name',data[i]).text(data[i]);
			if(data[i]==context.name){
				opt.attr('selected','selected');
			}
			catList.append(opt);
		}
		catList.change(function(){
			context.name = $(this).val();
			getStats();
			loadMessages();
		});
	});
	
};
var getStats = function(){
	messageService('getStats', [context.lang,context.name], function(cat){
		if(!cat)
			return;
		if(cat.message_count)
			cat.message_count = cat.message_count;
		var owidth = $('.progressbar').data('width');
		if(!owidth){
			owidth = $('.progressbar').width();
			$('.progressbar').data('width',owidth);
		}
		var pbw = owidth	* ( cat.translated_count / (cat.message_count));
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
	$(showForTable).css('visibility','hidden');
	$(showForRow).show();
};
var editClose = function(){	
	$(showForRow).hide();
	$(showForTable).css('visibility','visible');
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
					context.page = context.page+1;
					$('a.page-link.next').click();
				};
			}
			else{
				pageCallback = function(){
					context.page = 1;
					$('a.page-link[href="#page-1"]').click();
				};
			}
		}
		else{
			messagesLoadCallback = function(){
				selectMessage($('#msg_table tbody tr').length-1);
			};
			if($('a.page-link.prev').length){
				pageCallback = function(){
					context.page = context.page-1;
					$('a.page-link.prev').click();
				};
			}
			else{
				pageCallback = function(){
					var lastp = $('a.page-link:eq('+($('a.page-link').length-2)+')');
					context.page = parseInt(lastp.text());
					lastp.click();
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
	messageService('importCatalogue',[context.lang,context.name,t],function(data){
		if(data.timeout){
			updater(data.timeout);
			$('.atline').html('importing from POT<br>line: '+data.timeout+'/'+ttlines+'<br>Please wait...');
		}
		else{
			$('.atline').hide();
			$('#update_cat').show();
			loadMessages();
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
		+ '<td class="id"><div><span>'
		+ escape(obj.id) + '</span></div></td>'
		+ '<td class="reference"><div><span>'
		+ escape(obj.reference)+':'+obj.refint + '</span></div></td>'
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

var loadPagination = function(){
	messageService('getCountMessages',[context.lang,context.name],function(total){
		pages = Math.ceil(total/context.limit);
		$('#pagination').pagination({
			pages: pages,
			currentPage: context.page,
			cssStyle: 'compact-theme',
			onPageClick: function(pageNumber, event){
				event.preventDefault();
				context.page = pageNumber;
				getMessages();
			}
		});
	});
};

var msgs;
var fillEditBar = function(index){
	var msg = msgs[index];
	if(!msg) return;
	$('#ref_data').html( nl2br(escape(msg.reference))+':'+msg.refint );
	$('#comments').html( nl2br(escape(msg.extractedComments)));
	$('#update_data').html('- '+msg.updatedAt );
	$('#msgid').html(nl2br(escape(msg.msgid)));
	$('#msgstr').val(msg.msgstr?msg.msgstr:'');
	$('#fuzz').prop('checked',msg.fuzzy == 1);
	$('#notr').prop('checked',msg.noTranslate == 1);
	$('#depr').prop('checked',msg.isObsolete == 1);
	$('#row_id').html('- id '+msg.id);
	$('#row_reference').html(msg.id);
};

var selectLanguage = function(lang){
	context.lang = lang;
	var img,name;
	if(typeof(local_names[lang])!='undefined'){
		img = 'langs/'+lang;
		name = local_names[lang];
	}
	else{
		img = 'favicon';
		name = lang;
	}
	$('#selected-lang').html('<img width="16" height="16" src="img/'+img+'.png" /> '+name);
	var title = $('title');
	var originTitle = title.data('title');
	if(!originTitle){
		originTitle = title.text();
		title.data('title',originTitle);
	}
	title.text(originTitle+' - '+local_names[lang]);
	$('link[rel=icon]').attr('href','img/'+img+'.png');
	$(showForLang).show();
	$('#flags').hide();
	loadMessages();
	document.location.hash = lang;
};

var unSelectLanguage = function(){
	$('#nav_row,#edit_row').hide();
	$(showForLang).hide();
	$('#flags').show();
	document.location.hash = '';
};

var getMessages = function(){
	messageService('getMessages',[context.lang,context.name,context.page,context.order,context.sorting,context.limit],function(d){
		msgs = [];
		for(var k in d){
			msgs.push(d[k]);
		}
		var tbody = $('#msg_table tbody');
		tbody.empty();
		if (msgs&&msgs.length){
			var html="";
			$.each(msgs,function(i,e){
				html += renderRowAsString(e);
			});
			tbody.append(html).find('tr')
				.off('sync')
				.off('click')
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
		$('body').css('opacity',1);
	});
};
var showForLang = '#edit_table,#update_cat,#compile_cat,#cat_stats,#clean_obsolete,#pagination,#selected-lang';

var loadMessages = function(){
	getStats();
	getMessages();
	loadPagination();
};

var init = function(){
	countPotMessages();
	getCatalogues();
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
		context.order = nOrder;
		context.sorting = direction?'asc':'desc';
		context.page = 1;
		loadMessages();
	});
	
	$('#clean_obsolete').click(function(e){
		e.preventDefault();
		$('body').css('opacity',0.2);
		messageService('cleanObsolete',[context.lang,context.name],function(){
			loadMessages();
		});
		return false;
	});
	
	$('#update_cat').off('click').click(function(){
		messageService('countPotLines',[context.name],function(ttl){
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
		messageService('exportCatalogue',[context.lang,context.name],function(){
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
	$('#msg_table thead th.'+context.order).addClass('sort-'+context.sorting);
	
	var langsJson = $.getJSON('langs.json');
	var langsEnJson = $.getJSON('langs.en.json');
	var langsFrJson = $.getJSON('langs.fr.json');

	$.when(langsJson, langsEnJson,langsFrJson).done(function(langsQ,langsEnQ,langsFrQ){
		var langs = langsQ[0];
		var langsEn = langsEnQ[0];
		var langsFr = langsFrQ[0];
		local_names = langs;
		var lastc;
		var currentc;
		for(var k in langs){
			lastc = k.substr(0,1);
			if(lastc!=currentc){
				currentc = lastc;
				$('#flags tbody').append('<tr class="alphabetical"><td></td><td></td><td style="font-weight:bold;">'+currentc+'</td><td></td></tr>');
			}
			$('#flags').append('<tr data-lang="'+k+'"><td><img width="16" height="16" src="img/langs/'+k+'.png"></td><td>'+k+'</td><td>'+langs[k]+'</td><td>'+langsEn[k]+'</td><td>'+langsFr[k]+'</td></tr>');
		}
		$('#flags tr[data-lang]').click(function(){
			selectLanguage($(this).attr('data-lang'));
		});
		var h = document.location.hash;
		if(h.substr(0,1)=='#')
			h = h.substr(1);
		if(h){
			selectLanguage(h);
		}
	});
	
	$('#selected-lang').click(function(){
		unSelectLanguage();
	});
	
	$('.custom-limit form input[name=limit]').val(context.limit);
	$('.custom-limit form').submit(function(e){
		e.preventDefault();
		context.limit = $(this).find('input[name=limit]').val();
		loadMessages();
		return false;
	});
	
	$('form.custom-locale').submit(function(e){
		e.preventDefault();
		selectLanguage($(this).find('input#lang').val());
		return false;
	});
	
};

init();