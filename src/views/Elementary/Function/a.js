Function.prototype.newBind = function(){
    const that = this //保存原函数
    const context = [].slice.call(arguments)[0]
    const args = [].slice.call(arguments).slice(1)
    return function F (){
        if (this instanceof F){
            //
            return new that(...args, ...arguments)
        }else{
            return that.apply(context, [].concat(args, [].slice.call(arguments)))
        }
    }
}

const obj ={
    name:"old"
}

function F(){
    console.log(this.name)
}

const test = F.newBind(obj)
test()