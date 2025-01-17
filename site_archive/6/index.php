<?php
	require_once 'Mobile_Detect.php';
    $detect = new Mobile_Detect();
	if ($detect->isMobile())
	{
		//header("Location: http://m.nathanfriend.com/");	
	}
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
		Remove this if you use the .htaccess -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>Nathan Friend: Home</title>
		<meta name="description" content="" />
		<meta name="generator" content="Studio 3 http://aptana.com/" />
		<meta name="author" content="Friend" />
		<meta name="viewport" content="width=device-width; initial-scale=1.0" />
		<!-- Replace favicon.ico & apple-touch-icon.png in the root of your domain and delete these references -->
		<link rel="shortcut icon" href="/favicon.ico" />
		<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
		
		<link rel="stylesheet" type="text/css" href="template.css">
		
		<link href='http://fonts.googleapis.com/css?family=Cabin+Condensed' rel='stylesheet' type='text/css'>
		
	</head>
	
	<script type="text/javascript">
	
		function movepic(img_name, img_src) {
			document.getElementById(img_name).src = img_src
		}
		
		function redirect() {
			window.location = "contact.html";
		}
		
	</script>
	
	<body>		
		<div id="container">
			<div id="homeclick" onmouseover="movepic('homebackgroundimg', 'homebackground2.png')" onmouseout="movepic('homebackgroundimg', 'homebackground.png')"></div>
			<div id="contactclick" onclick="redirect()"  onmouseover="movepic('contactbackgroundimg', 'contactbackground2.png')" onmouseout="movepic('contactbackgroundimg', 'contactbackground.png')"></div>
		
			<div id="background">
				<img id="backgroundimg" src="cellobackground2.jpg" />
				<img id="homebackgroundimg" src="homebackground.png"/>	
				<a href="contact.html"><img style="border-style: none;" id="contactbackgroundimg" src="contactbackground.png" /></a>
			</div>
			<div id="menus">
				<p style="position: absolute; top: 2px; left: 53px; color: #E0E0E0; font-size: 32px; padding: 0px; margin: 0px;">home</p>
				<p style="position: absolute; top: 2px; left: 200px; color: #E0E0E0; font-size: 32px; padding: 0px; margin: 0px;">contact</p>
			</div>
			<div id="contentcontainer">
				<div id="content">				
					<p style="font-size: 2.7em; margin-bottom: 5px;">Welcome.</p>
					<hr>
					<p style="margin-top: 40px;">Thanks for stopping by.  My name's Nathan Friend and I do web programming and play the cello.</p>
					<!--<p>I'm currently a Junior at Dordt College, studying Computer Science and Music Performance.</p>-->
					<p>I'm currently a Software Development intern at Pioneer Hi-Bred, developing web applications with the ASP.NET framework.</p>					
				</div>				
				<div class="cleared"></div>
			</div>
			<div id="preload">
				<img src="contactbackground2.png" />
				<img src="homebackground2.png" />
			</div>
		</div>
	</body>
</html>
