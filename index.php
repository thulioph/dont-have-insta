<?php
	include('inc/head.php');
?>

	<body data-screen="home">

	<header class="header">
		<div class="instructions">
			<div class="slide">
				<div class="logo-primary"></div>
				<h1 class="title-logo">DON'T HAVE INSTA?</h1>
			</div>
			<div class="slide">
				<div class="logo-primary slide02"></div>
				<h1 class="title-logo secondary">search photos by tags</h1>
			</div>
		</div>
	</header>

	<main class="main" role="main">

		<form action="" class="form-instagram">
			<input class="pattern" id="tag" type="text" placeholder="Search tag without #" />
			<input class="submit" type="submit" value="send" />
		</form>

		<section id="wrapper" class="wrapper">
			<div class="list-instagram" id="list-instagram"></div>
		</section>

	</main>

<?php
	include('inc/footer.php');
?>