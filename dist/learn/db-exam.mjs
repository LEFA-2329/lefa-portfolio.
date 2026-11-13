import {dbUnits,dbLessons} from './database-data.mjs?v=25';
import {intermediateUnits,intermediateLessons} from './intermediate-data.mjs?v=25';
const writtenBanks={
 database:[
 {id:'design',unit:5,title:'Normalise an enrolment relation',prompt:'Enrolment(StudentID,CourseID,StudentName,CourseName,Mark) has candidate key (StudentID,CourseID). Each ID determines its corresponding name. Show 1NF, identify the partial dependencies and produce 2NF/3NF tables with all keys. Explain where Mark belongs.',solution:'1NF: one student-course pair per row, key (StudentID,CourseID).\nStudentID determines StudentName. CourseID determines CourseName.\nThe full pair determines Mark.\nStudents(StudentID PK,StudentName)\nCourses(CourseID PK,CourseName)\nEnrolments(StudentID PK/FK,CourseID PK/FK,Mark)\nNo remaining non-key transitive dependency exists under these rules.',explanation:'Student and course names move to their own tables. Mark stays on the association, and the two foreign keys preserve the join. The result is also 3NF for the supplied dependencies.',criteria:['State the composite key and one-pair-per-row 1NF interpretation.','Identify StudentID determines StudentName as a partial dependency.','Identify CourseID determines CourseName as a partial dependency.','Create Students and Courses with the correct primary keys.','Keep Mark in Enrolments with both PK/FK attributes and explain 3NF.']},
 {id:'sql',unit:6,title:'Summarise marked enrolments',prompt:'Using Enrolments(StudentID,CourseID,Mark), write SQL returning CourseID, number of marked enrolments and fractional average mark. Include only marked rows. Keep courses with at least five marked enrolments and order by average descending, then CourseID. Explain WHERE versus HAVING.',solution:'SELECT CourseID,COUNT(Mark) AS MarkedCount,\n AVG(CAST(Mark AS DECIMAL(10,2))) AS AverageMark\nFROM Enrolments\nWHERE Mark IS NOT NULL\nGROUP BY CourseID\nHAVING COUNT(Mark)>=5\nORDER BY AverageMark DESC,CourseID;',explanation:'WHERE removes unmarked rows before grouping. HAVING filters the course groups. AVG ignores NULL; the decimal cast preserves a fractional average in native SQL Server.',criteria:['Select CourseID with COUNT(Mark) and a suitable alias.','Use a decimal cast in AVG to preserve fractional values.','Filter NULL marks using IS NOT NULL.','Group by CourseID and apply HAVING COUNT(Mark)>=5.','Order by average descending then CourseID and explain WHERE/HAVING.']}
 ],
 intermediate:[
 {id:'joins',unit:103,title:'Preserve courses with no marked enrolments',prompt:'Write a SQL Server query returning every course ID and course name, the count of marked enrolments and average mark. Keep courses with no marked enrolments, showing count zero and average NULL. Use Courses and Enrolments, order by CourseID, then explain why COUNT(*) is wrong.',solution:'SELECT c.CourseID,c.CourseName,\n COUNT(e.Mark) AS MarkedCount,\n AVG(CAST(e.Mark AS DECIMAL(10,2))) AS AverageMark\nFROM Courses c LEFT JOIN Enrolments e\n ON e.CourseID=c.CourseID\nGROUP BY c.CourseID,c.CourseName\nORDER BY c.CourseID;',explanation:'LEFT JOIN preserves a course with no children. COUNT(e.Mark) ignores both unmarked and NULL-extended rows; COUNT(*) would count the preserved row. AVG is NULL when there is no known mark.',criteria:['Start from Courses and use LEFT JOIN on CourseID.','Select and group by both course ID and course name.','Count e.Mark rather than COUNT(*).','Use a decimal AVG and retain NULL for groups without marks.','Keep all courses, sort by CourseID and explain unmatched-row behaviour.']},
 {id:'procedure',unit:109,title:'Create and test a parameterised procedure',prompt:'Write a native SQL Server procedure dbo.usp_StudyLabExamCountStudents. It takes @City VARCHAR(60) default Polokwane and @Total INT OUTPUT. It sets the count of matching Students, returns integer status 0, and suppresses row-count messages. Show a call capturing both outputs. Describe two tests.',solution:"CREATE PROCEDURE dbo.usp_StudyLabExamCountStudents\n @City VARCHAR(60)='Polokwane',@Total INT OUTPUT\nAS\nBEGIN\n SET NOCOUNT ON;\n SELECT @Total=COUNT(*) FROM dbo.Students WHERE City=@City;\n RETURN 0;\nEND;\nGO\nDECLARE @Count INT,@Status INT;\nEXEC @Status=dbo.usp_StudyLabExamCountStudents\n @Total=@Count OUTPUT;\nSELECT @Count AS Total,@Status AS Status;\nGO",explanation:'On the original college demo, the default city returns count 5 and status 0. Call with a city absent from the data to expect count 0 and status 0. OUTPUT must appear in the declaration and call. Run this native T-SQL in SSMS in a disposable database.',criteria:['Create a schema-qualified procedure in its own batch.','Declare the city default and @Total INT OUTPUT.','Use SET NOCOUNT ON and a parameterised COUNT query.','RETURN integer status 0 and capture both status and OUTPUT in the caller.','Describe default-city and no-match tests, with expected counts and status.']}
 ]
};

