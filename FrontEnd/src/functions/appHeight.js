import navHeight from './navHeight'

const appHeight = ()=>{
  let fractionOfTotalHeight = (window.innerHeight - navHeight())/window.innerHeight
  return `${fractionOfTotalHeight*99}%`
}

export default appHeight;