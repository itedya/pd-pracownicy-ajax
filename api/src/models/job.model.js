import Model from "./model.js";

class Job extends Model {
    constructor(name, wageFrom, wageTo) {
        super();
        this.name = name;
        this.wageFrom = wageFrom;
        this.wageTo = wageTo;
    }

    sanitize() {
        const clonedObject = this;

        return clonedObject;
    }
}

export default Job;