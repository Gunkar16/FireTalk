Name = localStorage.getItem("UserName");

FirstLetter = Name.charAt(0);
console.log(Name);
console.log(FirstLetter);
document.getElementById("FT").innerHTML=FirstLetter;
randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
document.getElementById("FT").style.backgroundColor=randomColor;
console.log(randomColor);
if(Name=="Gunkar16"){
  document.getElementById("FT").innerHTML="";
  document.getElementById("FT").style.backgroundColor="white";
  document.getElementById("FT").style.backgroundImage="url('ceo.png')";
}

var firebaseConfig = {
      apiKey: "AIzaSyCZwh_gJvpBy8umPZwKHGIC2Aodu2WXby0",
      authDomain: "firetalk-1ef32.firebaseapp.com",
      databaseURL: "https://firetalk-1ef32-default-rtdb.firebaseio.com",
      projectId: "firetalk-1ef32",
      storageBucket: "firetalk-1ef32.appspot.com",
      messagingSenderId: "352828258063",
      appId: "1:352828258063:web:c6fbac9308763bd6ad307a"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    RoomName = localStorage.getItem("RoomName");
    User_Name = localStorage.getItem("UserName");
    
    function send(){
          msg = document.getElementById("msg").value;
          firebase.database().ref(RoomName).push({
                name:User_Name,
                message:msg,
                like:0
          });
          document.getElementById("msg").innerHTML="";
    }
function getData() { firebase.database().ref("/"+RoomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
      firebase_message_id = childKey;
      message_data = childData;
      //Start code
      console.log(firebase_message_id);
      console.log(message_data);
      name = message_data['name'];
      message = message_data['message'];
      like = message_data['like'];
      
      nameWithTag = "<h4 style='margin-left:7px'>"+name+" "+"<img class='user_tick' src='tick.png'></h4>";
      messageWithTag = "<h4 class='message_h4'>"+message+"</h4>";
      like_button = "<button class='btn btn-info' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
      spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'> like: "+like+"</span></button><hr>";
      
      row = nameWithTag + messageWithTag + like_button + spanWithTag;
      document.getElementById("output").innerHTML+=row; 
      //End code
            } });  }); }
      getData();
      function updateLike(messageId){
            buttonId = messageId;
            likes = document.getElementById(buttonId).value;
            updateLikes = Number(likes)+1;
            console.log(buttonId);
            console.log(likes);
            console.log(updateLikes);
            firebase.database().ref(RoomName).child(messageId).update({
                  like:updateLikes
            });
      
};
function logOut(){
      localStorage.removeItem("UserName");
      localStorage.removeItem("RoomName");
      window.location="index.html";
}