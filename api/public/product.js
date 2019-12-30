var router = express.Router()
var { Product, Catogory, Media, Specification} = require('../../sequelize.js');
const { reponseAPI } = require('../../lib/responseAPI');
const Op = require('sequelize').Op;
router.get('/info', async (req, res) => {
    let { id } = req.query;
    let product = await Product.findOne({ // lấy data theo limit va offset
        where: { id},
        include: [{
            model: Catogory,
        }],

    })
    if(product) {
        let media = await Media.findAll({ where: { productId: id }})
        let specification = await Specification.findAll({ where: { productId: id }})
        let productSameLine = await Product.findAll({ where: {parent: product.parent}}) 
        product.dataValues.media = media;
        product.dataValues.specification = specification;
        product.dataValues.productSameLine = productSameLine;
        let result = reponseAPI(true, "Success", product)
        return res.send(result); 
    } else{
        let result = reponseAPI(false, "fail", null)
        return res.send(result); 
    }    
})

router.get('/list', async (req, res) => {
    let { catogoryId, limit, offset } = req.query;
    let total = await Product.findAndCountAll({ 
        where:{ catogoryId}
    }); //tong số rows
    let data = await Product.findAll({ // lấy data theo limit va offset
        where: { catogoryId:  catogoryId },
        include: [{
            model: Catogory,
        }],
        offset: limit, 
        limit: offset,
        order: [['createdAt', 'DESC']]
    })
    let sumary = {
        total: total.count,
        data
    }
    let result = reponseAPI(true, "Success", sumary)
    return res.send(result);     
})

router.get('/compare', async (req, res) => {
    let { id1,  id2 } = req.query;
    let products = await Product.findAll({ // lấy data theo limit va offset
        where: { 
            [Op.or]: [{id: id1}, {id: id2}],
        },
        include: [{
            model: Catogory,
        }]
    })
    if(products.length == 2) {
        for (let i = 0; i < products.length; i++) {
            const element = products[i];
            let media = await Media.findAll({ where: { productId: element.id }})
            let specification = await Specification.findAll({ where: { productId: element.id }})
            let productSameLine = await Product.findAll({ where: {parent: element.parent}}) 
            element.dataValues.media = media;
            element.dataValues.specification = specification;
            element.dataValues.productSameLine = productSameLine;
        }
        let result = reponseAPI(true, "Success", products)
        return res.send(result); 
    } else{
        let result = reponseAPI(false, "fail", null)
        return res.send(result); 
    }    
})

module.exports = router
