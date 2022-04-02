//テキスト入力時のイベント　入力文字をSVGのTEXT要素に反映
$(".svg-text").on("input", function (e) {
    let targetTspan = $(this).data("target");
    $(targetTspan).text($(this).val());
});




//画像取得ボタンクリック時のイベント　SVG要素を画像に変換し表示する
$("#create-image").on("click", function (e) {
    //SVG要素をbase64エンコードしDataURI形式に変換
    let svgElem = document.getElementById("svg-generator");
    let svgStr = new XMLSerializer().serializeToString(svgElem);
    let svgBase64 = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgStr)));

    // HTMLCanvasElement オブジェクトを作成する
    let canvas = document.createElement("canvas");
    // CanvasRenderingContext2D オブジェクトを取得する
    let ctx = canvas.getContext("2d");

    // 新たな img 要素を作成
    let image = new Image();
    image.onload = function () {
        //Retina対応しているブラウザだと画像がぼやけるため2倍にする
        canvas.width = image.width * 10;
        canvas.height = image.height * 10;

        //SVG画像をCanvasに描画
        ctx.drawImage(
            image,
            0,
            0,
            image.width * 10,
            image.height * 10,
            0,
            0,
            canvas.width,
            canvas.height
        );

        //Canvasに描画されている画像をBase64にエンコードしDataURI形式でsrc属性に設定
        $("#svg-image").attr("src", canvas.toDataURL("image/png"));

        //bootstrap4のモーダルを表示
        $("#svg-box").modal();
    };
    // Base64にエンコードしたSVG画像を設定
    image.src = svgBase64;
});