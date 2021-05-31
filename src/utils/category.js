/**
 * Created by PanJiaChen on 16/11/18.
 */


export function getListData(setTree) {
  let dataArray = [];
  
  console.log('forEach start ==>')
  
  setTree.forEach(function (data) {
    let parentId = data.parentId;
    
    //console.log('parentId ==>' + parentId)
    
    if (parentId == '0000000000') {
        let objTemp = {
            id: data.id,
            label: data.name,
            /*order: data.order,*/
            parentId: parentId,
        }
        dataArray.push(objTemp);
    }
  })
  
  //console.log('this.setTree ==>' + this.setTree)
  console.log('dataArray ==>' + dataArray)
  return dataArray
  //this.data2treeDG(this.setTree, dataArray)
}

export function data2treeDG(datas, dataArray) {

  for (let j = 0; j < dataArray.length; j++) {
      let dataArrayIndex = dataArray[j];
      let childrenArray = [];
      let Id = dataArrayIndex.id;
      for (let i = 0; i < datas.length; i++) {
          let data = datas[i];


          let parentId = data.parentId;
          if (parentId == Id) {//Determine whether it is a child node
              let objTemp = {
                  id: data.id,
                  label: data.name,
                /* order: data.order,*/
                  parentId: parentId,
              }
              childrenArray.push(objTemp);
          }

      }
      dataArrayIndex.children = childrenArray;
      //console.log(666)
      //console.log(dataArrayIndex.children)
      if (childrenArray.length> 0) {//Recursive if there are son nodes
          data2treeDG(datas, childrenArray)
      }
  }
  
  //console.log('dataArray ===>' + dataArray)
  //this.setTree = dataArray;
  return dataArray;
}
