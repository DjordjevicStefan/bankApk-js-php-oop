<?php
include("../config/Database.php");
include("../models/Admins.php");

/////// testitamo da vidimo da li postoji takav admin u db

if ($_POST["admin"] !="" && $_POST["password"] !="") {
   $init = new Database();
   $pdo = $init->connect();

   $admin = $_POST["admin"];
   $password = $_POST["password"];

   $admins = new Admins($pdo,$admin,$password);
   $admins-check();


    

}

?>