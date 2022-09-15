import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.122/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.122/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from '//cdn.skypack.dev/three@0.129.0/examples/jsm/postprocessing/UnrealBloomPass?min';
import * as dat from 'https://cdn.skypack.dev/dat.gui';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const raycaster = new THREE.Raycaster();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.layers.enable(1);
camera.layers.enable(2);

//const gui = new dat.GUI();

//gui.add(camera.position, 'z').min(-100).max(1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#scene'),
  alpha: true,
  antialias: true,
});

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  4,
  1,
  0.1,
);
bloomPass.threshold = 0;
bloomPass.strength = 1;
bloomPass.radius = 1;

renderer.autoClear = false;
renderer.setClearColor(0xff0000, 0.0);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(35);
camera.position.setY(5);
camera.rotation.x = 0;
camera.rotation.y = 0;
camera.rotation.z = 0;
renderer.render( scene, camera );

const composer = new EffectComposer( renderer );
composer.setSize( window.innerWidth, window.innerHeight );

const renderPass = new RenderPass( scene, camera );

composer.addPass( renderPass );
composer.addPass( bloomPass );

var loader = new GLTFLoader();

var date = new Date();
var hour = date.getHours()
if (hour >= 17 || hour >= 0 && hour < 8) {
  composer.renderToScreen = true;
} else {
  composer.renderToScreen = true;
}

function setupEventListeners() {
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize( window.innerWidth, window.innerHeight );
}

const controls = new OrbitControls(camera, renderer.domElement);

var stats
function createStats() {
  stats = new Stats();
  stats.setMode(0);

  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0';
  stats.domElement.style.top = '0';

  return stats;
}

function init() {
  setupEventListeners();
  onWindowResize();
  addsaturn();
  addsun();
  for (let i = 0; i < 1500; i += 1) {
    addstar();
  }
  stats = createStats();
  document.body.appendChild( stats.domElement );
}

init();

let clippingPlane = [
  new THREE.Plane(new THREE.Vector3(0,0,1),225)

];



renderer.localClippingEnabled = true;

const planegeometry = new THREE.PlaneGeometry( 200, 300, 20, 20  );
const planematerial = new THREE.MeshBasicMaterial( {
  vertexColors: true,
  side: THREE.DoubleSide,
  clippingPlanes: [
    clippingPlane[0]
  ],
  clipShadows: true,
} );
const plane = new THREE.Mesh( planegeometry, planematerial );
const planeX = new THREE.Mesh( planegeometry, planematerial );
const plane2 = new THREE.Mesh( planegeometry, planematerial );
const plane2X = new THREE.Mesh( planegeometry, planematerial );
plane2.rotation.x = 1.57079633;
plane2.position.set(130,290,0)
plane2X.rotation.x = 1.57079633;
plane2X.position.set(130,290,-300)
plane.rotation.x = 1.57079633;
plane.position.set(-130,290,0)
planeX.rotation.x = 1.57079633;
planeX.position.set(-130,290,-300)
const array = plane.geometry.attributes.position.array

const colorVertices = []

for (let i = 0; i < planegeometry.attributes.position.count; i++) {
  colorVertices.push(0.30196078431372549019607843137255, 0, 0.50588235294117647058823529411765)
}

planegeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colorVertices), 3))

for (let i = 0; i < array.length; i += 3) {
  const z = array[i + 2]
  if (array[i] == 100 || array[i] == -100) {
    array[i + 2] = z + 290
  } else if (array[i] < 150) {
    array[i + 2] = z + Math.random() * (290 - 275) + 275;
  }
  if (array[i + 1] == 150 && array[i] != 100 && array[i] != -100 || array[i + 1] == -150 && array[i] != 100 && array[i] != -100) {
    array[i + 2] = z + 285
  }
}

let wireframe = new THREE.WireframeGeometry( planegeometry );
let line = new THREE.LineSegments( wireframe );
line.material.color.setHex(0x9400D3);
line.material.clippingPlanes = [clippingPlane[0]];
line.material.side = THREE.DoubleSide;
line.rotation.x = 1.57079633;
line.position.set(-130,290,0)


let lineX = new THREE.LineSegments( wireframe );
lineX.material.color.setHex(0x9400D3);
lineX.material.clippingPlanes = [clippingPlane[0]];
lineX.material.side = THREE.DoubleSide;
lineX.rotation.x = 1.57079633;
lineX.position.set(-130,290,-300)

let line2 = new THREE.LineSegments( wireframe );
line2.material.color.setHex(0x9400D3);
line2.material.clippingPlanes = [clippingPlane[0]];
line2.material.side = THREE.DoubleSide;
line2.rotation.x = 1.57079633;
line2.position.set(130,290,0)

let line2X = new THREE.LineSegments( wireframe );
line2X.material.color.setHex(0x9400D3);
line2X.material.clippingPlanes = [clippingPlane[0]];
line2X.material.side = THREE.DoubleSide;
line2X.rotation.x = 1.57079633;
line2X.position.set(130,290,-300)

const arrayline = line.geometry.attributes.position.array

line.layers.enable(1);
lineX.layers.enable(1);
line2.layers.enable(1);
line2X.layers.enable(1);

scene.add( plane, line, planeX, lineX );
scene.add( plane2, line2, plane2X, line2X );

const pointlighting = new THREE.PointLight(0xffffff, 3)
pointlighting.position.set(0,10,-100);

const ambientlighting = new THREE.AmbientLight(0xffffff, 0)

scene.add(pointlighting, ambientlighting);

const lightindicator = new THREE.PointLightHelper(pointlighting);
const grid = new THREE.GridHelper(450, 100, "purple", "purple");

var waveSpeed = {value: 20};

var moveable = [];
for (let i = 0; i <= 100; i++) {
  moveable.push(1, 1, 0, 0);
}
grid.geometry.setAttribute('moveable', new THREE.BufferAttribute(new Uint8Array(moveable), 1));
grid.material = new THREE.ShaderMaterial({
  uniforms: {
    time: {
      value: 0
    },
    limits: {
      value: new THREE.Vector2(-225, 225)
    },
    speed: {
      value: waveSpeed.value * 0.3
    }
  },
  vertexShader: `
  uniform float time;
  uniform vec2 limits;
  uniform float speed;

  attribute float moveable;

  varying vec3 vColor;

  void main() {
    vColor = color;
    float limLen = limits.y - limits.x;
    vec3 pos = position;
    if (floor(moveable + 0.5) > 0.5){ // if a point has "moveable" attribute = 1
      float dist = speed * time;
      float currPos = mod((pos.z + dist) - limits.x, limLen) + limits.x;
      pos.z = currPos;
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
  }
  `,
  fragmentShader: `
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, 1.);
  }
  `,
  vertexColors: THREE.VertexColors
});

grid.layers.enable(1);

scene.add(grid);

var clock = new THREE.Clock();
var time = 0;

function addstar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true });
  const star = new THREE.Mesh( geometry, material );

  const x = Math.random() * (300 - (-300)) + (-300);
  const y = Math.random() * (500 - 0) + 0;
  const z = Math.random() * ((-900 - (-1000)) + (-1000));
  star.position.set(x, y, z);
  star.layers.enable(1);
  scene.add(star)

}

