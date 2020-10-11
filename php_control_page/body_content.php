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
            <button class="button_group control_button" type="button">
                開 / 關
            </button>
            <button class="button_group control_button" onclick="window.location.href='/IoT/history.php'" type="button">
                歷史資訊
            </button>
            <button class="button_group control_button" onclick="logOutOpen()" type="button">
                登出
            </button>
        </div>

        <div class="select_group">
            <select class="select_text" id="select_field" required>
                <option value="" selected></option>
                <script type="text/javascript">
                    init_select();
                </script>
            </select>
            <fieldset class="select_field">
                <legend class="select_legend">選擇場域</legend>
            </fieldset>
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
                <!-- php_control_page/js/control.js -->
                <!-- Loading Icon show first -->
                <tbody class="table_body" id="table_body">
                    <script type="text/javascript">
                        $("#table_body").append("<td></td>");
                        $("#table_body").append(loadingIcon("control_loading"));
                        init_table();
                    </script>
                </tbody>
            </table>
        </div>

        <p>請連線至WiFi: powerAP / 1234567890</p>
    </div>
</div>

<!-- Modal  -->
<script type="text/javascript" src="/IoT/php_control_page/components/modal.js"></script>