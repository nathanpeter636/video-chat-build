
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
    audio: false

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