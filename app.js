const express = require('express');
const app = express ();
const port = 3000;
const Morgan = require('morgan');

app.use(Morgan('dev'))

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});

//Home page
app.get('/', (req, res) => {
    console.log(`On the home page`)
    res.send('students page')
})


//getting All sudents and searched student
app.get('/students', (req, res) => {
    // GET /students - returns a list of all students
    // this endpoint, optionally, accepts query parameters
    // GET /students?search=<query> - returns a list of students filtered on name matching the given query
    if (req.query.search) {
      let name = decodeURIComponent(req.query.search);
      let result = students.filter(student => student.name.includes(name))
      res.send(result)
    } else {
      res.send(students)
    }
  });

//student by ID
app.get('/students/:studentId', (req, res)=>{
    console.log(`On the ${req.path} page`)
    console.log(`Trying to find a student with the Id of: ${req.params.studentId}`);
    res.send(`Student at ${req.params.studentId} Id`)
})

//viewing all grades by student ID
app.get('/grades/:studentId', (req, res)=>{
    console.log(`On the ${req.path} page`)
    console.log(`${req.params.studentId} has the grades of: ${req.query.grade}`);
    res.send(`Student at ${req.params.studentId} Id has the grades of: ${req.query.grade}`)
})

//adding grades by ID
app.post('/grades/:studentId', (req, res) => {
    console.log(`On the ${req.path} page`)
    if (req.query.studentId && req.query.grade) {
        console.log(`${req.query.studentId} got a ${req.query.grade} on his work`);
        res.json({'gradeReceived': true});
      } else {
        res.json({'gradeReceived': false});
      }
});


//post register
app.post('/register/:studentId', (req, res) => {
    console.log(`On the ${req.path} page`)
    if(req.params.studentId){
    console.log(`Adding ${req.params.studentId} to the ${req.path}`) 
        res.json({'registered': true});
    }else{
        res.json({'registered': false});
    }
})