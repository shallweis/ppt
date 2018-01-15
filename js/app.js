import Reveal from 'reveal.js'
import {config} from './animate'

Reveal.initialize({

	// Display presentation control arrows
	controls: false,

	// Help the user learn the controls by providing hints, for example by
	// bouncing the down arrow when they first encounter a vertical slide
	// controlsTutorial: true,

	// Determines where controls appear, "edges" or "bottom-right"
	//controlsLayout: 'bottom-right',

	// Visibility rule for backwards navigation arrows; "faded", "hidden"
	// or "visible"
	//controlsBackArrows: 'faded',

	// Display a presentation progress bar
	progress: false,

	// Set default timing of 2 minutes per slide
	defaultTiming: 120,

	// Display the page number of the current slide
	slideNumber: false,

	// Push each slide change to the browser history
	history: true,

	// Enable keyboard shortcuts for navigation
	keyboard: false,

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
	const $el = $(event.currentSlide)
	const index = $el.data('index')
	if (index == 1) {
		$('.slide-background.present').css({
			'background' : 'url("images/01/bg.jpg") no-repeat center center, url("images/01/01.png") no-repeat left center',
			'background-size': 'cover, 100%',
			'background-blend-mode':'multiply',
		})
	}
});

Reveal.addEventListener('slidechanged', function( event ) {
	//back.removeClass('animated fadeIn delay2')
	$('#mask').remove()
	$('.layer').remove()
	$('.back-btn').remove()
	toggleAnimation(event.currentSlide)
	const $el = $(event.currentSlide)
	const index = $el.data('index')
	if (index == 1) {
		$('.slide-background .present').css({
			'background' : 'url("images/01/bg.jpg") no-repeat center center, url("images/01/01.png") no-repeat left cneter',
			'background-blend-mode':'multiply'
		})
	}
	toggleAnimation(event.previousSlide, false)
	
	
	// event.previousSlide, event.currentSlide, event.indexh, event.indexv
}); 

let prev = null
let currentIndex = null
const $body = $(document.body)
function toggleAnimation(el, add = true) {
    const $el = $(el)
	const index = $el.data('index')
	if (add) {
		currentIndex = index
	}
	if ([2,3,7,12,14,18,21,25,30,38, 44].indexOf(index) > -1) {
		prev = $el.attr('id')
	}
	const styles = config[index - 1]
	
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
	if (index - 1 ) {
		$('.back-btn').remove()
		$body.append('<a class="back-btn animated fadeIn delay2" href="javascript:;"><img src="images/back.png" alt="返回"></a>')
	}
	showLayer(index)
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
const node = {
	45: 44,
	46: 44,
	44: 2,
	40: 38,
	41: 38,
	42:38,
	43: 38,
	30:2,
	31: 30,
	32:30,
	33: 30,
	34:30,
	35: 30,
	36:30,
	37:30,
	38: 2,
	39:38,
	14: 7,
	15: 14,
	16:14,
	17:14,
	18:7,
	19: 18,
	20: 18,
	21: 7,
	22: 21,
	23: 21,
	24:21,
	25: 7,
	26: 25,
	27:25,
	28: 27,
	29:27,
	12: 7,
	13: 12,
	8: 7,
	9: 7,
	10: 7,
	11: 7,
	3: 2,
	2:1,
	4:3,
	5:3,
	6:3,
	7:2
}

$(document.body).on('click', '.back-btn', function(){
	if (node[currentIndex]) {
		let p = node[currentIndex] < 10 ? '0' + node[currentIndex] : node[currentIndex]
		window.location = '#/slide-' + p
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
		'mask' : '',
	},
	{
		'show': false,
		'target': '#slide-02 .btn-1',
		'layer': `<img src="images/02/layer.png" class="animated fadeIn delay6 layer">`,
		'mask' : '<div class="animated fadeIn delay5" id="mask"></div>'
	}
	],
	// 3:[ {
	// 	'show': false,
	// 	'target': '.back-btn',
	// 	'layer': `<img src="images/03/layer1.png" class="layer-4 animated fadeIn delay6 layer layer-back">`,
	// 	'mask' : '',
	// },
	// {
	// 	'show': false,
	// 	'target': '#slide-03 .btn-1',
	// 	'layer': `<div><img src="images/03/layer.png" class="layer-3 animated fadeIn delay6 layer"></div>`,
	// 	'mask' : '<div class="animated fadeIn delay5" id="mask"></div>',
	// },

	// ],
	// 7:[ {
	// 	'show': false,
	// 	'target': '.back-btn',
	// 	'layer': `<img src="images/03/layer1.png" class="animated fadeIn delay6 layer layer-back">`,
	// 	'mask' : '',
	// },
	// {
	// 	'show': false,
	// 	'target': '#slide-07 .btn-1',
	// 	'layer': `<div><img src="images/03/layer.png" class="layer-7 animated fadeIn delay6 layer"></div>`,
	// 	'mask' : '<div class="animated fadeIn delay5" id="mask"></div>',
	// }
	// ],
	// 30:[ {
	// 	'show': false,
	// 	'target': '.back-btn',
	// 	'layer': `<img src="images/03/layer1.png" class="animated fadeIn delay6 layer layer-back">`,
	// 	'mask' : '',
	// },
	// {
	// 	'show': false,
	// 	'target': '#slide-30 .btn-1',
	// 	'layer': `<div><img src="images/03/layer.png" class="layer-30 animated fadeIn delay6 layer"></div>`,
	// 	'mask' : '<div class="animated fadeIn delay5" id="mask"></div>',
	// }
	// ],
	// 38:[ {
	// 	'show': false,
	// 	'target': '.back-btn',
	// 	'layer': `<img src="images/03/layer1.png" class="animated fadeIn delay6 layer layer-back">`,
	// 	'mask' : '',
	// },
	// {
	// 	'show': false,
	// 	'target': '#slide-38 .btn-1',
	// 	'layer': `<div><img src="images/03/layer.png" class="layer-38 animated fadeIn delay6 layer"></div>`,
	// 	'mask' : '<div class="animated fadeIn delay5" id="mask"></div>',
	// }
	// ],
	// 44:[ {
	// 	'show': false,
	// 	'target': '.back-btn',
	// 	'layer': `<img src="images/03/layer1.png" class="animated fadeIn delay6 layer layer-back">`,
	// 	'mask' : '',
	// },
	// {
	// 	'show': false,
	// 	'target': '#slide-44 .btn-1',
	// 	'layer': `<div><img src="images/03/layer.png" class="layer-44 animated fadeIn delay6 layer"></div>`,
	// 	'mask' : '<div class="animated fadeIn delay5" id="mask"></div>',
	// }

	// ]
}


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
					console.log(item.maskBox)
					$(item.target).before($mask)
				}
				$(item.target).before($layer)
			} 
			// if (item.top) {
			// 	setTimeout(function(){
			// 		const postion = $(item.target).offset()
			// 		//let scacleY = height / 1080
			// 		scacleX = scacleX > 1 ? 1 : scacleX
			// 		$layer.offset({
			// 			top: postion.top - item.top * scacleX,
			// 			left: postion.left + item.left * scacleX
			// 		})
			// 	}, 1000)
			// }	
		}	
	}	
}
$(document.body).on('click', '#mask', function(){
	$(this).remove()
	$('.layer').remove()
})
//showLayer(index)
