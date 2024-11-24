<template>
    <div class="button-container">
      <div class="button-group">
        <button class="action-button">
          <img src="deposit-icon.png" alt="ฝาก" />
          <span>ฝาก</span>
        </button>
        <button class="action-button">
          <img src="withdraw-icon.png" alt="ถอน" />
          <span>ถอน</span>
        </button>
      </div>
      <div class="button-group">
        <button class="action-button">
          <img src="promotion-icon.png" alt="โปรโมชั่น" />
          <span>โปรโมชั่น</span>
        </button>
        <button class="action-button">
          <img src="contact-icon.png" alt="ติดต่อเรา" />
          <span>ติดต่อเรา</span>
        </button>
      </div>
    </div>
  </template>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #4c1a9d, #7d30d4);
  padding: 10px;
  border-radius: 15px;
}

.button-group {
  display: flex;
  gap: 20px;
}

.action-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #6b3aee;
  border: none;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 80px;
  height: 80px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.action-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.action-button img {
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
}
</style>
