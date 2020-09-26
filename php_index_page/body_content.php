<div>
    <!-- Nav bar start-->
    <header class="nav_group">
        <div class="nav_inside">
            <h6 class="nav_title">登入頁面</h6>
        </div>
    </header>
    <!-- Nav bar end-->

    <div class="container">
        <img alt="logo" src="images/login.jpg">
        <h5 class="title">IoT監測控制系統</h5>
        <div class="form">
            <span class="text">帳號</span>
            <div class="input_group">
                <input type="text" class="input_area" id="account" required />
                <label for="account" class="input_label">輸入帳號</label>
            </div>
        </div>
        <div class="form">
            <span class="text">密碼</span>
            <div class="input_group">
                <input type="text" class="input_area" id="password" required />
                <label for="password" class="input_label">輸入密碼</label>
            </div>
        </div>
        <button class="button_group" onclick="submitLogin()" type="button">
            送出
        </button>
    </div>
</div>