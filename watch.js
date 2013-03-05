window.addEventListener('DOMContentLoaded',
  function() {
    // 結果の表示先（<div>要素）を取得
    var latitude  = document.querySelector('#latitude');
    var longitude = document.querySelector('#longitude');
    var heading   = document.querySelector('#heading');
    var speed     = document.querySelector('#speed');
    var timeH     = document.querySelector('#time_hours');
    var timeM     = document.querySelector('#time_minutes');
    var stop      = document.querySelector('#stop');
    // Geolocation APIが利用できるかを判定
    if (navigator.geolocation) {
      // 現在の位置情報を定期的に取得
      var id = navigator.geolocation.watchPosition(
        // 位置情報の取得に成功した場合の処理
        function(pos) {
          latitude.innerHTML = pos.coords.latitude;
          longitude.innerHTML = pos.coords.longitude;
          heading.innerHTML = pos.coords.heading;
          speed.innerHTML = pos.coords.speed;
          var date = pos.timestamp;
          if( typeof(date) == "number" ) {
                date = new Date(date);
                timeH.innerHTML = date.getHours();
                timeM.innerHTML = date.getMinutes();
          }
        },
        // 位置情報の取得に失敗した場合の処理
        function(err) {
          var msgs = [
            err.message,
            '位置情報の取得を許可されていません。',
            '位置情報の取得に失敗しました。',
            '位置情報を取得中にタイムアウトしました。'
          ];
          window.alert(msgs[err.code]);
        },
        // 位置取得の動作オプションを設定
        {
          timeout : 10000,
          maximumAge : 0,
          enableHighAccuracy: true
        }
      );
    } else {
      window.alert('Geolocation API対応ブラウザでアクセスしてください。');
    }
  }, false
);