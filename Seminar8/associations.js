import { DataTypes, Model, Sequelize } from 'sequelize'


const db = new Sequelize({
    dialect: 'sqlite',
    storage: "students.db"
})

/* 1) Model Definitions
        - Student
        - Profile (1:1 with Student)
        - Course   (N:M with Student)
*/

class Student extends Model { }

Student.init(
    {
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true }
    },
    { sequelize: db, modelName: 'Student' }
)

class Profile extends Model { }

Profile.init(
    {
        bio: DataTypes.TEXT
    },
    { sequelize: db, modelName: 'Profile' }
)

class Course extends Model { }

Course.init(
    { title: { type: DataTypes.STRING, allowNull: false, unique: true } },
    { sequelize: db, modelName: 'Course' }
)

/*
    2) Relationships / Associations
    Tip: "belongsTo" side holds the foreign key
*/

// 2.1) One-to-One Student <-> Profile
//      FK lives in Profile table as profile.studentId
//      If Student is deleted then Profile is also deleted

Student.hasOne(Profile, {
    as: 'profile',
    foreignKey: { name: 'studentId', allowNull: false },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Profile.belongsTo(Student, { as: 'student', foreignKey: { name: "studentId", allowNull: false } })

// 2.2) Many-to-Many Student <-> Course ( through an implicit join table )
//      Sequelize creates table Enrollments with (studentId, courseId)

// class Enrollment extends Model {}
// Enrollment.init(
//   {
//     grade: DataTypes.STRING,
//   },
//   { sequelize: db, modelName: 'Enrollment' }
// )

Student.belongsToMany(Course, {
    as: 'courses',
    through: 'Enrollments',
    foreignKey: 'studentId',
    otherKey: 'courseId'
})

Course.belongsToMany(Student, {
    as: 'students',
    through: 'Enrollments',
    foreignKey: 'courseId',
    otherKey: 'studentId'
})

/* ============================================================
 * 3) COMMON BUILT-IN MIXINS (what Sequelize gives you)
 *    From hasOne / belongsTo:
 *      - student.getProfile(), student.setProfile(), student.createProfile()
 *      - profile.getStudent(), profile.setStudent()
 *
 *    From belongsToMany:
 *      - student.getCourses(), student.addCourse(c), student.addCourses([..])
 *      - student.setCourses([..]), student.removeCourse(c)
 *      - course.getStudents(), course.addStudent(u), course.setStudents([..])
 *
 *    Note: when you use an alias "as", mixin names follow that alias.
 * ============================================================ */

async function seed() {
    await db.sync({ force: true }) // drop table before recreating

    // Create a student and the profile in one command
    const ana = await Student.create(
        {
            name: 'Ana',
            email: 'ana@example.com',
            profile: { bio: 'I like SQL' }
        },
        { include: { model: Profile, as: 'profile' } }
    )

    // Create two courses
    const [js101, databases] = await Promise.all([
        Course.create({ title: 'JS 101' }),
        Course.create({ title: 'Databases' })
    ])

    await ana.addCourses([js101, databases]);

    return { ana, js101, databases }
}

/* ============================================================
 * 5) EXAMPLES: LAZY vs EAGER LOADING
 *    - Lazy: use mixins -> separate queries (simpler code)
 *    - Eager: use "include" -> one query that joins/loads relations
 * ============================================================ */

//Lazy Loading refers to the technique of fetching the associated data only when you really want it; 
//Eager Loading, on the other hand, refers to the technique of fetching everything at once, since the beginning, with a larger query.

async function examples(ana) {
    const profileLazy = await ana.getProfile();
    const coursesLazy = await ana.getCourses();

    console.log("Profiles lazy:", profileLazy);
    console.log("Courses lazy:", coursesLazy.map(c => c.title))

    const anaEagerLoading = await Student.findByPk(ana.id, {
        attributes: ['id', 'name'],
        include: [
            { model: Profile, as: 'profile' },
            {
                model: Course,
                as: 'courses',
                through: { attributes: [] } // dont't include the join-table columns in result
            }
        ]
    })

    console.log("Student eager loading", anaEagerLoading.toJSON());
}

/* ============================================================
 * 6) TINY CHEAT-SHEET 
 *    - hasOne/belongsTo (1:1): foreign key on the "belongsTo" side.
 *      Here: Profile has studentId.
 *    - belongsToMany (N:M): requires a join table.
 *      Here: "Enrollments" created automatically.
 *    - Use alias "as" to get nice method names (getProfile, getCourses).
 *    - Lazy = mixins later; Eager = include now.
 *    - Use through: { attributes: [] } to hide join table fields in result.
 * ============================================================ */

 const { ana } = await seed();
  await examples(ana);