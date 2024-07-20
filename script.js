document.getElementById('start').addEventListener('click', startTest);

function startTest() {
    measurePing();
    measureDownloadSpeed();
    measureUploadSpeed();
}

function measurePing() {
    const startTime = performance.now();
    fetch('https://api.github.com')
        .then(() => {
            const endTime = performance.now();
            const ping = Math.round(endTime - startTime);
            document.getElementById('ping').textContent = `${ping} ms`;
        })
        .catch(() => {
            document.getElementById('ping').textContent = 'Error';
        });
}

function measureDownloadSpeed() {
    const image = new Image();
    const startTime = performance.now();
    const cacheBuster = `?nnn=${startTime}`;
    image.src = `https://www.google.com/images/phd/px.gif${cacheBuster}`;
    image.onload = () => {
        const endTime = performance.now();
        const duration = (endTime - startTime) / 1000;
        const imageSize = 12200 * 8; // size in bits
        const speedBps = imageSize / duration;
        const speedKbps = speedBps / 1024;
        const speedMbps = speedKbps / 1024;
        document.getElementById('download').textContent = `${speedMbps.toFixed(2)} Mbps`;
    };
    image.onerror = () => {
        document.getElementById('download').textContent = 'Error';
    };
}

function measureUploadSpeed() {
    const xhr = new XMLHttpRequest();
    const data = new Blob([new ArrayBuffer(12200)]); // 12KB blob
    const startTime = performance.now();

    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000;
            const dataSize = 12200 * 8; // size in bits
            const speedBps = dataSize / duration;
            const speedKbps = speedBps / 1024;
            const speedMbps = speedKbps / 1024;
            document.getElementById('upload').textContent = `${speedMbps.toFixed(2)} Mbps`;
        } else {
            document.getElementById('upload').textContent = 'Error';
        }
    };
    xhr.onerror = () => {
        document.getElementById('upload').textContent = 'Error';
    };
    xhr.send(data);
}
