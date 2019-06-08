const keys = require("../../config/keys.js");


module.exports = (survey) => {
return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

	
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />

    <title> Mail Me Back Application </title>
  </head>
  <body>
	<div style="height: 100%; background: #0b357a">
		<h1 style="text-decoration: underline; text-align: center; text-decoration-color: #e5b300; color: white; padding-top: 60px"> Mail Me Back Surveys Would Like To Hear Your Feedback! </h1>
	</div>
	<div>
		<h1 style="text-align: center; padding-top: 30px">I'd like your input!</h1>
		<h4 style="text-align: center">Please answer the following question: </h4>
		<h3 style="text-align: center; color: darkred">${survey.title}</h3>
		<h4 style="text-align: center; color: darkred">${survey.subject}</h4>
		<h4 style="text-align: center">${survey.body}</h4>
		<div style="text-align: center;">
			<a style="font-size: 30px; display: inline-block;" href="${keys.redirectDomain}/api/surveys/${survey.id}/thanks">YES</a>
			<a style="font-size: 30px; display: inline-block;" href="${keys.redirectDomain}/api/surveys/${survey.id}/thanks">NO</a>
		</div>
	</div>
	<div class="row">

	</div>






    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  </body>
</html>
`
}