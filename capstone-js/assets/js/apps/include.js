async function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');

    for (const el of elements) {
        const file = el.getAttribute('data-include');
        try {
            const res = await fetch(file);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const text = await res.text();

            const temp = document.createElement('div');
            temp.innerHTML = text;

            // CSS
            temp.querySelectorAll('link[rel="stylesheet"], style').forEach(node => {
                document.head.appendChild(node.cloneNode(true));
            });

            // HTML
            el.innerHTML = temp.innerHTML;

            // JS
            temp.querySelectorAll('script').forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.body.appendChild(newScript);
            });

        } catch (err) {
            el.innerHTML = `<p style="color:red;">Không thể tải ${file}</p>`;
            console.error(`Lỗi include ${file}:`, err);
        }
    }
}

document.addEventListener('DOMContentLoaded', includeHTML);

