<!-- 
  记账小工具
  1. 数据: 日期、类型(收入/支出)、分类(主分类、副分类）、金额、备注
  2. 功能: 新增、删除、编辑、查询、统计
-->
<template>
  <div class="flex flex-row items-end w-full gap-8 p-4 text-black shadow-sm min-h-max card">
    <span class="font-mono text-4xl">账单</span>
    <button class="text-2xl link">新增</button>
  </div>

  <div>
    <div class="flex flex-col items-center gap-4 p-4 m-8 text-black border min-h-max card">
      <div class="flex justify-start w-full border-b border-solid">
        <span class="text-4xl">2024-11-11</span>
      </div>
      <div class="flex flex-wrap w-full gap-4">
        <div class="flex flex-col items-start gap-4 p-8 pt-4 pb-4 shadow-lg card">
          <div class="flex flex-row items-end gap-2">
            <span class="text-3xl font-bold text-[red]">支出</span>
            <span class="text-xl">娱乐消费</span> <span class="text-xl">></span> <span class="text-lg">视频会员</span>
          </div>
          <span class="text-2xl font-bold">100.00</span>
        </div>
        <div class="flex flex-col items-start gap-4 p-8 pt-4 pb-4 shadow-lg card">
          <div class="flex flex-row items-end gap-2">
            <span class="text-3xl font-bold text-[green]">支出</span>
            <span class="text-xl">收入</span> <span class="text-xl">></span> <span class="text-lg">工资</span>
          </div>
          <span class="text-2xl font-bold">73.00</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
