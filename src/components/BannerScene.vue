<template>
  <section id="banner" class="relative">
    <transition name="zoom-rotate">
      <div v-show="showModel" class="model" ref="model"></div>
    </transition>
    <transition name="fade">
      <div v-if="showProgress" class="loading absolute">
        <svg xmlns="http://www.w3.org/2000/svg" height="4" viewBox="0 0 204 4">
          <g transform="translate(-831 -590.5)">
            <line x2="200" transform="translate(833 592.5)" fill="none" stroke="rgba(0,0,0,0.2)" stroke-linecap="round"
              stroke-width="4" />
            <line :x2="progressFill" transform="translate(833 592.5)" fill="none" stroke="#000" stroke-linecap="round"
              stroke-width="4" />
          </g>
        </svg>
      </div>
    </transition>
    <a href="https://atella.ca/" class="a-button custom-logo br-32 icon-btn icon-left  gap-4 absolute">
      <img decoding="async" loading="lazy" :src="Logo" id="svg-logo" />
    </a>
   
    <button @click="$store.commit('openCostModal')" class="button-sec br-32 gap-8">
      The Real cost of buying an Atella
      <span class="centered br-24">
        <svg xmlns="http://www.w3.org/2000/svg" height="11.154" viewBox="0 0 5.635 11.154">
          <path id="Vector"
            d="M1.26,12.077a.577.577,0,0,1-.408-.985L4.968,6.976a.674.674,0,0,0,0-.952L.852,1.908a.577.577,0,0,1,.816-.816L5.784,5.208a1.829,1.829,0,0,1,0,2.584L1.668,11.908A.575.575,0,0,1,1.26,12.077Z"
            transform="translate(-0.683 -0.923)"></path>
        </svg>
      </span>
    </button>
  </section>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Logo from '@/assets/Atella_Logo-Tan.svg';
import Logo2 from '@/assets/Atella_FavIcon.jpg';

