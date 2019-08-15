$(function(){
  $.get("http://codeit.ai/codeitCandidates/serverFrontendTest/company/getList", onAjaxSuccess1); // - отправим запрос на сервер
  startLoadingAnimation();  // - запустим анимацию загрузки

  function onAjaxSuccess1(data) // - функция завершения запроса
  {
    stopLoadingAnimation();
    var companyData = data;

    // дальнейшая работа с полученными от сервера данными
    var totalCompanies = Object.keys(companyData.list).length ;
    $('.addTotalCompanies').prepend('<div class="totalCompanies">' + totalCompanies + '</div>');

    //вытягиваем имена компаний и добавляем их в блок
    for (let i = 0; i < totalCompanies; i++) {
      var company = companyData.list[i].name;
      $('.addList').append('<div class="list-group-item company">' + company + '</div>');
    }

    //вытягиваем имена партнеров и добавляем их в блок
    $('.list-group-item').on('click', function() {
      $("div.partners").remove()
      var companyName = this.innerHTML;
      for (let i = 0; i < totalCompanies; i++) {
        if (companyName == companyData.list[i].name) {
          var totalPartners = Object.keys(companyData.list[i].partners).length ;
          for(let j = 0; j < totalPartners; j++){
            var partnersName = (companyData.list[i].partners[j].name);
            var partnersValue = (companyData.list[i].partners[j].value);
            $('.addCompanyPartners').prepend('<div class="list-group-item partners">' + partnersName + ' has ' + partnersValue + ' percent act this company' + '</div>');
            $('.companyPartners').css('display','block');
          }
        }
     }
    })

    //скрывает блок бартнеров
    $('.close').on('click', function() {
      $('.companyPartners').css('display','none');
      $("div.partners").remove()
    })

    //вытягиваем локации
    let arrLocations = [];
    for (let i = 0; i < totalCompanies; i++) {
      var totalLocations = Object.keys(companyData.list[i].location).length ;
      for(let j = 0; j < totalLocations; j++){
        arrLocations [i] = companyData.list[i].location.name;
     }
    }
    arrLocations.sort();

    let locName = [];
    for (let i = 0; i < arrLocations.length; i++) {
      if (arrLocations[i] !== arrLocations[i + 1]) {
        locName.push(arrLocations[i]);
      }
    }

    //подсчет локаций
    let arrSum = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < arrLocations.length; i ++) {
      if (locName[0] == arrLocations[i]) {
        arrSum[0] += 1;
      }else if(locName[1] == arrLocations[i]) {
        arrSum[1] += 1;
      }else if(locName[2] == arrLocations[i]) {
        arrSum[2] += 1;
      }else if(locName[3] == arrLocations[i]) {
        arrSum[3] += 1;
      }else if(locName[4] == arrLocations[i]) {
        arrSum[4] += 1;
      }else if(locName[5] == arrLocations[i]) {
        arrSum[5] += 1;
      }
    }

    //рисуем график
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
      type: 'polarArea',

      // The data for our dataset
      data: {
          labels: [locName[0], locName[1], locName[2], locName[3], locName[4], locName[5]],
          datasets: [{
              backgroundColor: ['#DC143C', '#FFA500', '#008000', '#000080', '#9400D3', '#00CED1'],
              borderColor: '#fafafa',
              data: arrSum
          }]
      },

      // Configuration options go here
      options: {}
    });
  }

  function startLoadingAnimation() // - функция запуска анимации
  {
    // найдем элемент с изображением загрузки и уберем невидимость:
    var imgObj = $(".loadImg");
    imgObj.show();
  }

  function stopLoadingAnimation() // - функция останавливающая анимацию
  {
    $(".loadImg").hide();
  }
});
