// Init table
const init_table = () => {
  $.ajax({
    url: `/${site}/php_history_page/api/get_table.php`,
    type: "POST",
    dateType: "text",
    data: {
      field: $("#select_field").val() || fields[0],
    },
    success: (data) => {
      $("#table_body").empty();
      const message = JSON.parse(data).filter((mes) => {
        return mes.show_daily || mes.daily === "0";
      });

      $("#history_table").bootstrapTable("destroy");
      $("#history_table").bootstrapTable({
        data: message,
        exportOptions: {
          fileName: `索道歷史紀錄${new Date().toLocaleTimeString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}`,
        },
        exportTypes: ["csv", "excel"],
        pagination: true,
        paginationLoop: false,
        showJumpTo: true,
        // showColumns: true,
        showExport: true,
        search: true,
        sortName: "time",
        sortOrder: "desc",
      });
    },
    error: () => alert("訊號不穩，請重試！"),
  });
};

const logOutOpen = () => {
  showCheck("log_out");
};

const logOutLoading = () => {
  $("#check_backdrop").css("pointer-events", "none");
  $("#confirm").prepend(loadingIcon());
  logOut();
};

const closeCheck = () => {
  $("#check").css("display", "none");
};

const showCheck = (action, id) => {
  $("#check").css("display", "block");

  switch (action) {
    case "log_out":
      const text1 = `
        <div class="history_form">
            <span class="history_text">確認要登出嗎？</span>
        </div>
      `;

      const buttons1 = `
        <div class="history_form">
            <button onclick="closeCheck()" type="button">
                取消
            </button>
            <button id="confirm" onclick="logOutLoading()" type="button">
                確認
            </button>
        </div>
      `;

      $("#check_box").empty();
      $("#check_box").append(text1);
      $("#check_box").append(buttons1);
      break;
  }
};