export default {
  name: 'BannerScene',
  props: ['rotation', 'zoom', 'filePath'],
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      modelLoaded: false,
      model: null,
      progressFill: 1,
      showProgress: true,
      showModel: false,
      Logo: Logo,
      Logo2: Logo2
    };
  },
  watch: {
    rotation(newRotation) {
      if (this.modelLoaded && this.model) {
        this.model.rotation.y = newRotation / 180 * Math.PI;
      }
    },
    zoom(newZoom) {
      if (this.modelLoaded && this.model) {
        this.camera.position.z = newZoom
      }
    },
    filePath(newfilePath) {
      this.startProgress();
      this.loadModel();
      return newfilePath;
    },
  },
  methods: {
    init3DScene() {
      const container = this.$refs.model;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(40, containerWidth / containerHeight, 0.01, 1000);

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.useLegacyLights = false
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(containerWidth, containerHeight);
      this.renderer.setClearColor(0xF5F3F1);
      this.renderer.toneMapping = Number(THREE.LinearToneMapping)
      this.renderer.toneMappingExposure = Math.pow(2, 0.9);
      container.appendChild(this.renderer.domElement);

      this.camera.position.x = 2;
      this.camera.position.y = 3;
      this.camera.position.z = this.zoom - 9.2;


      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableZoom = false;
      this.controls.minPolarAngle = 1.5 * Math.PI / 12; // 1.5 * Math.PI / 12; 
      this.controls.maxPolarAngle = 1.5 * Math.PI / 3; // 1.5 * Math.PI / 3;
      this.controls.update();

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8 * Math.PI);
      directionalLight.position.set(0.5, 0, 0.866);
      directionalLight.castShadow = true;
      directionalLight.intensity = 2;
      this.scene.add(directionalLight);

      // // Add more lights or elements to the scene if needed
      // let light2 = new THREE.PointLight(0xffffff, 10);
      //   light2.position.set(50, 10, 0);
      //   light2.intensity = 1.5; 
      //   this.scene.add(light2);

      const hemLight = new THREE.HemisphereLight()
      hemLight.intensity = 0.3
      hemLight.color.set('#ffffff')
      this.scene.add(hemLight)


      const ambLight = new THREE.AmbientLight('#ffffff', 0.3)
      ambLight.intensity = 2
      ambLight.color.set('#ffffff')
      this.scene.add(ambLight)

      // let light3 = new THREE.PointLight(0xffffff, 10);
      // light3.position.set(0, 100, -500);
      // light3.intensity = 1.5; 
      // this.scene.add(light3);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.antialias = true; // Enable anti-aliasing
    },
    removeModel() {
      if (this.modelLoaded && this.model) {
        this.scene.remove(this.model);
        this.model.traverse((object) => {
          if (object.type === 'Mesh') {
            object.geometry.dispose();
            object.material.dispose();
          }
        });
        this.modelLoaded = false;
        this.model = null;
      }
    },
    loadModel() {
      this.removeModel(); // Clear the existing model
      const loader = new GLTFLoader();
      loader.load(this.filePath, (gltf) => {
        this.model = gltf.scene;
        this.model.rotation.y = this.rotation * Math.PI;

        this.scene.add(this.model);

        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        this.model.position.sub(center);

        this.modelLoaded = true;

        this.animate();

        // gltf.scene.traverse((child) => {
        //   if (child.isMesh) {
        //     child.geometry.computeVertexNormals(); // Apply smooth shading
        //   }
        // });
      });
    },
    observeContainerResize() {
      const container = this.$refs.model;
      const observer = new ResizeObserver((entries) => {
        if (entries.length > 0) {
          const { width, height } = entries[0].contentRect;
          this.handleContainerResize(width, height);
        }
      });

      observer.observe(container);
    },
    handleContainerResize(width, height) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.controls.update();
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
    startProgress() {
      var interval = setInterval(() => {
        if (!this.modelLoaded && this.progressFill < 180) {
          this.progressFill++
        } else if (this.modelLoaded) {
          this.progressFill = 200
          setTimeout(() => {
            clearInterval(interval);
            this.showProgress = false
            this.showModel = true
          }, 200)
        }
      }, 20)
    },
  },
  mounted() {
    this.startProgress()
    this.init3DScene();
    this.loadModel();
    this.observeContainerResize();
  }
};

</script>

<style lang="scss" scoped>
.loading {
  inset: 50% auto auto 50%;
  transform: translateX(-50%);
}

#banner {
  height: 50dvh;
  background-color: #F5F3F1;
  cursor: grab;
  position: sticky;
  top: 0;
  z-index: 10;
  transition: 0.3s height;
  overflow: hidden;
}

.model {
  height: inherit;
}

canvas {
  height: 100%;
  width: 100%;
}

.button-sec {
  background-color: rgb(237 234 231);
  color: #000;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  padding: 14px 18px 14px 30px;

  span {
    background-color: #fff;
    padding: 8px 24px;
  }
}

.button-primary {
  inset: 50px auto auto 80px;
  background-color: #fff;
  color: #000;
  padding: 14px 26px;
}

.custom-logo {
  inset: 50px auto auto 80px;
  color: #000;
  padding: 14px 26px;

  img {
    top: 0;
    left: 0;
    max-width: 150px;
    position: fixed;
    margin: 30px;
    width: 20%;
  }
}

.button-secondary {
  padding: 14px 18px 14px 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  color: #fff;

  span {
    background-color: #fff;
    padding: 8px 24px;
  }

}

@media screen and (max-width: 900px) {
  #banner {
    height: 60svh;
  }

  .button-primary {
    inset: 30px auto auto 20px;
    padding: 8px 18px;
    height: 40px;
    font-size: 0.91rem;

  }

 

 
  .button-secondary {
    padding: 7px 7px 7px 14px;
    font-size: 0.91rem;

    span {
      padding: 8px 16px;
    }
  }
}


.zoom-rotate-enter-active,
.zoom-rotate-leave-active {
  transition: all 900ms;
}

.zoom-rotate-enter,
.zoom-rotate-leave-to {
  transform: scale(0) rotate(20deg);
}</style>