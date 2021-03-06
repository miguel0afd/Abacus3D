var container;
var camera, controls, scene, projector, renderer;
var objects = [], scale, lines = [];

var mouse = new THREE.Vector2(), 
            offset = new THREE.Vector3(), 
            INTERSECTED, 
            SELECTED;
    
var sphereRadiusJSF = "${graphBean.sphereRadius}";
var numbFocusJSF = "${graphBean.numbFocus}";

init();
animate();

function init() {        
    container = document.createElement('div');
    document.body.appendChild(container);    
    
    scale = 0.98; // of the window

    camera = new THREE.PerspectiveCamera(52, window.innerWidth/window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 1000); 
    
    controls = new THREE.TrackballControls(camera);    
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    scene = new THREE.Scene();
    
    // Light
    var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);  

    // Sphere
    var radius = 100;
    var geometry = new THREE.SphereGeometry(radius, 120, 120);
    var material = new THREE.MeshLambertMaterial({color: 0x660000, 
                                                  shading: THREE.FlatShading, 
                                                  overdraw: true});        

    var sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);
    
    // Cube and sphere for focus location 
    var pointGeometry = new THREE.CubeGeometry(20, 20, 20);  
    
    var pointSphere = new THREE.SphereGeometry(14, 10, 10);
    //var cylinderGeometry = new THREE.CylinderGeometry(0, 14, 40, 4, 1);
    
    // Line width to join cube and sphere
    var lineWidth = 4;
    
    // Coefficients for random location
    var coefficientA = 1.5;
    var coefficientB = 0.8;
          
    var nFocus = 3;      
          
    for(var i = 0; i<nFocus; i++){
        // Material for the current cube and sphere
        var emissiveColor = Math.random()*0xffffff;
        
        var pointMaterial = new THREE.MeshLambertMaterial({color: 0xdaa520, 
                                                           shading: THREE.FlatShading,                                                           
                                                           overdraw: true,
                                                           emissive: emissiveColor});
                        
        // Creating the cube                 
        var cubePoint = new THREE.Mesh(pointGeometry, pointMaterial);  
        
        cubePoint.material.ambient = cubePoint.material.color;                
        
        var plusOrMinus = Math.random()< 0.5?-1:1;                
        cubePoint.position.x = (Math.random()*(radius/coefficientA))+(radius*coefficientB);
        cubePoint.position.x = cubePoint.position.x*plusOrMinus;
        
        plusOrMinus = Math.random()<0.5?-1:1;     
        cubePoint.position.y = (Math.random()*(radius/coefficientA))+(radius*coefficientB);
        cubePoint.position.y = cubePoint.position.y*plusOrMinus;
        
        plusOrMinus = Math.random()<0.5?-1:1;     
        cubePoint.position.z = (Math.random()*(radius/coefficientA))+(radius*coefficientB);
        cubePoint.position.z = cubePoint.position.z*plusOrMinus;       
                
        cubePoint.rotation.x = Math.random()*2*Math.PI;
        cubePoint.rotation.y = Math.random()*2*Math.PI;
        cubePoint.rotation.z = Math.random()*2*Math.PI;
       
        cubePoint.castShadow = true;
        cubePoint.receiveShadow = true;
        
        cubePoint.name = "c"+i;
                
        scene.add(cubePoint);   
        
        objects.push(cubePoint);
        
        // Creating the sphere
        var sphereMesh = new THREE.Mesh(pointSphere, pointMaterial);  
        
        sphereMesh.material.ambient = sphereMesh.material.color;                
        
        var plusOrMinus = Math.random()< 0.5?-1:1;                
        sphereMesh.position.x = (Math.random()*(radius/coefficientA))+(radius*coefficientB);
        sphereMesh.position.x = sphereMesh.position.x*plusOrMinus;
        
        plusOrMinus = Math.random()<0.5?-1:1;     
        sphereMesh.position.y = (Math.random()*(radius/coefficientA))+(radius*coefficientB);
        sphereMesh.position.y = sphereMesh.position.y*plusOrMinus;
        
        plusOrMinus = Math.random()<0.5?-1:1;     
        sphereMesh.position.z = (Math.random()*(radius/coefficientA))+(radius*coefficientB);
        sphereMesh.position.z = sphereMesh.position.z*plusOrMinus;       
                
        sphereMesh.rotation.x = Math.random()*2*Math.PI;
        sphereMesh.rotation.y = Math.random()*2*Math.PI;
        sphereMesh.rotation.z = Math.random()*2*Math.PI;
       
        sphereMesh.castShadow = true;
        sphereMesh.receiveShadow = true;
        
        sphereMesh.name = "s"+i;
                
        scene.add(sphereMesh);
        
        objects.push(sphereMesh);
        
        /* Creating the cylinder        
        var cylinderMaterial =  new THREE.MeshLambertMaterial({color:Math.random()*0xffffff, 
                                                               shading: THREE.FlatShading});
        var cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    
        cylinderMesh.material.ambient = cylinderMesh.material.color;                
        
        var plusOrMinus = Math.random()< 0.5?-1:1;                
        cylinderMesh.position.x = (Math.random()*(radius/coefficientA))+(radius*coefficientB);
        cylinderMesh.position.x = cylinderMesh.position.x*plusOrMinus;
        
        plusOrMinus = Math.random()<0.5?-1:1;     
        cylinderMesh.position.y = (Math.random()*(radius/coefficientA))+(radius*coefficientB);
        cylinderMesh.position.y = cylinderMesh.position.y*plusOrMinus;
        
        plusOrMinus = Math.random()<0.5?-1:1;     
        cylinderMesh.position.z = (Math.random()*(radius/coefficientA))+(radius*coefficientB);
        cylinderMesh.position.z = cylinderMesh.position.z*plusOrMinus;       
                
        //cylinderMesh.rotation.x = Math.random()*2*Math.PI;
        //cylinderMesh.rotation.y = Math.random()*2*Math.PI;
        //cylinderMesh.rotation.z = Math.random()*2*Math.PI; 
        
        */
        
        /*
        cylinderMesh.rotation.x = Math.atan(
                (cylinderMesh.position.y-cubePoint.rotation.y)/(cylinderMesh.position.z-cubePoint.rotation.z));
        cylinderMesh.rotation.z = Math.atan(
                (cylinderMesh.position.y-cubePoint.rotation.y)/(cylinderMesh.position.x-cubePoint.rotation.x));        
        */
        
        /*
        cylinderMesh.castShadow = true;
        cylinderMesh.receiveShadow = true;
        
        cylinderMesh.name = "s"+i;
                
        scene.add(cylinderMesh);
        
        objects.push(cylinderMesh);
        */
        
        //Creating line to join cube and sphere        
        var joiningGeometry = new THREE.Geometry();
        joiningGeometry.vertices.push(new THREE.Vector3(cubePoint.position.x, 
                                                        cubePoint.position.y, 
                                                        cubePoint.position.z));
        joiningGeometry.vertices.push(new THREE.Vector3(sphereMesh.position.x, 
                                                        sphereMesh.position.y, 
                                                        sphereMesh.position.z));
        var joiningMaterial = new THREE.LineBasicMaterial({color: emissiveColor, 
                                                           linewidth: lineWidth,
                                                           overdraw: true});
        var joiningLine = new THREE.Line(joiningGeometry, joiningMaterial);
        joiningLine.type = THREE.LinePieces;
        scene.add(joiningLine);  
        
        lines.push(joiningLine);
    }
       
    /*//////////////////////////////////////////////////////////////////////////
    var triangleShape = new THREE.Shape();
    triangleShape.moveTo(220, 120);
    triangleShape.lineTo(180, 180);
    triangleShape.lineTo(260, 180);
    triangleShape.lineTo(220, 120); // close path

    var triangleGeometry = new THREE.ShapeGeometry(triangleShape);
    var triangleMaterial = new THREE.MeshLambertMaterial({color: 0xdaa520});
    var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
    
    scene.add(triangleMesh);
    ///////////////////////////////////////////////////////////////////////////*/        
    /*//////////////////////////////////////////////////////////////////////////
    var cylinderGeometry = new THREE.CylinderGeometry(0, 10, 30, 4, 1);
    var cylinderMaterial =  new THREE.MeshLambertMaterial({color:Math.random()*0xffffff, 
                                                           shading: THREE.FlatShading});
    var cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinderMesh.position.x = 400;
    cylinderMesh.position.y = 300;
    cylinderMesh.position.z = 100;
    cylinderMesh.updateMatrix();
    cylinderMesh.matrixAutoUpdate = false;
    scene.add(cylinderMesh);
    ///////////////////////////////////////////////////////////////////////////*/

    plane = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000, 8, 8), 
                           new THREE.MeshBasicMaterial({color: 0x000000, 
                                                        opacity: 0.25, 
                                                        transparent: true, 
                                                        wireframe: true}));
    plane.visible = false;
    scene.add(plane);

    // 3D References      
    var gridDist = 3;
    
    //var step = (radius/2);
    var step = (radius*gridDist*2);
    
    //var opacityLine = 0;
    
    var opacityOuterSides = 0.3;
    
    /*/ Horizontal grid  
    var horizGeometry = new THREE.Geometry();

    for (var i=-(radius*gridDist); i<=(radius*gridDist); i+=step){
        horizGeometry.vertices.push(new THREE.Vector3(-(radius*gridDist), -(radius*gridDist), i));
        horizGeometry.vertices.push(new THREE.Vector3((radius*gridDist), -(radius*gridDist), i));

        horizGeometry.vertices.push(new THREE.Vector3(i, -(radius*gridDist), -(radius*gridDist)));
        horizGeometry.vertices.push(new THREE.Vector3(i, -(radius*gridDist), (radius*gridDist)));
    }

    var horizMaterial = new THREE.LineBasicMaterial({color: 0x000000, opacity: opacityLine});

    var horizLine = new THREE.Line(horizGeometry, horizMaterial);
    horizLine.type = THREE.LinePieces;
    scene.add(horizLine);*/
    
    // Inner plane for horizontal grid
    var horizPlaneGeometry = new THREE.PlaneGeometry(radius*gridDist*2, radius*gridDist*2); 
    var horizPlaneMaterial = new THREE.MeshBasicMaterial({color: 0x686868});
    horizPlaneMaterial.side = THREE.FrontSide;
    var horizPlane = new THREE.Mesh(horizPlaneGeometry, horizPlaneMaterial);
    horizPlane.rotation.x = - Math.PI / 2;
    horizPlane.position.y = -(radius*gridDist);
    scene.add(horizPlane);
    
    // Outer plane for horizontal grid
    var OutHorizPlaneGeometry = new THREE.PlaneGeometry(radius*gridDist*2, radius*gridDist*2); 
    var OutHorizPlaneMaterial = new THREE.MeshBasicMaterial({color: 0x686868});
    OutHorizPlaneMaterial.opacity = opacityOuterSides;
    OutHorizPlaneMaterial.side = THREE.BackSide;
    var OutHorizPlane = new THREE.Mesh(OutHorizPlaneGeometry, OutHorizPlaneMaterial);
    OutHorizPlane.rotation.x = - Math.PI/2;
    OutHorizPlane.position.y = -(radius*gridDist);
    scene.add(OutHorizPlane);
        
    /*/ Vertical grid
    var vertGeometry = new THREE.Geometry();

    for (var i=-(radius*gridDist); i<=(radius*gridDist); i+=step){
        vertGeometry.vertices.push(new THREE.Vector3(-(radius*gridDist), i, -(radius*gridDist)));
        vertGeometry.vertices.push(new THREE.Vector3((radius*gridDist), i, -(radius*gridDist)));

        vertGeometry.vertices.push(new THREE.Vector3(i, -(radius*gridDist), -(radius*gridDist)));
        vertGeometry.vertices.push(new THREE.Vector3(i, (radius*gridDist), -(radius*gridDist)));
    }

    var vertMaterial = new THREE.LineBasicMaterial({color: 0x000000, opacity: opacityLine});

    var vertLine = new THREE.Line(vertGeometry, vertMaterial);
    vertLine.type = THREE.LinePieces;
    scene.add(vertLine);*/
    
    // Plane for vertical grid
    var vertPlaneGeometry = new THREE.PlaneGeometry(radius*gridDist*2, radius*gridDist*2); 
    var vertPlaneMaterial = new THREE.MeshBasicMaterial({color: 0xA8A8A8});
    vertPlaneMaterial.side = THREE.FrontSide;;
    var vertPlane = new THREE.Mesh(vertPlaneGeometry, vertPlaneMaterial);
    vertPlane.position.z = -(radius*gridDist);
    scene.add(vertPlane);
    
    // Outer plane for vertical grid
    var outerVertPlaneGeometry = new THREE.PlaneGeometry(radius*gridDist*2, radius*gridDist*2); 
    var outerVertPlaneMaterial = new THREE.MeshBasicMaterial({color: 0xA8A8A8});
    outerVertPlaneMaterial.opacity = opacityOuterSides;
    outerVertPlaneMaterial.side = THREE.BackSide;
    var outerVertPlane = new THREE.Mesh(outerVertPlaneGeometry, outerVertPlaneMaterial);
    outerVertPlane.position.z = -(radius*gridDist);
    scene.add(outerVertPlane);
    
    /*/ Side grid    
    var sideGeometry = new THREE.Geometry();

    for (var i=-(radius*gridDist); i<=(radius*gridDist); i+=step){
        sideGeometry.vertices.push(new THREE.Vector3(-(radius*gridDist), i, -(radius*gridDist)));
        sideGeometry.vertices.push(new THREE.Vector3(-(radius*gridDist), i, (radius*gridDist)));

        sideGeometry.vertices.push(new THREE.Vector3(-(radius*gridDist), -(radius*gridDist), i));
        sideGeometry.vertices.push(new THREE.Vector3(-(radius*gridDist), (radius*gridDist), i));
    }

    var sideMaterial = new THREE.LineBasicMaterial({color: 0x000000, opacity: opacityLine});

    var sideLine = new THREE.Line(sideGeometry, sideMaterial);
    sideLine.type = THREE.LinePieces;
    scene.add(sideLine);*/
    
    // Plane for side grid
    var sidePlaneGeometry = new THREE.PlaneGeometry(radius*gridDist*2, radius*gridDist*2); 
    var sidePlaneMaterial = new THREE.MeshBasicMaterial({color: 0x888888});
    sidePlaneMaterial.side = THREE.FrontSide;
    var sidePlane = new THREE.Mesh(sidePlaneGeometry, sidePlaneMaterial);
    sidePlane.rotation.y = Math.PI/2;
    sidePlane.position.x = -(radius*gridDist);
    scene.add(sidePlane);
    
    // Outer plane for side grid
    var outerSidePlaneGeometry = new THREE.PlaneGeometry(radius*gridDist*2, radius*gridDist*2); 
    var outerSidePlaneMaterial = new THREE.MeshBasicMaterial({color: 0x888888});
    outerSidePlaneMaterial.opacity = opacityOuterSides;
    outerSidePlaneMaterial.side = THREE.BackSide;
    var outerSidePlane = new THREE.Mesh(outerSidePlaneGeometry, outerSidePlaneMaterial);
    outerSidePlane.rotation.y = Math.PI/2;
    outerSidePlane.position.x = -(radius*gridDist);
    scene.add(outerSidePlane);
    
    // Axes    
    var vertexSize = 8;
    
    // X Axis    
    var xAxisGeometry = new THREE.Geometry();
    xAxisGeometry.vertices.push(new THREE.Vector3(-(radius*gridDist), -(radius*gridDist), -(radius*gridDist)));
    xAxisGeometry.vertices.push(new THREE.Vector3((radius*gridDist*2), -(radius*gridDist), -(radius*gridDist)));
    var xAxisMaterial = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 2});
    var xAxisLine = new THREE.Line(xAxisGeometry, xAxisMaterial);
    xAxisLine.type = THREE.LinePieces;
    scene.add(xAxisLine);
    
    var x1Geometry = new THREE.Geometry();
    x1Geometry.vertices.push(new THREE.Vector3((radius*gridDist*2), -(radius*gridDist), -(radius*gridDist)));
    x1Geometry.vertices.push(new THREE.Vector3((radius*gridDist*2)-vertexSize, -(radius*gridDist)+vertexSize, -(radius*gridDist)));  
    var x1Material = new THREE.LineBasicMaterial({color: 0x000000, linewidth: (vertexSize/2)});
    var x1Line = new THREE.Line(x1Geometry, x1Material);
    x1Line.type = THREE.LinePieces;
    scene.add(x1Line);
    
    var x2Geometry = new THREE.Geometry();
    x2Geometry.vertices.push(new THREE.Vector3((radius*gridDist*2), -(radius*gridDist), -(radius*gridDist)));
    x2Geometry.vertices.push(new THREE.Vector3((radius*gridDist*2)-vertexSize, -(radius*gridDist)-vertexSize, -(radius*gridDist)));  
    var x2Material = new THREE.LineBasicMaterial({color: 0x000000, linewidth: (vertexSize/2)});
    var x2Line = new THREE.Line(x2Geometry, x2Material);
    x2Line.type = THREE.LinePieces;
    scene.add(x2Line);
    
    // Y Axis
    var yAxisGeometry = new THREE.Geometry();
    yAxisGeometry.vertices.push(new THREE.Vector3(-(radius*gridDist), -(radius*gridDist), -(radius*gridDist)));
    yAxisGeometry.vertices.push(new THREE.Vector3(-(radius*gridDist), (radius*gridDist*2), -(radius*gridDist)));
    var yAxisMaterial = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 2});
    var yAxisLine = new THREE.Line(yAxisGeometry, yAxisMaterial);
    yAxisLine.type = THREE.LinePieces;
    scene.add(yAxisLine);

    var y1Geometry = new THREE.Geometry();
    y1Geometry.vertices.push(new THREE.Vector3(-(radius*gridDist), (radius*gridDist*2), -(radius*gridDist)));
    y1Geometry.vertices.push(new THREE.Vector3(-(radius*gridDist)-vertexSize, (radius*gridDist*2)-vertexSize, -(radius*gridDist)));  
    var y1Material = new THREE.LineBasicMaterial({color: 0x000000, linewidth: (vertexSize/2)});
    var y1Line = new THREE.Line(y1Geometry, y1Material);
    y1Line.type = THREE.LinePieces;
    scene.add(y1Line);
    
    var y2Geometry = new THREE.Geometry();
    y2Geometry.vertices.push(new THREE.Vector3(-(radius*gridDist), (radius*gridDist*2), -(radius*gridDist)));
    y2Geometry.vertices.push(new THREE.Vector3(-(radius*gridDist)+vertexSize, (radius*gridDist*2)-vertexSize, -(radius*gridDist)));  
    var y2Material = new THREE.LineBasicMaterial({color: 0x000000, linewidth: (vertexSize/2)});
    var y2Line = new THREE.Line(y2Geometry, y2Material);
    y2Line.type = THREE.LinePieces;
    scene.add(y2Line);    
    
    // Z Axis
    var zAxisGeometry = new THREE.Geometry();
    zAxisGeometry.vertices.push(new THREE.Vector3(-(radius*gridDist), -(radius*gridDist), -(radius*gridDist)));
    zAxisGeometry.vertices.push(new THREE.Vector3(-(radius*gridDist), -(radius*gridDist), (radius*gridDist*2)));
    var zAxisMaterial = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 2});
    var zAxisLine = new THREE.Line(zAxisGeometry, zAxisMaterial);
    zAxisLine.type = THREE.LinePieces;
    scene.add(zAxisLine);
    
    var z1Geometry = new THREE.Geometry();
    z1Geometry.vertices.push(new THREE.Vector3(-(radius*gridDist), -(radius*gridDist), (radius*gridDist*2)));
    z1Geometry.vertices.push(new THREE.Vector3(-(radius*gridDist)-vertexSize, -(radius*gridDist), (radius*gridDist*2)-vertexSize));  
    var z1Material = new THREE.LineBasicMaterial({color: 0x000000, linewidth: (vertexSize/2)});
    var z1Line = new THREE.Line(z1Geometry, z1Material);
    z1Line.type = THREE.LinePieces;
    scene.add(z1Line);

    var z2Geometry = new THREE.Geometry();
    z2Geometry.vertices.push(new THREE.Vector3(-(radius*gridDist), -(radius*gridDist), (radius*gridDist*2)));
    z2Geometry.vertices.push(new THREE.Vector3(-(radius*gridDist)+vertexSize, -(radius*gridDist), (radius*gridDist*2)-vertexSize));  
    var z2Material = new THREE.LineBasicMaterial({color: 0x000000, linewidth: (vertexSize/2)});
    var z2Line = new THREE.Line(z2Geometry, z2Material);
    z2Line.type = THREE.LinePieces;
    scene.add(z2Line);   
     
    // Projector
    projector = new THREE.Projector();  
    
    // Renderer
    renderer = new THREE.CanvasRenderer();
    //renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.sortObjects = false;
    renderer.setSize(window.innerWidth*scale, window.innerHeight*scale);
    
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement);
    
    renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
    renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
    renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth*scale, window.innerHeight*scale);
}

