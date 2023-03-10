<?php
/**
 * Validates a user string and checks if it's an email and if it's taken.
 * @param string $email String inputted from user that is an email
 * @param mysqli $conn The SQL connection to check for matches.
 * @return int|string Returns 201 for a valid string or the error
 */
function ValidateEmail($email, $conn)
{
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return "Invalid email format";
    } else {
        if (mysqli_num_rows(mysqli_query($conn, "SELECT * FROM `users` WHERE email='$email'"))) {
            return "Email already taken";
        } else {
            return 201;
        }
    }
}
/**
 * Validates a user string and checks if it's a username, if it's taken and if it's the correct length.
 * @param string $username String inputted from user that is a username
 * @param mysqli $conn The SQL connection to check for matches.
 * @return int|string Returns 201 for a valid string or the error
 */
function ValidateUsername($username, $conn)
{
    if (strlen($username) < 3) {
        return "Username too short";
    } else {
        if (strlen($username) > 30) {
            return "Username too long";
        } else {
            if (!preg_match("/^[0-9a-zA-Z-' ]*$/", $username)) {
                return "Only letters and white space allowed";
            } else {
                if (mysqli_num_rows(mysqli_query($conn, "SELECT * FROM `users` WHERE username='$username'"))) {
                    return "Username already taken";
                } else {
                    return 201;
                }
            }
        }
    }
}
/**
 * Validates a user string and checks if it's the correct length.
 * @param string $password String inputted from user that is a password
 * @param mysqli $conn The SQL connection to check for matches.
 * @return int|string Returns 201 for a valid string or the error
 */
function ValidatePassword($password, $conn)
{
    if (strlen($password) < 3) {
        return "Password too short";
    } else {
        if (strlen($password) > 200) {
            return "Password is way too big";
        } else {
            if ($password == "password" || $password == "admin" || $password == "123" || $password == "1234" || $password == "root") {
                return "NO";
            }
            return 201;
        }
    }
}

$result = "undefined";
if (isset($_POST["type"])) {
    require("../server/session.php");
    require("../server/db.php");
    require("../server/querySQL.php");
    $conn = new mysqli($host, $user, $pass, 'stalked');
    $email = $conn->real_escape_string($_POST["email"]);
    $username = $conn->real_escape_string($_POST["username"]);
    $password = $conn->real_escape_string($_POST["password"]);
    switch ($_POST["type"]) {
        case 'register':
            $emailValidation = ValidateEmail($email, $conn);
            $usernameValidation = ValidateUsername($username, $conn);
            $passwordValidation = ValidatePassword($password, $conn);
			$hashedPassword = password_hash($password, PASSWORD_DEFAULT); // will be changed in midelight production don't worry
            if ($emailValidation == 201) {
                if ($usernameValidation == 201) {
                    if ($passwordValidation == 201) {
                        $time = strtotime("now");
                        $autoincrementid = $conn->query("SHOW TABLE STATUS FROM `stalked` WHERE `name` LIKE 'users'");
                        $_SESSION["loggedin"] = mysqli_fetch_assoc($autoincrementid)["Auto_increment"];
                        $result = $conn->query("INSERT INTO `users` (`email`, `username`, `password`, `created`) VALUES ('$email', '$username', '$hashedPassword', '$time')");
                        if ($result) {
                            $result = 201;
                        } else {
                            $result = "Something has gone wrong! " . $conn->errorno;
                        }
                    } else {
                        $result = $passwordValidation;
                    }
                } else {
                    $result = $usernameValidation;
                }
            } else {
                $result = $emailValidation;
            }
            break;
        case 'login':
            $checkLogin = $conn->query("SELECT `uid`, `password` FROM `users` WHERE `username` = '$email' OR `email` = '$email'");
			if($checkLogin){
				$num_rows = mysqli_num_rows($checkLogin);
				if($num_rows){
					$fetch_assoc = mysqli_fetch_assoc($checkLogin);
					if(password_verify($password, $fetch_assoc['password'])){
						$_SESSION["loggedin"] = $fetch_assoc['uid'];
						$result = 201;
					}
					else{
						$result = "Wrong info!";
					}
				}
				else{
					$result = "Wrong info!";
				}
			}
			else{
				$result = "Something has gone wrong! " . $conn->errorno;
			}
            break;
        default:
            $result = "You haven't specified a valid type. It's either ";
            break;
    }
    $conn->close();
}
echo json_encode(array('status' => $result));
header("allow-control-access-origin: *");