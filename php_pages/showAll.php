<?php 
<?php
include("../config/Database.php");
include("../models/Users.php");

////// startovanje sesije
session_start();


/////// povezivanje sa bazom

$init = new Database();
$pdo = $init->connect();


?>