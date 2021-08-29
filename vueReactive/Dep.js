const targetStack = [null];
function pushTarget(watcher) {
    targetStack.push(watcher);
    Dep.target = watcher;
}

function popTarget() {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
}


class Dep {
    static target = null;
    constructor() {
        this.ls = [];
    }
    depend() {
        if (Dep.target) {
            this.ls.push(Dep.target);
            Dep.target = null;
        }
    }
    update() {
        this.ls.forEach(w => w.update());
    }
}

export { Dep, popTarget, pushTarget };