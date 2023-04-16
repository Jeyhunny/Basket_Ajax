$(document).ready(function () {
   

    //ADD-PRODUCTS TO BASKET WITH REQUEST AJAX

    $(document).on("click", ".add-basket", function () {    

        swal("Product added to basket", "", "success");
    

        let productId = $(this).parent().attr("data-id")   

        $.ajax({

            url: `home/addBasket?id=${productId}`,     

            type: "Post",
            success: function (res) {

                return res;

            }
        })
        return false;


    })


    //DELETE PRODUCT FROM BASKET WITH AJAX

    $(document).on("click", ".delete-basketProduct", function () {      

        swal("Product deleted to basket", "", "success");

        let deletProduct = $(this).parent().parent();                  
       
        let productId = $(this).attr("data-id")                        
        let sum = 0;
      
        let grandTotal = $(".total-product").children().eq(0);         

  
        $.ajax({

            url: `card/DeleteProductFromBasket?id=${productId}`,       

            type: "Post",                                              
            success: function () {
                $(deletProduct).remove();                             
             
              
                for (const product of $(".table-product").children()) {     
                    let total = parseFloat($(product).children().eq(6).text())  
                    sum += total    
                }
                $(grandTotal).text(sum); 


              

                if ($(".table-product").children().length == 0) {      
                    $("table").addClass("d-none");                      
                    $(".total-product").addClass("d-none");             
                    $(".alert-product").removeClass("d-none");            
                 
                  
                }
                 
              
                    
            }
        })
        return false;


    })







    


    // HEADER

    $(document).on('click', '#search', function () {
        $(this).next().toggle();
    })

    $(document).on('click', '#mobile-navbar-close', function () {
        $(this).parent().removeClass("active");

    })
    $(document).on('click', '#mobile-navbar-show', function () {
        $('.mobile-navbar').addClass("active");

    })

    $(document).on('click', '.mobile-navbar ul li a', function () {
        if ($(this).children('i').hasClass('fa-caret-right')) {
            $(this).children('i').removeClass('fa-caret-right').addClass('fa-sort-down')
        }
        else {
            $(this).children('i').removeClass('fa-sort-down').addClass('fa-caret-right')
        }
        $(this).parent().next().slideToggle();
    })

    // SLIDER

    $(document).ready(function(){
        $(".slider").owlCarousel(
            {
                items: 1,
                loop: true,
                autoplay: true
            }
        );
      });

    // PRODUCT

    $(document).on('click', '.categories', function(e)
    {
        e.preventDefault();
        $(this).next().next().slideToggle();
    })

    $(document).on('click', '.category li a', function (e) {
        e.preventDefault();
        let category = $(this).attr('data-id');
        let products = $('.product-item');
        
        products.each(function () {
            if(category == $(this).attr('data-id'))
            {
                $(this).parent().fadeIn();
            }
            else
            {
                $(this).parent().hide();
            }
        })
        if(category == 'all')
        {
            products.parent().fadeIn();
        }
    })

    // ACCORDION 

    $(document).on('click', '.question', function()
    {   
       $(this).siblings('.question').children('i').removeClass('fa-minus').addClass('fa-plus');
       $(this).siblings('.answer').not($(this).next()).slideUp();
       $(this).children('i').toggleClass('fa-plus').toggleClass('fa-minus');
       $(this).next().slideToggle();
       $(this).siblings('.active').removeClass('active');
       $(this).toggleClass('active');
    })

    // TAB

    $(document).on('click', 'ul li', function()
    {   
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        let dataId = $(this).attr('data-id');
        $(this).parent().next().children('p.active').removeClass('active');

        $(this).parent().next().children('p').each(function()
        {
            if(dataId == $(this).attr('data-id'))
            {
                $(this).addClass('active')
            }
        })
    })

    $(document).on('click', '.tab4 ul li', function()
    {   
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        let dataId = $(this).attr('data-id');
        $(this).parent().parent().next().children().children('p.active').removeClass('active');

        $(this).parent().parent().next().children().children('p').each(function()
        {
            if(dataId == $(this).attr('data-id'))
            {
                $(this).addClass('active')
            }
        })
    })

    // INSTAGRAM

    $(document).ready(function(){
        $(".instagram").owlCarousel(
            {
                items: 4,
                loop: true,
                autoplay: true,
                responsive:{
                    0:{
                        items:1
                    },
                    576:{
                        items:2
                    },
                    768:{
                        items:3
                    },
                    992:{
                        items:4
                    }
                }
            }
        );
      });

      $(document).ready(function(){
        $(".say").owlCarousel(
            {
                items: 1,
                loop: true,
                autoplay: true
            }
        );
      });
})