function addsaturn() {
  const saturnpng = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/saturnSurface.jpg');
  const geometry = new THREE.SphereGeometry(100, 32, 16);
  const material = new THREE.MeshBasicMaterial( {map: saturnpng} )
  const saturn = new THREE.Mesh( geometry, material );
  saturn.position.set(200, 140, -400);
  saturn.rotation.z += 10;

  const saturnringpng = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/saturnRings.png');
  const ringgeometry = new THREE.RingGeometry(150, 200, 30, 30, 0, 6.3);
  const ringmaterial = new THREE.MeshBasicMaterial( {map: saturnringpng, side: THREE.DoubleSide } );
  const saturnring = new THREE.Mesh( ringgeometry, ringmaterial );
  saturnring.position.set(200, 140, -400);
  saturnring.rotation.x += 1.57079633;
  saturnring.rotation.y += 0.8;

  setInterval(() => {
    saturn.rotateOnAxis(new THREE.Vector3(0,10,0), 0.00035);
    saturnring.rotation.z += 0.003;
  }, 10)



  scene.add( saturn, saturnring );
}

let globalUniforms = {
  time: {value: 0}
}

function addsun() {
  const geometry = new THREE.CircleGeometry(20, 128, 0, 3.15);
  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    color: 0xffeeff,
    fog: false,
    transparent: true,
    onBeforeCompile: shader => {
      shader.uniforms.time = globalUniforms.time;
      shader.fragmentShader = `
      uniform float time;
      ${shader.fragmentShader}`.replace(
        `vec4 diffuseColor = vec4( diffuse, opacity );`,
        `
        vec2 uv = vUv - 0.5;
        float f = smoothstep(0.5, 0.475, length(uv));

        // stripes
        vec2 sUv = uv;
        sUv.y *= 150.;
        float sf = (sin(sUv.y - (time * 2.)) * 0.5 + 0.5);
        float wave = (uv.y + 0.5) * 1.9;
        float e = length(fwidth(sUv));
        sf = 1. - smoothstep(wave - e, wave, sf);
        //
        vec3 col = mix(diffuse * vec3(1, 0.75, 0.875), diffuse, clamp(vUv.y * 4., 0., 1.));
        vec4 diffuseColor = vec4( col, pow(f, 3.) * sf );
        `
      );
    }
  });
  material.defines = {"USE_UV":""};
  material.extensions = {derivatives: true};
  let sun = new THREE.Mesh(geometry, material);
  sun.position.set(0,0,-225);
  sun.layers.enable(1);
  scene.add( sun );
}

document.addEventListener("wheel", onMouseWheel)

let y = 0
let position = 0

function onMouseWheel(event) {
  y = event.deltaY
}

const mousePos = {
  x: undefined,
  y: undefined,
}

addEventListener('mousemove', (event) => {
  mousePos.x = (event.clientX / innerWidth) * 2 - 1
  mousePos.y = ((event.clientY / innerHeight) * 2 - 1) * -1

})

const planes = [plane, planeX, plane2, plane2X];

const textureLoader = new THREE.TextureLoader()

const frameGeometry = new THREE.PlaneBufferGeometry( 60, 60, 20, 20  );
const frameMaterial = new THREE.MeshBasicMaterial( {
  map: textureLoader.load("http://localhost/gc/jpgs/0.jpg"),
  side: THREE.DoubleSide,
  clippingPlanes: [
    clippingPlane[0]
  ],
  clipShadows: true,
} );
const frame = new THREE.Mesh( frameGeometry, frameMaterial );
frame.rotation.x += 1.57079633;
frame.position.set(0, 0.3, -500)

scene.add( frame )

const frames = [frame]

