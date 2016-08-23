/*
 *就地编辑组件
 *created by 夏君
 *2016-8-23
 *每个人都有保持代码优雅的责任
 */
function EditInPlaceField(id, parent, value) {
  this.id = id;
  this.value = value || 'default value';
  this.parentElement = parent;
  this.createElement(this.id);
  // 绑定时间
  this.attachEvents();
}

EditInPlaceField.prototype = {
  createElement: function (id) {
    this.containerElement = document.createElement('div');
    this.parentElement.appendChild(this.containerElement);

    this.staticElement = document.createElement('span');
    this.containerElement.appendChild(this.staticElement);
    this.staticElement.innerHTML = this.value;

    // 创建input
    this.fieldElement = document.createElement('input');
    this.fieldElement.type = 'text';
    this.fieldElement.value = this.value;
    this.containerElement.appendChild(this.fieldElement);

    // 创建保存按钮
    this.saveButton = document.createElement('input');
    this.saveButton.type = 'button';
    this.saveButton.value = '保存';
    this.containerElement.appendChild(this.saveButton);

    // 创建取消按钮
    this.cancelButton = document.createElement('input');
    this.cancelButton.type = 'button';
    this.cancelButton.value = '取消';
    this.containerElement.appendChild(this.cancelButton);

    this.convertTotext();
  },

  // 将编辑框及按钮隐藏只显示文本状态
  convertTotext:function() {
    // 将文本输入框隐藏
    this.fieldElement.style.display = 'none';
    // 隐藏按钮
    this.saveButton.style.display = 'none';
    this.cancelButton.style.display = 'none';
    this.staticElement.style.display = 'inline';
    this.setValue(this.value);
  },
  attachEvents:function() {
      var that = this;
      // span的点击事件
      this.staticElement.addEventListener('click', function () {
        // 将状态切为编辑状态
        that.convertToEditable();
      },false);

      // 绑定取消按钮的事件，
      // 从编辑状态切换成文本状态
      this.cancelButton.addEventListener('click', function() {
        that.cancel();
      },false);

      this.saveButton.addEventListener('click', function() {
        that.save();
      },false);
  },
  convertToEditable:function() {
    // 将span隐藏
    this.staticElement.style.display = 'none';
    // 将编辑元素显示
    this.fieldElement.style.display = 'inline-block';
    this.saveButton.style.display = 'inline-block';
    this.cancelButton.style.display = 'inline-block';
    // 设置input的value
    this.setValue(this.value);
  },
  setValue:function(value) {
    // 同步input及span
    // 设置输入框的值
    this.fieldElement.value = value;
    // 设置span的html
    this.staticElement.innerHTML = value;
  },
  cancel:function() {
    this.convertTotext();
  },
  save:function() {
    this.value = this.getValue();
    this.convertTotext();
  },
  getValue:function() {
    // 获得当前input的值
    return this.fieldElement.value;
  }
}
