// Init table
$.ajax({
  url: "php_control_page/api/get_table.php",
  type: "POST",
  dateType: "text",
  data: {
    field: 1,
  },
  success: function (data) {
    $("#table_body").empty();

    const message = JSON.parse(data);
    message.forEach((mes) => {
      const tr_start = `<tr class="table_body_tr">`;
      let name = `
        <td class="table_body_td control_name_td">
        <span class="control_name_span" id="name_${mes.id}">${mes.name}</span>
      `;
      // svg => Edit Icon
      name += `
            <button class="button_group control_setting" onclick="editNameOpen(${mes.id})" type="button">
                <svg class="button_svg control_svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
            </button>
        </td>
      `;

      let content = `<td class="table_body_td">`;
      switch (mes.type) {
        case "0":
          content += `
                <button class="button_group" onclick="switchOn(${mes.id})" type="button">
                    ON
                </button>
                <button class="button_group" onclick="switchOff(${mes.id})" type="button">
                    OFF
                </button>
                <span id="#on_off_${mes.id}">-</span>
            </td>
          `;
          break;
        case "1":
          // svg => Setting Icon
          content += `
                <span id="#value_${mes.id}">2.5</span>
                <button class="button_group control_setting" onclick="setFormula(${mes.id})" type="button">
                    <svg class="button_svg control_svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path transform="scale(1.2, 1.2)" d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"></path></svg>
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
            <button class="button_group control_online" onclick="switchOnline(${mes.id})" type="button">
                更新
            </button>
        </td>
      `;
      const tr_end = `</tr>`;

      $("#table_body").append(`${tr_start}${name}${content}${status}${tr_end}`);
    });
  },
  error: function () {
    alert("網路錯誤");
  },
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
            <label for="account" class="input_label">輸入名稱</label>
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
    success: function (data) {
      const message = JSON.parse(data);
      if (message.success) {
        $(`#name_${id}`).text(name);
        closeCheck();
        closeModal();
      } else {
        alert("網路錯誤");
      }
    },
    error: function () {
      alert("網路錯誤");
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
      const text = `
        <div class="control_form">
            <span class="control_text">確認要更改此設備的名稱嗎？</span>
        </div>
      `;

      const buttons = `
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
      $("#check_box").append(text);
      $("#check_box").append(buttons);
      break;
  }
};
