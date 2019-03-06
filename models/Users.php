<?php

class Users{
 
 private $pdo;

 public $client ;
 public $deposit ;
 public $cc ;


 
 

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

public function create($sesionId){
    
    $query = "INSERT INTO users SET client=?,deposit=?,cc=?,created_by=?" ;

    $stmt = $this->pdo->prepeare($query);
    
    ///// moze i ovako ali i kao arej sa var koji se stavlja kao parametar execute funkcije
    $stmt.bintParam(1,$this->client);
    $stmt.bintParam(2,$this->deposit);
    $stmt.bintParam(3,$this->cc);
    $stmt.bintParam(4,$sesionId);

    $stmt->execute();

    if ($stmt->execute()) {
        return true ;
      } else {
        printf("Error", $stmt->error);
        return false ;
      }



} 

}