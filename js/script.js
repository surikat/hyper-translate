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
			if(xhr.responseText!=""){
				var jsonResponseText = $.parseJSON(xhr.responseText);
				var jsonResponseStatus = '';
				$.each(jsonResponseText, function(name, val) {
					if(name=="ResponseStatus") {
						jsonResponseStatus = $.parseJSON(JSON.stringify(val));
						 $.each(jsonResponseStatus, function(name2, val2) {
							 if(name2=="Message"){
								 message = val2;
							 }
						 });
					}
				});
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
var setHash = function(k,v){
	var nh = getHash();
	var cv = $hashGet(k);
	if(cv!='')
		nh = nhref.replace(k+'='+cv,k+'='+v);
	else
		nh += '&'+k+'='+v;
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

var lang,catName,limit,pages,page,sorting,order,id;

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
			if(data[i]==catName){
				opt.attr('selected','selected');
			}
			catList.append(opt);
		}
		catList.change(function(){
			var val = $(this).val();
			var nhref = getHash();
			if($hashGet('name')!='')
				nhref = nhref.replace('name='+catName,'name='+val);
			else
				nhref += '&name='+val;
			window.location.hash = '#'+nhref;
		});
	});
	
};
var getStats = function(){
	messageService('getStats', [lang,catName], function(cat){
		if(cat.message_count)
			cat.message_count = cat.message_count;
		var updater,ttlines;
		updater = function(t){
			messageService('importCatalogue',[lang,catName,t],function(data){
				if(data.timeout){
					updater(data.timeout);
					$('.atline').html('importing from POT<br>line: '+data.timeout+'/'+ttlines+'<br>Please wait...');
				}
				else{
					$('.atline').hide();
					$('#update_cat').show();
					load();
				}
			});
		};
		
		$('#update_cat').off('click').click(function(){
			messageService('countPotLines',[catName],function(ttl){
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
			messageService('exportCatalogue',[lang,catName],function(){
				$('#body_w').css('opacity',1);
			});
		});
		
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

var load = function(){
	
	lang	= $hashGet('lang');
	catName	= $hashGet('name','messages');
	id		= $hashGet('id');
	limit	= 15;
	pages	= 1;
	page	= parseInt($hashGet('page',1));
	sorting	= $hashGet('sorting','asc');
	order	= $hashGet('order','msgid');
	
	NotificationObj.init();
	var showForLang = '#edit_table,#update_cat,#compile_cat,#cat_stats,#clean_obsolete,#pagination,#selected-lang';
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
		$(showForLang).hide();
		$('#flags').show();
	}
	var body = $('body');
	getCatalogues();
	if(lang){
		var msgs = {};
		messageService('getCountMessages',[lang,catName],function(total){
			pages = Math.ceil(total/limit);
			$('#pagination').pagination({
				pages: pages,
				currentPage: page,
				cssStyle: 'compact-theme',
				onPageClick: function(pageNumber, event){
					event.preventDefault();
					var nhref = getHash();
					if($hashGet('page')!='')
						nhref = nhref.replace('page='+page,'page='+pageNumber);
					else
						nhref += '&page='+pageNumber;
					window.location.hash = nhref;
				}
			});
		});

		var moveBy = function(num) {
			var moveTo = getCurrentMessage() + num;
			if(moveTo > msgs.length || moveTo < 0){
				var pageCallback;
				if(moveTo > msgs.length){
					if($('a.page-link.next').length){
						pageCallback = function(){
							$('a.page-link.next').click();
						};
					}
					else{
						pageCallback = function(){
							if($('a.page-link[href="#page-1"]').length){
								$('a.page-link[href="#page-1"]').click();
							}
							selectMessage(0);
						};
					}
				}
				else{
					if($('a.page-link.prev').length){
						pageCallback = function(){
							$('a.page-link.prev').click();
						};
					}
					else{
						pageCallback = function(){
							if($('a.page-link:last-child').length){
								$('a.page-link:last-child').click();
							}
							selectMessage(0);
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
			$('#msg_table').find('tbody tr.selected').removeClass('selected');
			var arr_index = $('#msg_table').find('tbody tr:eq(' +(index)+ ')').addClass('selected').data('index');
			fillEditBar(arr_index);
		};

		var getCurrentMessage = function() {
			return $('#msg_table tr.selected').prevAll().length;
		};
		
		var saving;
		var beforeBlur = function(){
			if ( !$('#msg_table tr.selected').length ) return;
			var $row = $('#msg_table tr:eq(' + getCurrentMessage() + ')');
			var msg = msgs[$row.data('index')];
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
			var msg2 = msgs[$row2.data("index")];
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

		// Fill the Edit Bar with the selected message
		var fillEditBar = function(index){
			var msg = msgs[index];
			editOpen(msg.id);
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
		getStats();
		
		$('#msg_table thead th').click(function() {
			var column_index = $(this).closest('thead').find('th').index(this);
			var direction = !!$(this).hasClass('sort-desc') || !$(this).hasClass('sort-asc');
			var nOrder = $(this).attr('class').split(' ')[0];
				if(pages==1){						
					$(this).siblings().andSelf().removeClass('sort-asc').removeClass('sort-desc');
					$(this).addClass(direction ? 'sort-asc' : 'sort-desc');
					$('#msg_table').tsort(column_index,direction);
				}
				else{
					var nhref = getHash();
					if($hashGet('order')!='')
						nhref = nhref.replace('order='+order,'order='+nOrder);
					else
						nhref += '&order='+nOrder;
					if($hashGet('sorting')!='')
						nhref = nhref.replace('sorting='+sorting,'sorting='+(direction?'asc':'desc'));
					else
						nhref += '&sorting='+(direction?'asc':'desc');
					window.location.hash = nhref;
				}
		});
		
		// Add toggle effect
		$('#edit_row .block h3 a.expand').click(function(){
			$(this).parents('.block').find('.data').toggle('fast');
		}).parents('.block').find('.data').toggle();
		
		// Add rollover effect to Side Bar
		$('body').on('mouseover', '#ref_head',function(){
			var left = $(this).offset().left;
			var top = $(this).offset().top + $(this).height();
			$('#ref_data').css({'left':left, 'top':top}).fadeIn('fast');
		}).on('mouseout', '#ref_head',function(){
			$('#ref_data').fadeOut();
		});
		$('body').on("mouseover", '#update_head',function(){
			var left = $(this).offset().left;
			var top = $(this).offset().top + $(this).height();
			$('#update_data').css({'left':left, 'top':top}).fadeIn('fast');
		}).on("mouseout",'#update_head', function(){
			$('#update_data').fadeOut();
		});
		$('body').on("mouseover", '#src_com_head',function(){
			var left = $(this).offset().left;
			var top = $(this).offset().top + $(this).height();
			$('#com_data').css({'left':left, 'top':top}).fadeIn('fast');
		}).on("mouseout", '#src_com_head',function(){
			$('#com_data').fadeOut();
		});
		
		$('#clean_obsolete').click(function(e){
			$('body').css('opacity',0.2);
			e.preventDefault();
			messageService('cleanObsolete',[lang,catName],function(){
				load();
			});
			return false;
		});
		
		$('#loading_indicator').show();
		messageService('getMessages',[lang,catName,page,order,sorting],function(d){
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
				$tbody.append(html).find('tr').each(function(i,e){
					$(e).data('index',i).bind('sync',sync);
				});
				$('tr',$tbody).click(function(){
					//selectMessage($(this).prevAll().length);
					setHash('id',$(this).attr('data-id'));
				});
			}
			if(id)
				selectMessage($('#edit_table tr[data-id="'+id+'"]').index());
		},function(){
			$('#loading_indicator').hide();
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
		
	}
	var countPotMessages = function(){
		messageService('countPotMessages',[],function(count){
			if(count)
				$('#counter').text(count);
		});
	};
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
	
	//var editBox = $('#edit_row');
	//var editOpen = function(){		
		//editBox.dialog('option','width',window.innerWidth-25);
		//editBox.dialog('option','height',window.innerHeight-5);
		//editBox.dialog('open');
	//};
	//editBox.dialog({
		//autoOpen: false,
		//modal: true,
		//open:function(){
		//},
		//resizable:true
    //});
	
	
	var editOpen = function(msg_id){
		id = msg_id;
		$('#edit_table').hide();
		$('#edit_row').show();
    };
	var editClose = function(){	
		$('#edit_row').hide();
		$('#edit_table').show();
    };
    
    
    $('body').show();
};

$(window).on('hashchange', function(){
	load();
});

load();