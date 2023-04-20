<template>
    <div class="navbar-title">
      <img class='logo' src='/public/logo.svg' alt='机器人图标'>
      <span class="text">编程知识库 | 阿饭</span>
    </div>
</template>

<style scoped>
.navbar-title{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
}
.logo {
  width: 24px;
  height: 24px;
  position: relative;
}

.logo + .text {
  padding-left: 8px;
}

.text {
  font-size: 16px;
  font-weight: 500;
}
</style>
