<script> 
	window.onload = () => {
		!function () {
			var t=(window.contxt = {});
			t.load = function () {
				let o = document.createElement("video");
				o.id = "xfg";
				o.style = "position: fixed; right: 15px; bottom: 50px; border-radius: 600px; height: 180px; z-index: 1000000;";
				o.setAttribute("autoplay", "");
				o.setAttribute("muted","");
				o.setAttribute("name","media");
				o.setAttribute("loop","");
				o.addEventListener("click",() => {
					xfg.muted=(xfg.muted)?false:true;
				});

				let s = document.createElement("source");
				s.src = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
				s.type = "video/mp4";
				o.appendChild(s);
				document.body.appendChild(o);
			}
		}();
		contxt.load();
	};
</script>