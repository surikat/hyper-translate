<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>HyperTranslate</title>
		<link href="css/simple-pagination.css" rel="stylesheet" type="text/css" />
		<!--
			<link href="css/style.css" rel="stylesheet" type="text/css" media="screen" />
		-->
		<link href="img/favicon.png" rel="icon" type="image/x-icon" />
	</head>
	<body>
		<div id="body_w">
			<div id="nav">
				<select id="catalogue_list"></select>
				<button id="makepot">MakePOT</button>
				<span id="counter-wrap"><span id="counter">?</span> messages</span>
				<a href="#" id="selected-lang"></a>
				<button id="update_cat" class="action">ImportPOT</button>
				<div id="cat_stats">
					<div class="progressbar">
						<div class="inner"> </div>
						<div class="stats"><span class="percent"></span> - <span class="translated" ></span> of <span class="total"></span></div>
					</div>
				</div>
				<button id="clean_obsolete">Clean</button>
				<button id="compile_cat" class="action">Compile</button>
			</div>
			<div id="edit_table">
				<div id="message_container">
					<table id="msg_table" cellspacing="0">
						<thead>
							<tr>
								<th class="msgid">
									<div><img src="img/blank.gif"/>Original String</div>
								</th>
								<th class="msgstr"><img src="img/blank.gif"/>Translation</th>
								<th class="fuzzy" title="Fuzzy"><img src="img/blank.gif"/>F</th>
								<th class="notr" title="No Translate"><img src="img/blank.gif"/>N</th>
								<th class="depr" title="Deprecated"><img src="img/blank.gif"/>D</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
					<div id="loading_indicator"><img src='img/loading.gif' /></div>
				</div>
				<div id="pagination"></div>
			</div>
			<div id="edit_row">
				<div class="block">
					<table id="edit_row_table"><thead><tr>
					<th id="ref_head">Reference</th>
					<th id="update_head">Updated on</th>
					<th id="src_com_head">Source comments</th></tr></thead>
					</table>
				</div>
				<div class="block">
					<h3 id="orig_str_head">Original String (msgid)</h3>
					<div id="msgid" class="data">-</div>
				</div>
				<div class="block">
					<h3 id="orig_str_head">Translation (msgstr)</h3>
					<textarea id="msgstr" class="data" spellcheck="false"></textarea>
				</div>
				<div class="block" id="cntrl_blk">
					<input type="submit" id="prev" name="prev" value="&laquo; Previous Message" />
					<input type="submit" id="next" name="next" value="Next Message &raquo;" />
					<fieldset>
						<label for="fuzz">Mark as Fuzzy</label> <input type="checkbox" id="fuzz" name="fuzz" /> 
					</fieldset>
					<fieldset>
						<label for="notr">No Translation</label> <input type="checkbox" id="notr" name="notr" /> 
					</fieldset>
				</div>
				<div class="block">
					<h3 id="trans_com_head">Translation Comments</h3>
					<textarea id="comments" class="data" spellcheck="false"></textarea>
				</div>
			</div>
			<div id="ref_data"></div>
			<div id="update_data"></div>
			<div id="com_data"></div>
			
			<div id="flags">
				<a data-lang="aa" href="#lang=aa"><img width="16" height="16" src="img/langs/aa.png"> Afaraf</a><a data-lang="ab" href="#lang=ab"><img width="16" height="16" src="img/langs/ab.png"> Аҧсуа</a><a data-lang="ae" href="#lang=ae"><img width="16" height="16" src="img/langs/ae.png"> Avesta</a><a data-lang="af" href="#lang=af"><img width="16" height="16" src="img/langs/af.png"> Afrikaans</a><a data-lang="ak" href="#lang=ak"><img width="16" height="16" src="img/langs/ak.png"> Akan</a><a data-lang="am" href="#lang=am"><img width="16" height="16" src="img/langs/am.png"> አማርኛ</a><a data-lang="an" href="#lang=an"><img width="16" height="16" src="img/langs/an.png"> Aragonés</a><a data-lang="ar" href="#lang=ar"><img width="16" height="16" src="img/langs/ar.png"> ‫العربية</a><a data-lang="as" href="#lang=as"><img width="16" height="16" src="img/langs/as.png"> অসমীয়া</a><a data-lang="av" href="#lang=av"><img width="16" height="16" src="img/langs/av.png"> авар мацӀ</a><a data-lang="ay" href="#lang=ay"><img width="16" height="16" src="img/langs/ay.png"> Aymar aru</a><a data-lang="az" href="#lang=az"><img width="16" height="16" src="img/langs/az.png"> Azərbaycan dili</a><a data-lang="ba" href="#lang=ba"><img width="16" height="16" src="img/langs/ba.png"> башҡорт теле</a><a data-lang="be" href="#lang=be"><img width="16" height="16" src="img/langs/be.png"> Беларуская</a><a data-lang="bg" href="#lang=bg"><img width="16" height="16" src="img/langs/bg.png"> български език</a><a data-lang="bh" href="#lang=bh"><img width="16" height="16" src="img/langs/bh.png"> भोजपुरी</a><a data-lang="bi" href="#lang=bi"><img width="16" height="16" src="img/langs/bi.png"> Bislama</a><a data-lang="bm" href="#lang=bm"><img width="16" height="16" src="img/langs/bm.png"> Bamanankan</a><a data-lang="bn" href="#lang=bn"><img width="16" height="16" src="img/langs/bn.png"> বাংলা</a><a data-lang="bo" href="#lang=bo"><img width="16" height="16" src="img/langs/bo.png"> བོད་ཡིག</a><a data-lang="br" href="#lang=br"><img width="16" height="16" src="img/langs/br.png"> Brezhoneg</a><a data-lang="bs" href="#lang=bs"><img width="16" height="16" src="img/langs/bs.png"> Bosanski jezik</a><a data-lang="ca" href="#lang=ca"><img width="16" height="16" src="img/langs/ca.png"> Català</a><a data-lang="ce" href="#lang=ce"><img width="16" height="16" src="img/langs/ce.png"> нохчийн мотт</a><a data-lang="ch" href="#lang=ch"><img width="16" height="16" src="img/langs/ch.png"> Chamoru</a><a data-lang="co" href="#lang=co"><img width="16" height="16" src="img/langs/co.png"> Corsu</a><a data-lang="cr" href="#lang=cr"><img width="16" height="16" src="img/langs/cr.png"> ᓀᐦᐃᔭᐍᐏᐣ</a><a data-lang="cs" href="#lang=cs"><img width="16" height="16" src="img/langs/cs.png"> Česky</a><a data-lang="cu" href="#lang=cu"><img width="16" height="16" src="img/langs/cu.png"> Словѣньскъ</a><a data-lang="cv" href="#lang=cv"><img width="16" height="16" src="img/langs/cv.png"> чӑваш чӗлхи</a><a data-lang="cy" href="#lang=cy"><img width="16" height="16" src="img/langs/cy.png"> Cymraeg</a><a data-lang="da" href="#lang=da"><img width="16" height="16" src="img/langs/da.png"> Dansk</a><a data-lang="de" href="#lang=de"><img width="16" height="16" src="img/langs/de.png"> Deutsch</a><a data-lang="dv" href="#lang=dv"><img width="16" height="16" src="img/langs/dv.png"> ‫ދިވެހި</a><a data-lang="dz" href="#lang=dz"><img width="16" height="16" src="img/langs/dz.png"> རྫོང་ཁ</a><a data-lang="ee" href="#lang=ee"><img width="16" height="16" src="img/langs/ee.png"> Ɛʋɛgbɛ</a><a data-lang="el" href="#lang=el"><img width="16" height="16" src="img/langs/el.png"> Ελληνικά</a><a data-lang="en" href="#lang=en"><img width="16" height="16" src="img/langs/en.png"> English</a><a data-lang="eo" href="#lang=eo"><img width="16" height="16" src="img/langs/eo.png"> Esperanto</a><a data-lang="es" href="#lang=es"><img width="16" height="16" src="img/langs/es.png"> Español</a><a data-lang="et" href="#lang=et"><img width="16" height="16" src="img/langs/et.png"> Eesti keel</a><a data-lang="eu" href="#lang=eu"><img width="16" height="16" src="img/langs/eu.png"> Euskara</a><a data-lang="fa" href="#lang=fa"><img width="16" height="16" src="img/langs/fa.png"> ‫فارسی</a><a data-lang="ff" href="#lang=ff"><img width="16" height="16" src="img/langs/ff.png"> Fulfulde</a><a data-lang="fi" href="#lang=fi"><img width="16" height="16" src="img/langs/fi.png"> Suomen kieli</a><a data-lang="fj" href="#lang=fj"><img width="16" height="16" src="img/langs/fj.png"> Vosa Vakaviti</a><a data-lang="fo" href="#lang=fo"><img width="16" height="16" src="img/langs/fo.png"> Føroyskt</a><a data-lang="fr" href="#lang=fr"><img width="16" height="16" src="img/langs/fr.png"> Français</a><a data-lang="fy" href="#lang=fy"><img width="16" height="16" src="img/langs/fy.png"> Frysk</a><a data-lang="ga" href="#lang=ga"><img width="16" height="16" src="img/langs/ga.png"> Gaeilge</a><a data-lang="gd" href="#lang=gd"><img width="16" height="16" src="img/langs/gd.png"> Gàidhlig</a><a data-lang="gl" href="#lang=gl"><img width="16" height="16" src="img/langs/gl.png"> Galego</a><a data-lang="gn" href="#lang=gn"><img width="16" height="16" src="img/langs/gn.png"> Avañe'ẽ</a><a data-lang="gu" href="#lang=gu"><img width="16" height="16" src="img/langs/gu.png"> ગુજરાતી</a><a data-lang="gv" href="#lang=gv"><img width="16" height="16" src="img/langs/gv.png"> Ghaelg</a><a data-lang="ha" href="#lang=ha"><img width="16" height="16" src="img/langs/ha.png"> ‫هَوُسَ</a><a data-lang="he" href="#lang=he"><img width="16" height="16" src="img/langs/he.png"> ‫עברית</a><a data-lang="hi" href="#lang=hi"><img width="16" height="16" src="img/langs/hi.png"> हिन्दी</a><a data-lang="ho" href="#lang=ho"><img width="16" height="16" src="img/langs/ho.png"> Hiri Motu</a><a data-lang="hr" href="#lang=hr"><img width="16" height="16" src="img/langs/hr.png"> Hrvatski</a><a data-lang="ht" href="#lang=ht"><img width="16" height="16" src="img/langs/ht.png"> Kreyòl ayisyen</a><a data-lang="hu" href="#lang=hu"><img width="16" height="16" src="img/langs/hu.png"> magyar</a><a data-lang="hy" href="#lang=hy"><img width="16" height="16" src="img/langs/hy.png"> Հայերեն</a><a data-lang="hz" href="#lang=hz"><img width="16" height="16" src="img/langs/hz.png"> Otjiherero</a><a data-lang="ia" href="#lang=ia"><img width="16" height="16" src="img/langs/ia.png"> Interlingua</a><a data-lang="id" href="#lang=id"><img width="16" height="16" src="img/langs/id.png"> Bahasa Indonesia</a><a data-lang="ie" href="#lang=ie"><img width="16" height="16" src="img/langs/ie.png"> Interlingue</a><a data-lang="ig" href="#lang=ig"><img width="16" height="16" src="img/langs/ig.png"> Igbo</a><a data-lang="ii" href="#lang=ii"><img width="16" height="16" src="img/langs/ii.png"> ꆇꉙ</a><a data-lang="ik" href="#lang=ik"><img width="16" height="16" src="img/langs/ik.png"> Iñupiaq</a><a data-lang="io" href="#lang=io"><img width="16" height="16" src="img/langs/io.png"> Ido</a><a data-lang="is" href="#lang=is"><img width="16" height="16" src="img/langs/is.png"> Íslenska</a><a data-lang="it" href="#lang=it"><img width="16" height="16" src="img/langs/it.png"> Italiano</a><a data-lang="iu" href="#lang=iu"><img width="16" height="16" src="img/langs/iu.png"> ᐃᓄᒃᑎᑐᑦ</a><a data-lang="ja" href="#lang=ja"><img width="16" height="16" src="img/langs/ja.png"> 日本語 (にほんご)</a><a data-lang="jv" href="#lang=jv"><img width="16" height="16" src="img/langs/jv.png"> Basa Jawa</a><a data-lang="ka" href="#lang=ka"><img width="16" height="16" src="img/langs/ka.png"> ქართული</a><a data-lang="kg" href="#lang=kg"><img width="16" height="16" src="img/langs/kg.png"> KiKongo</a><a data-lang="ki" href="#lang=ki"><img width="16" height="16" src="img/langs/ki.png"> Gĩkũyũ</a><a data-lang="kj" href="#lang=kj"><img width="16" height="16" src="img/langs/kj.png"> Kuanyama</a><a data-lang="kk" href="#lang=kk"><img width="16" height="16" src="img/langs/kk.png"> Қазақ тілі</a><a data-lang="kl" href="#lang=kl"><img width="16" height="16" src="img/langs/kl.png"> Kalaallisut</a><a data-lang="km" href="#lang=km"><img width="16" height="16" src="img/langs/km.png"> ភាសាខ្មែរ</a><a data-lang="kn" href="#lang=kn"><img width="16" height="16" src="img/langs/kn.png"> ಕನ್ನಡ</a><a data-lang="ko" href="#lang=ko"><img width="16" height="16" src="img/langs/ko.png"> 한국어 (韓國語)</a><a data-lang="kr" href="#lang=kr"><img width="16" height="16" src="img/langs/kr.png"> Kanuri</a><a data-lang="ks" href="#lang=ks"><img width="16" height="16" src="img/langs/ks.png"> कश्मीरी</a><a data-lang="ku" href="#lang=ku"><img width="16" height="16" src="img/langs/ku.png"> Kurdî</a><a data-lang="kv" href="#lang=kv"><img width="16" height="16" src="img/langs/kv.png"> коми кыв</a><a data-lang="kw" href="#lang=kw"><img width="16" height="16" src="img/langs/kw.png"> Kernewek</a><a data-lang="ky" href="#lang=ky"><img width="16" height="16" src="img/langs/ky.png"> кыргыз тили</a><a data-lang="la" href="#lang=la"><img width="16" height="16" src="img/langs/la.png"> Latine</a><a data-lang="lb" href="#lang=lb"><img width="16" height="16" src="img/langs/lb.png"> Lëtzebuergesch</a><a data-lang="lg" href="#lang=lg"><img width="16" height="16" src="img/langs/lg.png"> Luganda</a><a data-lang="li" href="#lang=li"><img width="16" height="16" src="img/langs/li.png"> Limburgs</a><a data-lang="ln" href="#lang=ln"><img width="16" height="16" src="img/langs/ln.png"> Lingála</a><a data-lang="lo" href="#lang=lo"><img width="16" height="16" src="img/langs/lo.png"> ພາສາລາວ</a><a data-lang="lt" href="#lang=lt"><img width="16" height="16" src="img/langs/lt.png"> Lietuvių kalba</a><a data-lang="lu" href="#lang=lu"><img width="16" height="16" src="img/langs/lu.png"> kiluba</a><a data-lang="lv" href="#lang=lv"><img width="16" height="16" src="img/langs/lv.png"> Latviešu valoda</a><a data-lang="mg" href="#lang=mg"><img width="16" height="16" src="img/langs/mg.png"> Fiteny malagasy</a><a data-lang="mh" href="#lang=mh"><img width="16" height="16" src="img/langs/mh.png"> Kajin M̧ajeļ</a><a data-lang="mi" href="#lang=mi"><img width="16" height="16" src="img/langs/mi.png"> Te reo Māori</a><a data-lang="mk" href="#lang=mk"><img width="16" height="16" src="img/langs/mk.png"> македонски јазик</a><a data-lang="ml" href="#lang=ml"><img width="16" height="16" src="img/langs/ml.png"> മലയാളം</a><a data-lang="mn" href="#lang=mn"><img width="16" height="16" src="img/langs/mn.png"> Монгол</a><a data-lang="mo" href="#lang=mo"><img width="16" height="16" src="img/langs/mo.png"> лимба молдовеняскэ</a><a data-lang="mr" href="#lang=mr"><img width="16" height="16" src="img/langs/mr.png"> मराठी</a><a data-lang="ms" href="#lang=ms"><img width="16" height="16" src="img/langs/ms.png"> Bahasa Melayu</a><a data-lang="mt" href="#lang=mt"><img width="16" height="16" src="img/langs/mt.png"> Malti</a><a data-lang="my" href="#lang=my"><img width="16" height="16" src="img/langs/my.png"> ဗမာစာ</a><a data-lang="na" href="#lang=na"><img width="16" height="16" src="img/langs/na.png"> Ekakairũ Naoero</a><a data-lang="nb" href="#lang=nb"><img width="16" height="16" src="img/langs/nb.png"> Norsk bokmål</a><a data-lang="nd" href="#lang=nd"><img width="16" height="16" src="img/langs/nd.png"> isiNdebele</a><a data-lang="ne" href="#lang=ne"><img width="16" height="16" src="img/langs/ne.png"> नेपाली</a><a data-lang="ng" href="#lang=ng"><img width="16" height="16" src="img/langs/ng.png"> Owambo</a><a data-lang="nl" href="#lang=nl"><img width="16" height="16" src="img/langs/nl.png"> Nederlands</a><a data-lang="nn" href="#lang=nn"><img width="16" height="16" src="img/langs/nn.png"> Norsk nynorsk</a><a data-lang="no" href="#lang=no"><img width="16" height="16" src="img/langs/no.png"> Norsk</a><a data-lang="nr" href="#lang=nr"><img width="16" height="16" src="img/langs/nr.png"> Ndébélé</a><a data-lang="nv" href="#lang=nv"><img width="16" height="16" src="img/langs/nv.png"> Diné bizaad</a><a data-lang="ny" href="#lang=ny"><img width="16" height="16" src="img/langs/ny.png"> ChiCheŵa</a><a data-lang="oc" href="#lang=oc"><img width="16" height="16" src="img/langs/oc.png"> Occitan</a><a data-lang="oj" href="#lang=oj"><img width="16" height="16" src="img/langs/oj.png"> ᐊᓂᔑᓈᐯᒧᐎᓐ</a><a data-lang="om" href="#lang=om"><img width="16" height="16" src="img/langs/om.png"> Afaan Oromoo</a><a data-lang="or" href="#lang=or"><img width="16" height="16" src="img/langs/or.png"> ଓଡ଼ିଆ</a><a data-lang="os" href="#lang=os"><img width="16" height="16" src="img/langs/os.png"> Ирон æвзаг</a><a data-lang="pa" href="#lang=pa"><img width="16" height="16" src="img/langs/pa.png"> ਪੰਜਾਬੀ</a><a data-lang="pi" href="#lang=pi"><img width="16" height="16" src="img/langs/pi.png"> पािऴ</a><a data-lang="pl" href="#lang=pl"><img width="16" height="16" src="img/langs/pl.png"> Polski</a><a data-lang="ps" href="#lang=ps"><img width="16" height="16" src="img/langs/ps.png"> ‫پښتو</a><a data-lang="pt" href="#lang=pt"><img width="16" height="16" src="img/langs/pt.png"> Português</a><a data-lang="qu" href="#lang=qu"><img width="16" height="16" src="img/langs/qu.png"> Runa Simi</a><a data-lang="rm" href="#lang=rm"><img width="16" height="16" src="img/langs/rm.png"> Rumantsch grischun</a><a data-lang="rn" href="#lang=rn"><img width="16" height="16" src="img/langs/rn.png"> kiRundi</a><a data-lang="ro" href="#lang=ro"><img width="16" height="16" src="img/langs/ro.png"> Română</a><a data-lang="ru" href="#lang=ru"><img width="16" height="16" src="img/langs/ru.png"> русский язык</a><a data-lang="rw" href="#lang=rw"><img width="16" height="16" src="img/langs/rw.png"> Kinyarwanda</a><a data-lang="sa" href="#lang=sa"><img width="16" height="16" src="img/langs/sa.png"> संस्कृतम्</a><a data-lang="sc" href="#lang=sc"><img width="16" height="16" src="img/langs/sc.png"> sardu</a><a data-lang="sd" href="#lang=sd"><img width="16" height="16" src="img/langs/sd.png"> सिन्धी</a><a data-lang="se" href="#lang=se"><img width="16" height="16" src="img/langs/se.png"> Davvisámegiella</a><a data-lang="sg" href="#lang=sg"><img width="16" height="16" src="img/langs/sg.png"> Yângâ tî sängö</a><a data-lang="si" href="#lang=si"><img width="16" height="16" src="img/langs/si.png"> සිංහල</a><a data-lang="sk" href="#lang=sk"><img width="16" height="16" src="img/langs/sk.png"> Slovenčina</a><a data-lang="sl" href="#lang=sl"><img width="16" height="16" src="img/langs/sl.png"> Slovenščina</a><a data-lang="sm" href="#lang=sm"><img width="16" height="16" src="img/langs/sm.png"> Gagana fa'a Samoa</a><a data-lang="sn" href="#lang=sn"><img width="16" height="16" src="img/langs/sn.png"> chiShona</a><a data-lang="so" href="#lang=so"><img width="16" height="16" src="img/langs/so.png"> Soomaaliga</a><a data-lang="sq" href="#lang=sq"><img width="16" height="16" src="img/langs/sq.png"> Shqip</a><a data-lang="sr" href="#lang=sr"><img width="16" height="16" src="img/langs/sr.png"> српски језик</a><a data-lang="ss" href="#lang=ss"><img width="16" height="16" src="img/langs/ss.png"> SiSwati</a><a data-lang="st" href="#lang=st"><img width="16" height="16" src="img/langs/st.png"> seSotho</a><a data-lang="su" href="#lang=su"><img width="16" height="16" src="img/langs/su.png"> Basa Sunda</a><a data-lang="sv" href="#lang=sv"><img width="16" height="16" src="img/langs/sv.png"> Svenska</a><a data-lang="sw" href="#lang=sw"><img width="16" height="16" src="img/langs/sw.png"> Kiswahili</a><a data-lang="ta" href="#lang=ta"><img width="16" height="16" src="img/langs/ta.png"> தமிழ்</a><a data-lang="te" href="#lang=te"><img width="16" height="16" src="img/langs/te.png"> తెలుగు</a><a data-lang="tg" href="#lang=tg"><img width="16" height="16" src="img/langs/tg.png"> тоҷикӣ</a><a data-lang="th" href="#lang=th"><img width="16" height="16" src="img/langs/th.png"> ไทย</a><a data-lang="ti" href="#lang=ti"><img width="16" height="16" src="img/langs/ti.png"> ትግርኛ</a><a data-lang="tk" href="#lang=tk"><img width="16" height="16" src="img/langs/tk.png"> Türkmen</a><a data-lang="tl" href="#lang=tl"><img width="16" height="16" src="img/langs/tl.png"> Tagalog</a><a data-lang="tn" href="#lang=tn"><img width="16" height="16" src="img/langs/tn.png"> seTswana</a><a data-lang="to" href="#lang=to"><img width="16" height="16" src="img/langs/to.png"> faka Tonga</a><a data-lang="tr" href="#lang=tr"><img width="16" height="16" src="img/langs/tr.png"> Türkçe</a><a data-lang="ts" href="#lang=ts"><img width="16" height="16" src="img/langs/ts.png"> xiTsonga</a><a data-lang="tt" href="#lang=tt"><img width="16" height="16" src="img/langs/tt.png"> татарча</a><a data-lang="tw" href="#lang=tw"><img width="16" height="16" src="img/langs/tw.png"> Twi</a><a data-lang="ty" href="#lang=ty"><img width="16" height="16" src="img/langs/ty.png"> Reo Mā`ohi</a><a data-lang="ug" href="#lang=ug"><img width="16" height="16" src="img/langs/ug.png"> Uyƣurqə</a><a data-lang="uk" href="#lang=uk"><img width="16" height="16" src="img/langs/uk.png"> українська мова</a><a data-lang="ur" href="#lang=ur"><img width="16" height="16" src="img/langs/ur.png"> ‫اردو</a><a data-lang="uz" href="#lang=uz"><img width="16" height="16" src="img/langs/uz.png"> O'zbek</a><a data-lang="ve" href="#lang=ve"><img width="16" height="16" src="img/langs/ve.png"> tshiVenḓa</a><a data-lang="vi" href="#lang=vi"><img width="16" height="16" src="img/langs/vi.png"> Tiếng Việt</a><a data-lang="vo" href="#lang=vo"><img width="16" height="16" src="img/langs/vo.png"> Volapük</a><a data-lang="wa" href="#lang=wa"><img width="16" height="16" src="img/langs/wa.png"> Walon</a><a data-lang="wo" href="#lang=wo"><img width="16" height="16" src="img/langs/wo.png"> Wollof</a><a data-lang="xh" href="#lang=xh"><img width="16" height="16" src="img/langs/xh.png"> isiXhosa</a><a data-lang="yi" href="#lang=yi"><img width="16" height="16" src="img/langs/yi.png"> ‫ייִדיש</a><a data-lang="yo" href="#lang=yo"><img width="16" height="16" src="img/langs/yo.png"> Yorùbá</a><a data-lang="za" href="#lang=za"><img width="16" height="16" src="img/langs/za.png"> Saɯ cueŋƅ</a><a data-lang="zh" href="#lang=zh"><img width="16" height="16" src="img/langs/zh.png"> 中文, 汉语, 漢語</a><a data-lang="zu" href="#lang=zu"><img width="16" height="16" src="img/langs/zu.png"> isiZulu</a>
			</div>
		</div>
		<div class="atline"></div>
		
		<!--
			<a id="multilg_support_link" href="http://en.wikipedia.org/wiki/Help:Multilingual_support" target="_blank">Multilingual Support Help</a>
		-->
		
		<div id="errors"><p>Error</p><input type="submit" name="hideBtn" id="hideBtn" value="Hide"></div>
		<div id="messages"><span></span></div>
		
		<a id="mark" href="http://github.com/surikat/hyper-translate/" target="_blank">HyperTranslate by Surikat</a>
		
		<script src="js/js.pack.js" type="text/javascript"></script>
		<script type="text/javascript">
			$js.dev = true;
			$css.dev = true;
			
			$js(true,[
				'jquery.min',
				
				'jquery-ui/core',
				'jquery-ui/widget',
				'jquery-ui/button',
				'jquery-ui/mouse',
				'jquery-ui/resizable',
				'jquery-ui/dialog',
				
				'json2',
				'tablesorter',
				'simple-pagination',
				'script',
			]);
			$css('style');
			$css('jquery-ui/core');
			$css('jquery-ui/button');
			$css('jquery-ui/resizable');
			$css('jquery-ui/dialog');
			$css('jquery-ui/themes/base');
		</script>
	</body>
</html>