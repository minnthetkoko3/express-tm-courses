const express = require('express');
const uuid = require('uuid');
const router = express.Router();

const membersData = require('../members-data');
const members = require('../members-data');


router.get('/', (req,res) => res.json(members));

router.get('/:id', (req,res) => {
    const found = membersData.some(member => member.id === req.params.id);
    if (found) {
        res.json(membersData.filter(member => member.id === req.params.id))
    } else {
        res.status(400).json({msg: `User not found ${req.params.id}`})
    }
      //res.send(req.params.id)
});

router.post('/add', (req,res) => {
    const newMembers = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        ststus: "active"
    }

    if (!req.body.name || !req.body.email) {
        res.ststus(400).json({ msg: `name or email not found`})
    }

    membersData.push(newMembers);
    res.json(membersData);
});

router.put('/:id', (req,res) => {
    const found = membersData.some(member => member.id === req.params.id);
    if (found) {
        const updMember = req.body;
        membersData.forEach(member => {
            if (member.id === req.params.id) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({ msg : `member updated`, member});
            }
        })
        
    }else{
        res.status(400).json({ msg: `no member with the id of ${req.params.id}`});
    }
});


router.delete('/:id', (req,res) => {
    const found = membersData.some(member => member.id === req.params.id);
    if (found) {
        res.json({
            msg: `member delete`,
            member:  membersData.filter(member => member.id === req.params.id)

        })
    } else {
        res.status(400).json({msg: `User not found ${req.params.id}`})
    }
      //res.send(req.params.id)
});


module.exports = router;