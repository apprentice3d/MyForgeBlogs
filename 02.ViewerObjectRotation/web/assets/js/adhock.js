




function setupMyModel() {
    /*============================ MY ATTEMPTS =======================*/

    let viewer = NOP_VIEWER;
    // let tree = viewer.model.getData().instanceTree;
    let tree = NOP_VIEWER.model.getInstanceTree();


    let pin_Id = findNodeIdbyName('Pin');
    let secondsArm_Id = findNodeIdbyName('SecondsArm');
    let minuteArm_Id = findNodeIdbyName('MinuteArm');
    let hourArm_Id = findNodeIdbyName('HourArm');

    let center_Id = findNodeIdbyName('CENTER');
    let mainFrame_Id = findNodeIdbyName('MainFrame');
    let secondFrame_Id = findNodeIdbyName('SecondFrame');
    let thirdFrame_Id = findNodeIdbyName('ThirdFrame');
    let clockBody_Id = findNodeIdbyName('ClockBody');

    let frontRim_Id = findNodeIdbyName('FrontRim');
    let hourDisk_Id = findNodeIdbyName('HourDisk');
    let glass_Id = findNodeIdbyName('Glass');




    // for debug: new THREE.BoxGeometry(5, 5, 10, ), new THREE.MeshBasicMaterial({ color: 0xff0000 })


    let dummy_center = new THREE.Mesh();
    let center_position = getFragmentWorldMatrixByNodeId(center_Id).matrix[0].getPosition().clone();
    dummy_center.position.x = center_position.x;
    dummy_center.position.y = center_position.y;
    dummy_center.position.z = center_position.z;
    viewer.impl.scene.add(dummy_center);


    let dummy_mainFrame = new THREE.Mesh();
    let element_position = getFragmentWorldMatrixByNodeId(mainFrame_Id).matrix[0].getPosition().clone();
    dummy_mainFrame.position.x = -element_position.x + Math.abs(element_position.x - center_position.x);
    dummy_mainFrame.position.y = -element_position.y + Math.abs(element_position.y - center_position.y);
    dummy_mainFrame.position.z = -element_position.z + Math.abs(element_position.z - center_position.z);
    dummy_center.add(dummy_mainFrame);

    let dummy_secondFrame = new THREE.Mesh();
    let second_element_position = getFragmentWorldMatrixByNodeId(secondFrame_Id).matrix[0].getPosition().clone();
    dummy_secondFrame.position.x = -second_element_position.x + Math.abs(second_element_position.x - center_position.x);
    dummy_secondFrame.position.y = -second_element_position.y + Math.abs(second_element_position.y - center_position.y);
    dummy_secondFrame.position.z = -second_element_position.z + Math.abs(second_element_position.z - center_position.z);
    dummy_center.add(dummy_secondFrame);

    // using a proxy, to be able to compensate the nonafected axis
    let dummy_thirdFrame_proxy = new THREE.Mesh();
    dummy_thirdFrame_proxy.position.y = 10;
    dummy_secondFrame.add(dummy_thirdFrame_proxy);


    let dummy_thirdFrame = new THREE.Mesh();
    let third_element_position = getFragmentWorldMatrixByNodeId(thirdFrame_Id).matrix[0].getPosition().clone();
    dummy_thirdFrame.position.x = -third_element_position.x + Math.abs(third_element_position.x - dummy_thirdFrame_proxy.position.x);
    dummy_thirdFrame.position.y = -third_element_position.y + Math.abs(third_element_position.y - dummy_thirdFrame_proxy.position.y);;
    dummy_thirdFrame.position.z = -third_element_position.z + Math.abs(third_element_position.z - dummy_thirdFrame_proxy.position.z);
    dummy_thirdFrame_proxy.add(dummy_thirdFrame);

    console.log("ThirdFrame element position = " + JSON.stringify(third_element_position));
    console.log("ThirdFrame element position = " + JSON.stringify(dummy_thirdFrame_proxy.position));


    let dummy_clock = new THREE.Mesh();
    let clockBody_position = getFragmentWorldMatrixByNodeId(clockBody_Id).matrix[0].getPosition().clone();
    dummy_clock.position.y = -10;
    dummy_thirdFrame_proxy.add(dummy_clock);



    /* ====================== SECONDS ================= */
    let seconds_pivot = new THREE.Mesh();
    let pin_position = getFragmentWorldMatrixByNodeId(pin_Id).matrix[0].getPosition().clone();
    seconds_pivot.position = dummy_thirdFrame.position;

    let seconds_helper = new THREE.Mesh();
    let secondsArm_position = getFragmentWorldMatrixByNodeId(secondsArm_Id).matrix[0].getPosition().clone();
    seconds_helper.position.x = -secondsArm_position.x + Math.abs(secondsArm_position.x - pin_position.x);
    seconds_helper.position.y = -secondsArm_position.y + Math.abs(secondsArm_position.y - pin_position.y);
    seconds_helper.position.z = secondsArm_position.z + Math.abs(secondsArm_position.z + pin_position.z);

    seconds_pivot.add(seconds_helper);
    dummy_thirdFrame_proxy.add(seconds_pivot);



    /* ====================== MINUTES ================= */
    let minute_pivot = new THREE.Mesh();
    minute_pivot.position = dummy_thirdFrame.position;

    let minute_helper = new THREE.Mesh();
    let minuteArm_position = getFragmentWorldMatrixByNodeId(secondsArm_Id).matrix[0].getPosition().clone();
    minute_helper.position.x = -minuteArm_position.x + Math.abs(minuteArm_position.x - pin_position.x);
    minute_helper.position.y = -minuteArm_position.y + Math.abs(minuteArm_position.y - pin_position.y);
    minute_helper.position.z = minuteArm_position.z + Math.abs(minuteArm_position.z + pin_position.z);

    minute_pivot.add(minute_helper);
    dummy_thirdFrame_proxy.add(minute_pivot);



    /* ====================== HOURS ================= */
    let hour_pivot = new THREE.Mesh();
    hour_pivot.position = dummy_thirdFrame.position;

    let hour_helper = new THREE.Mesh();
    let hourArm_position = getFragmentWorldMatrixByNodeId(secondsArm_Id).matrix[0].getPosition().clone();
    hour_helper.position.x = -hourArm_position.x + Math.abs(hourArm_position.x - pin_position.x);
    hour_helper.position.y = -hourArm_position.y + Math.abs(hourArm_position.y - pin_position.y);
    hour_helper.position.z = hourArm_position.z + Math.abs(hourArm_position.z + pin_position.z);

    hour_pivot.add(hour_helper);
    dummy_thirdFrame_proxy.add(hour_pivot);

    assignTransformations(seconds_helper, secondsArm_Id);
    assignTransformations(minute_helper, minuteArm_Id);
    assignTransformations(hour_helper, hourArm_Id);

    viewer.impl.sceneUpdated();


    /*============================ SECOND/MINUTE/HOUR ROTATION =======================*/
    function updateTime() {
        var timing = new Date();

        seconds_pivot.rotation.x = -1 * timing.getSeconds() * 2 * Math.PI / 60;
        minute_pivot.rotation.x = -1 * timing.getMinutes() * 2 * Math.PI / 60;
        hour_pivot.rotation.x = -1 * timing.getHours() * 2 * Math.PI / 12 + minute_pivot.rotation.x / 12;

        assignTransformations(seconds_helper, secondsArm_Id);
        assignTransformations(minute_helper, minuteArm_Id);
        assignTransformations(hour_helper, hourArm_Id);

        viewer.impl.sceneUpdated();
    }

    setInterval(updateTime, 1000);
    function assignTransformations(refererence_dummy, nodeId) {
        refererence_dummy.parent.updateMatrixWorld();
        var position = new THREE.Vector3();
        var rotation = new THREE.Quaternion();
        var scale = new THREE.Vector3();
        refererence_dummy.matrixWorld.decompose(position, rotation, scale);

        // console.log("decomposed matrix into position = " + JSON.stringify(position));

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
        for (let i = 1, len = nodeList.length; i < len; ++i) {
            let node_name = tree.getNodeName(nodeList[i]);
            if (node_name === name) {
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

};


setupMyModel();
