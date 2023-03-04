$('.c-openBtn').click(function () {
	$(this).toggleClass('active');
    $('.l-filterContents').toggleClass('panelActive');
    $("body").toggleClass('bgActive');
    $('header,main,.l-searchResult').toggleClass('mainOpacity');
});

$('.l-filterContents a').click(function () {
    $('.c-openBtn').removeClass('active');
    $('.l-filterContents').removeClass('panelActive');
    $('body').removeClass('bgActive');
    $('header,main,.l-searchResult').removeClass('mainOpacity');
});

$('.l-filterContents .c-closeBtn').click(function () {
  $('.c-openBtn').removeClass('active');
  $('.l-filterContents').removeClass('panelActive');
  $('body').removeClass('bgActive');
  $('header,main,.l-searchResult').removeClass('mainOpacity');
});

$('.l-selectBlock_ttl').on('click', function() {
  $(this).next('.l-selectBlock_content').slideToggle();
	if($(this).hasClass('close')){
		$(this).removeClass('close');
	}else{
		$(this).addClass('close');
	}
});

$(".p-accordionBox__under").on("click", function() {
  $(".p-accordionBox__under").toggleClass("checked");
  if(!$('input[name="under"]').prop("checked")) {
    $(".p-accordionBox__under input").prop("checked", true);
  } else {
    $(".p-accordionBox__under input").prop("checked", false);
  }
});

$(".p-accordionBox__face").on("click", function() {
  $(".p-accordionBox__face").toggleClass("checked");
  if(!$('input[name="face"]').prop("checked")) {
    $(".p-accordionBox__face input").prop("checked", true);
  } else {
    $(".p-accordionBox__face input").prop("checked", false);
  }
});

$(function(){
  var box = $('.js_target');
  var conditions = $('.js_conditions');
  var findConditions;
  var data_check = 0;
  var condition ={};
  $('.js_denominator').text(box.length);

  for(var i = 0; i < conditions.length; i++){
    currentType = conditions[i].getAttribute('data-kuni');
    condition[currentType] = [];
  }

  function setConditions(){
    count = 0;
    box.removeClass('js_selected');

    for(var i = 0; i < conditions.length; i++){
      currentType = conditions[i].getAttribute('data-kuni');
      findConditions = conditions[i].querySelectorAll('input');

      for(var n = 0; n< findConditions.length; n++){
        if(findConditions[n].checked){
          condition[currentType][findConditions[n].value] = true;
          checkcount++
        } else {
          condition[currentType][findConditions[n].value] = false;
        }
        if(findConditions.length === n+1){
          if(checkcount === 0){
            for(var t = 0; t < findConditions.length; t++){
              condition[currentType][findConditions[t].value] = true;
            }
          }
          checkcount = 0;
        }
      }
    }

    for(var m = 0, len = box.length; m< len; ++m){

      for(var i = 0; i < conditions.length; i++){
        currentType = conditions[i].getAttribute('data-kuni');
        var currentBoxTypes = $(box[m]).data(currentType).split(',');
        for(var j = 0; j < currentBoxTypes.length; j++){
          if(condition[currentType][currentBoxTypes[j]]){
            data_check++;
            break;
          } else {
          }
        }
      }

        if(data_check === conditions.length){
          count++;
          $(box[m]).addClass('js_selected');
        }else{
        }
        data_check = 0;
    }
    $('.js_numerator').text(count);//件数表示の分子をセット
  }

  setConditions();
  $(document).on('click','input',function(){
    setConditions();
  });

  $(document).on('click','.js_release',function(){
    $('.bl_selectBlock_check input').each(function(){
        $(this).prop('checked', false);
    });
    setConditions();

  });

});
