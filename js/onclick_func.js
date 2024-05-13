document.addEventListener('mousemove', (eObject)=>{
    var torchLight = document.getElementById("torchlight")
  
    torchLight.style.top = eObject.pageY + "px"
    torchLight.style.left = eObject.pageX + "px"

    
})


const rightSide = document.getElementById("rightSide");

rightSide.addEventListener("scrollend", selectCurrNav )

let previousActiveChildIndex = null ;

function selectCurrNav(eObject){
    

    let rightSideChildren =  rightSide.getElementsByTagName("section");
    let currChildIndex = getActiveChildIndex(rightSideChildren)
    

    let activeChildId = rightSideChildren[currChildIndex].getAttribute("id")

    if(currChildIndex !== previousActiveChildIndex){
        applyStylesToselected(activeChildId)
        console.log(currChildIndex, previousActiveChildIndex)
        if(previousActiveChildIndex !== null)
            removeStyleFromPreviousChild(rightSideChildren[previousActiveChildIndex].getAttribute("id"))
        previousActiveChildIndex = currChildIndex 
    
    }
    
    

}
function applyStylesToselected(activeChildId){
    let queryString = `a[href='#${activeChildId}']`
    let activeChild = document.querySelector(queryString)
    activeChild.nextElementSibling.className += " selected"
    console.log(activeChild.nextElementSibling.className)
   
}

function getActiveChildIndex(arrayOfChildElements) {
    let maxVisibleHeight = 0;
    let indexOfActiveChild;
    let windowHeight = window.innerHeight;
  
    for (let index = 0; index < arrayOfChildElements.length; index++) {
      let elRect = arrayOfChildElements[index].getBoundingClientRect();
      console.log(arrayOfChildElements[index] , " " , elRect)
      let visibleHeight = Math.min(elRect.bottom, windowHeight) - Math.max(elRect.top, 0);
  
      // Check if the section is in view and has the maximum visible height
      if (visibleHeight > maxVisibleHeight && elRect.bottom > 0 && elRect.top < windowHeight) {
        maxVisibleHeight = visibleHeight;
        indexOfActiveChild = index;
      }
    }
  
    return indexOfActiveChild;
  }

  function removeStyleFromPreviousChild(previousActiveChildId){
    let queryString = `a[href='#${previousActiveChildId}']`
    // console.log(queryString)
    let prevActiveChild = document.querySelector(queryString)
    let className = prevActiveChild.nextElementSibling.className
    console.log(className)
    const indexOfWs = className.indexOf(" ")
    console.log(indexOfWs)
    className = className.substring(0,indexOfWs )
    prevActiveChild.nextElementSibling.className = className

    console.log("Previous child class name : " + className)
    
  }
