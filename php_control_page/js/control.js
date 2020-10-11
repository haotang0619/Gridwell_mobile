// Init table
const init_table = () => {
  $.ajax({
    url: "/IoT/php_control_page/api/get_table.php",
    type: "POST",
    dateType: "text",
    data: {
      field: 1,
    },
    success: (data) => {
      $("#table_body").empty();

      const message = JSON.parse(data);
      message.forEach((mes) => {
        const tr_start = `<tr class="table_body_tr">`;
        let name = `
          <td class="table_body_td control_name_td">
            <span class="control_name_span" id="name_${mes.id}">${mes.name}</span>
            <span style="display: none" id="IP_${mes.id}">${mes.IP}</span>
            <span style="display: none" id="port_${mes.id}">${mes.port}</span>
        `;
        name += `
              <button class="button_group control_setting" onclick="editNameOpen(${
                mes.id
              })" type="button">
                  ${editIcon("button_svg control_svg")}
              </button>
          </td>
        `;

        let content = `<td class="table_body_td">`;
        switch (mes.type) {
          case "0":
            content += `
                  <button class="button_group" onclick="switchOnOpen(${mes.id})" type="button">
                      ON
                  </button>
                  <button class="button_group" onclick="switchOffOpen(${mes.id})" type="button">
                      OFF
                  </button>
                  <span id="on_off_${mes.id}">--</span>
              </td>
            `;
            break;

          case "1":
            content += `
                  <span id="value_${mes.id}">2.5</span>
                  <span style="display: none" id="old_a_${mes.id}">${
              mes.a
            }</span>
                  <span style="display: none" id="old_b_${mes.id}">${
              mes.b
            }</span>
                  <button class="button_group control_setting" onclick="setFormulaOpen(${
                    mes.id
                  })" type="button">
                  ${settingIcon("button_svg control_svg")}
                  </button>
              </td>
            `;
            break;

          default:
            content += `
                  <button class="button_group" onclick="viewVideo(${mes.id})" type="button">
                      查看
                  </button>
                  <button class="button_group" onclick="editIP(${mes.id})" type="button">
                      編輯
                  </button>
              </td>
            `;
            break;
        }
        const status = `
          <td class="table_body_td">
              <button class="button_group control_online" id="status_${mes.id}" onclick="switchOnlineOpen(${mes.id})" type="button">
                  更新
              </button>
          </td>
        `;
        const tr_end = `</tr>`;

        $("#table_body").append(
          `${tr_start}${name}${content}${status}${tr_end}`
        );
      });
    },
    error: () => alert("網路錯誤"),
  });
};

const closeModal = () => {
  $("#modal").css("display", "none");
};

const logOutOpen = () => {
  showCheck("log_out");
};

const logOutLoading = () => {
  $("#check_backdrop").css("pointer-events", "none");
  $("#confirm").prepend(loadingIcon());
  logOut();
};

const editNameOpen = (id) => {
  const name = $(`#name_${id}`).html();
  const IP = $(`#IP_${id}`).html();
  const port = $(`#port_${id}`).html();

  $("#modal").css("display", "block");
  const header = `
    <div class="control_form">
        <h2 class="control_text">編輯資訊</h2>
    </div>
  `;

  const form = `
    <div class="control_form">
        <span class="control_text">名稱</span>
        <div class="input_group">
            <input type="text" class="input_area" id="new_name" value="${name}" required />
            <fieldset class="input_field">
                <legend class="input_legend">輸入名稱</legend>
            </fieldset>
        </div>
    </div>
    <div class="control_form">
        <span class="control_text">IP位址</span>
        <div class="input_group">
            <input type="text" class="input_area" id="new_IP" value="${IP}" required />
            <fieldset class="input_field">
                <legend class="input_legend">輸入IP</legend>
            </fieldset>
        </div>
    </div>
    <div class="control_form">
        <span class="control_text">通訊埠</span>
        <div class="input_group">
            <input type="text" class="input_area" id="new_port" value="${port}" required />
            <fieldset class="input_field">
                <legend class="input_legend">輸入通訊埠</legend>
            </fieldset>
        </div>
    </div>
  `;

  const buttons = `
    <div class="control_form">
        <button class="button_group" onclick="closeModal()" type="button">
            取消
        </button>
        <button class="button_group" onclick="showCheck('name', ${id})" type="button">
            送出
        </button>
    </div>
  `;

  $("#modal_box").empty();
  $("#modal_box").append(header);
  $("#modal_box").append(form);
  $("#modal_box").append(buttons);
};

