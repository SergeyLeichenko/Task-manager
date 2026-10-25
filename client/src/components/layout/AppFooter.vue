<template>
  <footer>
    <span>✦</span> Made for focused days
    <span class="footer-dot">·</span> Taskflow Portfolio Project
  </footer>
</template>

<style scoped>
footer {
  display: flex;
    justify-content: center;
    align-items: center;
    gap: 7px;
    color: var(--text-light-gray);
    font-size: 10px;
    padding: 30px 0 24px
}

footer > span:first-child {
  color: var(--purple);
}

.footer-dot {
  color: var(--border);
}
</style>
