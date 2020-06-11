function changeMethod(pass) {
  if (pass.value == 1) document.forms[0].method = "get";
  else document.forms[0].method = "post";
  console.log("done");
}

function validation(name) {
  if (name == "email") {
    return (pass) => {
      pass.value = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
        pass.value
      )
        ? pass.value
        : "";
    };
  }
  else if (name == "name") {
    return (pass) => {
      pass.value = /^[A-Z]{1}([a-z]|\s){4,}/.test(
        pass.value
      )
        ? pass.value
        : "";
    };
  }
}

function basicValidation() {
  // console.log("hai");
  if (
    !document.forms[0].name.value ||
    !document.forms[0].email.value ||
    !document.forms[0].password.value ||
    !document.forms[0].mobnum.value
  ){
    event.preventDefault();
    return false;
  }
}
