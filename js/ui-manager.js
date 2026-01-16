export function initUIManager() {
    const panel = document.getElementById('side-panel');
    const contentDiv = document.getElementById('panel-content');
    const closeBtn = document.getElementById('close-btn');
    const tooltip = document.getElementById('graph-tooltip');

    // 1. 打开详情页
    const openPanel = (htmlContent) => {
        contentDiv.innerHTML = htmlContent;
        panel.classList.remove('panel-hidden');
    };

    // 2. 关闭详情页
    const closePanel = () => {
        panel.classList.add('panel-hidden');
    };

    // 3. 绑定关闭按钮
    closeBtn.addEventListener('click', closePanel);

    // 4. 工具提示控制 (Tooltip)
    const updateTooltip = (content, x, y) => {
        if (!content) {
            tooltip.style.display = 'none';
            return;
        }
        tooltip.style.display = 'block';
        tooltip.style.left = `${x + 10}px`;
        tooltip.style.top = `${y + 10}px`;
        tooltip.innerHTML = content;
    };

    return {
        openPanel,
        closePanel,
        updateTooltip
    };
}