import React, {useEffect, useRef} from "react";

import * as THREE from "three";

const makeQuad = function(geometry, position, addFace, verts) {
  geometry.vertices.push(position);

  // console.dir(position);
  if (addFace) {
    var index1 = geometry.vertices.length - 1;
    var index2 = index1 - 1;
    var index3 = index1 - verts;
    var index4 = index1 - verts - 1;

    geometry.faces.push(new THREE.Face3(index2, index3, index1));
    geometry.faces.push(new THREE.Face3(index2, index4, index3));
  }
};

const makeTile = function(size, res) {
  const geometry = new THREE.Geometry();
  for (var i = 0; i <= res; i++) {
    for (var j = 0; j <= res; j++) {
      const z = j * size - (res * 0.5 * size);
      const x = i * size - (res * 0.5 * size);
      // const border = i == 0 || j == 0 || (i == res) || (j == res);
      // const position = new THREE.Vector3(x, border ? 0 : Math.random()*size/2, z);
      const position = new THREE.Vector3(x, 0, z);
      // console.log(`${position.x} ${position.z}`);
      const addFace = (i > 0) && (j > 0);
      makeQuad(geometry, position, addFace, res + 1);
    }
  }
  geometry.computeFaceNormals();
  geometry.normalsNeedUpdate = true;

  // console.dir(geometry.vertices);
  // geometry.vertices.map(v => console.log(`${v.x} ${v.y} ${v.z}`));

  return geometry;
};


const refineWavelet = (geometryIn, gen) => {
  const geometry = new THREE.Geometry();

  // geometry.vertices = geometryIn.vertices.map(v => v.clone());
  const scaleFactor = 2.0 * Math.exp(-gen);
  console.log(`scaleFactor: ${scaleFactor}`);

  for (let faceIdx = 0; faceIdx < geometryIn.faces.length; faceIdx += 2) {
    const face1 = geometryIn.faces[faceIdx];
    const face2 = geometryIn.faces[faceIdx+1];

    var box = new THREE.Box3(geometryIn.vertices[face1.a].clone(), geometryIn.vertices[face1.b].clone());
    box.expandByPoint(geometryIn.vertices[face1.c].clone());
    ['a', 'b', 'c'].forEach((v) => box.expandByPoint(geometryIn.vertices[face2[v]].clone()));

    const boundingSphere = box.getBoundingSphere(new THREE.Sphere());

    const center = new THREE.Vector3();
    const delta = new THREE.Vector3(
      boundingSphere.radius * scaleFactor * Math.random()*0.2,
      boundingSphere.radius * scaleFactor * (Math.random()),
      boundingSphere.radius * scaleFactor * Math.random()*0.2);
    const newVertex = box.getCenter(center).clone().add(delta);

    // console.dir(delta);
    // console.dir(boundingSphere);
    console.log(`newVertex: %o`, newVertex)

    const outlineVertexIdxs = new window.Set([face1.a, face1.b, face1.c, face2.a, face2.b, face2.c]);
    let outlineVertices = [...outlineVertexIdxs].map(x => geometryIn.vertices[x].clone());
    // [...outlineVertexIdxs].map(x => geometryIn.vertices[x]).forEach(x => console.log(`${x.x} ${x.y} ${x.z}`));

    const dirs = outlineVertices.map((v) => (newVertex.clone().sub(v.clone()).normalize()));
    const outlineOrdering = dirs
      .map((position, i) => ([Math.atan2(position.x,position.z) + Math.PI, i]))
      .sort(([angle1,], [angle2,]) => (angle1 - angle2));

    outlineVertices = outlineOrdering.map(x => outlineVertices[x[1]]);

    // console.log('outline vertices:')
    // outlineVertices.forEach(x => console.log(`${x.x} ${x.y} ${x.z}`));

    const mids = [...outlineVertices].map((v, i) => {
      return v.clone().lerp(outlineVertices[(i+1) % outlineVertices.length].clone(), 0.5);
    })

    // console.log('mids vertices:')
    // mids.forEach(x => console.log(`${x.x} ${x.y} ${x.z}`));

    const v1Idx = geometry.vertices.length;

    const outlineVertexIdx = (i) => (v1Idx + (i + 4) % 4);
    const midVertexIdx     = (i) => (v1Idx + 4 + (i + 4) % 4);
    const centerVertexIdx  = ( ) => (v1Idx + 8);

    if (outlineVertices.length !== 4) throw "Fuck.";
    if (mids.length !== 4) throw "Fuck.";

    outlineVertices.forEach(x => geometry.vertices.push(x));
    mids.forEach(x => geometry.vertices.push(x));
    geometry.vertices.push(newVertex);

    for (let i = 0; i < outlineVertices.length; i++) {
      const newFace1 = new THREE.Face3(centerVertexIdx(), outlineVertexIdx(i), midVertexIdx(i) );
      const newFace2 = new THREE.Face3(centerVertexIdx(), midVertexIdx(i-1), outlineVertexIdx(i))
/*
      newFace1.vertexColors[0] = new THREE.Color(0xff0000 + 0x20*i); // red
      newFace1.vertexColors[1] = new THREE.Color(0xff0000 + 0x20*i); // green
      newFace1.vertexColors[2] = new THREE.Color(0xff0000 + 0x20*i); // blue
      newFace2.vertexColors[0] = new THREE.Color(0x002000 + 0x2000*i); // red
      newFace2.vertexColors[1] = new THREE.Color(0x002000 + 0x2000*i); // green
      newFace2.vertexColors[2] = new THREE.Color(0x002000 + 0x2000*i); // blue
*/
      geometry.faces.push(newFace1);
      geometry.faces.push(newFace2);
    }
  }

  geometry.mergeVertices();

  geometry.computeFaceNormals();
  geometry.computeVertexNormals(true);
  geometry.normalsNeedUpdate = true;

  // geometry.vertices.map(v => console.log(`${v.x} ${v.y} ${v.z}`));
  // console.dir(geometry.faces.map(f => f.normal));

  return geometry;
}

