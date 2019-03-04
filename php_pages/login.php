<?php
include("../config/Database.php");
include("../models/Admins.php");

/////// povezivanje sa bazom

$init = new Database();
$pdo = $init->connect();
$admins = new Admins($pdo);

$admins->admin = $_POST["admin"];
$admins->password = $_POST["password"];



$admins->check();


/////// testitamo da vidimo da li postoji takav admin u db

// if ($_POST["admin"] !="" && $_POST["password"] !="") {
   
   

//    $admin = $_POST["admin"];
//    $password = $_POST["password"];

  

   
    

// } else{
//     echo "jbg" ;
// }

?>