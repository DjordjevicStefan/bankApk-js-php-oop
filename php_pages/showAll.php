<?php 

include("../config/Database.php");
include("../models/Users.php");

////// startovanje sesije
session_start();


/////// povezivanje sa bazom

$init = new Database();
$pdo = $init->connect();

/////// uzimamo id admina is sesije da bi mogli da posle sa njom pozovemo method na users klasi
$sesionId =  $_SESSION["id"];

////// iniciramo users klasu
$users = new Users($pdo);

///// zovemo method na instanci koji kao parametar ocekuje id admina koji je trentno logovan
$users->showAll($sesionId);

?>