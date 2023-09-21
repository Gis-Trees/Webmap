SetFormValidator({
  form: "#adminForm",
  formGroupSelector: ".form-group",
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
function SetFormValidator(option) {
  let getParent = (element, selector) => {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  };
  let validate = (inputElement, rule) => {
    let errorSelector = getParent(
      inputElement,
      option.formGroupSelector
    ).querySelector(option.errorSelector);
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
        toast({
          title: "Login success",
          type: "success",
          duration: 2,
          delay: 3,
        });
        setTimeout(function () {
          window.location.assign("map.html");
        }, 2000);
      } else {
        toast({
          title: "Login error",
          type: "error",
          duration: 2,
          delay: 3,
        });
      }
    };
    //reset isFormValid by event onclick
    let getBtnSelector = getFormSelector.querySelector("#button");
    getBtnSelector.onclick = function (e) {
      isFormValid = true;
      console.log("e", e);
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
      console.log(inputElement);
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
      return value.trim() ? undefined : message;
    },
  };
}

export function isConfirmed(selector, message, valueInput) {
  return {
    selector: selector,
    check: function (value) {
      return value === valueInput ? undefined : message;
    },
  };
}

function toast({ title, type, duration, delay }) {
  const toastID = document.getElementById("toast");
  if (toastID) {
    const createIdToast = document.createElement("div");
    createIdToast.style.animation = ` slideFromRight ${duration}s ease, fadeOut ${duration}s linear ${delay}s forwards`;
    createIdToast.classList.add("toast", `toast--${type}`);
    createIdToast.innerHTML = `
  <div class="toast__icon">
    <i class="fa-regular fa-circle-check"></i>
  </div>
  <div class="toast__body">
    <h3 class="toast__title">${title}</h3>
  </div>
  <div class="toast__close">
    <i class="fa-solid fa-xmark"></i>
  </div>
  `;
    toastID.appendChild(createIdToast);
    let removeToast = setTimeout(
      () => toastID.removeChild(createIdToast),
      5000
    );
    createIdToast.querySelector(".toast__close").onclick = () => {
      toastID.removeChild(createIdToast);
      clearTimeout(removeToast);
    };
  }
}
