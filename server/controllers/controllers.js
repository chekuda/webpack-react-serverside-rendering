const map = (req, res) => {
  const templateData = {
    htmlBody: 'MAP IS HERE'
  }

  res.render('map', templateData)
}

export default map