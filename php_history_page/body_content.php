<div>
    <!-- Nav bar start-->
    <header class="nav_group">
        <div class="nav_inside">
            <h6 class="nav_title">歷史資訊查詢頁面</h6>
        </div>
    </header>
    <!-- Nav bar end-->

    <div class="container">
        <div class="history_header">
            <button class="button_group history_button" onclick="switchTab(0)" type="button">
                開 / 關
            </button>
            <button class="button_group history_button" onclick="switchTab(1)" type="button">
                歷史資訊
            </button>
            <button class="button_group history_button" onclick="logOut()" type="button">
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
                        <th class="table_head_th" scope="col">編號</th>
                        <th class="table_head_th" scope="col">設備ID</th>
                        <th class="table_head_th" scope="col">操作者</th>
                        <th class="table_head_th" scope="col">操作時間</th>
                    </tr>
                </thead>
                <tbody class="table_body">
                    <tr class="table_body_tr">
                        <td class="table_body_td">1</td>
                        <td class="table_body_td">機具1</td>
                        <td class="table_body_td">王大明</td>
                        <td class="table_body_td">109/05/06 10:20</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>