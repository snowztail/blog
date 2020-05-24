
var _Blog = _Blog || {};

// Dark Mode
_Blog.switchDarkMode = function () {
    let darkMode = localStorage.getItem("darkMode");
    // console.log(darkMode);
    const darkModeToggle = document.querySelectorAll(".theme-switch");

    darkModeToggle.forEach(function (darkModeToggleItem) {

        const enableDarkMode = () => {
            document.body.classList.add('dark-theme');
            localStorage.setItem("darkMode", "enabled");
        }

        const disableDarkMode = () => {
            document.body.classList.remove("dark-theme");
            localStorage.setItem("darkMode", "disabled");
        }

        if (darkMode === "enabled") {
            enableDarkMode();
        }

        darkModeToggleItem.addEventListener('click', () => {
            darkMode = localStorage.getItem('darkMode');
            if (darkMode != "enabled") {
                enableDarkMode();
                // console.log(darkMode);
            } else {
                disableDarkMode();
                // console.log(darkMode);
            }
        });
    });
}

// 开关移动端菜单
_Blog.switchMobileMenu = function () {
    const menuSwitcher = document.querySelectorAll('.menu-toggle'),
        MobileMenu = document.querySelector('#mobile-menu');
    menuSwitcher.forEach(function (menuSwitcherItem) {
        menuSwitcherItem.addEventListener('click', () => {
            menuSwitcherItem.classList.toggle('active');
            MobileMenu.classList.toggle('active');
        });
    });
}

// 顶部阅读进度条
_Blog.scrollIndicator = function () {
    const winHeight = window.innerHeight,
        docHeight = document.documentElement.scrollHeight,
        progressBar = document.querySelectorAll('.content_progress');
    progressBar.forEach(function (progressBarItem) {
        progressBarItem.max = docHeight - winHeight;
        progressBarItem.value = window.scrollY;
    });

    document.addEventListener('scroll', function () {
        progressBar.forEach(function (progressBarItem) {
            progressBarItem.max = docHeight - winHeight;
            progressBarItem.value = window.scrollY;
        });
    });
}

// 为代码块添加 Copy 按钮
_Blog.addCopyBottons = function () {
    // Check if the browser supports navigator.clipboard
    if (navigator && navigator.clipboard) {
        copyButtons(navigator.clipboard);
    } else {
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard-polyfill/2.7.0/clipboard-polyfill.promise.js';
        script.integrity = 'sha256-waClS2re9NUbXRsryKoof+F9qc1gjjIhc2eT7ZbIv94=';
        script.crossOrigin = 'anonymous';
        script.onload = function () {
            copyButtons(clipboard);
        };

        document.body.appendChild(script);
    }

    function copyButtons(clipboard) {
        document.querySelectorAll('pre > code').forEach(function (codeBlock) {
            var button = document.createElement('button');
            button.className = 'copy-code-button';
            button.type = 'button';
            button.innerText = 'Copy';

            button.addEventListener('click', function () {
                clipboard.writeText(codeBlock.innerText).then(function () {
                    /* Chrome doesn't seem to blur automatically,
                       leaving the button in a focused state. */
                    button.blur();

                    button.innerText = 'Copied!';

                    setTimeout(function () {
                        button.innerText = 'Copy';
                    }, 2000);
                }, function (error) {
                    button.innerText = 'Error';
                });
            });

            var pre = codeBlock.parentNode;
            if (pre.parentNode.classList.contains('highlight')) {
                var highlight = pre.parentNode;
                highlight.appendChild(button);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    _Blog.addCopyBottons();
    _Blog.switchDarkMode();
    _Blog.switchMobileMenu();
    _Blog.scrollIndicator();
});
