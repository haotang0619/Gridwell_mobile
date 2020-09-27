// Init table
$.ajax({
  url: "php_control_page/api/get_table.php",
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
                <span id="on_off_${mes.id}">-</span>
            </td>
          `;
          break;

        case "1":
          content += `
                <span id="value_${mes.id}">2.5</span>
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

      $("#table_body").append(`${tr_start}${name}${content}${status}${tr_end}`);
    });
  },
  error: () => alert("網路錯誤"),
});

const closeModal = () => {
  $("#modal").css("display", "none");
};

const editNameOpen = (id) => {
  const name = $(`#name_${id}`).html();

  $("#modal").css("display", "block");
  const header = `
    <div class="control_form">
        <h2 class="control_text">編輯名稱</h2>
    </div>
  `;

  const form = `
    <div class="control_form">
        <span class="control_text">名稱</span>
        <div class="input_group">
            <input type="text" class="input_area" id="new_name" value="${name}" required />
            <label for="new_name" class="input_label">輸入名稱</label>
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

  $.ajax({
    url: "php_control_page/api/edit_name.php",
    type: "POST",
    dateType: "text",
    data: {
      field: 1,
      id,
      name,
    },
    success: (data) => {
      const message = JSON.parse(data);
      if (message.success) {
        $(`#name_${id}`).text(name);
        closeCheck();
        closeModal();
      } else {
        alert("網路錯誤");
      }
    },
    error: () => alert("網路錯誤"),
  });
};

const switchOnOpen = (id) => {
  showCheck("switch_on", id);
};

const switchOn = (id) => {
  $.ajax({
    url: "http://111.185.9.227:3008/onn",
    type: "GET",
    dateType: "jsonp",
    data: {
      nodeid: id,
    },
    success: () => {
      $(`#on_off_${id}`).text("1");
      closeCheck();
    },
    error: () => alert("網路錯誤"),
  });
};

const switchOffOpen = (id) => {
  showCheck("switch_off", id);
};

const switchOff = (id) => {
  $.ajax({
    url: "http://111.185.9.227:3008/off",
    type: "GET",
    dateType: "jsonp",
    data: {
      nodeid: id,
    },
    success: () => {
      $(`#on_off_${id}`).text("0");
      closeCheck();
    },
    error: () => alert("網路錯誤"),
  });
};

const switchOnlineOpen = (id) => {
  showCheck("switch_online", id);
};

const switchOnline = (id) => {
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
          $(`#on_off_${id}`).text("-");
          $(`#status_${id}`).html("未知");
          break;

        case "":
          $(`#on_off_${id}`).text("0");
          $(`#status_${id}`).html("上線");
          break;

        default:
          $(`#on_off_${id}`).text("1");
          $(`#status_${id}`).html("離線");
          break;
      }
      closeCheck();
    },
    error: () => alert("網路錯誤"),
  });
};

const setFormulaOpen = (id) => {
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
            <input type="text" class="input_area" id="new_a" onkeyup="changeFormula()" value=1 required />
            <label for="new_a" class="input_label">輸入a值</label>
        </div>
    </div>
    <div class="control_form">
        <span class="control_text">b</span>
        <div class="input_group">
            <input type="text" class="input_area" id="new_b" onkeyup="changeFormula()" value=1 required />
            <label for="new_b" class="input_label">輸入b值</label>
        </div>
    </div>
  `;

  const text = `
    <div class="control_form">
        <span class="control_text">
            <span id="text_a">1</span> X + <span id="text_b">1</span>
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
  console.log(`setFormula(${id})`);
  closeCheck();
  closeModal();
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
            <span class="control_text">確認要更改此設備的名稱嗎？</span>
        </div>
      `;

      const buttons1 = `
        <div class="control_form">
            <button class="button_group" onclick="closeCheck()" type="button">
                取消
            </button>
            <button class="button_group" onclick="editName(${id})" type="button">
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
            <button class="button_group" onclick="switchOn(${id})" type="button">
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
            <button class="button_group" onclick="switchOff(${id})" type="button">
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
            <button class="button_group" onclick="switchOnline(${id})" type="button">
                確認
            </button>
        </div>
      `;

      $("#check_box").empty();
      $("#check_box").append(text4);
      $("#check_box").append(buttons4);
      break;

    default:
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
            <button class="button_group" onclick="setFormula(${id})" type="button">
                確認
            </button>
        </div>
      `;

      $("#check_box").empty();
      $("#check_box").append(text5);
      $("#check_box").append(buttons5);
      break;
  }
};
