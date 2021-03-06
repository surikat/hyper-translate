<?php
namespace Surikat\HyperTranslate;
use Gettext\Extractors\Po;
use RedCat\DataMap\B;
class MessageService {
	var $potfile = 'langs/messages.pot';
	private $db;
	private $dbPath;
	function __construct() {
		if(defined('REDCAT_PUBLIC'))
			$cwd = REDCAT_PUBLIC;
		else
			$cwd = getcwd().'/';
		$this->dbPath = $cwd.'langs/hyper-translate.sqlite';
		$this->db = B::selectDatabase('translation','sqlite:'.$this->dbPath);
		if(!is_file($this->dbPath)){
			foreach(explode(';',file_get_contents(__DIR__.'/install.sql')) as $l)
				$this->db->execMultiline($l);
		}
	}
	function cat($lang,$name){
		return new Catalogue($this->db,$lang,$name);
	}
	function getCountMessages($lang,$name){
		return $this->db->getCell('SELECT COUNT(*) FROM message WHERE catalogue_id = ?',[$this->cat($lang,$name)->id()]);
	}
	function getMessages($lang, $name, $page, $order, $sort, $limit) {
		$sort = $sort=='desc'?'desc':'asc';
		$offset = ($page-1)*$limit;
		$msg = $this->db['message']->getClone();
		
		$msg
			->where('catalogue_id=?',[$this->cat($lang,$name)->id()])
			->limit($limit)
			->offset($offset)
		;
		
		switch($order){
			case 'fuzzy':
				$msg->orderBy("flags $sort");
			break;
			case 'depr':
				$msg->orderBy("isObsolete $sort");
			break;
			default:
				$msg->orderBy("msgid COLLATE NOCASE $sort");
			break;
			case 'id':
			case 'msgid':
			case 'msgstr':
			case 'isObsolete':
			case 'flags':
				$msg->orderBy("$order COLLATE NOCASE $sort");
			break;
			case 'reference':
				$msg->orderBy("reference COLLATE NOCASE $sort,refint $sort");
			break;
		}
		
		if($order!='msgid')
			$msg->orderBy("msgid COLLATE NOCASE $sort");
		if($order!='msgstr')
			$msg->orderBy("msgstr COLLATE NOCASE $sort");
		if($order!='reference')
			$msg->orderBy("reference COLLATE NOCASE $sort,refint $sort");
		
		$messages = $msg->getAll();
		$r = [];
		foreach($messages as $m) {
			$m->fuzzy = strpos($m->flags,'fuzzy') !== FALSE;
			$m->isObsolete = !!$m->isObsolete;
			$r[] = $m;
		}
		return $r;
	}
	function getCatalogues(){
		$names = [];
		foreach(glob('langs/*.pot') as $name)
			$names[] = pathinfo($name,PATHINFO_FILENAME);
		return $names;
	}
	function getStats($lang,$name){
		return $this->db->getRow("SELECT c.name,c.id,COUNT(*) as message_count, COALESCE(SUM( ( LENGTH(m.msgstr)>0 OR noTranslate=1 ) ),0) as translated_count FROM catalogue c LEFT JOIN message m ON m.catalogue_id=c.id WHERE c.lang=? AND c.name=? AND m.isObsolete!=1 GROUP BY c.id",[$lang,$name]);
	}
	function updateMessage($id, $comments, $msgstr, $fuzzy, $notranslate){
		$flags = $fuzzy&&$fuzzy!='false' ? 'fuzzy' : '';
		$notranslate = (int)($notranslate&&$notranslate=='true');
		$this->db->execute("UPDATE message SET comments=?, msgstr=?, flags=?, noTranslate=? WHERE id=?", [$comments, $msgstr, $flags, $notranslate, $id]);
	}
	function countPotLines($name){
		if($name)
			return count(file($this->potfile));
	}
	function importCatalogue($lang,$name,$atline=null){
		if($lang&&$name)
			return $this->cat($lang,$name)->import($this->potfile,$atline);
	}
	function exportCatalogue($lang,$name){
		if(!$lang||!$name)
			return;
		$path = 'langs/'.$lang.'/LC_MESSAGES/'.$name.'.';
		@mkdir(dirname($path),0777,true);
		$po = $path.'po';
		$mo = $path.'mo';
		$this->cat($lang,$name)->export($po);
		Po2Mo::convert($po,$mo);
		foreach(glob($path.'*.mo') as $f)
			unlink($f);
		copy($mo,$path.time().'.mo');
	}
	function cleanObsolete($lang,$name){
		$this->db->execute("DELETE FROM message WHERE catalogue_id=? AND isObsolete=1",[$this->cat($lang,$name)->id()]);
	}
	
	function makePot(){
		$potfile = $this->potfile;
		$pot = Catalogue::headerPots();
		$pot = str_replace("{ctime}",gmdate('Y-m-d H:iO',is_file($potfile)?filemtime($potfile):time()),$pot);
		$pot = str_replace("{mtime}",gmdate('Y-m-d H:iO'),$pot);
		if(defined('REDCAT_PUBLIC'))
			$cwd = REDCAT_PUBLIC;
		else
			$cwd = getcwd();
		if(is_dir('template')){
			$pot .= getTextExtractorTemplix::parse('template',$cwd);
			$pot .= getTextExtractorPHP::parse('template',$cwd);
		}
		if(is_dir('php')){
			$pot .= getTextExtractorPHP::parse('php',$cwd);
		}
		file_put_contents($potfile,$pot);
	}
	function countPotMessages(){
		if(is_file('langs/messages.pot'))
			return (new POParser())->countEntriesFromStream(fopen('langs/messages.pot', 'r'));
			//return count(Po::fromFile('langs/messages.pot')->getArrayCopy());
	}
}