for (let i = 1; i <= 3; i++) {
  const frameIMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(`http://localhost/gc/jpgs/${i}.jpg`),
      side: THREE.DoubleSide,
      clippingPlanes: [
        clippingPlane[0]
      ],
      clipShadows: true,
    });

    const frameI = new THREE.Mesh(frameGeometry, frameIMaterial)
    frameI.rotation.x += 1.57079633;
    setInterval(() => {
      if (frameClicked == false) {
        frameI.position.setZ(frame.position.z - i*100)
      }
    })

    frames.push( frameI )
    scene.add( frameI )
  }

  document.addEventListener("click", frameClick)

  let frameClicked = false;

  function frameClick() {
    if (intersectFrame.length > 0 && frameClicked == false && overflowDIV.style.display == "" && action == false && intersectFrame[0].object.position.z == 0) {
      frameClicked = true;
      back.style.display="none";
      pointers.style.display="none";
      gsap.to(intersectFrame[0].object.rotation, {duration: 1.5, x: 1.8})
      gsap.to(intersectFrame[0].object.scale, {duration: 1.5, x: 5, y: 2.5})
      document.removeEventListener("keydown", scrollDownHandler, false);
      document.removeEventListener("keyup", scrollUpHandler, false);
      if (frame.position.z == 0) {
        setTimeout(() => {initGame1()}, 1500)
      }
      if (frame.position.z == 100) {
        setTimeout(() => {initGame2()}, 1500)
      }
      if (frame.position.z == 200) {
        setTimeout(() => {initGame3()}, 1500)
      }

    }
    console.log(frameClicked)
  }

  const controlsDiv = document.getElementById("controls")
  const game1 = document.getElementById("game1")
  const game2 = document.getElementById("game2")
  const game3 = document.getElementById("game3")

  let written = undefined
  let Timer = undefined
  var trueWPM = 0
  const maxwpmScores = 6;
  const leaderboard = document.getElementById("leaderboard");


  function submission() {

  }

  document.getElementById("sendScore").addEventListener("click", submission)

    $('#sendScore').on('click', function(){
      var point = trueWPM;
      var name = document.getElementById("nameInput").value
      sendScore.disabled = true;
      $.ajax({
        type: 'post',
        url: 'wpmsubmit.php',
        data: {
          pointVal : point,
          nameVal : name,
        },
        success: function(data){
          console.log(data);
        },
        error: function(data){
          console.log("something wrong");
        }
      });
      $.ajax({
        type: 'get',
        url: 'wpmLeaderboard.php',
        success: function(data){
          $('#leaderboard').html(data);
        },
        error: function(data){
          console.log("something wrong");
        }
      });
    });
  });


  function initGame1() {
    $.ajax({
      type: 'get',
      url: 'wpmLeaderboard.php',
      success: function(data){
        $('#leaderboard').html(data);
      },
      error: function(data){
        console.log("something wrong");
      }
    });
    game1.style.display = "";
    setTimeout(() => {
      document.getElementById("retry2").style.display="";
      document.getElementById("joe").style.display="";document.getElementById("joe").className="banim3";
      document.getElementById("input").style.display="";document.getElementById("input").className="banim4";
      document.getElementById("text").style.display="";document.getElementById("text").className="banim4";
      document.getElementById("leaderboard").style.display="grid";document.getElementById("leaderboard").className="banim4";
      document.getElementById("nameInput").style.display="";document.getElementById("nameInput").className="banim4";
    }, 1000)
    const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
    const text = document.getElementById("text")
    const input = document.getElementById("input")
    const wpmElement = document.getElementById("wpm")
    const nameInput = document.getElementById("nameInput")
    const sendScore = document.getElementById("sendScore")
    var high2 = document.getElementById("high2")
    input.disabled = false;
    nameInput.disabled = true;
    nameInput.value = null;
    wpmElement.innerHTML = 0 + " WPM"
    sendScore.disabled = true;
    var quoteLength = null
    var quoteLength2, high2WPM

    function randomquote() {
      return fetch(RANDOM_QUOTE_API_URL)
      .then(response => response.json())
      .then(data => data.content)
    }

    async function nextquote() {
      const quote = await randomquote()
      quoteLength2 = quote.split(" ").length;
      text.innerHTML = ""
      input.value = null
      for (var i = 0; i < quote.length; i++) {
        const char = document.createElement("span")
        char.innerText = quote.charAt(i)
        text.appendChild(char)
      }

    }

    written = () => {
      let finish = true
      console.log("hello")
      const chars = text.querySelectorAll("span")
      const inputchar = input.value.split("")
      chars.forEach((char, index) => {
        if (inputchar[index] == null) {
          char.classList.remove("y")
          char.classList.remove("n")
          finish = false
        }
        else if (inputchar[index] == char.innerText) {
          char.classList.add("y")
          char.classList.remove("n")
        }
        else {
          char.classList.add("n")
          char.classList.remove("y")
          finish = false
        }
      })
      if (finish) {
        console.log("finished")
        high2WPM = high2.innerText.replace(/\D/g, "")
        if (trueWPM > high2WPM) {
          high2WPM = trueWPM
          high2.innerText = "High: " + high2WPM + " WPM"
        }
        nameInput.disabled = false;
        nameInput.value = "TYPE NAME HERE"
        input.disabled = true;
        sendScore.disabled = false;
        sendScore.style.color = "white";
        sendScore.style.cursor = "pointer";
        clearInterval(Timer);

      }
      if (!startTime) {
        startTimer()
      }
      function startTimer() {
        console.log("timer")
        quoteLength = text.getElementsByClassName("y").length;
        startTime = new Date()
        Timer = setInterval(() => {
          if (finish === false) {
            trueTime = Math.floor((new Date() - startTime) / 100)
            trueWPM = Math.floor((quoteLength2 / trueTime) * 600)
            wpmElement.innerText = trueWPM + " WPM"
          }
        }, 100)
      }


    }

    input.addEventListener("input", written)

    let trueTime = null
    let startTime = null

    nextquote()
  }

  function retry2() {
    input.removeEventListener("input", written);
    clearInterval(Timer);
    setTimeout(() => {initGame1()}, 10);
  }

  document.getElementById("retry2").addEventListener("click", retry2)

  let keyDownHandler, keyUpHandler

  function initGame2() {
    controlsDiv.style.display="";
    game2.style.display = "";
    keyMap.innerHTML = "Shooting game";
    document.getElementById("hearts").style.display="";
    document.getElementById("hearts2").style.display="";

    let board2 = document.getElementById("game2");
    let ctx2 = board2.getContext('2d');

    var p1Height = 10;
    var p1Width = 15;
    var p1Y = (board2.height-p1Height)/2;
    var p1X = 5;
    var upPressed = false;
    var downPressed = false;
    var paused2 = false;
    var p2Height = 10;
    var p2Width = 15;
    var p2Y = (board2.height-p2Height)/2;
    var p2X = board2.width-p2Width;
    var upPressed2 = false;
    var downPressed2 = false;
    var lifes = 3;
    var lifes2 = 3;
    var bullet = [];
    var bulletTotal = 0.5;
    var bullet2 = [];
    var bulletTotal2 = 0.5;
    var speed = [];
    var spawncdSpeed = 10000;
    var despawncdSpeed = 5000;
    var speedPickupX = undefined;
    var speedPickupY = undefined;
    var speedPickupWidth = undefined;
    var bulletSpeed1 = 6
    var bulletSpeed2 = 6
    var healing = [];
    var spawncdHealing = 10000;
    var despawncdHealing = 5000;
    var healingPickupX = undefined;
    var healingPickupY = undefined;
    var healingPickupWidth = undefined;
    var size = [];
    var spawncdSize = 10000;
    var despawncdSize = 5000;
    var sizePickupX = undefined;
    var sizePickupY = undefined;
    var sizePickupWidth = undefined;
    var bulletSize1 = 4;
    var bulletSize2 = 4;
    var m = 0;
    var m2 = 0;
    const dmgparticleCount = 20;
    var dmgparticles = []
    var dmgparticles2 = []
    let spawningSpeed, spawningSize, spawningHealing

    keyUpHandler = function(e) {
      if(e.code == 'ArrowUp') {
        upPressed2 = false;
      }
      else if(e.code == 'ArrowDown') {
        downPressed2 = false;
      }
      if(e.code == 'KeyW') {
        upPressed = false;
      }
      else if(e.code == 'KeyS') {
        downPressed = false;
      }
    }


    keyDownHandler = function(e) {
      if(e.code == "KeyR" && paused2 == true) {
        document.removeEventListener("keydown", keyDownHandler, false);
        document.removeEventListener("keyup", keyUpHandler, false);
        initGame2();
      }
      if(e.code  == "ArrowUp") {
        upPressed2 = true;
      }
      else if(e.code == 'ArrowDown') {
        downPressed2 = true;
      }
      if(e.code  == "KeyW") {
        upPressed = true;
      }
      else if(e.code == 'KeyS') {
        downPressed = true;
      }
      if (e.code == "KeyF" && bullet.length <= bulletTotal) {
        let b = {
          x: p1X + p1Width/2, y: p1Y + p1Height/2, speedX: 0, speedY: 0, width: 20, height: 20
        };

        if(b.speedX === 0) {
          b.x += p1Width-12;
          b.speedX += bulletSpeed1;
          b.height = 8;
          b.width = bulletSize1;
        }
        bullet.push(b);
      }
      if (e.code == "Space" && bullet2.length <= bulletTotal2) {
        let b2 = {
          x: p2X - p2Width/2, y: p2Y + p2Height/2, speedX: 0, speedY: 0, width: 20, height: 20
        };

        if(b2.speedX === 0) {
          b2.x -= p2Width-20;
          b2.speedX += bulletSpeed2;
          b2.height = 8;
          b2.width = bulletSize2;
        }
        bullet2.push(b2);
      }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function spawnSpeed() {
      if (speed.length < 1) {
        let speedPickup = {
          x: Math.random() * (201 - 100) + 100, y: Math.random() * ((board2.height-10) - 10) + 10, width: 10, height: 10, cd: 5000
        };
        speedPickupX = speedPickup.x;
        speedPickupY = speedPickup.y;
        speedPickupWidth = speedPickup.width;
        speed.push(speedPickup);

        setTimeout(() => {
          despawnSpeed();
          speedPickupX = undefined;
          speedPickupY = undefined;
          speedPickupWidth = undefined;
        }, despawncdSpeed);
      }
    }

    if (!paused2) {
      spawningSpeed = setInterval(() => {
        spawnSpeed();
      }, spawncdSpeed)
    }

    function despawnSpeed() {
      for (var i = 0; i < speed.length; i++) {
        speed.splice(i, 1);

      }
    }

    function drawSpeed() {
      if (speed.length)
      for (var i = 0; i < speed.length; i++) {
        ctx2.beginPath();
        ctx2.fillStyle = "aqua";
        ctx2.rect(speed[i].x,speed[i].y,speed[i].width,speed[i].height);
        ctx2.fill();
        ctx2.closePath();
      }
    }


    function spawnHealing() {
      if (healing.length < 1) {
        let healingPickup = {
          x: Math.random() * (201 - 100) + 100, y: Math.random() * ((board2.height-10) - 10) + 10, width: 10, height: 10, cd: 5000
        };
        healingPickupX = healingPickup.x;
        healingPickupY = healingPickup.y;
        healingPickupWidth = healingPickup.width;
        healing.push(healingPickup);
        setTimeout(() => {
          despawnHealing();
          healingPickupX = undefined;
          healingPickupY = undefined;
          healingPickupWidth = undefined;
        }, despawncdHealing);
      }
    }

    if (!paused2) {
      spawningHealing = setInterval(() => {
        spawnHealing();
      }, spawncdHealing)
    }

    function despawnHealing() {
      for (var i = 0; i < healing.length; i++) {
        healing.splice(i, 1);
      }

    }

    function drawHealing() {
      if (healing.length)
      for (var i = 0; i < healing.length; i++) {
        ctx2.beginPath();
        ctx2.fillStyle = "green";
        ctx2.rect(healing[i].x,healing[i].y,healing[i].width,healing[i].height);
        ctx2.fill();
        ctx2.closePath();
      }
    }

    function spawnSize() {
      if (size.length < 1) {
        let sizePickup = {
          x: Math.random() * (201 - 100) + 100, y: Math.random() * ((board2.height-10) - 10), width: 10, height: 10, cd: 5000
        };
        sizePickupX = sizePickup.x;
        sizePickupY = sizePickup.y;
        sizePickupWidth = sizePickup.width;
        size.push(sizePickup);
        console.log("created")
        setTimeout(() => {
          despawnSize();
          sizePickupX = undefined;
          sizePickupY = undefined;
          sizePickupWidth = undefined;
        }, despawncdSize);
      }
    }

    if (!paused2) {
      spawningSize = setInterval(() => {
        spawnSize();
      }, spawncdSize)
    }

    function despawnSize() {
      for (var i = 0; i < size.length; i++) {
        size.splice(i, 1);
      }
    }

    function drawSize() {
      if (size.length)
      for (var i = 0; i < size.length; i++) {
        ctx2.beginPath();
        ctx2.fillStyle = "red";
        ctx2.rect(size[i].x,size[i].y,size[i].width,size[i].height);
        ctx2.fill();
        ctx2.closePath();
      }
    }


    function rotate() {
      ctx2.save();
      ctx2.translate(p1X+p1Width/2,p1Y+p1Height/2);
      ctx2.rotate(-(45*(Math.PI/180)));
      ctx2.translate(-(p1X+p1Width/2),-(p1Y+p1Height/2));
      ctx2.restore();
    }



    function drawp1() {
      ctx2.save();
      ctx2.translate(p1X+p1Width/2,p1Y+p1Height/2);
      ctx2.rotate(m*(Math.PI/180));
      ctx2.translate(-(p1X+p1Width/2),-(p1Y+p1Height/2));
      ctx2.beginPath();
      ctx2.rect(p1X, p1Y, p1Height, p1Width);
      ctx2.fillStyle = "blue";
      ctx2.fill();
      ctx2.closePath();
      ctx2.restore();
      if(upPressed && p1Y > 0) {
        p1Y -= 5;
      }
      else if(downPressed && p1Y+p1Height < board2.height) {
        p1Y += 5;
      }
      if(upPressed2 && p2Y > 0) {
        p2Y -= 5;
      }
      else if(downPressed2 && p2Y < board2.height-p2Height) {
        p2Y += 5;
      }
    }

    function drawp2() {
      ctx2.save();
      ctx2.translate(p2X+p2Width/2,p2Y+p2Height/2);
      ctx2.rotate(m2*(Math.PI/180));
      ctx2.translate(-(p2X+p2Width/2),-(p2Y+p2Height/2));
      ctx2.beginPath();
      ctx2.rect(p2X, p2Y, p2Height, p2Width);
      ctx2.fillStyle = "red";
      ctx2.fill();
      ctx2.closePath();
      ctx2.restore();
    }

    function drawbullet() {
      if (bullet.length)
      for (var i = 0; i < bullet.length; i++) {
        ctx2.beginPath();
        ctx2.fillStyle = "blue";
        ctx2.arc(bullet[i].x,bullet[i].y,bullet[i].width,0,2*Math.PI);
        ctx2.fill();
        var xPos = bullet[i].x;
        var yPos = bullet[i].y;
        storeLastPosition(xPos, yPos);
        ctx2.closePath();
      }
    }

    function drawbullet2() {
      if (bullet2.length)
      for (var i = 0; i < bullet2.length; i++) {
        ctx2.beginPath();
        ctx2.fillStyle = "red";
        ctx2.arc(bullet2[i].x,bullet2[i].y,bullet2[i].width,0,2*Math.PI);
        ctx2.fill();
        var xPos2 = bullet2[i].x;
        var yPos2 = bullet2[i].y;
        storeLastPosition2(xPos2, yPos2);
        ctx2.closePath();
      }
    }

    var motionTrailLength = 10;
    var positions = [];

    var motionTrailLength2 = 10;
    var positions2 = [];

    function storeLastPosition(xPos, yPos) {
      positions.push({
        x: xPos,
        y: yPos
      });
      if (positions.length > motionTrailLength) {
        positions.shift();
      }
    }

    function storeLastPosition2(xPos2, yPos2) {
      positions2.push({
        x: xPos2,
        y: yPos2
      });
      if (positions2.length > motionTrailLength2) {
        positions2.shift();
      }
    }

    function damaged() {
      const dmgparticle = {
        x: p2X - p2Width/2, y: p2Y + p2Height/2, speedX: Math.random() * ((-6) - (-3)) + (-3), speedY: Math.random() * (5 - (-5)) + (-5), width: Math.random() * (4 - 1) + 1, dmgmaxX: Math.random() * (1.5 - 2) + 2
      };
      dmgparticles.push(dmgparticle)
    }
    function damaged2() {
      const dmgparticle2 = {
        x: p1X + p1Width/2, y: p1Y + p1Height/2, speedX: Math.random() * ((6) - (3)) + (3), speedY: Math.random() * (5 - (-5)) + (-5), width: Math.random() * (4 - 1) + 1, dmgmaxX: Math.random() * (2.5 - 2) + 2
      };
      dmgparticles2.push(dmgparticle2)
    }

    function drawdmgparticle() {
      if (dmgparticles.length)
      for (var i = 0; i < dmgparticles.length; i++) {
        ctx2.beginPath();
        ctx2.fillStyle = "red";
        ctx2.arc(dmgparticles[i].x,dmgparticles[i].y,dmgparticles[i].width,0,2*Math.PI);
        ctx2.fill();
        ctx2.closePath();
      }
    }
    function drawdmgparticle2() {
      if (dmgparticles2.length)
      for (var i = 0; i < dmgparticles2.length; i++) {
        ctx2.beginPath();
        ctx2.fillStyle = "blue";
        ctx2.arc(dmgparticles2[i].x,dmgparticles2[i].y,dmgparticles2[i].width,0,2*Math.PI);
        ctx2.fill();
        ctx2.closePath();
      }
    }

    function movedmgparticle() {
      for (var i = 0; i < dmgparticles.length; i++) {
        dmgparticles[i].speedX += 0.08
        dmgparticles[i].x += dmgparticles[i].speedX;
        dmgparticles[i].y += dmgparticles[i].speedY;
        if(dmgparticles[i].x < board2.width/dmgparticles[i].dmgmaxX || dmgparticles[i].x > board2.width || dmgparticles[i].y <= 0 || dmgparticles[i].y >= board2.height || dmgparticles[i].speedX >= 0) {
          dmgparticles.splice(i, 1);
        }
      }
    }
    function movedmgparticle2() {
      for (var i = 0; i < dmgparticles2.length; i++) {
        dmgparticles2[i].speedX -= 0.08
        dmgparticles2[i].x += dmgparticles2[i].speedX;
        dmgparticles2[i].y += dmgparticles2[i].speedY;
        if(dmgparticles2[i].x > board2.width/dmgparticles2[i].dmgmaxX || dmgparticles2[i].x < 0 || dmgparticles2[i].y <= 0 || dmgparticles2[i].y >= board2.height || dmgparticles2[i].speedX <= 0) {
          dmgparticles2.splice(i, 1);
        }
      }
    }


    function movebullet() {
      for (var i = 0; i < bullet.length; i++) {
        bullet[i].x += bullet[i].speedX;
        bullet[i].y += bullet[i].speedY;
        if(bullet[i].x < 0 || bullet[i].x > board2.width) {
          bullet.splice(i, 1);
          for (var i = 0; i < motionTrailLength; i++) {
            positions.splice(0,1);
          }
        }
        else if (bullet[i].x+bullet[i].width >= p2X && bullet[i].y-bullet[i].width <= p2Y+p2Width && bullet[i].y+bullet[i].width >= p2Y) {
          bullet.splice(i, 1);
          for (var i = 0; i < motionTrailLength; i++) {
            positions.splice(0,1);
          }
          for (var i = 0; i < dmgparticleCount; i++) {
            damaged();

          }
          lifes2--;
          if(!lifes2) {
            gameover();
          }
        }
        else if (bullet[i].x+bullet[i].width >= speedPickupX && bullet[i].y-bullet[i].width <= speedPickupY+speedPickupWidth && bullet[i].y+bullet[i].width >= speedPickupY) {
          for (var i = 0; i < speed.length; i++) {
            speed.splice(i, 1);
            p1Speedbuff();
          }
        }
        else if (bullet[i].x+bullet[i].width >= healingPickupX && bullet[i].y-bullet[i].width <= healingPickupY+healingPickupWidth && bullet[i].y+bullet[i].width >= healingPickupY) {
          for (var i = 0; i < healing.length; i++) {
            healing.splice(i, 1);
            p1Healing();
          }
        }
        else if (bullet[i].x+bullet[i].width >= sizePickupX && bullet[i].y-bullet[i].width <= sizePickupY+sizePickupWidth && bullet[i].y+bullet[i].width >= sizePickupY) {
          for (var i = 0; i < size.length; i++) {
            size.splice(i, 1);
            p1Sizebuff();
          }
        }
      }
    }

    function p1Healing() {
      if (lifes < 3) {
        lifes += 1
      }
    }

    function p1Speedbuff() {
      for (var i = 0; i < bullet.length; i++) {
        bulletSpeed1 = bulletSpeed1 * 2
        setTimeout(() => {
          bulletSpeed1 = bulletSpeed1 / 2
        }, 2000)
      }
    }

    function p1Sizebuff() {
      for (var i = 0; i < bullet.length; i++) {
        bulletSize1 = bulletSize1 * 2
        setTimeout(() => {
          bulletSize1 = bulletSize1 / 2
        }, 2000)
      }
    }

    function movebullet2() {
      for (var i = 0; i < bullet2.length; i++) {
        bullet2[i].x -= bullet2[i].speedX;
        bullet2[i].y -= bullet2[i].speedY;
        if(bullet2[i].x < 0 || bullet2[i].x > board2.width) {
          bullet2.splice(i, 1);
          for (var i = 0; i < motionTrailLength2; i++) {
            positions2.splice(0,1);
          }
        }
        else if (bullet2[i].x-bullet2[i].width <= p1X+p1Height/2 && bullet2[i].y-bullet2[i].width <= p1Y+p1Width && bullet2[i].y+bullet2[i].width >= p1Y) {
          bullet2.splice(i, 1);
          for (var i = 0; i < motionTrailLength2; i++) {
            positions2.splice(0,1);
          }
          for (var i = 0; i < dmgparticleCount; i++) {
            damaged2()
          }
          lifes--;
          if(!lifes) {
            gameover();
          }
        }
        else if (bullet2[i].x-bullet2[i].width <= speedPickupX+speedPickupWidth && bullet2[i].y-bullet2[i].width <= speedPickupY+speedPickupWidth && bullet2[i].y+bullet2[i].width >= speedPickupY) {
          for (var i = 0; i < speed.length; i++) {
            speed.splice(i, 1);
            p2Speedbuff();
          }
        }
        else if (bullet2[i].x-bullet2[i].width <= healingPickupX+healingPickupWidth && bullet2[i].y-bullet2[i].width <= healingPickupY+healingPickupWidth && bullet2[i].y+bullet2[i].width >= healingPickupY) {
          for (var i = 0; i < healing.length; i++) {
            healing.splice(i, 1);
            p2Healing();
          }
        }
        else if (bullet2[i].x-bullet2[i].width <= sizePickupX+sizePickupWidth && bullet2[i].y-bullet2[i].width <= sizePickupY+sizePickupWidth && bullet2[i].y+bullet2[i].width >= sizePickupY) {
          for (var i = 0; i < size.length; i++) {
            size.splice(i, 1);
            p2Sizebuff();
          }
        }
      }
    }

    function p2Healing() {
      if (lifes2 < 3) {
        lifes2 += 1
      }
    }

    function p2Speedbuff() {
      for (var i = 0; i < bullet2.length; i++) {
        bulletSpeed2 = bulletSpeed2 * 2
        setTimeout(() => {
          bulletSpeed2 = bulletSpeed2 / 2
        }, 2000)
      }
    }

    function p2Sizebuff() {
      for (var i = 0; i < bullet2.length; i++) {
        bulletSize2 = bulletSize2 * 2
        setTimeout(() => {
          bulletSize2 = bulletSize2 / 2
        }, 2000)
      }
    }

    function gameover() {
      console.log("end")
      clearInterval(spawningSpeed);
      clearInterval(spawningHealing);
      clearInterval(spawningSize);
      if (!lifes2) {
        paused2 = !paused2;
        p1wins();
        retry3();
      }
      else if (!lifes) {
        paused2 = !paused2;
        p2wins();
        retry3();
      }
    }

    function p1wins() {
      ctx2.font = "10px sans-serif";
      ctx2.fillStyle = "blue";
      ctx2.fillText("Player 1 wins!", board2.width-185, 10);

    }

    function p2wins() {
      ctx2.font = "10px sans-serif";
      ctx2.fillStyle = "red";
      ctx2.fillText("Player 2 wins!", board2.width-185, 10);
    }

    function drawLifes() {
      const p1h1 = document.getElementById("p1heart1")
      const p1h2 = document.getElementById("p1heart2")
      const p1h3 = document.getElementById("p1heart3")
      if (lifes == 3) {
        p1h1.style.display="";
        p1h2.style.display="";
        p1h3.style.display="";
      } else if (lifes == 2) {
        p1h1.style.display="";
        p1h2.style.display="";
        p1h3.style.display="none";
      } else if (lifes == 1) {
        p1h1.style.display="";
        p1h2.style.display="none";
        p1h3.style.display="none";
      } else if (lifes == 0) {
        p1h1.style.display="none";
        p1h2.style.display="none";
        p1h3.style.display="none";
      }
    }

    function drawLifes2() {
      const p2h1 = document.getElementById("p2heart1")
      const p2h2 = document.getElementById("p2heart2")
      const p2h3 = document.getElementById("p2heart3")
      if (lifes2 == 3) {
        p2h1.style.display="";
        p2h2.style.display="";
        p2h3.style.display="";
      } else if (lifes2 == 2) {
        p2h1.style.display="";
        p2h2.style.display="";
        p2h3.style.display="none";
      } else if (lifes2 == 1) {
        p2h1.style.display="";
        p2h2.style.display="none";
        p2h3.style.display="none";
      } else if (lifes2 == 0) {
        p2h1.style.display="none";
        p2h2.style.display="none";
        p2h3.style.display="none";
      }
    }

    function retry3() {
      ctx2.font = "17px Sans-serif";
      ctx2.fillStyle = "black";
      ctx2.fillText("'R' to restart", board2.width-200, board2.height/2);

    }

    function drawtrail() {
      for (var i = 0; i < positions.length; i++) {
        var ratio = (i + 1) / positions.length;
        ctx2.beginPath();
        ctx2.arc(positions[i].x, positions[i].y, bulletSize1*ratio,0,2*Math.PI);
        ctx2.fillStyle = "blue";
        ctx2.fillStyle = "rgba(0,0,255, " + ratio / 2 + ")";
        ctx2.fill();
        ctx2.closePath();
      }
    }

    function drawtrail2() {
      for (var i = 0; i < positions2.length; i++) {
        var ratio2 = (i + 1) / positions2.length;
        ctx2.beginPath();
        ctx2.arc(positions2[i].x, positions2[i].y, bulletSize2*ratio2,0,2*Math.PI);
        ctx2.fillStyle = "red";
        ctx2.fillStyle = "rgba(255,0,0, " + ratio2 / 2 + ")";
        ctx2.fill();
        ctx2.closePath();
      }
    }

    function draw2() {
      ctx2.clearRect(0, 0, board2.width, board2.height);
      if (upPressed == true) {
        if(m > -15) {
          m += -3;
        }
      }
      if (downPressed == true) {
        if(m < 15) {
          m += 3;
        }
      }
      if(upPressed == false && downPressed == false && m < 0) {
        m += 3;
      }
      if(upPressed == false && downPressed == false && m > 0) {
        m += -3;
      }

      if (upPressed2 == true) {
        if(m2 < 15) {
          m2 += 3;
        }
      }
      if (downPressed2 == true) {
        if(m2 > -15) {
          m2 += -3;
        }
      }
      if(upPressed2 == false && downPressed2 == false && m2 > 0) {
        m2 += -3;
      }
      if(upPressed2 == false && downPressed2 == false && m2 < 0) {
        m2 += 3;
      }
      drawtrail();
      drawtrail2();
      drawp1();
      drawp2();
      drawbullet();
      movebullet();
      drawbullet2();
      movebullet2();
      drawLifes();
      drawLifes2();
      drawSpeed();
      drawHealing();
      drawSize();
      drawdmgparticle();
      movedmgparticle();
      drawdmgparticle2();
      movedmgparticle2();

      if(!paused2) {
        requestAnimationFrame(draw2);
      }
    }

    draw2();
  }


  function initGame3() {
    controlsDiv.style.display="";
    game3.style.display = "";
    keyMap.innerHTML = "Breakout game";


  }

  const exitGame = document.getElementById("exitGame");
  const keymap = document.getElementById("keymap");
  const exitTyperacer = document.getElementById("exitTyperacer");
  const keyMap = document.getElementById("keymap");

  exitGame.addEventListener("click", exit)
  exitTyperacer.addEventListener("click", exit)

  function exit() {
    controlsDiv.style.display="none";
    game1.style.display = "none";
    game2.style.display = "none";
    game3.style.display = "none";
    document.getElementById("hearts").style.display="none";
    document.getElementById("hearts2").style.display="none";
    gsap.to(intersectFrame[0].object.position, {duration: 1, y: 3})
    gsap.to(intersectFrame[0].object.scale, {duration: 1, x: 1, y: 1})
    gsap.to(intersectFrame[0].object.rotation, {duration: 1, z: 3.14159265})
    gsap.to(intersectFrame[0].object.rotation, {duration: 1, x: 1.57079633})
    document.removeEventListener("keydown", keyDownHandler, false);
    document.removeEventListener("keyup", keyUpHandler, false);
    input.removeEventListener("input", written);
    clearInterval(Timer);

    setTimeout(() => {
      document.addEventListener("keydown", scrollDownHandler, false);
      document.addEventListener("keyup", scrollUpHandler, false);
      frameClicked = false;
      back.style.display="";
      pointers.style.display="";
    }, 1000)
  }

  let intersectFrame

  let delta = 0;
  let interval = 1 / 30
  function animate() {
    requestAnimationFrame( animate );
    delta += clock.getDelta();
    time += delta

    if (delta > interval) {

      camera.layers.set(1);
      controls.update();
      composer.render();

      renderer.clearDepth();
      camera.layers.set(0);

      grid.material.uniforms.time.value = time;

      for (let i = 0; i < array.length; i += 3) {
        array[i + 1] += waveSpeed.value*0.017;
        if (array[i + 1] > 380) {
          for (let i = 0; i < array.length; i += 3) {
            array[i + 1] += -300;
          }
        }
      }

      for (let i = 0; i < arrayline.length; i += 3) {
        arrayline[i + 1] += waveSpeed.value*0.017;
        if (arrayline[i + 1] > 380) {
          for (let i = 0; i < arrayline.length; i += 3) {
            arrayline[i + 1] += -300;
          }
        }
      }

      plane.geometry.attributes.position.needsUpdate = true;
      line.geometry.attributes.position.needsUpdate = true;

      raycaster.setFromCamera(mousePos, camera)

      intersectFrame = raycaster.intersectObjects(frames)

      if (intersectFrame.length > 0 && frameClicked == false) {
        gsap.to(intersectFrame[0].object.position, {duration: 1, y: 30})
        gsap.to(intersectFrame[0].object.scale, {duration: 1, x: 1.5, y: 1.5})
        gsap.to(intersectFrame[0].object.rotation, {duration: 1, z: 9.42477796})
        gsap.to(intersectFrame[0].object.rotation, {duration: 1, x: 1.97079633})
        console.log(intersectFrame[0].object.position.y)
      }

      for (const object of frames) {
        if (!intersectFrame.find(intersect => intersect.object === object) && frameClicked == false ) {
          gsap.to(object.position, {duration: 1, y: 3})
          gsap.to(object.scale, {duration: 1, x: 1, y: 1})
          gsap.to(object.rotation, {duration: 1, z: 3.14159265})
          gsap.to(object.rotation, {duration: 1, y: 3.14159265})
          gsap.to(object.rotation, {duration: 1, x: 1.57079633})
        }
      }

      const intersectPlane = raycaster.intersectObjects(planes)

      if (intersectPlane.length > 0) {
        const initColor = {
          x: 0.30196078431372549019607843137255,
          y: 0,
          z: 0.50588235294117647058823529411765
        }

        const animColor = {
          x: 1,
          y: 0,
          z: 1
        }

        const {color} = intersectPlane[0].object.geometry.attributes
        const {position} = intersectPlane[0].object.geometry.attributes
        color.setX(intersectPlane[0].face.a, animColor.x);
        color.setY(intersectPlane[0].face.a, animColor.y);
        color.setZ(intersectPlane[0].face.a, animColor.z);

        color.setX(intersectPlane[0].face.b, animColor.x);
        color.setY(intersectPlane[0].face.b, animColor.y);
        color.setZ(intersectPlane[0].face.b, animColor.z);

        color.setX(intersectPlane[0].face.c, animColor.x);
        color.setY(intersectPlane[0].face.c, animColor.y);
        color.setZ(intersectPlane[0].face.c, animColor.z);

        color.needsUpdate = true;

        gsap.to(animColor, {
          x: initColor.x,
          y: initColor.y,
          z: initColor.z,
          duration: 1,
          onUpdate: () => {
            color.setX(intersectPlane[0].face.a, animColor.x);
            color.setY(intersectPlane[0].face.a, animColor.y);
            color.setZ(intersectPlane[0].face.a, animColor.z);

            color.setX(intersectPlane[0].face.b, animColor.x);
            color.setY(intersectPlane[0].face.b, animColor.y);
            color.setZ(intersectPlane[0].face.b, animColor.z);

            color.setX(intersectPlane[0].face.c, animColor.x);
            color.setY(intersectPlane[0].face.c, animColor.y);
            color.setZ(intersectPlane[0].face.c, animColor.z);
          }
        })

      } else {
        planegeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colorVertices), 3))
      }

      if (carGameStart == true) {
        if (carLeft == true && car.position.x > -22.16 && car.position.x < 22.84) {
          car.position.x += -0.1 - (waveSpeed.value * 0.005);
        } else if (carRight == true && car.position.x > -22.16 && car.position.x < 22.84) {
          car.position.x += 0.1 + (waveSpeed.value * 0.005);
        }
        if (car.position.x > 22.84) {car.position.x = 22.83}
        if (car.position.x < -22.16) {car.position.x = -22.15}

        for (let i = 0; i < rocks.length; i++) {
          rocks[i].position.z += waveSpeed.value * 0.017
          if (rocks[i].position.z + rocksStats[i].depth / 2 >= car.position.z - 5  && rocks[i].position.z - rocksStats[i].depth / 2 <= car.position.z + 5 && rocks[i].position.x + rocksStats[i].width / 2 >= car.position.x - 2 && rocks[i].position.x - rocksStats[i].width / 2 <= car.position.x + 2) {
            carGameStart = false;
            clearInterval(rockSpawn)
            gsap.to(waveSpeed, {duration: 1.5, value: 20})
            document.getElementById("carGameOver").style.display = "";
            document.getElementById("carScore").style.display = "none";
            $('#container').hide();
          }
        }
        if (waveSpeed.value >= 30 && w50 == 0) {
          w50 = 1;
        }
        if (waveSpeed.value >= 50 && w50 == 2) {
          w50 = 3;
        }
        if (waveSpeed.value >= 70 && w50 == 4) {
          w50 = 3;
        }
        if (waveSpeed.value >= 100 && w50 == 5) {
          w50 = 6;
        }
        if (waveSpeed.value >= 130 && w50 == 7) {
          w50 = 8;
        }
        if (w50 == 1) {
          w50 = 2
          clearInterval(rockSpawn)
          rockSpawn = setInterval(rockInit, 1000);
        }
        if (w50 == 3) {
          w50 = 4
          clearInterval(rockSpawn)
          rockSpawn = setInterval(rockInit, 700);
        }
        if (w50 == 4) {
          w50 = 5
          clearInterval(rockSpawn)
          rockSpawn = setInterval(rockInit, 500);
        }
        if (w50 == 6) {
          w50 = 7
          clearInterval(rockSpawn)
          rockSpawn = setInterval(rockInit, 300);
        }
        if (w50 == 8) {
          w50 = 9
          clearInterval(rockSpawn)
          rockSpawn = setInterval(rockInit, 200);
        }
        waveSpeed.value += delta
        carScore += waveSpeed.value * 0.001
        $('#carSpeed').text(Math.round(waveSpeed.value) + " km/h")
        document.getElementById("carScore").innerText = Math.floor(carScore)
        document.getElementById("cgoScore").innerText = document.getElementById("carScore").innerText
      }

      renderer.render( scene, camera );
      delta = delta % interval;
      stats.update();

    }
  }

  let carGameStart = false;
  let carLeft = false;
  let carRight = false;
  var w50 = 0;

  function carMove(e) {
    if (e.code == "KeyA" || e.code == "ArrowLeft") {
      carLeft = true;
    } else if (e.code == "KeyD" || e.code == "ArrowRight") {
      carRight = true;
    }
  }

  function carStop(e) {
    if (e.code == "KeyA" || e.code == "ArrowLeft") {
      carLeft = false;
    } else if (e.code == "KeyD" || e.code == "ArrowRight") {
      carRight = false;
    }
  }

  const overflowDIV = document.getElementById("overflow");
  const sunDIV = document.getElementById("sun");
  const arrowsunDIV = document.getElementById("arrowSun");
  const back = document.getElementById("back");
  const pointers = document.getElementById("pointers");

  var scrollDown, scrollUp

  let action = false;

  function scrollDownHandler(e) {
    if (frame.position.z > -500 && overflowDIV.style.display == "" && action == false && frameClicked == false) {
      if (e.repeat) {return}
      const lastPos = frame.position.z
      if (e.code == 'ArrowUp' && lastPos < 300 ) {
        scrollUp = setInterval(() => {
          action = true;
          frame.position.z += 1;
          if (frame.position.z >= lastPos + 100) {
            clearInterval(scrollUp);
            frame.position.z = lastPos + 100;
            action = false;
          }
        }, 2)
      }
      if (e.code == 'ArrowDown' && lastPos > 0) {
        scrollDown = setInterval(() => {
          action = true;
          frame.position.z += -1;
          if (frame.position.z <= lastPos - 100) {
            clearInterval(scrollDown);
            frame.position.z = lastPos - 100;
            action = false;
          }
        }, 2)
      }
    }
  }

  function scrollUpHandler(e) {

  }

  sunDIV.addEventListener("click", frameSlide);
  back.addEventListener("click", frameSlide);

  function frameSlide() {
    if (frame.position.z <= -500) {
      overflowDIV.style.top = -2500+"vh";
      sunDIV.style.display = "none";
      arrowsunDIV.style.display = "none";
      car.position.set(-2.16, 0, 100);
      document.getElementById("AboutMeTag").style.display="none";
      document.getElementById("title").style.display="none";
      document.getElementById("titleBg").style.display="none";
      const forward = setInterval(() => {
        document.getElementById("overflow").style.overflow = "hidden";
        frame.position.z += 5
        camera.position.y += 1.088
        if (frame.position.z >= 0) {
          clearInterval(forward)
          document.getElementById("overflow").style.overflow = "";
          document.addEventListener("keydown", scrollDownHandler, false);
          document.addEventListener("keyup", scrollUpHandler, false);
          back.style.display="";
          pointers.style.display="";
        }
      }, 1)
    }
    if (frame.position.z > -500) {
      back.style.display="none";
      pointers.style.display="none";
      const reset = setInterval(() => {
        document.removeEventListener("keydown", scrollDownHandler, false);
        document.removeEventListener("keyup", scrollUpHandler, false);
        overflowDIV.style.overflow = "hidden";
        if (frame.position.z > 0) {
          frame.position.z += -5
        } else if (frame.position.z < 0) {
          frame.position.z += 5
        }
        if (frame.position.z >= -5 && frame.position.z <= 5) {
          clearInterval(reset)
          frame.position.z = 0
          const backward = setInterval(() => {
            frame.position.z += -5
            camera.position.y -= 1.088
            if (frame.position.z <= -500) {
              clearInterval(backward)
              car.position.set(-2.16, 0, 60);
              frame.position.z = -500
              sunDIV.style.display = "";
              arrowsunDIV.style.display = "";
              document.getElementById("AboutMeTag").style.display="";
              document.getElementById("title").style.display="";
              document.getElementById("titleBg").style.display="";
            }
          }, 1)
        }
      }, 1)
    }
  }

  const title = document.getElementById("title");
  const titleBg = document.getElementById("titleBg");

  let car
  let cars = [
    {name: 'old_rusty_car', using: false},
    {name: 'low_poly_suv', using: false}
  ];
  loader.crossOrigin = true;
  function carLoad(carFile) {
    loader.load( `http://localhost/gc/${carFile}/scene.gltf`, function ( data ) {
      car = data.scene;
      if (carFile == 'old_rusty_car') {
        car.scale.multiplyScalar(1 / 55);
      } else if (carFile == 'low_poly_suv') {
        car.scale.multiplyScalar(2);
      }
      car.position.set(0, 0, 60);
      car.rotation.y += -(1.57079633)*2;
      scene.add( car );
    });
  }
  cars[0].using = true
  carLoad(cars[0].name)

  document.getElementById("carChange").addEventListener("click", changeCar)
  let carHover, carHoverRotate
  function changeCar() {
    if (car.position.z == 60) {
      sunDIV.style.display = "none";
      arrowsunDIV.style.display = "none";
      document.getElementById("AboutMeTag").style.display = "none";
      document.getElementById("beats").style.display = "none";
      document.getElementById("beatsText").style.display = "none";
      carHover = gsap.fromTo( car.position, 1.5, {
        x: 0,
        y: 5,
        z: 15,
        ease: 'Power2.easeInOut'
      }, {
        x: 0,
        y: 3,
        z: 15,
        yoyo: true,
        ease: 'Power2.easeInOut',
        repeat: -1,
      })
      carHoverRotate = gsap.fromTo( car.rotation, 3, {
        y: 0,
        ease: 'Power0.easeNone'
      }, {
        y: 6.28318531,
        ease: 'Power0.easeNone',
        repeat: -1,
      })
      carInitCamera = gsap.to( camera.position, 1.5, {
        x: 0,
        y: 10,
        z: 35,
        yoyo: false,
        ease: 'Power2.easeInOut'
      });
    }
    else if (car.position.z == 15) {
      gsap.to( car.position, 1.5, {
        x: 0,
        y: 0,
        z: 60,
        ease: 'Power2.easeInOut'
      })
      gsap.to( car.rotation, 1.5, {
        x: 0,
        y: 0,
        z: 0,
        ease: 'Power2.easeInOut'
      })
      carHover.kill();
      carHoverRotate.kill();
      carInitCamera.reverse();
      setTimeout(() => {
        sunDIV.style.display = "";
        arrowsunDIV.style.display = "";
        document.getElementById("AboutMeTag").style.display = "";
        document.getElementById("beats").style.display = "";
        document.getElementById("beatsText").style.display = "";
      }, 1500)
    }
  }

  /*
  loader.load( '/low_poly_suv/scene.gltf', function ( data ) {
  data.scene;
  data.scene.scale.multiplyScalar(2); // adjust scalar factor to match your scene scale
  data.scene.position.set(10, 0, 60);
  data.scene.rotation.y += -(1.57079633)*2;
  scene.add( data.scene );
});
*/

  $('#cgoCancel').on('click', function(){
    carGame();
    $('#container').show();
    $('#carSpeed').hide();
  })
  $('#cgoRetry').on('click', function(){
    carGameRetry();
    $('#container').show();
  })
  $('#title').on('click', function(){
    carGame();
  })
})

