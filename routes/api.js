var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

var candidaturas = require('./apiRoutes/candidaturas')
var universidades = require('./apiRoutes/universidades')
var posts = require('./apiRoutes/posts')
var contactos = require('./apiRoutes/contactos')

router.use('/candidaturas', candidaturas)
router.use('/universidades', universidades)
router.use('/posts', posts)
router.use('/contactos', contactos)

const dummySchemma = new mongoose.Schema({
    dummy: 'string',
    dummy2: 'string'
})
const Dummy = mongoose.model('Dummy', dummySchemma)

//Request Dummy que vai ser chamado de tanto em tanto tempo para não deixar o heroku e o mongodb entrarem em repouso
router.get('/dummy', async(req, res) => {
    try {
        var dummy = new Dummy({ "dummy": "dummy", "dummy2": "dummy2" })
        var dummyGuardado = await dummy.save()
        await Dummy.deleteOne({ _id: dummyGuardado._id })
        res.status(200).send("Dummy called!")
    } catch (error) {
        res.status(500).send("Erro ao tentar chamar o dummy. Erro:" + error)
    }

})

module.exports = router