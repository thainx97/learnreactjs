var resultViewElemet = document.getElementById('resultView'),
	previousRecordElement = document.getElementById('previousRecord'),
	calCollection = [],
	resultString = '',
	state = 'clear',
	operatorSymbol = {
		'/': '÷',
		'*': '×',
		'+': '+',
		'-': '-',
	};

var initial = function () {
	var numbers = document.getElementsByClassName('num'),
		zeros = document.getElementsByClassName('zero'),
		operators = document.getElementsByClassName('operator'),
		fpoints = document.getElementsByClassName('fpoint'),
		clears = document.getElementsByClassName('clear'),
		cleanChars = document.getElementsByClassName('cleanChar'),
		calResults = document.getElementsByClassName('calResult');

	for (var i = 0; i < numbers.length; i++) {
		numbers[i].onclick = function (e) {
			if (state == 'calResult') {
				cleanResultView();
			}
			var rgx = /^0[\d]/;
			if (rgx.test(calCollection[calCollection.length - 2] + this.value)) {
				clearNumberofChar(1);
			}
			resultString += this.value;
			calCollection = splitAndDecorate(resultString); // var splitStr = resultString.split(/([\d.]+)/);

			resultViewElemet.innerHTML = calCollection.join('');

			state = 'input';
		};
	}

	zeros[0].onclick = function (e) {
		if (state == 'calResult') {
			cleanResultView();
		}
		resultString += this.value;
		calCollection = splitAndDecorate(resultString); // var splitStr = resultString.split(/([\d.]+)/);
		var rgx = /^0[\d]+/;
		if (rgx.test(calCollection[calCollection.length - 2])) {
			clearNumberofChar(1);
		} else {
			resultViewElemet.innerHTML = calCollection.join('');
		}

		state = 'input';
	};

	for (var i = 0; i < operators.length; i++) {
		operators[i].onclick = function (e) {
			if (state == 'clear') {
				return;
			}

			if (state == 'calResult') {
				var cache = resultString;
				cleanResultView();
				resultString = cache;
				calCollection = splitAndDecorate(cache);
				state = 'input';
			}

			if (state == 'input') {
				//change resultViewElemet color to black
				if (resultString.length == 0 || isNaN(resultString.substr(resultString.length - 1))) {
				} else {
					resultString += this.value;
					// calCollection.push(this.value);
					calCollection = splitAndDecorate(resultString);
				}
			} else if (state == 'operator') {
				clearNumberofChar(1);
				resultString += this.value;
				// calCollection.push(this.value);
				calCollection = splitAndDecorate(resultString);
			}

			resultViewElemet.innerHTML = calCollection.join('');
			state = 'operator';
		};
	}

	fpoints[0].onclick = function (e) {
		if (state == 'calResult') {
			cleanResultView();
		}

		if (resultString.length == 0 || !isContainFloat(resultString)) {
			var generateFloatNumber = '0' + this.value;
			resultString += generateFloatNumber;
			calCollection.push(generateFloatNumber);
		} else {
			var lastInputValue = calCollection[calCollection.length - 2] + this.value;
			if (lastInputValue.match(/[\d\,]+[\.]/) == lastInputValue) {
				resultString += this.value;
				calCollection.push(this.value);
			}
		}

		resultViewElemet.innerHTML = calCollection.join('');
		state = 'input';
	};

	cleanChars[0].onclick = function (e) {
		if (state == 'calResult') {
			cleanResultRender(resultViewElemet, previousRecordElement);
		}
		clearNumberofChar(1);
		if (resultString.length == 0) {
			resultViewElemet.innerHTML = '';
			state = 'clear';
		} else {
			resultViewElemet.innerHTML = calCollection.join('');
			state = 'input';
		}
	};

	clears[0].onclick = function (e) {
		//change resultViewElemet color to black
		cleanResultView();
		state = 'clear';
	};

	calResults[0].onclick = function (e) {
		if (resultString.length == 0) {
			resultViewElemet.innerHTML = '';
			state = 'clear';
			return;
		}

		if (state == 'input') {
			var previousString = resultString;

			var calResult = Function('', 'return ' + resultString + ';');
			resultString = '' + calResult();
			calCollection = splitAndDecorate(resultString);

			previousRecordElement.innerHTML = splitAndDecorate(previousString).join('');
			addResultRender(resultViewElemet, previousRecordElement);
		} else {
			cleanResultRender(resultViewElemet, previousRecordElement);
		}

		resultViewElemet.innerHTML = calCollection.join('');
		state = 'calResult';
	};
};

var clearNumberofChar = function (num) {
	resultString = resultString.slice(0, -1 * num);
	calCollection = splitAndDecorate(resultString);
};

var cleanResultView = function () {
	resultString = '';
	calCollection.length = 0;
	resultViewElemet.innerHTML = '';

	cleanResultRender(resultViewElemet, previousRecordElement);
	state = 'clean';
};

var cleanResultRender = function (view, preView) {
	view.classList.remove('showResultState');
	view.classList.remove('slideFromBottom');

	preView.classList.remove('slideInvisibleFromBottom');
};

var addResultRender = function (view, preView) {
	view.classList.add('showResultState');
	view.classList.add('slideFromBottom');

	preView.classList.add('slideInvisibleFromBottom');
};

var numberToString = function (num) {
	var strTemp = '' + num;
	var strArr = strTemp.split('.');
	var intStr = strArr[0];
	var floatStr = strArr.length > 1 ? '.' + strArr[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(intStr)) {
		intStr = intStr.replace(rgx, '$1' + ',' + '$2');
	}
	return intStr + floatStr;
};

var splitAndDecorate = function (resultString) {
	var collection = resultString.split(/([\d.]+)/);
	// var decorateCollection = collection;
	for (var i = collection.length - 1; i >= 0; i--) {
		if (collection[i].match(/([\d.]+)/)) {
			collection[i] = numberToString(collection[i]);
		} else if (collection[i] in operatorSymbol) {
			collection[i] = operatorSymbol[collection[i]];
		}
	}
	return collection;
};

var isContainFloat = function function_name(checkString) {
	return checkString.substr(checkString.length - 1) == '.';
};

initial();
