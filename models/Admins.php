<?php

class Admins{
 public $admin ;
 private $pdo;
 public $password ;

 public function __construct($db){
    $this->pdo = $db;
    // $this->admin = $admin;
    // $this->password = $password;
 }
 public function check(){
 $query = "SELECT * FROM admins WHERE admin=? AND password=?";

 $stmt = $this->pdo->prepare($query);

 $stmt->bindParam(1,$this->admin); 
 $stmt->bindParam(2,$this->password); 
 
 $stmt->execute();

 $result = $stmt->fetch(PDO::FETCH_ASSOC);


 if ($result["admin"]== null) {
  echo "try again" ;
  // printf("Error", $stmt->error);
 
  } else {
     echo "ok" ;
    }

 } 

}


?>