function carGameRetry() {
  for (let i = 0; i < rocks.length; i++) {
    scene.remove(rocks[i])
  }
  rocks = []
  rocksStats = []
  document.getElementById("carScore").style.display = "";
  document.getElementById("carGameOver").style.display = "none";
  carGameStart = true;
  carScore = 0;
  w50 = 0;
  rockSpawn = setInterval(rockInit, 1250);
}

let carInit, carInitCamera, rockSpawn, carScore
function carGame() {
  if ( car.position.z == 60 ) {
    sunDIV.style.display = "none";
    arrowsunDIV.style.display = "none";
    document.getElementById("AboutMeTag").style.display = "none";
    document.getElementById("beats").style.display = "none";
    document.getElementById("beatsText").style.display = "none";
    document.getElementById("carChangeTab").style.display="none";
    rocks = []
    rocksStats = []
    carInit = gsap.to( car.position, 1.5, {
      x: 0,
      y: 0,
      z: 15,
      yoyo: false,
      ease: 'Power2.easeInOut'
    });
    carInitCamera = gsap.to( camera.position, 1.5, {
      x: 0,
      y: 10,
      z: 35,
      yoyo: false,
      ease: 'Power2.easeInOut'
    });
    setTimeout(() => {
      document.addEventListener("keydown", carMove);
      document.addEventListener("keyup", carStop);
      carGameStart = true;
      document.getElementById("carScore").style.display = "";
      $('#carSpeed').show();
      carScore = 0;
      w50 = 0;
      rockSpawn = setInterval(rockInit, 1250);
    }, 1500)
  } else if ( car.position.z == 15 ) {
    setTimeout(() => {
      sunDIV.style.display = "";
      arrowsunDIV.style.display = "";
      document.getElementById("AboutMeTag").style.display = "";
      document.getElementById("beats").style.display = "";
      document.getElementById("beatsText").style.display = "";
      document.getElementById("carChangeTab").style.display="none";
    }, 1500)
    carInit.reverse();
    carInitCamera.reverse();
    document.getElementById("carScore").style.display = "none";
    document.getElementById("carGameOver").style.display = "none";
    carGameStart = false;
    clearInterval( rockSpawn )
    for (let i = 0; i < rocks.length; i++) {
      scene.remove(rocks[i])
    }
    gsap.to(waveSpeed, {duration: 1.5, value: 20})
    document.removeEventListener("keydown", carMove);
    document.removeEventListener("keyup", carStop);
    $('#carSpeed').hide();
  }
}

let rocks = []
let rocksStats = []
let rockColors = [
  0x00ff00,
  0xc7008b,
  0xe72c12,
  0x5e6dc4,
  0xf59641
]

function rockInit() {
  var rockMat = new THREE.MeshBasicMaterial( {color: rockColors[Math.floor(Math.random() * (Math.floor(4) - Math.ceil(0)) + Math.ceil(0))]} );
  var rockGeo = new THREE.BoxGeometry(Math.random() * (8 - 2) + 2, Math.random() * (6 - 2) + 2, Math.random() * (4 - 2) + 2)
  var rock = new THREE.Mesh(rockGeo, rockMat);
  let rockStats = {
    width: rockGeo.parameters.width,
    height: rockGeo.parameters.height,
    depth: rockGeo.parameters.depth
  }
  rock.position.set(Math.random() * (20 - -20) + -20, rockStats.height / 2, -220)
  rocksStats.push(rockStats)
  rocks.push(rock)
  scene.add(rock)
}

animate();
