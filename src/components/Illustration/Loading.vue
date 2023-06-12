<template>
  <div class="loading">
    <div class="loading-block">
      <p>E</p>
      <p>D</p>
      <p>U</p>
      <p>T</p>
      <p>E</p>
      <p>S</p>
      <p>T</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loading {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
}
.loading-block {
  text-align: center;
}

p {
  display: inline-block;
  text-transform: uppercase;
  text-align: center;
  font-size: 4em;
  font-weight: 600;
  transform: scale(0.5);
  color: #121212;
  -webkit-text-stroke: 2px gray;
}

p:nth-child(1) {
  animation: hover 1s linear infinite;
}

p:nth-child(2) {
  animation: hover 1s linear infinite 0.125s;
}

p:nth-child(3) {
  animation: hover 1s linear infinite 0.25s;
}

p:nth-child(4) {
  animation: hover 1s linear infinite 0.375s;
}

p:nth-child(5) {
  animation: hover 1s linear infinite 0.5s;
}

p:nth-child(6) {
  animation: hover 1s linear infinite 0.675s;
}

p:nth-child(7) {
  animation: hover 1s linear infinite 0.75s;
}

@keyframes hover {
  0% {
    transform: scale(0.5);
    color: #fff;
  }

  20% {
    transform: scale(1);
    color: #fff;
    filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 3px #59c8c1) drop-shadow(0 0 5px #59c8c1) hue-rotate(10turn);
  }

  50% {
    transform: scale(0.5);
    color: #fff;
  }
}
</style>
