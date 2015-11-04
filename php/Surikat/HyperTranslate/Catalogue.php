<?php
namespace Surikat\HyperTranslate;
class Catalogue {
	protected $db;
	protected $lang;
	protected $name;
	protected $id;
	protected $POParser;
	static function headerPots(){
		$pots = 'langs/header.pots';
		if(!is_file($pots)){
			@mkdir(dirname($pots),0777,true);
			copy(__DIR__.'/header.pots',$pots);
		}
		$str = file_get_contents($pots);
		$str = str_replace('POT-Creation-Date: {ctime}','POT-Creation-Date: '.date('Y-m-d h:iO',filemtime($pots)),$str);
		$str = str_replace('PO-Revision-Date: {mtime}','PO-Revision-Date: '.date('Y-m-d h:iO'),$str);
		return $str;
	}
	function __construct($db,$lang,$name){
		$this->db = $db;
		$this->lang = $lang;
		$this->name = $name?$name:'messages';
		$catalogue = $this->db->findOrNewOne('catalogue',['name'=>$name,'lang'=>$lang]);
		if(!isset($catalogue->id)||!$catalogue->id)
			$this->db->put($catalogue);
		$this->id = $catalogue->id;
		$MsgStore = new DBPoMsgStore($this->db,$this->id);
		$this->POParser = new POParser($MsgStore);
	}
	function id(){
		return $this->id;
	}
	function export($file){
		$stream = fopen($file,'w');
		$this->POParser->writePoFileToStream($stream,self::headerPots());
		fclose($stream);
	}
	function import($file,$atline=null){
		if(!$atline)
			$this->db->execute("UPDATE message SET isObsolete=1 WHERE catalogue_id=?",[$this->id]);
		$stream = fopen($file,'r');
		$r = $this->POParser->parseEntriesFromStream($stream,$atline);
		fclose($stream);
		return $r;
	}
}