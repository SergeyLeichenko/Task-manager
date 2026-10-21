<template>
  <aside class="sidebar">
    <small>WORKSPACE</small>
    <nav>
      <RouterLink to="/dashboard"><span>▦</span> Dashboard</RouterLink
      ><RouterLink to="/tasks"><span>✓</span> My tasks</RouterLink>
    </nav>
    <div class="tip">
      <b>✦</b>
      <div>
        <strong>Stay on track</strong>
        <p>Small steps make big progress.</p>
      </div>
    </div>
  </aside>
</template>
<style scoped>
.sidebar {
  width: 225px;
  flex: 0 0 225px;
  display: flex;
  flex-direction: column;
  padding: 26px 14px 18px;
  background: #20243a;
  min-height: calc(100vh - 68px);
  color: #bac0d4;
}
.sidebar small {
  margin: 0 12px 12px;
  color: #7c84a2;
  font-size: 10px;
  letter-spacing: 1.3px;
  font-weight: 800;
}
nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
nav a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 9px;
  color: #bac0d4;
  text-decoration: none;
  font-size: 13px;
}
nav a span {
  width: 18px;
  font-size: 18px;
  text-align: center;
}
nav a:hover {
  background: #2d324c;
  color: white;
}
nav a.router-link-active {
  background: #5556cf;
  color: white;
}
.tip {
  display: flex;
  gap: 10px;
  margin-top: auto;
  padding: 14px 8px 0;
  border-top: 1px solid #373b53;
}
.tip b {
  color: #d0d0ff;
}
.tip strong {
  font-size: 12px;
  color: white;
}
.tip p {
  font-size: 10px;
  color: #a4abc2;
  line-height: 1.5;
  margin: 5px 0 0;
}
@media (max-width: 600px) {
  .sidebar {
    width: 62px;
    flex-basis: 62px;
    padding: 20px 6px;
  }
  .sidebar small,
  .tip,
  nav a {
    font-size: 0;
  }
  nav a {
    justify-content: center;
    padding: 12px 4px;
  }
  nav a span {
    font-size: 20px;
  }
}
</style>
