!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");e.setAttribute("disabled","true"),t.addEventListener("click",(function(){t.setAttribute("disabled","true"),e.removeAttribute("disabled");var r=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3);e.addEventListener("click",(function(){e.setAttribute("disabled","true"),t.removeAttribute("disabled"),clearInterval(r)}))}))}();
//# sourceMappingURL=01-color-switcher.10de485d.js.map
