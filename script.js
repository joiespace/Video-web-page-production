window。addEventListener('DOMContentLoaded',function() {
    // 确保jQuery加载完成后再执行轮播图代码
    var checkJQuery = setInterval(function() {
        if (window.jQuery) {
            clearInterval(checkJQuery);
            
            // 获取轮播图元素
            const carouselImages = $('#carousel-images');
            const images = carouselImages.find('img');
            const indicators = $('#carousel-indicators button');
            
            let currentIndex = 0;
            const totalImages = images.length;
            
            // 隐藏所有图片并显示指定索引的图片
            function showImage(index) {
                images.hide();
                $(images[index]).show();
                
                // 更新指示器
                indicators.removeClass('active-nav').eq(index).addClass('active-nav');
            }
            
            // 下一张图片
            function nextImage() {
                currentIndex = (currentIndex + 1) % totalImages;
                showImage(currentIndex);
            }
            
            // 自动播放
            setInterval(nextImage, 3000);
            
            // 点击指示器切换图片
            indicators.click(function() {
                const index = $(this).index();
                currentIndex = index;
                showImage(currentIndex);
            });
            
             // 移动端菜单控制
            const mobileMenuButton = document.getElementById('mobileMenuButton');
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', function () {
                 const isExpanded = this.getAttribute('aria-expanded') === 'true';
                 // 切换菜单显示状态 
                  mobileMenu.hidden = !mobileMenu.hidden;                             
                 // 更新按钮的 aria-expanded 状态
                    this.setAttribute('aria-expanded', !isExpanded);                              
                // 可选：切换 active 类用于动画效果   
                    mobileMenu.classList.toggle('active');                       
                }); 

                mobileMenu.addEventListener('click', function(event) {
                    // 阻止事件冒泡，避免触发父级元素上的点击事件
                    event.stopPropagation();
                });

                // 点击页面其他区域关闭菜单
                document.addEventListener('click', function (event) {
                 const isClickInsideMenu = mobileMenu.contains(event.target);
                 const isClickOnButton = mobileMenuButton === event.target || mobileMenuButton.contains(event.target);
                
                if (!isClickInsideMenu && !isClickOnButton) {
                    mobileMenu.hidden = true;
                    mobileMenu.classList.remove('active');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    }
                });
            }                                                      
        }
    }, 100);
});