const editName = (id) => {
  const name = $("#new_name").val();
  const IP = $("#new_IP").val();
  const port = $("#new_port").val();
  $("#check_backdrop").css("pointer-events", "none");
  $("#confirm").prepend(loadingIcon());

  $.ajax({
    url: "/IoT/php_control_page/api/edit_name.php",
    type: "POST",
    dateType: "text",
    data: {
      field: 1,
      id,
      name,
      IP,
      port,
    },
    success: (data) => {
      const message = JSON.parse(data);
      if (message.success) {
        $(`#name_${id}`).text(name);
        $(`#IP_${id}`).text(IP);
        $(`#port_${id}`).text(port);
        closeCheck();
        closeModal();
      } else {
        alert("網路錯誤");
        $("#confirm").html("確認");
      }
      $("#check_backdrop").css("pointer-events", "auto");
    },
    error: () => {
      alert("網路錯誤");
      $("#confirm").html("確認");
      $("#check_backdrop").css("pointer-events", "auto");
    },
  });
};

const switchOnOpen = (id) => {
  showCheck("switch_on", id);
};

const switchOn = (id) => {
  $("#check_backdrop").css("pointer-events", "none");
  $("#confirm").prepend(loadingIcon());

  $.ajax({
    url: "http://111.185.9.227:3008/onn",
    type: "GET",
    dateType: "jsonp",
    data: {
      nodeid: id,
    },
    success: () => {
      $(`#on_off_${id}`).text("On");
      closeCheck();
      $("#check_backdrop").css("pointer-events", "auto");
    },
    error: () => {
      alert("網路錯誤");
      $("#confirm").html("確認");
      $("#check_backdrop").css("pointer-events", "auto");
    },
  });
};

const switchOffOpen = (id) => {
  showCheck("switch_off", id);
};

const switchOff = (id) => {
  $("#check_backdrop").css("pointer-events", "none");
  $("#confirm").prepend(loadingIcon());

  $.ajax({
    url: "http://111.185.9.227:3008/off",
    type: "GET",
    dateType: "jsonp",
    data: {
      nodeid: id,
    },
    success: () => {
      $(`#on_off_${id}`).text("Off");
      closeCheck();
      $("#check_backdrop").css("pointer-events", "auto");
    },
    error: () => {
      alert("網路錯誤");
      $("#confirm").html("確認");
      $("#check_backdrop").css("pointer-events", "auto");
    },
  });
};

const switchOnlineOpen = (id) => {
  showCheck("switch_online", id);
};

const switchOnline = (id) => {
  $("#check_backdrop").css("pointer-events", "none");
  $("#confirm").prepend(loadingIcon());

  $.ajax({
    url: "http://111.185.9.227:3008/stat",
    type: "GET",
    dateType: "jsonp",
    data: {
      nodeid: id,
    },
    success: (data) => {
      switch (data) {
        case "Unknown":
          $(`#on_off_${id}`).text("--");
          $(`#status_${id}`).html("未知");
          break;

        default:
          $(`#on_off_${id}`).text("On");
          $(`#status_${id}`).html("上線");
          break;
      }
      closeCheck();
      $("#check_backdrop").css("pointer-events", "auto");
    },
    error: () => {
      alert("網路錯誤");
      $("#confirm").html("確認");
      $("#check_backdrop").css("pointer-events", "auto");
    },
  });
};

const setFormulaOpen = (id) => {
  const old_a = $(`#old_a_${id}`).html();
  const old_b = $(`#old_b_${id}`).html();

  $("#modal").css("display", "block");
  const header = `
    <div class="control_form">
        <h2 class="control_text">編輯公式</h2>
    </div>
  `;

  const form = `
    <div class="control_form">
        <span class="control_text">a</span>
        <div class="input_group">
            <input type="text" class="input_area" id="new_a" onkeyup="changeFormula()" value="${old_a}" required />
            <fieldset class="input_field">
                <legend class="input_legend">輸入a值</legend>
            </fieldset>
        </div>
    </div>
    <div class="control_form">
        <span class="control_text">b</span>
        <div class="input_group">
            <input type="text" class="input_area" id="new_b" onkeyup="changeFormula()" value="${old_b}" required />
            <fieldset class="input_field">
                <legend class="input_legend">輸入b值</legend>
            </fieldset>
        </div>
    </div>
  `;

  const text = `
    <div class="control_form">
        <span class="control_text">
            <span id="text_a">${old_a}</span> X + <span id="text_b">${old_b}</span>
        </span>
    </div>
  `;

  const buttons = `
    <div class="control_form">
        <button class="button_group" onclick="closeModal()" type="button">
            取消
        </button>
        <button class="button_group" onclick="showCheck('formula', ${id})" type="button">
            送出
        </button>
    </div>
  `;

  $("#modal_box").empty();
  $("#modal_box").append(header);
  $("#modal_box").append(form);
  $("#modal_box").append(text);
  $("#modal_box").append(buttons);
};

