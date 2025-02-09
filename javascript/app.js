//DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

//add a new chat
newChatForm.addEventListener('submit', e =>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() =>newChatForm.reset())
        .catch(error => console.log(error));
})

//update username 
newNameForm.addEventListener('submit', e =>{
    e.preventDefault();
    // update name via chatroom class
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    // reset the form
    newNameForm.reset();
    //show then hide the upd mess
    updateMssg.innerText = `Your name was updated ${newName}`;

    setTimeout(() => updateMssg.innerText = '', 3000);
})
// update the chat rooms
rooms.addEventListener('click', e =>{
    //console.log(e);
    if(e.target.tagName === "BUTTON"){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
})
// check local storage for a name
const username = localStorage.username ? localStorage.username : 'none'; 

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

//get the chats and render
chatroom.getChats(data => chatUI.render(data));