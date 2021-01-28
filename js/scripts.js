/*!
    * Start Bootstrap - Grayscale v6.0.2 (https://startbootstrap.com/themes/grayscale)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
    */
function redirectorWriteToken() { 
    document.getElementById("result").innerHTML = "Sending Request...\nRequest can take up to 30 seconds, Please Wait.";
    var enduser = document.getElementById("uname").value
    var email = document.getElementById("email").value
    
    var attempt = 0 
    make_call()

    function success() {
        var data = JSON.parse(this.responseText); //parse the string to JSON
        console.log(data);
        if (this.responseText.includes("timed out")){
            attempt = attempt + 1
            if (attempt < 5){ 
                make_call()
            }else{
                document.getElementById("result").innerHTML = "Reset Timed Out. Refresh page and please try again."
            }
        }else if (this.responseText.includes("User not found")){
            document.getElementById("result").innerHTML = "User not found. Please check username and email and try again. If information is correct please contact NOC."
        }
        else{
            document.getElementById("result").innerHTML = "Information has been successfully submitted."
        }
    }

    // function to handle error
    function error(err) {
        console.log('Request did not really work out', err); //error details will be in the "err" object
        document.getElementById("result").innerHTML = "Unable to submit information. Please contact NOC for further assistance."
    }

    function make_call(){
        var xhr = new XMLHttpRequest(); //invoke a new instance of the XMLHttpRequest
        var xhr1 = new XMLHttpRequest(); //invoke a new instance of the XMLHttpRequest
        xhr.onload = success; // call success function if request is successful
        xhr1.onload = success; // call success function if request is successful
        xhr.onerror = error;  // call error function if request failed
        xhr1.onerror = error;  // call error function if request failed
        xhr.open('POST', create_token_api+'?email=BBB'+email+'&enduser=CCC'+enduser); // open a POST request
        xhr1.open('POST', create_token_api+'?email='+email+'&enduser='+enduser); // open a POST request
        xhr.send(); // send the request to the server.
        xhr1.send(); // send the request to the server.
    }
}


function copyFunction() {
    var copyText = document.getElementById("pw");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
    window.location.replace("https://google.com")
}

function redirectorReset() { 
    document.getElementById("message").innerHTML = "Sending Request...\nRequest can take up to 30 seconds, Please Wait.";
    var tokenURL = window.location.search
    urlParams = new URLSearchParams(tokenURL)
    var token = urlParams.get('token')
    console.log(token)

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
            document.getElementById("message").innerHTML = "Select copy, confirm that password is in your clipboard \nand enter temp password into Aloy Okta.";
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
        xhr.open('GET', reset_api+'?token='+token); // open a POST request
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

