var express = require('express');
var app = express();


app.set('views', __dirname + '/views')
app.set('view engine', 'jade');

app.get('/', function (req, res) {
	res.render('index', { title: 'Calculate'});
});

app.get('/result', function(req, res) {
	var firstNumber = parseFloat(req.query['firstNumber']);
	var seccontNumber = parseFloat(req.query['seccontNumber']);
	var operation = req.query['operation'];
	if(!firstNumber || !seccontNumber || !operation)
		res.redirect('/');
	var resultText = calculate(firstNumber, operation, seccontNumber);
	res.render('result', { result: resultText});
});

function calculate(firstValue, operation, secondValue){
	var result = "";
	switch (operation) {
		case "sum":
			result = sum(firstValue, secondValue);
			break;
		case "sub":
			result = sub(firstValue, secondValue);
			break;
		case "mul":
			result = mul(firstValue, secondValue);
			break;
		case "div":
			result = div(firstValue, secondValue);
			break;
	
		default:
			result = "Invalid operation(";
			break;
	}	
}

function sum(first, second)  {
	var result = first + second;
	return first + " + " + second + " = " + result;
}

function sub(first, second)  {
	var result = first - second;
	return first + " - " + second + " = " + result;
}

function mul(first, second) {
	var result = first * second;
	return first + " * " + second + " = " + result;
}

function div(first, second) {
	var result = first / second;
	return first + " / " + second + " = " + result;
}

app.listen(8080);
