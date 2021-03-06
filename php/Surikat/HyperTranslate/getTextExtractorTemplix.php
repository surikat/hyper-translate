<?php
namespace Surikat\HyperTranslate;
use RedCat\Templix\Markup;
class getTextExtractorTemplix extends getTextExtractor{
	protected static $autoWrapL10n = true;
	protected static function parseFile($file,$sourceDir=null){
		$filename = $file;
		//if($sourceDir)
			//$filename = substr($filename,strlen($sourceDir));
		$content = file_get_contents($file);
		if(empty($content))
			return;
		
		//auto-wrap
		if(self::$autoWrapL10n){
			$aggr = [];
			$TML = new Markup($content);
			$TML('*[ni18n] *,script,style,code')->remove();
			$inlineEls = ['br','i','b','u','em','strong','a','abbr'];
			$inlineStr = implode(',',$inlineEls);
			$inlineElsCheck = $inlineEls;
			$inlineElsCheck[] = 'TEXT';
			$TML($inlineStr)->each(function($el)use(&$aggr,&$inlineElsCheck){
				if(
					($el->previousSibling&&in_array($el->previousSibling->nodeName,$inlineElsCheck))
					||($el->nextSibling&&in_array($el->nextSibling->nodeName,$inlineElsCheck))
				){
					$t = (string)$el;
					if(strpos($t,'<?')!==false)
						return;
					$id = '{{.-;-:-'.uniqid('translateAggr',true).'-:-;-.}}';
					$t = preg_replace('/(?:\s\s+|\n|\t|\r)/', ' ', $t);
					$aggr[$id] = $t;
					$el->clear();
					$el->write($id);
					$el->nodeName = 'TEXT';
				}
			});
			$aggrK = array_keys($aggr);
			$aggrV = array_values($aggr);
			$content = (string)$TML;
		}
		
		$i=1;
		$msg = '';
		$TML = new Markup($content);
		//$TML('*[ni18n],script,style,code')->remove();
		$TML('t')->each(function($el)use(&$msg,$filename,&$aggrK,&$aggrV,&$i){
			$t = $el->getInner();
			$t = trim($t);
			$t = preg_replace('/(?:\s\s+|\n|\t|\r)/', ' ', $t);
			if(self::$autoWrapL10n)
				$t = str_replace($aggrK,$aggrV,$t);
			if($t){
				$msg .= "#: $filename:$i\nmsgid ".self::quote($t)."\nmsgstr \"\" \n\n";
				$i++;
			}
			$el->remove();
		});
		$TML('TEXT:hasnt(PHP)')->each(function($el)use(&$msg,$filename,&$aggrK,&$aggrV,&$i){
			$t = trim((string)$el);
			if($t){
				if(self::$autoWrapL10n){
					do{
						$t = str_replace($aggrK,$aggrV,$t);
					}
					while(strpos($t,'{{.-;-:-translateAggr')!==false);
				}
				if(!$el->parent||$el->parent->nodeName!='pre')
					$t = preg_replace('/(?:\s\s+|\n|\t|\r)/', ' ', $t);
				$msg .= "#: $filename:$i\nmsgid ".self::quote($t)."\nmsgstr \"\" \n\n";
				$i++;
			}
		});
		$TML('*')->each(function($el)use(&$msg,$filename,&$aggrK,&$aggrV,&$i){
			foreach($el->attributes as $k=>$v){
				$v = trim($v);
				if($v&&
					(
						($k=='href'&&$el->nodeName=='a'&&strpos($v,'://')!==false)
						||($k=='alt'&&$el->nodeName=='img')
						||($k=='title')
						||($k=='value'&&$el->nodeName=='input'&&$el->type=='submit')
						||($k=='placeholder'&&$el->nodeName=='input')
						||($k=='content'&&$el->nodeName=='meta'&&$el->attr('name')=='description')
						||strpos($k,'i18n-')
					)
				){
					if(strpos($v,'<?')===false||strpos($k,'i18n-')){
						if(self::$autoWrapL10n)
							$v = str_replace($aggrK,$aggrV,$v);
						$msg .= "#: $filename:$i\nmsgid ".self::quote($v)."\nmsgstr \"\" \n\n";
						$i++;
					}
				}
			}
		});
		return $msg;
	}
}