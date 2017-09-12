
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




// class Jointer {
//     constructor(NodeId) {
//         this.parent = null;
//         this.childrens = new Array();
//         this.helper = new THREE.Mesh();
//         this.node_id = NodeId;
//         let fragment_position = getFragmentWorldMatrixByNodeId(this.node_id).matrix[0].getPosition().clone();
//         this.helper.position.x = fragment_position.x;
//         this.helper.position.y = fragment_position.y;
//         this.helper.position.z = fragment_position.z;
//     }

//     getPosition() {
//         return new THREE.Vector3(this.helper.position.x, this.helper.position.y, this.helper.position.z);
//     }

//     getRotation() {
//         return this.helper.rotation.clone();
//     }

//     setRotationX(valueX) {
//         this.helper.rotation.x = valueX;
//     }

//     setRotationY(valueY) {
//         this.helper.rotation.y = valueY;
//     }

//     setRotationZ(valueZ) {
//         this.helper.rotation.z = valueZ;
//     }

//     getReference() {
//         return this.helper;
//     }

//     setParent(parentJointer) {

//         this.parent = parentJointer;
//         console.log("Coordinates for " + tree.getNodeName(this.node_id) + " coordinates are " + JSON.stringify(this.helper.position));
//         this.helper.position.x = -this.helper.position.x + Math.abs(this.helper.position.x - this.parent.getPosition().x);
//         this.helper.position.y = this.helper.position.y - Math.abs(this.helper.position.y + this.parent.getPosition().y);
//         this.helper.position.z = this.helper.position.z + Math.abs(this.helper.position.z + this.parent.getPosition().z);
//         this.parent.getReference().add(this.helper);
//     }

//     addToScene() {
//         if (viewer) {
//             viewer.impl.scene.add(this.helper);
//         }
//     }

//     addChild(childJointer) {
//         this.childrens.push(childJointer);
//         this.childrens[this.childrens.length - 1].setParent(this);
//     }

//     updateTransformation() {
//         if (this.parent) {
//             this.parent.helper.updateMatrixWorld();
//             var position = new THREE.Vector3();
//             var rotation = new THREE.Quaternion();
//             var scale = new THREE.Vector3();
//             this.helper.matrixWorld.decompose(position, rotation, scale);
//             tree.enumNodeFragments(this.node_id, function (frag) {
//                 var fragProxy = viewer.impl.getFragmentProxy(viewer.model, frag);
//                 fragProxy.getAnimTransform();
//                 fragProxy.position = position;
//                 fragProxy.quaternion = rotation;
//                 fragProxy.updateAnimTransform();
//             })

//         }

//         this.childrens.forEach(function (element) {
//             element.updateTransformation();
//         }, this);
//         viewer.impl.sceneUpdated(true);
//     }
// }


// class Pivoter extends Jointer {
//     constructor(NodeId) {
//         super(NodeId);
//         this.isPivot = true;
//     }

//     updateTransformation() {
//         if (this.parent) {
//             this.parent.helper.updateMatrixWorld();
//             console.log();
//             // console.log("Coordinates for " + tree.getNodeName(this.node_id) + " coordinates are " + JSON.stringify(this.helper.rotation));
//         }

//         this.childrens.forEach(function (element) {
//             element.updateTransformation();
//             console.log("Coordinates for element" + tree.getNodeName(element.node_id) + " coordinates are " + JSON.stringify(element.helper.rotation));
//         }, this);
//     }

// }