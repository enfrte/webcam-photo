//(function () {
    // Assignments
    let error = "";
    let canvas = document.querySelector("#canvas");
    let context = canvas.getContext("2d");
    let video = document.querySelector("#video");

    // Event listeners

    document.querySelector("#snap").addEventListener('click', () => {
        context.drawImage(video, 0,0,640,480); // x,y,w,h
        video.classList.add('hidden');
        canvas.style.display = 'block';
        // if this doesn't look good, try and do an absolute position with one on top of the other
        // then just remove the video, or dynamically alter the z-index
    });

    document.querySelector("#initWebcam").addEventListener('click', () => {
        webcamCheck();
    });

    // Check if camera present
    /*
    function webcamCheck() {
        navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
                const webcam_total = Object.values(devices).filter(
                    (devices) => devices.kind === "videoinput" 
                );
                if (webcam_total.length === 0) setError("No webcam found. ");
                if (!checkForErrors()) console.log('Webcam found :)');
        })
        .catch(function(err) {
            setError(err.name + ": " + err.message);
        });
    }
    */
  
    async function webcamCheck() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) { 
            let stream = null;
            try {
                stream = await navigator.mediaDevices.getUserMedia({video:true});
                showVideoControls();
                video.srcObject = stream;
                video.play();
            } catch(err) {
                setError(err.name + ": " + err.message);
            }

            if (!checkForErrors()) console.log('Webcam found :)');
        }
        else {
            setError("This browser does not support webcam technology");
        }
    }

    function setError(message = "") {
        if (message === "") error = "Missing error text. "
        else error = message;
    }

    function showVideoControls() {
        document.querySelector("#webcam-container").style.display = 'block';
    }
    

    function checkForErrors() {
        if (error.length > 0) {
            document.querySelector("#webcam-error").innerText = error; // or however you want to call them
            return true;
        }
        return false;
    }

//})();
