<?php
session_start();
// session_destroy();


if ($_SESSION["id"] != "") {
    echo "ok";
} else {
    echo "empty" ;
}

?>