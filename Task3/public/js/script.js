(function($){
  	var connected = false;
	var username = $('#name').text();
	var messages = $('#posts'); 
	var message = $('#massage');
	var socket = io.connect('http://localhost:3000');
	$('#submit').on('click', sendMessage);
	
	
	socket.emit('add user', username);
	
	function sendMessage (isMe) {
		var text = message.val();
		if (text && connected) {
			message.val('');
			addChatMessage({
				username: username,
				message: text
			}, true);
			socket.emit('new message', text);
		}
	}
	
	function addChatMessage (data, isMe) {	
		var usernameDiv = $('<div class="name"/>')
			.text(data.username);
		var messageBody = $('<div>')
			.text(spliteWord(data.message));
	
		var typingClass = isMe ? 'me' : 'not-me';
		var message = $('<div class="post"/>')
			.data('username', data.username)
			.addClass(typingClass)
			.append(usernameDiv, messageBody);
	
		addMessageElement(message, isMe);
	}
	
	function addMessageElement (el, isMe) {
		var element = $(el);
		messages.append(element);
		var animationClass = isMe ? 'animate-me' : 'animate-not-me';
		
		setTimeout(element.addClass.bind(element, animationClass), 50);
		
		messages[0].scrollTop = messages[0].scrollHeight;
  	}
	  
	socket.on('login', function (data) {
		connected = true;
		var message = "Welcome to Socket.IO Chat – ";
		console.log(message, {
			prepend: true
		});
	});
	  
	socket.on('new message', function (data) {
    	addChatMessage(data, false);
  	});
	  
  	socket.on('user joined', function (data) {
    	console.log(data.username + ' joined');
  	});

	socket.on('user left', function (data) {
		console.log(data.username + ' left');
	});
	
	
	function spliteWord(string){
		//49
		var result = [];
		var words = string.split(' '); 
		for(var i = 0, length = words.length; i < length; i++) {
			if(words[i].length >= 49){
				words[i] = hyphenation(words[i]);
			}
			result.push(words[i]);			
		}
		
		return result.join(' ');
	}
	
	function hyphenation(string){
		var result = "";
		if(string.length >= 29){
			var temp = string.slice(26, string.length);
			var first = string.slice(0, 27) + '-';
			if(temp.length >= 29){
				temp = hyphenation(temp);
			}
			result = first + ' ' + temp;
		} else {
			result = string;
		}
		return result;
	}
	
})(jQuery);