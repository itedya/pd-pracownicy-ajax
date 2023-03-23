class Employee extends Model {
    constructor(id, firstName, lastName, job, boosId, employeedFrom, basicWage, additionalWage, teamId) {
        super();

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.job = job;
        this.bossId = bossId;
        this.employeedFrom = employeedFrom;
        this.basicWage = basicWage;
        this.additionalWage = additionalWage;
        this.teamId = teamId;
    }
}

export default Employee;