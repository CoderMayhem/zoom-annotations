<div>Teachable Machine Image Model - p5.js and ml5.js</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
<script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
<script type="text/javascript">
  // Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/HKBpf5d2u/';
  
  // Video
  let video;
  let flippedVideo;
  let wait;
  let nice;
  let mind;
  let smile;
  let leave;
  let stop;
  let disappoint;
  let waah;
  let swag;
  //Fading
  let fade = 0;
  // To store the classification
  let label = "";
  let current;
  let confidence = 0;

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
    swag = loadImage('ak.jpeg');
  }

  function setup() {
    createCanvas(480, 360);
    // Create the video
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    wait = createVideo('anish.mp4');
    wait.size(width, height);
    wait.hide();
    nice = createVideo('nice.mp4');
    nice.size(width, height);
    nice.hide();
    mind = createVideo('mindBlown.mp4');
    mind.size(width, height);
    mind.hide();
    smile = createVideo('laugh.mp4');
    smile.size(width, height);
    smile.hide();
    leave = createVideo('leave.mp4');
    leave.size(width, height);
    leave.hide();
    stop = createVideo('ruko.mp4');
    stop.size(width, height);
    stop.hide();
    disappoint = createVideo('maaro.mp4');
    disappoint.size(width, height);
    disappoint.hide();
    waah = createVideo('waah.mp4');
    waah.size(100, 100);
    waah.hide();
    swag.resize(width, height);
    current = wait;
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(0);
    //tint(255);
    // Draw the video
    if(label == null){
      label = "Normal";
    }
    
    if(label == "Normal"){
       current.pause();
       image(flippedVideo, 0, 0);
    }

    if(label == "Wait" && confidence >=0.85){
        current.pause();
        video.hide();
        image(wait, 60,40);
        wait.play();
        current = wait;
    } 
    
    if(label == "Nice" && confidence >=0.85){
        current.pause();
        video.hide();
        image(nice, 60, 40);
        nice.play();
        current = nice;
    } 
    
    if(label == "MindBlown" && confidence >=0.85){
        current.pause();
        video.hide();
        image(mind, 60, 40);
        mind.play();
        current = mind;
    }
    
    if(label == "Ak_swag" &&confidence >=0.85){
      current.pause();
      image(swag, 0, 0);
      //fade = 255;
    }
    
    // if(fade>0){
    //   tint(255, fade);
    //   image(swag, 0, 0);
    //   fade -= 10;
    // }
    
    if(label == "Stop" && confidence >=0.80){
        current.pause();
        video.hide();
        image(stop, 60, 40);
        stop.play();
        current = stop;
    }
    
    if(label == "Smile" && confidence >=0.75){
        current.pause();
        video.hide();
        image(smile, 60, 40);
        smile.play();
        current = smile;
    }
    
    if(label == "Leave" && confidence >=0.85){
        current.pause();
        video.hide();
        image(leave, 60, 40);
        leave.play();
        current = leave;
    }
    
    if(label == "Dissapointed" && confidence >=0.85){
        current.pause();
        video.hide();
        image(disappoint, 60, 40);
        disappoint.play();
        current = disappoint;
    }
    
    // if(label == "Kadak" && confidence >=0.30){
    //     current.pause();
    //     video.hide();
    //     image(waah, 0, 0);
    //     waah.play();
    //     current = waah;
    // }
    // // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
    
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove(); 
  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    print(results[0]);
    setTimeout(()=>{
      label = results[0].label;
      confidence = results[0].confidence;
    }, 1500);
    // Classifiy again!
    classifyVideo();
  }
</script>
