# when.js #

when.js was created while pondering about the async attribute on script tags.  When using the async attribute, there is no way of ensuring that your variables will be available when you need them regardless of the order of your script tags. 

As an example, if you are using a framework or library on your site, you could just include the library/framework prior to including your own scripts and you could know that the needed variables such as `$` or `angular` would be available.  So you would have to leave the async attribute off of your library/framework includes.

Thus when.js was born.  I wanted a way to still pull in all of my scripts using the async attribute without having to worry about what order they come in at. You can even include your use of the library before you include your library.

## How to use when.js ##

Include when.js:

    <script src="when.min.js"></script>
    
Unfortunately you can't use async on when.js or else you wouldn't be able to use it because you wouldn't know when it would complete.

Now you can start using when.js

    <script>
        when("$", function() {
            $(document).ready(function() {
                *other code*
            });
            *As much jquery as your heart desires*
        });
    </script>
    
After you pull in your library with or without the async attribute, your code will get run.  I should also mention that if you call `when` and the provided variable is already set your code will just get run immediatley.
    
    <script async src="jquery.min.js"></script>

It won't matter where you include your libraries as your code will only run after the provided variable is set on the window object.

## How does it work ##

There is only one function that when.js exposes for use, `when()`.  The `when` function takes two parameters: a string with the name of the variable you are waiting for and a function of what should be called after that variable becomes available.

when.js relies on object getters and setters to function and thus your mileage may vary but browser implementation for getters and setters is pretty good. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#Browser_compatibility

## Future ##
I will probably implement when.js with Promises as well.  Most likely in the form of if no callback is provided, it will return a promise instead.