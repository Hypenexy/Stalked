<?php
/**
 * Takes in SQL and executes it with error checking.
 * @param string $sql MySQL Code as string
 * @param mysqli $conn MySQL Connection variable
 * @param string $reason Text to specify the reason
 * @return string Returns the reason + ' completed<br>' or the error in case of failure
 */

function querySQL($sql, $conn, $reason)
{
    if ($conn->query($sql) === TRUE)
        return $reason . ' completed<br>';
    else
        return 'Error: ' . $conn->error . '<br>';
}