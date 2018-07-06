<?php
set_time_limit(0);

$source = "message.txt";

while(true){
    $lastRequest = (int) $_GET['time'] ?? null;
    clearstatcache();

    $lastChangeFile = filemtime($source);

    if($lastRequest == 0 || $lastRequest < $lastChangeFile){
        $data = file_get_contents($source);
        $response = [
            'time' => $lastChangeFile,
            'data' => $data
        ];
        echo json_encode($response);
        break;
    }else{
        sleep(1);
    }

}