import Reveal from 'reveal.js'
import {config} from './animate'

Reveal.initialize({

	// Display presentation control arrows
	controls: true,

	// Help the user learn the controls by providing hints, for example by
	// bouncing the down arrow when they first encounter a vertical slide
	controlsTutorial: true,

	// Determines where controls appear, "edges" or "bottom-right"
	controlsLayout: 'bottom-right',

	// Visibility rule for backwards navigation arrows; "faded", "hidden"
	// or "visible"
	controlsBackArrows: 'faded',

	// Display a presentation progress bar
	progress: true,

	// Set default timing of 2 minutes per slide
	defaultTiming: 120,

	// Display the page number of the current slide
	slideNumber: false,

	// Push each slide change to the browser history
	history: true,

	// Enable keyboard shortcuts for navigation
	keyboard: true,

	// Enable the slide overview mode
	overview: true,

	// Vertical centering of slides
	center: true,

	// Enables touch navigation on devices with touch input
	touch: true,

	// Loop the presentation
	loop: false,

	// Change the presentation direction to be RTL
	rtl: false,

	// Randomizes the order of slides each time the presentation loads
	shuffle: false,

	// Turns fragments on and off globally
	fragments: true,

	// Flags if the presentation is running in an embedded mode,
	// i.e. contained within a limited portion of the screen
	embedded: false,

	// Flags if we should show a help overlay when the questionmark
	// key is pressed
	help: true,

	// Flags if speaker notes should be visible to all viewers
	showNotes: false,

	// Global override for autoplaying embedded media (video/audio/iframe)
	// - null: Media will only autoplay if data-autoplay is present
	// - true: All media will autoplay, regardless of individual setting
	// - false: No media will autoplay, regardless of individual setting
	autoPlayMedia: null,

	// Number of milliseconds between automatically proceeding to the
	// next slide, disabled when set to 0, this value can be overwritten
	// by using a data-autoslide attribute on your slides
	autoSlide: 0,

	// Stop auto-sliding after user input
	autoSlideStoppable: true,

	// Use this method for navigation when auto-sliding
	autoSlideMethod: Reveal.navigateNext,

	// Enable slide navigation via mouse wheel
	mouseWheel: false,

	// Hides the address bar on mobile devices
	hideAddressBar: true,

	// Opens links in an iframe preview overlay
	previewLinks: false,

	// Transition style
	transition: 'fade', // none/fade/slide/convex/concave/zoom

	// Transition speed
	transitionSpeed: 'default', // default/fast/slow

	// Transition style for full page slide backgrounds
	backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom

	// Number of slides away from the current that are visible
	viewDistance: 3,

	// Parallax background image
	parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"

	// Parallax background size
	parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px"

	// Number of pixels to move the parallax background per slide
	// - Calculated automatically unless specified
	// - Set to 0 to disable movement along an axis
	parallaxBackgroundHorizontal: null,
    parallaxBackgroundVertical: null,
    // width: '1200px',
    // height: '800px',
	// width: 1200,
	// height: 900,
	// The display mode that will be used to show slides
    display: 'block',
    // // minScale: 1,
	// width: 1080,
	// height: 800,
	minScale: 0.6,
	maxScale: 1

});

Reveal.addEventListener( 'ready', function( event ) { 
	toggleAnimation(event.currentSlide)
});

Reveal.addEventListener('slidechanged', function( event ) {
	//back.removeClass('animated fadeIn delay2')
	$('#mask').remove()
	$('.layer').remove()
	$('.back-btn').remove()
    toggleAnimation(event.currentSlide)
	toggleAnimation(event.previousSlide, false)
	
	
	// event.previousSlide, event.currentSlide, event.indexh, event.indexv
}); 

let prev = null
function toggleAnimation(el, add = true) {
    const $el = $(el)
    const index = $el.data('index')
	prev = $el.attr('id')
	const styles = config[index - 1]
	showLayer(index)
	//console.log(styles)
    if (styles) {
        for (let style of styles) {
            if (add) {
                $el.find('.' + style.name).addClass(style.cls)     
            } else {
                $el.find('.' + style.name).removeClass(style.cls)     
            } 
        }
    }
	if (index - 1) {
		$('body').append('<a class="back-btn animated fadeIn delay2" href="javascript:;"><img src="images/back.png" alt="返回"></a>')
	}
}

const $zoom = $('.zoom')

$zoom.on('mouseover', function() {
	$(this).addClass('zoomOut')
})

$zoom.on('mouseleave', function() {
	$(this).removeClass('zoomOut')
})

const $mask = $(".mask")

$(".flips").click(function(e){
	$(".mask").show().addClass('animated fadeIn')
	return false
})

$mask.on('click', function(e){
	$(".mask").hide().removeClass('animated fadeIn');
	return false
})
	
$(".flips1").click(function(e){
	$(".mack_img1").show().addClass('z-index');
	$(".mack_img2").hide()
	return false
})
$(".flips2").click(function(e){
	$(".mack_img2").show().addClass('z-index')
	$(".mack_img1").hide()
	return false
})

const $hover = $('.hover')

$hover.on('mouseover', function() {
	let $img = $($(this).find('img')[0])
	let hover = $img.data('hover')
	$img.attr('src', hover) 
})

$hover.on('mouseleave', function() {
	let $img = $($(this).find('img')[0])
	let hover = $img.data('hover')
	let a = hover.replace('over', 'nor')
	console.log(a)
	$img.attr('src', a) 
})

