<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){

        static $ip = NULL;
        if (getenv("HTTP_CLIENT_IP")){
        $ip = getenv("HTTP_CLIENT_IP");
        }else if(getenv("HTTP_X_FORWARDED_FOR")){
        $ip = getenv("HTTP_X_FORWARDED_FOR");
        }else if(getenv("REMOTE_ADDR")){
        $ip = getenv("REMOTE_ADDR");
        }
        // IP地址合法验证
        $ips = explode(',', $ip);
        $addr = $ips[0];

        if(filter_var($addr, FILTER_VALIDATE_IP))
            $ip = $addr;

        if($ip=='127.0.0.1')
            $res = @file_get_contents('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js');
        else
            $res = @file_get_contents('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip='.$ip); 
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
        //var_dump($json);
        //$this->assign('country', $country);
        if($country == "中国" || $country == "新加坡" || $country == "")
            $this->display('Chinese');
        else
            $this->display('English');
    }
}