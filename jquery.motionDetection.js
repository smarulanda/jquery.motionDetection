(function($) {

	$.fn.motionDetection = function(options) {
		
		var defaults = {
			pollingFrequency: 1000,
			sampleWidth: 100,
			sampleHeight: 100,
			threshold: 0.25,
			hide: true,
			onDetection: function() { console.log("Motion detected!"); }
		};

		var settings = $.extend({}, defaults, options);

		var video, canvas, canvasContext;
		var previousFrame, currentFrame;

		return this.each(function() {
			video = $("video.motionDetection")[0];
			canvas = $("canvas.motionDetection")[0];

			video.setAttribute("autoplay", true);

			canvas.width = settings.sampleWidth;
			canvas.height = settings.sampleHeight;

			canvasContext = canvas.getContext('2d');

			if (settings.hide) {
				video.style.display = "none";
				canvas.style.display = "none";
			}

			setupWebcam();
			update();
		});

		function setupWebcam() {
			var webcamError = function(e) {
				console.log('No webcam detected. Motion detection will not be available.', e);
			};

			if (navigator.getUserMedia) {
				navigator.getUserMedia({video: true}, function(stream) {
					video.src = stream;
				}, webcamError);
			} else if (navigator.webkitGetUserMedia) {
				navigator.webkitGetUserMedia({video: true}, function(stream) {
					video.src = window.URL.createObjectURL(stream);
				}, webcamError);
			}
		}

		function update() {
			drawVideo();
			checkMotion();
			setTimeout(update, settings.pollingFrequency);
		}

		function drawVideo() {
			canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
		}

		function checkMotion() {
			previousFrame = (!previousFrame) ? canvasContext.getImageData(0, 0, canvas.width, canvas.height) : currentFrame;
			currentFrame = canvasContext.getImageData(0, 0, canvas.width, canvas.height);

			var pixelsChanged = difference(previousFrame.data, currentFrame.data);

			if (pixelsChanged > (settings.threshold * canvas.width * canvas.height)) {
				settings.onDetection.call();
			}
		}

		function difference(frame1, frame2) {
			var pixelsChanged = 0;

			for (var i = 0; i < (frame1.length / 4); i++) {
				// Average a pixel's 3 color channels
				var avg1 = (frame1[4*i] + frame1[4*i+1] + frame1[4*i+2]) / 3;
				var avg2 = (frame2[4*i] + frame2[4*i+1] + frame2[4*i+2]) / 3;

				// The grayscale difference for that pixel
				var diff = Math.abs(avg1 - avg2);

				// Count the pixel as changed if above 0x15 threshold
				pixelsChanged += (diff > 0x15);
			}

			return pixelsChanged;
		}
	
	}

}(jQuery));