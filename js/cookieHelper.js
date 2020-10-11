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
let acc;
$.ajax({
  url: "/IoT/api/check_login.php",
  type: "POST",
  dateType: "text",
  async: false,
  data: {
    accessToken,
  },
  success: (data) => {
    const message = JSON.parse(data);
    if (message.valid) {
      acc = message.acc;
      if (
        window.location.pathname.toLowerCase().replaceAll("/", "") === "iot"
      ) {
        window.location.href = "/IoT/control.php";
      }
    } else {
      if (
        window.location.pathname.toLowerCase().replaceAll("/", "") !== "iot"
      ) {
        alert("您尚未登入！");
        window.location.href = "/IoT/";
      }
    }
  },
  error: () => alert("網路錯誤"),
});

const logOut = () => {
  deleteCookie();
  window.location.href = "/IoT/";
};
