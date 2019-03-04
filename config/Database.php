<?php
class Database{
  private $host = 'localhost';
  private $password = 'sranje';
  private $dbname = 'bankjsphp';
  private $username  = 'root';
  private $pdo;
  
  
  public function connect(){
    $this->pdo = null ;


    try {
       ///// iniciranje PDO instance ili uspostavljanje veze sa bazom podataka
       $this->pdo = new PDO("mysql:host={$this->host};dbname={$this->dbname}", $this->username, $this->password);   
    } catch (PDOException $th) {
        echo 'connection error'.$th->getMessage();
    }

   return $this->pdo ;

  }
 

}




?>