export function databaseExamEngine(course='database'){
 if(!['database','intermediate'].includes(course))throw Error('Unknown database course.');
 const units=course==='intermediate'?intermediateUnits:dbUnits,lessons=course==='intermediate'?intermediateLessons:dbLessons;
 const writtenQuestions=writtenBanks[course],quizCount=units.length*2,totalQuestions=quizCount+2;
 const examBank=lessons.flatMap(l=>l.quizzes.map((q,i)=>({...q,correct:q.answer,id:l.id+'-q'+i,unit:l.unit})));
function random(seed){let x=seed>>>0;return()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return (x>>>0)/4294967296;};}
function examQuestions(seed){const rng=random(seed);return units.flatMap(u=>{const bank=examBank.filter(q=>q.unit===u.id);for(let i=bank.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[bank[i],bank[j]]=[bank[j],bank[i]];}return bank.slice(0,2);});}
function createExam(seed,minutes=0,now=Date.now()){
 if(!Number.isInteger(seed)||seed<1||seed>4294967295||![0,30,60].includes(minutes)||!Number.isSafeInteger(now)||now<=0)throw Error('Invalid exam settings.');
 return {version:1,course,seed,minutes,startedAt:now,deadline:minutes?now+minutes*60000:null,submittedAt:null,expired:false,index:0,answers:{},written:{},ratings:{}};
}
function cleanExam(raw){
 if(!raw||raw.version!==1||raw.course!==course)return null;
 let s;try{s=createExam(raw.seed,raw.minutes,raw.startedAt);}catch{return null;}
 const qs=examQuestions(s.seed);s.index=Number.isInteger(raw.index)&&raw.index>=0&&raw.index<totalQuestions?raw.index:0;
 if(Number.isSafeInteger(raw.submittedAt)&&raw.submittedAt>=s.startedAt){s.submittedAt=raw.submittedAt;s.expired=!!s.deadline&&raw.submittedAt>=s.deadline;}
 for(const q of qs){const a=raw.answers?.[q.id];if(Number.isInteger(a)&&a>=0&&a<q.options.length)s.answers[q.id]=a;}
 for(const q of writtenQuestions){s.written[q.id]=typeof raw.written?.[q.id]==='string'?raw.written[q.id].slice(0,10000):'';s.ratings[q.id]=q.criteria.map((_,i)=>{const n=raw.ratings?.[q.id]?.[i];return s.submittedAt!==null&&Number.isInteger(n)&&n>=0&&n<=2?n:null;});}
 return s;
}
const remainingSeconds=(s,now=Date.now())=>s.deadline===null?null:Math.max(0,Math.ceil((s.deadline-now)/1000));
function submitExam(s,now=Date.now()){if(s.submittedAt!==null)return s;s.submittedAt=now;s.expired=s.deadline!==null&&now>=s.deadline;return s;}
function examResult(s){
 if(s.submittedAt===null)throw Error('Submit your attempt before reviewing answers.');
 const qs=examQuestions(s.seed);const byUnit=units.map(u=>({id:u.id,title:u.title,total:2,correct:qs.filter(q=>q.unit===u.id&&s.answers[q.id]===q.correct).length}));
 const objective=byUnit.reduce((n,u)=>n+u.correct,0);let rated=0,self=0;
 for(const q of writtenQuestions)for(let i=0;i<q.criteria.length;i++){const v=s.ratings[q.id]?.[i];if(Number.isInteger(v)&&v>=0&&v<=2){rated++;self+=v;}}
 return {objective,objectiveTotal:quizCount,byUnit,self,selfTotal:20,rated,rubricItems:10,combined:rated===10?objective+self:null,total:quizCount+20};
}

return {units,writtenQuestions,quizCount,totalQuestions,examQuestions,createExam,cleanExam,remainingSeconds,submitExam,examResult};
}
