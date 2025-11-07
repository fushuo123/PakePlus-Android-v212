// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

// ========== 全屏优化代码 ==========
// 强制全屏样式
const fullscreenStyle = document.createElement('style')
fullscreenStyle.textContent = `
    /* 隐藏滚动条和状态栏 */
    ::-webkit-scrollbar { display: none !important; }
    body { margin: 0 !important; padding: 0 !important; overflow: hidden !important; }
    
    /* 视频播放器全屏优化 */
    video { width: 100% !important; height: 100% !important; object-fit: contain !important; }
    
    /* 隐藏可能的标题栏和状态栏 */
    header, .header, .navbar, .status-bar { display: none !important; }
    
    /* 确保主要内容区域全屏 */
    #app, .container, .main, .content { 
        width: 100vw !important; 
        height: 100vh !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
    }
`
document.head.appendChild(fullscreenStyle)

// 监听横竖屏变化
window.addEventListener('resize', function() {
    if (window.orientation === 90 || window.orientation === -90) {
        document.body.classList.add('landscape')
        document.body.classList.remove('portrait')
    } else {
        document.body.classList.add('portrait')
        document.body.classList.remove('landscape')
    }
})

// 页面加载完成后强制全屏
window.addEventListener('load', function() {
    // 延迟执行确保DOM完全加载
    setTimeout(() => {
        // 尝试调用全屏API
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen()
        }
        
        // 强制隐藏可能的浮动元素
        const floatingElements = document.querySelectorAll('.ad, .banner, .popup, .modal')
        floatingElements.forEach(el => {
            el.style.display = 'none !important'
        })
    }, 1000)
})

document.addEventListener('click', hookClick, { capture: true })