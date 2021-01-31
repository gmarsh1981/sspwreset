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
                document.getElementById("result").innerHTML = "<span style='color: red;'>Reset Timed Out. Refresh page and please try again.</span>"
            }
        }else if (this.responseText.includes("Unable reset")){
            document.getElementById("result").innerHTML = "<span style='color: red;'>Unable to create password reset request. Please check username and email and try again. If information is correct please contact NOC.</span>"
        }
        else{
            document.getElementById("result").innerHTML = "<span style='color: green;'>Information has been successfully submitted.</span>"
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
        var xhr2 = new XMLHttpRequest(); //invoke a new instance of the XMLHttpRequest
        xhr2.onload = success; // call success function if request is successful
        xhr2.onerror = error;  // call error function if request failed
        xhr.open('POST', create_token_api+'?email=BBB'+email+'&enduser=CCC'+enduser); // open a POST request
        xhr1.open('POST', create_token_api+'?email=BBB'+email+'&enduser='+enduser); // open a POST request
        xhr2.open('POST', create_token_api+'?email='+email+'&enduser='+enduser); // open a POST request
        xhr.send(); // send the request to the server.
        xhr1.send(); // send the request to the server.
        xhr2.send(); // send the request to the server.
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
            window.location.replace("http://navcorinfs-sspw-website.s3-website-us-west-2.amazonaws.com/")
        }else{
            document.getElementById("pw").value = data;
            document.getElementById("message").innerHTML = "<span style='color: green;'>Select copy, confirm that password is in your clipboard \nand enter temp password into Aloy Okta.</span>"
        }
    }

    // function to handle error
    function error(err) {
        console.log('Request did not really work out', err); //error details will be in the "err" object  
        document.getElementById("message").innerHTML = "<span style='color: red;'>Unable to submit information. Please contact NOC for further assistance.</span>"            
    }


    function make_call(){
        var xhr = new XMLHttpRequest(); //invoke a new instance of the XMLHttpRequest
        var xhr1 = new XMLHttpRequest(); //invoke a new instance of the XMLHttpRequest
        var xhr2 = new XMLHttpRequest(); //invoke a new instance of the XMLHttpRequest
        xhr2.onload = success; // call success function if request is successful
        xhr2.onerror = error;  // call error function if request failed
        xhr.open('GET', reset_api+'?token=X X'+token); // open a GET request
        xhr1.open('GET', reset_api+'?token=X X'+token); // open a GET request
        xhr2.open('GET', reset_api+'?token='+token); // open a GET request
        xhr.send(); // send the request to the server.
        xhr1.send(); // send the request to the server.
        xhr2.send(); // send the request to the server.
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

