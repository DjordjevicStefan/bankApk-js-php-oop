<?php
session_start();

////// na load page proveravama da li sesija jos traje
if ($_SESSION["id"] != "") {
    echo "ok";
} else {
    echo "empty" ;
}

?>