Chat Application built using Node and Express
=======================

## Synopsis

Following the [Chat Application tutorial](http://socket.io/get-started/chat/) and working with [@alexfakhri](https://github.com/alexfakhri).
Having been introduced to Node.js and Express we are following this tutorial to help understanding. We are also using sockets.io to allow live updates and display of data.

## Technologies Used

- Node.js on Express
- Sockets.io
- jQuery
- HTML & CSS

## Job List

- [x] Follow basic tutorial!
- [x] Broadcast message when user connects/disconnects
- [x] Allow usernames
- [x] User's own message is not sent via socket but appears instantly
- [x] User Typing functionality
- [ ] Display who is online
- [ ] Add private messaging

## Favourite Code Snippet

~~~
io.on('connection', function(socket){
  socket.on('user typing', function(username){
    socket.broadcast.emit('user typing', username+' is typing...');
  });
});


$('#m').one('keypress', function(){
        socket.emit('user typing', $('#username').val())
      });
~~~

These two snippets combine to display that a user is typing to the rest of the chatroom (but not themselves).

## Collaborators

- @alexfakhri (https://github.com/alexfakhri) on the initial exercise.
- @galicians (https://github.com/galicians) when looking at storing user socket data (rather than using sessions).
- @snozza (https://github.com/snozza)


## Still to complete/refactor

- [ ] No testing was used in the tutorial, so we could explore this further
- [ ] We could also look to improve the front-end