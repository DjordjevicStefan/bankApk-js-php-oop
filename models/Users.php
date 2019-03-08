<?php

class Users{
 
 private $pdo;
 
 public $id;
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


public function showOne($sesionId){
    $query = "SELECT * FROM users WHERE created_by=? AND id=?";
   
    $stmt = $this->pdo->prepare($query);
   
    $stmt->bindParam(1,$sesionId); 
    $stmt->bindParam(2,$this->id);
    
    $stmt->execute();
     
    //// uzimamo rezultate querija i to u formi assoc areja, ukoliko query ne prodje sve kolone ce imati vrednost null. ovde uzimamo jedan zato je bez All!!!
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
   
    //// saljemo nazad rezultate querija u json formatu 
    echo json_encode($result);
   } 

public function create($sesionId){
    
    $query = "INSERT INTO users SET client=?,deposit=?,cc=?,created_by=?" ;

    $stmt = $this->pdo->prepare($query);
    
    ///// moze i ovako ali i kao arej sa var koji se stavlja kao parametar execute funkcije
    $stmt->bindParam(1,$this->client);
    $stmt->bindParam(2,$this->deposit);
    $stmt->bindParam(3,$this->cc);
    $stmt->bindParam(4,$sesionId);

    $stmt->execute();


} 

public function update($sesionId){
  $query = "UPDATE users SET client=?,deposit=?,cc=? WHERE id=?";
   
  $stmt = $this->pdo->prepare($query);

  ///// moze i ovako ali i kao arej sa var koji se stavlja kao parametar execute funkcije
  $stmt->bindParam(1,$this->client);
  $stmt->bindParam(2,$this->deposit);
  $stmt->bindParam(3,$this->cc);
  $stmt->bindParam(4,$sesionId);

  $stmt->execute();


}

}