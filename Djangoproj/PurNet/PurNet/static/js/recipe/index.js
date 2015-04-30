jQuery(document).ready(function () {
  // index page show bg config
  jQuery('div.show-img.lower.courses').each(function (i) {
    jQuery(this).css('background-position', -160-200*i);
  });
  jQuery('div.show-img.lower.cuisines').each(function (i) {
    jQuery(this).css('background-position', -160-200*i);
  });
  jQuery('div.show-img.lower.sources').each(function (i) {
    jQuery(this).css('background-position', -160-200*i);
  });
  jQuery('div.show-img.lower.diets').each(function (i) {
    jQuery(this).css('background-position', -160-200*i);
  });

  // hover caption effect
  jQuery('a.ca-img-link .carousel1-caption').hide();
  jQuery('a.ca-img-link').unbind('hover');
  jQuery('a.ca-img-link').hover(
    function () {
      jQuery(this).children('.carousel1-caption').fadeIn('slow');
    }, function () {
      jQuery(this).children('.carousel1-caption').fadeOut('slow');
    }
  );

  // init ul.lower-level structure
  jQuery('ul.lower-level').each(function () {
    var numChild = jQuery(this).find('li').length;
    if (numChild > 5)
      jQuery(jQuery(this).find('li:first')).before(jQuery(jQuery(this).find('li:last')));
    else
      jQuery(jQuery(this).find('li:first')).before(jQuery(jQuery(this).find('li:last')).clone(false));
  });

  resizeDiv();
  jQuery(window).resize(resizeDiv);

	/*
  jQuery('ul.upper-level > li:not(.hot)').toggle(
    function (event){
      showEffect(jQuery(this), event);
      return false;
    },
    function (event){
      hideEffect(jQuery(this), event);
      return false;
    }
  );
  */
  //jQuery('a#nItem').click(function (event) {slideControl('right' ,jQuery(this), event); return false;});
  //jQuery('a#pItem').click(function (event) {slideControl('left' ,jQuery(this), event); return false;});

  // login bar
  jQuery('div.logbar').hover(
    function () {
      jQuery(this).stop(true).animate({
        'right': '0'
      }, {duration: 500, complete: function () {
        // jQuery(this).next().show();
      }});
      return false;
    }, function () {
      jQuery(this).stop(true).animate({
        'right': '-90'
      }, {duration: 500, complete: function () {
        // jQuery(this).next().show();
      }});
      return false;
    });
});  
  
var move = 0;
var showEffect = function (obj, event) {
  // obj.siblings().unbind(event);
  move = jQuery('ul.upper-level > li:nth-child(3)').position().left - jQuery(obj).position().left;
  var dataTarget = jQuery(obj).attr('id');
  var numChild = jQuery('ul.lower-level[data-target="'+dataTarget+'"]').children().length;
  jQuery('ul.upper-level > li').animate({
    'left': '+='+move
  }, {queue:false, duration: 700, complete: function () {
    if (numChild > 6) { // here is 6, since there is one clone object befor the "first" one
      jQuery('a.show-control[href="#'+dataTarget+'"]').show();
    }
    jQuery('ul.lower-level[data-target="'+dataTarget+'"]').show();
    // obj.siblings().click(function() {showEffect(jQuery(this));});
  }});
  jQuery(obj).siblings().fadeOut(700);
  jQuery('div.content.search-form').fadeOut(700);
};

var hideEffect = function (obj, event) {
  // obj.siblings().unbind(event);
  var dataTarget = jQuery(obj).attr('id');
  jQuery('ul.lower-level[data-target="'+dataTarget+'"]').hide();
  jQuery('a.show-control[href="#'+dataTarget+'"]').hide();
  jQuery('ul.upper-level > li').animate({
    'left': '-='+move
  }, {queue:false, duration: 700, complete: function () {
    // obj.siblings().click(function() {hideEffect(jQuery(this));});
  }});
  jQuery(obj).siblings().fadeIn(700);
  jQuery('div.content.search-form').fadeIn(700);
};

/* the slide control function */ 
function slideControl(direction, obj, event){
  obj.unbind(event);
  var val = obj.attr('href').slice(1);
  var itemWidth = jQuery('ul.lower-level li').outerWidth();  

  if(direction == 'left'){
      var leftIndent = parseInt(jQuery('ul.lower-level').css('left')) + itemWidth;  
  }else{ 
      var leftIndent = parseInt(jQuery('ul.lower-level').css('left')) - itemWidth;  

  }  

  jQuery('ul.lower-level[data-target="'+val+'"]').animate({
    'left' : leftIndent
  },{queue: false, duration: 500, complete: function(){
    if(direction == 'left'){
      obj.click(function (event) {slideControl('left' ,jQuery(this), event); return false;});
      jQuery(jQuery('ul.lower-level > li[data-target="'+val+'"]').first()).before(
          jQuery(jQuery('ul.lower-level > li[data-target="'+val+'"]').last()));  
    }else{
      obj.click(function (event) {slideControl('right' ,jQuery(this), event); return false;});
      jQuery(jQuery('ul.lower-level > li[data-target="'+val+'"]').last()).after(
          jQuery(jQuery('ul.lower-level > li[data-target="'+val+'"]').first())); 
    }

    jQuery('ul.lower-level').css({'left' : '-130px'});  
  }});   
}

