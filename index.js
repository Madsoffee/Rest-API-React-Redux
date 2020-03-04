let express = require('express')
let app = express()
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = [
    { 'list': 0, 'name': 'pooh','surname': 'pooh', 'id': 5935512073 },
    { 'list': 1, 'name': 'vinnie','surname': 'pooh', 'id': 5935512036 }
];

router.route('/students')
        .get((req, res) => res.json(students))

        .post( (req,res) => {
            let student = {}
            student.list = students[students.length-1].list+1
            student.name = req.body.name
            student.surname = req.body.surname
            student.id = req.body.id
            students.push(student)            
            res.json( {message: 'student created!'} )
        })

router.route('/students/:student_list')
        .get((req,res) => {
            let list = req.params.student_list
            let index = students.findIndex( student => (student.list === +list) )
            res.json(students[index])
        })

        .put ( (req,res) => {                               // Update a student
            let list = req.params.student_list
            let index = students.findIndex( student => (student.list === +list) )
            students[index].name = req.body.name;   
            students[index].surname = req.body.surname; 
            students[index].id = req.body.id;   
            res.json({ message: 'student updated!' + req.params.student_list});
        })
     
        .delete ( (req,res) => {                   // Delete a student
            // delete     students[req.params.student_list]
            let list = req.params.student_list
            let index = students.findIndex( student => student.list === +list  )
            students.splice(index,1) 
            res.json({ message: 'Student deleted: ' + req.params.student_list});
        })
     

app.use("*", (req, res) => res.status(404).send('404 Not found'));

app.listen(80, () => { console.log('server is running') })