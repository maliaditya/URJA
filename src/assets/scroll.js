var window_height
var header_height
var doc_height
var posTop_s1
var posBottom_s1
var posTop_s2
var posBottom_s2
$(document).ready(function () {
  getValues()
})

$(window).scroll(function (event) {
  var scroll = $(window).scrollTop()

  if (scroll < posTop_s1) {
    $('.sticky').removeClass('fixy')
    $('.sticky').removeClass('bottom')
  }

  if (scroll > posTop_s1) {
    $('.sticky').removeClass('fixy')
    $('.sticky').removeClass('bottom')
    $('#s1 .sticky').addClass('fixy')
  }
  if (scroll > posBottom_s1) {
    $('.sticky').removeClass('fixy')
    $('.sticky').removeClass('bottom')
    $('#s1 .sticky').addClass('bottom')
    $('.bottom').css({ 'max-height': window_height + 'px' })
  }

  if (scroll > posTop_s2 && scroll < posBottom_s2) {
    $('.sticky').removeClass('fixy')
    $('.sticky').removeClass('bottom')
    $('#s2 .sticky').addClass('fixy')
  }
})

function getValues() {
  window_height = $(window).height()
  doc_height = $(document).height()
  header_height = $('header').height()

  //get heights first
  var height_s1 = $('#s1').height()
  var height_s2 = $('#s2').height()

  //get top position second
  posTop_s1 = header_height
  posTop_s2 = posTop_s1 + height_s1

  //get bottom position 3rd
  posBottom_s1 = posTop_s2 - header_height
  posBottom_s2 = doc_height
}

var rtime
var timeout = false
var delta = 200
$(window).resize(function () {
  rtime = new Date()
  if (timeout === false) {
    timeout = true
    setTimeout(resizeend, delta)
  }
})

function resizeend() {
  if (new Date() - rtime < delta) {
    setTimeout(resizeend, delta)
  } else {
    timeout = false
    getValues()
  }
}
