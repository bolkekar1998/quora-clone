function popup() {
    obj = document.querySelector(".popup_window");
    obj.style.visibility = "visible";
    obj2 = document.querySelector(".main").style.visibility = "hidden";
}
function close_popup() {
    obj1 = document.querySelector(".popup_window");
    obj1.style.visibility = "hidden";
    obj2 = document.querySelector(".main").style.visibility = "visible";
}