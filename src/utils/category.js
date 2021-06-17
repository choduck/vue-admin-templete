/**
 * Created by PanJiaChen on 16/11/18.
 */
const treeList = 'vue_admin_template_treelist'

export function getListData(setTree) {
  const dataArray = []

  console.log('forEach start ===>')

  setTree.forEach(function(data) {
    const parentId = data.parentId

    // console.log('parentId ===>' + parentId)

    if (parentId === '0000000000') {
      const objTemp = {
        id: data.id,
        label: data.name,
        /* order: data.order,*/
        parentId: parentId
      }
      dataArray.push(objTemp)
    }
  })

  // console.log('this.setTree ===>' + this.setTree)
  console.log('dataArray ===>' + dataArray)
  return dataArray
  // this.data2treeDG(this.setTree, dataArray)
}

export function data2treeDG(datas, dataArray) {
  for (let j = 0; j < dataArray.length; j++) {
    const dataArrayIndex = dataArray[j]
    const childrenArray = []
    const Id = dataArrayIndex.id
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i]

      const parentId = data.parentId
      if (parentId === Id) { // Determine whether it is a child node
        const objTemp = {
          id: data.id,
          label: data.name,
          /* order: data.order,*/
          parentId: parentId
        }
        childrenArray.push(objTemp)
      }
    }
    dataArrayIndex.children = childrenArray
    // console.log(666)
    // console.log(dataArrayIndex.children)
    if (childrenArray.length > 0) { // Recursive if there are son nodes
      data2treeDG(datas, childrenArray)
    }
  }

  // console.log('dataArray ====>' + dataArray)
  // this.setTree = dataArray;
  return dataArray
}

export function setTreeData(treeValue) {
  return sessionStorage.setItem(treeList, treeValue)
}

export function getTreeData() {
  return sessionStorage.getItem(treeList)
}

export function removeTreeData() {
  return sessionStorage.removeItem(treeList)
}
