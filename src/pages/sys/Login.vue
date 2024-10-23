<template>
  <div class="login_container">
    <el-card class="login-card">
      <el-form class="" v-model="loginReq" label-width="auto">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginReq.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginReq.password" type="password" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { UserLogin } from '@api/models/userModel'
import { ref } from 'vue'
import { useLogin } from '@/hooks/core/useLogin'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

const router = useRouter()

const { doLogin } = useLogin()

const loginReq = ref<UserLogin>({
  username: '',
  password: '',
})

const handleLogin = () => {
  doLogin(loginReq.value)
    .then(() => {
      ElNotification.success({
        title: '登录成功',
        message: '欢迎回来',
      })
      router.replace('/')
    })
    .catch(error => {
      console.log(error)
      ElNotification.error({
        title: '登录失败',
        message: '请检查用户名和密码',
      })
    })
}
</script>

<style lang="scss" scoped>
.login_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  background-image: url('@/assets/imgs/code_background.jpg');
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.login-card {
  width: 400px;
  height: max-content;
  background-color: white;
}

.btn {
  margin: auto;
  width: 60%;
}
</style>
