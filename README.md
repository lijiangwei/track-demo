## 远程调试链接
* <script src="http://192.168.2.154:8090/target/target-script-min.js#anonymous"></script>

## 事件映射

* 删除-keydown keyCode=8


## 光标
``` javascript
if(document.selection){
    var sel=document.selection.createRange();
    if(sel.text.length>0){
      word=sel.text;
    }
  }
  else if(select_field.selectionStart||select_field.selectionStart=='0'){
    var startP=select_field.selectionStart;
    var endP=select_field.selectionEnd;
    if(startP!=endP){
      word=select_field.value.substring(startP, endP);
    }
  }
```
