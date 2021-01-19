
//https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia


const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video');
myVideo.muted = true;

let myVideoStream

navigator.mediaDevices.getUserMedia({

    video: true,
    audio: true

}).then(stream => {

    myVideoStream = stream
    addVideoStream(myVideo, stream)
})

socket.emit('join-room', ROOM_ID)

socket.on('user-connected', () => {
    connectToNewUser()
})

const connectToNewUser = () => {
    console.log('new user')
}

//https://www.w3schools.com/tags/av_event_loadedmetadata.asp

const addVideoStream = (video, stream) => {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            video.play()
        })

        videoGrid.append(video)
}