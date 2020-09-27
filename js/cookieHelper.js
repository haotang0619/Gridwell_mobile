const setCookie = (name, value, days) => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = `${name}=${value};path=/;expires=${d.toGMTString()}`;
};

const getCookie = (name = "accessToken") => {
  const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return v ? v[2] : null;
};

const deleteCookie = (name = "accessToken") => {
  setCookie(name, "", -1);
};

// Check login
const accessToken = getCookie();
$.ajax({
  url: "api/check_login.php",
  type: "POST",
  dateType: "text",
  async: false,
  data: {
    accessToken,
  },
  success: function (data) {
    const message = JSON.parse(data);
    if (message.valid) {
      if (window.location.pathname === "/Gridwell_mobile/") {
        window.location.href = "./control.php";
      }
    } else {
      if (window.location.pathname !== "/Gridwell_mobile/") {
        alert("您尚未登入！");
        window.location.href = "./";
      }
    }
  },
  error: function () {
    alert("網路錯誤");
  },
});
