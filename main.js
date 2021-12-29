Webcam.set({
    width:350,
    height:350,
    image_format:"png",
    png_quality:90
    });
    camera=document.getElementById("camera");
    
    Webcam.attach("#camera");
    
    function take_snapshot(){
     
        Webcam.snap(function(data_uri){
            document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'"/>';
        });
    }
    console.log("ml5 version:",ml5.version);
    
    classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Igs4dv7cG/model.json",modelLoaded);
    function modelLoaded(){
        console.log("model Loaded!");
    } 
    function check(){
        img=document.getElementById("captured_img");
        classifier.classify(img, gotResult);
    }
    function gotResult(error,results){
        if(error){
            console.error(error);
        } 
        else{
            console.log(results);
            document.getElementById("result_emotion_name").innerHTML=results[0].label;
            document.getElementById("result_emotion_name2").innerHTML=results[1].label;
            prediction_1=results[0].label;
            prediction_2=results[1].label;
            speak();
            if(results[0].label=="Best"){
                document.getElementById("update_emoji").innerHTML="&#128077;";
            }
            if(results[0].label=="Amazing"){
              document.getElementById("update_emoji").innerHTML="&#128076;";
          }
          if(results[0].label=="Victory"){
            document.getElementById("update_emoji").innerHTML="&#9996;"; 
      }
    }
}