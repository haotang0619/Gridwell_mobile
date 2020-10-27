// Init select
const init_select = () => {
  $.ajax({
    url: `/${site}/api/get_select.php`,
    type: "POST",
    async: false,
    success: (data) => {
      const message = JSON.parse(data);
      message.forEach((mes) => {
        $("#select_field").append(`
            <option value="${mes.id}" selected>${mes.field}</option>
        `);
      });
    },
    error: () => alert("網路錯誤，請重試！"),
  });
};