function onDocumentMouseDown(event) {
    event.preventDefault();

    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    projector.unprojectVector(vector, camera);

    var raycaster = new THREE.Raycaster(camera.position, 
                                        vector.sub(camera.position).normalize());

    var intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
        controls.enabled = false;

        SELECTED = intersects[0].object;       

        var intersects = raycaster.intersectObject(plane);
        offset.copy(intersects[0].point).sub(plane.position);

        container.style.cursor = 'move';
    }
}

function onDocumentMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX/(window.innerWidth*scale))*2-1;
    mouse.y = -(event.clientY/(window.innerHeight*scale))*2+1;

    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    projector.unprojectVector(vector, camera);

    var raycaster = new THREE.Raycaster(camera.position, 
                                        vector.sub(camera.position).normalize());

    if (SELECTED) {
        var intersects = raycaster.intersectObject(plane);
        SELECTED.position.copy(intersects[0].point.sub(offset));
        
        var nameMesh = SELECTED.name; 
        var nameGeometry = nameMesh.charAt(0);
        var numberPosition = nameMesh.substring(1);
        
        var tmpLine = lines[numberPosition];
        
        var tmpVector = new THREE.Vector3(SELECTED.position.x, 
                                          SELECTED.position.y, 
                                          SELECTED.position.z);
        
        if(nameGeometry == "c"){ //Dragging a cube
            tmpLine.geometry.vertices.shift();
            tmpLine.geometry.vertices.unshift(tmpVector);
            
        } else { //Dragging a sphere
            tmpLine.geometry.vertices.pop();
            tmpLine.geometry.vertices.push(tmpVector);
        }
        
        /*///////////////////////////////
        lines[1].geometry.vertices.pop(); //Removes the last element of an array, and returns that element
        lines[1].geometry.vertices.shift(); //Removes the first element of an array, and returns that element
        lines[1].geometry.vertices.push(new THREE.Vector3(SELECTED.position.x+150, 
                                                          SELECTED.position.y+150, 
                                                          SELECTED.position.z+150));
        lines[1].geometry.vertices.push(new THREE.Vector3(SELECTED.position.x-150, 
                                                          SELECTED.position.y-150, 
                                                          SELECTED.position.z-150));
        //////////////////////////////////////////////////////////*/
        /*//////////////////////////////////////////////////////
        var joiningGeometry = new THREE.Geometry();
        joiningGeometry.vertices.push(new THREE.Vector3(point.position.x, 
                                                        point.position.y, 
                                                        point.position.z));
        joiningGeometry.vertices.push(new THREE.Vector3(sphereMesh.position.x, 
                                                        sphereMesh.position.y, 
                                                        sphereMesh.position.z));
        var joiningMaterial = new THREE.LineBasicMaterial({color: emissiveColor, 
                                                           linewidth: lineWidth,
                                                           overdraw: true});
        var joiningLine = new THREE.Line(joiningGeometry, joiningMaterial);
        joiningLine.type = THREE.LinePieces;
        //////////////////////////////////////////////////////////*/
        return;
    }

    var intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0){
        if (INTERSECTED != intersects[0].object){
            if (INTERSECTED){ 
                INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            }
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();            
            plane.position.copy(INTERSECTED.position);
            plane.lookAt(camera.position);
        }
        container.style.cursor = 'pointer';
    } else {
        if (INTERSECTED){
            INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
        }
        INTERSECTED = null;
        container.style.cursor = 'auto';
    }
}

function onDocumentMouseUp(event){
    event.preventDefault();

    controls.enabled = true;

    if (INTERSECTED){
        plane.position.copy(INTERSECTED.position);
        SELECTED = null;
    }
    container.style.cursor = 'auto';
    // Send info to the java bean
    assignObjects(objects);    
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    controls.update();
    renderer.render(scene, camera);
}




