var app = document.getElementsByTagName("app")[0]
var sidebar = app.getElementsByTagName("sidebar")[0]
var navmenu = sidebar.getElementsByClassName("navmenu")[0]

function ClassListActiveButtonEvent(ButtonsArray){
    for (let i = 0; i < ButtonsArray.length; i++){
        const element = ButtonsArray[i]
        ButtonEvent(element, function(){
            for (let i = 0; i < ButtonsArray.length; i++){
                const element = ButtonsArray[i];
                if(element.classList.contains("active")){
                    element.classList.remove("active")
                }
            }
            element.classList.add("active")
        })
    }
}


var sidebarButtons = sidebar.getElementsByTagName("i")

ClassListActiveButtonEvent(sidebarButtons)

var podcontent = sidebar.getElementsByTagName("podcontent")[0]

var podcontentButtons = podcontent.getElementsByTagName("po")

ClassListActiveButtonEvent(podcontentButtons)

var main = app.getElementsByTagName("main")[0]

var slidebar = main.getElementsByTagName("slidebar")[0]
var slidebarButtons = slidebar.childNodes

ClassListActiveButtonEvent(slidebarButtons)
slidebarButtons[0].click()
//think bour it