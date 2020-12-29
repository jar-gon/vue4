// 动态创建一个组件

import Vue from 'vue'

function createModal(Component, props) {
  const vm = new Vue({
    render(h) {
      return h(Component, { props })
    }
  }).$mount()

  document.body.appendChild(vm.$el)

  const comp = vm.$children[0]

  comp.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }

  return comp
}

console.info(createModal)
