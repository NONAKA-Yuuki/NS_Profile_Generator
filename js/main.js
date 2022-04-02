// SP版ヘッダーのドロワー開閉
$(function() {
    $('#js-header-button').on('click', function() {
        $(this).toggleClass('open');
        $('#js-header-menu').toggleClass('open');
    });
});

$('.header__nav__list a[href]').on('click', function(event) {
    $('#js-header-button').trigger('click');
});

// N・S高切り替えラジオボタン
function NS_selectSwitch() {
  let n_image = document.getElementById('js-n_image')
  let s_image = document.getElementById('js-s_image')
  let check = document.getElementsByClassName('js-ns_select')

  if(check[0].checked) {
    n_image.style.display = "block";
    s_image.style.display = "none";
  } else if(check[1].checked) {
    n_image.style.display = "none";
    s_image.style.display = "block";
  } else {
    console.log('Error: js-ns_selectが両方null');
  }
}
window.addEventListener('load', NS_selectSwitch());



//テキスト入力時のイベント　入力文字をSVGのTEXT要素に反映
$(".svg-text").on("input", function (e) {
  let targetTspan = $(this).data("target");
  if(targetTspan == "#text-6") {
    $(targetTspan).text($(this).val());
    $('#text-7').text('');
    $('#text-8').text('');
  } else if(targetTspan == "#text-7") {
    $('#text-6').text('');
    $(targetTspan).text($(this).val());
    $('#text-8').text('');
  } else if(targetTspan == "#text-8") {
    $('#text-6').text('');
    $('#text-7').text('');
    $(targetTspan).text($(this).val());
  } else if(targetTspan == "#text-13") {
    let val_str = $(this).val();
    let val = val_str.length;
    if(val <= 20) {
      $('#text-13').text($(this).val());
    } else if(20 < val && val <= 40) {
      let val_14 = val_str.substr(20,40);
      $('#text-14').text(val_14);
    } else if(40 < val && val <= 60) {
      let val_15 = val_str.substr(40,60);
      $('#text-15').text(val_15);
    } else {
      console.log('Error: 文字数が異常値');
    }
  }
   else {
    $(targetTspan).text($(this).val());
  }
});


//画像取得ボタンクリック時のイベント　SVG要素を画像に変換し表示する
$("#js-create-image").on("click", function(e) {
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
  image.onload = function() {
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
  };
  // Base64にエンコードしたSVG画像を設定
  image.src = svgBase64;
});