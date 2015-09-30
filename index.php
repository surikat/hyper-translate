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
				<span id="selected-lang"></span>
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
				</div>
				<div id="pagination"></div>
			</div>
			<div id="nav_row">
				<input id="return_table" type="image" src="img/return.png"></input>
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
			
			<div id="flags"></div>
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