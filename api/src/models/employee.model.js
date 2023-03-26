import Model from "./model.js";

class Employee extends Model {
    constructor(
        id,
        firstName,
        lastName,
        job,
        bossId,
        employeedFrom,
        basicWage,
        additionalWage,
        teamId
    ) {
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

    fastAssign(row, prefix) {
        this.id = row[`${prefix}id`];
        this.firstName = row[`${prefix}first_name`];
        this.lastName = row[`${prefix}last_name`];
        this.job = row[`${prefix}job`];
        this.bossId = row[`${prefix}boss_id`];
        this.employeedFrom = row[`${prefix}employeed_from`];
        this.basicWage = row[`${prefix}basic_wage`];
        this.additionalWage = row[`${prefix}additional_wage`];
        this.teamId = row[`${prefix}team_id`];
        return this;
    }

    sanitize() {
        const clonedObject = this;

        

        return clonedObject;
    }
}

export default Employee;
