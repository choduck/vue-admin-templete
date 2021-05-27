<template>
    <div class="custom-tree-container">
        <el-tree :data="setTree" show-checkbox node-key="menuId" ref="tree" highlight-current :props="defaultProps">
        </el-tree>
    </div>
</template>
 
<script>
    //import { root } from '../../api/api';
    import { getTreeList } from '@/api/prodList'
    
    export default {
       data() {
            return {
                setTree:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
            }
        },
        methods: {
          getListData() {
              let dataArray = [];
              
              console.log('forEach start ==>')
              this.setTree.forEach(function (data) {
                      let parentId = data.parentId;
                      
                      console.log('parentId ==>' + parentId)
                      
                      if (parentId == '0000000000') {
                          let objTemp = {
                              id: data.id,
                              name: data.name,
                              /*order: data.order,*/
                              parentId: parentId,
                          }
                          dataArray.push(objTemp);
                      }
              })
              
              //console.log('this.setTree ==>' + this.setTree)
              console.log('dataArray ==>' + dataArray)
              
              this.data2treeDG(this.setTree, dataArray)
          },
          
          data2treeDG(datas, dataArray) {
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
                                name: data.name,
                              /* order: data.order,*/
                                parentId: parentId,
                            }
                            childrenArray.push(objTemp);
                        }
    
                }
                dataArrayIndex.children = childrenArray;
                console.log(666)
                console.log(dataArrayIndex.children)
                            if (childrenArray.length> 0) {//Recursive if there are son nodes
                    this.data2treeDG(datas, childrenArray)
                }
            }
            this.setTree = dataArray;
            return dataArray;
          },
        },
        created() {
            var _this = this;
            // Here is the request for data
            getTreeList().then(data => {
                
                //console.log('data ==>' + JSON.stringify(data.data.treeModel))
                
                _this.setTree = data.data.treeModel
                console.log('_this.setTree start==>')
                console.log('_this.setTree ==>' + JSON.stringify(_this.setTree))
                _this.getListData()
                  // this.$router.push({ path: '/table' });
            });
 
        }
    }
</script>
<style lang="scss" scoped>
 
</style>
 