

var canvas = null;
var context = null;
var image = null;
var fixFileObject = null;
var iconWidth = 80;
var iconHeight = 80;
var messageArea = null;

document.addEventListener("DOMContentLoaded", function() {
    canvas = document.getElementById("thumbnail");
    context = canvas.getContext("2d");

    messageArea = document.getElementById("message")

    setFileEventListenner();
});

function setFileEventListenner() {
    document.getElementById("file-selecter").addEventListener("change", createPreview);
}

function createPreview(event) {

    fixFileObject = null;

    var fileObject = event.target.files[0];

    if (typeof fileObject === "undefined") {
        return;
    }

    if (fileObject.type.match(/^image\/(jpeg|png)$/) === null) {
        // jpegとpng以外の場合はクリアして終了
        var fileArea = document.getElementById("file-input");
        fileArea.innerHTML = fileArea.innerHTML;
        setFileEventListenner();
        return;
    }

    fixFileObject = fileObject;

    image = new Image();

    var reader = new FileReader();

    reader.onload = (function(fileObject) {
        return function(event) {
            image.src = event.target.result;// base64
        };
    })(fileObject);

    image.onload = function() {
        drawCanvas();
    }

    reader.readAsDataURL(fileObject);
}

function drawCanvas() {
    if (image !== null) {
        var shortLength = image.width < image.height ? image.width : image.height;
        var widthCutLength = image.width - shortLength;
        var heightCutLength = image.height - shortLength;

        canvas.width = iconWidth;
        canvas.height = iconHeight;
        context.clearRect(0, 0, iconWidth, iconHeight);
        context.drawImage(image, widthCutLength / 2, heightCutLength / 2, shortLength, shortLength, 0, 0, iconWidth, iconHeight);
    }
}

function submitResizeFile() {
    if (image !== null && fixFileObject !== null) {

        var resizeFileObject = null;

        var image64Data = canvas.toDataURL(fixFileObject.type);
        image64Data = image64Data.split(',')[1];
        imageData = atob(image64Data);
        var unit8Array = new Uint8Array(imageData.length);
        unit8Array.forEach(function(element, index) {
            unit8Array[index] = imageData.charCodeAt(index);
        });
        resizeFileObject = new File(
            [unit8Array],
            fixFileObject.name,
            {
                type: fixFileObject.type
            }
        );

        var formData = new FormData();
        formData.append("file", resizeFileObject);

        // input type file の 値はjavascriptで上書き出来ないのでajaxで送信する
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    messageArea.innerHTML = '<span style="color: green;">ファイルの送信に成功しました。</span>';
                } else {
                    messageArea.innerHTML = '<span style="color: red;">ファイルの送信に失敗しました。</span>';
                }
            }
        }
        xhr.open("POST", "/root/execute_upload");
        xhr.send(formData);
    }
}