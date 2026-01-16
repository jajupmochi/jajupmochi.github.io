// js/scrolly.js

export function initScrolly(Graph, graphData) {
    console.log("初始化滚动监听...");
    
    // 1. 获取所有带有 story-step 类的段落
    const steps = document.querySelectorAll('.story-step');

    // 2. 创建观察者 (IntersectionObserver)
    // 它的作用是：当某个元素进入屏幕 50% 的区域时，触发回调
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // A. 视觉反馈：给当前文字卡片加 active 类 (变亮)
                document.querySelectorAll('.story-step').forEach(s => s.classList.remove('active'));
                entry.target.classList.add('active');

                // B. 获取 data-focus 里的节点 ID
                const nodeId = entry.target.getAttribute('data-focus');
                if (!nodeId) return;

                // C. 在数据里找到这个节点对象
                // 注意：graphData.nodes 可能是数组
                const node = graphData.nodes.find(n => n.id === nodeId);

                if (node) {
                    console.log(`滚动聚焦到: ${node.label}`);
                    
                    // D. 指挥图谱相机移动
                    // Graph.centerAt(x, y, 动画时间ms)
                    Graph.centerAt(node.x, node.y, 1500); 
                    Graph.zoom(2.5, 1500); // 放大倍数，2.5 比较合适
                }
            }
        });
    }, {
        threshold: 0.5, // 元素出现 50% 时触发
        rootMargin: "-10% 0px -10% 0px" // 上下收缩一点判定范围，体验更好
    });

    // 3. 开始观察每一个段落
    steps.forEach(step => observer.observe(step));
}