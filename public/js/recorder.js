const webCamContainer = document.getElementById('web-cam-container');

let selectedMedia = 'vid';

// This array stores the recorded media data
let chunks = [];
// JS embed code
let embededCode = null;

document.getElementById('vid-recorder').style.display = 'block';

const videoMediaConstraints = {
  audio: true,
  video: true,
};

// function to return embed code with URL
function embedCode(URL) {
  const code = `  <!-- Start of  Code -->
 <script>
  
  window.onload = () => {
     !function () {
      var t = window.contxt = {};
      t.load = function () {
        let o = document.createElement('video');o.id = "xfg";o.style = "position: fixed; right: 15px; bottom: 50px; border-radius: 50%; width:150px; height: 150px; z-index: 1000000; border: 2px solid black; background-color: black";o.autoplay="true";o.muted="true"; o.setAttribute("name", "media");o.setAttribute("loop", "");o.addEventListener('click', () => {if (xfg.muted)xfg.muted = false;else xfg.muted = true});

        let s = document.createElement('source');s.src = "${URL}";s.type = "video/mp4";o.appendChild(s);document.body.appendChild(o);
        console.log('created')
      }
    }();
    contxt.load();
  }
<\/script>

  <!-- End of  Code -->
              `;

  return code;
}

function startRecording(thisButton, otherButton) {
  // Access the camera and microphone
  navigator.mediaDevices
    .getUserMedia(
      selectedMedia === 'vid' ? videoMediaConstraints : audioMediaConstraints
    )
    .then((mediaStream) => {
      // Create a new MediaRecorder instance
      const mediaRecorder = new MediaRecorder(mediaStream);

      window.mediaStream = mediaStream;
      window.mediaRecorder = mediaRecorder;
      mediaRecorder.start();

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, {
          type: selectedMedia === 'vid' ? 'video/mp4' : 'audio/mpeg',
        });
        chunks = [];
        const recordedMedia = document.createElement(
          selectedMedia === 'vid' ? 'video' : 'audio'
        );
        recordedMedia.controls = true;

        const recordedMediaURL = URL.createObjectURL(blob);
        recordedMedia.src = recordedMediaURL;

        //----------Buttons----------------

        const downloadButton = document.createElement('a');
        downloadButton.download = 'Recorded-Media';
        downloadButton.href = recordedMediaURL;
        downloadButton.innerText = 'Download!';
        downloadButton.className = 'button';

        const embedButton = document.createElement('button');
        embedButton.id = 'btns';
        embedButton.innerText = 'Code Snippet!';
        embedButton.classList.add('btns'); 
		embedButton.classList.add('button'); 
        embedButton.setAttribute('videourl', `${recordedMediaURL}`);

        downloadButton.onclick = () => {
          URL.revokeObjectURL(recordedMedia);

          var xhr = new XMLHttpRequest();
          xhr.onload = function (e) {
            if (this.readyState === 4) {
              console.log('Server returned: ', e.target.responseText);
            }
          };
          var fd = new FormData();

          fd.append('video_data', blob, 'filename.mp4');
          xhr.open('POST', '/save-video', true);
          xhr.send(fd);
        };

        document.getElementById('output').append(recordedMedia, downloadButton);
        document.getElementById('output').append(embedButton);

        document.querySelectorAll('.btns').forEach((item) => {
          item.onclick = () => {
            const videoURL = item.getAttribute('videourl');
            embed(videoURL);
          };
        });
      };

      if (selectedMedia === 'vid') {
        webCamContainer.srcObject = mediaStream;
      }

      document.getElementById(`${selectedMedia}-record-status`).innerText =
        'Recording';

      thisButton.disabled = true;
      otherButton.disabled = false;
    })
    .catch((error) => {
      console.log(error);
    });
}

function stopRecording(thisButton, otherButton) {
  // Stop the recording
  window.mediaRecorder.stop();

  window.mediaStream.getTracks().forEach((track) => {
    track.stop();
  });

  document.getElementById(`${selectedMedia}-record-status`).innerText =
    'Recording done!';
  thisButton.disabled = true;
  otherButton.disabled = false;
}

// -------Video-List-------------

function embed(url) {
  // set the embed code
  const content = document.getElementById('code');
  content.innerText = embedCode(url);

  // Modal logic
  const addMovieModal = document.querySelector('.add-Modal');
  const backdrop = document.querySelector('.backdrop');
  const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');

  const toggleBackdrop = () => {
    backdrop.classList.toggle('Visible');
  };

  const toggleMovieModal = () => {
    addMovieModal.style.display = 'block';
    backdrop.style.display = 'block';
  };

  const cancelAddMovieHandler = () => {
    addMovieModal.style.display = 'none';
    backdrop.style.display = 'none';
  };

  const backdropClickHandler = () => {
    addMovieModal.style.display = 'none';
    backdrop.style.display = 'none';
  };

  toggleMovieModal();

  backdrop.addEventListener('click', backdropClickHandler);

  cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
}
