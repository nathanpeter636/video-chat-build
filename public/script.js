
//https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia


const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video');



myVideo.muted = true;

var peer = new Peer(undefined,{
    
    path: '/peerjs',
    host: '/',
    port: '3030'
 }); 

let myVideoStream

navigator.mediaDevices.getUserMedia({

    video: true,
    audio: true

}).then(stream => {

    myVideoStream = stream
    addVideoStream(myVideo, stream)

    peer.on('call', call => {
       
          call.answer(stream); // Answer the call with an A/V stream.

          const video = document.createElement('video')
          call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
             })
          })

    socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream)
    })


    //adding user messages

    const chat = document.querySelector('.messages')

    

socket.on('createMessage', message => {

    console.log(message)


    let li = document.createElement('li')
    let span = document.createElement('span')
   
    
span.appendChild(document.createTextNode('user'))
  li.appendChild(document.createTextNode(message))

  chat.appendChild(span);
   chat.appendChild(li);

  
  
   
})
})


peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})


//https://peerjs.com/  media calls

const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
}




//https://www.w3schools.com/tags/av_event_loadedmetadata.asp

const addVideoStream = (video, stream) => {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            video.play()
        })

        videoGrid.append(video)
}



const text = document.getElementById('chat_message')

// const getHtml = document.documentElement.innerHTML;

text.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && text.length !== 0) {
       
        socket.emit('message', text.value);

        
    }
});

//mute vid

const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getAudioTracks()[0].enabled = false;
      setUnmuteButton();
    } else {
      setMuteButton();
      myVideoStream.getAudioTracks()[0].enabled = true;
    }
  }

  const setMuteButton = () => {
    const html = `
      <i class="fas fa-microphone"></i>
      <span>Mute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
  }
  
  const setUnmuteButton = () => {
    const html = `
      <i class="unmute fas fa-microphone-slash"></i>
      <span>Unmute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
  }  

  //stop start video
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/getVideoTracks




  const playStop = () => {
    console.log('object')
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false;
      setPlayVideo()
    } else {
      setStopVideo()
      myVideoStream.getVideoTracks()[0].enabled = true;
    }
  }

  const setStopVideo = () => {
    const html = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
  }
  
  const setPlayVideo = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
      <span>Play Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
  }

 // hide/show chat window


 
 const hideChat = () => {
  document.querySelector('.main__right').style.display = "none"

  document.querySelector('.main__left').classList.add('flex_one')

  document.querySelector('.main__controls').style.marginRight = "10px";

 }

 const showChat = () => {

  document.querySelector('.main__right').style.display = "flex"

  document.querySelector('.main__left').classList.remove('flex_one')

 }


//modal 

const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close');
const noBtn = document.querySelector('.closeBtn__two')


modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
noBtn.addEventListener('click', closeModal)


function openModal() {
  modal.style.display = 'block';
}


function closeModal() {
  modal.style.display = 'none';
}


function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}



