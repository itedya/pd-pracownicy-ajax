import Model from "./model.js";

class Team extends Model {
    constructor(id, name, address) {
        super();
        this.id = id;
        this.name = name;
        this.address = address;
    }

    fastAssign(row, prefix) {
        this.id = row[`${prefix}id`];
        this.name = row[`${prefix}name`];
        this.address = row[`${prefix}address`];
        return this;
    }

    sanitize() {
        const clonedObject = this;

        return clonedObject;
    }
}

export default Team;
