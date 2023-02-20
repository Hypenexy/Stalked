<?php
$ip = $_SERVER['REMOTE_ADDR'];
if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
	exit("You don't have permission to view this page.");
}
require("../api/server/db.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Midelight</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <app>
    <sidebar>
        <content>
            <img src="DSC_0003.JPG">
            <div class="navmenu">
                <i class="m-i active">home<div></div></i>
                <i class="m-i">apps<div></div></i>
                <i class="m-i">group<div></div></i>
                <i class="m-i">view_list<div></div></i>
            </div>
            <div>
                <i class="m-i">settings</i>
            </div>
        </content>
        <podcontent>
            <po>Welcome</po>
            <po>Actions</po>
            <po>Shortcuts</po>
        </podcontent>
    </sidebar>
    <main>
        <div style="background-image: url(banner.jpeg)" class="welcome">
            <h1>Hey there, Hypenexy!</h1> <!--Think about showing the time and weather up there!-->
        </div>
        <slidebar><btn>Analytics</btn><btn>Actions</btn><btn>Shortcuts</btn></slidebar>
		<div class='users'>
			
		</div>
    </main>
    </app>
    <script src="MDUtils.js"></script>
    <script src="menus.js"></script>
	<script>
	var users =
	<?php
		$conn = new mysqli($host, $user, $pass, 'stalked');
		$getUsers = $conn->query("SELECT * FROM `users`");
		$json = mysqli_fetch_all ($getUsers, MYSQLI_ASSOC);
		echo json_encode($json);
	?>
	
	var usersDiv = document.getElementsByClassName("users")[0]
    for(let i = 0; i < users.length; i++) {
        const element = users[i];
        var el = document.createElement("div")
		var time = new Date(users[i].created * 1000).toLocaleString()
		el.innerHTML = `<p>${users[i].uid}</p><p>${users[i].email}</p><p>${users[i].username}</p><p>${time}</p>`
		usersDiv.appendChild(el)
    }
	</script>
</body>
</html>