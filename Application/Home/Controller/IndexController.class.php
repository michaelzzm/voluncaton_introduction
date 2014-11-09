<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
        $res = @file_get_contents('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip='); 
        if(empty($res)){ return false; }  
        $jsonMatches = array();  
        preg_match('#\{.+?\}#', $res, $jsonMatches);  
        if(!isset($jsonMatches[0])){ return false; }  
        $json = json_decode($jsonMatches[0], true);  
        if(isset($json['ret']) && $json['ret'] == 1){  
            $json['ip'] = $ip;  
            unset($json['ret']);  
        }else{  
            return false;  
        }  
        //$country = mb_convert_encoding($json[country], "GBK","UTF-8");
        $country = $json[country];
        if($country == "中国")
            $this->display('Chinese');
        else
            $this->display('English');
    }
}