export default {

  onLoading(state) {
    state.loading = true
  },

  offLoading(state) {
    state.loading = false
  },

  setAddress(state, address) {
    state.address = address
    // localStorage.setItem("address",address)
  },

  setToken(state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },

  setNum(state, num) {
    state.Num = num
  },

  // 购物车有关的设置
  setCartsList(state, cartslist) {
    state.cartsList = cartslist
    state.cartsList.map(item => {
      item.chooseStatus = true,
        item.deleteStatus = false
    })
  },

  setCartsListNum(state, val) {
    let newCartsList = []
    state.cartsList.forEach(item => {
      if (item.goodsId == val.goodsId) {
        item.num = val.num
        newCartsList.push(item)
      } else {
        newCartsList.push(item)
      }
    })
    state.cartsList = newCartsList
  },

  setCartsListAllStatus(state, val) {
    let tempList = []
    if (val.deleteflag) {
      if (val.allflag) {
        state.cartsList.forEach(item => {
          item.deleteStatus = false
          tempList.push(item)
        })
      } else {
        state.cartsList.forEach(item => {
          item.deleteStatus = true
          tempList.push(item)
        })
      }
    } else {
      if (val.allflag) {
        state.cartsList.forEach(item => {
          item.chooseStatus = false
          tempList.push(item)
        })
      } else {
        state.cartsList.forEach(item => {
          item.chooseStatus = true
          tempList.push(item)
        })
      }
    }
    state.cartsList = tempList
  },

  setCartsListStatus(state, val) {
    let tempList = []
    state.cartsList.forEach(item => {
      if (val.deleteflag == true) {
        if (item.goodsId == val.goodsId) {
          item.deleteStatus = !item.deleteStatus
        }
        tempList.push(item)
      } else {
        if (item.goodsId == val.goodsId) {
          item.chooseStatus = !item.chooseStatus
        }
        tempList.push(item)
      }
    })
    state.cartsList = tempList
  },
  deleteCartsList(state, goodsIdList) {
    let tempList = state.cartsList
    goodsIdList.forEach(goodsId => {
      tempList=tempList.filter(item=>{
        return item.goodsId != goodsId
      })
    })
    state.cartsList = tempList
  }
}