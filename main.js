Webcam.set({
    width:350,
    height:310,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';

    });
}

console.log('ml5 version : ', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/81KDAYp99/model.json', modelLoaded);

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function modelLoaded()
{
    console.log('Model Loaded!! :)');
}

function gotResult(error, results)
{
    if(error)
    {
       console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_gesture_name1").innerHTML = results[0].label;
        document.getElementById("result_gesture_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if(results[0].label == "Thumbs Up")
        {
            document.getElementById("update_gesture1").innerHTML = "&#128077;";
        }

        if(results[0].label == "Peace")
        {
            document.getElementById("update_gesture2").innerHTML = "&#9996;";
        }

        if(results[0].label == "Point Up")
        {
            document.getElementById("update_gesture3").innerHTML = "&#128070;";
        }
    }


}