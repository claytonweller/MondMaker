const convertToPercent = (x,y) => {
 let xPercent = x/window.innerWidth * 100
 let yPercent = y/window.innerHeight * 100
 return {x:xPercent, y:yPercent}
}

export default convertToPercent;