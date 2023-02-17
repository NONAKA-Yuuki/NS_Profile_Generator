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

// 画像アップロード
function previewImage(hoge) {
  var fileData = new FileReader();
  fileData.onload = (function(e) {
    const base64Text = e.currentTarget.result
    $icon = $("#js-icon_image");
    $icon.attr(
      "xlink:href",
      base64Text
    )
  });
  fileData.readAsDataURL(hoge.files[0]);
}

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
  } else if(targetTspan == "#text-13") {  // フリースペース
    let val_str = $(this).val();
    let val = val_str.length;

  }
   else {
    $(targetTspan).text($(this).val());
  }
});


/**********************/
/* フリースペーステキスト */
/**********************/
let input_dom = document.querySelector('.text-freespace'); //入力要素
let row_string_cnt = 20; //一行あたりの文字数

input_dom.addEventListener('input', function(e){
	freespaceInput();
});

function freespaceInput() {
  //入力文字を1文字毎に配列化
	var arrayText = input_dom.value.split('');
  //出力用の配列を用意
	var arrayRow = [];
	arrayRow[0] = '';
	var row_cnt = 0;
  //文字表示ループ内で3つのテキストエリアをカウントアップ、ダウンできるように配列にする
  var freespace_textarea = ['#text-13','#text-14','#text-15'];

  //60文字以上だったらエラーにする
  if(arrayText.length >= 60) {
    alert('60文字までです！');
  }

  //20文字ごとの配列にする
	for(var i=0; i<arrayText.length; i++){
		var text = arrayText[i];
		if(arrayRow[row_cnt].length >= row_string_cnt){
			row_cnt++;
			arrayRow[row_cnt] = '';
		}
		if(text == "\n"){
			row_cnt++;
			arrayRow[row_cnt] = '';
			text = '';
		}
		arrayRow[row_cnt] += text;
	}
  //文字表示
	for(var i=0; i<3; i++){
		$(freespace_textarea[i]).text(arrayRow[i]);
	}
  //バグ対応
  if(arrayRow.length == 1) {
    $(freespace_textarea[1]).text("");
    $(freespace_textarea[2]).text("");
  }
  else if(arrayRow.length == 2) {
    $(freespace_textarea[2]).text("");
  }
}






//画像取得ボタンクリック時のイベント　SVG要素を画像に変換し表示する
$("#js-create-image").on("click", function(e) {
  //SVG要素をbase64エンコードしDataURI形式に変換
  let svgElem = document.querySelector('#svg-generator');
  let svgStr = new XMLSerializer().serializeToString(svgElem);
  let svgEncode = encodeURIComponent(svgStr);
  let svgUnescape = unescape(svgEncode);
  let svgBase64 = btoa(svgUnescape);
  let svgDataUrl = `data:image/svg+xml;charaset=utf-8;base64,${svgBase64}`;

  let imgElem = document.getElementById("svg-image");

  //console.log(svgUnescape);

  // HTMLCanvasElement オブジェクトを作成する
  let canvas = document.createElement("canvas");
  // CanvasRenderingContext2D オブジェクトを取得する
  let ctx = canvas.getContext("2d");

  // 新たな img 要素を作成
  let image = new Image();

  // Base64にエンコードしたSVG画像を設定
  image.src = svgDataUrl;

  image.onload = function() {
    //console.log(image.width, image.height);
    canvas.width = 1500;
    canvas.height = 1500;

    //SVG画像をCanvasに描画
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    //Canvasに描画されている画像をBase64にエンコードしDataURI形式でsrc属性に設定
    let datauri = canvas.toDataURL("image/png");
    imgElem.src = datauri;

    document.getElementById("download").href = datauri;
  };
  image.onerror = (error) => {
    console.log(error)
  };
  // モーダルを表示
  $('#modalArea').fadeIn();
});

$(function() {
  $('closeModal , #modalArea').click(function() {
    $('#modalArea').fadeOut();
  });
});