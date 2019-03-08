<?php 

include("../config/Database.php");
include("../models/Users.php");

////// startovanje sesije
session_start();


/////// povezivanje sa bazom
$init = new Database();
$pdo = $init->connect();

$sesionId = $_SESSION["id"];

/////// instanca User klase
$users = new Users($pdo);

///iz post request uzmimamo varijable i dodajemo ih users objektu
$users->id = $_POST["id"];

if ($users->deleteClient()) {
    echo json_encode("ok");
} else {
    echo json_encode("nope");
}


?>