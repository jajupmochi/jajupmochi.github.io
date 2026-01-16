import { initScrolly } from './scrolly.js'; // 引入模块

export function initGraph(ui) {
    const groupColors = {
        core: "#e63946",       
        experience: "#f4a261", 
        education: "#2a9d8f",  
        project: "#457b9d",    
        paper: "#1d3557",      
        skill: "#cfd8dc", 
        category: "#333333"    
    };

    // --- 关键检查 ---
    if (typeof d3 === 'undefined') {
        alert("错误：D3库未加载。请检查 index.html 中是否包含 <script src='//unpkg.com/d3'></script>");
        return;
    }

    fetch('data/data.json')
        .then(res => {
            if (!res.ok) throw new Error("JSON文件读取失败");
            return res.json();
        })
        .then(data => {
            const elem = document.getElementById('graph-container');
            
            const Graph = ForceGraph()
            (elem)
            .graphData(data)
            .backgroundColor('#f4f4f7')
            
            // --- 物理引擎参数 ---
            .d3Force('charge', d3.forceManyBody().strength(-20)) // 斥力
            .d3Force('collide', d3.forceCollide(node => Math.sqrt(node.val) * 4 + 15)) // 碰撞体积
            .d3Force('link', d3.forceLink().distance(100)) // 连线长度

            // --- 视觉样式 ---
            .nodeLabel(null)
            .nodeColor(node => groupColors[node.group] || '#999')
            .linkColor(() => '#d1d5db') // 浅灰色连线
            .linkWidth(1.5)
            
            // --- 节点绘制 ---
            
            .nodeCanvasObject((node, ctx, globalScale) => {
                const r = Math.sqrt(node.val) * 4;
                const fontSize = 14 / globalScale;

                // --- A. 渲染核心头像 (Me) ---
                if (node.img) {
                    // 保存当前画笔状态
                    ctx.save(); 
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
                    ctx.clip(); // 裁剪成圆形
                    
                    // 绘制图片 (你需要预先加载图片对象，这里简化处理，假设 imgObj 已缓存)
                    // 实际开发中，可以使用一个全局 Image 对象缓存： const img = new Image(); img.src = node.img;
                    try {
                    const img = new Image();
                    img.src = node.img;
                    ctx.drawImage(img, node.x - r, node.y - r, r * 2, r * 2);
                    } catch(e) {
                    ctx.fillStyle = '#e63946'; ctx.fill(); // 加载失败回退到颜色
                    }
                    ctx.restore();
                    
                    // 绘制外圈光环
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
                    ctx.strokeStyle = '#fff';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    return; // 核心节点画完退出
                }

                // --- B. 渲染分类图标 (Categories) ---
                if (node.icon) {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
                    ctx.fillStyle = '#fff'; // 白底
                    ctx.fill();
                    ctx.strokeStyle = groupColors[node.group];
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    ctx.font = `${r}px Sans-Serif`; // 图标大小随节点大小
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#333';
                    ctx.fillText(node.icon, node.x, node.y);
                    
                    // 下方文字
                    ctx.font = `600 ${fontSize}px Inter`;
                    ctx.fillStyle = '#333';
                    ctx.fillText(node.label, node.x, node.y + r + 10);
                    return;
                }
                
                const label = node.label;
                // --- C. 渲染普通节点 ---
                
                ctx.beginPath();
                ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
                ctx.fillStyle = groupColors[node.group] || '#999';
                
                if (node === hoverNode) {
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = groupColors[node.group];
                } else {
                    ctx.shadowBlur = 0;
                }
                
                ctx.fill();
                ctx.shadowBlur = 0; 

                // 核心节点常显，其他节点悬停显示
                const showLabel = node.val > 25 || node === hoverNode;

                if (showLabel) {
                    ctx.font = `600 ${fontSize}px Inter, sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = '#f4f4f7';
                    ctx.strokeText(label, node.x, node.y + r + 10);
                    ctx.fillStyle = '#333';
                    ctx.fillText(label, node.x, node.y + r + 10);
                }
            })
            
            // --- 交互 ---
            .onNodeClick(node => {
                Graph.centerAt(node.x, node.y, 1000);
                Graph.zoom(3, 2000);
                if (node.contentHTML) {
                    ui.openPanel(node.contentHTML);
                }
            })
            .onNodeHover(node => {
                hoverNode = node;
                elem.style.cursor = node ? 'pointer' : null;
            });
            
            let hoverNode = null;

            // 渲染完成后，启动滚动监听！
            initScrolly(Graph, data);
        })
        .catch(err => {
            console.error(err);
            alert("图谱加载失败，详情请看控制台");
        });
}