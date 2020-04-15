function wideTraversal(node) {
    var nodes = [];
    if (node != null) {
        var queue = [];
        queue.push(node);
        while (queue.length != 0) {
            var item = queue.pop();
            nodes.push(item);
            if (Array.isArray(item.children) && item.children.length > 0) {

            }

        }
        return nodes;
    }
}
const root = [{

}]
console.log(wideTraversal(root))