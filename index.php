<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>HyperTranslate</title>
		<link href="css/simple-pagination.css" rel="stylesheet" type="text/css" />
		<link href="css/style.css" rel="stylesheet" type="text/css" media="screen" />
		<link href="img/favicon.png" rel="icon" type="image/x-icon" />
	</head>
	<body>
		<div id="errors"><p>Error</p><input type="submit" name="hideBtn" id="hideBtn" value="Hide"></div>
		<?php if(isset($_GET['lang'])):?>
			<div id="body_w">
				<div id="messages"><span></span></div>
				<div id="nav">
					<div id="selected-lang"></div>
					<select id="catalogue_list"></select>
					<div id="cat_stats">
						<div class="progressbar">
							<div class="inner"> </div>
							<div class="stats"><span class="percent"></span> - <span class="translated" ></span> of <span class="total"></span></div>
						</div>
					</div>
					<div id="actions">
						<button class="update_cat">ImportPOT</button>
						<button class="compile_cat">Compile</button>
					</div>
					<button id="clean_obsolete">Clean obsoletes</button>
				</div>
				<div id="edition">
					<div id="edit_bar">
						<div class="block">
							<table id="edit_bar_table"><thead><tr>
							<th id="ref_head">Reference</th>
							<th id="update_head">Updated On</th>
							<th id="src_com_head">Source Comments</th></tr></thead>
							</table>
						</div>
						<div class="block">
							<h3><a href="#" id="trans_com_head" class="expand">Translation Comments</a></h3>
							<textarea id="comments" class="data" spellcheck="false"></textarea>
						</div>
						<div class="block">
							<h3><a href="#" id="orig_str_head">Original String (msgid)</a></h3>
							<div id="msgid" class="data">-</div>
						</div>
						<div class="block">
							<h3><a href="#" id="orig_str_head">Translation (msgstr)</a></h3>
							<textarea id="msgstr" class="data" spellcheck="false"></textarea>
						</div>
						<div class="block" id="cntrl_blk">
							<input type="submit" id="next" name="next" value="Next Message &raquo;" />
							<fieldset>
								<label for="fuzz">Mark as Fuzzy</label> <input type="checkbox" id="fuzz" name="fuzz" /> 
							</fieldset>
							<fieldset>
								<label for="notr">No Translate</label> <input type="checkbox" id="notr" name="notr" /> 
							</fieldset>
						</div>
					</div>
					<div id="message_container">
						<table id="msg_table_head" cellspacing="0">
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
						</table>
						<table id="msg_table" cellspacing="0">
							<tbody></tbody>
						</table>
						<div id="loading_indicator"><img src='img/loading.gif' />Loading</div>
					</div>
					<div id="ref_data"></div>
					<div id="update_data"></div>
					<div id="com_data"></div>
					<div id="pagination"></div>
				</div>
			</div>
		<?php endif;?>
		<div class="atline"></div>
		<script src="js/js.pack.js" type="text/javascript"></script>
		<script type="text/javascript">$js(true,[
			'jquery.min',
			'json2',
			'tablesorter',
			'simple-pagination',
			'script',
		]);</script>
	</body>
</html>