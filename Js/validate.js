Validator({
  form: "#adminForm",
  errorSelector: ".form-message",
  submitSelector: "#button",
  rules: [
    isRequired("#username", "Please enter your username"),
    isConfirmed("#username", "Your username incorrect", "trungtin"),
    isRequired("#password", "Please enter your password"),

    isConfirmed("#password", "Your password incorrect", "123456"),
  ],
  onsubmit: function (data) {
    console.log(data);
  },
});

//validator
function Validator(option) {
  let validate = (inputElement, rule) => {
    let errorSelector = inputElement.parentElement.querySelector(
      option.errorSelector
    );
    let errorMessage;
    //get each element
    let Rules = setSelector[rule.selector];
    //loop each rule and check if it get a mistake will break
    for (let i = 0; i < Rules.length; ++i) {
      errorMessage = Rules[i](inputElement.value);
      if (errorMessage) break;
    }

    // console.log("err", errorMessage);

    if (errorMessage) {
      errorSelector.innerText = errorMessage;
      errorSelector.classList.add("Invalid");
    } else {
      errorSelector.innerText = "";
    }
    //remove error message when admin enter input
    inputElement.oninput = function () {
      errorSelector.innerText = "";
    };

    return !errorMessage;
  };

  //--------------------------------
  //make setSelector variable is blank
  let setSelector = {};
  // get id form
  let getFormSelector = document.querySelector(option.form);

  //check getFormSelector
  if (getFormSelector) {
    let isFormValid = true;

    //onsubmit
    getFormSelector.onsubmit = function (e) {
      e.preventDefault();

      option.rules.forEach(function (rule) {
        let inputElement = getFormSelector.querySelector(rule.selector);

        let isValid = validate(inputElement, rule);
        console.log("isValid", isValid);
        if (!isValid) {
          isFormValid = false;
        }
      });
      if (isFormValid) {
        window.location.assign("map.html");
      }
    };
    //reset isFormValid by event onclick
    let getBtnSelector = getFormSelector.querySelector("#button");
    getBtnSelector.onclick = function () {
      isFormValid = true;
    };
    //add element to setSelector object
    option.rules.forEach((rule) => {
      if (Array.isArray(setSelector[rule.selector])) {
        setSelector[rule.selector].push(rule.check);
      } else {
        setSelector[rule.selector] = [rule.check];
      }
      //get input element
      let inputElement = getFormSelector.querySelector(rule.selector);
      //check input element
      if (inputElement) {
        inputElement.onblur = function () {
          console.log(setSelector[rule.selector]); //access setSelector equivalent to setSelector.key
          validate(inputElement, rule);
        };
      }
    });
  }
}

function isRequired(selector, message) {
  return {
    selector: selector,
    check: function (value) {
      return value ? undefined : message;
    },
  };
}

function isConfirmed(selector, message, valueInput) {
  return {
    selector: selector,
    check: function (value) {
      return value === valueInput ? undefined : message;
    },
  };
}

// if (!isValid) {
//   isFormValid = false;
// } else {
//   isFormValid = true;
// }

// console.log("isForm", isFormValid);

// if (typeof option.onsubmit === "function") {
//   option.onsubmit({ name: "laura" });
// }
