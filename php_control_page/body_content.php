<div>
    <!-- Nav bar start-->
    <header class="nav_group">
        <div class="nav_inside">
            <h6 class="nav_title">自動開關控制頁面</h6>
        </div>
    </header>
    <!-- Nav bar end-->

    <div class="container">
        <div class="control_header">
            <button class="button_group control_button" onclick="switchTab(0)" type="button">
                開 / 關
            </button>
            <button class="button_group control_button" onclick="switchTab(1)" type="button">
                歷史資訊
            </button>
            <button class="button_group control_button" onclick="logOut()" type="button">
                登出
            </button>
        </div>

        <div class="select_group">
            <select class="select_text" onchange="switchImage()" required>
                <option value=""></option>
                <option value="1" selected>1</option>
            </select>
            <label class="select_label">選擇場域</label>
        </div>

        <div class="table_group">
            <table class="table_root" aria-label="table">
                <thead class="table_head">
                    <tr class="table_head_tr">
                        <th class="table_head_th" scope="col">設備名稱</th>
                        <th class="table_head_th" scope="col">設備內容</th>
                        <th class="table_head_th" scope="col">設備狀態</th>
                    </tr>
                </thead>
                <tbody class="table_body">
                    <tr class="table_body_tr">
                        <td class="table_body_td">1</td>
                        <td class="table_body_td">
                            <button class="button_group control_on_off" onclick="switchOn(1)" type="button">
                                ON
                            </button>
                            <button class="button_group control_on_off" onclick="switchOff(1)" type="button">
                                OFF
                            </button>
                        </td>
                        <td class="table_body_td">
                            <button class="button_group control_online" onclick="switchOnline(1)" type="button">
                                上線
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p>請連線至WiFi: powerAP / 1234567890</p>
    </div>
</div>