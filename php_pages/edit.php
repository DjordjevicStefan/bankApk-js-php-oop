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
$users->client = $_POST["client"];
$users->deposit = $_POST["deposit"];
$users->cc = $_POST["cc"];


if (!empty($_POST["client"])  && isset($_POST["client"])  && !empty($_POST["deposit"]) && isset($_POST["deposit"]) && !empty($_POST["cc"]) &&  isset($_POST["cc"]) ) {
    
   $users->update($sesionId);
   echo json_encode("ok") ;

} else {
    
    echo json_encode("nope") ;

}


?>