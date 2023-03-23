import Model from "./model.js";

class Job extends Model {
    constructor(name, wageFrom, wageTo) {
        super();
        this.name = name;
        this.wageFrom = wageFrom;
        this.wageTo = wageTo;
    }
}

export default Job;