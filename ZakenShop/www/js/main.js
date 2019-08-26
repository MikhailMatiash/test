// hide product add block
function close() {
  $('.addProductBlock').css('display','none');
  $('#form')[0].reset();
}

var cart = {}; // корзина

function init() {
    //вычитуем файл goods.json
    $.getJSON("../goods.json", goodsOut);
}

function goodsOut(data) {
    // вывод на страницу
    console.log(data);
    var out='';
    for (var key in data) {
        out +='<div class="productBlock">';
        out +='<div class="productImg">';
        out +=`<img src="../img/${data[key].img}" alt="Product">`;
        out +='</div>';
        out +='<div class="productDescription">';
        out +=`Наименование: <span class="name">${data[key].name}</span><br><br>`;
        out +=`<span class="description">${data[key].description}</span><br><br>`;
        out +=`Цена: <span class="cost">${data[key].cost} грн.</span><br><br>`;
        out +='</div>';
        out +='<div class="productButton">';
        out +=`<button class="addToCart btn btn-primary" name="${data[key].name}" data-id="${key}">Купить</button>`;
        out +='</div>';
        out +='<div class="productButton">';
        out +=`<button class="btn btn-primary delGoods" data-id="${key}">Удалить</button>`;
        out +='</div>';
        out +='</div>';
    }
    $('.goodsOut').html(out);
    $('.addToCart').on('click', addToCart);
    $('.delGoods').on('click', function() {
      var id = $(this).attr('data-id');
      delete data[id];
      goodsOut(data);
    });
    $('.create').on('click', function() {
      var formData = $('#form').serializeArray();
      console.log(formData);
      var newGoodsName = document.getElementById("name").value;
      var newGoodsDescription = document.getElementById("description").value;
      var newGoodsPrice = document.getElementById("price").value;
      var newGoodsImgName = document.getElementById("imgName").value;
      var newGoodsArt = document.getElementById("art").value;

      if (newGoodsName.length > 3 && newGoodsDescription.length > 3 && newGoodsPrice.length > 1 && newGoodsImgName.length > 4 && newGoodsArt.length > 4){
        var newData = {};
        newData[newGoodsArt] = {"name": newGoodsName, "cost": newGoodsPrice, "description": newGoodsDescription, "img": newGoodsImgName}
        $.extend(true, data, newData)

        goodsOut(data);
        close();
      }else{
        alert("Введите коректные данные")
      }
    });
}


function addToCart() {
    //добавляем товар в корзину
    var name = $(this).attr('name');
    // console.log(id);
    if (cart[name]==undefined) {
        cart[name] = 1; //если в корзине нет товара - делаем равным 1
    }
    else {
        cart[name]++; //если такой товар есть - увеличиваю на единицу
    }
    showMiniCart();
    saveCart();
}

function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function showMiniCart() {
    //показываю мини корзину
    var out="";
    for (var key in cart) {
        out += [key] +': '+ cart[key]+'<br>';
    }
    $('.miniCart').html(out);
}

function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}


$( document ).ready(function() {
  // show product add block
  $('.addButton').on('click', function() {
    $('.addProductBlock').css('display','block');
  })

  $('.close').on('click', close );

  init();
  loadCart();
});
