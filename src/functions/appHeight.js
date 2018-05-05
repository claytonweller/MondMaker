import navHeight from './navHeight'

const appHeight = ()=>{
  let percentageOfTotalHeight = (window.innerHeight - navHeight())/window.innerHeight
  return `${percentageOfTotalHeight*99}%`
}

export default appHeight;