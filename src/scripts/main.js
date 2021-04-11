$(document).ready(function () {
    if (screen.width < 1199) {
        $('.header__logo-desc-wrapper, .header__contacts').wrapAll('<div class="header__mobile-wrapper header__mobile-wrapper--top"></div>')
        $('.header__inner').append('<div class="header__mobile-wrapper header__mobile-wrapper--bottom"></div>')
        $('.header__mobile-wrapper--bottom').append($('.header__descriptor'))
        $('.header__mobile-wrapper--bottom').append($('.header__nav'))
    }

    let renderClickableBG = (isDark, elementToClose, renderParent=$('body')) => {
        renderParent.append('<div class="clickable-bg"></div>');
        if (isDark) {
            $('.clickable-bg').addClass('clickable-bg--dark').fadeOut(1).fadeIn(400);
        }
        $('.clickable-bg').on('click', function () {
            $(this).remove();
            if (elementToClose) {
                elementToClose.removeClass('opened');
                $('body').removeClass('modal-opened').css('padding-right', 0);
            }
        })
    }

    $('.custom-select__styled').on('click', function() {
        $('.clickable-bg:not(.clickable-bg--dark)').remove();
        if (!($(this).siblings('.custom-select__options').hasClass('opened'))) {
            $('.custom-select__options').removeClass('opened');
            $(this).siblings('.custom-select__options').addClass('opened');
        }
        else {
            $(this).siblings('.custom-select__options').removeClass('opened')
        }
        renderClickableBG(false, $(this).siblings('.custom-select__options'));
    });

    $('.custom-select__option').on('click', function () {
        $('.clickable-bg:not(.clickable-bg--dark)').remove();
        let value = $(this).text();
        let select = $(this).parents('.custom-select__options').siblings('.custom-select__styled')
        let htmlSelect = $(this).parents('.custom-select__options').siblings('select')
        $(this).siblings('.custom-select__option').removeClass('chosen')
        $(this).addClass('chosen')
        htmlSelect.val(value)
        $(this).parents('.custom-select__options').removeClass('opened');
        select.addClass('picked')
        select.text(value);
    })

    /*--Inputs Logic--*/

    const inputs = document.querySelectorAll('.js-input');

    inputs.forEach(item => {
        if (item.value.length) {
            item.closest('.form-group').classList.add('form-group--filled')
        }
    })

    inputs.forEach(item => {
        item.addEventListener('focusin', (e) => {
            item.closest('.form-group').classList.add('form-group--focused')
        })
        item.addEventListener('focusout', (e) => {
            item.closest('.form-group').classList.remove('form-group--focused')
            if (item.value.length) {
                item.closest('.form-group').classList.add('form-group--filled')
            }
            else {
                item.closest('.form-group').classList.remove('form-group--filled')
            }
        })
        item.addEventListener('change', (e) => {
            item.closest('form').querySelectorAll('.js-input').forEach(item => {
                if (item.value.length) {
                    item.closest('.form-group').classList.add('form-group--filled')
                }
            })
        })
    })

    const phoneInputs = document.querySelectorAll("input[type='tel']");
    const maskOptions = {
        mask: '+{0}(000)000-00-00'
    };
    phoneInputs.forEach((element) => {
        const mask = IMask(element, maskOptions);
    })

    /*--END Inputs Logic--*/

    if (screen.width < 991) {
        $('.footer__col--2').append($('.footer__social'));
    }

    function openCallback(element) {
        element.siblings('.cost-request__form').slideToggle();
        element.toggleClass('opened');
        if (element.hasClass('opened')) {
            element.animate({
                marginBottom: 30,
            });
        }
        else {
            element.animate({
                marginBottom: 0,
            });
        }
        calcSelectPos();
    }

    if (screen.width < 1365) {
        $('.cost-request__title-wrapper').on('click', function () {
            openCallback($(this));
        });

    }

    if (screen.width < 600) {
        $('.services__item').each(function () {
            $(this).find('.services__item-title, .services__item-text, .services__item-price').wrapAll('<div class="services__item-inner"></div>')
            $(this).find('.common-btn').html('<div class="common-btn__icon"></div>');
        })
    }

    const placesSlider = new Swiper('.js-places-slider',{
        slidesPerView: 1,
        spaceBetween: 10,
        centeredSlides: false,
        loop: true,
        lazy: true,
        navigation: {
            nextEl: '.places__button--next',
            prevEl: '.places__button--prev',
        },
        breakpoints: {
            991: {
                slidesPerView: 'auto',
                centeredSlides: true,
            },
        }
    });

    const workersSlider = new Swiper('.js-workers-slider',{
        slidesPerView: 1,
        loop: true,
        lazy: true,
        navigation: {
            nextEl: '.team__button--next',
            prevEl: '.team__button--prev',
        },
        breakpoints: {
            601: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1500: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        }
    });

    if (screen.width <= 600) {
        $('.certs__slide').addClass('swiper-slide');

        const certsSlider = new Swiper('.js-serts-slider',{
            slidesPerView: 1,
            loop: true,
            lazy: true,
            navigation: {
                nextEl: '.certs__button--next',
                prevEl: '.certs__button--prev',
            },
        });

        $('.partners-section__bottom-slide').addClass('swiper-slide');
        const partnersSlider = new Swiper('.js-partners-slider',{
            slidesPerView: 1,
            loop: true,
            lazy: true,
            navigation: {
                nextEl: '.partners-section__bottom-button--next',
                prevEl: '.partners-section__bottom-button--prev',
            },
        });
    }

    const testimonialsSlider = new Swiper('.testimonials__slider',{
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        lazy: true,
        navigation: {
            nextEl: '.testimonials__button--next',
            prevEl: '.testimonials__button--prev',
        },
        breakpoints: {
            601: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1365: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        }
    });

    function calcSelectPos() {
        $('.custom-select__options-inner').each(function () {
            let top = $(this).height() + 80;
            $(this).css('top', -top);
        })
    }

    calcSelectPos();

    $('.js-conversion-btn').on('click', function () {
        if (screen.width > 1365 || $('.cost-request__title-wrapper').hasClass('opened')) {
            $('.cost-request .form-group--custom-select, .cost-request .form-group--custom').addClass('flicker')
            setTimeout(function () {
                $('.cost-request .form-group--custom-select, .cost-request .form-group--custom').removeClass('flicker');
            }, 500);
        }
        else {
            openCallback($('.cost-request__title-wrapper'));
        }
    })

    $('.js-request').on('click', function (e) {
        e.preventDefault();
        let vThis = $(this);
        let borderColor;
        let gradient = vThis.css('background');
        let color;
        if (vThis.hasClass('common-btn--blue')) {
            borderColor = "#2C449E";
            color = "#2C449E";
        }
        else if (vThis.hasClass('common-btn--green')) {
            borderColor = "#1B975B";
            color = "#1B975B";
        }
        else if (vThis.hasClass('common-btn--orange')) {
            borderColor = "#FD5F43";
            color = "#FD5F43";
        }

        vThis.text('Заявка отправлена');
        vThis.css({
            'background': '#ffffff',
            'color': color,
            'border': '2px solid ' + borderColor
        });
        setTimeout(function () {
            vThis.text('Заявка на расчет');
            vThis.css({
                'background': gradient,
                'color': '#fff',
                'border': 'none'
            });
        }, 5000)
    })

    $(".main-nav__item").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 2000);
    });

    $(window).on("scroll", function() {
        var currentPos = $(window).scrollTop();

        $('.main-nav__item').each(function() {
            var sectionLink = $(this);
            // capture the height of the navbar
            var navHeight = $('.main-nav').outerHeight() + 1;
            var section = $(sectionLink.attr('href'));
            // subtract the navbar height from the top of the section
            if(section.position().top - navHeight  <= currentPos && sectionLink.offset().top + section.height() > currentPos) {
                $('.main-nav__item').removeClass('active');
                sectionLink.addClass('active');
            } else {
                sectionLink.removeClass('active');
            }
        });
    });
});


