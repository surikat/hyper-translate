<?php
namespace Wild\HyperTranslate;
class DBPoMsgStore {
	private $db;
	private $id;
	function __construct($db,$id){
		$this->id = $id;
		$this->db = $db;
	}
	function write($msg){
		if(!$msg["msgid"])
			return;
		@list($ref,$refint) = explode(':',@$msg["reference"]);
		$b = $this->db->findOrNewOne('message',[
			'catalogue_id'=>$this->id,
			'msgid'=>$msg["msgid"],
			'reference'=> $ref,
		]);
		foreach([
			'isObsolete'=> 0,
			'msgstr'=> isset($b->msgstr)?$b->msgstr:'',
			'comments'=> @$msg["translator-comments"],
			'extractedComments'=> @$msg["extracted-comments"],
			'previousUntranslatedString'=> @$msg["previous-untranslated-string"],
			'flags'=> @$msg["flags"],
			'refint'=> $refint,
		] as $k=>$v)
			$b->$k = $v;
		$this->db->put($b);
	}
	function read(){
		return $this->db->getAll("SELECT * FROM message WHERE catalogue_id = ? AND LENGTH(msgstr)>0 AND isObsolete=0 AND noTranslate!=1 GROUP BY msgid ORDER BY msgid COLLATE NOCASE ASC", [$this->id]);
	}
}