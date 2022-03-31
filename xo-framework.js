//immediately invoked function - accepts global and jQUERY/$ object
//; to solve any missed colons from code before
;(function(global, $){

    // new object referenced by G$
    var Greetr = function(firstName, lastName, language){
        return new Greetr.init(firstName, lastName, language);
    }

    //hiddden within scope , never directly accessible
    var supportedLangs = ['en', 'es', 'zulu'];


    //formal and informal greeting object
    var greetings = {
        en: 'Hello',
        es: 'Hola',
        zulu: 'Sawubona'
    };

    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos',
        zulu: 'Sawubona'
    };

    //logging messages object
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion',
        zulu: 'Ungenile'
    }

    //Object literal - prototype with methods defined (this helps save memory space)
    Greetr.prototype = {

        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        },

        //validate method to check supported languages
        validate: function(){
            if(supportedLangs.indexOf(this.language) === -1){
                throw 'Invalid language';
            }
        },

        greeting: function(){
            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        formalGreeting: function(){
            return formalGreetings[this.language] + ', ' + this.fullName();
        },

        greet: function(formal){
            var message;

            //if undefines or null it will be coerced to false
            if(formal){
                message = this.formalGreeting();
            }else{
                message = this.greeting();
            }

            if(console){
                console.log(message);
            }

            // 'this' calls the object when code executes
            // makes the method chainable if you return this.
            return this;
        },

        //manually login
        log: function(){
            if(console){
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            return this;
        },

        setLang: function(lang){
            this.language = lang;

            this.validate();

            return this;
        },

        HTMLGreeting: function(selector, formal){
            if(!$){
                throw 'jQuery not loaded';
            }

            if(!selector){
                throw 'Missing the jQuery selector';
            }

            var message;
            if(formal){
                message = this.formalGreeting();
            }else{
                message = this.greeting();
            }

            $(selector).html(message);
            
            return this;
        }
    };
    
    //Builds the object and sets the values for G$
    Greetr.init = function(firstName, lastName, language){
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

        self.validate();
    }

    //Ensures all objects created have access to all the methods of the above prototype 
    Greetr.init.prototype = Greetr.prototype;

    //attach Greetr to global object and provide shorthand G$
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));
