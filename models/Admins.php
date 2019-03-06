<?php

class Admins{
 private $admin ;
 private $pdo;
 private $password ;
 public $sesionId ;
 public $sesionName;
 

 ///// kada "pokrenemo" new Admins ova funkcija se prva okida
 public function __construct($db,$admin,$password){
    $this->pdo = $db;
    $this->admin = $admin;
    $this->password = $password;
 }

 ///// funkcija kojom proveravamo da li u bazi imamo datog admina sa datom sifrom
 public function check(){
 $query = "SELECT * FROM admins WHERE admin=? AND password=?";

 $stmt = $this->pdo->prepare($query);

 $stmt->bindParam(1,$this->admin); 
 $stmt->bindParam(2,$this->password); 
 
 $stmt->execute();
  
 //// uzimamo rezultate querija i to u formi assoc areja, ukoliko query ne prodje sve kolone ce imati vrednost null
 $result = $stmt->fetch(PDO::FETCH_ASSOC);
 $this->sesionId = $result["id"] ;
 $this->sesionName = $result["admin"] ;


 if ($result["admin"]== null) {
  echo "try again" ;
  // printf("Error", $stmt->error);
 
  } else {
     echo "ok" ;
    }

 } 



}


?>