const changeFormula = () => {
  $("#text_a").text($("#new_a").val());
  $("#text_b").text($("#new_b").val());
};

const setFormula = (id) => {
  const new_a = $("#new_a").val();
  const new_b = $("#new_b").val();
  $("#check_backdrop").css("pointer-events", "none");
  $("#confirm").prepend(loadingIcon());

  $.ajax({
    url: "/IoT/php_control_page/api/edit_formula.php",
    type: "POST",
    dateType: "text",
    data: {
      field: 1,
      id,
      new_a,
      new_b,
    },
    success: (data) => {
      const message = JSON.parse(data);
      if (message.success) {
        $(`#old_a_${id}`).text(new_a);
        $(`#old_b_${id}`).text(new_b);
        closeCheck();
        closeModal();
      } else {
        alert("網路錯誤");
        $("#confirm").html("確認");
      }
      $("#check_backdrop").css("pointer-events", "auto");
    },
    error: () => {
      alert("網路錯誤");
      $("#confirm").html("確認");
      $("#check_backdrop").css("pointer-events", "auto");
    },
  });
};

const closeCheck = () => {
  $("#check").css("display", "none");
};

const showCheck = (action, id) => {
  $("#check").css("display", "block");

  switch (action) {
    case "name":
      const text1 = `
        <div class="control_form">
            <span class="control_text">確認要更改此設備的資訊嗎？</span>
        </div>
      `;

      const buttons1 = `
        <div class="control_form">
            <button class="button_group" onclick="closeCheck()" type="button">
                取消
            </button>
            <button class="button_group" id="confirm" onclick="editName(${id})" type="button">
                確認
            </button>
        </div>
      `;

      $("#check_box").empty();
      $("#check_box").append(text1);
      $("#check_box").append(buttons1);
      break;

    case "switch_on":
      const text2 = `
        <div class="control_form">
            <span class="control_text">確認要開啟此設備嗎？</span>
        </div>
      `;

      const buttons2 = `
        <div class="control_form">
            <button class="button_group" onclick="closeCheck()" type="button">
                取消
            </button>
            <button class="button_group" id="confirm" onclick="switchOn(${id})" type="button">
                確認
            </button>
        </div>
      `;

      $("#check_box").empty();
      $("#check_box").append(text2);
      $("#check_box").append(buttons2);
      break;

    case "switch_off":
      const text3 = `
        <div class="control_form">
            <span class="control_text">確認要關閉此設備嗎？</span>
        </div>
      `;

      const buttons3 = `
        <div class="control_form">
            <button class="button_group" onclick="closeCheck()" type="button">
                取消
            </button>
            <button class="button_group" id="confirm" onclick="switchOff(${id})" type="button">
                確認
            </button>
        </div>
      `;

      $("#check_box").empty();
      $("#check_box").append(text3);
      $("#check_box").append(buttons3);
      break;

    case "switch_online":
      const text4 = `
        <div class="control_form">
            <span class="control_text">確認要更新此設備狀態嗎？</span>
        </div>
      `;

      const buttons4 = `
        <div class="control_form">
            <button class="button_group" onclick="closeCheck()" type="button">
                取消
            </button>
            <button class="button_group" id="confirm" onclick="switchOnline(${id})" type="button">
                確認
            </button>
        </div>
      `;

      $("#check_box").empty();
      $("#check_box").append(text4);
      $("#check_box").append(buttons4);
      break;

    case "formula":
      const text5 = `
        <div class="control_form">
            <span class="control_text">確認要更改此設備的公式嗎？</span>
        </div>
      `;

      const buttons5 = `
        <div class="control_form">
            <button class="button_group" onclick="closeCheck()" type="button">
                取消
            </button>
            <button class="button_group" id="confirm" onclick="setFormula(${id})" type="button">
                確認
            </button>
        </div>
      `;

      $("#check_box").empty();
      $("#check_box").append(text5);
      $("#check_box").append(buttons5);
      break;

    case "log_out":
      const text6 = `
        <div class="control_form">
            <span class="control_text">確認要登出嗎？</span>
        </div>
      `;

      const buttons6 = `
        <div class="control_form">
            <button class="button_group" onclick="closeCheck()" type="button">
                取消
            </button>
            <button class="button_group" id="confirm" onclick="logOutLoading()" type="button">
                確認
            </button>
        </div>
      `;

      $("#check_box").empty();
      $("#check_box").append(text6);
      $("#check_box").append(buttons6);
      break;
  }
};
