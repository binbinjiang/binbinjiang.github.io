const Server = "http://118.25.100.9:5226";

function getVisitInfo() {
    const url_type = Server+"/getVisitInfo";
    $.get(url_type,function(data){ 
        console.log(data.success)
    })
}

function submitPassword() {
    const password = document.getElementById("password-input").value;
    const url_type = Server+"/validate_password";
    if(password==""){
    // console.log("密码为空");
    return 0
    }

    $.post(url_type, {password: password},function(data){ 
        console.log(data.success)
        console.log(data.name)
        console.log(data.note)
        
        if (data.success) {
            loadContent(data);
        } else {
            document.getElementById('error-message').textContent = 'Error! Please re-enter!';
        }
    })
}

function loadContent(input) {
    const url_type = Server+"/get_dynamic_content";
    $.post(url_type, {phone: input.phone}, function(data){
        document.getElementById('dynamic-content').style.display = "block";
        document.getElementById('dynamic-content').innerHTML = data;
        document.getElementById('password-container').hidden = true;

        var clonedDiv = $('#file-content').clone();  // 复制 id="xx" 的 div 元素
        $('#clone_bio').append(clonedDiv);        // 将复制的元素追加到 id="ff" 的 div 中 
    })
}

// 全屏查看bio
function fullView() {
    document.getElementById('dynamic-content').style.display = "none";
    document.getElementById('fullBio').style.display = "block";

    // 使用 animate 方法平滑滚动到目标位置
    $('html, body').animate({
        scrollTop: $('#btn_back1').offset().top
    }, 1000); // 1000 毫秒（1秒）的平滑滚动

}

function closeFullView() {
    document.getElementById('dynamic-content').style.display = "block";
    document.getElementById('fullBio').style.display = "none";

        // 使用 animate 方法平滑滚动到目标位置
    $('html, body').animate({
        scrollTop: $('#biography').offset().top
    }, 1000); // 1000 毫秒（1秒）的平滑滚动
    
}