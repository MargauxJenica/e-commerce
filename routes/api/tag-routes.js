const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  console.log("in tag route");
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, attributes:['id'] },],
  });
    console.log(tagData);
    const tags = tagData.map((tag) =>
    tag.get({ plain: true }));

    res.status(200).json(tags);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, attributes: ['id'] }]
  });
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({tag_name: req.body.tag_name});
    res.status(200).json(tagData);
  } catch(err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/:id',async (req, res) => {
  // update a tag's name by its `id` value
  const tagId = req.params.id;
  const { tag_name } = req.body;
  
  try {
    const tagData = await Tag.update({ tag_name }, {
      where: { id: tagId }
    });

    if(!tagData[0]){
      res.status(404).json({message: "No tag with that id."});
      return;
    }
    res.status(200).json(tagData);
  } catch(err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({where: { id: req.params.id }});
    if(!tagData){
      res.status(404).json({message: "No tag with that id."});
    }
    
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
