let a = 2;

console.log('module 2')

class Test{
    constructor(name){
        this.name = name
    }

    myName(){
        console.log(this.name)
    }
}

function f1(name){
    console.log(name)
}

export {f1, Test}
