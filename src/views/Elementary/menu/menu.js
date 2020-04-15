function clone(target, map = new WeakMap()) {
    // 克隆原始类型
    if (!isObject(target)) { return target; }
    // 初始化
    consttype = getType(target); letcloneTarget; if (deepTag.includes(type)) { cloneTarget = getInit(target, type); }
    // 防止循环引用
    if (map.get(target)) { returnmap.get(target); }
    map.set(target, cloneTarget);
    // 克隆
    if (type === setTag) {
        target.forEach(value => { cloneTarget.add(clone(value, map)); })
        return cloneTarget;
    }
    // 克隆
    if (type === mapTag) {
        target.forEach((value, key) => { cloneTarget.set(key, clone(value, map)); })
        return cloneTarget;
    }
    // 克隆对象和数组
    constkeys = type === arrayTag ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => { if (keys) { key = value; } cloneTarget[key] = clone(target[key], map); })
    return cloneTarget;
}

