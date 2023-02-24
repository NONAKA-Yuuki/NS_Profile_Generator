// SP版ヘッダーのドロワー開閉
$(function() {
    $('#js-header-button').on('click', function() {
        $(this).toggleClass('open');
        $('#js-header-menu').toggleClass('open');
    });
});

$('.header__nav__list a[href]').on('click', function(event) {
    $('#js-header-button').trigger('click');
});