import express from 'express'

import map from '../controllers'

const routes = express.Router()

routes.get('/', map)

export default routes