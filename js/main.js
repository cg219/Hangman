(function(){
	function Hangman(){
		this.word = "";
		this.testWord = "";
		this.remainingGuesses = 10;
		this.guesses = 0;
		this.letters = {};
	}

	Hangman.prototype.reset = function() {
		var self = this;

		self.word = "";
		self.testWord = "";
		self.letters = {};
		self.remainingGuesses = 10;
		self.guesses = 0;

		hiddenLetters.empty();
		remainingGuesses.text("Remaining Guesses: " + self.remainingGuesses);
		usedLetters.text("Guessed Letters: ");
	};

	Hangman.prototype.setWord = function(word) {
		var self = this;
		var letters = word.toLowerCase().split("");

		self.reset();

		self.word = word.toLowerCase();
		self.testWord = word.toLowerCase().replace(/\s/gi, "");

		var i = 0;
		var length = letters.length;
		var currentLetter;
		var currentClass;

		for( i; i<length; i++ ){
			currentLetter = letters[i];
			if( currentLetter != " "){
				self.letters[currentLetter] = self.letters[currentLetter] > 0 ? self.letters[currentLetter] + 1 : 1;
				self.guesses = self.letters[currentLetter] == 1 ? self.guesses + 1 : self.guesses;
			}
			currentClass = currentLetter == " " ? "hiddenSpace" : "hiddenLetter";
			$("<li>").addClass(currentClass).appendTo(hiddenLetters);
		}

	};

	Hangman.prototype.guess = function(letter) {
		var self = this;

		letter = letter.toLowerCase();

		if( self.letters[letter] > 0){
			var search = new RegExp(letter, "gi");
			var result;
			while(result = search.exec(self.testWord)){
				hiddenLetters.find(".hiddenLetter").eq(result.index).text(letter.toUpperCase());
			}
			self.guesses--;
			if(self.guesses == 0){
				alert("You Win!");
				self.reset();
			}
		}
		else{
			if(self.remainingGuesses == 0){
				alert("No More Guesses. You Lose!");
				self.reset();
			}
			else{
				self.remainingGuesses--;
				remainingGuesses.text("Remaining Guesses: " + self.remainingGuesses);
			}
		}
		usedLetters.text(usedLetters.text() + letter + " ");
	};

	var hangman = new Hangman();
	var word = $(".setup").find("input[type=text]");
	var guess = $(".wordInput").find("input[type=text]");
	var usedLetters = $(".usedLetters");
	var remainingGuesses = $(".remaining");
	var hiddenLetters = $(".letters");

	$(".setup").find("form").submit(function(event){
		event.preventDefault();
		hangman.setWord(word.val());
		word.val("");
	}).keyup(function(event){
		var correction = /[^\w\s]/gi;
		var result = correction.exec(word.val());
		if(result){
			word.val(word.val().substring(0, result.index));
		}
	});

	$(".wordInput").find("form").submit(function(event){
		event.preventDefault();
		hangman.guess(guess.val());
		guess.val("");
	});

})();