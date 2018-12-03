function openSlideMenu(){
            document.getElementById("menu").style.width = "250px";
            document.getElementById("content").style.marginLeft = "250px";
            
        }
        function closeSlideMenu(){
            document.getElementById("menu").style.width = "0px";
            document.getElementById("content").style.marginLeft = "0px";
        }

        function openClose(){
            var open =  document.getElementById("menu").style.width == "250px";
            if(open){
                closeSlideMenu();
            }else{
                openSlideMenu();
            }
        }