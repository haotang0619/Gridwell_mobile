// Cookie function from "js/cookieHelper.js"

const submit = (event) => {
  // press "Enter"
  if (event.which === 13) {
    $("#submit").click();
  }
};

const logIn = () => {
  acc = $("#account").val();
  pwd = $("#password").val();

  $.ajax({
    url: "php_index_page/api/log_in.php",
    type: "POST",
    dateType: "text",
    data: {
      acc,
      pwd,
    },
    success: (data) => {
      const message = JSON.parse(data);
      if (message.valid) {
        setCookie("accessToken", message.token, 1);
        window.location.href = "./control.php";
      } else {
        alert("帳號或密碼錯誤！");
      }
    },
    error: () => alert("網路錯誤"),
  });
};