$('.full').on('click', function(){
	if (screenfull.isFullscreen) {
		screenfull.exit()
	} else {
		screenfull.request()
	}
})

let scacleX = 0
function resize(a = 0) {
	const width = $(window).width()
	const height = $(window).height()
	let scacleX = width / 1920
	let scacleY = height / 1080
	scacleX = scacleX > 1 ? 1 : scacleX + a
	//scacleY = scacleY > 1 ? 1 : scacleY + a
	$('body').css({
		zoom: scacleX
	})
}
$(window).on('resize', function(){
	resize()
})

resize()

$(document.body).on('click', '.back-btn', function(){
	if (prev) {
		window.location = '#/' + prev
	}
})
//let i = 12;
/*window.addEventListener("hashchange", function(){
	setTimout(function(){
		i++;
		$('body').css({
			'font-size': i + 'px' 
		})
	}, 1000)
},false)*/



/*$('a').on('click', function(event){
	event.preventDefault()
	window.location = $(this).attr('href')
})*/

/*
{
		'show': false,
		'target': '#slide-03 .btn-1',
		'layer': `<img src="images/03/layer.png" class="layer-3 animated fadeIn delay6 layer">`,
		'mask' : '<div class="animated fadeIn delay5" id="mask"></div>',
		'top': 140,
		'left': 10,
	},
*/ 
const layer= {
	2: [
	{
		'show': false,
		'target': '.back-btn',
		'layer': `<div><img src="images/03/layer1.png" class="layer-2 animated fadeIn delay6 layer layer-back"></div>`,
		'mask' : '<div class="animated fadeIn delay5" id="mask"></div>',
	},
	{
		'show': false,
		'target': '#slide-02 .btn-1',
		'layer': `<img src="images/02/layer.png" class="layer-2 animated fadeIn delay6 layer">`,
		'mask' : '',
		'top': 38,
		'left': 24,
		'width': '281px',
		'height': '147px'
	}
	],
	3:[ {
		'show': false,
		'target': '.back-btn',
		'layer': `<img src="images/03/layer1.png" class="layer-4 animated fadeIn delay6 layer layer-back">`,
		'mask' : '<div class="animated fadeIn delay5" id="mask"></div>',
	},
	{
		'show': false,
		'target': '#slide-03 .btn-1',
		'layer': `<div><img src="images/03/layer.png" class="layer-3 animated fadeIn delay6 layer"></div>`,
		'mask' : '',
	},

	],
	7:[ {
		'show': false,
		'target': '.back-btn',
		'layer': `<img src="images/03/layer1.png" class="animated fadeIn delay6 layer layer-back">`,
		'mask' : '<div class="animated fadeIn delay5" id="mask"></div>',
	},
	{
		'show': false,
		'target': '#slide-07 .btn-1',
		'layer': `<div><img src="images/03/layer.png" class="layer-7 animated fadeIn delay6 layer"></div>`,
		'mask' : '',
	}
	],
	30:[ {
		'show': false,
		'target': '.back-btn',
		'layer': `<img src="images/03/layer1.png" class="animated fadeIn delay6 layer layer-back">`,
		'mask' : '<div class="animated fadeIn delay5" id="mask"></div>',
	},
	{
		'show': false,
		'target': '#slide-30 .btn-1',
		'layer': `<div><img src="images/03/layer.png" class="layer-30 animated fadeIn delay6 layer"></div>`,
		'mask' : '',
	}
	],
	38:[ {
		'show': false,
		'target': '.back-btn',
		'layer': `<img src="images/03/layer1.png" class="animated fadeIn delay6 layer layer-back">`,
		'mask' : '<div class="animated fadeIn delay5" id="mask"></div>',
	},
	{
		'show': false,
		'target': '#slide-38 .btn-1',
		'layer': `<div><img src="images/03/layer.png" class="layer-38 animated fadeIn delay6 layer"></div>`,
		'mask' : '',
	}
	],
	44:[ {
		'show': false,
		'target': '.back-btn',
		'layer': `<img src="images/03/layer1.png" class="animated fadeIn delay6 layer layer-back">`,
		'mask' : '<div class="animated fadeIn delay5" id="mask"></div>',
	},
	{
		'show': false,
		'target': '#slide-44 .btn-1',
		'layer': `<div><img src="images/03/layer.png" class="layer-44 animated fadeIn delay6 layer"></div>`,
		'mask' : '',
	}

	]
}
const $body = $(document.body)

const w = $(window).width()
const h = $(window).height()
function showLayer(index) {
	let scacleX = w / 1920
	if (!layer[index]) return
	for(let item of layer[index]) {
		if (!item.show) {
			let $layer = $(item.layer)
			if (!item.show) {
				item.show = true
				if (item.mask) {
					const current = Reveal.getCurrentSlide()
					const $mask = $(item.mask).css({
						width: w / scacleX * 10000,
						height:h /scacleX * 20000,
						left: '-500%',
						top: '-2000%'
					})
					$(current).append($mask)
				}
				$(item.target).before($layer)
			} 
			if (item.top) {
				setTimeout(function(){
					const postion = $(item.target).offset()
					//let scacleY = height / 1080
					scacleX = scacleX > 1 ? 1 : scacleX
					$layer.offset({
						top: postion.top - item.top * scacleX,
						left: postion.left + item.left * scacleX
					})
				}, 1000)
			}	
		}	
	}	
}
$(document.body).on('click', '#mask', function(){
	$(this).remove()
	$('.layer').remove()
})

const current = Reveal.getCurrentSlide()
const index = $(current).data('index')
//showLayer(index)


