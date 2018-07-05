import shortid from 'shortid'

export default () => ({
  'europe': [
    {
      'id': shortid.generate(),
      'lat': 46.4102,
      'lng': 11.8440,
      'title': 'Dolomites',
      'imageList': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBemQWYCiXxeMctquLix0Ntn_zVQAS3RmQ4rRiWbhoRvQdp9P2', 'https://www.mountainphotography.com/images/640/20040628-Pala-Reflection.jpg', 'https://italyxp.com/sites/default/files/styles/colorbox_gallery_xp/public/mediaitalyxp/dolomites_lake.jpg?width=820&height=620&iframe=true'],
      'stars': 2,
      'dificulty': 'easy',
      'maxHight': '2000m',
      'routes': [{ name: 'first', hours: 10 }, { name: 'second', hours: 10 }]
    },
    {
      'id': shortid.generate(),
      'lat': 60.1543,
      'lng': 7.4430,
      'title': 'Hardangervidda National Park',
      'imageList': ['https://i2-prod.mirror.co.uk/incoming/article9387007.ece/ALTERNATES/s615/Bygdy-peninsula-Oslo-Norway.jpg'],
      'stars': 3,
      'dificulty': 'easy',
      'maxHight': '2000m',
      'routes': [{ name: 'first', hours: 10 }, { name: 'second', hours: 10 }, { name: 'second', hours: 11 }]
    },
    {
      'id': shortid.generate(),
      'lat': 46.3342,
      'lng': 13.8287,
      'title': 'Triglav',
      'imageList': ['https://i1.wp.com/www.andthereshegoesagain.com/wp-content/uploads/2017/10/DSCF7854.jpg?resize=700%2C395', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOpautxpXitBUcmm2RG9S6rbWcOj8W1uy4fgxNdiCjHkhM3cvY'],
      'stars': 1,
      'dificulty': 'medium',
      'maxHight': '2000m',
      'routes': [{ name: 'first', hours: 9 }, { name: 'second', hours: 8 }]
    },
    {
      'id': shortid.generate(),
      'lat': 40.416775,
      'lng': -3.703790,
      'title': 'Madrid',
      'imageList': ['https://www.telegraph.co.uk/content/dam/Travel/2016/November/madrid-TT-hres-2011_8.jpg?imwidth=450'],
      'stars': 2,
      'dificulty': 'dificult',
      'maxHight': '2000m',
      'routes': [{ name: 'first', hours: 100 }]
    },
    {
      'id': shortid.generate(),
      'lat': 52.520007,
      'lng': 13.404954,
      'title': 'Berlin',
      'imageList': ['https://lonelyplanetwp.imgix.net/2015/12/brandenburg-gate-berlin-GettyRF-1500-cs.jpg?crop=entropy&fit=crop&h=421&sharp=10&vib=20&w=748'],
      'stars': 5,
      'dificulty': 'extreme',
      'maxHight': '2000m',
      'routes': [{ name: 'first', hours: 9 }, { name: 'second', hours: 8 }]
    },
    {
      'id': shortid.generate(),
      'lat': 51.507351,
      'lng': -0.127758,
      'title': 'London',
      'imageList': ['https://images.pexels.com/photos/50632/pexels-photo-50632.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://cdn.londonandpartners.com/assets/73295-640x360-london-skyline-ns.jpg'],
      'stars': 4,
      'dificulty': 'medium',
      'maxHight': '2000m',
      'routes': [{ name: 'first' }, { name: 'second', hours: 8 }]
    },
    {
      'id': shortid.generate(),
      'lat': 48.2775,
      'lng': 8.1860,
      'title': 'Black Forest',
      'imageList': ['https://assets.fodors.com/destinations/228/black-forest-the-black-forest-germany_main.jpg', 'https://media.istockphoto.com/photos/black-forest-germany-picture-id521383509?k=6&m=521383509&s=612x612&w=0&h=eEDtL2uqkSvcDCpL9uH9UikP4uLszMyTvcPbeyPmpi4='],
      'stars': 4,
      'dificulty': 'medium',
      'maxHight': '2000m',
      'routes': [{ name: 'first', hours: 9 }, { name: 'second', hours: 8 }]
    }
  ]
}
)
