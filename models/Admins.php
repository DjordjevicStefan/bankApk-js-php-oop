<?php

class Admin{
 private $admin ;
 private $pdo;
 private $password ;

 public function __construct($db,$admin,$password){
    $this->pdo = $db;
    $this->admin = $admin;
    $this->password = $password;
 
   }


 public function check(){
 $query = "SELECT * FROM admins WHERE admin=? AND password=?";

 $stmt = $this->pdo->prepare($query);

 $stmt->bindParam(1,$this->admin); 
 $stmt->bindParam(2,$this->password); 
 
 $stmt = $this->pdo->execute();

 if ($stmt->execute()) {
    return true ;
  } else {
    printf("Error", $stmt->error);
    return false ;
  }

 }  




}


?>