# Problem Statement

Create a Widget for a website that plays a recorded video (design attached, refer to the bottom right of the image).

Create a dashboard with log in to first create an account, record the video, save the video. The dashboard shall generate javascript code for each video widget such that the code can be embedded into any website.

When this video widget is integrated into a website, this video will autoplay and play on mute. You should provide mute/unmute controls on the video.

The below is how the widget will look on a website. [Ignore the Invest now button, you can replace that with a mute/unmute button]

### Usage

- Open `config/keys.js` and add your MongoDB URI, local or Atlas

```sh
$ npm install
```

```sh
$ npm start
# Or run with Nodemon
$ npm run dev

# Visit http://localhost:5000
```

### Key Instructions:

- Embed the code inside `<head>` element tag in the target website page.
- Currently the video URL in the embed code won't work as it is not a public url (it is a blob url). Therefore, Please replace the video link with any other public link availble for openAPIs (Ex: http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4) or you can use the pre-recorded video stored here in `public/videos/video1` (URL: http://localhost:5000/public/videos/video1.mp4)

### Code - Template to be embed

```
<script>

  window.onload = () => {
     !function () {
      var t = window.contxt = {};
      t.load = function () {
        let ele = document.createElement('video');
		ele.id = "xfg";
		ele.style = "position: fixed; right: 15px; bottom: 50px; border-radius: 50%; width:150px; height: 150px; z-index: 1000000; border: 2px solid black; background-color: black";
		ele.autoplay="true";
		ele.muted="true";
		ele.setAttribute("name", "media");
		ele.setAttribute("loop", "");
		ele.addEventListener('click', () => {if (xfg.muted)xfg.muted = false;else xfg.muted = true});

        let s = document.createElement('source');
		s.src = "<--ENTER URL HERE-->";
		s.type = "video/mp4";
		o.appendChild(s);
		document.body.appendChild(o);
        console.log('created')
      }
    }();
    contxt.load();
  }
</script>
```
