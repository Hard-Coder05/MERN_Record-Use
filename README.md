# Problem Statement

Create a Widget for a website that plays a recorded video (design attached, refer to the bottom right of the image).

Create a dashboard with log in to first create an account, record the video, save the video.  The dashboard shall generate javascript code for each video widget such that the code can be embedded into any website.

When this video widget is integrated into a website, this video will autoplay and play on mute. You should provide mute/unmute controls on the video.

The below is how the widget will look on a website. [Ignore the Invest now button, you can replace that with a mute/unmute button]

 

### Usage

```sh
$ npm install
```

```sh
$ npm start
# Or run with Nodemon
$ npm run dev

# Visit http://localhost:5000
```

### MongoDB

Open "config/keys.js" and add your MongoDB URI, local or Atlas





### Video Link

* Paste the embed code before "<\/head>" tag in your target website page.


* Currently the video URL in the embed code won't work as it is not a public url (it is a blob url). Therefore, Please replace the video link in embed code with-> http://localhost:5000/public/videos/video3.mp4
