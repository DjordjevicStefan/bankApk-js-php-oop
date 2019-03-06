<?php

class Users{
 
 private $pdo;
 
 

 ///// kada "pokrenemo" new Admins ova funkcija se prva okida
 public function __construct($db){
    $this->pdo = $db;
    
 }

 ///// pokazujemo sve usere koje je napravio dati admin
 public function showAll($sesionId){
 $query = "SELECT * FROM users WHERE created_by=?";

 $stmt = $this->pdo->prepare($query);

 $stmt->bindParam(1,$sesionId); 
 
 $stmt->execute();
  
 //// uzimamo rezultate querija i to u formi assoc areja, ukoliko query ne prodje sve kolone ce imati vrednost null. mora fetchAll !!!!
 $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

 //// saljemo nazad rezultate querija u json formatu 
 echo json_encode($result);
    

 } 

public function create(){
    $query = "INSERT INTO users SET client=?,deposit=?,cc=?,author=?" ;


} 

}