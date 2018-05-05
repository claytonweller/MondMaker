import navHeight from "./navHeight"

const convertToPercent = (x,y) => {
 let xPercent = x/window.innerWidth * 100
 let yPercent = (y-navHeight())/(window.innerHeight-navHeight()) * 100
 return {x:xPercent, y:yPercent}
}

export default convertToPercent;