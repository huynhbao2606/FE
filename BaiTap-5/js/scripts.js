// Owl
$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
})

// CountUp
$('.counter').counterUp({
    delay: 10,
    time: 3000
});


// Fancybox
$('[data-fancybox="gallery"]').fancybox({
    loop: true
});

//Wow
new WOW().init();