var needResize = true;
function resizeDiv() {
  var winHeight = window.innerHeight;

  /* search form position */
  jQuery('div.content.search-form').css('bottom', winHeight*0.2);
  /*********************************************************************************************/

  /* outer upper-level div position */
  var upperWidth = jQuery('ul.upper-level > li').width()*5;
  var upperHeight = jQuery('ul.upper-level > li').height();
  var upperLeft = (window.innerWidth- upperWidth)/2;
  jQuery('ul.upper-level > li').css('top', winHeight*0.35);
  /*********************************************************************************************/

  /* outer lower-level div position */
  var lowerWidth = jQuery('ul.lower-level > li').width()*5;
  var lowerHeight = jQuery('ul.lower-level > li').height();
  var lowerLeft = (window.innerWidth- lowerWidth)/2;
  jQuery('div.circular-show-outer.lower-level').css('top', winHeight*0.35+200); // set lower slider's outer top pos
  jQuery('div.circular-show-outer.lower-level').css('left', lowerLeft); // set lower slider's outer left pos
  jQuery('div.circular-show-outer.lower-level').css('width', lowerWidth); // set lower slider's outer width
  jQuery('div.circular-show-outer.lower-level').css('height', lowerHeight); // set lower slider's outer height = width
  /*********************************************************************************************/

  /* slider control position */
  jQuery('a.show-control').css('top', winHeight*0.35+230);
  /*********************************************************************************************/

  /* search form icon position */
  // console.log(jQuery('div.content.search-form').css('bottom').slice(0,-2));
  jQuery('div.search-div span').css('bottom', parseInt(jQuery('div.content.search-form').css('bottom').slice(0,-2))+32);
  jQuery('div.search-div span').css('left', jQuery('div.content.search-form').position().left-208+15);
  /*********************************************************************************************/
  // jQuery('ul.lower-level').each(function () {
  //   jQuery(this).find('li').each(function (i) {
  //     jQuery(this).css('left', 144*i);
  //   });
  // });
  if (needResize){
    jQuery('ul.upper-level > li').each(function (i) {
      jQuery(this).css('left', upperLeft + 144*i);
    });
  }
  // jQuery('ul.lower-level').css('left', upperLeft);
  jQuery('a#pItem').css('left', lowerLeft-60);
  jQuery('a#nItem').css('left', lowerLeft+lowerWidth+20); 
  // jQuery('ul.lower-level').css('width', 144*5);
  // jQuery('ul.lower-level').css('height', jQuery('ul.lower-level > li > a').height()+10);
}

function nextItem (obj, event) {
  obj.unbind(event);
  var val = obj.attr('href').slice(1);
  var numChild = jQuery('ul.lower-level > li[data-target="'+val+'"]').length;
  var $firstChild = jQuery('ul.lower-level > li[data-target="'+val+'"]').first();
  console.log($firstChild.html());
  jQuery('ul.lower-level > li[data-target="'+val+'"]').stop(true).animate({
    'left': '-=144'
  }, {queue: false, duration: 500, complete: function () {
    obj.click(function() {nextItem(obj); return false;});
    console.log(numChild);
    console.log($firstChild.position().left+144*numChild);
    $firstChild.css('left', $firstChild.position().left+144);
    $firstChild.appendTo(jQuery('ul.lower-level[data-target="'+val+'"]'));
  }});
}

function prevItem (obj, event) {
  obj.unbind(event);
  var val = obj.attr('href').slice(1);
  var numChild = jQuery('ul.lower-level > li[data-target="'+val+'"]').length;
  var firstLeft = jQuery('ul.lower-level > li[data-target="'+val+'"]').first().position().left;
  if (firstLeft == 0) {
    jQuery('ul.lower-level > li[data-target="'+val+'"]').stop(true).animate({
      'left': '-='+(numChild-5)*144
    }, {queue: false, duration: 500, complete: function () {
      obj.click(function() {prevItem(obj); return false;});
    }});
  } else {
    jQuery('ul.lower-level > li[data-target="'+val+'"]').stop(true).animate({
      'left': '+=144'
    }, {queue: false, duration: 500, complete: function () {
      obj.click(function() {prevItem(obj); return false;});
    }});
  }
}
