import html2canvas from 'html2canvas';  

  const snapshot = () =>{
    html2canvas(document.body).then(canvas => {
      let dataURL = canvas.toDataURL()
      let link = document.createElement('a')
      link.download = 'test'
      link.href = dataURL
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    });
  }

  export default snapshot;