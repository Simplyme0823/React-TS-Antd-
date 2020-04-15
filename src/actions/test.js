var menuArry = [
    { id: 2, name: "请假申请", pid: 1 },
    { id: 3, name: "出差申请", pid: 1 },
    { id: 1, name: "办公管理", pid: 0 },
    { id: 4, name: "请假记录", pid: 2 },
    { id: 5, name: "系统设置", pid: 0 },
    { id: 6, name: "权限管理", pid: 5 },
    { id: 7, name: "用户角色", pid: 6 },
    { id: 8, name: "菜单设置", pid: 6 },
];


function treeData(source) {
    let cloneData = JSON.parse(JSON.stringify(source))
    return cloneData.filter(father => {
        let branchArr = cloneData.filter(child => father.id === child.pid);
        branchArr.length > 0 ? father.children = branchArr : ''
        return father.pid === 0
    })
}

console.log(JSON.stringify(treeData(menuArry)))






const obj ={}

let obj2={children:'a'}



obj.a=obj2
.
obj2={a:'fdsafsdafsdafs'}
console.log(JSON.stringify(obj))


console.log(JSON.stringify(obj))
