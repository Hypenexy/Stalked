<?php
require("db.php");
require("querySQL.php");
$ip = $_SERVER['REMOTE_ADDR'];
if (!filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {

    echo "<div><a href='?action=create'><button>Create</button></a> <a href='?action=clear'><button>Clear</button></a></div>";
    if (isset($_GET["action"])) {
        $conn = new mysqli($host, "root", "");
        if ($_GET["action"] == "create") {
            $sql = "CREATE USER 'stalked'@'localhost' IDENTIFIED BY '$pass'";
            $reason = "Creating stalked user";
            echo querySQL($sql, $conn, $reason);
            $sql = "CREATE DATABASE `stalked`";
            $reason = "Creating stalked database";
            echo querySQL($sql, $conn, $reason);
            $sql = "GRANT ALL PRIVILEGES ON *.* TO 'stalked'@'localhost'";
            $reason = "Giving permission to user stalked on database stalked";
            echo querySQL($sql, $conn, $reason);
            // $sql = "FLUSH PRIVILEGES";
            // $reason = "Flush priveleges";
            // echo querySQL($sql, $conn, $reason);
            $sql = "CREATE TABLE `stalked`.`users` (`uid` INT NOT NULL AUTO_INCREMENT , `email` VARCHAR(320) NOT NULL , `username` VARCHAR(30) NOT NULL , `password` VARCHAR(255) NOT NULL , `created` INT(20) NOT NULL , PRIMARY KEY (`uid`), UNIQUE (`email`), UNIQUE (`username`)) ENGINE = InnoDB";
            $reason = "Creating table users";
            echo querySQL($sql, $conn, $reason);
            $sql = "CREATE TABLE `stalked`.`friends` (`uid` INT NOT NULL , `fid` INT NOT NULL , `created` INT(20) NOT NULL , UNIQUE `friends` (`uid`, `fid`)) ENGINE = InnoDB";
            $reason = "Creating table friends";
            echo querySQL($sql, $conn, $reason);
            $sql = "CREATE TABLE `stalked`.`locations` (`uid` INT NOT NULL , `longitude` INT NOT NULL , `latitude` INT NOT NULL , `created` INT NOT NULL ) ENGINE = InnoDB";
            $reason = "Creating table locations";
            echo querySQL($sql, $conn, $reason);
        }
        if ($_GET["action"] == "clear") {
            $sql = "DROP USER 'stalked'@'localhost'";
            $reason = "Drop user stalked";
            echo querySQL($sql, $conn, $reason);
            $sql = "DROP DATABASE `stalked`";
            $reason = "Drop database stalked";
            echo querySQL($sql, $conn, $reason);
        }
        $conn->close();
    }

} else {
    exit("<a href='https://stalked.midelight.net'>Stalked</a> Forbidden Access");
}