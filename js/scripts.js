/*!
    * Start Bootstrap - Grayscale v6.0.2 (https://startbootstrap.com/themes/grayscale)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
    */
function copyFunction() {
    var copyText = document.getElementById("pw");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
    window.location.replace("http://aloy.okta.com")
}

function redirector() { 
    var tokenURL = window.location.search
    urlParams = new URLSearchParams(tokenURL)
    var token = urlParams.get('token')
    console.log(token)
    var api = 'https://i3eaxdlh55.execute-api.us-west-2.amazonaws.com/default/navconeinfs-sspwreset-lambda1?token='

    make_call()

    function success() {
        var data = JSON.parse(this.responseText); //parse the string to JSON
        console.log(data);
        if (this.responseText.includes("timed out")){
            make_call()
        }else if (this.responseText.includes("list index out of range")){
            alert("Token Expired. Please reset password again.");
            window.location.replace("https://master.d1wxu3v9t21ve4.amplifyapp.com/")

        }else{
            document.getElementById("pw").value = data
        }
    }

    // function to handle error
    function error(err) {
        console.log('Request did not really work out', err); //error details will be in the "err" object
    }

    function make_call(){
        var xhr = new XMLHttpRequest(); //invoke a new instance of the XMLHttpRequest
        xhr.onload = success; // call success function if request is successful
        xhr.onerror = error;  // call error function if request failed
        xhr.open('GET', api+token); // open a POST request
        xhr.send(); // send the request to the server.
    }
}

(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 70,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 100,
    });

})(jQuery); // End of use strict

