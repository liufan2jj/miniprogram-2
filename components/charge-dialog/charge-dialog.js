Component({
  /**
   * 组件的属性列表：组件的对外属性，主要用来接收组件使用者传递给组件内部的属性以及数据
   */
  properties: {
    // 如果需要接收传递的属性，有两种方式：全写、简写
    // label: String
    playerId: {
      type: String,
      value: ''
    },
    srcAppid: {
      type: String,
      value: ''
    },
    dramaId: {
      type: String,
      value: ''
    },
    serialNo: {
      type: Number,
      value: 0
    },
    extParam: {
      type: String,
      value: ''
    },
    observers: {
      serialNo(serialNo) {
        // 当集数发生改变的时候，触发此函数
        console.log(serialNo)
      }
    }
  },

  /**
   * 组件的初始数据：用来定义当前组件内部所需要使用的数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表：在组件中，所有的事件处理程序都需要写到 methods 方法中
   */
  methods: {

    // 更新复选框的状态
    updateChecked() {

      this.setData({
        isChecked: !this.data.isChecked,
        // label: '在组件内部也可以修改 properties 中的数据'
      })

      // 在 JS 中可以访问和获取 properties 中的数据
      // 但是一般情况下，不建议修改，因为会造成数据流的混乱
      // console.log(this.properties.label)
      // console.log(this.data.isChecked)
    }

  }

})