// Vue.directive('drag', function (el) {
//   el.style.position = 'absolute'
//   el.onmousedown = function (ev) {
//     console.log(ev)
//     // 用元素距离视窗的X、Y坐标，减去el元素最近的相对定位父元素的left、top值
//     var sX = ev.clientX - el.offsetLeft
//     var sY = ev.clientY - el.offsetTop
//     document.onmousemove = function (ev) {
//       var eX = ev.clientX - sX
//       var eY = ev.clientY - sY
//       // 不断地更新元素的left、top值
//       el.style.left = eX + 'px'
//       el.style.top = eY + 'px'
//     }
//     document.onmouseup = function () {
//       // 清除mousemove事件
//       document.onmousemove = null
//     }
//   }
// })