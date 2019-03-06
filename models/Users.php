<?php

class Users{
 
 private $pdo;
 private $created_by ;
 

 ///// kada "pokrenemo" new Admins ova funkcija se prva okida
 public function __construct($db,$created_by){
    $this->pdo = $db;
    $this->created_by = $created_by;
 }

 ///// pokazujemo sve usere koje je napravio dati admin
 public function showAll(){
 $query = "SELECT * FROM users WHERE created_by=?";

 $stmt = $this->pdo->prepare($query);

 $stmt->bindParam(1,$this->created_by); 
 
 $stmt->execute();
  
 //// uzimamo rezultate querija i to u formi assoc areja, ukoliko query ne prodje sve kolone ce imati vrednost null
 $result = $stmt->fetch(PDO::FETCH_ASSOC);


 if ($result["admin"]== null) {
  echo "try again" ;
 
  } else {
      //// saljemo nazad rezultate querija u json formatu 
     echo json_encode($result);
    }

 } 

}