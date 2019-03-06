<?php
include("../config/Database.php");
include("../models/Admins.php");

////// startovanje sesije
session_start();


/////// povezivanje sa bazom

$init = new Database();
$pdo = $init->connect();

///// kupimo podatke iz forme preko js i formdata konstruktor function
$admin = $_POST["admin"];
$password = $_POST["password"];

////// pravimo istancu admins klase
$admins = new Admins($pdo,$admin,$password);


/// testiramo da vidimo da li postoji takav admin u nasoj bazi
$admins->check();

///// cuvanje admin id u sesiji
$_SESSION["id"] = $admins->sesionId;


?>