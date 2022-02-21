class Validator {
    constructor() {
        this.validations = [
            "data-required",
            "data-min-length",
            "data-max-length",
            "data-email-validate",
            "data-only-letters",
            "data-equal",
            "data-password-validate",
        ]
    }

    // Start validating all fields
    validate(form) {

        // Redeem all validations
        let currentValidations = document.querySelectorAll("form .error-validation");

        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        // Get the inputs
        let inputs = form.getElementsByTagName("input");

        // Transform HTMLCollection -> Array
        let inputsArray = [...inputs];

        // Looping inputs and validating what is found
        inputsArray.forEach(function(input) {
            
            // Loop through all existing validations
            for(let i = 0; this.validations.length > i; i++) {

                // Checks if the current validation exists in the input
                if(input.getAttribute(this.validations[i]) != null) { 

                    // data-min-length -> minlength ie cleaning the string to become a method
                    let method = this.validations[i].replace("data-", "").replace("-", "");

                    // value of input
                    let value = input.getAttribute(this.validations[i]);

                    // invoke or method
                    this[method](input, value);
                }
            }

        }, this);
    }

    // Check if input is required
    required(input) {

        let inputValue = input.value;

        if (inputValue === "") {

            let errorMessage = `This field is required`;

            this.printMessage(input, errorMessage);
        }
    }
    
    // Checks if an input has a minimum number of characters
    minlength(input, minValue) {

        let inputLength = input.value.length;

        let errorMessage = `The field must have at least ${minValue} characters`;

        if (inputLength < minValue) {

            this.printMessage(input, errorMessage);
        }
    }

    // Checks if an input has passed the character limit
    maxlength(input, maxValue) {
    
        let inputLength = input.value.length;

        let errorMessage = `The field must have at most ${maxValue} characters`;

        if (inputLength > maxValue) {

            this.printMessage(input, errorMessage);
        }
    }

    // Method for validating emails
    emailvalidate(input) {

        // email@email.com
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Enter an email in the pattern email@email.com`;

        if (!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    } 

    // Validates if the field has only letters

    onlyletters(input) {
        
        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `This field does not accept numbers and special characters`;

        if (!re.test(inputValue)) {

            this.printMessage(input, errorMessage);
        }
    }

    // Checks if two fields are the same
    equal(input, inputName) {
        
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Both passwords must be the same`;

        if (input.value != inputToCompare.value) {

            this.printMessage(input, errorMessage);
        }
    } 

    // Validate the password field
    passValidate(input) {
        
        // transform string into an array

        let charArr = input.value.split("");

        let uppercases = 0;

        let numbers = 0;

        for (let i = 0; charArr.length > i; i++) {

            if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {

                uppercases++;
            }

        else if (!isNaN(parseInt(charArr[i]))) {

            numbers++;
        }
        }

        if (uppercases === 0 || numbers === 0) {

            let errorMessage = `Password needs an uppercase character and a number`;

            this.printMessage(input, errorMessage);
        }
    }

     // Clear screen validations
     cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }

    // Method to print error messages on the screen
    printMessage(input, msg) {

        // Check the amount of errors
        let errorsQtd = input.parentNode.querySelector(".error-validation");

        if (errorsQtd === null) {

            let template = document.querySelector(".error-validation").cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove("template");

            inputParent.appendChild(template);
        }
    }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

// Event that triggers validations
submit.addEventListener("click", function(e) {
    e.preventDefault();
        validator.validate(form);
});
