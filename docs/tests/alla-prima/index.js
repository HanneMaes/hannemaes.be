window.addEventListener("load",()=>{
    console.log("dom loaded")

    const setCanvasToScreen = (cnvs) =>{
        //console.log(window.innerHeight,window.innerWidth)
        cnvs.height = window.innerHeight
        cnvs.width = window.innerWidth
    }

    
    const canvas = document.getElementById("canvas")
   
    setCanvasToScreen(canvas)
    window.addEventListener('resize',()=>{setCanvasToScreen(canvas)})

    const ctx = canvas.getContext("2d")
    let videoContainer
    
    
    //https://riptutorial.com/html5-canvas/example/14974/basic-loading-and-playing-a-video-on-the-canvas-
    //
    let video = document.createElement("video"); // create a video element
    
    video.src = "./art/bg.mp4"; // hanne
    // the video will now begin to load.
    // As some additional info is needed we will place the video in a
    // containing object for convenience
    video.muted = true;
    video.autoPlay = true; // ensure that the video does not auto play
    video.loop = true; // set the video to loop.
   
    videoContainer = {  // we will add properties as needed
        video : video,
        ready : false,   
    };
    
    video.oncanplay = readyToPlayVideo; // set the event to the play function that 
    // can be found below
    let fistImg = new Image()
        fistImg.src = "./art/hanne maes.png" // hanne

    // hanne
    function fourDigitsNumber(number) {
        number = number.toString();
        while(number.length < 4) {
            number = "0" + number;
        }
        return number;
    }
    
    /* **** */
    /* MASK */
    /* **** */

    let layerList = []

    // hanne
    for (let i = 0; i < 50; i++) {
        layerList.push(new Image())
        layerList[i].src = "./art/mask/" + fourDigitsNumber(i + 1) + ".png"
        console.log('layerList[i].src:', layerList[i].src)
    }
    console.log(layerList)

    // hanne
    /*layerList.push(new Image())
    layerList.push(new Image())
    layerList.push(new Image())

    layerList[0].src = "./art/layer1.png"
    layerList[1].src = "./art/layer2.png"
    layerList[2].src = "./art/layer3.png"*/

    let currentLayer= null;
    let currentPos = 0;
    layerList[0].onload = () =>{
        currentLayer = layerList[0]
    }

    fistImg.onload = ()=>{
        ctx.drawImage(fistImg, 0, 0); // hanne
    }
    setInterval(()=>{
        if(currentPos < layerList.length - 1){
            currentPos++;
            currentLayer = layerList[currentPos]
        }
        else{
            currentPos = 0
            currentLayer = layerList[0]
        }
    }, 6000) // hanne

    /* ***** */
    /* LINES */
    /* ***** */

    let layerListLines = []

    // hanne
    for (let i = 0; i < 9; i++) {
        layerListLines.push(new Image())
        layerListLines[i].src = "./art/lines/" + fourDigitsNumber(i + 1) + ".png"
        console.log('layerListLines[i].src:', layerListLines[i].src)
    }
    console.log(layerListLines)

    // hanne
    /*layerListLines.push(new Image())
    layerListLines.push(new Image())
    layerListLines.push(new Image())

    layerListLines[0].src = "./art/layer1.png"
    layerListLines[1].src = "./art/layer2.png"
    layerListLines[2].src = "./art/layer3.png"*/

    let currentLayerMask= null;
    let currentPosMask = 0;
    layerListLines[0].onload = () =>{
        currentLayerMask = layerListLines[0]
    }

    fistImg.onload = ()=>{
        ctx.drawImage(fistImg, 0, 0); // hanne
    }
    setInterval(()=>{
        if(currentPosMask < layerListLines.length - 1){
            currentPosMask++;
            currentLayerMask = layerListLines[currentPosMask]
        }
        else{
            currentPosMask = 0
            currentLayerMask = layerListLines[0]
        }
    }, 3000) // hanne
                         
    function readyToPlayVideo(event){ // this is a referance to the video
        // the video may not match the canvas size so find a scale to fit
        videoContainer.scale = Math.min(
                             canvas.width / this.videoWidth, 
                             canvas.height / this.videoHeight); 
        videoContainer.ready = true;
        videoContainer.video.play();
        // the video can be played so hand it off to the display function
        requestAnimationFrame(updateCanvas);
        
    }


    function updateCanvas(){
        ctx.clearRect(0,0,canvas.width,canvas.height); // Though not always needed 
                                                         // you may get bad pixels from 
                                                         // previous videos so clear to be
                                                         // safe
        // only draw if loaded and ready
        if(videoContainer !== undefined && videoContainer.ready){ 
            // find the top left of the video on the canvas
            let scale = videoContainer.scale;
            let vidH = videoContainer.video.videoHeight;
            let vidW = videoContainer.video.videoWidth;
            let frIH = fistImg.height - 20
            let frIW = fistImg.width - 20
            let top = canvas.height / 2 - (vidH /2 ) * scale;
            let left = canvas.width / 2 - (vidW /2 ) * scale;
            // now just draw the video the correct size
            ctx.drawImage(videoContainer.video, left, top, vidW * scale, vidH * scale);
            ctx.drawImage(fistImg,left, top, frIW * scale, frIH * scale );
            if(currentLayer !== null){
                ctx.drawImage(currentLayer, left, top, vidW * scale, vidH * scale)
            }
            if(currentLayerMask !== null){
                ctx.drawImage(currentLayerMask, left, top, vidW * scale, vidH * scale)
            }
            if(videoContainer.video.paused){ // if not playing show the paused screen 
                drawPayIcon();
            }
        }
        // all done for display 
        // request the next frame in 1/60th of a second
        requestAnimationFrame(updateCanvas);
    }
})