<html> 
<head> 
<title>* Contact *</title> 
<style>
body {
  font-family: "Times New Roman", Times, serif;
	font-size: small;
	color: #666666;
  background-color:#ffffff;
  border-width:3px;
  border-color: #FF9999;
  border-style:dotted; }

table {
  border-width:5px;
  background-color: #ffffff;
  border-color: #333333;
  border-style:dotted;
   }
img {border:3px;}
a:link {
	color: #000000;
	text-decoration: none;
}
a:visited {
	text-decoration: none;
	color: #000000;
}
a:hover {
	text-decoration: none;
	color: #FF3366;
}
a:active {
	text-decoration: none;
	color: #FF3366;
}
.style2 {
	color: #FF3399;
	font-weight: bold;
}
</style>
</head> 
<body>
<h1 align="right"><a href="index.html">*+.+*</a></h1>
<form action="send.php" method="post">
<table width="351" height="240" border="1" cellpadding="2" cellspacing="2">
  <tr>
    <td colspan="2"><span class="style2">Contact </span></td>
  </tr>
  <tr>
    <td valign="top">E-Mail</td>
    <td><input type="text" name="email" value=""></td>
  </tr>
  <tr>
    <td valign="top">Name </td>
    <td><input type="text" name="name" value=""></td>
  </tr>
  <tr>
    <td valign="top">Surname </td>
    <td><input type="text" name="surname" value=""></td>
  </tr>
  <tr>
    <td valign="top">Subject </td>
    <td><input type="text" name="subject" value=""></td>
  </tr>
  <tr>
    <td valign="top"><br>
      Message</td>
    <td><textarea name="message" cols="60" rows="6"></textarea></td>
  </tr>
  <tr>
    <td colspan="2">
      <input type="submit" name="Send" value="Send">
    </div></td>
  </tr>
</table></form> 
</body> 
</html>