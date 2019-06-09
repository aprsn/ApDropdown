(function() {  
    const dropdowns = document.getElementsByClassName("ap-dropdown");
    let controlStatus = true;
    let targetDropdown;
    let dropdown;
    for(i = 0; i < dropdowns.length; i++) {
        const opendropdown = document.querySelectorAll(".ap-dropdown[status='open']")[i];
        if(opendropdown) {
           opendropdown.getElementsByClassName("menu")[0].style.display = "block";
        }
    }
    function controlDropdown(e) {
        if( e.target.getAttribute("target-dropdown") != null) {
             targetDropdown = e.target.getAttribute("target-dropdown");
        } else {
             targetDropdown = e.target.getElementsByClassName("title")[0].getAttribute("target-dropdown");
        }
        dropdown = document.querySelector(`.ap-dropdown[dropdown-name = '${targetDropdown}' ]`);
        const status = dropdown.getAttribute("status");
        
        if(status === "open" ) {
            dropdown.getElementsByClassName("menu")[0].style.display = "none";
            dropdown.setAttribute("status", "close");
        } else if (status === "close") {
            for (var i = 0; i < dropdowns.length; i++) {
                dropdowns[i].getElementsByClassName("menu")[0].style.display = "none";
                dropdowns[i].setAttribute("status", "close");
            }
            dropdown.getElementsByClassName("menu")[0].style.display = "inline-block";
            if(dropdown.clientWidth > 500) {
                dropdown.getElementsByClassName("menu")[0].style.width = dropdown.clientWidth-50;
            } else {
                dropdown.getElementsByClassName("menu")[0].style.width = dropdown.clientWidth + 50;
            }
            dropdown.setAttribute("status", "open");
        }
        controlStatus = false;
    } 
     function selectedItem(e) {
        const value = e.target.innerHTML;
        const target = dropdown.getElementsByClassName("menu")[0].querySelector("ul").querySelectorAll("li");
        for(var i = 0; i < target.length; i++ ) {
           target[i].classList.remove("selected");
        }
        e.target.classList.add("selected");  
        dropdown.querySelector(".head .title").innerHTML = value;
    }
    for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].querySelector(".head").addEventListener('click', controlDropdown, false);
        var listItems = dropdowns[i].getElementsByClassName("menu")[0].querySelector("ul").querySelectorAll("li");
            for(var j = 0; j < listItems.length; j++) {
                listItems[j].addEventListener('click', selectedItem, false);
            }
    }
    window.onclick = function() {   
        if(controlStatus) {
            for (var i = 0; i < dropdowns.length; i++) {
                dropdowns[i].getElementsByClassName("menu")[0].style.display = "none";
                dropdowns[i].setAttribute("status", "close");
            }
        }  
        controlStatus = true;
    }
})();