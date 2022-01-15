# Problem Statement

Create a Widget for a website that plays a recorded video (design attached, refer to the bottom right of the image).

Create a dashboard with log in to first create an account, record the video, save the video. The dashboard shall generate javascript code for each video widget such that the code can be embedded into any website.

When this video widget is integrated into a website, this video will autoplay and play on mute. You should provide mute/unmute controls on the video. 

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

## Project Video Tour
[Watch on YouTube](https://youtu.be/fjmK9irpJWk)

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

### Dependencies and their functions
- `bcryptjs` : Enables storing of passwords as hashed pa passwords instead of plain text
- `connect-flash` : Flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user. So, Connect-flash module for Node.js allows the developers to send a message whenever a user is redirecting to a specified web-page.
- `connect-mongo` : Creates a connection to a MongoDB instance and returns the reference to the database.
- `cors` : CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS(Cross Origin Resource Sharing) with various options.
- `ejs` : EJS(Effective Javascript) is a simple templating language that lets you generate HTML markup with plain JavaScript.
- `express` : Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- `express-ejs-layouts` : Layout support for ejs in express.
- `express-session` : an HTTP server-side framework used to create and manage a session middleware.
- `mongoose` : Mongoose provides a straight-forward, schema-based solution to model your application data.
- `multer` : Multer is a node.js middleware for handling multipart/form-data , which is primarily used for uploading files.
- `passport` : Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based webpages.
- `passport-local` : This module lets you authenticate using a username and password in your Node.js applications.
- `nodemon` : The nodemon Module is a module that develop node.js based applications by automatically restarting the node application when file changes.

