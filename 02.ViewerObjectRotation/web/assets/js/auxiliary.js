
        /*============================ AUXILIARY =======================*/


function assignTransformations(refererence_dummy, nodeId) {
    refererence_dummy.parent.updateMatrixWorld();
    var position = refererence_dummy.position.clone();
    var rotation = new THREE.Quaternion();
    var scale = new THREE.Vector3();
    position = refererence_dummy.position.clone();
    refererence_dummy.matrixWorld.decompose(position, rotation, scale);

    tree.enumNodeFragments(nodeId, function (frag) {
        var fragProxy = viewer.impl.getFragmentProxy(viewer.model, frag);
        fragProxy.getAnimTransform();
        fragProxy.position = position;
        fragProxy.quaternion = rotation;
        fragProxy.updateAnimTransform();
    });

}


function findNodeIdbyName(name) {
    let nodeList = Object.values(tree.nodeAccess.dbIdToIndex);
    for (let i = 0, len = nodeList.length; i < len; ++i) {
        if (tree.getNodeName(nodeList[i]) === name) {
            return nodeList[i];
        }
    }
    return null;
}


function getFragmentWorldMatrixByNodeId(nodeId) {
    let result = {
        fragId: [],
        matrix: [],
    }
    tree.enumNodeFragments(nodeId, function (frag) {

        let fragProxy = viewer.impl.getFragmentProxy(viewer.model, frag);
        let matrix = new THREE.Matrix4();

        fragProxy.getWorldMatrix(matrix);

        result.fragId.push(frag);
        result.matrix.push(matrix);
    });
    return result;
}