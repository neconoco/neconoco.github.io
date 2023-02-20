<?php 
if(($_POST['email'] == ") || ($_POST['name'] == ") || (is_numeric($_POST['name'])) || ($_POST['surname'] == ") || (is_numeric($_POST['surname'])) || ($_POST['subject'] == ") || ($_POST['message'] == ")) { 
echo 'Complete the forms correctly <br> 
Click <a href="/img_articles/15099/contact.php" mce_href="/img_articles/15099/contact.php">here</a> to return on main page.'; 
} else { 
$to = 'asako@asakomusic.com'; // change e-mail adress 
$send_date = date('d-m-Y H:i:s'); 
$subject = $_POST['subject']; 
$message = ' 
<html> 
<head> 
<title>Contact</title> 
</head> 
<body> 
<p><tt>Send Date: '.$send_date.' </tt></p> 
<table> 
<tr> 
<td><tt> Name: '.$_POST['name'].' </tt></td> 
</tr> 
<tr> 
<td><tt> Surname: '.$_POST['surname'].' </tt></td> 
</tr> 
<tr> 
<td><tt> E-Mail: <a href="mailto:'.$_POST['email'].'" mce_href="mailto:'.$_POST['email'].'">'.$_POST['email'].'</a> </tt></td> 
</tr> 
<tr> 
<td><tt> Message: <br><br> '.$_POST['message'].' </tt></td> 
</tr> 
</table> 
</body> 
</html>'; 
$headere = "MIME-Version: 1.0rn"; 
$headere .= "Content-type: text/html; charset=iso-8859-1rn"; 
$headere .= "From: ".$_POST['name']." ".$_POST['surname']."<".$_POST['email'].">rn"; 
mail($to, $subject, $message, $headere); 
echo 'The message was send'; 
} 
?>