function MeshBackground() {
  const el = useRef(null);

  let scene, camera, renderer, frameId, directionalLights;
  
  const componentDidMount = () => {
    if (!el.current) return;

    const width = el.current.clientWidth;
    const height = el.current.clientHeight;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(63, width / height, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    el.current.appendChild(renderer.domElement);
    initializeCamera();

    // const geometryCube = new THREE.BoxGeometry( 1, 1, 1 );
    // const initialGeometry = new THREE.EdgesGeometry(makeTile(0.15, 10));
    //const initialGeometry = makeTile(0.015, 300);

    const initialGeometry = makeTile(0.015*300, 1);

    let geometry2 = initialGeometry;
    for (let i = 0; i < 2; i++) {
      geometry2 = refineWavelet(geometry2, i+1);
    }

    //const geometry2 = refineWavelet(initialGeometry, 1);
    console.dir(geometry2);

    // const lineMaterial = new THREE.LineBasicMaterial( { color: 'white', linewidth: 0.05 } )
    // const wavelet = new THREE.LineSegments(  new THREE.EdgesGeometry(geometry2),  lineMaterial);
    // const wavelet = new THREE.Mesh( geometry2,  new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors}));
    // const wavelet = new THREE.Mesh( geometry2,  new THREE.MeshNormalMaterial({color:'blue'}  ));
    const wavelet = new THREE.Mesh( geometry2,  new THREE.MeshPhongMaterial({color:'blue', flatShading: false}  ));
    // const wavelet = new THREE.Mesh( geometry2,  new THREE.MeshBasicMaterial({color:'blue', flatShading: false}  ));

    // cube = new THREE.Mesh( initialGeometry,  new THREE.MeshPhongMaterial({color:'blue', shading: THREE.SmoothShading}  ));
    // scene.add(cube);
    scene.add(wavelet);
    //scene.add(new THREE.Mesh( geometryCube, new THREE.MeshBasicMaterial( { color: 0x2e22ee } ) ));

    directionalLights = [
      new THREE.DirectionalLight( 0xeeee00, 1.0 ),
      new THREE.DirectionalLight( 0xee4444, 2.0 )
      ];
    directionalLights.forEach((x) => { x.castShadow = true; scene.add( x ); });

    animate();
  }

  const componentWillUnmount = () => {
    cancelAnimationFrame(frameId);
    el.removeChild(renderer.domElement);
  }

  const initializeCamera = () => {
    camera.position.x = 0;
    camera.position.y = 5;
    camera.position.z = 0;
    camera.lookAt(new THREE.Vector3(0,0,0));
  }

  const animate = () => {
    frameId = window.requestAnimationFrame(animate);
    const t = (new Date())/1000.0;
    directionalLights.forEach((light, i) => { light.position.set( 20*Math.cos(t + Math.PI*i), 20, 20*Math.sin(t+ Math.PI*i) ) });
    renderer.render(scene, camera);
  }


  useEffect(() => {
    componentDidMount(this);
    console.log('created');

    return () => {
      componentWillUnmount(this);
      console.log('destroyed')
    }

  }, [])

  const card = <div className="absolute left-0 top-0 w-full h-screen" ref={el}></div>;
  return card;
}

export default MeshBackground;
