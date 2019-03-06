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

///////iz post request uzmimamo varijable i dodajemo ih users objektu
if (($_POST["client"] != "" )  && ($_POST["deposit"] != "" ) && ($_POST["cc"] != "" )  ) {
   $users->client = $_POST["client"];
   $users->deposit = $_POST["deposit"];
   $users->cc = $_POST["cc"];

   $users->create($sesionId);

} else {
    
    echo "nope" ;

}


?>