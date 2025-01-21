<template>
    <div class="image-scroll-container">
        <a-col :span="4">
            <a-image
                src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/pg-game/%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%82%E0%B8%A1%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99.webp"
                style="border-radius: 5px;"
                :preview="false"
            />
        </a-col>
        <a-col :span="4">
            <a-image
                src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/pg-game/%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%82%E0%B8%A1%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99.webp"
                style="border-radius: 5px;"
                :preview="false"
            />
        </a-col>
        <a-col :span="4">
            <a-image
                src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/pg-game/%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%82%E0%B8%A1%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99.webp"
                style="border-radius: 5px;"
                :preview="false"
            />
        </a-col>
    </div>
</template>

<style scoped>
    .image-scroll-container {
        display: flex;
        overflow-x: hidden; /* ซ่อน scrollbar */
        gap: 10px;
        padding: 10px 0;
        scroll-behavior: smooth; /* เลื่อนนุ่มนวล */
        touch-action: pan-x; /* เปิดให้เลื่อนด้วยการปัดนิ้ว */
        -webkit-overflow-scrolling: touch; /* รองรับการเลื่อนบน iOS */
        background-color: rgba(0, 0, 0, 0.539);
        padding: 10px 5px;
        border-radius: 5px;
    }
    .image-card {
        min-width: 150px; /* ความกว้างขั้นต่ำของแต่ละภาพ */
    }
    .image-scroll-container::-webkit-scrollbar {
        height: 8px;
    }
    .image-scroll-container::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
    }
</style>